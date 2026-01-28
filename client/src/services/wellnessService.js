const API_BASE = '/api/wellness';

export const wellnessService = {
  getExercises: async () => {
    const res = await fetch(`${API_BASE}/exercises`);
    if (!res.ok) throw new Error('Failed to fetch wellness exercises');
    return res.json();
  }
};
