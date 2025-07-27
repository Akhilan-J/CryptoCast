import { unstable__IconIndicator as IconIndicator } from "@carbon/react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

type IndicatorProps = {
  errorP: number;
};

function Indicator({ errorP }: IndicatorProps) {
  let color = "";
  let indicatorKind = "";
  let hoverText = "";

  if (errorP < 2) {
    color = "text-blue-500";
    indicatorKind = "normal";
    hoverText = "Market is stable";
  } else if (errorP > 2 && errorP < 4) {
    color = "text-yellow-500";
    indicatorKind = "caution-minor";
    hoverText = "Market is cautious";
  } else {
    color = "text-orange-500";
    indicatorKind = "caution-major";
    hoverText = "Market is volatile";
  }
  return (
    <div>
      <Tooltip>
        <TooltipTrigger asChild>
          <span>
            <IconIndicator kind={indicatorKind} label="" className={color} />
          </span>
        </TooltipTrigger>
        <TooltipContent>
          <p>{hoverText}</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
}

export default Indicator;
