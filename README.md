# senalsiriwardana.co.uk

Personal portfolio site for Senal Siriwardana. Plain HTML, CSS and a little JavaScript. There is no framework and no build step: what is in this folder is what gets served.

## Files

| File | What it is |
|---|---|
| `index.html` | The whole home page. Each section is marked with a comment such as `2. ABOUT`. |
| `config.js` | Your name, email, LinkedIn and GitHub links, in one place. |
| `styles.css` | All styling. Colours for both themes are at the top under "Tokens". |
| `theme.js`, `main.js` | Light/dark mode and filling in the contact links. |
| `privacy.html`, `thank-you.html`, `404.html` | Privacy note, page shown after the form is sent, and the not-found page. |
| `assets/img/` | Photo (two sizes), social sharing image, touch icon. |
| `assets/fonts/` | Fraunces (headings) and Work Sans (body), self-hosted. Both are under the SIL Open Font License. |
| `netlify.toml` | Netlify settings and security headers. |
| `robots.txt`, `sitemap.xml`, `favicon.svg` | Search engine and browser basics. |

## Editing content

- **Text:** open `index.html`, find the section comment, and edit the text between the tags. Search for `[PLACEHOLDER` to find everything still to fill in, and `PLACEHOLDER LINK` for the project links.
- **Contact details:** edit `config.js`. The same values are also written into the HTML as a fallback for visitors without JavaScript, so search the project for the old value and replace it there too.
- **Colours:** edit the values under "Tokens" in `styles.css`. The dark values appear twice (once for the toggle, once for visitors without JavaScript), so change both. Check new text and background pairs for contrast (4.5:1 or better) with a tool such as https://webaim.org/resources/contrastchecker/.
- **Photo:** replace `assets/img/senal-640.jpg` (640 x 640) and `assets/img/senal-320.jpg` (320 x 320) with square JPEGs of the same sizes, and update the `alt` text in `index.html`.
- **Adding a project:** copy one `<li>...</li>` block inside `<ul class="cards">` in `index.html`.

Or ask Claude: open this folder in Claude Code and describe the change.

## Previewing locally

```
python3 -m http.server 8000
```

Then open http://localhost:8000. The contact form only works once the site is on Netlify.

## Deploying to Netlify

1. Push this folder to GitHub (repo `senals/portfolio`).
2. In Netlify: **Add new site > Import an existing project**, choose GitHub and pick the repo.
3. Leave the build command empty. The publish directory is `.` (already set in `netlify.toml`). Deploy.
4. Every push to `main` now redeploys the site.

### Contact form

Netlify finds the form automatically on deploy. After the first deploy:

1. In Netlify go to **Forms** and check that a form called `contact` is listed. If form detection is off, enable it and redeploy.
2. Under **Forms > Form notifications**, add an email notification to your address.
3. Send a test message from the live site and check it arrives.

The free plan includes a monthly allowance of form submissions. The honeypot field (`bot-field`) filters basic spam.

### Analytics (GoatCounter)

1. Create a free site at https://www.goatcounter.com and note your code.
2. In `index.html`, find the `ANALYTICS` comment in the `<head>`, replace `YOURCODE`, and remove the comment markers around the `<script>` tag.
3. The privacy note already describes GoatCounter. If you decide not to use analytics, delete the "Analytics" section from `privacy.html`.

## Connecting the Porkbun domain

1. In Netlify: **Domain management > Add a domain**, enter `senalsiriwardana.co.uk`, and also add `www.senalsiriwardana.co.uk`.
2. In Porkbun: open the domain's **DNS records** and delete any default records for the root and `www` (Porkbun adds parking records).
3. Add the records Netlify shows you. At the time of writing these are:
   - `ALIAS` record, host blank, answer `apex-loadbalancer.netlify.com`
   - `CNAME` record, host `www`, answer `<your-site-name>.netlify.app`

   Use the values Netlify displays if they differ.
4. Wait for DNS to update (often minutes, sometimes a few hours). Netlify then issues a free HTTPS certificate automatically and redirects HTTP to HTTPS.
5. In Netlify, set `senalsiriwardana.co.uk` as the primary domain so `www` redirects to it.

## After launch

- Share the link in a LinkedIn post preview to check the sharing image appears.
- Submit `https://senalsiriwardana.co.uk/sitemap.xml` in Google Search Console if you want to be indexed sooner.
- Update `lastmod` in `sitemap.xml` and the date in `privacy.html` when those pages change.
