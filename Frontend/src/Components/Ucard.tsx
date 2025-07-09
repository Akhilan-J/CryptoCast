import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { type CardProps } from "./types/cardProps";
function UCard({
  title,
  value,
  valueColor,
  subtext,
  subtextColor,
  Time,
  extra,
  extraColor,
}: CardProps) {
  return (
    <Card className="pt-0 w-[300px] ">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1">
          <CardTitle>{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
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
      </CardContent>
    </Card>
  );
}

export default UCard;
