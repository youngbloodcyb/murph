"use client";

type ChartData = {
  index: number;
  Date: string;
  Pullups: number;
  Pushups: number;
  Squats: number;
  "First Mile": number;
  "Second Mile": number;
}[];

import { useState, useEffect } from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  LineChart,
  Title,
  Flex,
  Metric,
  Text,
  BadgeDelta,
} from "@tremor/react";

import { Separator } from "@/components/ui/separator";

const customTooltip = ({ payload, active }: any) => {
  if (!active || !payload) return null;
  return (
    <div className="w-56 rounded-tremor-default text-tremor-default bg-tremor-background p-2 shadow-tremor-dropdown border border-tremor-border">
      {payload.map((category, index) => (
        <div key={index} className="flex flex-1 space-x-2.5">
          <div
            className={`w-1 flex flex-col bg-${category.color}-500 rounded`}
          />
          <div className="space-y-1">
            <p className="text-tremor-content">{category.dataKey}</p>
            <p className="font-medium text-tremor-content-emphasis">
              {Math.floor(category.value / 60)}:
              {(category.value % 60).toString().padStart(2, "0")}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export function ChartTabs({ data }: { data: ChartData }) {
  const [value, setValue] = useState<ChartData | null>(null);
  const [previousValue, setPreviousValue] = useState<ChartData | null>(null);
  useEffect(() => {
    let index = value?.index - 1 ?? 0;
    setPreviousValue(data[index]);
  }, [value]);

  return (
    <div className="h-full flex flex-col">
      <Tabs defaultValue="reps" className="h-full flex flex-col gap-2">
        <TabsList className="w-full grid grid-cols-2 rounded-lg">
          <TabsTrigger className="rounded-lg" value="reps">
            Reps
          </TabsTrigger>
          <TabsTrigger className="rounded-lg" value="time">
            Mile times
          </TabsTrigger>
        </TabsList>
        <TabsContent
          value="reps"
          className="h-full flex flex-col justify-between gap-4"
        >
          <Card className="rounded-lg">
            <Title>Reps</Title>
            <LineChart
              className="mt-6 bx-border"
              data={data}
              index="Date"
              categories={["Pullups", "Pushups", "Squats"]}
              colors={["indigo", "cyan", "emerald"]}
              yAxisWidth={40}
              onValueChange={(v) => setValue(v)}
              connectNulls={true}
            />
          </Card>
          <Card className="flex-grow h-full">
            {value && (
              <div className="space-y-2">
                <div>
                  <Flex justifyContent="between" alignItems="center">
                    <Text>Pullups</Text>
                    <BadgeDelta
                      deltaType="moderateIncrease"
                      isIncreasePositive={true}
                      size="xs"
                    >
                      {(
                        ((value?.["Pullups"] - previousValue?.["Pullups"]) /
                          previousValue?.["Pullups"]) *
                        100
                      ).toFixed(2)}
                      %
                    </BadgeDelta>
                  </Flex>
                  <Metric className="text-2xl">{value?.["Pullups"]}</Metric>
                </div>
                <Separator />
                <div>
                  <Flex justifyContent="between" alignItems="center">
                    <Text>Pushups</Text>
                    <BadgeDelta
                      deltaType="moderateIncrease"
                      isIncreasePositive={true}
                      size="xs"
                    >
                      {(
                        ((value?.["Pushups"] - previousValue?.["Pushups"]) /
                          previousValue?.["Pushups"]) *
                        100
                      ).toFixed(2)}
                      %
                    </BadgeDelta>
                  </Flex>
                  <Metric className="text-2xl">{value?.["Pushups"]}</Metric>
                </div>
                <Separator />
                <div>
                  <Flex justifyContent="between" alignItems="center">
                    <Text>Squats</Text>
                    <BadgeDelta
                      deltaType="moderateIncrease"
                      isIncreasePositive={true}
                      size="xs"
                    >
                      {(
                        ((value?.["Squats"] - previousValue?.["Squats"]) /
                          previousValue?.["Squats"]) *
                        100
                      ).toFixed(2)}
                      %
                    </BadgeDelta>
                  </Flex>
                  <Metric className="text-2xl">{value?.["Squats"]}</Metric>
                </div>
              </div>
            )}
          </Card>
        </TabsContent>
        <TabsContent value="time" className="h-full">
          <div className="h-full flex flex-col gap-4">
            <Card className="rounded-lg">
              <Title>Mile times</Title>
              <LineChart
                className="mt-6 bx-border"
                data={data}
                index="Date"
                categories={["First Mile", "Second Mile"]}
                colors={["indigo", "emerald"]}
                yAxisWidth={40}
                customTooltip={customTooltip}
              />
            </Card>
            <Card>
              <Flex justifyContent="between" alignItems="center">
                <Text>Sales</Text>
                <BadgeDelta
                  deltaType="moderateIncrease"
                  isIncreasePositive={true}
                  size="xs"
                >
                  +12.3%
                </BadgeDelta>
              </Flex>
              <Metric>$ 23,456</Metric>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
