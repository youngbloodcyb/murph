type ChartData = {
  date: string;
  pullups: number;
  pushups: number;
  squats: number;
}[];

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, LineChart, Title } from "@tremor/react";

export function ChartTabs({ data }: { data: ChartData }) {
  return (
    <div className="w-1/2 flex-grow">
      <Tabs defaultValue="reps" className="h-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="reps">Reps</TabsTrigger>
          <TabsTrigger value="time">Mile times</TabsTrigger>
        </TabsList>
        <TabsContent value="reps" className="h-full">
          <Card className="rounded-lg h-full">
            <Title>Reps</Title>
            <LineChart
              className="mt-6"
              data={data}
              index="date"
              categories={["pullups", "pushups", "squats"]}
              colors={["indigo", "cyan", "emerald"]}
              yAxisWidth={40}
            />
          </Card>
        </TabsContent>
        <TabsContent value="time">Test</TabsContent>
      </Tabs>
    </div>
  );
}
