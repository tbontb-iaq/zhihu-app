<template lang="pug">
transition-group.async-state(
  v-bind='{ tag: "div", name: "slide-fade", ...transition }'
)
  template(v-if='state === AsyncState.initial')
    slot(name='initial', :initial='initialData', :execute)
  template(v-else-if='state === AsyncState.fulfilled')
    slot(:data, :execute)
  template(v-else)
    slot(name='rejected', :error, :execute)

  template(v-if='isLoading')
    slot(name='loading')
      v-progress-circular.loading(indeterminate)
</template>

<script
  setup
  lang="ts"
  generic="Data, Params extends [], Shallow extends boolean = true"
>
import { sleep } from '@/utils/sleep'
import { type If } from '@/utils/types'
import type { UnwrapRef, TransitionGroupProps } from 'vue'

type DataRef = Ref<If<Shallow, Data, UnwrapRef<Data>> | undefined>

const {
    promise,
    initialData = undefined,
    delay = 0,
    lazy = false,
    reset = false,
    shallow = true,
    transition = {},
  } = defineProps<{
    promise: Promise<Data> | ((...args: Params) => Promise<Data>)
    initialData?: Data
    delay?: number
    lazy?: boolean
    reset?: boolean
    shallow?: Shallow
    transition?: TransitionGroupProps
  }>(),
  emit = defineEmits<{
    then: [value: Data]
    catch: [error: unknown]
    finally: []
  }>(),
  isLoading = ref(false),
  error = shallowRef<unknown>(),
  state = ref(AsyncState.initial),
  data: DataRef = shallow ? shallowRef() : ref()

async function execute(...args: Params) {
  if (isLoading.value) return
  else isLoading.value = true

  if (reset) {
    data.value = undefined
    state.value = AsyncState.initial
  }
  error.value = undefined

  delay > 0 && (await sleep(delay))

  const p = typeof promise === 'function' ? promise(...args) : promise

  p.then(value => {
    emit('then', value)
    data.value = value as any
    state.value = AsyncState.fulfilled
  })
    .catch(err => {
      error.value = err
      emit('catch', err)
      state.value = AsyncState.rejected
    })
    .finally(() => {
      emit('finally')
      isLoading.value = false
    })

  return data.value!
}

if (!lazy) execute(...([] as Params))
</script>

<script lang="ts">
export enum AsyncState {
  initial,
  fulfilled,
  rejected,
}
</script>

<style scoped lang="scss">
.async-state {
  position: relative;
  > :deep() {
    .slide-fade-enter-active,
    .slide-fade-leave-active {
      transition: all 0.5s ease;
    }

    .slide-fade-enter-from,
    .slide-fade-leave-to {
      // translate: 0 50%;
      scale: 0.5;
      opacity: 0;
    }
  }
}

.loading {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 50%;
  height: 50%;
  margin: auto;
  position: absolute;
  outline: 1px black solid;
  > :deep(svg) {
    overflow: visible;
    container-type: inline-size;
    > circle {
      stroke-width: 2.5;
    }
    $stroke-width-lists: ((0, 4), (100, 2.5));
    @each $s in $stroke-width-lists {
      @container (width > #{nth($s, 1)}px) {
        > circle {
          stroke-width: nth($s, 2);
        }
      }
    }
  }
}
</style>
