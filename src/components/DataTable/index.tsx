import { useEffect, useState } from "react";
import { Icons } from "../Icons";
import { Spinner } from "../Spinner";

import { DataTableProps } from "./types";

export function DataTable({
  page,
  data,
  perPage,
  total,
  onNextPageClick,
  onBackPageClick,
  onEditClick,
  onDeleteClick,
  onAddAbsentClick,
}: DataTableProps) {

  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1160);
    };
    
    handleResize();
    
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const totalPages = Math.ceil((total ?? 0) / perPage);

  if (!data || data.length === 0) {
    return (
      <div className="m-auto flex h-96 w-auto items-center justify-center">
        <Spinner />
        <p className="text-gray-500 text-2xl">Nenhum dado encontrado</p>
      </div>
    );
  }


  const columns = Object.keys(data[0]);

   if (isMobile) {
    return (
      <div style={{ padding: "1rem", width: "100%" }}>
        {data.map((row, index) => (
          <div 
            key={index} 
            style={{
              border: "1px solid #4B5563",
              borderRadius: "0.5rem",
              padding: "1rem",
              marginBottom: "1rem",
              backgroundColor: index % 2 === 0 ? "#F3F4F6" : "#E5E7EB",
            }}
          >
            {columns.map((column) => (
              <div key={column} style={{ marginBottom: "0.5rem" }}>
                <strong>{column.charAt(0).toUpperCase() + column.slice(1)}:</strong> {row[column]}
              </div>
            ))}
            <div style={{ display: "flex", justifyContent: "flex-end", gap: "1rem" }}>
              {onEditClick && (
                <button
                  onClick={() => onEditClick(row)}
                  style={{
                    color: "#3B82F6",
                    cursor: "pointer",
                    background: "none",
                    border: "none",
                  }}
                >
                  <Icons name="MdEdit" size={20} />
                </button>
              )}
              {onDeleteClick && (
                <button
                  onClick={() => onDeleteClick(row)}
                  style={{
                    color: "#EF4444",
                    cursor: "pointer",
                    background: "none",
                    border: "none",
                  }}
                >
                  <Icons name="MdDelete" size={20} />
                </button>
              )}
              {
                onAddAbsentClick && (
                  <button
                    onClick={() => onAddAbsentClick(row)}
                    style={{
                    color: "orange",
                    cursor: "pointer",
                    background: "none",
                    border: "none",
                  }}
                  >
                    <Icons name="BsPersonExclamation" size={20} />
                  </button>
                )
              }
            </div>
          </div>
        ))}
        <div style={{ marginTop: "1rem", display: "flex", justifyContent: "flex-end" }}>
          <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
            {totalPages > 1 && page > 1 && (
              <button
                onClick={onBackPageClick}
                style={{
                  borderRadius: "0.25rem",
                  backgroundColor: "#2563EB",
                  padding: "0.25rem 1rem",
                  fontWeight: "bold",
                  color: "white",
                  cursor: "pointer",
                }}
              >
                <Icons name="MdNavigateBefore" size={20} />
              </button>
            )}
            <p>
              Página {page} de {totalPages}
            </p>
            {page < totalPages && (
              <button
                onClick={onNextPageClick}
                style={{
                  borderRadius: "0.25rem",
                  backgroundColor: "#2563EB",
                  padding: "0.25rem 1rem",
                  fontWeight: "bold",
                  color: "white",
                  cursor: "pointer",
                }}
              >
                <Icons name="MdNavigateNext" size={20} />
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }


  return (
   <div className="flex h-full w-full flex-col p-4">
    <input 
      type="text" 
      style={{ width: "100%", padding: "0.5rem", borderRadius: "0.25rem", borderBottom: "1px solid #4B5563", outline: 'none', backgroundColor: 'transparent', marginBottom: '1%' }}
      placeholder="Pesquisar..."
    />
      <table className="max-h-full w-full table-auto border-collapse rounded-full border dark:border-gray-600">
        <thead>
          <tr className="bg-gray-200 dark:bg-gray-800">
            {columns.map((column) => (
              <th
                key={column}
                className="h-[2.5rem] border-b border-gray-300 dark:border-gray-600 px-4 py-2 text-left"
              >
                {column.charAt(0).toUpperCase() + column.slice(1)}
              </th>
            ))}
            <th className="h-[2.5rem] border-b border-gray-300 dark:border-gray-600 px-4 py-2">
              Ações
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr
              key={index + row[columns[index]]}
              className={index % 2 === 0 ? "bg-gray-100 dark:bg-gray-600" : "bg-gray-200 dark:bg-gray-800"}
            >
              {columns.map((column) => (
                <td
                  key={column}
                  className="border-b border-gray-300 dark:border-gray-600 px-4 py-2 text-left"
                >
                  {row[column]}
                </td>
              ))}
                <td className="border-b border-gray-300 dark:border-gray-600 px-4 py-2 text-center">
                  {onEditClick && (<button
                    onClick={() => onEditClick(row)}
                    className="mr-2 text-blue-500 hover:text-blue-700"
                  >
                    <Icons name="MdEdit" size={20} />
                  </button>)
                  }

                  {onDeleteClick && (
                    <button
                    onClick={() => onDeleteClick(row)}
                    className="mr-2 text-red-500 hover:text-red-700"
                  >
                    <Icons name="MdDelete" size={20} />
                  </button>
                  )}

                  {onAddAbsentClick && (
                    <button
                    onClick={() => onAddAbsentClick(row)}
                    className="text-green-500 hover:text-green-700"
                  >
                    <Icons name="BsPersonExclamation" size={20} />
                  </button>
                  )}
                </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 flex justify-end ">
        <div className="flex gap-4">
          {totalPages > 1 && page > 1 && (
            <button
              onClick={onBackPageClick}
              className="rounded bg-blue-600 px-4 py-0 font-bold text-white hover:bg-primary-100"
            >
              <Icons name="MdNavigateBefore" size={20} />
            </button>
          )}
          <p>
            Página {page} de {totalPages}
          </p>
          {page < totalPages && (
            <button
              onClick={onNextPageClick}
              className="rounded bg-blue-600 px-4 py-1 font-bold text-white hover:bg-primary-100"
            >
              <Icons name="MdNavigateNext" size={20} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
