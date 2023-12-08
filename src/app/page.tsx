import { TodoTable } from "@/components/todo-table";

export default function Home() {
  return (
    <div className="fixed inset-0">
      <div className="h-full w-full flex pt-20 justify-center">
        <div className="container">
          <TodoTable />
        </div>
      </div>
    </div>
  );
}
