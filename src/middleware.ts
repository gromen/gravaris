import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware(async (context, next) => {
  const maintenanceMode =
    import.meta.env.MAINTENANCE_MODE === "true" ||
    process.env.MAINTENANCE_MODE === "true";
  const { pathname, searchParams } = context.url;

  // Check if bypass query param is present (simple auth)
  // You can set this as a cookie if you want it to persist, but for now url param is fine for preview
  // Example: ?access=true
  if (searchParams.get("access") === "true") {
    // Optionally set a cookie here to persist access
    context.cookies.set("maintenance_bypass", "true", {
      path: "/",
      maxAge: 60 * 60 * 24,
    });
  }

  const hasBypassCookie =
    context.cookies.get("maintenance_bypass")?.value === "true";

  // Allow access if:
  // 1. Maintenance mode is OFF
  // 2. User has bypass cookie/param
  // 3. Request is for assets, images, or admin area
  // 4. Request is ALREADY for the maintenance page (avoid loops)
  if (
    !maintenanceMode ||
    hasBypassCookie ||
    pathname.startsWith("/_image") ||
    pathname.startsWith("/admin") ||
    pathname.startsWith("/api") ||
    pathname.includes(".") || // static files (css, js, images) usually have extensions
    pathname === "/maintenance"
  ) {
    return next();
  }

  // Otherwise, redirect to maintenance page
  return context.redirect("/maintenance", 307);
});
