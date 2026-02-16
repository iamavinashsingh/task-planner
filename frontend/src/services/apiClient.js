const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api/v1';

async function request(endpoint, options = {}) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers
    },
    ...options
  });

  const payload = await response.json();

  if (!response.ok || !payload.success) {
    throw new Error(payload.error || 'Request failed.');
  }

  return payload.data;
}

export function getTasks(params) {
  const query = new URLSearchParams(params).toString();
  return request(`/tasks?${query}`);
}

export function createTask(body) {
  return request('/tasks', {
    method: 'POST',
    body: JSON.stringify(body)
  });
}

export function updateTask(taskId, body) {
  return request(`/tasks/${taskId}`, {
    method: 'PATCH',
    body: JSON.stringify(body)
  });
}

export function getEfficiency(params) {
  const query = new URLSearchParams(params).toString();
  return request(`/analytics/efficiency?${query}`);
}
