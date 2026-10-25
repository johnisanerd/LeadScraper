export interface ApifyGoogleMapsItem {
  title?: string;
  name?: string;
  address?: string;
  phone?: string;
  phoneNumber?: string;
  website?: string;
  totalScore?: number;
  stars?: number;
  rating?: number;
  reviewsCount?: number;
  ratingCount?: number;
  url?: string;
  placeId?: string;
  error_message?: string;
  free_tier_notice?: boolean;
  message?: string;
  [key: string]: unknown;
}
