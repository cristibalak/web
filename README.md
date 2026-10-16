# romteca.eu

Built by GitHub Pages with Jekyll. Every page shares one header, footer and stylesheet,
so a change to any of them shows up on all pages.

## Where things live

| What | File |
|---|---|
| Header (logo, menu, Quick links) | `_includes/header.html` |
| Menu items | `_data/nav.yml` |
| Quick links labels | `_data/quicklinks.yml` |
| Footer | `_includes/footer.html` |
| `<head>` (fonts, favicon, stylesheet) | `_includes/head.html` |
| Page skeleton | `_layouts/default.html` |
| All styles | `assets/css/site.css` |
| Scripts for every page | `assets/js/site.js` |
| Homepage sections | `_includes/sections/*.html` |
| Homepage | `index.html` |
| SAP page | `sap/index.html` |

## Adding a page

Create `<name>/index.html`; it is served at `romteca.eu/<name>/`:

```html
---
layout: default
title: Romteca for Automotive
description: One line for search results
logo_tag: Automotive          # optional label next to the logo
cta_text: Talk to an engineer # optional header button text
cta_href: /#contact           # optional header button link
---
<section class="hero">…page content…</section>

{% include sections/talent.html %}
{% include sections/contact.html tag="Questions?" title="Write to <em>us.</em>" email="ask@romteca.eu" %}
```

Any homepage section can be reused with `{% include sections/<name>.html %}`.
The contact block takes `id`, `tag`, `title`, `text` (or `text=false`) and `email`.
To list the page in Quick links, add it to `_data/quicklinks.yml`.

## Preview locally

`jekyll build` then serve `_site/`, or `jekyll serve`.
