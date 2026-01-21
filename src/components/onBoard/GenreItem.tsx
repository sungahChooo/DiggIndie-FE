interface Genre {
  id: number;
  name: string;
}
interface GenreItemProps {
  genre: Genre;
  isSelected: boolean;
  toggleSelect: (id: number) => void;
}
export default function GenreItem({ genre, isSelected, toggleSelect }: GenreItemProps) {
  return (
    <span
      key={genre.id}
      className={`border rounded-sm px-3 py-2 cursor-pointer min-w-8 min-h-10 items-center justify-center flex ${
        isSelected
          ? 'border-main-red-2 bg-main-red-4 text-white custom-box-shadow'
          : 'border-gray-700 bg-gray-900 text-gray-300'
      }`}
      onClick={() => {
        toggleSelect(genre.id);
      }}
    >
      {genre.name}
    </span>
  );
}
