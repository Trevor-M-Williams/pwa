"use client";
import { createContext, useState, useEffect, ReactNode } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";

type TodoContextType = {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

export const TodoContext = createContext<TodoContextType>({
  todos: [],
  setTodos: () => {},
  loading: true,
  setLoading: () => {},
});

export const TodoProvider = ({ children }: { children: ReactNode }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "todos"), (querySnapshot) => {
      const fetchedTodos = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Todo[];
      setTodos(fetchedTodos);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <TodoContext.Provider value={{ todos, setTodos, loading, setLoading }}>
      {children}
    </TodoContext.Provider>
  );
};
