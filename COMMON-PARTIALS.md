# Partielles de navigation & pied de page — référence de maintenance

## Pourquoi ce fichier existe

`index.html`, `shop.html` et les 4 pages produit (`products/*.html`) contiennent
chacune une copie intégrale du header (`<header class="site-header">…</header>`) et
du footer (`<footer class="site-footer">…</footer>`). Pour un site statique sans
build toolchain (pas de PHP, EJS, Nunjucks, etc.), il n'existe pas d'inclusion
automatique ; toute modification commune doit être reportée manuellement sur chaque
fichier. Ce dossier sert de source de vérité unique pour éviter la dérive.

## Comment utiliser ce fichier

1. Quand vous souhaitez modifier le menu, les liens ou le logo : écrivez d'abord
   le nouveau bloc dans cette documentation sous la section appropriée.
2. Copiez-collez ensuite le bloc modifié dans les 6 fichiers HTML :
   - `index.html` ligne 31–67 (header) / ligne 424–467 (footer)
   - `shop.html` ligne 66–103 (header) / ligne 286–329 (footer)
   - `products/book-club-tee.html` ligne 63–100 (header) / ligne 256–299 (footer)
   - `products/christmas-boss.html` ligne 63–100 (header) / ligne 256–299 (footer)
   - `products/christmas-mama.html` ligne 63–100 (header) / ligne 256–299 (footer)
   - `products/gothic-black-cat-tee.html` ligne 63–100 (header) / ligne 256–299 (footer)
   - `contact.html` — page autonome avec son propre header/footer intégrée
3. Vérifiez que les liens relatifs sont corrects pour chaque page (les pages
   produit utilisent `../` pour remonter au niveau racine).

---

## Header — état actuel (à recopier tel quel si modifié ailleurs)

```html
<header class="site-header">
  <div class="wrap">
    <div class="header-inner">
      <a class="brand" href="[RACE]" aria-label="OlivyraStudio home">
        <span class="brand-mark" aria-hidden="true">O</span>
        <span>
          <span class="brand-name">OlivyraStudio</span>
          <span class="brand-sub">Digital designs &amp; bookish goods</span>
        </span>
      </a>

      <nav class="site-nav" aria-label="Main navigation">
        <a href="[SHOP]">Shop</a>
        <a href="[SHOP]?category=digital">Digital designs</a>
        <a href="[SHOP]?category=apparel">Apparel</a>
        <a href="[CONTACT]">Contact</a>
        <a href="[INDEX]#about">About</a>
        <a href="[INDEX]#faq">FAQ</a>
        <a class="btn btn--sm" href="https://www.etsy.com/shop/OlivyraStudio" target="_blank" rel="noopener">Shop on Etsy
          <svg class="od-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17 17 7"/><path d="M8 7h9v9"/></svg>
        </a>
      </nav>

      <div class="header-actions">
        <button class="menu-toggle" type="button" id="nav-toggle" aria-expanded="false" aria-controls="mobile-nav">Menu</button>
      </div>
    </div>

    <nav class="mobile-nav" id="mobile-nav" aria-label="Mobile navigation" hidden>
      <ul>
        <li><a href="[SHOP]">Shop</a></li>
        <li><a href="[SHOP]?category=digital">Digital designs</a></li>
        <li><a href="[SHOP]?category=apparel">Apparel</a></li>
        <li><a href="[CONTACT]">Contact</a></li>
        <li><a href="[INDEX]#about">About</a></li>
        <li><a href="[INDEX]#faq">FAQ</a></li>
        <li><a class="btn" href="https://www.etsy.com/shop/OlivyraStudio" target="_blank" rel="noopener">Shop on Etsy</a></li>
      </ul>
    </nav>
  </div>
</header>
```

**Raccourcis de chemin selon la page :**

| Page | `[BASE]` (href du logo) | `[SHOP]` | `[INDEX]` | `[CONTACT]` |
|------|--------------------------|----------|-----------|-------------|
| `index.html` | `#top` | `shop.html` | — | `contact.html` |
| `shop.html` | `index.html` | `shop.html` | `index.html` | `contact.html` |
| `products/*.html` | `../index.html` | `../shop.html` | `../index.html` | `../contact.html` |
| `contact.html` | `index.html` | `shop.html` | `index.html` | — |

La page `index.html` utilise `#top` comme ancres du logo (scroll-to-top). Les autres
pages pointent vers `index.html`.

---

## Footer — état actuel (à recopier tel quel si modifié ailleurs)

```html
<footer class="site-footer">
  <div class="wrap">
    <div class="footer-grid">
      <div class="footer-brand">
        <a class="brand" href="[BASE]" aria-label="OlivyraStudio home">
          <span class="brand-mark" aria-hidden="true">O</span>
          <span>
            <span class="brand-name">OlivyraStudio</span>
            <span class="brand-sub">Digital designs &amp; bookish goods</span>
          </span>
        </a>
        <p>Playful digital artwork and bookish apparel, made in small batches and fulfilled through Etsy.</p>
      </div>
      <div class="footer-col">
        <h3>Shop</h3>
        <ul>
          <li><a href="[SHOP]">All pieces</a></li>
          <li><a href="[SHOP]?category=digital">Digital designs</a></li>
          <li><a href="[SHOP]?category=apparel">Apparel</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h3>Help</h3>
        <ul>
          <li><a href="[INDEX]#faq">FAQ</a></li>
          <li><a href="[INDEX]#faq">Downloads</a></li>
          <li><a href="[INDEX]#faq">Sizing &amp; care</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h3>Studio</h3>
        <ul>
          <li><a href="[INDEX]#about">About</a></li>
          <li><a href="[CONTACT]">Contact</a></li>
          <li><a href="https://www.etsy.com/shop/OlivyraStudio" target="_blank" rel="noopener">Etsy shop</a></li>
          <li><a href="https://www.etsy.com/shop/OlivyraStudio" target="_blank" rel="noopener">Contact via Etsy</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <span>© 2026 OlivyraStudio. All rights reserved.</span>
      <span>Checkout, downloads and fulfillment handled by <a href="https://www.etsy.com/shop/OlivyraStudio" target="_blank" rel="noopener">Etsy</a>.</span>
    </div>
  </div>
</footer>
```

Les mêmes règles de chemin s'appliquent qu'au header.

---

## Changement futur recommandé

Si le catalogue évolue (ajout/suppression de pages produit, nouveaux menus),
envisager le passage à un générateur de site statique (Eleventy, Hugo) ou à des
partials PHP (`<?php include 'header.php'; ?>`). Cela transformerait ces copies en
inclusions automatiques. Voir `DESIGN-MANIFEST.json` et `DESIGN-HANDOFF.md` pour
le contexte projet.
