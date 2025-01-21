"use client";

import { DataTable } from "@/components/DataTable";
import { Layout } from "@/components/Layout";
import { useCallback, useMemo } from "react";

type Data = {
  id: number;
  name: string;
};

export default function RelatorioPage() {
  const data: Data[] = useMemo(() => [
    {
      id: 1,
      name: "Relatório de Funcionários"
    },
    {
      id: 2,
      name: "Relatório de Vale Refeição"
    },
    {
      id: 3,
      name: "Relatório de Vale Transporte"
    }
  ], []);

  function handleNextPage() {
    console.log("next page");
  }

  function handleBackPage() {
    console.log("back page");
  }

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
    <Layout pageTitle="Relatórios">
      <div className="mt-2">
        <DataTable
          data={data}
          perPage={10}
          total={10}
          page={1}
          onNextPageClick={() => handleNextPage()}
          onBackPageClick={() => handleBackPage()}
          onEditClick={handleEdit}
          onDeleteClick={handleDelete}
          onViewClick={handleView}
        />
      </div>
    </Layout>
  );
}
