# Kyra Kennels

Static multi-page website for Kyra Kennels. The Home page also presents the full site as a single-page experience. There is no build system or package installation required.

## Publish to GitHub

Create an empty repository on GitHub, then run these commands from this folder. Replace `<your-account>` with your GitHub username or organization.

```powershell
git add .
git commit -m "Add Kyra Kennels website"
git remote add origin https://github.com/<your-account>/kyra-kennels.git
git push -u origin main
```

## Deploy with Cloudflare Pages

In Cloudflare, open **Workers & Pages**, create a **Pages** project, and connect the GitHub repository. Use these build settings:

- Production branch: `main`
- Framework preset: `None`
- Build command: `exit 0`
- Build output directory: `.`
- Root directory: leave blank

Cloudflare Pages will publish the static files from the repository root and redeploy when new commits are pushed to `main`.

The enquiry form is currently front-end only. Connect a form service or backend before relying on it to receive submissions.