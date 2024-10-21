import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "./actions/auth";
import { getRouteAccess } from "./utils/middlewareRoutes";

const publicRoutes: string[] = ["/", "/menu", "/login", "/signup"];
const authenticatedRoutes: string[] = [
  "/cake/:path*",
  "/order/:path*",
  "/purchases/:path*"
];
const adminRoutes: string[] = [];
//note: you can't put that arrays in the config.matcher, so you need put
//directly new routes in that arrays and in the config.matcher.
//More info: https://nextjs.org/docs/messages/invalid-page-config

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const routeAcess = getRouteAccess(pathname, authenticatedRoutes, adminRoutes);

  if (routeAcess === "authenticated") {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.redirect(
        new URL(`/login?redirect=${encodeURIComponent(pathname)}`, request.url)
      );
    }
  }

  if (routeAcess === "admin") {
    const { role } = await auth();

    if (role !== "admin") {
      return NextResponse.redirect(new URL(`/`, request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/cake/:path*", "/order/:path*", "/purchases/:path*"]
};
