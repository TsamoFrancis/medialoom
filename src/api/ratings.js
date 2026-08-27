const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

async function request(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    // Required for the PHP session cookie to actually round-trip across
    // the two different localhost ports — without this, PHP treats every
    // request as a brand-new session and "add" appears to silently forget
    // everything.
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(data?.error || `Request failed (${response.status})`);
  }

  return data;
}

export function fetchRatings() {
  return request('/ratings.php');
}

export function createRating(rating) {
  return request('/ratings.php', {
    method: 'POST',
    body: JSON.stringify(rating),
  });
}

export function deleteRating(id) {
  return request(`/ratings.php?id=${encodeURIComponent(id)}`, {
    method: 'DELETE',
  });
}

export function updateRating(id, updates) {
  return request(`/ratings.php?id=${encodeURIComponent(id)}`, {
    method: 'PATCH',
    body: JSON.stringify(updates),
  });
}

export function toggleFavourite(id, favourite) {
  return updateRating(id, { favourite });
}
