import { useState } from "react";

export default function BuyorsellComponent({ enabled, mode }) {
  const [quantity, SetQuantity] = useState(0);
  return (
    enabled && (
      <div className=" space-y-4">
        <div className="flex flex-row justify-center space-x-3">
          <label className="block mb-2 text-md font-medium mt-2">
            Quantity to {mode}
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
          {mode == "Sell" ? (
            <button className="px-10 py-2 bg-red-600 text-white rounded-md">
              Sell
            </button>
          ) : (
            <button className="px-10 py-2 bg-green-600 text-white rounded-md">
              Buy
            </button>
          )}
        </div>
      </div>
    )
  );
}
