# Pixel Worlds Tools

Fan-made static site: mining/fishing gem calculators, in-game guides, clan recruitment posts (Supabase), and account login.

## Project layout

| Path | Purpose |
|------|---------|
| `index.html` | Redirects to `mining.html` |
| `mining.html`, `fishing.html`, `guide.html` | Main calculators and guide |
| `recruit.html` | Clan recruitment board |
| `profile.html` | Login / register (Supabase Auth) |
| `css/` | Stylesheets (`styles.css`) |
| `js/` | Scripts (`app.js`, `i18n.js`, `mining.js`, `fishing.js`, `guide.js`, `auth.js`, `recruit.js`, `supabase-config.js`) |
| `assets/` | Images and icons |
| `docs/` | `SUPABASE_SETUP.md` and `supabase-schema.sql` |
| `404.html` | Not found page |
| `netlify.toml` | Deploy / cache headers (optional) |

## Supabase

See **`docs/SUPABASE_SETUP.md`**. Run **`docs/supabase-schema.sql`** in the Supabase SQL editor, then fill **`js/supabase-config.js`**.
