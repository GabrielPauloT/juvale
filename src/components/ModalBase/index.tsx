import { ModalBaseProps } from "./ModalBase.types";

export function ModalBase({ title, children, onClose, onSend, actionButton = 'Enviar', open }: ModalBaseProps) {
    if(open) {
        return(
            <div className="flex items-center justify-center fixed w-full h-full bg-black bg-opacity-50 z-[999] isolate top-0 right-0">
                <div className="w-[80%] sm:w-[40%] bg-white text-black fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4 rounded-lg">
                <h1 className="text-2xl mb-3">{title}</h1>
                    {children}
                <div className="w-full flex items-center justify-end gap-2">
                    <button
                    className="text-base border border-black px-5 py-1 rounded-md bg-white text-black hover:bg-gray-50 transition-colors"
                    onClick={onClose}
                    >
                    Fechar
                    </button>
                    <button className="text-base border border-green-500 px-5 py-1 rounded-md bg-green-500 text-white hover:bg-green-600 transition-colors"
                    onClick={onSend}
                    >
                    {actionButton}
                    </button>
                </div>
                </div>
            </div>
        )
    }
}