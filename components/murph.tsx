import { CalendarCheck, ActivitySquare, MoveRight } from "lucide-react";

export default function Murph({
  date,
  firstMileMin,
  firstMileSec,
  secondMileMin,
  secondMileSec,
  pullups,
  pushups,
  squats,
}: any) {
  return (
    <div className="shadow-sm w-full p-4 border border-slate-200 rounded-lg mt-8">
      <div className="flex gap-4">
        <div>
          <ActivitySquare className="w-8 h-8" />
        </div>
        <div className="">
          <div>
            <p className="inline-flex items-center gap-2">
              <span className="text-xs items-baseline text-blue-500">
                Mile times:
              </span>
              <span>
                {firstMileMin}:{firstMileSec.toString().padStart(2, "0")}
              </span>
              <MoveRight className="inline w-4" />
              <span>
                {secondMileMin}:{secondMileSec}
              </span>
            </p>
          </div>
          <div>
            <p className="inline-flex items-center gap-2">
              <span className="text-xs items-baseline text-blue-500">
                Pull-ups:
              </span>
              {pullups}
            </p>
          </div>
          <div>
            <p className="inline-flex items-center gap-2">
              <span className="text-xs items-baseline text-blue-500">
                Push-ups:
              </span>
              {pushups}
            </p>
          </div>
          <div>
            <p className="inline-flex items-center gap-2">
              <span className="text-xs items-baseline text-blue-500">
                Squats:
              </span>
              {squats}
            </p>
          </div>
          <div className="inline-flex items-center gap-1">
            <CalendarCheck className="w-3 text-slate-400" />
            <h3 className="text-xs text-slate-400">{date.toDateString()}</h3>
          </div>
        </div>
      </div>
    </div>
  );
}
