"use client";
import { useState, useContext } from "react";
import { TodoContext } from "@/lib/context";

import { doc, updateDoc, deleteDoc, writeBatch } from "firebase/firestore";
import { db } from "@/lib/firebase";

import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

import { TodoModal } from "./todo-modal";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";

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

export function TodoList() {
  const { todos, setTodos, loading } = useContext(TodoContext);
  const [draggingItemId, setDraggingItemId] = useState(null);

  async function deleteTodo(id: string, updatedTodos: Todo[]) {
    const batch = writeBatch(db);

    const todoRef = doc(db, "todos", id);
    batch.delete(todoRef);

    updatedTodos.forEach((todo) => {
      const todoUpdateRef = doc(db, "todos", todo.id);
      batch.update(todoUpdateRef, { orderIndex: todo.orderIndex });
    });

    await batch.commit();
  }

  function handleDragStart(start: any) {
    setDraggingItemId(start.draggableId);
  }

  function handleDragEnd(result: any) {
    setDraggingItemId(null);

    if (!result.destination) {
      return;
    }

    const reorderedTodos = reorderTodos(
      todos,
      result.source.index,
      result.destination.index
    );

    setTodos(reorderedTodos);

    const batch = writeBatch(db);

    reorderedTodos.forEach((todo, index) => {
      if (todo.orderIndex !== index) {
        const todoRef = doc(db, "todos", todo.id);
        batch.update(todoRef, { orderIndex: index });
      }
    });

    batch
      .commit()
      .catch((error) => console.error("Error updating order: ", error));
  }

  function handleDelete(id: string) {
    const newTodos = todos.filter((todo) => todo.id !== id);

    const updatedTodos = newTodos.map((todo, index) => ({
      ...todo,
      orderIndex: index,
    }));

    setTodos(updatedTodos);

    deleteTodo(id, updatedTodos);
  }

  function reorderTodos(
    list: Todo[],
    startIndex: number,
    endIndex: number
  ): Todo[] {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  }

  async function updateTodoStatus(id: string, newStatus: boolean) {
    const todoRef = doc(db, "todos", id);
    await updateDoc(todoRef, { status: newStatus });
  }

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
      <DragDropContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <Droppable droppableId="droppable">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {todos
                .sort((a, b) => a.orderIndex - b.orderIndex)
                .map((todo, index) => (
                  <Draggable key={todo.id} draggableId={todo.id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={`flex items-center justify-between gap-2 pl-1 py-2 rounded-sm border-secondary border-b last:border-b-0 ${
                          draggingItemId === todo.id ? "bg-secondary" : ""
                        }`}
                      >
                        <Checkbox
                          checked={todo.status}
                          onCheckedChange={(newStatus) =>
                            updateTodoStatus(todo.id, newStatus as boolean)
                          }
                          a-label="Select row"
                        />
                        <div className="flex-grow">{todo.text}</div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="px-2">
                              <span className="sr-only">Open menu</span>
                              <MoreHorizOutlinedIcon className="w-5 h-5" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>Complete</DropdownMenuItem>
                            <DropdownMenuItem>View details</DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleDelete(todo.id)}
                            >
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    )}
                  </Draggable>
                ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </TodoWrapper>
  );
}
