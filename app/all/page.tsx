import prisma from "@/lib/prisma";
import { DataTable } from "./components/data-table";
import { columns } from "./components/columns";

type DataTableProps = {
  date: Date;
  pullups: number;
  pushups: number;
  squats: number;
  "first mile": number;
  "second mile": number;
};

export default async function Page() {
  const data = await prisma.murph.findMany({
    orderBy: {
      date: "desc",
    },
  });

  const cleanedData = data.map((item) => {
    return {
      date: item.date,
      pullups: item.pullups,
      pushups: item.pushups,
      squats: item.squats,
      "first mile": item.firstMileMin * 60 + item.firstMileSec,
      "second mile": item.secondMileMin * 60 + item.secondMileSec,
    };
  });

  return (
    <main className="h-auto p-8 lg:p-16 gap-4">
      {/* @ts-ignore */}
      <DataTable data={cleanedData} columns={columns} />
    </main>
  );
}
