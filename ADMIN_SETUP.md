# Sasti Collection — Admin Setup (Decap CMS)

You can manage all products at **`https://your-site.vercel.app/admin`** without touching code.
Edits commit to GitHub, Vercel auto-redeploys, and the live site updates in 1–2 minutes.

---

## ⚙️ One-time setup (do this once)

### 1. Push the project to GitHub
In Lovable, top-right → **GitHub → Connect → Create Repository**.

### 2. Deploy to Vercel
- Go to [vercel.com](https://vercel.com), sign in with GitHub.
- **Add New → Project → Import** your repo.
- Framework: **Vite**. Click **Deploy**. (Free Hobby plan is fine.)

### 3. Connect Decap Bridge (free OAuth login)
This is what lets you log into `/admin` with your GitHub account.

1. Go to **[decapbridge.com](https://decapbridge.com)** → **Sign up free**.
2. **Add a site** → choose **GitHub** → authorize → pick your repo.
3. Decap Bridge will give you a **Site ID** (looks like `abc123-xyz`).

### 4. Update `public/admin/config.yml` with your details
Open `public/admin/config.yml` and change **two lines**:

```yaml
backend:
  name: github
  repo: YOUR-GITHUB-USERNAME/YOUR-REPO-NAME    # ← change this
  branch: main
  base_url: https://auth.decapbridge.com
  auth_endpoint: sites/YOUR-SITE-ID/auth        # ← change YOUR-SITE-ID
```

Commit & push. Vercel redeploys automatically.

### 5. Done — log in!
Visit `https://your-site.vercel.app/admin` → **Login with GitHub** → manage products. ✨

---

## ✏️ Daily use

- **Edit a product** → change price, photo, mark out of stock → **Publish** → live in ~1 min.
- **Add a product** → top right **New Product** → fill fields → **Publish**.
- **Delete a product** → open it → trash icon.
- **Sale price** → fill the "Sale Price" field; original price shows struck-through.
- **Out of stock** → toggle the switch; product fades and "Order on WhatsApp" disappears.
- **Reorder** → use the "Display order" number (lower = shown first).

All changes go through your GitHub repo, so you have full version history and can roll anything back.

---

## 🆘 Troubleshooting

- **"404" on `/admin`** → Vercel hadn't redeployed yet. Wait 1 min and refresh.
- **"Config Errors"** → check `repo:` and `auth_endpoint:` values in `public/admin/config.yml`.
- **Login loops** → in Decap Bridge dashboard, make sure your Vercel URL is in the allowed sites list.
- **Image doesn't update** → hard refresh (Ctrl+Shift+R). Vercel caches aggressively.
