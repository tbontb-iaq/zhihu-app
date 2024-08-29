import { RemovableRef } from '@vueuse/core'
import { useIDBKeyval } from '@vueuse/integrations/useIDBKeyval'

const KEY = 'user-store',
  useUser = defineStore(KEY, () => {
    const { data, isFinished } = useIDBKeyval(KEY, false),
      { resolve: isLoggedResolve, promise: isLogged } =
        Promise.withResolvers<RemovableRef<boolean>>()

    watchOnce(isFinished, () => isLoggedResolve(data))

    return { isLogged }
  })

export { useUser }
