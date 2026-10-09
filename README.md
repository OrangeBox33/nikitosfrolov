# nikitosfrolov.ru

Визитка: проекты и тексты. React + Vite, без сервера и БД — в прод уходит статика из `dist/`.

```bash
npm run dev              # сайт: http://localhost:5180
npm run sandbox          # песочница: http://localhost:5180/sandbox.html
./deploy.sh              # собрать и залить dist/ в /var/www/nikitosfrolov
./deploy.sh --dry-run    # собрать и показать, что уедет
```

## Где что

- `src/content/projects.ts` — блоки проектов, порядок в массиве = порядок на сайте.
- `src/content/texts/*.md` — тексты. Сверху frontmatter с `title`, порядок задаёт префикс имени (`01-…`).
- `src/content/site.ts` — имя, подзаголовок, ссылки в подвале.
- `src/theme.ts` — тема: цвета, шрифты, размеры. `defaultTheme` — то, что видит прод.
- `src/sandbox/` — песочница: те же компоненты сайта плюс панель настроек. В сборку не попадает.
  «Скопировать тему» кладёт в буфер отличия от `defaultTheme` — их переносим в `theme.ts`.

Проекты на подпутях — отдельные репо со своим `./deploy.sh`:
[galaxy](https://nikitosfrolov.ru/galaxy/) (`~/dev/galaxy`),
[rjd](https://nikitosfrolov.ru/rjd/) (`~/dev/rjd`),
[textbin](https://nikitosfrolov.ru/textbin/) (`~/dev/textbin`).
