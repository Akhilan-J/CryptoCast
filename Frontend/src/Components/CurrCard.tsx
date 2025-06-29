type Props = {
  title: string;
  value: string;
  subtext?: string;
  Time: string;
  valueColor: string;
  subtextColor: string;
  extra?: string;
  extraColor?: string;
};

function CurrCard({
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
    <div className="bg-zinc-900 rounded-2xl p-6 shadow-lg border border-[#2a2f45] hover:shadow-2xl transition-shadow duration-300 w-[300px]">
      <div className="text-white text-base font-semibold mb-2">{title}</div>
      <div className="text-2xl font-bold" style={{ color: valueColor }}>
        {value}
      </div>
      <div
        className="text-sm mt-1 flex items-center gap-1"
        style={{ color: subtextColor }}
      ></div>

      <div className="text-xs text-gray-400 mt-2">Updated: {Time}</div>
      {extra && (
        <div className="text-sm mt-4" style={{ color: extraColor }}>
          {extra}
        </div>
      )}
    </div>
  );
}

export default CurrCard;
