import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: [
    "/",
    "/category",
    "/category/:name",
    "/brand",
    "/brand/:name",
    "/car",
    "/car/:id",
    "/search",
    "/api/webhook",
    "/api/edgestore",
  ],
  ignoredRoutes: ["/api/webhook", "/api/edgestore"],
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
