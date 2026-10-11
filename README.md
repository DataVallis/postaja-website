# postaja-website

Prodajna stran za **Postajo** — [postaja.eu](https://postaja.eu). Next.js 16 (App Router), Tailwind 4, next-intl.
Privzeti jezik je slovenščina (`/`), angleščina je na `/en`.

Aplikacija (portal) je v ločenem repoju [`DataVallis/postaja`](https://github.com/DataVallis/postaja); stran nanjo
kaže z gumbom »Prijava v portal« (`NEXT_PUBLIC_APP_URL`).

## Zagon

```bash
pnpm install
pnpm dev          # http://localhost:3000
pnpm test         # vitest
pnpm typecheck && pnpm lint && pnpm build
```

## Kje je kaj

| Kaj | Kje |
|---|---|
| Cene, paketi, krediti, podatki podjetja, domena | `src/site.ts` |
| Vsa besedila (SL / EN, enaki ključi — test to preverja) | `messages/sl.json`, `messages/en.json` |
| Razdelki strani | `src/components/*` |
| Obrazec »Brezplačen vzorec« → e-pošta lastniku | `src/app/actions.ts`, `src/server/lead.ts` |
| Pravni strani | `/pogoji`, `/zasebnost` (besedila v messages pod `legal`) |
| Slika za deljenje povezave | `src/app/[locale]/opengraph-image.tsx` |

### Številke, ki jih dopolni lastnik

V `src/site.ts`:

- `caseStudy.stats` — minute na dan, % objav brez popravka, objave na mesec, strošek na objavo. Polje z `null` se
  na strani ne prikaže (nobenih izmišljenih številk).
- `founding.left` — koliko ustanovnih mest je še prostih; `null` skrije števec.

## Obrazec

Prošnja za vzorec pride na `LEAD_TO` po SMTP (iste spremenljivke kot aplikacija). Naslednji korak je v aplikaciji:
`/admin/demos` → Ustvari demo s spletno stranjo stranke. Zaščita: skrito polje proti botom in 5 prošenj na uro na IP.
Brez nastavljenega SMTP obrazec vrne napako z e-naslovom za kontakt — nikoli tiho ne zavrže prošnje.

## Objava

Docker (`output: standalone`) + Kamal 2 na Hetzner strežniku 91.99.191.8, enako kot aplikacija: host nginx naredi TLS in
posreduje na kamal-proxy (`127.0.0.1:8080`), ki usmerja po imenu gostitelja. Push na `main` objavi stran
(`.github/workflows/deploy.yml`, okolje GitHub **production**).

1. DNS: `postaja.eu` in `www.postaja.eu` → 91.99.191.8.
2. Na strežniku: `ops/nginx/postaja.eu.conf` + `certbot --nginx -d postaja.eu -d www.postaja.eu`.
3. GitHub → Settings → Environments → **production**:
   - Variables: `DEPLOY_HOST`, `SMTP_USER`, `EMAIL_FROM`, `LEAD_TO`
   - Secrets: `SMTP_PASSWORD`, `DEPLOY_SSH_KEY`, `SSH_KNOWN_HOSTS`
4. Actions → Deploy → Run workflow z »setup« (prvič), nato vsak push na `main`.

Ročno iz svojega računalnika: izvozi iste spremenljivke + `KAMAL_REGISTRY_USERNAME` / `KAMAL_REGISTRY_PASSWORD`
(GitHub token z `write:packages`) in zaženi `kamal setup` (prvič) ali `kamal deploy`.
