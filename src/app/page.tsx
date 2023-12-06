import { DatePickerDemo } from "@/components/date-picker";

export default function Home() {
  return (
    <div className="fixed inset-0">
      <div className="h-full w-full flex pt-20 justify-center">
        <DatePickerDemo />
      </div>
    </div>
  );
}
