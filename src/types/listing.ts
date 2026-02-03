export interface Listing {
  id: string;
  imageUrl: string;
  title: string;
  address: string;
  price: string;
  beds: number;
  baths: number;
  sqft: number;
  created_at?: string; // Supabase will add this automatically
}