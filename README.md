# Hackerslord Portfolio

The personal portfolio of Isaiah Katakyie Boadi — a Math student, photographer, and creative developer turning data into cinematic stories and bespoke websites.

This repository houses the source code for my portfolio, built with a focus on high-end editorial aesthetics, fluid motion, and clean architecture.

## 🚀 Tech Stack

- **Framework:** [Next.js 16 (App Router)](https://nextjs.org/)
- **Language:** TypeScript
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Database & Storage:** [Firebase](https://firebase.google.com/)
- **Deployment:** [Vercel](https://vercel.com/)

## 💻 Local Development

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/yourusername/hackerslord-portfolio.git](https://github.com/yourusername/hackerslord-portfolio.git)
   cd hackerslord-portfolio

2. **Install dependencies:**
    ```bash
    npm install

3. **Environment Setup:**
Create a .env.local file in the root directory and add your Firebase configuration:
NEXT_PUBLIC_FIREBASE_API_KEY="your_api_key"
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="your_auth_domain"
NEXT_PUBLIC_FIREBASE_PROJECT_ID="your_project_id"
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="your_storage_bucket"
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="your_messaging_sender_id"
NEXT_PUBLIC_FIREBASE_APP_ID="your_app_id"

4. **Run the development server:**

    ```bash
    npm run dev
Open http://localhost:3000 with your browser to see the result.

## 🎨 Design Philosophy
The UI relies heavily on high-contrast typography (Playfair Display and Inter) and subtle Framer Motion interactions to create a bespoke, non-generic experience, fully supporting both Light and Dark modes at the DOM level.