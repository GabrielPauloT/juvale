"use client";

import { DataTable } from "@/components/DataTable";
import { Layout } from "@/components/Layout";
import { useCallback, useState } from "react";
import { useUser } from "@/service/hooks/UserQuery";
import { UsuarioResponseType } from "@/service/types";

export default function UsuariosPage() {
  const [page, setPage] = useState(1);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [perPage, setPerPage] = useState(10);

  const { data } = useUser({ page, perPage });

  const handleEdit = useCallback((row: UsuarioResponseType) => {
    console.log("edit", row);
  }, []);

  const handleDelete = useCallback((row: UsuarioResponseType) => {
    console.log("delete", row);
  }, []);

  const handleView = useCallback((row: UsuarioResponseType) => {
    console.log("view", row);
  }, []);

  return (
    <Layout pageTitle="Usuários">
      <div className="mt-2">
        <DataTable<UsuarioResponseType>
          data={data?.data}
          totalPages={data?.totalPages}
          page={page}
          hiddenFields={["createdAt", "updatedAt"]}
          onNextPageClick={() => setPage((page) => page + 1)}
          onBackPageClick={() => setPage((page) => page - 1)}
          onEditClick={handleEdit}
          onDeleteClick={handleDelete}
          onViewClick={handleView}
        />
      </div>
    </Layout>
  );
}
