import prisma from "@/lib/prisma";
import { ChartTabs } from "@/components/tabs";
import MurphForm from "@/components/form";

export default async function Home() {
  const data = await prisma.murph.findMany({
    orderBy: {
      date: "desc",
    },
  });

  const chartData = [...data].reverse().map((item, index) => {
    return {
      index: index,
      Date: item.date.toDateString(),
      Pullups: item.pullups,
      Pushups: item.pushups,
      Squats: item.squats,
      "First Mile": item.firstMileMin * 60 + item.firstMileSec,
      "Second Mile": item.secondMileMin * 60 + item.secondMileSec,
    };
  });

  return (
    <main className="h-auto grid grid-cols-1 md:grid-cols-2 p-8 lg:p-16 gap-4">
      <MurphForm />
      <ChartTabs data={chartData} />
    </main>
  );
}
