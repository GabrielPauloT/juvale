"use client";

import { DataTable } from "@/components/DataTable";
import { Layout } from "@/components/Layout";
import { useCallback, useEffect, useState } from "react";
import { findAllCompanyResponseType } from "@/service/types";
import { ModalBase } from "@/components/ModalBase";
import { debounce } from "lodash";
import { useQueryClient } from "@tanstack/react-query";
import { ReactQueryKeysEnum } from "@/@types";
import { Toast } from "@/components/Toast";
import {
  useCompany,
  useCreateCompany,
  useDeleteCompany,
  useEditCompany,
} from "@/service/hooks/CompanyQuery";

export default function CompanyPage() {
  const queryCliente = useQueryClient();
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [openModalCreate, setOpenModalCreate] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [row, setRow] = useState<findAllCompanyResponseType>();
  const [page, setPage] = useState(1);
  const [perPage] = useState(10);
  const [searchDebounced, setSearchDebounced] = useState<string>("");
  const [search, setSearch] = useState<string>("");

  const { data } = useCompany({ page, perPage, name: searchDebounced });
  const updateCompanyMutation = useEditCompany();
  const deleteCompanyMutation = useDeleteCompany();
  const createCompanyMutation = useCreateCompany();

  const [name, setName] = useState("");

  const [toast, setToast] = useState<
    { type: "success" | "error"; message: string } | undefined
  >();

  const showToast = (message: string, type: "success" | "error") => {
    setToast({ type, message });
  };

  const [loading, setIsLoading] = useState(false);

  useEffect(() => {
    if (row) {
      setName(row.name ?? "");
    }
  }, [row]);

  const handleEdit = useCallback(() => {
    if (row) {
      setIsLoading(true);
      updateCompanyMutation
        .mutateAsync({
          id: row.id,
          name: name,
        })
        .then(() => {
          showToast("Empresa atualizado com sucesso", "success");
          queryCliente.invalidateQueries({
            queryKey: [ReactQueryKeysEnum.USE_COMPANY_FIND_ALL],
          });
          if (data?.data?.length === 0) {
            setPage((page) => page - 1);
          }
        })
        .catch(() => {
          showToast("Erro ao atualizar empresa", "error");
        })
        .finally(() => {
          setOpenModalEdit(false);
          setIsLoading(false);
        });
    }
  }, [row, updateCompanyMutation, name, queryCliente, data?.data?.length]);

  const handleCreate = useCallback(() => {
    setIsLoading(true);
    createCompanyMutation
      .mutateAsync({
        name: name,
      })
      .then(() => {
        showToast("Empresa criada com sucesso", "success");
        queryCliente.invalidateQueries({
          queryKey: [ReactQueryKeysEnum.USE_COMPANY_FIND_ALL],
        });
        if (data?.data?.length === 0) {
          setPage((page) => page - 1);
        }
      })
      .catch(() => {
        showToast("Erro ao criar empresa", "error");
      })
      .finally(() => {
        setOpenModalCreate(false);
        setIsLoading(false);
      });
  }, [createCompanyMutation, name, queryCliente, data?.data?.length]);

  const handleDelete = useCallback(() => {
    if (row) {
      setIsLoading(true);
      deleteCompanyMutation
        .mutateAsync(row.id)
        .then(() => {
          showToast("Empresa deletado com sucesso", "success");
          queryCliente.invalidateQueries({
            queryKey: [ReactQueryKeysEnum.USE_COMPANY_FIND_ALL],
          });
          if (data?.data?.length === 0) {
            setPage((page) => page - 1);
          }
        })
        .catch(() => {
          showToast("Erro ao deletar empresa", "error");
        })
        .finally(() => {
          setOpenModalDelete(false);
          setIsLoading(false);
        });
    }
  }, [row, deleteCompanyMutation, queryCliente, data]);

  useEffect(() => {
    const debouncedSearchInput = debounce((value: string) => {
      setSearchDebounced(value);
    }, 400);

    debouncedSearchInput(search);

    return () => {
      debouncedSearchInput.cancel();
    };
  }, [search]);

  useEffect(() => {
    setPage(1);
  }, [searchDebounced]);

  return (
    <>
      <Layout pageTitle="Empresas">
        <div className="mt-2">
          <div className="flex justify-end mb-4 px-4 mt-5">
            <button
              onClick={() => {
                setRow(undefined);
                setName("");
                setOpenModalCreate(true);
              }}
              className="flex items-center gap-2 rounded-md bg-blue-600 hover:bg-blue-700 dark:bg-gray-700 px-4 py-2 font-semibold text-white dark:hover:bg-gray-800 transition-all"
            >
              <span>➕</span> Criar Empresa
            </button>
          </div>
          <DataTable<findAllCompanyResponseType>
            searchValue={search}
            onChangeSearchValue={(v) => setSearch(v.target.value)}
            data={data?.data}
            totalPages={data?.totalPages}
            page={page}
            hiddenFields={["created_at", "last_modified", "id", "enabled"]}
            onNextPageClick={() => setPage((page) => page + 1)}
            onBackPageClick={() => setPage((page) => page - 1)}
            onEditClick={(row) => {
              setRow(row);
              setOpenModalEdit(true);
            }}
            onDeleteClick={(row) => {
              setRow(row);
              setOpenModalDelete(true);
            }}
            onViewClick={(row) => {
              setRow(row);
              setOpenModalEdit(true);
            }}
          />
        </div>
      </Layout>
      <ModalBase
        title="Atualizar Empresa"
        actionButton="Atualizar"
        open={openModalEdit}
        onClose={() => setOpenModalEdit(false)}
        onSend={handleEdit}
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
                value={name}
                onChange={(v) => setName(v.target.value)}
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
        title="Cadastrar Empresa"
        actionButton="Cadastrar"
        open={openModalCreate}
        onClose={() => setOpenModalCreate(false)}
        onSend={handleCreate}
        isFetching={loading}
      >
        <div className="flex flex-col gap-4">
          <div className="w-full flex flex-col gap-1">
            <p className="text-sm">Nome:</p>
            <input
              type="text"
              placeholder="Nome"
              className="px-3 py-1 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={name}
              onChange={(v) => setName(v.target.value)}
            />
          </div>
        </div>
      </ModalBase>
      <ModalBase
        title="Deletar Empresa"
        actionButton="Deletar"
        open={openModalDelete}
        onClose={() => setOpenModalDelete(false)}
        onSend={handleDelete}
        isFetching={loading}
      >
        {row ? (
          <p className="text-base mb-6">
            Tem certeza que deseja deletar o registro de{" "}
            {row?.name ? row.name : "{sem nome}"}
          </p>
        ) : (
          <div>
            <p>Sem Dados</p>
          </div>
        )}
      </ModalBase>

      {toast && (
        <Toast type={toast.type} message={toast.message} isClose={setToast} />
      )}
    </>
  );
}
