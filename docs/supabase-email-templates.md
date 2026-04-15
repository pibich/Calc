# Supabase email templates (copy-paste)

Use **Dashboard → Authentication → Email Templates**. Set **Site URL** and **Redirect URLs** (include your live `profile.html` URL and local dev URL) under **URL Configuration** so links in emails work.

Supabase inserts these variables (do not remove them):

- `{{ .ConfirmationURL }}` — single-use link (confirm email or reset password)
- `{{ .Email }}` — recipient address
- `{{ .SiteURL }}` — project Site URL

---

## 1) Confirm signup (`Confirm signup`)

**Subject (English)**  
`Confirm your Pixel Worlds Tools account`

**Body (HTML)** — paste into the template editor:

```html
<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;background:#0f1419;color:#e8eef4;padding:24px 16px;">
  <tr>
    <td align="center">
      <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width:520px;background:#1a222c;border:1px solid #2e3a48;border-radius:12px;padding:28px 24px;text-align:left;">
        <tr>
          <td style="font-size:18px;font-weight:700;color:#5eead4;padding-bottom:12px;">Welcome to Pixel Worlds Tools</td>
        </tr>
        <tr>
          <td style="font-size:15px;line-height:1.55;color:#e8eef4;padding-bottom:16px;">
            Thanks for registering. Please confirm your email address so we know this account is really yours.
          </td>
        </tr>
        <tr>
          <td style="padding-bottom:20px;">
            <a href="{{ .ConfirmationURL }}" style="display:inline-block;background:#5eead4;color:#0f1419;font-weight:700;font-size:15px;text-decoration:none;padding:12px 22px;border-radius:10px;">Confirm email</a>
          </td>
        </tr>
        <tr>
          <td style="font-size:13px;line-height:1.5;color:#8a9aad;padding-bottom:12px;">
            If the button does not work, copy and paste this link into your browser:<br />
            <span style="word-break:break-all;color:#5eead4;">{{ .ConfirmationURL }}</span>
          </td>
        </tr>
        <tr>
          <td style="font-size:12px;line-height:1.45;color:#8a9aad;border-top:1px solid #2e3a48;padding-top:16px;">
            You received this because someone signed up at Pixel Worlds Tools using <strong>{{ .Email }}</strong>. If this was not you, you can ignore this message.
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
```

**Subject (Bahasa Indonesia, alternatif)**  
`Konfirmasi akun Pixel Worlds Tools`

**Body (HTML, Bahasa Indonesia)** — ganti isi template “Confirm signup” jika audiens utama Indonesia:

```html
<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;background:#0f1419;color:#e8eef4;padding:24px 16px;">
  <tr>
    <td align="center">
      <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width:520px;background:#1a222c;border:1px solid #2e3a48;border-radius:12px;padding:28px 24px;text-align:left;">
        <tr>
          <td style="font-size:18px;font-weight:700;color:#5eead4;padding-bottom:12px;">Selamat datang di Pixel Worlds Tools</td>
        </tr>
        <tr>
          <td style="font-size:15px;line-height:1.55;color:#e8eef4;padding-bottom:16px;">
            Terima kasih sudah mendaftar. Konfirmasi alamat email kamu agar kami tahu akun ini memang milikmu.
          </td>
        </tr>
        <tr>
          <td style="padding-bottom:20px;">
            <a href="{{ .ConfirmationURL }}" style="display:inline-block;background:#5eead4;color:#0f1419;font-weight:700;font-size:15px;text-decoration:none;padding:12px 22px;border-radius:10px;">Konfirmasi email</a>
          </td>
        </tr>
        <tr>
          <td style="font-size:13px;line-height:1.5;color:#8a9aad;padding-bottom:12px;">
            Jika tombol tidak bisa diklik, salin tautan ini ke peramban:<br />
            <span style="word-break:break-all;color:#5eead4;">{{ .ConfirmationURL }}</span>
          </td>
        </tr>
        <tr>
          <td style="font-size:12px;line-height:1.45;color:#8a9aad;border-top:1px solid #2e3a48;padding-top:16px;">
            Email ini dikirim karena ada pendaftaran di Pixel Worlds Tools menggunakan <strong>{{ .Email }}</strong>. Jika bukan kamu, abaikan saja pesan ini.
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
```

---

## 2) Reset password (`Reset password` / recovery)

**Subject (English)**  
`Reset your Pixel Worlds Tools password`

**Body (HTML)**:

```html
<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;background:#0f1419;color:#e8eef4;padding:24px 16px;">
  <tr>
    <td align="center">
      <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width:520px;background:#1a222c;border:1px solid #2e3a48;border-radius:12px;padding:28px 24px;text-align:left;">
        <tr>
          <td style="font-size:18px;font-weight:700;color:#5eead4;padding-bottom:12px;">Password reset requested</td>
        </tr>
        <tr>
          <td style="font-size:15px;line-height:1.55;color:#e8eef4;padding-bottom:16px;">
            We received a request to reset the password for <strong>{{ .Email }}</strong>. Use the button below to open the site and choose a new password. This link expires after a short time for your security.
          </td>
        </tr>
        <tr>
          <td style="padding-bottom:20px;">
            <a href="{{ .ConfirmationURL }}" style="display:inline-block;background:#5eead4;color:#0f1419;font-weight:700;font-size:15px;text-decoration:none;padding:12px 22px;border-radius:10px;">Reset password</a>
          </td>
        </tr>
        <tr>
          <td style="font-size:13px;line-height:1.5;color:#8a9aad;padding-bottom:12px;">
            If you did not ask for a reset, you can ignore this email. Your password will stay the same.<br /><br />
            Link (copy-paste):<br />
            <span style="word-break:break-all;color:#5eead4;">{{ .ConfirmationURL }}</span>
          </td>
        </tr>
        <tr>
          <td style="font-size:12px;line-height:1.45;color:#8a9aad;border-top:1px solid #2e3a48;padding-top:16px;">
            Sent by Pixel Worlds Tools. For security, never share this link with anyone.
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
```

**Subject (Bahasa Indonesia)**  
`Atur ulang password Pixel Worlds Tools`

**Body (HTML, Bahasa Indonesia)**:

```html
<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;background:#0f1419;color:#e8eef4;padding:24px 16px;">
  <tr>
    <td align="center">
      <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width:520px;background:#1a222c;border:1px solid #2e3a48;border-radius:12px;padding:28px 24px;text-align:left;">
        <tr>
          <td style="font-size:18px;font-weight:700;color:#5eead4;padding-bottom:12px;">Permintaan reset password</td>
        </tr>
        <tr>
          <td style="font-size:15px;line-height:1.55;color:#e8eef4;padding-bottom:16px;">
            Ada permintaan untuk mengatur ulang password akun <strong>{{ .Email }}</strong>. Gunakan tombol di bawah untuk membuka situs dan memilih password baru. Tautan ini akan kedaluwarsa dalam waktu singkat demi keamanan.
          </td>
        </tr>
        <tr>
          <td style="padding-bottom:20px;">
            <a href="{{ .ConfirmationURL }}" style="display:inline-block;background:#5eead4;color:#0f1419;font-weight:700;font-size:15px;text-decoration:none;padding:12px 22px;border-radius:10px;">Reset password</a>
          </td>
        </tr>
        <tr>
          <td style="font-size:13px;line-height:1.5;color:#8a9aad;padding-bottom:12px;">
            Jika kamu tidak meminta reset, abaikan email ini. Password tetap seperti semula.<br /><br />
            Tautan (salin-tempel):<br />
            <span style="word-break:break-all;color:#5eead4;">{{ .ConfirmationURL }}</span>
          </td>
        </tr>
        <tr>
          <td style="font-size:12px;line-height:1.45;color:#8a9aad;border-top:1px solid #2e3a48;padding-top:16px;">
            Dikirim oleh Pixel Worlds Tools. Demi keamanan, jangan bagikan tautan ini kepada siapa pun.
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
```

---

## Catatan

- Setelah mengubah template, kirim uji coba dari halaman **Profil** (daftar / lupa password) dan periksa folder spam.
- `profile.html` memproses tautan reset (hash `type=recovery`) dan menampilkan form **Password baru**; pastikan **Redirect URLs** mencakup URL persis ke `profile.html` (termasuk `http://localhost:…` bila develop lokal).
