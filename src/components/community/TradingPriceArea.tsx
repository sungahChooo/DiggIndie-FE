'use client';

type Props = {
  value: number | null;
  onChange: (next: number | null) => void;
};

export default function TradingPriceArea({ value, onChange }: Props) {
  return (
    <div className="py-3 flex flex-col px-5">
      <span className="font-medium text-base text-white mb-2">금액</span>
      <input
        className="font-medium text-base px-2 py-3 text-gray-300 border-b border-gray-850 focus:outline-none placeholder-gray-700 bg-transparent"
        placeholder="금액을 입력해주세요."
        type="number"
        value={value ?? ''}
        onChange={(e) => {
          const raw = e.target.value;
          onChange(raw === '' ? null : Number(raw));
        }}
      />
    </div>
  );
}
