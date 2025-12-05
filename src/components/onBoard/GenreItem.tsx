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
      className={`border rounded-sm px-3 py-2 cursor-pointer ${
        isSelected
          ? 'border-red bg-main-red text-white custom-box-shadow'
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
