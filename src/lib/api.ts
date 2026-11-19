/**
 * Future backend/API hooks for MediConnect.
 * Frontend currently uses mock/client-side flows only.
 *
 * Suggested later endpoints (do not invent secrets):
 * - POST /api/enquiries     — Plan My Visit submission
 * - POST /api/callbacks     — Contact callback request
 * - GET  /api/hospitals     — Hospital directory (replace static content)
 */

export type EnquiryPayload = {
  help: string;
  hospital?: string;
  city: string;
  family?: string;
  travel?: string;
  name: string;
  phone: string;
  method?: string;
  time?: string;
};

export type CallbackPayload = {
  name: string;
  phone: string;
  preferredTime?: string;
  notes?: string;
};

export async function submitEnquiry(
  _payload: EnquiryPayload,
): Promise<{ ok: true } | { ok: false; error: string }> {
  // Mock: preview never sends data.
  return { ok: true };
}

export async function requestCallback(
  _payload: CallbackPayload,
): Promise<{ ok: true } | { ok: false; error: string }> {
  // Mock: preview never sends data.
  return { ok: true };
}
