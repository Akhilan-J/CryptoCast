import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { type PredictionCardProps } from "./types/predictionCard";
import Indicator from "./Indicator";
function Pcard({
  title,
  value,
  valueColor,
  subtext,
  subtextColor,
  Time,
  extra,
  extraColor,
  trend,
  errorP,
}: PredictionCardProps) {
  return (
    <Card className="pt-0 w-[300px] ">
      <CardHeader className="flex items-center justify-between gap-2 space-y-0 border-b py-5 sm:flex-row">
        <CardTitle>{title}</CardTitle>
        <span className="flex text-xs text-zinc-400">
          <Indicator errorP={errorP} />
        </span>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
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
      </CardContent>
    </Card>
  );
}
export default Pcard;
