# Operator Manual — praxkit.ch

The website of **PraxKit** (Praxis-Administration für Therapeutinnen und
Therapeuten, Kapp Technology GmbH). Converted from the 2017 Jekyll one-pager
to **Accent CMS** in November 2026, following the kapp.land setup
(`~/dev/kapp.land/OPERATIONS.md` is the long-form reference; this file keeps
to what differs).

---

## 1. How it works

- **Accent CMS** (single binary, currently **0.28.1**) renders `content/`
  (Markdown) + the **`praxkit`** theme into a static site in `public/`.
- The output is uploaded over **FTPES** to netzone.ch (user `artooa.ch1`,
  web root `/`). Nothing runs on the host.
- The repo is on **github.com**; `.github/workflows/deploy.yml` validates,
  builds and mirrors on every push to `master` (or `main`).

| Path | What |
|---|---|
| `content/` | the pages. URL = file path (`content/preise.md` → `/preise`) |
| `content/blog/` | the four 2017 posts + listing; old Jekyll URLs redirect via `aliases:` |
| `themes/praxkit/` | **the original 2017 design, ported 1:1**: the compiled `app.min.css` (Bootstrap 4 alpha), the tree/portrait images under `assets/img/`, and templates that carry the old Jekyll markup verbatim (`home` = the one-pager from `src/index.html`, `blog`/`post`/`preise` = the old layouts) |
| `config.yaml` | site name/URL/language, fingerprinting, the generated `.htaccess` |
| `src/`, `_www/`, `target/` | the **legacy Jekyll site** — the source of truth the theme was ported from |

Theme notes:
- **Design, images and UX are the 2017 originals** — scrollspy one-pager
  with `#praxis`/`#werte`/`#features`/`#news`/`#kontakt` anchors, the
  Formspree contact form, the Google-Forms newsletter link. kapp.land was
  the structural template, not the visual one.
- **Dependencies modernised (Nov 2026), look unchanged**: Bootstrap
  5.3.3 (jsDelivr CDN, bundle JS — no jQuery, no Tether) and Font Awesome
  6.7.2 (cdnjs) replace Bootstrap 4 alpha 6 + jQuery 1.12 + FA 4.7. The
  design layer is `assets/css/praxkit.scss`, a port of
  `src/styles/_base.scss` compiled by Accent's Sass pipeline, plus the
  BS4 pieces BS5 dropped (`.jumbotron`, the old `btn-primary`/`btn-success`
  colours, `.text-alternative`). The contact form posts natively to
  Formspree (the jQuery `contact.js` is gone); the mobile nav
  auto-collapse is a small vanilla script in `base.html.jinja`. The
  footer carries the X logo (`fa-brands fa-x-twitter` → x.com/praxkit)
  and the "Erstellt mit Accent CMS {{ accent.version_string }}" credit.
- `templates/preise.html.jinja` mounts the old **price calculator**:
  `assets/js/calc-opt.js` is a **Scala.js** artifact (linker 0.6.18,
  2017), carried over unchanged from `src/js/calc-opt.js`. Its Scala
  sources are not in this repo.
- The "Aktuell" block on the home page is the rendered content of the one
  post in Jekyll category `aktuell` (tarif590), inlined statically in
  `home.html.jinja` the way the Jekyll loop emitted it.
- `shortcodes/` is inherited from relax **only** to satisfy
  `accent validate`'s canonical-component contract; no page uses
  components (they must not sit inside raw HTML anyway).
- Known console note: jQuery 1.12's feature detection trips one harmless
  CSP "inline event handler" error at load. Nav collapse, scrollspy and
  the calculator all verified working under the generated CSP.
- Dropped deliberately: the hardcoded Google Analytics snippet (dead UA
  property) and the IE8 html5shiv conditional.

## 2. Edit & preview

```bash
accent serve            # https://127.0.0.1:3334 (hot reload; config.yaml is NOT hot-reloaded)
accent serve --no-tls   # plain http
```

## 3. Build & check

```bash
accent validate
accent build --clean --output "$PWD/public" --base-url https://www.praxkit.ch
accent serve-static --no-tls --dir "$PWD/public"   # preview at http://127.0.0.1:4403
```

The build writes `public/.htaccess` (clean URLs, `praxkit.ch` →
`www.praxkit.ch` 301, `ErrorDocument 404`, security headers, Cache-Control).
Edit `config.yaml`, never the file.

**Gotcha carried over from kapp.land:** a numeric component attribute is
written **without quotes** (`width=914`); `width="914"` fails
`accent validate` with "must be type of 'Number'" (filed as accentcms b459).
And never put a `{% … %}` component inside raw HTML — the build crashes.

## 4. Publish

### A) Automatic — push to `master`

One-time GitHub setup (*Settings → Secrets and variables → Actions*):

| Type | Name | Value |
|---|---|---|
| Secret | `FTP_HOST` | `ftp.netzone.ch` |
| Secret | `FTP_USER` | `artooa.ch1` |
| Secret | `FTP_PASSWORD` | the netzone password — **rotate it first**: the old `ftp_env.sh` kept it in plaintext in the working tree |
| Secret | `FTP_REMOTE_DIR` | `/` |
| Variable (optional) | `SITE_URL` | `https://www.praxkit.ch` (default) |
| Variable (optional) | `ACCENT_VERSION` | `v0.28.1` (default) |

### B) Manual

```bash
FTP_HOST=ftp.netzone.ch FTP_USER=artooa.ch1 FTP_REMOTE_DIR=/ scripts/deploy.sh
```

⚠️ Both paths mirror with `--delete`. The netzone web root still holds the
old Jekyll site (plus `amdg.php`, `contact.php`, `hello.php`, `test.php`);
the first deploy replaces all of it. The old Jekyll URLs
(`/news/2017/...`, `/aktuell/2017/...`, `/preise/`) keep working through
redirect stubs / clean-URL rewrites.

After a deploy:

```bash
curl -sI https://www.praxkit.ch/preise      # 200
curl -sI https://praxkit.ch/preise          # 301 → https://www.praxkit.ch/preise
curl -sI https://www.praxkit.ch/aktuell/2017/06/28/tarif590-formular-rechnung  # 200 (redirect stub)
curl -sI https://www.praxkit.ch/gibt-es-nicht   # 404
```

## 5. Decisions & deviations from kapp.land

- **Canonical host is `www.praxkit.ch`** (the spelling the old site used and
  Google indexed); kapp.land canonicalises to the apex.
- **Port 3334** for `accent serve` so both sites can run side by side.
- **No search UI**: the old site had none, so the theme renders none
  (Accent still emits `/_search/`, which is simply unlinked).
- **No dark mode, no new typography**: the design is the 2017 original.
  The site is a theme port, not a redesign.
