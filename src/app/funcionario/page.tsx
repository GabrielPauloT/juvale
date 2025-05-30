"use client";

import { DataTable } from "@/components/DataTable";
import { Icons } from "@/components/Icons";
import { Layout } from "@/components/Layout";
import { ModalBase } from "@/components/ModalBase";
import { useDeleteEmployee, UseEmployee } from "@/service/hooks/UseEmployee";
import { EmployeeResponseType } from "@/service/types/employee";
import { SetStateAction, useCallback, useEffect, useState } from "react";
import {debounce} from "lodash"
import { ReactQueryKeysEnum } from "@/@types";
import { useQueryClient } from "@tanstack/react-query";

export default function FuncionariosPage() {
  const queryCliente = useQueryClient();
  const [page, setPage] = useState(1);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [perPage, setPerPage] = useState(10);
  const [name, setName] = useState('')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [companyId, setCompanyId] = useState(null)
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [searchDebounced, setSearchDebounced] = useState<string>("");


  const { data } = UseEmployee({ page, perPage, companyId, date: selectedDate, name: searchDebounced.trim()});
  const deleteEmployeerMutation = useDeleteEmployee();

  

  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [openModalAddPdf, setOpenModalAddPdf] = useState(false);
  const [openModalAbsent, setOpenModalAbsent] = useState(false);
  const [row, setRow] = useState<EmployeeResponseType>();

  function handleAddPdf() {
    setOpenModalAddPdf(true)
  }

  function handleChangeValueInput (input: { target: { value: SetStateAction<string>; }; }) {
    setName(input.target.value)
  }

  const handleEdit = useCallback((row: EmployeeResponseType) => {
    setOpenModalEdit(true);
    setRow(row)
  }, []);

  function handleDeleteEmployee() {
    if(!!row) {
      deleteEmployeerMutation
        .mutateAsync(row?.codeEmployee)
        .then(() => {
          console.log("Usuario deletado com sucesso");
          queryCliente.invalidateQueries({ queryKey: [ReactQueryKeysEnum.EMPLOYEE_FINDALL] });
          if (data?.data?.length === 0) {
            setPage((page) => page - 1);
          }
        })
        .catch(() => {
          console.log("Erro ao deletar usuario");
        }).finally(() => {
          setOpenModalDelete(false);
        })
      }
    }

  const handleDelete = useCallback((row: EmployeeResponseType) => {
    setOpenModalDelete(true)
    setRow(row)
  }, []);

  const handleAddAbsent = useCallback((row: EmployeeResponseType) => {
    setOpenModalAbsent(true)
    setRow(row)
  }, []);

  useEffect(() => {
    const debouncedSearchInput = debounce((value: string) => {
      setSearchDebounced(value);
    }, 400);

    debouncedSearchInput(name);

    return () => {
      debouncedSearchInput.cancel();
    };
  }, [name]);

  useEffect(() => {
    setPage(1)
  }, [searchDebounced]);


  return (
    <Layout pageTitle="Funcionários">

      <div className="flex justify-center mb-5">
          <div className="flex items-center gap-4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 shadow-md">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Selecione a data:
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="px-3 py-1 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

      <ModalBase 
        title="Deletar" 
        actionButton="Deletar" 
        open={openModalDelete} 
        onClose={() => setOpenModalDelete(false)}
        onSend={() => handleDeleteEmployee()}
      > 
          <p className="text-base mb-6">
            Tem certeza que deseja deletar o registro de{" "}
            {row?.name ? row.name : "{sem nome}"}
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
                defaultValue={row?.name ? row.name : "{sem Nome}"}
              />
            </div>
            <div className="w-full flex flex-col gap-1">
              <p className="text-sm">Compania:</p>
              <input
                type="text"
                placeholder="Compania"
                className="border border-black p-1 rounded-sm outline-none"
                defaultValue={row?.company.name ? row.company.name : "{sem Compania}"}
              />
            </div>
            <div className="w-full flex flex-col gap-1">
              <p className="text-sm">Ocupação:</p>
              <input
                type="text"
                placeholder="Ocupação"
                className="border border-black p-1 rounded-sm outline-none"
                defaultValue={row?.jobDescription ? row.jobDescription : "{sem Ocupação}"}
              />
            </div>
            <div className="w-full flex flex-col gap-1">
              <p className="text-sm">VR:</p>
              <input
                type="text"
                placeholder="VR"
                className="border border-black p-1 rounded-sm outline-none"
                defaultValue={row?.vr ? row.vr : "{sem VR}"}
              />
            </div>
            <div className="w-full flex flex-col gap- pb-6">
              <p className="text-sm">VA:</p>
              <input
                type="text"
                placeholder="VA"
                className="border border-black p-1 rounded-sm outline-none"
                defaultValue={row?.va ? row.va : "{sem VA}"}
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
        <DataTable<EmployeeResponseType>
          data={data?.data}
          totalPages={data?.totalPages}
          page={page}
          hiddenFields={["ticket", "snack", "absence", "company", "enabled"]}
          onNextPageClick={() => setPage((page) => page + 1)}
          onBackPageClick={() => setPage((page) => page - 1)}
          onEditClick={handleEdit}
          onDeleteClick={handleDelete}
          onAddAbsentClick={handleAddAbsent}
          searchValue={name}
          onChangeSearchValue={handleChangeValueInput}
        />
      </div>
    </Layout>
  );
}
