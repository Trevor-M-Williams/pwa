import { ListBulletIcon } from "@radix-ui/react-icons";

export default function Menu() {
  return (
    <div className="flex p-4">
      <div className="flex flex-col items-center justify-center p-2 rounded-full bg-gray-100">
        <ListBulletIcon className="h-8 w-8" />
      </div>
    </div>
  );
}
