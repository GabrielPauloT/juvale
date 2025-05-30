"use client";

import { DataTable } from "@/components/DataTable";
import { Icons } from "@/components/Icons";
import { Layout } from "@/components/Layout";
import { ModalBase } from "@/components/ModalBase";
import { useDeleteEmployee, UseEmployee } from "@/service/hooks/UseEmployee";
import { EmployeeResponseType } from "@/service/types/employee";
import { SetStateAction, useCallback, useEffect, useState } from "react";
import { debounce } from "lodash";
import { ReactQueryKeysEnum } from "@/@types";
import { useQueryClient } from "@tanstack/react-query";
import { useCompany } from "@/service/hooks/CompanyQuery";
import { TicketArrayFields } from "./TicketArrayFields";
import { requestTicket } from "./TicketArrayFields/types";

export default function FuncionariosPage() {
  const queryCliente = useQueryClient();
  const [page, setPage] = useState(1);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [perPage, setPerPage] = useState(10);
  const [name, setName] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [companyId, setCompanyId] = useState(null);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [searchDebounced, setSearchDebounced] = useState<string>("");
  const [selectedCompany, setSelectedCompany] = useState<number | null>(null);

  const { data } = UseEmployee({
    page,
    perPage,
    companyId: selectedCompany,
    date: selectedDate,
    name: searchDebounced.trim(),
  });
  const { data: company } = useCompany({ page: 0, perPage: 100 });
  const deleteEmployeerMutation = useDeleteEmployee();

  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [openModalAddPdf, setOpenModalAddPdf] = useState(false);
  const [openModalAbsent, setOpenModalAbsent] = useState(false);
  const [openModalTicket, setOpenModalTicket] = useState(false);
  const [editedTickets, setEditedTickets] = useState<requestTicket[]>([]);
  const [row, setRow] = useState<EmployeeResponseType>();

  const [selectedCompanyRow, setSelectedCompanyRow] = useState<number | null>(
    null
  );

  useEffect(() => {
    if (row?.company?.id) {
      setSelectedCompanyRow(row.company.id);
    }
  }, [row]);

  function handleAddPdf() {
    setOpenModalAddPdf(true);
  }

  const handleAddTicket = useCallback((row: EmployeeResponseType) => {
    setOpenModalTicket(true);
    console.log("enviados");
    setRow(row);
  }, []);

  const handleSendTickets = async () => {
    console.log("editedTicked", editedTickets);
  };

  function handleChangeValueInput(input: {
    target: { value: SetStateAction<string> };
  }) {
    setName(input.target.value);
  }

  const handleEdit = useCallback((row: EmployeeResponseType) => {
    setOpenModalEdit(true);
    setRow(row);
  }, []);

  function handleDeleteEmployee() {
    if (!!row) {
      deleteEmployeerMutation
        .mutateAsync(row?.codeEmployee)
        .then(() => {
          console.log("Usuario deletado com sucesso");
          queryCliente.invalidateQueries({
            queryKey: [ReactQueryKeysEnum.EMPLOYEE_FINDALL],
          });
          if (data?.data?.length === 0) {
            setPage((page) => page - 1);
          }
        })
        .catch(() => {
          console.log("Erro ao deletar usuario");
        })
        .finally(() => {
          setOpenModalDelete(false);
        });
    }
  }

  const handleDelete = useCallback((row: EmployeeResponseType) => {
    setOpenModalDelete(true);
    setRow(row);
  }, []);

  const handleAddAbsent = useCallback((row: EmployeeResponseType) => {
    setOpenModalAbsent(true);
    setRow(row);
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
    setPage(1);
  }, [searchDebounced]);

  return (
    <Layout pageTitle="Funcionários">
      <div className="px-4 mb-5 mt-5 flex flex-col gap-4 lg:flex-row lg:justify-center">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-3 shadow-md w-full md:w-auto">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Selecione a data:
          </label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="px-3 py-1 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-auto"
          />
        </div>

        <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-3 shadow-md w-full md:w-auto">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Selecione a company:
          </label>
          <select
            className="px-3 py-1 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-auto"
            value={selectedCompany ?? ""}
            onChange={(e) => setSelectedCompany(Number(e.target.value))}
          >
            <option value="">Selecione uma empresa</option>
            {company?.data?.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
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
        onSend={() => console.log("ok")}
      >
        {row ? (
          <div className="flex flex-col gap-4">
            <div className="w-full flex flex-col gap-1">
              <p className="text-sm">Nome:</p>
              <input
                type="text"
                placeholder="Nome"
                className="px-3 py-1 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                defaultValue={row?.name ? row.name : "{sem Nome}"}
              />
            </div>
            <div className="w-full flex flex-col gap-1">
              <p className="text-sm">Compania:</p>
              <select
                className="px-3 py-1 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={selectedCompanyRow ?? ""}
                onChange={(e) => setSelectedCompanyRow(Number(e.target.value))}
              >
                <option value="" disabled>
                  Selecione uma empresa
                </option>
                {company?.data?.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-full flex flex-col gap-1">
              <p className="text-sm">Ocupação:</p>
              <input
                type="text"
                placeholder="Ocupação"
                className="px-3 py-1 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                defaultValue={
                  row?.jobDescription ? row.jobDescription : "{sem Ocupação}"
                }
              />
            </div>

            <div className="w-full flex flex-col gap-1">
              <p className="text-sm">VR gasto por dia:</p>
              <input
                type="text"
                placeholder="VR"
                className="px-3 py-1 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                defaultValue={row?.vrPerDay ? row.vrPerDay : 0.0}
              />
            </div>
            <div className="w-full flex flex-col gap- pb-6">
              <p className="text-sm">VT gasto por dia:</p>
              <input
                type="text"
                placeholder="VT"
                className="px-3 py-1 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                defaultValue={row?.vtPerDay ? row.vtPerDay : 0.0}
              />
            </div>
          </div>
        ) : (
          <div>
            <p>Sem Dados</p>
          </div>
        )}
      </ModalBase>

      <ModalBase
        title="Adicionar Ticket"
        open={openModalTicket}
        onClose={() => setOpenModalTicket(false)}
        onSend={handleSendTickets}
      >
        {row ? (
          <TicketArrayFields
            codeEmployee={row?.codeEmployee}
            data={row?.ticket}
            onChange={setEditedTickets}
          />
        ) : (
          <p>Sem Dados</p>
        )}
      </ModalBase>

      <ModalBase
        title="Adicionar PDF"
        open={openModalAddPdf}
        onClose={() => setOpenModalAddPdf(false)}
        onSend={() => console.log("ok")}
      >
        <div>
          <input
            type="file"
            accept="application/pdf"
            className="w-full mb-4 px-3 py-1 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
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
        onSend={() => console.log("ok")}
      >
        <div className="mb-3">
          <input
            type="date"
            className="w-full px-3 py-1 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-3">
          <input type="checkbox" name="pdfType" value="tipo1" />{" "}
          <span>Possui atestado</span>
        </div>
      </ModalBase>

      <div
        style={{
          marginTop: "0.5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            width: "97%",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            gap: "10px",
          }}
        >
          <button
            style={{
              padding: "8px",
              backgroundColor: "green",
              color: "white",
              borderRadius: "8px",
            }}
            onClick={handleAddPdf}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
              }}
            >
              <p style={{ fontWeight: "bold" }}>PDF</p>
              <Icons name="MdOutlineAddCircle" size={20} />
            </div>
          </button>
        </div>
        <DataTable<EmployeeResponseType>
          data={data?.data}
          totalPages={data?.totalPages}
          page={page}
          onlyFields={[
            "name",
            "jobDescription",
            "company.name",
            "vtTotal",
            "vtPerDay",
            "vrTotal",
            "vrPerDay",
          ]}
          columnLabels={{
            name: "Nome",
            jobDescription: "Cargo",
            "company.name": "Empresa",
            vtTotal: "Total VT",
            vtPerDay: "Total VT por dia",
            vrTotal: "Total VR",
            vrPerDay: "VR por dia",
          }}
          onNextPageClick={() => setPage((page) => page + 1)}
          onBackPageClick={() => setPage((page) => page - 1)}
          onEditClick={handleEdit}
          onDeleteClick={handleDelete}
          onAddAbsentClick={handleAddAbsent}
          onAddTicketClick={handleAddTicket}
          searchValue={name}
          onChangeSearchValue={handleChangeValueInput}
        />
      </div>
    </Layout>
  );
}
