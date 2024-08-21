export const baseUrl = (() => {
  switch (process.env.NEXT_PUBLIC_VERCEL_ENV) {
    case "production":
      return `https://${process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL}`;
    case "preview":
    case "development":
      return `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;
    default:
      return "http://localhost:3000";
  }
})();
