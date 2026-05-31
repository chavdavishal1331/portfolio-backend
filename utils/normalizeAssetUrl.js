/** Strip localhost and return a consistent /uploads/... path for DB/API. */
export function normalizeAssetUrl(url) {
  if (!url || typeof url !== "string") return url || "";

  const trimmed = url.trim();
  if (!trimmed) return "";

  if (/^https?:\/\//i.test(trimmed)) {
    if (/localhost|127\.0\.0\.1/i.test(trimmed)) {
      const uploadsPath = trimmed.match(/\/uploads\/[^?#]+/i)?.[0];
      return uploadsPath || trimmed;
    }
    return trimmed;
  }

  return trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
}
