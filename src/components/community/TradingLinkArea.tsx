import React from 'react';
export default function TradingLinkArea() {
  return (
    <div className="py-3 flex flex-col px-5">
      <span className="font-medium text-base text-white mb-3">링크</span>
      <p className="bg-gray-900 border border-gray-850 rounded-sm px-[10px]">
        <input
          className="font-medium text-base px-2 py-3 text-gray-300 focus:outline-none placeholder-gray-700 w-full"
          placeholder="거래자와 소통할 링크를 첨부해주세요."
        />
      </p>
    </div>
  );
}
