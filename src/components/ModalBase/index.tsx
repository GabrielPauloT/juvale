import { ModalBaseProps } from "./ModalBase.types";

export function ModalBase({
  title,
  children,
  onClose,
  onSend,
  actionButton = "Enviar",
  open,
}: ModalBaseProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[999] bg-black bg-opacity-50 flex items-center justify-center">
      <div className="w-[90%] sm:w-[500px] bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 p-6 relative">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
          {title}
        </h2>

        <div className="mb-6">{children}</div>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            Fechar
          </button>
          <button
            onClick={onSend}
            className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition-colors"
          >
            {actionButton}
          </button>
        </div>
      </div>
    </div>
  );
}
