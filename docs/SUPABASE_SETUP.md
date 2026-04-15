# Supabase Setup (Auth + Profiles)

## 1) Create a Supabase project
- Go to [Supabase](https://supabase.com/), create a new project.
- Wait until database provisioning finishes.

## 2) Configure authentication
- Open `Authentication` -> `Providers` and ensure `Email` provider is enabled.
- In `Authentication` -> `URL Configuration`, set:
  - `Site URL`: your app URL (for local test, use `http://localhost:5500` or your local server URL).
  - Under **Redirect URLs**, add every origin you use, including the full URL to **`profile.html`** (examples: `https://yourdomain.com/profile.html`, `http://127.0.0.1:5500/profile.html`). The app sends **email confirmation** and **password reset** links to that page (`emailRedirectTo` / `resetPasswordForEmail`).
- Optional but recommended: under **Email Templates**, replace the default bodies with the polished HTML in **`docs/supabase-email-templates.md`** (confirm signup + reset password, English or Indonesian).

## 3) Create required table + policies
- Open `SQL Editor`.
- Run all SQL from **`docs/supabase-schema.sql`** (includes `profiles` and **`clan_recruitment_posts`** for the Clan recruitment page).
- If you already ran an older version of this file, open `docs/supabase-schema.sql` and run only the new section from `-- Clan recruitment posts` downward.

## 4) Fill frontend config
- Open `js/supabase-config.js`.
- Replace:
  - `url` with your Supabase project URL.
  - `anonKey` with your Supabase anon public key.

## 5) Test flow
- Start your local web server.
- Open `profile.html` (tab **Profil** / **Profile** on the home page).
- Register account (name, email, password).
- Login with email/password.
- Logout and login again to confirm session persistence.
- Open `recruit.html` (tab **Clan**). While logged in, publish a recruitment post; confirm it appears in the list. Use the toggle **Still recruiting** / off (= **FULL**) and **Remove post** as the owner.
- On **Profile**: use **Forgot password?** → enter email → confirm the generic success message; open the reset link from email → set a new password on `profile.html`. While logged in, use **Change password** with two matching fields (min. 8 characters) and confirm you stay signed in.

## Notes
- `anonKey` is safe for frontend usage. Keep `service_role` key secret and never put it in client-side code.
- If email confirmation is enabled, user needs to verify email before successful login.

## Security checklist (important)
- **Row Level Security**: After running `docs/supabase-schema.sql`, confirm in the Supabase Table Editor that RLS is **enabled** on `profiles` and `clan_recruitment_posts`. All access for anonymous/authenticated users must go through the policies in that file — never disable RLS on these tables in production.
- **Auth settings** (Dashboard → Authentication → Providers / Policies): use a **minimum password length** of at least **8** (match the signup form). Enable **email confirmation** for production if you can. Turn on **breached / leaked password protection** if your plan supports it.
- **URLs**: Under Authentication → URL Configuration, set **Site URL** and **Redirect URLs** to your real domain only (no wildcards you do not trust).
- **Keys**: Only the **anon** key belongs in `js/supabase-config.js`. Rotate keys in the dashboard if a **service_role** key or other secret was ever exposed.
- **Hosting**: This repo’s `netlify.toml` sends basic security headers (`X-Frame-Options`, `X-Content-Type-Options`, etc.). If you deploy elsewhere, mirror those headers.
- **XSS**: Posting clan data uses safe DOM APIs (`textContent`). Keep it that way if you change the recruit UI; never inject untrusted database fields with `innerHTML`.
