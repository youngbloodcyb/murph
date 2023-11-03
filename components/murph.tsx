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
    <div className="shadow-lg">
      <h3>{date.toDateString()}</h3>
      <p>
        {firstMileMin}:{firstMileSec}
      </p>
      <p>
        {secondMileMin}:{secondMileSec}
      </p>
      <p>{pullups}</p>
      <p>{pushups}</p>
      <p>{squats}</p>
    </div>
  );
}
