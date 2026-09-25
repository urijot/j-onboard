# J-Onboard

English | [日本語](README.ja.md)

A web app that guides exchange students and visiting researchers staying in Japan for more than 3 months through the procedures they face, from receiving their visa documents to settling into daily life after arrival. Enter your role (student or researcher), your housing situation and whether you might work part-time, and the app builds a setup roadmap for you: a task list organized by phase.

🔗 Live app: [https://j-onboard.vercel.app/](https://j-onboard.vercel.app/)

## Features

- **Profile form**: asks for your role (Exchange Student / Visiting Researcher / Other or Not Sure), whether your housing is arranged, and whether you might work part-time. People who choose "Other / Not Sure" are pointed to the office that sponsored their visa
- **Roadmap by phase**:
  - Before Arrival (receiving the Certificate of Eligibility, applying for a visa, etc.)
  - At the Airport (receiving the Residence Card, applying for a work permit, etc.)
  - At City Hall (moving-in notification, National Health Insurance, National Pension, etc.). Users without settled housing can't mark this phase done until they have an address
  - Living Setup (SIM, bank account, etc.)
- Each task shows where to go, what to bring, why it matters, a Japanese phrase to show at the counter (with an English translation), and a link to the official source with the month it was last checked
- Badges mark each task as required or recommended. The moving-in notification shows its legal deadline: within 14 days of moving in
- The next task to do is shown at the top of the screen, and a warning appears when a task that must come first is still unfinished
- Switches between English and Japanese, including the task content
- Answers and progress are stored on your device only (no account, nothing sent to a server)

## Tech stack

- [React](https://react.dev/) (built with [Vite](https://vite.dev/))
- [Tailwind CSS](https://tailwindcss.com/)
- [lucide-react](https://lucide.dev/) (icons)
- [Vitest](https://vitest.dev/) + Testing Library (tests)

## Setup

```bash
npm install
```

## Commands

### `npm start`

Runs the app in development mode.\
Open [http://localhost:3000](http://localhost:3000) in your browser.

Changes are reflected automatically when you save a file.

### `npm test`

Runs the tests once.

### `npm run build`

Builds the app for production into the `dist` folder. Run `npm run preview` to check the build locally.
