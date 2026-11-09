#!/usr/bin/env bash
# Сторожок сервера (раз в 5 минут, site-heartbeat.timer): nginx и PostgreSQL работают, сайты и проекты на подпутях
# отвечают через 443, сертификатам осталось больше 14 дней, диск не забит — тогда пинг в Cronheart (HEARTBEAT_URL).
# При сбое шлём /fail — Cronheart пишет сразу, причина — в журнале (journalctl -u site-heartbeat).
# Сервер лежит целиком — не уходит ничего, Cronheart пишет, не дождавшись пинга.
set -uo pipefail

ENV_FILE=/etc/site-heartbeat.env
[[ -r "$ENV_FILE" ]] && . "$ENV_FILE"

fail() {
	echo "FAIL: $*" >&2
	[[ -n "${HEARTBEAT_URL:-}" ]] && curl -fsS -m 10 --retry 3 -o /dev/null "$HEARTBEAT_URL/fail"
	exit 1
}

[[ -n "${HEARTBEAT_URL:-}" ]] || fail "HEARTBEAT_URL не задан в $ENV_FILE"

for s in nginx postgresql; do
	systemctl is-active --quiet "$s" || fail "$s не запущен"
done

# Через публичный адрес, как ходят посетители: 443 → nginx → статика или процесс pm2.
for url in \
	https://nikitosfrolov.ru/ \
	https://nikitosfrolov.ru/galaxy/ \
	https://nikitosfrolov.ru/rjd/ \
	https://nikitosfrolov.ru/textbin/ \
	https://kvadratnikitosa.ru/; do
	code="$(curl -sS -m 15 -o /dev/null -w '%{http_code}' "$url")"
	[[ "$code" == 200 ]] || fail "$url: HTTP $code"
done

# certbot продлевает за 30 дней до конца. Меньше 14 — продление давно не проходит.
# Смотрим сертификат, который отдаёт nginx, а не файл: ловит и забытый reload.
for d in nikitosfrolov.ru kvadratnikitosa.ru; do
	openssl s_client -connect 127.0.0.1:443 -servername "$d" </dev/null 2>/dev/null |
		openssl x509 -noout -checkend $((14 * 86400)) >/dev/null ||
		fail "сертификат $d истекает меньше чем через 14 дней — certbot не продлевает (journalctl -u certbot)"
done

used="$(df --output=pcent / | tail -1 | tr -dc 0-9)"
((used < 90)) || fail "диск / заполнен на $used%"

# URL не печатаем: в нём ключ чека.
curl -fsS -m 15 --retry 2 -o /dev/null "$HEARTBEAT_URL" || fail "пинг в Cronheart не ушёл"
echo "OK"
