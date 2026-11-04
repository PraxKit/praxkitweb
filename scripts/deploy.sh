#!/usr/bin/env bash
#
# deploy.sh — build the static site and mirror it to netzone.ch over FTPES.
#
# netzone.ch is reached via FTPES (explicit FTP over TLS, port 21). Accent CMS
# is deployed as a STATIC BUILD (free, Core edition): we render locally with
# `accent build`, then upload the files. Nothing runs on the host.
#
# Usage:
#   FTP_HOST=ftp.netzone.ch FTP_USER=myuser FTP_REMOTE_DIR=/www \
#     scripts/deploy.sh
#
# Auth: lftp prompts for the password. Tools needed: accent, lftp (brew install lftp)

set -euo pipefail

BASE_URL="${BASE_URL:-https://www.praxkit.ch}"
OUT="$PWD/public"   # Absolute on purpose: serve-static and the lftp mirror below
                    # take the same path. (Accent <= 0.23 also panicked on a
                    # relative --output; 0.26 does not.)

# ----------------------------------------------------------------------------
# 1) Build the static site
# ----------------------------------------------------------------------------
echo "==> Validating content and theme"
accent validate     # Accent >= 0.26: fails on a theme missing the canonical
                    # components, a link to a draft page, duplicate frontmatter
                    # keys. Same gate as the CI workflow.

echo "==> Building $BASE_URL → $OUT"
accent build --clean --output "$OUT" --base-url "$BASE_URL"

# Confirm the generated 404 page is present. (The theme declares PNG
# favicons under /theme/assets/ in <head>; there is no root favicon.ico.)
test -f "$OUT/404.html" || echo "WARNING: 404.html was not generated — check content/error/404.md" >&2

# The build writes .htaccess itself (build.header_artifacts in config.yaml):
# clean URLs, the www -> apex 301, the 404 page and the headers. Never copy
# one over it. Without it the mirror's --delete would remove the live file.
test -f "$OUT/.htaccess" || { echo "ERROR: accent build wrote no .htaccess — check build.header_artifacts in config.yaml" >&2; exit 1; }

# ----------------------------------------------------------------------------
# 2) Upload via FTPES (explicit FTP over TLS). lftp mirror = only changed files.
# ----------------------------------------------------------------------------
: "${FTP_HOST:?set FTP_HOST (e.g. ftp.netzone.ch)}"
: "${FTP_USER:?set FTP_USER}"
: "${FTP_REMOTE_DIR:?set FTP_REMOTE_DIR — the web root, e.g. /www or /public_html}"
FTP_PORT="${FTP_PORT:-21}"
FTP_VERIFY_CERT="${FTP_VERIFY_CERT:-yes}"   # set to "no" only if netzone uses a self-signed cert

command -v lftp >/dev/null || { echo "lftp not installed — run: brew install lftp" >&2; exit 1; }

echo "==> Uploading via FTPES to $FTP_USER@$FTP_HOST:$FTP_REMOTE_DIR"
# ssl-force = require explicit TLS (FTPES); ssl-protect-data = encrypt the data
# channel too. --delete removes remote files no longer in the build — only safe
# if the web root contains ONLY this site (drop --delete if it is shared).
lftp -u "$FTP_USER" "ftp://$FTP_HOST:$FTP_PORT" <<EOF
set ftp:ssl-force true
set ftp:ssl-protect-data true
set ssl:verify-certificate $FTP_VERIFY_CERT
mirror --reverse --delete --parallel=4 --verbose \
  --exclude-glob .DS_Store \
  "$OUT/" "$FTP_REMOTE_DIR/"
bye
EOF

echo "==> Done. https://www.praxkit.ch should now serve the new build."

# ----------------------------------------------------------------------------
# Notes
# ----------------------------------------------------------------------------
# • Certificate errors during the test phase: set FTP_VERIFY_CERT=no (test only).
# • Listing/upload hangs → it's almost always passive-mode + TLS data channel.
#   lftp uses passive mode by default; if needed add: set ftp:ssl-protect-data true
#   (already set) and reduce --parallel=1.
# • No-script alternative: drag the CONTENTS of ./public (incl. .htaccess) into
#   the web root with Cyberduck / FileZilla / Transmit using
#   "FTP-SSL (Explicit AUTH TLS)" / "Require explicit FTP over TLS".
