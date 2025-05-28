import { ReactNode } from "react"

export type ModalBaseProps = {
    title: string,
    open: boolean,
    onClose: () => void,
    onSend: () => void,
    children: ReactNode,
    actionButton?: string
}