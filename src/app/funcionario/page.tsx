"use client";

import { DataTable } from "@/components/DataTable";
import { Icons } from "@/components/Icons";
import { Layout } from "@/components/Layout";
import { ModalBase } from "@/components/ModalBase";
import { useCallback, useMemo, useState } from "react";

type Data = {
  Id: string;
  Nome: string;
  Compania: string;
  Ocupacao: string;
  VR: number | string;
  VA: number | string
};

export default function FuncionariosPage() {
  const data: Data[] = useMemo(() => [
    {
      Id: '1',
      Nome: "John Doe",
      Compania: "Liberty City",
      Ocupacao: "1234567890",
      VR: 222.23,
      VA:226.4,
    },
    {
      Id: '2',
      Nome: "Jane Smith",
      Compania: "Baldung",
      Ocupacao: "1234567890",
      VR: 222.23,
      VA:226.4,
    },
    {
      Id: '3',
      Nome: "John San",
      Compania: "Atlássia",
      Ocupacao: "1234567890",
      VR: 222.23,
      VA:226.4,
    },
    {
      Id: '4',
      Nome: "John Mar",
      Compania: "Lacta",
      Ocupacao: "1234567890",
      VR: 222.23,
      VA:226.4,
    },
  ], []);

  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [openModalAddPdf, setOpenModalAddPdf] = useState(false);
  const [openModalAbsent, setOpenModalAbsent] = useState(false);
  const [row, setRow] = useState<Data>();

  function handleNextPage() {
    console.log("next page");
  }

  function handleBackPage() {
    console.log("back page");
  }

  function handleAddPdf() {
    setOpenModalAddPdf(true)
  }

  const handleEdit = useCallback((row: Data) => {
    setOpenModalEdit(true);
    setRow(row)
  }, []);

  const handleDelete = useCallback((row: Data) => {
    setOpenModalDelete(true)
    setRow(row)
  }, []);

  const handleAddAbsent = useCallback((row: Data) => {
    setOpenModalAbsent(true)
    setRow(row)
  }, []);


  return (
    <Layout pageTitle="Funcionários">

      <ModalBase 
        title="Deletar" 
        actionButton="Deletar" 
        open={openModalDelete} 
        onClose={() => setOpenModalDelete(false)}
        onSend={() => console.log('ok')}
      > 
          <p className="text-base mb-6">
            Tem certeza que deseja deletar o registro de{" "}
            {row?.Nome ? row.Nome : "{sem nome}"}
          </p>
      </ModalBase>

      <ModalBase 
        title="Editar" 
        actionButton="Editar" 
        open={openModalEdit} 
        onClose={() => setOpenModalEdit(false)}
        onSend={() => console.log('ok')}
      > 
          <div className="flex flex-col gap-4">
            <div className="w-full flex flex-col gap-1">
              <p className="text-sm">Nome:</p>
              <input
                type="text"
                placeholder="Nome"
                className="border border-black p-1 rounded-sm outline-none"
                defaultValue={row?.Nome ? row.Nome : "{sem Nome}"}
              />
            </div>
            <div className="w-full flex flex-col gap-1">
              <p className="text-sm">Compania:</p>
              <input
                type="text"
                placeholder="Compania"
                className="border border-black p-1 rounded-sm outline-none"
                defaultValue={row?.Compania ? row.Compania : "{sem Compania}"}
              />
            </div>
            <div className="w-full flex flex-col gap-1">
              <p className="text-sm">Ocupação:</p>
              <input
                type="text"
                placeholder="Ocupação"
                className="border border-black p-1 rounded-sm outline-none"
                defaultValue={row?.Ocupacao ? row.Ocupacao : "{sem Ocupação}"}
              />
            </div>
            <div className="w-full flex flex-col gap-1">
              <p className="text-sm">VR:</p>
              <input
                type="text"
                placeholder="VR"
                className="border border-black p-1 rounded-sm outline-none"
                defaultValue={row?.VR ? row.VR : "{sem VR}"}
              />
            </div>
            <div className="w-full flex flex-col gap- pb-6">
              <p className="text-sm">VA:</p>
              <input
                type="text"
                placeholder="VA"
                className="border border-black p-1 rounded-sm outline-none"
                defaultValue={row?.VA ? row.VA : "{sem VA}"}
              />
            </div>
          </div>
      </ModalBase>

      <ModalBase 
        title="Adicionar PDF" 
        open={openModalAddPdf} 
        onClose={() => setOpenModalAddPdf(false)}
        onSend={() => console.log('ok')}
      > 
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
      </ModalBase>

      <ModalBase 
        title="Adicionar Faltas" 
        open={openModalAbsent} 
        onClose={() => setOpenModalAbsent(false)}
        onSend={() => console.log('ok')}
      > 
          <div className="mb-3">
            <input
              type="date"
              className="border border-black p-1 w-full"
            />
          </div>
          <div className="mb-3">
            <input type="checkbox" name="pdfType" value="tipo1" />{" "}
            <span>Possui atestado</span>
          </div>
      </ModalBase>
    
      <div style={{marginTop: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
      <div style={{width:'97%', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '10px'}}>
        <button style={{padding: '8px', backgroundColor: 'green', color: 'white', borderRadius: '8px'}} onClick={handleAddPdf}>
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px'}}>
            <p style={{fontWeight: 'bold'}}>PDF</p>
            <Icons name="MdOutlineAddCircle" size={20} />
          </div>
        </button>
      </div>
        <DataTable
          data={data}
          perPage={10}
          total={10}
          page={1}
          onNextPageClick={() => handleNextPage()}
          onBackPageClick={() => handleBackPage()}
          onEditClick={handleEdit}
          onDeleteClick={handleDelete}
          onAddAbsentClick={handleAddAbsent}
        />
      </div>
    </Layout>
  );
}
