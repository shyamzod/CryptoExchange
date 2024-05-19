import { useState } from "react";

export default function BuyorsellComponent({
  enabled,
  mode,
  updateusdt,
  usdtBalance,
  divEnabled,
}) {
  const [quantity, SetQuantity] = useState(0);
  return (
    enabled && (
      <div>
        <div className="space-y-4 py-10">
          <div className="flex flex-row justify-center space-x-3">
            <label className="block mb-2 text-md font-medium mt-2">
              {mode === "Buy" || mode === "Sell" ? (
                <>Quantity to {mode}</>
              ) : (
                <>Add Money</>
              )}
            </label>
            <input
              type="number"
              placeholder="Enter Quantity"
              className="block p-2 text-black border rounded-lg border-black"
              onChange={(e) => {
                SetQuantity(parseInt(e.target.value));
              }}
            ></input>
          </div>
          <div className="flex justify-center">
            {mode == "Sell" || mode === "Buy" ? (
              mode === "Sell" ? (
                <button className="px-10 py-2 bg-red-600 text-white rounded-md">
                  Sell
                </button>
              ) : (
                <button className="px-10 py-2 bg-green-600 text-white rounded-md">
                  Buy
                </button>
              )
            ) : (
              <button
                className="px-10 py-2 bg-blue-600 text-white rounded-md"
                onClick={() => {
                  updateusdt(usdtBalance + quantity);
                  SetQuantity(0);
                  divEnabled(false);
                }}
              >
                Add Money To Wallet
              </button>
            )}
          </div>
        </div>
      </div>
    )
  );
}
