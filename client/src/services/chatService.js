// src/services/chatService.js

const API_BASE = '/api/wellness';
export const chatService = {
  startSession: async () => {
    const res = await fetch(`${API_BASE}/start`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!res.ok) throw new Error('Failed to start session');
    return await res.json();
  },

  sendMessage: async ({ sessionId, message }) => {
    const res = await fetch(`${API_BASE}/message`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sessionId, message }),
    });
    if (!res.ok) throw new Error('Failed to send message');
    return await res.json();
  },

  clearHistory: async (sessionId) => {
    const res = await fetch(`${API_BASE}/history/${sessionId}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to clear history');
    return await res.json();
  },

  getHistory: async (sessionId) => {
    const res = await fetch(`${API_BASE}/history/${sessionId}`);
    if (!res.ok) throw new Error('Failed to get history');
    return await res.json();
  },
};
