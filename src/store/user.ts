import { RemovableRef } from '@vueuse/core'
import { useIDBKeyval } from '@vueuse/integrations/useIDBKeyval'

const KEY = 'user-store',
  useUser = defineStore(KEY, () => {
    const { data, isFinished } = useIDBKeyval(KEY, false),
      { resolve, promise: isLogged } =
        Promise.withResolvers<RemovableRef<boolean>>()

    watchOnce(isFinished, () => resolve(data))

    return { isLogged }
  })

export { useUser }
