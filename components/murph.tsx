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
    <div className="shadow-sm w-full p-4 border border-slate-200 rounded-lg">
      <div className="flex gap-4">
        <div className="p-1">
          <ActivitySquare className="w-10 h-10 text-slate-400" />
        </div>
        <div className="">
          <div>
            <p className="inline-flex items-center gap-2">
              <span className="text-xs items-baseline text-slate-500">
                Mile times:
              </span>
              <span className="text-sm">
                {firstMileMin}:{firstMileSec.toString().padStart(2, "0")}
              </span>
              <MoveRight className="inline w-4" />
              <span className="text-sm">
                {secondMileMin}:{secondMileSec}
              </span>
            </p>
          </div>
          <div>
            <p className="inline-flex items-center gap-2">
              <span className="text-xs items-baseline text-slate-500">
                Pull-ups:
              </span>
              <span className="text-sm">{pullups}</span>
            </p>
          </div>
          <div>
            <p className="inline-flex items-center gap-2">
              <span className="text-xs items-baseline text-slate-500">
                Push-ups:
              </span>
              <span className="text-sm">{pushups}</span>
            </p>
          </div>
          <div>
            <p className="inline-flex items-center gap-2">
              <span className="text-xs items-baseline text-slate-500">
                Squats:
              </span>
              <span className="text-sm">{squats}</span>
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
