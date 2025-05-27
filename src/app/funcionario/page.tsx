"use client";

import { DataTable } from "@/components/DataTable";
import { Layout } from "@/components/Layout";
import { Modal } from "@/components/Modal";
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

  const [open, setOpen] = useState(false);
    const [infos, setInfos] = useState<Data>({
      Id: '{sem Id}',
      Nome: '{sem Nome}',
      Compania: '{sem Compania}',
      Ocupacao: '{sem Ocupacao}',
      VR: '{sem VR}',
      VA: '{sem VA}'
    });
    const [action, setAction] = useState("");
  
    function openModal(infos: Data, action: string) {
      setOpen(true);
      setInfos(infos);
      setAction(action);
    }

  function handleNextPage() {
    console.log("next page");
  }

  function handleBackPage() {
    console.log("back page");
  }

  function addPdf() {
    setOpen(true);
    setAction('AddPDF')
  }

   function disablePdf() {
    setOpen(true);
    setAction('DisablePDF')
  }

  const handleEdit = useCallback((row: Data) => {
    openModal(row, 'Editar');
  }, []);

  const handleDelete = useCallback((row: Data) => {
    openModal(row, 'Deletar');
  }, []);


  return (
    <Layout pageTitle="Funcionários">

      <Modal open={open} onClose={() => setOpen(false)} infos={infos} action={action} />
    
      <div style={{marginTop: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
      <div style={{width:'97%', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '10px'}}>
        <button style={{padding: '5px', backgroundColor: 'green', color: 'white'}} onClick={addPdf}>Adicionar Funcionários</button>
        <button style={{padding: '5px', backgroundColor: 'red', color: 'white'}} onClick={disablePdf}>Desativar Funcionários</button>
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
        />
      </div>
    </Layout>
  );
}
