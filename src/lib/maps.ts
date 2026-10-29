import { weddingData } from "@/data/wedding";

export function getGoogleMapsUrl(): string {
  if (weddingData.ceremony.mapsUrl) {
    return weddingData.ceremony.mapsUrl;
  }
  const query = encodeURIComponent(
    `${weddingData.ceremony.venueName}, ${weddingData.ceremony.venueAddress}`
  );
  return `https://www.google.com/maps/search/?api=1&query=${query}`;
}

export function getAppleMapsUrl(): string {
  const query = encodeURIComponent(
    `${weddingData.ceremony.venueName}, ${weddingData.ceremony.venueAddress}`
  );
  return `https://maps.apple.com/?q=${query}`;
}
