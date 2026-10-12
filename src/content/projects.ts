import kvadratRisovalka from "../images/kvadrat-risovalka.webp";

export type Project = {
  id: string;
  icon: string; // смайлик слева от названия
  title: string;
  details: string[];
  image?: string; // одна картинка справа от текста
  link: { label: string; href: string };
};

// Порядок в массиве = порядок на сайте
export const projects: Project[] = [
  {
    id: "galaxy",
    icon: "❤️",
    title: "Граф друзей на звёздном небе",
    details: [
      "Каждый участник — светящаяся звезда. Чем больше связей у человека, тем ближе его звезда к центру карты. Группа друзей образует кластер",
      "Просто хочется, чтобы было красиво ✨ :)",
    ],
    link: { label: "Открыть в Telegram", href: "https://t.me/Star_Fusion_Bot" },
  },
  {
    id: "kvadratnikitosa",
    icon: "🎨",
    title: "Живая рисовалка",
    details: [
      "Рисовалка влияющая на реальность",
      "У меня дома стоит квадрат. Рисуешь онлайн - изображение переводится на него. Пинг <1 сек",
    ],
    image: kvadratRisovalka,
    link: { label: "Открыть", href: "https://kvadratnikitosa.ru" },
  },
  {
    id: "domofon",
    icon: "🔑",
    title: "Ключи от домофонов (Москва)",
    details: ["База 2017 года, новых домов нет"],
    link: { label: "Открыть в Telegram", href: "https://t.me/zahodiiBot" },
  },
  {
    id: "rjd",
    icon: "🚂",
    title: "Отслеживание билетов РЖД",
    details: [
      "Ловит сданные билеты на нужный поезд и присылает уведомление в ТГ.",
      "Актуально в праздничные дни, когда уехать надо, а остались только билеты за 100500 рублей",
    ],
    link: { label: "Открыть в Telegram", href: "https://t.me/rjdPassBot" },
  },
  {
    id: "textbin",
    icon: "📝",
    title: "Записки онлайн",
    details: [
      "Залил текст — получил ссылку. Без регистрации.",
      "Удобно шарить скиллы - при запросах curl сервер отдаёт сырой текст.",
    ],
    link: { label: "Открыть", href: "https://nikitosfrolov.ru/textbin/" },
  },
];
