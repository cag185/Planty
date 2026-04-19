# Planty

The frontend web application for **Planty** — a plant tracking app that allows users to manage their personal plant collection, monitor plant health stats, and receive care notifications. Built with Nuxt 3 and Vue 3, and deployed to [Netlify](https://netlify.com).

---

## Tech Stack

| Package                                  | Purpose                                    |
| ---------------------------------------- | ------------------------------------------ |
| [Nuxt 3](https://nuxt.com/)              | Full-stack Vue framework (SSR/SSG/SPA)     |
| [Vue 3](https://vuejs.org/)              | UI component framework                     |
| [Pinia](https://pinia.vuejs.org/)        | Global state management                    |
| [Tailwind CSS](https://tailwindcss.com/) | Utility-first CSS styling                  |
| [PrimeVue](https://primevue.org/)        | UI component library (toast notifications) |
| [Lucide Vue Next](https://lucide.dev/)   | Icon library                               |
| [Vue Router](https://router.vuejs.org/)  | Client-side routing                        |

---

## Project Structure

```
Planty/
├── nuxt.config.ts              # Nuxt configuration, runtime config, modules
├── tailwind.config.js          # Tailwind theme with custom color tokens
├── package.json
├── .env                        # Local environment variables (not committed)
├── app/
│   ├── app.vue                 # Root app component (Navbar, NuxtPage, Toasts)
│   ├── pages/
│   │   ├── index.vue           # Landing page (Hero, Features, CTA)
│   │   ├── login.vue           # Login / sign-up page
│   │   ├── notifications.vue   # Notifications inbox
│   │   └── plants/
│   │       ├── index.vue       # Plant collection list
│   │       └── [id].vue        # Individual plant detail page
│   ├── components/
│   │   ├── Navbar.vue          # Top navigation bar with auth state
│   │   ├── Hero.vue            # Landing page hero section
│   │   ├── Features.vue        # Landing page features section
│   │   ├── CallToAction.vue    # Landing page CTA section
│   │   ├── Footer.vue          # Page footer
│   │   ├── Modal.vue           # Reusable modal wrapper
│   │   ├── AddPlantModal.vue   # Modal form for adding a new plant
│   │   ├── EditPlantModal.vue  # Modal form for editing a plant
│   │   └── ToastNotifications.vue  # PrimeVue toast notification renderer
│   ├── stores/
│   │   ├── auth.ts             # Auth store: user, token, login/signup/logout
│   │   ├── plants.ts           # Plants store: CRUD, API sync, watering mapping
│   │   └── notifications.ts    # Notifications store: add, dismiss, mark read
│   ├── composables/
│   │   └── useDemoNotifications.ts  # Demo notification scheduler (currently disabled)
│   ├── data/
│   │   └── demo-notifications.json  # Sample notification data for demo mode
│   └── plugins/
│       └── primevue-toast.ts   # Registers PrimeVue ToastService globally
└── server/
    └── api/
        └── plant-stats.get.ts  # Nuxt server route: returns randomised plant stat data
```

---

## Pages

| Route            | Description                                                                                    |
| ---------------- | ---------------------------------------------------------------------------------------------- |
| `/`              | Public landing page with Hero, Features, and Call to Action sections                           |
| `/login`         | Combined login and sign-up form, toggled by a mode switch                                      |
| `/plants`        | Authenticated plant collection — fetches plants from the API on mount                          |
| `/plants/:id`    | Individual plant detail — reads from the Pinia store, falls back to fetching if store is empty |
| `/notifications` | Inbox of autonomous and requirement-based plant notifications                                  |

---

## State Management (Pinia Stores)

### `auth.ts`

Manages the authenticated user session.

- `user` — the logged-in user object (`id`, `name`, `email`)
- `token` — JWT token used for API requests
- `login(email, password)` — POSTs to the API, stores user and token in `sessionStorage`
- `signup(name, email, password)` — registers, then auto-calls `login`
- `logout()` — clears user, token, sessionStorage, and calls `clearPlants()`
- `restoreSession()` — rehydrates user and token from `sessionStorage` on app load

### `plants.ts`

Manages the user's plant collection and syncs with the backend API.

- `fetchPlants()` — `GET /plants/user?user_id=:id` — loads all plants for the current user
- `addPlant(...)` — `POST /plants/` — creates a plant and adds it to the store
- `updatePlant(id, data)` — `PUT /plants/:id` — updates plant details in the API and store
- `removePlant(id)` — `DELETE /plants/:id` — deletes from the API and removes from the store
- `clearPlants()` — empties the store (called on logout)
- Watering frequency is stored in the API as an integer number of days, and mapped to/from human-readable labels (e.g. `7` ↔ `"Weekly"`) within the store

### `notifications.ts`

Manages in-app notifications.

- Two types: `autonomous` (system-triggered) and `requirement` (care actions needed)
- `addNotification(...)`, `dismiss(id)`, `acknowledge(id)`, `markCompleted(id)`, `clearAll()`, `markAllRead()`

---

## Authentication Flow

1. User signs up or logs in via `/login`
2. The API returns a JWT token and user info
3. Both are saved in `sessionStorage` and the Pinia auth store
4. All subsequent API requests include `Authorization: Bearer <token>`
5. On app load, `restoreSession()` rehydrates the auth state from `sessionStorage`
6. On logout, the store and `sessionStorage` are both cleared

---

## Environment Variables

Nuxt maps env vars to `runtimeConfig` automatically using the `NUXT_PUBLIC_` prefix convention. No code changes are needed to switch environments — just set the variable in your deployment platform.

| Variable                   | Maps to                           | Description                     |
| -------------------------- | --------------------------------- | ------------------------------- |
| `NUXT_PUBLIC_API_BASE_URL` | `runtimeConfig.public.apiBaseUrl` | Base URL of the Planty REST API |

**Local development** defaults to `http://localhost:8080` if the env var is not set (configured in `nuxt.config.ts`).

To override locally, create a `.env` file:

```env
NUXT_PUBLIC_API_BASE_URL=http://localhost:8080
```

---

## Running Locally

```bash
# Install dependencies
yarn install

# Start the development server
yarn dev
```

The app will run at `http://localhost:3000` by default.

```bash
# Build for production
yarn build

# Preview the production build
yarn preview
```

---

## Nuxt Server API

Planty includes a lightweight Nuxt server route for plant stats simulation:

| Method | Endpoint           | Description                                                                               |
| ------ | ------------------ | ----------------------------------------------------------------------------------------- |
| GET    | `/api/plant-stats` | Returns randomised sensor data (humidity, temp, soil moisture, light level, health score) |

This is a placeholder for future real sensor/IoT integration.

---

## Deployment

| Service             | Platform                       | URL                                            |
| ------------------- | ------------------------------ | ---------------------------------------------- |
| Frontend (this app) | [Netlify](https://netlify.com) | `https://plantyv1.netlify.app`                 |
| Backend API         | [Railway](https://railway.app) | `https://planty-api-production.up.railway.app` |
| Database            | Railway (MySQL)                | Managed by Railway, connected to the API       |

In Netlify's environment variable settings, set:

```
NUXT_PUBLIC_API_BASE_URL = https://planty-api-production.up.railway.app
```

Nuxt will automatically pick this up at build time and inject it into the client bundle.
