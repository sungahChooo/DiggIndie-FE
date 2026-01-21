import type { ArtistItem, MyArtistsItem } from "@/types/artists";

export function myArtistToArtistItem(item: MyArtistsItem): ArtistItem {
  return {
    artistId: item.bandId,
    artistName: item.bandName,
    keywords: item.keywords,
    artistImage: item.bandImage,
    topTrack: null,
    mainMusic: item.mainMusic,
  };
}
