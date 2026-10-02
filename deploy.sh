#!/usr/bin/env bash
#
# Деплой визитки nikitosfrolov.ru.
#
#   ./deploy.sh              залить site/ в /var/www/nikitosfrolov
#   ./deploy.sh --dry-run    показать, что бы залилось
#
# Конфиг nginx сайта живёт только на сервере: /etc/nginx/sites-available/nikitosfrolov.ru.

set -euo pipefail

REMOTE="${NIKITOSFROLOV_REMOTE:-root@193.124.203.221}"
WEB_ROOT="/var/www/nikitosfrolov"

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

DRY_RUN=0

say() { printf '\n\033[1;36m==> %s\033[0m\n' "$*"; }
ok() { printf '\033[1;32m    %s\033[0m\n' "$*"; }
die() {
	printf '\n\033[1;31mОшибка: %s\033[0m\n' "$*" >&2
	exit 1
}

while [ $# -gt 0 ]; do
	case "$1" in
		--dry-run) DRY_RUN=1 ;;
		-h | --help)
			sed -n '2,8p' "${BASH_SOURCE[0]}" | sed 's/^# \{0,1\}//'
			exit 0
			;;
		*) die "неизвестный аргумент: $1" ;;
	esac
	shift
done

RSYNC_OPTS=(-az --delete --human-readable --itemize-changes --exclude '.DS_Store')

if [ "$DRY_RUN" = "1" ]; then
	say "Пробный прогон -> $REMOTE:$WEB_ROOT"
	rsync "${RSYNC_OPTS[@]}" --dry-run "$ROOT/site/" "$REMOTE:$WEB_ROOT/"
	exit 0
fi

say "Заливаю site/ на $REMOTE:$WEB_ROOT"
ssh "$REMOTE" "mkdir -p $WEB_ROOT"
rsync "${RSYNC_OPTS[@]}" "$ROOT/site/" "$REMOTE:$WEB_ROOT/"
ok "готово: https://nikitosfrolov.ru/"
