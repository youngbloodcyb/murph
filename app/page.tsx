import { Card, LineChart, Title } from "@tremor/react";
import prisma from "@/lib/prisma";
import Murph from "@/components/murph";
import { ChartTabs } from "@/components/tabs";

export default async function Home() {
  const data = await prisma.murph.findMany({
    orderBy: {
      date: "desc",
    },
  });

  const chartData = data.reverse().map((item) => {
    return {
      date: item.date.toDateString(),
      pullups: item.pullups,
      pushups: item.pushups,
      squats: item.squats,
    };
  });

  return (
    <main className="h-auto flex flex-grow p-8 lg:p-16 gap-4">
      <div className="w-1/2 h-max space-y-4">
        {data.slice(0, 3).map((murph) => (
          <div key={murph.id} className="w-full">
            <Murph
              date={murph.date}
              firstMileMin={murph.firstMileMin}
              firstMileSec={murph.firstMileSec}
              secondMileMin={murph.secondMileMin}
              secondMileSec={murph.secondMileSec}
              pullups={murph.pullups}
              pushups={murph.pushups}
              squats={murph.squats}
            />
          </div>
        ))}
        <div className="shadow-sm w-full p-4 border border-slate-200 rounded-lg">
          View more workouts
        </div>
      </div>
      <ChartTabs data={chartData} />
      {/* <Card className="w-1/2 rounded-lg flex-grow">
        <Title>Reps</Title>
        <LineChart
          className="mt-6"
          data={chartData}
          index="date"
          categories={["pullups", "pushups", "squats"]}
          colors={["indigo", "cyan", "emerald"]}
          yAxisWidth={40}
        />
      </Card> */}
    </main>
  );
}
