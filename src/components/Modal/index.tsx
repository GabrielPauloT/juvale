import { ModalProps } from "./types";

export function Modal({ onClose, open, infos, action }: ModalProps) {
  if (open && action === "Deletar") {
    return (
      <div className="flex items-center justify-center fixed w-full h-full bg-black bg-opacity-50 z-[999] isolate top-0 right-0">
        <div className="w-[80%] sm:w-[40%] bg-white text-black fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4 rounded-lg">
          <h1 className="text-2xl mb-3">{action}</h1>
          <p className="text-base mb-6">
            Tem certeza que deseja {action.toLowerCase()} o registro de{" "}
            {infos.Nome ? infos.Nome : "{sem nome}"}
          </p>
          <div className="w-full flex items-center justify-end gap-2">
            <button
              className="text-base border border-black px-5 py-1 rounded-md bg-white text-black hover:bg-gray-50 transition-colors"
              onClick={onClose}
            >
              Fechar
            </button>
            <button className="text-base border border-red-500 px-5 py-1 rounded-md bg-red-500 text-white hover:bg-red-600 transition-colors">
              {action}
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (open && action === "Editar") {
    return (
      <div className="flex items-center justify-center fixed w-full h-full bg-black bg-opacity-50 z-[999] isolate top-0 right-0">
        <div className="w-[80%] sm:w-[40%] bg-white text-black fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4 rounded-lg">
          <h1 className="text-2xl mb-3">{action}</h1>
          <div className="flex flex-col gap-4">
            <div className="w-full flex flex-col gap-1">
              <p className="text-sm">Nome:</p>
              <input
                type="text"
                placeholder="Nome"
                className="border border-black p-1 rounded-sm outline-none"
                defaultValue={infos.Nome ? infos.Nome : "{sem Nome}"}
              />
            </div>
            <div className="w-full flex flex-col gap-1">
              <p className="text-sm">Empresa:</p>
              <input
                type="text"
                placeholder="Empresa"
                className="border border-black p-1 rounded-sm outline-none"
                defaultValue={infos.Compania ? infos.Compania : "{sem Empresa}"}
              />
            </div>
            <div className="w-full flex flex-col gap-1">
              <p className="text-sm">Ocupação:</p>
              <input
                type="text"
                placeholder="Ocupação"
                className="border border-black p-1 rounded-sm outline-none"
                defaultValue={
                  infos.Ocupacao ? infos.Ocupacao : "{sem Ocupação}"
                }
              />
            </div>
            <div className="w-full flex flex-col gap-1">
              <p className="text-sm">VR:</p>
              <input
                type="text"
                placeholder="VR"
                className="border border-black p-1 rounded-sm outline-none"
                defaultValue={infos.VR ? infos.VR : "{sem VR}"}
              />
            </div>
            <div className="w-full flex flex-col gap-1">
              <p className="text-sm">VA:</p>
              <input
                type="text"
                placeholder="VA"
                className="border border-black p-1 rounded-sm outline-none"
                defaultValue={infos.VA ? infos.VA : "{sem VA}"}
              />
            </div>
          </div>
          <div className="w-full flex items-center justify-end gap-2 mt-3">
            <button
              className="text-base border border-black px-5 py-1 rounded-md bg-white text-black hover:bg-gray-50 transition-colors"
              onClick={onClose}
            >
              Fechar
            </button>
            <button className="text-base px-5 py-1 rounded-md bg-green-500 text-white hover:bg-green-600 transition-colors">
              Enviar
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (open && action === "AddPDF") {
    return (
      <div className="flex items-center justify-center fixed w-full h-full bg-black bg-opacity-50 z-[999] isolate top-0 right-0">
        <div className="w-[80%] sm:w-[40%] bg-white text-black fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4 rounded-lg">
          <h1 className="text-2xl mb-3">Adicionar PDF</h1>
          <div>
            <input
              type="file"
              accept="application/pdf"
              className="mb-4 p-2 border rounded w-full"
            />
          </div>
          <div className="flex flex-col items-start justify-start gap-2">
            <div>
              <input type="radio" name="pdfType" value="tipo1" />{" "}
              <span>Adicionar funcionário</span>
            </div>
            <div>
              <input type="radio" name="pdfType" value="tipo2" />{" "}
              <span>Desativar funcionário</span>
            </div>
          </div>
          <div className="w-full flex items-center justify-end gap-2 mt-3">
            <button
              className="text-base border border-black px-5 py-1 rounded-md bg-white text-black hover:bg-gray-50 transition-colors"
              onClick={onClose}
            >
              Fechar
            </button>
            <button className="text-base px-5 py-1 rounded-md bg-green-500 text-white hover:bg-green-600 transition-colors">
              Enviar
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (open && action === "Faltas") {
    return (
      <div className="flex items-center justify-center fixed w-full h-full bg-black bg-opacity-50 z-[999] isolate top-0 right-0">
        <div className="w-[80%] sm:w-[40%] bg-white text-black fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4 rounded-lg">
          <h1 className="text-2xl mb-3">Adicionar Falta(s)</h1>
          <div className="mb-3">
            <input type="date" className="border border-black p-1 w-full" />
          </div>
          <div className="mb-3">
            <input type="checkbox" name="pdfType" value="tipo1" />{" "}
            <span>Possui atestado</span>
          </div>
          <div className="w-full flex items-center justify-end gap-2">
            <button
              className="text-base border border-black px-5 py-1 rounded-md bg-white text-black hover:bg-gray-50 transition-colors"
              onClick={onClose}
            >
              Fechar
            </button>
            <button className="text-base px-5 py-1 rounded-md bg-green-500 text-white hover:bg-green-600 transition-colors">
              Adicionar
            </button>
          </div>
        </div>
      </div>
    );
  }
}
