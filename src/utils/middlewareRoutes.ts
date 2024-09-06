export const generateRegexRoute = (route: string): RegExp => {
  if (route.includes(":path*")) {
    return new RegExp(
      "^" + route.replace(/:\w+\*/g, ".*").replace(/\//g, "\\/") + "$"
    );
  }

  if (route.includes(":path")) {
    return new RegExp(
      "^" + route.replace(/:\w+/g, "[^/]+").replace(/\//g, "\\/") + "$"
    );
  }

  return new RegExp("^" + route.replace(/\//g, "\\/") + "$");
};

export const getRouteAccess = (
  url: string,
  authenticatedRoutes: string[],
  adminRoutes: string[]
): "authenticated" | "admin" | "public" => {
  const authenticatedRoutesRegexes: RegExp[] = authenticatedRoutes.map(
    (route) => generateRegexRoute(route)
  );
  const adminRoutesRegexes: RegExp[] = adminRoutes.map((route) =>
    generateRegexRoute(route)
  );

  const isAuthenticatedRoute = authenticatedRoutesRegexes.some((route) =>
    route.test(url)
  );
  const isAdminRoutes = adminRoutesRegexes.some((route) => route.test(url));

  if (isAuthenticatedRoute) {
    return "authenticated";
  }

  if (isAdminRoutes) {
    return "admin";
  }

  return "public";
};
