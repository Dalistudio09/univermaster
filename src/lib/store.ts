/**
 * Univer Master — все данные магазина в одном файле.
 *
 * Что обычно меняют:
 * - телефон, WhatsApp, Instagram, адрес — блок `store`
 * - график — массив `hours` (формат времени строго "ЧЧ:ММ")
 * - категории и короткие списки товаров — `categories`
 * - преимущества — `advantages`
 * - отзывы и рейтинг — `reviews` и `store.rating`
 *   (цифры взяты с 2ГИС; обновите, если оценка изменилась)
 * - точка на карте — `store.geo` (широта lat, долгота lon)
 *
 * График сам подставляется в герой, контакты и статус «открыто / закрыто».
 * Часовой пояс — Караганда, UTC+5 (`Asia/Almaty`).
 */

export type DayHours = {
  /** 0 = воскресенье, 1 = понедельник, … 6 = суббота (как Date.getDay). */
  day: number;
  short: string;
  open: string;
  close: string;
};

export type CategoryIcon = "zap" | "droplets" | "sprout" | "hammer";

export const store = {
  name: "Univer Master",
  /** Подпись под названием в шапке и футере. */
  kind: "Строительный магазин",
  city: "Караганда",
  /** Главный заголовок на первом экране. */
  headline: "Всё для ремонта и дома в одном месте",
  /** Короткий абзац под заголовком. */
  lead: "Электротовары, сантехника, сад и товары для ремонта — в зале на Четской. Большой выбор, понятные цены и консультанты, которые помогают собрать нужное.",
  /** Улица так, как её стоит говорить клиенту. */
  street: "ул. Четская, 6а",
  district: "район Казыбек би",
  /** Как на 2ГИС: магазин в два этажа. Уберите строку в интерфейсе, если это лишнее. */
  floors: "Два этажа",
  /** Только цифры, без плюса: так собираются ссылки tel: и WhatsApp. */
  phoneDigits: "77003031073",
  /** Как номер выглядит на сайте. */
  phoneDisplay: "+7 700 303-10-73",
  instagramHandle: "@univer.master_krg",
  instagramUrl: "https://www.instagram.com/univer.master_krg/",
  /** Карточка организации, откуда взяты отзывы. */
  reviewsUrl: "https://2gis.kz/karaganda/firm/70000001056701069",
  ratingScore: "4,9",
  ratingCount: "112 оценок",
  ratingSource: "2ГИС",
  /**
   * Точка входа магазина по карточке 2ГИС.
   * lat — широта, lon — долгота. Если переедете, поменяйте обе цифры.
   */
  geo: { lat: 49.775187, lon: 73.097447 },
  /** Текст, который уходит в WhatsApp, если человек нажал кнопку без формы. */
  whatsappGreeting: "Здравствуйте! Пишу с сайта Univer Master.",
  description:
    "Строительный магазин Univer Master в Караганде на ул. Четская, 6а. Электротовары, сантехника, товары для сада и ремонта. Большой выбор, доступные цены. Тел: +7 700 303-10-73",
};

/** Поменяйте open/close — подписи дней лучше не трогать, чтобы группировка Пн–Пт осталась верной. */
export const hours: DayHours[] = [
  { day: 1, short: "Пн", open: "09:00", close: "18:00" },
  { day: 2, short: "Вт", open: "09:00", close: "18:00" },
  { day: 3, short: "Ср", open: "09:00", close: "18:00" },
  { day: 4, short: "Чт", open: "09:00", close: "18:00" },
  { day: 5, short: "Пт", open: "09:00", close: "18:00" },
  { day: 6, short: "Сб", open: "09:00", close: "17:00" },
  { day: 0, short: "Вс", open: "10:00", close: "17:00" },
];

export const categories: {
  icon: CategoryIcon;
  title: string;
  image: string;
  items: string[];
}[] = [
  {
    icon: "zap",
    title: "Электротовары",
    image: "/photos/electric.jpg",
    items: ["Кабель и провод", "Автоматы и щиты", "Розетки и выключатели", "Лампы"],
  },
  {
    icon: "droplets",
    title: "Сантехника",
    image: "/photos/plumbing.jpg",
    items: ["Смесители", "Трубы и фитинги", "Сифоны и подводка", "Расходники"],
  },
  {
    icon: "sprout",
    title: "Товары для сада и огорода",
    image: "/photos/garden.jpg",
    items: ["Садовый инструмент", "Шланги и полив", "Грунт и уход", "Сезонные товары"],
  },
  {
    icon: "hammer",
    title: "Хозтовары и товары для ремонта",
    image: "/photos/tools.jpg",
    items: ["Ручной инструмент", "Крепёж", "Краски и химия", "Хозтовары"],
  },
];

export const advantages: { title: string; text: string }[] = [
  {
    title: "Большой выбор",
    text: "Электрика, сантехника, сад и хозтовары на одном адресе — не нужно собирать ремонт по нескольким магазинам.",
  },
  {
    title: "Доступные цены",
    text: "Цены без витринной накрутки: можно сравнить в зале и взять то, что реально нужно.",
  },
  {
    title: "Вежливый персонал",
    text: "Подскажут по товару и помогут собрать позицию, даже если список писали на ходу.",
  },
  {
    title: "Удобное расположение",
    text: "ул. Четская, 6а, район Казыбек би. Два этажа, легко заехать по пути.",
  },
];

/**
 * Живые формулировки с 2ГИС, слегка причёсаны по знакам.
 * Не выдумывайте новые имена — лучше замените цитату реальной.
 */
export const reviews: { name: string; text: string }[] = [
  {
    name: "Миша Митюгов",
    text: "Магазин хороший, большой ассортимент. Обслуживающий персонал на высшем уровне, ребята знают своё дело. Рекомендую.",
  },
  {
    name: "Аида Тулегенова",
    text: "Удобно, что всё есть в одном месте. Хороший магазин и помогающие продавцы.",
  },
  {
    name: "Bekbolat",
    text: "Очень хороший магазин, всё и для огорода, и для ремонта. Вежливый персонал, всё подсказали.",
  },
  {
    name: "Оксана Казаченко",
    text: "Хороший магазин. Менеджеры Александр и Роман подобрали нужный товар.",
  },
];

export const nav = [
  { href: "#catalog", label: "Категории" },
  { href: "#advantages", label: "Почему мы" },
  { href: "#reviews", label: "Отзывы" },
  { href: "#contacts", label: "Контакты" },
] as const;

const TIMEZONE = "Asia/Almaty";

const WEEKDAY_TO_DAY: Record<string, number> = {
  Sun: 0,
  Mon: 1,
  Tue: 2,
  Wed: 3,
  Thu: 4,
  Fri: 5,
  Sat: 6,
};

export function phoneHref() {
  return `tel:+${store.phoneDigits}`;
}

export function whatsappHref(text?: string) {
  const base = `https://wa.me/${store.phoneDigits}`;
  const message = text?.trim() || store.whatsappGreeting;
  return `${base}?text=${encodeURIComponent(message)}`;
}

export function hourGroups(list: DayHours[] = hours) {
  const order = [1, 2, 3, 4, 5, 6, 0];
  const groups: { label: string; value: string }[] = [];
  for (const day of order) {
    const row = list.find((item) => item.day === day);
    if (!row) continue;
    const value = `${row.open}–${row.close}`;
    const last = groups[groups.length - 1];
    if (last && last.value === value) {
      const [from] = last.label.split("–");
      last.label = `${from}–${row.short}`;
    } else {
      groups.push({ label: row.short, value });
    }
  }
  return groups;
}

export function addressLine() {
  return `${store.street}, ${store.city}`;
}

function zonedWeekday(date: Date) {
  const name = new Intl.DateTimeFormat("en-US", {
    timeZone: TIMEZONE,
    weekday: "short",
  }).format(date);
  return WEEKDAY_TO_DAY[name] ?? 1;
}

function zonedMinutes(date: Date) {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: TIMEZONE,
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);
  const hour = Number(parts.find((part) => part.type === "hour")?.value ?? "0");
  const minute = Number(parts.find((part) => part.type === "minute")?.value ?? "0");
  return hour * 60 + minute;
}

function toMinutes(value: string) {
  const [hour, minute] = value.split(":");
  return Number(hour) * 60 + Number(minute);
}

export type OpenStatus = {
  open: boolean;
  /** Короткая подпись для бейджа. */
  label: string;
  /** Уточнение: до которого часа или когда откроемся. */
  detail: string;
};

export function openStatus(now = new Date()): OpenStatus {
  const day = zonedWeekday(now);
  const row = hours.find((item) => item.day === day) ?? hours[0];
  const current = zonedMinutes(now);
  const open = toMinutes(row.open);
  const close = toMinutes(row.close);
  if (current >= open && current < close) {
    return { open: true, label: "Сейчас открыто", detail: `до ${row.close}` };
  }
  if (current < open) {
    return { open: false, label: "Сейчас закрыто", detail: `откроемся сегодня в ${row.open}` };
  }
  const nextDay = (day + 1) % 7;
  const next = hours.find((item) => item.day === nextDay) ?? row;
  return { open: false, label: "Сейчас закрыто", detail: `откроемся завтра в ${next.open}` };
}

export function yandexEmbedSrc() {
  const { lat, lon } = store.geo;
  return `https://yandex.ru/map-widget/v1/?ll=${lon}%2C${lat}&z=16&pt=${lon},${lat},pm2rdm&l=map`;
}

export function yandexMapHref() {
  const { lat, lon } = store.geo;
  return `https://yandex.kz/maps/?ll=${lon}%2C${lat}&z=17&pt=${lon},${lat}&l=map`;
}

export function yandexRouteHref() {
  const { lat, lon } = store.geo;
  return `https://yandex.kz/maps/?rtext=~${lat},${lon}&rtt=auto`;
}

const SCHEMA_DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export function storeJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "HardwareStore"],
    name: store.name,
    description: store.description,
    url: "https://univermaster.kz/",
    image: "https://univermaster.kz/store-original.jpg",
    telephone: `+${store.phoneDigits}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: store.street,
      addressLocality: store.city,
      addressCountry: "KZ",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: store.geo.lat,
      longitude: store.geo.lon,
    },
    openingHoursSpecification: hours.map((row) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: SCHEMA_DAYS[row.day],
      opens: row.open,
      closes: row.close,
    })),
    sameAs: [store.instagramUrl, store.reviewsUrl],
  };
}
