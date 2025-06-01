"use client";

import { DataTable } from "@/components/DataTable";
import { Layout } from "@/components/Layout";
import { useCallback, useEffect, useState } from "react";
import {
  useCreateUser,
  useDeleteUser,
  useUpdateUser,
  useUser,
} from "@/service/hooks/UserQuery";
import { roleUser, UsuarioResponseType } from "@/service/types";
import { ModalBase } from "@/components/ModalBase";
import { debounce } from "lodash";
import { useQueryClient } from "@tanstack/react-query";
import { ReactQueryKeysEnum } from "@/@types";
import { Toast } from "@/components/Toast";

export default function UsuariosPage() {
  const queryCliente = useQueryClient();
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [openModalCreate, setOpenModalCreate] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [row, setRow] = useState<UsuarioResponseType>();
  const [page, setPage] = useState(1);
  const [perPage] = useState(10);
  const [searchDebounced, setSearchDebounced] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);

  const { data } = useUser({ page, perPage, name: searchDebounced });
  const updateUserMutation = useUpdateUser();
  const deleteUserMutation = useDeleteUser();
  const createUserMutation = useCreateUser();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState<string>("");
  const [selectedRole, setSelectedRole] = useState<roleUser>("admin");

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
      setEmail(row.email ?? "");
      setSelectedRole(row.role ?? "");
    }
  }, [row]);

  const handleEdit = useCallback(() => {
    if (row) {
      setIsLoading(true);
      updateUserMutation
        .mutateAsync({
          id: row.id,
          userData: {
            email: email,
            password: password,
            name: name,
            role: selectedRole,
          },
        })
        .then(() => {
          showToast("Usuário atualizado com sucesso", "success");
          queryCliente.invalidateQueries({
            queryKey: [ReactQueryKeysEnum.USER_FINDALL],
          });
          if (data?.data?.length === 0) {
            setPage((page) => page - 1);
          }
        })
        .catch(() => {
          showToast("Erro ao atualizar usuário", "error");
        })
        .finally(() => {
          setOpenModalEdit(false);
          setIsLoading(false);
        });
    }
  }, [
    row,
    updateUserMutation,
    email,
    password,
    name,
    selectedRole,
    queryCliente,
    data?.data?.length,
  ]);

  const handleCreate = useCallback(() => {
    setIsLoading(true);
    createUserMutation
      .mutateAsync({
        email: email,
        password: password,
        name: name,
        role: selectedRole,
      })
      .then(() => {
        showToast("Usuário criado com sucesso", "success");
        queryCliente.invalidateQueries({
          queryKey: [ReactQueryKeysEnum.USER_FINDALL],
        });
        if (data?.data?.length === 0) {
          setPage((page) => page - 1);
        }
      })
      .catch(() => {
        showToast("Erro ao criar usuário", "error");
      })
      .finally(() => {
        setOpenModalCreate(false);
        setIsLoading(false);
      });
  }, [
    createUserMutation,
    email,
    password,
    name,
    selectedRole,
    queryCliente,
    data?.data?.length,
  ]);

  const handleDelete = useCallback(() => {
    if (row) {
      setIsLoading(true);
      deleteUserMutation
        .mutateAsync(row.id)
        .then(() => {
          showToast("Usuário deletado com sucesso", "success");
          queryCliente.invalidateQueries({
            queryKey: [ReactQueryKeysEnum.USER_FINDALL],
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
  }, [row, deleteUserMutation, queryCliente, data]);

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
      <Layout pageTitle="Usuários">
        <div className="mt-2">
          <div className="flex justify-end mb-4 px-4 mt-5">
            <button
              onClick={() => {
                setRow(undefined);
                setName("");
                setEmail("");
                setPassword("");
                setSelectedRole("admin");
                setOpenModalCreate(true);
              }}
              className="flex items-center gap-2 rounded-md bg-blue-600 hover:bg-blue-700 dark:bg-gray-700 px-4 py-2 font-semibold text-white dark:hover:bg-gray-800 transition-all"
            >
              <span>➕</span> Criar Usuário
            </button>
          </div>
          <DataTable<UsuarioResponseType>
            searchValue={search}
            onChangeSearchValue={(v) => setSearch(v.target.value)}
            data={data?.data}
            totalPages={data?.totalPages}
            page={page}
            hiddenFields={["createdAt", "updatedAt", "id"]}
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
        title="Atualizar Usuários"
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
            <div className="w-full flex flex-col gap-1">
              <p className="text-sm">Email:</p>
              <input
                type="email"
                placeholder="Email"
                className="px-3 py-1 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={email}
                onChange={(v) => setEmail(v.target.value)}
              />
            </div>
            <div className="w-full flex flex-col gap-1">
              <p className="text-sm">Password:</p>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="***********"
                  className="w-full px-3 py-1 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                  value={password}
                  onChange={(v) => setPassword(v.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm text-gray-500 dark:text-gray-300"
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
            </div>
            <div className="w-full flex flex-col gap-1">
              <p className="text-sm">Tipo de permissão:</p>
              <select
                className="px-3 py-1 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value as roleUser)}
              >
                <option value="" disabled>
                  Selecione o tipo de permissão
                </option>
                <option value="admin">Admin</option>
                <option value="user">Usuário</option>
              </select>
            </div>
          </div>
        ) : (
          <div>
            <p>Sem Dados</p>
          </div>
        )}
      </ModalBase>
      <ModalBase
        title="Cadastrar Usuário"
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
          <div className="w-full flex flex-col gap-1">
            <p className="text-sm">Email:</p>
            <input
              type="email"
              placeholder="Email"
              className="px-3 py-1 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(v) => setEmail(v.target.value)}
            />
          </div>
          <div className="w-full flex flex-col gap-1">
            <p className="text-sm">Password:</p>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="***********"
                className="w-full px-3 py-1 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                value={password}
                onChange={(v) => setPassword(v.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm text-gray-500 dark:text-gray-300"
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </div>
          <div className="w-full flex flex-col gap-1">
            <p className="text-sm">Tipo de permissão:</p>
            <select
              className="px-3 py-1 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value as roleUser)}
            >
              <option value="" disabled>
                Selecione o tipo de permissão
              </option>
              <option value="admin">Admin</option>
              <option value="user">Usuário</option>
            </select>
          </div>
        </div>
      </ModalBase>
      <ModalBase
        title="Deletar Usuário"
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
