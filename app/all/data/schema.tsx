import { z } from "zod";

export const formSchema = z.object({
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

export type Task = z.infer<typeof formSchema>;
