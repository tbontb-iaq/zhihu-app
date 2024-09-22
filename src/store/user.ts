import { z, zApi } from '@/libraries/zhihu'
import { RemovableRef } from '@vueuse/core'
import { useIDBKeyval } from '@vueuse/integrations/useIDBKeyval'

const USER_STORE = 'user-store',
  LOGGED = `${USER_STORE}.logged`,
  useUserLogged = defineStore(LOGGED, () => {
    const { data, isFinished, set: setIsLogged } = useIDBKeyval(LOGGED, false),
      { resolve, promise: isLogged } =
        Promise.withResolvers<RemovableRef<boolean>>()

    watchOnce(isFinished, () => resolve(data))

    return { isLogged, setIsLogged }
  }),
  useUser = defineStore(USER_STORE, () => {
    const { isLogged, setIsLogged } = useUserLogged(),
      {
        execute,
        isLoading,
        state: info,
      } = useAsyncState(() => z.get(zApi.me), null as never, {
        immediate: false,
        throwError: true,
      })

    async function tryLogin() {
      try {
        await execute()
        setIsLogged(true)
      } catch (err) {
        setIsLogged(false)
      }
    }

    isLogged.then<boolean | void>(({ value }) => value && tryLogin())

    return { isLogged, info, isLoading, tryLogin }
  })

export { useUser }
