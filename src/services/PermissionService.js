const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api'
const USE_DEMO_FALLBACK = import.meta.env.DEV && !import.meta.env.VITE_API_BASE_URL
const TOKEN_KEY = 'campuspass_token'

const demoTypes = [
  { id: 'leave', name: 'Outpass', description: 'Request an outpass to leave campus during academic hours.' },
  { id: 'event', name: 'Event permission', description: 'Attend an approved academic or cultural event with permission.' },
  { id: 'late', name: 'Late arrival', description: 'Share details for an expected late arrival.' },
  { id: 'internship', name: 'Internship', description: 'Request permission for an internship, placement, or off-campus training.' },
]
const demoFields = {
  leave: [
    { id: 'destination', label: 'Destination', type: 'text', required: true, placeholder: 'Where are you going?' },
    { id: 'fromDate', label: 'Departure date', type: 'date', required: true },
    { id: 'returnDate', label: 'Return date', type: 'date', required: true },
    { id: 'reason', label: 'Reason', type: 'text', required: true, placeholder: 'Briefly explain your request' },
  ],
  event: [
    { id: 'eventName', label: 'Event name', type: 'text', required: true, placeholder: 'e.g. Inter-college hackathon' },
    { id: 'eventDate', label: 'Event date', type: 'date', required: true },
    { id: 'transport', label: 'Transport', type: 'select', required: true, options: ['College bus', 'Personal vehicle', 'Public transport'] },
  ],
  late: [
    { id: 'arrivalDate', label: 'Arrival date', type: 'date', required: true },
    { id: 'arrivalTime', label: 'Expected arrival time', type: 'text', required: true, placeholder: 'e.g. 9:30 PM' },
    { id: 'reason', label: 'Reason', type: 'text', required: true, placeholder: 'Why will you arrive late?' },
  ],
  internship: [
    { id: 'companyName', label: 'Company / organization', type: 'text', required: true, placeholder: 'e.g. Northbridge Labs' },
    { id: 'internshipRole', label: 'Internship role', type: 'text', required: true, placeholder: 'e.g. Software engineering intern' },
    { id: 'startDate', label: 'Start date', type: 'date', required: true },
    { id: 'endDate', label: 'End date', type: 'date', required: true },
    { id: 'offerLetter', label: 'Offer letter', type: 'file', required: false },
  ],
}

function getDemoRequests() {
  return JSON.parse(localStorage.getItem('campuspass_requests') || '[]')
}
function saveDemoRequests(requests) { localStorage.setItem('campuspass_requests', JSON.stringify(requests)) }

async function request(path, options = {}) {
  let response
  try {
    response = await fetch(`${API_BASE_URL}${path}`, { headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`, ...(options.headers || {}) }, ...options })
  } catch {
    throw new Error('The API is unavailable. Start the backend or set VITE_API_BASE_URL.')
  }
  const contentType = response.headers.get('content-type') || ''
  if (!contentType.includes('application/json')) { const error = new Error('The API returned a non-JSON response.'); error.status = 404; throw error }
  const body = await response.json().catch(() => ({}))
  if (!response.ok) { const error = new Error(body.error || body.message || `Request failed with status ${response.status}.`); error.status = response.status; throw error }
  return body
}
async function withFallback(path, options, fallback) {
  try { return await request(path, options) } catch (error) { if (USE_DEMO_FALLBACK && error.status === 404) return fallback(); throw error }
}

export const permissionService = {
  getTypes: async () => { const response = await withFallback('/permission-types', {}, () => ({ success: true, data: demoTypes })); return response.data || response },
  getForm: async (id) => { const response = await withFallback(`/permission-types/${id}/form`, {}, () => ({ success: true, data: demoFields[id] || [] })); return response.data || response },
  createRequest: (payload) => withFallback('/requests', { method: 'POST', body: JSON.stringify(payload) }, () => { const item = { id: `REQ-${Date.now().toString().slice(-6)}`, ...payload, status: 'Pending', submittedAt: new Date().toISOString() }; saveDemoRequests([item, ...getDemoRequests()]); return { success: true, data: item } }),
  getRequests: async () => { const response = await withFallback('/requests', {}, () => ({ success: true, data: getDemoRequests() })); return response.data || response },
}
