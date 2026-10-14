import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import { AuthProvider } from "@/lib/auth/provider";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import appCss from "../styles.css?url";

const APP_NAME = "Univer Master — строительный магазин в Караганде | Электротовары, сантехника, хозтовары";
const SITE_URL = "https://univermaster.kz/";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: APP_NAME },
      {
        name: "description",
        content:
          "Строительный магазин Univer Master в Караганде на ул. Четская, 6а. Электротовары, сантехника, товары для сада и ремонта. Большой выбор, доступные цены. Тел: +7 700 303-10-73",
      },
      {
        name: "keywords",
        content:
          "строительный магазин Караганда, Univer Master, электротовары Караганда, сантехника Караганда, хозтовары, товары для ремонта, Четская 6а",
      },
      { name: "google-site-verification", content: "IX64Jjr45d_0eA3KjodOmH4wmR-eN4o-T-CoG8RvUEo" },
      { name: "theme-color", content: "#f8fafc" },
      { property: "og:title", content: "Univer Master — всё для ремонта и дома в Караганде" },
      {
        property: "og:description",
        content: "Электротовары, сантехника, сад и хозтовары. ул. Четская, 6а, Караганда",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: SITE_URL },
      { property: "og:image", content: "https://univermaster.kz/store-original.jpg" },
      { property: "og:locale", content: "ru_KZ" },
    ],
    links: [
      { rel: "canonical", href: SITE_URL },
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: "/__grok/manifest.webmanifest" },
      { rel: "apple-touch-icon", href: "/__grok/icon-180.png" },
    ],
  }),
  component: () => (
    <html lang="ru" className="antialiased" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        <PreviewHostBridge />
        <AuthProvider>
          <Outlet />
        </AuthProvider>
        <Scripts />
      </body>
    </html>
  ),
});
