

type Props = {
  title: string;
  value: string;
  subtext: string;
  Time: string;
  valueColor: string;
  subtextColor: string;
  extra?: string;
  extraColor?: string;
};

function PredictCard({
  title,
  value,
  valueColor,
  subtext,
  subtextColor,
  Time,
  extra,
  extraColor,
}: Props) {
  return (
    <div className="bg-[#1b2330] rounded-2xl p-6 w-[300px] shadow-md">
      <div className="text-white text-base font-semibold mb-2">{title}</div>
      <div className="text-2xl font-bold" style={{ color: valueColor }}>
        {value}
      </div>
      <div className="text-sm mt-1" style={{ color: subtextColor }}>
        {subtext}
      </div>
      <div className="text-xs text-gray-400 mt-2">Updated: {Time}</div>
      {extra && (
        <div className="text-sm mt-4" style={{ color: extraColor }}>
          {extra}
        </div>
      )}
    </div>
  );
}

export default PredictCard;
