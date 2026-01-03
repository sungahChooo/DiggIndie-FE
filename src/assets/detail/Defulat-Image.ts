import defaultConcert from '@/assets/detail/concert_default.svg';
import defaultArtist from '@/assets/detail/artist_default.svg';

export const DEFAULT_DETAIL_IMAGE = {
  concert: defaultConcert,
  artist: defaultArtist,
} as const;

export type DetailImageVariant = keyof typeof DEFAULT_DETAIL_IMAGE;
