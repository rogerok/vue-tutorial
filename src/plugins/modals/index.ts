import { type App, reactive } from 'vue'
import Modal from './ModalComponent.vue'
import { type IModal, type ModalApi, modalKey } from '@plugins/modals/model.ts'

const current = reactive<IModal>({
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
    app.provide(modalKey, api)
  },
}

export default plugin
