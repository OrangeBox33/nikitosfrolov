#!/usr/bin/env bash
#
# Ставит сторожок сервера: server/heartbeat.sh → /usr/local/bin/site-heartbeat, таймер systemd раз в 5 минут.
#
#   ./server/heartbeat-setup.sh                                  обновить скрипт и юниты
#   HEARTBEAT_URL=https://cronheart.com/ping/… ./server/heartbeat-setup.sh   заодно записать URL пинга
#
# URL пинга живёт только на сервере, в /etc/site-heartbeat.env. Повторный запуск безопасен.

set -euo pipefail

REMOTE="${NIKITOSFROLOV_REMOTE:-root@185.228.232.194}"
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

scp -q "$DIR/heartbeat.sh" "$REMOTE:/usr/local/bin/site-heartbeat"

# Через stdin, а не аргументом: ключ не светится в списке процессов.
if [ -n "${HEARTBEAT_URL:-}" ]; then
	printf 'HEARTBEAT_URL=%s\n' "$HEARTBEAT_URL" | ssh "$REMOTE" 'umask 077 && cat >/etc/site-heartbeat.env'
fi

ssh "$REMOTE" bash -s <<'SH'
set -euo pipefail
chmod 755 /usr/local/bin/site-heartbeat
[[ -s /etc/site-heartbeat.env ]] || { echo "Нет /etc/site-heartbeat.env: запусти с HEARTBEAT_URL=…" >&2; exit 1; }

cat >/etc/systemd/system/site-heartbeat.service <<UNIT
[Unit]
Description=Сторожок сервера: сайты, сертификаты, диск -> пинг в Cronheart
After=network-online.target
Wants=network-online.target

[Service]
Type=oneshot
ExecStart=/usr/local/bin/site-heartbeat
UNIT

cat >/etc/systemd/system/site-heartbeat.timer <<UNIT
[Unit]
Description=Сторожок сервера раз в 5 минут

[Timer]
OnBootSec=1min
OnUnitActiveSec=5min

[Install]
WantedBy=timers.target
UNIT

systemctl daemon-reload
systemctl enable -q --now site-heartbeat.timer
systemctl start site-heartbeat.service || true
journalctl -u site-heartbeat -n 1 -o cat --no-pager
SH
