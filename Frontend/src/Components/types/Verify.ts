type VerifyProps = {
  crypto: string;
  predictionDate: string;
  predictionTime: string;
  predictionPrice: number;
  actualPrice: number;
  errorPercent: number;
  directionCorrect: boolean;
};

export type { VerifyProps };
