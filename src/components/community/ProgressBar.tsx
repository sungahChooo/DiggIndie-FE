interface ProgressBarProps {
  imageCount: number;
  currentIndex: number;
}
export default function ProgressBar({ imageCount, currentIndex }: ProgressBarProps) {
  return (
    <section className="w-full h-1 bg-gray-700 rounded-full my-3 flex overflow-hidden">
      {Array.from({ length: imageCount }).map((_, index) => (
        <div
          key={index}
          className={`flex-1 transition-colors ${
            index === currentIndex ? 'bg-white' : 'bg-gray-700'
          }`}
        />
      ))}
    </section>
  );
}