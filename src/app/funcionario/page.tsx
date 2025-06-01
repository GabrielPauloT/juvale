"use client";

import { DataTable } from "@/components/DataTable";
import { Icons } from "@/components/Icons";
import { Layout } from "@/components/Layout";
import { ModalBase } from "@/components/ModalBase";
import {
  useDeleteEmployee,
  useEditEmployee,
  UseEmployee,
} from "@/service/hooks/UseEmployee";
import { EmployeeResponseType } from "@/service/types/employee";
import { SetStateAction, useCallback, useEffect, useState } from "react";
import { debounce } from "lodash";
import { ReactQueryKeysEnum } from "@/@types";
import { useQueryClient } from "@tanstack/react-query";
import { useCompany } from "@/service/hooks/CompanyQuery";
import { TicketArrayFields } from "./TicketArrayFields";
import { requestTicket } from "./TicketArrayFields/types";
import { useCreateAbsence } from "@/service/hooks/UseAbsence";
import { useInactivePDF, useUploadPDF } from "@/service/hooks/UsePdf";
import { useCreateTicket } from "@/service/hooks/UseTicket";
import { Toast } from "@/components/Toast";

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
  const [selectedCompanyPDF, setSelectedCompanyPDF] = useState<number>();

  const { data } = UseEmployee({
    page,
    perPage,
    companyId: selectedCompany,
    date: selectedDate,
    name: searchDebounced.trim(),
  });
  const { data: company } = useCompany({ page: 0, perPage: 100 });
  const deleteEmployeerMutation = useDeleteEmployee();
  const updateEmployeerMutation = useEditEmployee();
  const createAbsenceMutation = useCreateAbsence();
  const uploadPDF = useUploadPDF();
  const inactivePDF = useInactivePDF();
  const createTicket = useCreateTicket();

  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [openModalAddPdf, setOpenModalAddPdf] = useState(false);
  const [openModalAbsent, setOpenModalAbsent] = useState(false);
  const [openModalTicket, setOpenModalTicket] = useState(false);
  const [editedTickets, setEditedTickets] = useState<requestTicket[]>([]);
  const [row, setRow] = useState<EmployeeResponseType>();
  const [nameEmployee, setNameEmployee] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [salary, setSalary] = useState<number | string>(0);
  const [vr, setVr] = useState(0);
  const [date, setDate] = useState("");
  const [certificateAbsence, setCertificateAbsence] = useState(false);
  const [addFuncionario, setAddFuncionario] = useState(false);
  const [pdf, setPdf] = useState<File>();
  const [toast, setToast] = useState<
    { type: "success" | "error"; message: string } | undefined
  >();

  const showToast = (message: string, type: "success" | "error") => {
    setToast({ type, message });
  };

  const [selectedCompanyRow, setSelectedCompanyRow] = useState<number | null>(
    null
  );

  const [loading, setIsLoading] = useState(false);

  useEffect(() => {
    if (row) {
      setSelectedCompanyRow(row.company.id);
      setNameEmployee(row.name);
      setJobDescription(row.jobDescription);
      setSalary(row.salary ? row.salary : 0);
      setVr(row.vrPerDay ? row.vrPerDay : 0);
    }
  }, [row]);

  function handleAddPdf() {
    setOpenModalAddPdf(true);
  }

  function closeModalPdf() {
    setOpenModalAddPdf(false);
    setAddFuncionario(false);
  }

  function closeModalAbsent() {
    setOpenModalAbsent(false);
    setCertificateAbsence(false);
    setDate("");
  }

  function closeModalEdit() {
    setOpenModalEdit(false);
    setSelectedCompanyRow(null);
    setNameEmployee("");
    setJobDescription("");
    setSalary(0);
    setVr(0);
  }

  const handleAddTicket = useCallback((row: EmployeeResponseType) => {
    setOpenModalTicket(true);
    console.log("enviados");
    setRow(row);
  }, []);

  function handleSendTickets() {
    if (!!row) {
      setIsLoading(true);
      createTicket
        .mutateAsync(editedTickets)
        .then(() => {
          showToast("Ticket adicionado com sucesso", "success");
          queryCliente.invalidateQueries({
            queryKey: [ReactQueryKeysEnum.EMPLOYEE_FINDALL],
          });
        })
        .catch(() => {
          showToast("Erro ao adicionar ticket", "error");
        })
        .finally(() => {
          setOpenModalTicket(false);
          setIsLoading(false);
        });
    }
  }

  function handleChangeValueInput(input: {
    target: { value: SetStateAction<string> };
  }) {
    setName(input.target.value);
  }

  const handleEdit = useCallback((row: EmployeeResponseType) => {
    setOpenModalEdit(true);
    setRow(row);
  }, []);

  function handleActionPDF() {
    if (addFuncionario && pdf && selectedCompanyPDF) {
      setIsLoading(true);
      uploadPDF
        .mutateAsync({ pdf: pdf, companyId: selectedCompanyPDF.toString() })
        .then(() => {
          showToast("Pdf inserido com sucesso", "success");
          queryCliente.invalidateQueries({
            queryKey: [ReactQueryKeysEnum.EMPLOYEE_FINDALL],
          });
        })
        .catch(() => {
          showToast("Erro ao inserir PDF", "error");
        })
        .finally(() => {
          setOpenModalAddPdf(false);
          setIsLoading(false);
        });
    }

    if (!addFuncionario && pdf) {
      setIsLoading(true);
      inactivePDF
        .mutateAsync(pdf)
        .then(() => {
          showToast("Pdf inserido com sucesso", "success");
          queryCliente.invalidateQueries({
            queryKey: [ReactQueryKeysEnum.EMPLOYEE_FINDALL],
          });
        })
        .catch(() => {
          showToast("Erro ao inserir PDF", "error");
        })
        .finally(() => {
          setOpenModalAddPdf(false);
          setIsLoading(false);
        });
    }
  }

  function handleCreateAbsence() {
    if (!!row) {
      setIsLoading(true);
      createAbsenceMutation
        .mutateAsync({
          codeEmployee: row?.codeEmployee,
          absenceDate: date,
          certificateAbsence: certificateAbsence,
        })
        .then(() => {
          showToast("Falta adicionada com sucesso", "success");
          queryCliente.invalidateQueries({
            queryKey: [ReactQueryKeysEnum.EMPLOYEE_FINDALL],
          });
        })
        .catch(() => {
          showToast("Erro ao adicionar falta", "error");
        })
        .finally(() => {
          setOpenModalAbsent(false);
          setIsLoading(false);
        });
    }
  }

  function handleDeleteEmployee() {
    if (!!row) {
      setIsLoading(true);
      deleteEmployeerMutation
        .mutateAsync(row?.codeEmployee)
        .then(() => {
          showToast("Usuário deletado com sucesso", "success");
          queryCliente.invalidateQueries({
            queryKey: [ReactQueryKeysEnum.EMPLOYEE_FINDALL],
          });
          if (data?.data?.length === 0) {
            setPage((page) => page - 1);
          }
        })
        .catch(() => {
          showToast("Erro ao deletar usuário", "error");
        })
        .finally(() => {
          setOpenModalDelete(false);
          setIsLoading(false);
        });
    }
  }

  function handleUpdateEmployee() {
    const data = {
      codeCompany: selectedCompanyRow,
      name: nameEmployee,
      jobDescription: jobDescription,
      salary: salary,
      snackValue: vr,
    };
    if (!!row) {
      setIsLoading(true);
      updateEmployeerMutation
        .mutateAsync({ codeEmployee: row?.codeEmployee, data: data })
        .then(() => {
          showToast("Usuário editado com sucesso", "success");
          queryCliente.invalidateQueries({
            queryKey: [ReactQueryKeysEnum.EMPLOYEE_FINDALL],
          });
        })
        .catch(() => {
          showToast("Erro ao editar usuário", "error");
        })
        .finally(() => {
          setOpenModalEdit(false);
          setIsLoading(false);
          setIsLoading(false);
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
    <>
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
              Selecione a compania:
            </label>
            <select
              className="px-3 py-1 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-auto"
              value={selectedCompany ?? ""}
              onChange={(e) => setSelectedCompany(Number(e.target.value))}
            >
              <option value="">Selecione uma compania</option>
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
          onSend={handleDeleteEmployee}
          isFetching={loading}
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
          onClose={closeModalEdit}
          onSend={handleUpdateEmployee}
          isFetching={loading}
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
                  onChange={(e) => setNameEmployee(e.target.value)}
                />
              </div>
              <div className="w-full flex flex-col gap-1">
                <p className="text-sm">Compania:</p>
                <select
                  className="px-3 py-1 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={selectedCompanyRow ?? ""}
                  onChange={(e) =>
                    setSelectedCompanyRow(Number(e.target.value))
                  }
                >
                  <option value="" disabled>
                    Selecione uma compania
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
                  onChange={(e) => setJobDescription(e.target.value)}
                />
              </div>

              <div className="w-full flex flex-col gap-1">
                <p className="text-sm">Salário:</p>
                <input
                  type="text"
                  placeholder="VR"
                  className="px-3 py-1 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  defaultValue={row?.salary ? row.salary : 0.0}
                  onChange={(e) => setSalary(Number(e.target.value))}
                />
              </div>

              <div className="w-full flex flex-col gap-1">
                <p className="text-sm">VR gasto por dia:</p>
                <input
                  type="text"
                  placeholder="VR"
                  className="px-3 py-1 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  defaultValue={row?.vrPerDay ? row.vrPerDay : 0.0}
                  onChange={(e) => setVr(Number(e.target.value))}
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
          isFetching={loading}
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
          onClose={closeModalPdf}
          onSend={handleActionPDF}
          isFetching={loading}
        >
          <div>
            <input
              type="file"
              accept="application/pdf"
              className="w-full mb-4 px-3 py-1 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(event) => {
                if (event.target.files && event.target.files.length > 0) {
                  setPdf(event.target.files[0]);
                }
              }}
            />
          </div>
          <div className="flex flex-col items-start justify-start gap-2">
            <div>
              <input
                type="radio"
                name="pdfType"
                value="tipo1"
                onClick={() => setAddFuncionario(true)}
              />{" "}
              <span>Adicionar funcionário</span>
            </div>
            <div>
              <input
                type="radio"
                name="pdfType"
                value="tipo2"
                onClick={() => setAddFuncionario(false)}
              />{" "}
              <span>Desativar funcionário</span>
            </div>
          </div>

          {addFuncionario ? (
            <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-3 shadow-md w-full md:w-auto mt-4">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Selecione a compania:
              </label>
              <select
                className="px-3 py-1 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-auto"
                value={selectedCompanyPDF ?? ""}
                onChange={(e) => setSelectedCompanyPDF(Number(e.target.value))}
              >
                <option value="">Selecione uma compania</option>
                {company?.data?.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          ) : null}
        </ModalBase>

        <ModalBase
          title="Adicionar Falta"
          open={openModalAbsent}
          onClose={closeModalAbsent}
          onSend={handleCreateAbsence}
          isFetching={loading}
        >
          <div className="mb-3">
            <input
              type="date"
              className="w-full px-3 py-1 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <input
              type="checkbox"
              name="pdfType"
              value="tipo1"
              onClick={() => setCertificateAbsence(!certificateAbsence)}
            />{" "}
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
      {toast && (
        <Toast type={toast.type} message={toast.message} isClose={setToast} />
      )}
    </>
  );
}
