// utils/slugify.js or add to your existing utils
export const generateSlug = (name) => {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with hyphens
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
};

// Usage example:
// generateSlug("PREMIUM SPECIAL LION BIDI (BIG)") → "premium-special-lion-bidi-big"
