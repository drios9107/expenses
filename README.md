# Expenses

A modern expenses tracker built with Next.js, MUI, and React. This project helps manage everyday spending, visualize income vs expenses, and organize transactions with categories, currencies, multi-user support, and internationalization.

## Features

- Dashboard with charts, summaries, and transaction trends
- Expense and income management with categories and subcategories
- Currency support and exchange tracking
- Debt tracking and reminders
- Search and filtering by date, amount, description and category
- Multi-language support with `react-i18next`
- Responsive UI built with Material UI components
- Authentication support via `next-auth`

## Getting Started

### Install dependencies

```bash
npm install
```

### Run locally

```bash
npm run dev
```

Open `http://localhost:3000` in your browser to view the app.

### Build for production

```bash
npm run build
npm start
```

## Project Structure

- `app/` - Next.js App Router pages and layouts
- `src/components/` - UI components and feature modules
- `src/hooks/` - custom React hooks
- `src/contexts/` - React context providers
- `src/utils/` - helper utilities and API helpers
- `src/app/i18n/` - translation resources and language setup

## Scripts

- `npm run dev` - start development server
- `npm run build` - build production assets
- `npm run start` - start production server
- `npm run lint` - run Next.js lint checks

## Dependencies

Key dependencies used in this project:

- `next` 14
- `react` 18
- `@mui/material` and `@mui/icons-material`
- `react-hook-form` and `yup`
- `axios`
- `react-chartjs-2` / `chart.js`
- `next-auth`
- `react-i18next`

## Notes

This app is configured for modern Next.js development with the App Router and server-side rendering where appropriate. Customize `app/page.js` or the `src` components to extend features and update the UI.
