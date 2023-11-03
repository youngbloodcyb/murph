"use client";

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

const frequencyOptions: { [key: string]: string } = {
  "Every day": "DAILY",
  "Twice a week": "BIWEEKLY",
  "Once a week": "WEEKLY",
  "Twice a month": "BIMONTLY",
  "Once a month": "MONTHLY",
};

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
});

const onSubmit = async (values: z.infer<typeof formSchema>) => {
  console.log(values);
};

export default function MurphForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: new Date(),
      firstMileMin: 0,
      firstMileSec: 0,
    },
  });

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Date of birth</FormLabel>
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
                <FormDescription>
                  Your date of birth is used to calculate your age.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
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
          <Button variant="outline" type="submit">
            Submit
          </Button>
        </form>
      </Form>
    </>
  );
}
