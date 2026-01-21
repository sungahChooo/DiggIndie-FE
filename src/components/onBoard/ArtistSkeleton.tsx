import ArtistItemSkeleton from './ArtistItemSkeleton';

interface Props {
  count?: number;
}

export default function ArtistSkeletonGrid({ count = 12 }: Props) {
  return (
    <div className="grid grid-cols-3 gap-4 px-5 pt-5">
      {Array.from({ length: count }).map((_, i) => (
        <ArtistItemSkeleton key={i} />
      ))}
    </div>
  );
}
