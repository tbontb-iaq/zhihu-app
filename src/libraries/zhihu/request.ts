import { identity } from 'rxjs'
import { fromFetch } from 'rxjs/fetch'

type RequestParam = ConstructorParameters<typeof Request>

function request<T>(...args: RequestParam) {
	const req = new Request(...args)

	return lastValueFrom<T>(
		of(req).pipe(
			map(import.meta.env.DEV ? dev_proxy : identity),
			mergeMap(r => fromFetch(r)),
			tap(r => {
				if (!r.ok) throw new Error('Response Failed')
			}),
			tap(r => {
				if (
					r.headers
						.get('content-type')
						?.toLowerCase()
						.includes('application/json') === false
				)
					throw new Error('Response is not JSON')
			}),
			mergeMap(r => r.json()),
			timeout(3000),
			retry(1)
		)
	)
}

/** 开发环境下使用代理进行跨域请求 */
function dev_proxy(req: Request) {
	const url = new URL(req.url)

	if (url.origin !== location.origin) {
		const search = new URLSearchParams({ url: req.url })
		return new Request('__vite_dev_proxy__?' + search, req)
	}

	return req
}

export { request }
