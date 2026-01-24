import GraySearchIcon from '@/components/iconComponents/SearchIcon';
import Image from 'next/image';
import clearIcon from '@/assets/search/clearSearch.svg';
interface SearchSectionProps {
  searchTerm: string;
  onChange: (value: string) => void;
  onClear?: () => void;
  onSubmit: () => void;
}
export default function SearchSection({
  searchTerm,
  onChange,
  onClear,
  onSubmit,
}: SearchSectionProps) {
  return (
    <section className="w-full flex bg-gray-700 rounded-sm justify-between px-3 py-3">
      <input
        value={searchTerm}
        onChange={(e) => onChange(e.target.value)}
        placeholder="검색어를 입력하세요"
        className="outline-none placeholder:text-[#A6A6A6] text-white"
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
            onSubmit();
          }
        }}
      />
      <div className="flex gap-2">
        {searchTerm && (
          <Image
            src={clearIcon}
            alt="검색어 삭제"
            onClick={onClear}
            className="cursor-pointer"
            height={20}
            width={20}
          />
        )}
        <GraySearchIcon className="text-gray-300" />
      </div>
    </section>
  );
}
