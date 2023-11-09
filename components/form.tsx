"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";

const formSchema = z.object({
  date: z.date({
    required_error: "A date is required.",
  }),
  firstMileMin: z.coerce
    .number({
      required_error: "Required.",
    })
    .min(3, "I know you can't run a mile that fast...")
    .max(60, "Max value is 60."),
  firstMileSec: z.coerce
    .number({
      required_error: "Required.",
    })
    .min(0, "You can't run negative seconds bro.")
    .max(59, "Max value is 59."),
  secondMileMin: z.coerce
    .number({
      required_error: "Required.",
    })
    .min(3, "I know you can't run a mile that fast...")
    .max(60, "Max value is 60."),
  secondMileSec: z.coerce
    .number({
      required_error: "Required.",
    })
    .min(0, "You can't run negative seconds bro.")
    .max(59, "Max value is 59."),
  pullups: z.coerce
    .number({
      required_error: "Required.",
    })
    .min(0, "Negative pullups? You're weak."),
  pushups: z.coerce
    .number({
      required_error: "Required.",
    })
    .min(0, "Negative pushups? You're weak."),
  squats: z.coerce
    .number({
      required_error: "Required.",
    })
    .min(0, "What even are negative squats?"),
});

export default function MurphForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: new Date(),
      firstMileMin: 0,
      firstMileSec: 0,
      secondMileMin: 0,
      secondMileSec: 0,
      pullups: 0,
      pushups: 0,
      squats: 0,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const response = await fetch("/api/murph", {
      method: "POST",
      body: JSON.stringify(values),
    });
    const data = await response.json();
    router.refresh();
  };

  return (
    <div className="w-full border border-slate-200 p-4 rounded-lg">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          {/* Date */}
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription className="sr-only">
                  The date of your workout.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <hr className="my-2" />
          {/* First Mile */}
          <div>
            <h3 className="text-sm font-medium">First Mile Time</h3>
            <div className="flex gap-4">
              <FormField
                control={form.control}
                name="firstMileMin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs text-slate-400">
                      Minutes
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Minutes..."
                        type="number"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="sr-only">
                      First mile minutes.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="firstMileSec"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs text-slate-400">
                      Seconds
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Seconds..."
                        type="number"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="sr-only">
                      First mile seconds.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          {/* Second Mile */}
          <div>
            <h3 className="text-sm font-medium">Second Mile Time</h3>
            <div className="flex gap-4">
              <FormField
                control={form.control}
                name="secondMileMin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs text-slate-400">
                      Minutes
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Minutes..."
                        type="number"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="sr-only">
                      Second mile minutes.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="secondMileSec"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs text-slate-400">
                      Seconds
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Seconds..."
                        type="number"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="sr-only">
                      Second mile seconds.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <hr className="my-8" />
            <div>
              <FormField
                control={form.control}
                name="pullups"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pullups</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Pullups..."
                        type="number"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="sr-only">
                      Number of pullups.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="pushups"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pushups</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Pushups..."
                        type="number"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="sr-only">
                      Number of pushups.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="squats"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Squats</FormLabel>
                    <FormControl>
                      <Input placeholder="Squats..." type="number" {...field} />
                    </FormControl>
                    <FormDescription className="sr-only">
                      Number of squats.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <Button type="submit" className="w-full">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}
