import React from 'react';
export default function TradingPriceArea() {
  return (
    <div className="py-3 flex flex-col px-5">
      <span className="font-medium text-base text-white mb-2">금액</span>
      <input
        className="font-medium text-base px-2 py-3 text-gray-300 border-b border-gray-850 focus:outline-none placeholder-gray-700"
        placeholder="금액을 입력해주세요."
        type="number"
      />
    </div>
  );
}
