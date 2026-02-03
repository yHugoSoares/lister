import { Agent } from '@/types/agent';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const getTopRatedAgents = async (): Promise<Agent[]> => {
  const response = await fetch(`${API_URL}/agents?sort=rating&order=desc&limit=4`);
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `Failed to fetch agents: ${response.statusText}`);
  }

  return response.json();
};