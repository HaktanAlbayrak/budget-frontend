import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Bu regex: api, _next, ve dosya uzantısı olan (resim vb.) her şeyi atlar,
  // geri kalan her şeyi (dilli veya dilsiz) proxy'den geçirir.
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
