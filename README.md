# VocabToeic — Frontend

<div align="center">

![VocabToeic Banner](https://img.shields.io/badge/VocabToeic-TOEIC%20Learning%20Platform-0F2744?style=for-the-badge&logoColor=white)

**Nền tảng học từ vựng và luyện thi TOEIC thông minh, tích hợp Claude AI**

[![React](https://img.shields.io/badge/React-18.3-61DAFB?style=flat-square&logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-3178C6?style=flat-square&logo=typescript)](https://typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?style=flat-square&logo=vite)](https://vitejs.dev)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-v4-06B6D4?style=flat-square&logo=tailwindcss)](https://tailwindcss.com)
[![shadcn/ui](https://img.shields.io/badge/shadcn/ui-Radix-000000?style=flat-square)](https://ui.shadcn.com)

[Demo](#) · [Tài liệu](#) · [Báo lỗi](#)

</div>

---

## Tổng quan

VocabToeic là web application giúp người dùng **học từ vựng TOEIC hiệu quả** thông qua thuật toán Spaced Repetition (SM-2) và **luyện đề Reading & Listening** với bài tập được sinh tự động bởi Claude AI. Toàn bộ giải thích đáp án bằng tiếng Việt chi tiết.

```
Học từ vựng → SRS Review → Luyện bài AI → Theo dõi tiến độ
```

---

## Tính năng chính

| Tính năng         | Mô tả                                                       |
| ----------------- | ----------------------------------------------------------- |
| **SRS Flashcard** | Thuật toán SM-2, 4 mức đánh giá, offline sync               |
| **AI Exercise**   | Claude API sinh bài Part 5/6/7, giải thích tiếng Việt       |
| **Listening**     | Part 1–4, audio player, replay limit, transcript reveal     |
| **Dashboard**     | Streak calendar, donut chart, score line chart              |
| **Auth**          | JWT + Refresh Token rotation, 3-step register, Google OAuth |
| **Dark mode**     | Zustand persist, CSS variables, seamless toggle             |

---

## Tech Stack

### Core

- **React 18** + **TypeScript** — strict mode, no `any`
- **Vite 5** — HMR, path alias `@/`, optimized build
- **React Router v6** — lazy loading, nested routes, route guards

### State & Data

- **Zustand** — auth store (memory, no localStorage), theme store, SRS offline queue
- **TanStack Query v5** — server state, cache, background refetch, retry logic
- **Axios** — instance với queue interceptor tránh race condition refresh token

### UI & Styling

- **Tailwind CSS v4** — `@theme` config, CSS variables, dark mode
- **shadcn/ui** (Radix) — Form, Dialog, Toast, Card...
- **Lucide React** — icon system
- **Recharts** — dashboard charts

### Form & Validation

- **React Hook Form** + **Zod** — schema-first validation, step-by-step trigger
- Multi-step register với sessionStorage persist (encrypt/decrypt)

### Auth

- Access Token trong **memory** (Zustand)
- Refresh Token trong **HttpOnly Cookie**
- **Queue pattern** interceptor — tránh multiple refresh calls song song

---

## Kiến trúc project

```
src/
├── assets/
│   ├── icons/
│   └── images/
├── components/
│   ├── common/                # Shared components: Sidebar, StepCircle, ThemeToggle...
│   ├── landing/               # Landing page sections: Hero, Features, Header,
├── features/                  # Feature-based modules
│   ├── auth/
│   ├── vocabulary/            # Flashcard, SRS, WordList
│   ├── exercise/              # Part 5/6/7 Reading
│   ├── listening/             # Part 1–4 Listening
│   └── dashboard/             # Charts, Streak, Stats
├── configs/                   # Axios instance
├── data/                      # Static data, content config
├── stores/                    # Zustand stores
│   ├── global/                # authStore, themeStore (persist)
│   └── sessions/              # authSessionStore (sessionStorage)
├── hooks/                     # useDebounce, useTimer, useSpeech, useCountdown
├── services/                  # API service calls
├── messages/                  # Error/success message constants
├── pages/                     # Route-level page components
├── layouts/                   # MainLayout, AuthLayout, ExamLayout
├── lib/                       # axios, queryClient, utils, constants
└── utils/                     # Helper functions: encrypt, dateDiff, normalizeError...
├── router/                    # Routes + ProtectedRoute + GuestRoute
│   ├── guards/                # ProtectedRoute, GuestRoute, LazyLoading
│   └── routes/                # authRoutes, learningRoutes, index
└── types/                     # Domain types, API types
```

---

## Kỹ thuật xử lí FE

### 1. Axios Interceptor — Queue Pattern

Xử lý race condition khi nhiều request cùng nhận 401 và đồng loạt gọi refresh token:

```ts
// Request A, B, C đều 401 cùng lúc
// → Chỉ 1 lần gọi /refresh
// → A, B, C đều được retry sau khi có token mới
```

### 2. Multi-step Form với Session Persist

Register form 3 bước, dữ liệu được **encrypt** và lưu sessionStorage — không mất khi reload:

```ts
// Lưu: encrypt → sessionStorage
// Đọc: sessionStorage → decrypt → form.reset()
// Không lưu password, confirm vào storage
```

### 3. SRS Offline Sync

Khi mất mạng, kết quả review được queue trong Zustand persist:

```ts
// Offline → addReview() vào pendingReviews[]
// Online  → tự động sync batch lên server
```

### 4. SM-2 Algorithm — Frontend Preview

Tính toán `NextReviewAt` ngay lập tức ở frontend (optimistic update) trước khi server confirm.

---

## Cài đặt & Chạy

```bash
# Clone repo
git clone https://github.com/vyngochi/ToeicUp.git

# Cài dependencies
npm install

# Setup env
cp .env.example .env

# Chạy dev
npm run dev
```

---

## Scripts

```bash
npm run dev          # Dev server tại localhost:5173
npm run build        # Production build
npm run lint         # ESLint check
npm run lint:fix     # ESLint auto fix
npm run format       # Prettier format
```

---

## Lộ trình phát triển

- [x] Project setup — Vite, Tailwind v4, shadcn/ui, Router, Zustand
- [x] Authentication — Login, Register 3-step, Forgot Password
- [ ] Vocabulary — Flashcard, SRS Review, Word List
- [ ] Exercise — Part 5/6/7 Reading, AI generate
- [ ] Listening — Part 1–4, Audio Player
- [ ] Dashboard — Charts, Streak Calendar, Statistics
- [ ] Dark mode — Full support
- [ ] PWA — Offline support

---

## Tác giả

**Ngô Chí Vỹ** — Frontend Developer

[![GitHub](https://img.shields.io/badge/GitHub-@vyngochi-181717?style=flat-square&logo=github)](https://github.com/vyngochi)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Vỹ-0A66C2?style=flat-square&logo=linkedin)](https://www.linkedin.com/in/vyngochi)

---

## Đồng tác giả

**Phan Văn Giữ** — Backend Developer

[![GitHub](https://img.shields.io/badge/GitHub-@Phanvangiu-181717?style=flat-square&logo=github)](https://github.com/Phanvangiu)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Giữ-0A66C2?style=flat-square&logo=linkedin)](https://www.linkedin.com/in/giuphanvan)

---

<div align="center">

Made with ❤️ in Vietnam · Stack: React + TypeScript + Vite + Tailwind v4 + shadcn/ui

</div>
