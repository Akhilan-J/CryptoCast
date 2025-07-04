

type Props = {
  title: string;
  value: string;
  subtext: string;
  Time?: string;
  valueColor: string;
  subtextColor: string;
  extra?: string;
  extraColor?: string;
  trend?: string;
};

function PredictCard({
  title,
  value,
  valueColor,
  subtext,
  subtextColor,
  extra,
  extraColor,
  trend,
}: Props) {
  return (
    <div className="bg-bg-zinc-900 rounded-2xl p-6 shadow-lg border border-[#2a2f45] hover:shadow-2xl transition-shadow duration-300 w-[300px]">
      <div className="text-white text-base font-semibold mb-2">{title}</div>
      <div className="text-2xl font-bold" style={{ color: valueColor }}>
        {value}
      </div>
      <div
        className="text-sm mt-1 flex items-center gap-1"
        style={{ color: subtextColor }}
      >
        <span className="pulse-arrow">{subtext[0]}</span>
        <span>{subtext.slice(1)}</span>
      </div>
      <p className="text-xs  mt-2" style={{ color: subtextColor }}>
        {trend}
      </p>
      {extra && (
        <div className="text-sm mt-4" style={{ color: extraColor }}>
          {trend}
        </div>
      )}
    </div>
  );
}

export default PredictCard;
