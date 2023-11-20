// TO-DO: fix any types

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
import Link from "next/link";

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
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";

const customTooltip = ({ payload, active }: any) => {
  if (!active || !payload) return null;
  return (
    <div className="w-56 rounded-tremor-default text-tremor-default bg-tremor-background p-2 shadow-tremor-dropdown border border-tremor-border">
      {payload.map((category: any, index: number) => (
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
  const [value, setValue] = useState<any>(null);
  const [previousValue, setPreviousValue] = useState<any>(null);
  const [calculatedValue, setCalculatedValue] = useState<any>(null);
  const firstMileAverage =
    data.reduce((sum, item) => sum + item["First Mile"], 0) / data.length;
  const secondMileAverage =
    data.reduce((sum, item) => sum + item["Second Mile"], 0) / data.length;
  useEffect(() => {
    let index = value?.index - 1 ?? 0;
    setPreviousValue(data[index]);
  }, [value, data]);

  useEffect(() => {
    setCalculatedValue({
      pullups: (
        ((value?.["Pullups"] - previousValue?.["Pullups"]) /
          previousValue?.["Pullups"]) *
        100
      ).toFixed(2),
      pushups: (
        ((value?.["Pushups"] - previousValue?.["Pushups"]) /
          previousValue?.["Pushups"]) *
        100
      ).toFixed(2),
      squats: (
        ((value?.["Squats"] - previousValue?.["Squats"]) /
          previousValue?.["Squats"]) *
        100
      ).toFixed(2),
    });
  }, [value, previousValue]);

  return (
    <div className="h-full">
      <Tabs defaultValue="reps" className="h-full flex flex-col gap-2">
        <TabsList className="w-full grid grid-cols-2 rounded-lg shadow-sm">
          <TabsTrigger className="rounded-lg" value="reps">
            Reps
          </TabsTrigger>
          <TabsTrigger className="rounded-lg" value="time">
            Mile times
          </TabsTrigger>
        </TabsList>
        <TabsContent value="reps" className="h-full">
          <div className="flex flex-col justify-between gap-4 h-full">
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
            <Card className="h-full">
              {value?.eventType === "dot" ? (
                <div className="space-y-1">
                  <div>
                    <Flex justifyContent="between" alignItems="center">
                      <Text>Pullups</Text>
                      <BadgeDelta
                        deltaType={
                          calculatedValue.pullups > 0
                            ? "moderateIncrease"
                            : calculatedValue.pullups < 0
                            ? "moderateDecrease"
                            : "unchanged"
                        }
                        size="xs"
                      >
                        {calculatedValue.pullups}%
                      </BadgeDelta>
                    </Flex>
                    <Metric className="text-xl">{value?.["Pullups"]}</Metric>
                  </div>
                  <Separator />
                  <div>
                    <Flex justifyContent="between" alignItems="center">
                      <Text>Pushups</Text>
                      <BadgeDelta
                        deltaType={
                          calculatedValue.pushups > 0
                            ? "moderateIncrease"
                            : calculatedValue.pushups < 0
                            ? "moderateDecrease"
                            : "unchanged"
                        }
                        size="xs"
                      >
                        {calculatedValue.pushups}%
                      </BadgeDelta>
                    </Flex>
                    <Metric className="text-xl">{value?.["Pushups"]}</Metric>
                  </div>
                  <Separator />
                  <div>
                    <Flex justifyContent="between" alignItems="center">
                      <Text>Squats</Text>
                      <BadgeDelta
                        deltaType={
                          calculatedValue.squats > 0
                            ? "moderateIncrease"
                            : calculatedValue.squats < 0
                            ? "moderateDecrease"
                            : "unchanged"
                        }
                        size="xs"
                      >
                        {calculatedValue.squats}%
                      </BadgeDelta>
                    </Flex>
                    <Metric className="text-xl">{value?.["Squats"]}</Metric>
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <p className="text-sm text-slate-500">
                    Select a spot on the chart to see a breakdown.
                  </p>
                </div>
              )}
            </Card>
          </div>
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
            <Card className="h-full p-4">
              <div className="flex flex-col justify-between h-full">
                <div className="space-y-4">
                  <div>
                    <Flex justifyContent="between" alignItems="center">
                      <Text>Average First Mile</Text>
                      <Metric className="text-xl">
                        {Math.floor(firstMileAverage / 60)}:
                        {(firstMileAverage % 60).toFixed(2).padStart(5, "0")}
                      </Metric>
                    </Flex>
                  </div>
                  <Separator />
                  <div>
                    <Flex justifyContent="between" alignItems="center">
                      <Text>Average Second Mile</Text>
                      <Metric className="text-xl">
                        {Math.floor(secondMileAverage / 60)}:
                        {(secondMileAverage % 60).toFixed(2).padStart(5, "0")}
                      </Metric>
                    </Flex>
                  </div>
                </div>
                <Link href="/all">
                  <Button
                    variant="outline"
                    className="text-slate-500 inline-flex gap-2 w-full"
                  >
                    View all workouts
                    <ArrowUpRight className="w-4" />
                  </Button>
                </Link>
              </div>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
