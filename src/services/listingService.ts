import { Listing } from '@/types/listing';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const getListings = async (): Promise<Listing[]> => {
  const response = await fetch(`${API_URL}/listings`);
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `Failed to fetch listings: ${response.statusText}`);
  }

  return response.json();
};

export const getListingById = async (id: string): Promise<Listing> => {
  const response = await fetch(`${API_URL}/listings/${id}`);
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `Failed to fetch listing: ${response.statusText}`);
  }

  return response.json();
};

export const createListing = async (listing: Omit<Listing, 'id'>): Promise<Listing> => {
  const response = await fetch(`${API_URL}/listings`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(listing),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `Failed to create listing: ${response.statusText}`);
  }

  return response.json();
};