const API_BASE = '/api/wellness';

export const crisisService = {
  getResources: async () => {
    const res = await fetch(`${API_BASE}/resources`);
    if (!res.ok) throw new Error('Failed to fetch crisis resources');
    return await res.json();
  },
  // Add more crisis-specific API methods here if needed
};
