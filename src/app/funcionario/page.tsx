"use client";

import { DataTable } from "@/components/DataTable";
import { Layout } from "@/components/Layout";
import { useCallback, useMemo } from "react";

type Data = {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
};

export default function FuncionariosPage() {
  const data: Data[] = useMemo(() => [
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "1234567890",
      address: "123 Main St, Anytown, USA",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      phone: "1234567890",
      address: "123 Main St, Anytown, USA",
    },
    {
      id: 3,
      name: "John San",
      email: "john.san@example.com",
      phone: "1234567890",
      address: "123 Main St, Anytown, USA",
    },
    {
      id: 4,
      name: "John Mar",
      email: "john.mar@example.com",
      phone: "1234567890",
      address: "123 Main St, Anytown, USA",
    },
    {
      id: 5,
      name: "John Júnior",
      email: "john.junior@example.com",
      phone: "1234567890",
      address: "123 Main St, Anytown, USA",
    },
    {
      id: 6,
      name: "John Mílton",
      email: "john.milton@example.com",
      phone: "1234567890",
      address: "123 Main St, Anytown, USA",
    },
    {
      id: 7,
      name: "John Miniquinha",
      email: "john.miniquinha@example.com",
      phone: "1234567890",
      address: "123 Main St, Anytown, USA",
    },
    {
      id: 8,
      name: "John Matheus",
      email: "john.matheus@example.com",
      phone: "1234567890",
      address: "123 Main St, Anytown, USA",
    },
    {
      id: 9,
      name: "John Alves",
      email: "john.alves@example.com",
      phone: "1234567890",
      address: "123 Main St, Anytown, USA",
    },
    {
      id: 10,
      name: "John Abadia",
      email: "john.abadia@example.com",
      phone: "1234567890",
      address: "123 Main St, Anytown, USA",
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
    <Layout pageTitle="Funcionários">
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
