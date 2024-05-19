import { useState } from "react";
import BuyorsellComponent from "./BuyorSellComponent";

export default function MainComponent() {
  const [btcBalance, UpdatebtcBalance] = useState(100);
  const [usdtBalance, UpdateusdtBalance] = useState(100);
  const [buyorsellenabled, SetEnabled] = useState(false);
  const [addMoneyEnabled, SetAddMoneyEnabled] = useState(false);
  const [buyorsell, SetBuyorSell] = useState("");
  return (
    <div>
      <div>
        <div className="flex flex-row items-center justify-center space-x-20">
          <div className="px-20 py-16 bg-gray-800 text-white rounded-2xl">
            <h3>BTC Balance : {btcBalance}</h3>
          </div>
          <div className="px-20 py-10  bg-gray-800 text-white rounded-2xl">
            <h3>USDT Balance : {usdtBalance}</h3>
            <button
              className="px-10 py-2 bg-blue-600 text-white rounded-md mt-2"
              onClick={() => {
                SetEnabled(true);
                SetAddMoneyEnabled(true);
                SetBuyorSell("AddMoney");
              }}
            >
              Add Money
            </button>
          </div>
        </div>
        <div className="flex flex-row items-center justify-center mt-10 space-x-10">
          <button
            className=" px-20 py-2 bg-green-600 text-white rounded-md"
            onClick={() => {
              SetEnabled(true);
              SetBuyorSell("Buy");
            }}
          >
            Buy
          </button>
          <button
            className="px-20 py-2 bg-red-600  text-white rounded-md"
            onClick={() => {
              SetEnabled(true);
              SetBuyorSell("Sell");
            }}
          >
            Sell
          </button>
        </div>
      </div>
      <div className="mt-10">
        <BuyorsellComponent
          enabled={buyorsellenabled}
          mode={buyorsell}
          updateusdt={UpdateusdtBalance}
          usdtBalance={usdtBalance}
          divEnabled={SetEnabled}
        />
      </div>
    </div>
  );
}
