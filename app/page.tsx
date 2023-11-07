import prisma from "@/lib/prisma";
import Murph from "@/components/murph";
import { ChartTabs } from "@/components/tabs";
import MurphForm from "@/components/form";

export default async function Home() {
  const data = await prisma.murph.findMany({
    orderBy: {
      date: "desc",
    },
  });

  const chartData = [...data].reverse().map((item) => {
    return {
      Date: item.date.toDateString(),
      Pullups: item.pullups,
      Pushups: item.pushups,
      Squats: item.squats,
      "First Mile": item.firstMileMin * 60 + item.firstMileSec,
      "Second Mile": item.secondMileMin * 60 + item.secondMileSec,
    };
  });

  return (
    <main className="h-auto grid grid-cols-2 p-8 lg:p-16 gap-4">
      <div className="h-max space-y-4">
        {data.slice(0, 3).map((murph) => (
          <div key={murph.id} className="w-full">
            <Murph data={murph} />
          </div>
        ))}
        <div className="shadow-sm w-full p-4 border border-slate-200 rounded-lg">
          View more workouts
        </div>
      </div>
      <ChartTabs data={chartData} />
      {/* <MurphForm /> */}
    </main>
  );
}
