import { Listing } from '@/types/listing';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const getListings = async (filters?: {
  transactionType?: string;
  propertyType?: string;
  district?: string;
  municipality?: string;
  parish?: string;
  minPrice?: string;
  maxPrice?: string;
  bedrooms?: string;
  bathrooms?: string;
  area?: string;
}): Promise<Listing[]> => {
  const queryParams = new URLSearchParams();
  
  if (filters) {
    Object.entries(filters).forEach(([key, value]) => {
      if (value && value !== 'any') {
        queryParams.append(key, value);
      }
    });
  }

  const url = `${API_URL}/listings${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
  const response = await fetch(url);
  
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

export const createListing = async (listing: Omit<Listing, 'id' | 'created_at'>, token: string): Promise<Listing> => {
  const response = await fetch(`${API_URL}/listings`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(listing),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `Failed to create listing: ${response.statusText}`);
  }

  return response.json();
};

export const updateListing = async (id: string, updates: Partial<Omit<Listing, 'id' | 'created_at'>>, token: string): Promise<Listing> => {
  const response = await fetch(`${API_URL}/listings/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(updates),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `Failed to update listing: ${response.statusText}`);
  }

  return response.json();
};

export const deleteListing = async (id: string, token: string): Promise<void> => {
  const response = await fetch(`${API_URL}/listings/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `Failed to delete listing: ${response.statusText}`);
  }
};