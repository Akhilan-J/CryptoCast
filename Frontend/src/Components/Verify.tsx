import React from "react";

type Props = {
  Crypto: string;
  Correct: string;
};

function Verify({ Crypto, Correct }: Props) {
  return (
    <div className="bg-zinc-900 rounded-2xl p-6 shadow-lg border border-[#2a2f45] hover:shadow-2xl transition-shadow duration-300 w-full max-w-3xl mx-auto">
      <div className="flex  items-center text-white">
        <div className="text-lg font-semibold">Crypto: </div>
        <div className="text-lg">{Crypto}</div>
      </div>
      <div className="flex  items-center text-white mt-4">
        <div className="text-lg font-semibold">Prediction Result: </div>
        <div className="text-lg">{Correct}</div>
      </div>
    </div>
  );
}

export default Verify;
