"use client";
import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

// Example Todo type
type Todo = {
  id: string;
  text: string;
};

// Example data
const initialTodos: Todo[] = [
  { id: "todo-1", text: "Todo 1" },
  { id: "todo-2", text: "Todo 2" },
  { id: "todo-3", text: "Todo 3" },
];

// A helper function to reorder the todo list
const reorder = (
  list: Todo[],
  startIndex: number,
  endIndex: number
): Todo[] => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export function DND() {
  const [todos, setTodos] = useState(initialTodos);

  const handleDragEnd = (result: any) => {
    // Dropped outside the list
    if (!result.destination) {
      return;
    }

    const reorderedTodos = reorder(
      todos,
      result.source.index,
      result.destination.index
    );

    setTodos(reorderedTodos);
    // Here, you would also update the order in Firestore
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="droppable">
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {todos.map((todo, index) => (
              <Draggable key={todo.id} draggableId={todo.id} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={{
                      ...provided.draggableProps.style,
                      marginBottom: "8px",
                      backgroundColor: "lightgray",
                      padding: "8px",
                      borderRadius: "4px",
                    }}
                  >
                    {todo.text}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
