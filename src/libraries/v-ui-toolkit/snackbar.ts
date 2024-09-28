import { Text } from 'vue'
import random from '@/utils/random'
import { vnodeMap } from './v-ui-toolkit'
import { VSnackbar } from 'vuetify/components'
import { ComponentSlots } from 'vue-component-type-helpers'

function snackbar(text: string) {
  const model = ref(true),
    key = random.key(vnodeMap)

  watchOnce(model, () => vnodeMap.delete(key))

  vnodeMap.set(key, function SnackbarWrapper() {
    return h(
      VSnackbar,
      {
        timeout: 2000,
        modelValue: model.value,
        'onUpdate:modelValue': v => (model.value = v),
      },
      {
        default: () => [h(Text, text)],
      } satisfies ComponentSlots<typeof VSnackbar>
    )
  })
}

export { snackbar }
