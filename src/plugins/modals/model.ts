import type { InjectionKey } from 'vue'

type ModalAction = () => void

export interface IModal {
  name: string
  resolve: ModalAction | null
  reject: ModalAction | null
}

export interface ModalApi {
  active: () => string
  show: (name: string) => Promise<void>
  accept: ModalAction
  cancel: ModalAction
}

export const modalKey = Symbol() as InjectionKey<ModalApi>
