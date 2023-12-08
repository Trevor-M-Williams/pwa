"use client";
import { useState } from "react";
import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import { iconClass } from "@/lib/styles";
import { cn } from "@/lib/utils";

export function TodoModal() {
  const [todo, setTodo] = useState("");

  async function addTodo() {
    const timestamp = Date.now();
    const todoId = timestamp.toString();
    const docRef = doc(db, "todos", todoId);
    const payload = {
      text: todo,
      status: false,
    };
    await setDoc(docRef, payload);

    setTodo("");
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <AddBoxOutlinedIcon className={cn(iconClass)} />
      </DialogTrigger>
      <DialogContent className="w-[95%] sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-start">Add To Do</DialogTitle>
        </DialogHeader>
        <Textarea value={todo} onChange={(e) => setTodo(e.target.value)} />
        <DialogFooter>
          <Button onClick={addTodo}>Submit</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}