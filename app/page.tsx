import MurphForm from "@/components/form";
import { Card, LineChart, Title } from "@tremor/react";
import prisma from "@/lib/prisma";
import Murph from "@/components/murph";

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
    <main className="min-h-screen flex p-8 lg:p-16 gap-4">
      <MurphForm />
      <div className="w-1/2">
        {data.map((murph) => (
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
      </div>
      <Card className="w-1/2 rounded-lg">
        <Title>Reps</Title>
        <LineChart
          className="mt-6"
          data={chartData}
          index="date"
          categories={["pullups", "pushups", "squats"]}
          colors={["indigo", "cyan", "emerald"]}
          yAxisWidth={40}
        />
      </Card>
    </main>
  );
}
