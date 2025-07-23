import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import type { VerifyProps } from "./types/Verify";

function Verify({
  crypto,
  predictionDate,
  predictionTime,
  predictionPrice,
  actualPrice,
  errorPercent,
  directionCorrect,
}: VerifyProps) {
  const directionColor = directionCorrect ? "#4ade80" : "#f87171";

  return (
    <Card className="pt-0 w-[400px]">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1">
          <CardTitle>{crypto} Prediction Results</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-400">Prediction Date:</span>
            <span className="text-sm font-medium">
              {predictionDate ? predictionDate : "N/A"}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-400">Prediction Time:</span>
            <span className="text-sm font-medium">
              {predictionTime ? predictionTime : "N/A"}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-400">Predicted Price:</span>
            <span className="text-sm font-medium text-blue-400">
              ${predictionPrice?.toLocaleString()}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-400">Actual Price:</span>
            <span className="text-sm font-medium text-green-400">
              ${actualPrice?.toLocaleString()}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-400">Error:</span>
            <span className="text-sm font-medium text-red-400">
              {errorPercent?.toFixed(2)}%
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-400">Direction:</span>
            <span
              className="text-sm font-bold"
              style={{ color: directionColor }}
            >
              {directionCorrect ? "✓ Correct" : "✗ Incorrect"}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default Verify;
