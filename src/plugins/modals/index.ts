import { type App, reactive } from 'vue'
import Modal from './ModalComponent.vue'

type ModalAction = () => void

interface CurrentModal {
  name: string
  resolve: ModalAction | null
  reject: ModalAction | null
}

interface ModalApi {
  active: () => void
  show: (name: string) => Promise<void>
  accept: ModalAction
  cancel: ModalAction
}

const current = reactive<CurrentModal>({
  name: '',
  reject: null,
  resolve: null,
})

const api: ModalApi = {
  active: () => current.name,
  show: (name: string) => {
    current.name = name
    return new Promise((resolve = () => {}, reject = () => {}) => {
      current.resolve = resolve
      current.reject = reject
    })
  },
  accept: () => {
    current.resolve?.()
    current.name = ''
  },
  cancel: () => {
    current.reject?.()
    current.name = ''
  },
}

const plugin = {
  install(app: App) {
    app.component('ModalComponent', Modal)
    app.provide('modals', api)
  },
}

export default plugin
