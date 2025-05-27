"use client";

import { DataTable } from "@/components/DataTable";
import { Layout } from "@/components/Layout";
import { useCallback, useState } from "react";
import { useUser } from "@/service/hooks/UserQuery";

type Data = {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
};

export default function UsuariosPage() {
  const [page, setPage] = useState(1);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [perPage, setPerPage] = useState(10);

  const { data } = useUser({ page, perPage });

  const handleEdit = useCallback((row: Data) => {
    console.log("edit", row);
  }, []);

  const handleDelete = useCallback((row: Data) => {
    console.log("delete", row);
  }, []);

  const handleView = useCallback((row: Data) => {
    console.log("view", row);
  }, []);

  return (
    <Layout pageTitle="Usuários">
      <div className="mt-2">
        <DataTable
          data={data?.data}
          totalPages={data?.totalPages}
          page={page}
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
