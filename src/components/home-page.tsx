import { useEffect, useState, type FormEvent, type MouseEvent, type ReactNode } from "react";
import {
  Clock,
  Droplets,
  Hammer,
  Instagram,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  Sprout,
  Star,
  Tag,
  Users,
  Boxes,
  X,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { buttonClass } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import {
  addressLine,
  advantages,
  categories,
  hourGroups,
  nav,
  openStatus,
  phoneHref,
  reviews,
  store,
  storeJsonLd,
  whatsappHref,
  yandexEmbedSrc,
  yandexMapHref,
  yandexRouteHref,
  type CategoryIcon,
  type OpenStatus,
} from "@/lib/store";

const categoryIcons: Record<CategoryIcon, LucideIcon> = {
  zap: Zap,
  droplets: Droplets,
  sprout: Sprout,
  hammer: Hammer,
};

const advantageIcons = [Boxes, Tag, Users, MapPin];

function useOpenStatus() {
  const [status, setStatus] = useState<OpenStatus | null>(null);
  useEffect(() => {
    const read = () => setStatus(openStatus(new Date()));
    read();
    const id = window.setInterval(read, 60_000);
    return () => window.clearInterval(id);
  }, []);
  return status;
}

function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("mx-auto w-full max-w-6xl px-4 sm:px-6", className)}>{children}</div>;
}

function Logo({ onClick }: { onClick?: () => void }) {
  return (
    <a href="#top" onClick={onClick} className="flex min-w-0 items-center gap-3">
      <span className="grid size-10 shrink-0 place-items-center rounded-sm bg-accent font-display text-sm font-medium text-on-accent">
        UM
      </span>
      <span className="min-w-0">
        <span className="block truncate font-display text-sm leading-tight font-medium text-ink">
          {store.name}
        </span>
        <span className="block truncate text-xs text-muted">{store.city}</span>
      </span>
    </a>
  );
}

function openExternal(event: MouseEvent<HTMLAnchorElement>) {
  if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  event.preventDefault();
  const href = event.currentTarget.href;
  const popup = window.open(href, "_blank", "noopener,noreferrer");
  if (!popup) window.location.href = href;
}

function CallLink({ className, size = "md" }: { className?: string; size?: "md" | "lg" }) {
  return (
    <a href={phoneHref()} className={buttonClass({ variant: "call", size }, className)}>
      <Phone className="size-4" aria-hidden="true" />
      Позвонить
    </a>
  );
}

function WhatsAppLink({
  className,
  size = "md",
  variant = "primary",
  text,
}: {
  className?: string;
  size?: "md" | "lg";
  variant?: "primary" | "ghost" | "outline";
  text?: string;
}) {
  return (
    <a
      href={whatsappHref(text)}
      target="_blank"
      rel="noopener noreferrer"
      onClick={openExternal}
      className={buttonClass({ variant, size }, className)}
    >
      <MessageCircle className="size-4" aria-hidden="true" />
      WhatsApp
    </a>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const status = useOpenStatus();

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header id="top" className="sticky top-0 z-40 border-b border-line bg-card text-ink">
      <Container className="flex h-16 items-center gap-3">
        <Logo onClick={() => setOpen(false)} />
        <nav className="ml-6 hidden items-center gap-6 lg:flex" aria-label="Разделы">
          {nav.map((item) => (
            <a key={item.href} href={item.href} className="text-sm text-muted hover:text-ink">
              {item.label}
            </a>
          ))}
        </nav>
        <div className="ml-auto hidden items-center gap-3 md:flex">
          {status ? (
            <span className="hidden text-xs text-muted xl:inline">
              {status.label}
              {" · "}
              {status.detail}
            </span>
          ) : null}
          <CallLink />
          <WhatsAppLink />
        </div>
        <button
          type="button"
          className="press ml-auto grid size-11 place-items-center rounded-sm text-ink ring-1 ring-line ring-inset md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
          <span className="sr-only">{open ? "Закрыть меню" : "Открыть меню"}</span>
        </button>
      </Container>
      {open ? (
        <div id="mobile-menu" className="border-t border-line bg-card md:hidden">
          <Container className="flex flex-col gap-1 py-3">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-sm px-2 py-3 text-base text-ink"
              >
                {item.label}
              </a>
            ))}
          </Container>
        </div>
      ) : null}
    </header>
  );
}

function Hero() {
  const status = useOpenStatus();
  const groups = hourGroups();

  return (
    <section className="relative isolate overflow-hidden bg-[#0e1c36] text-white">
      <div className="relative h-72 sm:h-80 lg:absolute lg:inset-0 lg:h-full">
        <img
          src="/photos/facade.jpg"
          alt="Здание магазина Univer Master"
          width={1792}
          height={1008}
          className="absolute inset-0 h-full w-full object-cover object-[62%_32%]"
        />
        <div
          className="absolute inset-0 bg-gradient-to-b from-[#0e1c36]/25 via-[#0e1c36]/45 to-[#0e1c36] lg:bg-gradient-to-r lg:from-[#0e1c36] lg:via-[#0e1c36]/78 lg:to-[#0e1c36]/30"
          aria-hidden="true"
        />
      </div>
      <Container className="relative grid items-start gap-8 py-10 lg:min-h-[38rem] lg:grid-cols-12 lg:items-center lg:gap-10 lg:py-20">
        <div className="lg:col-span-7">
          <p className="text-sm font-semibold text-accent-soft">{store.kind}</p>
          <h1 className="mt-4 max-w-3xl font-display text-4xl leading-[1.12] font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
            {store.headline}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/80">{store.lead}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <CallLink size="lg" className="w-full sm:w-auto" />
            <WhatsAppLink size="lg" className="w-full sm:w-auto" />
          </div>
          <a
            href={store.reviewsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white"
          >
            <Star className="size-4 text-accent-soft" aria-hidden="true" />
            <span className="tabular-nums">
              {store.ratingScore} из 5 · {store.ratingCount}
            </span>
          </a>
        </div>

        <div className="lg:col-span-5">
          <aside className="rounded-2xl border border-line bg-card p-6 text-ink shadow-panel lg:p-7">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm text-muted">Магазин сегодня</p>
              <p className="mt-2 font-display text-3xl font-semibold" aria-live="polite">
                {status ? status.label : "Караганда"}
              </p>
              <p className="mt-1 text-sm text-muted">{status ? status.detail : store.district}</p>
            </div>
            <span
              className={cn(
                "mt-1 size-2.5 shrink-0 rounded-full",
                status?.open ? "bg-accent" : "bg-line",
              )}
              aria-hidden="true"
            />
          </div>
          <ul className="mt-6 divide-y divide-line border-y border-line">
            {groups.map((group) => (
              <li key={group.label} className="flex items-center justify-between gap-4 py-3 text-sm">
                <span className="inline-flex items-center gap-2 text-muted">
                  <Clock className="size-4" aria-hidden="true" />
                  {group.label}
                </span>
                <span className="font-semibold tabular-nums">{group.value}</span>
              </li>
            ))}
          </ul>
          <a
            href={yandexRouteHref()}
            target="_blank"
            rel="noopener noreferrer"
            onClick={openExternal}
            className={buttonClass({ variant: "primary", size: "lg" }, "mt-6 w-full")}
          >
            <MapPin className="size-4" aria-hidden="true" />
            Проложить маршрут
          </a>
        </aside>
        </div>
      </Container>
    </section>
  );
}

function Catalog() {
  return (
    <section id="catalog" className="py-20 lg:py-28">
      <Container>
        <div className="max-w-2xl">
          <h2 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">Что есть в магазине</h2>
          <p className="mt-4 text-lg leading-relaxed text-muted">
            Четыре больших отдела. Наличие конкретной позиции лучше уточнить — напишите, подскажем, что сейчас в зале.
          </p>
        </div>
        <ul className="mt-10 grid gap-5 sm:grid-cols-2">
          {categories.map((category) => {
            const Icon = categoryIcons[category.icon];
            return (
              <li key={category.title} className="overflow-hidden rounded-2xl border border-line bg-card shadow-panel">
                <img
                  src={category.image}
                  alt=""
                  width={1200}
                  height={700}
                  className="h-28 w-full object-cover sm:h-32"
                />
                <div className="p-6">
                  <div className="flex items-center gap-3">
                    <span className="grid size-10 shrink-0 place-items-center rounded-sm bg-accent-soft text-accent">
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                    <h3 className="min-w-0 text-xl font-bold tracking-tight">{category.title}</h3>
                  </div>
                  <ul className="mt-4 space-y-1.5 text-sm leading-6 text-ink">
                    {category.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <a
                    href={whatsappHref(
                      `${store.whatsappGreeting}\nИнтересует раздел «${category.title}». Подскажите, что есть в наличии?`,
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={openExternal}
                    className={buttonClass({ variant: "primary", size: "md" }, "mt-5 w-full")}
                  >
                    Спросить наличие
                  </a>
                </div>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}

function Advantages() {
  return (
    <section id="advantages" className="border-y border-line bg-paper py-20 text-ink lg:py-28">
      <Container>
        <h2 className="max-w-xl font-display text-4xl font-semibold tracking-tight sm:text-5xl">
          Почему выбирают именно нас
        </h2>
        <ul className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {advantages.map((item, index) => {
            const Icon = advantageIcons[index] ?? Boxes;
            return (
              <li key={item.title} className="border-t border-line pt-5">
                <Icon className="size-5 text-accent" aria-hidden="true" />
                <h3 className="mt-4 text-xl font-bold">{item.title}</h3>
                <p className="mt-3 text-base leading-relaxed text-muted">{item.text}</p>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}

function Reviews() {
  return (
    <section id="reviews" className="py-20 lg:py-28">
      <Container>
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div className="max-w-xl">
            <h2 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">Что пишут покупатели</h2>
            <p className="mt-4 text-lg leading-relaxed text-muted">
              Отзывы с карточки магазина на {store.ratingSource}, без редактуры сути.
            </p>
          </div>
          <a
            href={store.reviewsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold"
          >
            <Star className="size-4 text-accent" aria-hidden="true" />
            <span className="tabular-nums">
              {store.ratingScore} из 5 · {store.ratingCount}
            </span>
          </a>
        </div>
        <ul className="mt-8 grid gap-4 md:grid-cols-2">
          {reviews.map((review) => (
            <li key={review.name} className="flex flex-col rounded-2xl border border-line bg-card p-6 shadow-panel">
              <div className="flex gap-1 text-accent" aria-hidden="true">
                {Array.from({ length: 5 }, (_, index) => (
                  <Star key={index} className="size-4 fill-current" />
                ))}
              </div>
              <blockquote className="mt-4 flex-1">
                <p className="text-lg leading-relaxed">«{review.text}»</p>
              </blockquote>
              <footer className="mt-5 border-t border-line pt-4 text-sm font-bold text-ink">{review.name}</footer>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

function QuestionForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [question, setQuestion] = useState("");
  const [error, setError] = useState("");

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const text = question.trim();
    if (text.length < 3) {
      setError("Напишите вопрос — хотя бы пару слов.");
      return;
    }
    const lines = [
      store.whatsappGreeting,
      name.trim() ? `Меня зовут ${name.trim()}.` : "",
      phone.trim() ? `Телефон: ${phone.trim()}.` : "",
      text,
    ].filter(Boolean);
    setError("");
    const href = whatsappHref(lines.join("\n"));
    const popup = window.open(href, "_blank", "noopener,noreferrer");
    if (!popup) window.location.href = href;
  }

  return (
    <form onSubmit={onSubmit} className="rounded-2xl border border-line bg-card p-6 shadow-panel" noValidate>
      <h3 className="text-lg font-semibold">Задать вопрос</h3>
      <p className="mt-2 text-sm text-muted">
        Сообщение откроется в WhatsApp — оттуда его можно сразу отправить. Сайт ничего не хранит.
      </p>
      <div className="mt-5 grid gap-4">
        <label className="grid gap-2 text-sm font-medium">
          Имя
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            name="name"
            autoComplete="name"
            suppressHydrationWarning
            className="h-12 rounded-sm border border-line bg-cream px-3 text-base font-normal"
            placeholder="Как к вам обращаться"
          />
        </label>
        <label className="grid gap-2 text-sm font-medium">
          Телефон
          <input
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            name="tel"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            suppressHydrationWarning
            className="h-12 rounded-sm border border-line bg-cream px-3 text-base font-normal tabular-nums"
            placeholder="+7"
          />
        </label>
        <label className="grid gap-2 text-sm font-medium">
          Вопрос
          <textarea
            value={question}
            onChange={(event) => setQuestion(event.target.value)}
            name="question"
            required
            rows={4}
            suppressHydrationWarning
            className="rounded-sm border border-line bg-cream px-3 py-3 text-base font-normal"
            placeholder="Например: есть ли смеситель для кухни и какой ценник?"
          />
        </label>
      </div>
      {error ? (
        <p className="mt-3 text-sm font-medium text-accent" role="alert">
          {error}
        </p>
      ) : null}
      <button type="submit" className={buttonClass({ variant: "primary", size: "lg" }, "mt-5 w-full")}>
        <MessageCircle className="size-4" aria-hidden="true" />
        Написать в WhatsApp
      </button>
    </form>
  );
}

function Contacts() {
  const groups = hourGroups();

  return (
    <section id="contacts" className="border-t border-line bg-paper py-20 lg:py-28">
      <Container>
        <div className="max-w-2xl">
          <h2 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">Как нас найти</h2>
          <p className="mt-4 text-lg leading-relaxed text-muted">
            {addressLine()}, {store.district}. Позвоните или напишите — ответим в рабочее время.
          </p>
        </div>
        <div className="mt-8 grid items-start gap-4 lg:grid-cols-2">
          <div className="grid gap-4">
            <div className="rounded-2xl border border-line bg-card p-6 text-ink shadow-panel">
              <address className="not-italic">
                <p className="text-sm text-muted">Адрес</p>
                <p className="mt-2 text-xl font-semibold">
                  {store.street}
                  <br />
                  {store.city}
                </p>
                <p className="mt-2 text-sm text-muted">
                  {store.district}. {store.floors}.
                </p>
              </address>
              <div className="mt-6 grid gap-3">
                <a href={phoneHref()} className="text-lg font-semibold text-accent tabular-nums">
                  {store.phoneDisplay}
                </a>
                <a
                  href={store.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-muted hover:text-ink"
                >
                  <Instagram className="size-4" aria-hidden="true" />
                  {store.instagramHandle}
                </a>
              </div>
              <div className="mt-6 border-t border-line pt-4">
                <p className="text-sm text-muted">Режим работы</p>
                <ul className="mt-3 space-y-2 text-sm">
                  {groups.map((group) => (
                    <li key={group.label} className="flex justify-between gap-4">
                      <span>{group.label}</span>
                      <span className="font-semibold tabular-nums">{group.value}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <CallLink size="lg" className="w-full sm:flex-1" />
                <WhatsAppLink size="lg" className="w-full sm:flex-1" />
              </div>
            </div>
            <QuestionForm />
          </div>
          <div className="flex flex-col gap-4 lg:sticky lg:top-24">
            <div className="h-80 overflow-hidden rounded-2xl border border-line bg-paper sm:h-96">
              <iframe
                title={`Карта: ${store.name}, ${store.street}, ${store.city}`}
                src={yandexEmbedSrc()}
                className="h-full w-full border-0"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href={yandexMapHref()}
                target="_blank"
                rel="noopener noreferrer"
                onClick={openExternal}
                className={buttonClass({ variant: "outline", size: "lg" }, "w-full sm:flex-1")}
              >
                Открыть в Яндекс Картах
              </a>
              <a
                href={store.reviewsUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={openExternal}
                className={buttonClass({ variant: "outline", size: "lg" }, "w-full sm:flex-1")}
              >
                Карточка в 2ГИС
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function Footer() {
  return (
    <footer className="dock-pad border-t border-line bg-card text-ink">
      <Container className="flex flex-col gap-6 py-10 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="font-display text-lg font-semibold">{store.name}</p>
          <p className="mt-2 text-sm text-muted">{store.kind}</p>
        </div>
        <div className="grid gap-3">
          <a
            href={store.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 text-lg font-semibold text-ink hover:text-accent"
          >
            <img src="/logos/instagram.svg" alt="" width={32} height={32} className="size-8 shrink-0" />
            {store.instagramHandle}
          </a>
          <a
            href={store.reviewsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 text-lg font-semibold text-ink hover:text-accent"
          >
            <img src="/logos/2gis.svg" alt="" width={32} height={32} className="size-8 shrink-0" />
            Отзывы на 2ГИС
          </a>
        </div>
      </Container>
    </footer>
  );
}

function Dock() {
  return (
    <div className="dock fixed inset-x-0 bottom-0 z-40 border-t border-line bg-card px-4 pt-3 shadow-dock md:hidden">
      <div className="mx-auto flex max-w-6xl gap-3">
        <CallLink size="lg" className="min-w-0 flex-1 px-3" />
        <WhatsAppLink size="lg" className="min-w-0 flex-1 px-3" />
      </div>
    </div>
  );
}

export function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(storeJsonLd()) }} />
      <Header />
      <main id="main">
        <Hero />
        <Catalog />
        <Advantages />
        <Reviews />
        <Contacts />
      </main>
      <Footer />
      <Dock />
    </>
  );
}
