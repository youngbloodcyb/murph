import MurphForm from "@/components/form";
import prisma from "@/lib/prisma";
import Murph from "@/components/murph";

export default async function Home() {
  const data = await prisma.murph.findMany();
  return (
    <main className="flex min-h-screen flex-col p-8 lg:p-24">
      <MurphForm />
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
    </main>
  );
}
