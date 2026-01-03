interface OnBoardProgressProps {
  current: number; // 현재 스텝 (1부터 시작)
  total: number; // 전체 스텝 수
}

export default function OnBoardProgress({ current, total }: OnBoardProgressProps) {
  const progress = (current / total) * 100;

  return (
    <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden mt-5">
      <div
        className="h-full bg-gray-100 transition-all duration-300"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
}
