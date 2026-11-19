# Semester-wise AIML Curriculum PWA

A small, dependency-free installable web app for browsing the provided eight-semester course and credit structure. It includes semester tabs, course search, semester totals, an install prompt where supported, a web app manifest, and offline caching.

## Publish with GitHub Pages

This is a static site and is ready for GitHub Pages. Keep all files in the repository root (or use the `/docs` folder if that is your Pages source). No build step or package installation is required.

1. Create a GitHub repository and add these files to its root.
2. In the repository, open **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Select the branch (usually `main`) and folder `/(root)`, then save.
5. Wait for the Pages deployment and open the URL shown in the Pages settings.

The app uses relative paths for its manifest, icon, and service worker, so it works both at a project URL such as `https://<owner>.github.io/<repository>/` and at a user-site root. Pages serves over HTTPS, enabling installation and offline caching. After updating files, allow the service worker to refresh its cached version; if an old version remains, clear the site data or unregister its service worker in browser developer tools.

## Run locally

Service workers require a secure context. From this folder, run a local server, for example:

```sh
python3 -m http.server 8000
```

Open <http://localhost:8000>. The install option appears when supported by the browser.

The two courses listed with credit `M` are preserved as supplied and excluded from the numeric total of 164.
