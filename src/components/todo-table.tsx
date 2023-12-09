"use client";
import * as React from "react";
import { TodoContext } from "@/lib/context";

import { doc, collection, deleteDoc, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { TodoModal } from "./todo-modal";

export const columns: ColumnDef<Todo>[] = [
  {
    id: "select",
    header: () => <div className="w-12"></div>,
    cell: ({ row }) => (
      <Checkbox
        defaultChecked={row.original.status}
        onCheckedChange={() => console.log("check")}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "text",
    cell: ({ row }) => <div className="">{row.getValue("text")}</div>,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const todo = row.original;

      async function deleteTodo() {
        await deleteDoc(doc(db, "todos", todo.id));
      }

      return (
        <div className="p-0 text-right">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="px-2">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem>Complete</DropdownMenuItem>
              <DropdownMenuItem>View details</DropdownMenuItem>
              <DropdownMenuItem onClick={deleteTodo}>Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];

function TodoWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative h-full w-full">
      <div className="flex justify-between">
        <h1 className="text-xl text-gray-700 font-semibold">To Do</h1>
        <TodoModal />
      </div>
      {children}
    </div>
  );
}

export function TodoTable() {
  const { todos, loading } = React.useContext(TodoContext);

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data: todos,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  if (loading) {
    return (
      <TodoWrapper>
        <div className="flex justify-center items-center h-full">
          <p>Loading...</p>
        </div>
      </TodoWrapper>
    );
  }

  if (todos.length === 0) {
    return (
      <TodoWrapper>
        <div className="flex justify-center items-center h-full">
          <p>No todos found.</p>
        </div>
      </TodoWrapper>
    );
  }

  return (
    <TodoWrapper>
      <Table>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="absolute bottom-0 w-full flex items-center justify-end space-x-2 py-4">
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </TodoWrapper>
  );
}
