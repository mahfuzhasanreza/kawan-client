// Base URL of kawan-server (Express + MongoDB). Override with VITE_SERVER_URL in .env.local.
export const SERVER_URL = import.meta.env.VITE_SERVER_URL || 'http://localhost:5000';

// Shared demo account so visitors (e.g. interviewers) can explore without registering.
export const GUEST_EMAIL = import.meta.env.VITE_GUEST_EMAIL || 'guest@kawan-demo.com';
export const GUEST_PASSWORD = import.meta.env.VITE_GUEST_PASSWORD || 'KawanGuest#2026';
