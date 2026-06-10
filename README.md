# SmallBiz - Premium React Website Template

A highly consistent, atomic-designed React template built for small businesses and agencies. This project focuses on **premium aesthetics**, **lightning-fast performance**, and a **DRY (Don't Repeat Yourself)** architecture.

---

## 🚀 Key Features

* **Atomic Design System:** Built from the ground up using a strict hierarchy of Atoms (Buttons, Typography), Blocks (Hero, Stats, Forms), and Pages.
* **Performance First:** Native code-splitting using `React.lazy` and `Suspense` for near-instant initial loads.
* **EmailJS Integration:** Fully functional contact form with "Sending" and "Success" states, managed via environment variables.
* **Consistent Styling:** Unified Tailwind CSS configuration using a custom @theme for centralized control over colors, fonts, and animations.
* **Production Ready:** Includes SEO-friendly routing, 404/500 error pages, a dynamic Cookie Consent banner, and a "Back to Top" utility.
* **Mobile Optimized:** Fully responsive navigation with a high-capacity mobile menu and optimized image components with skeletons.

---

## 🛠 Tech Stack

* **Framework:** [React 18+](https://react.dev/)
* **Build Tool:** [Vite](https://vitejs.dev/)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/)
* **Icons:** [Lucide React](https://lucide.dev/)
* **Routing:** [React Router v6](https://reactrouter.com/)
* **Email Engine:** [EmailJS](https://www.emailjs.com/)

---

## 📁 Project Structure

src/
├── components/
│   ├── blocks/         # High-level sections (Hero, FaqBlock, ContactBlock)
│   ├── layout/         # Persistent wrappers (Navbar, Footer, Layout)
│   └── ui/             # Atomic components (Button, Heading, Text, List)
├── lib/
│   └── utils.ts        # Tailwind merge helper (cn)
├── pages/              # Main view components
└── App.tsx             # Routing & Global state

---

## 🏁 Getting Started

### 1. Installation
Clone the repository and install dependencies:
npm install

### 2. Environment Variables
Create a .env file in the root directory and add your EmailJS credentials:
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key

### 3. Development
Run the local development server:
npm run dev

---

## 🎨 Consistency & Customization

### The Global Navigation
The Navbar and Footer share a single source of truth defined in src/components/layout/Layout.tsx. Adding a page to the globalNavLinks array will instantly update both the header and the 2-column footer grid.

### Legal Pages
All legal content (Privacy, Terms, Cookies) uses the LegalPage layout component. This ensures that text-heavy documents maintain perfect readability and consistent typography across the entire site.

### Extending UI
When creating new components, always use the atomic UI folder:
* Use <Heading> and <Text> instead of raw HTML tags to maintain brand typography.
* Use <Image /> for automatic skeleton loading and error fallback handling.
* Use <List> and <ListItem> for standardized spacing and icon alignment.

---

## 📦 Build for Production

To create an optimized production build:
npm run build

The output will be located in the dist/ folder, ready for deployment on platforms like Vercel, Netlify, or AWS.

---

## 📄 License
This template is provided "as-is" for small business development and agency use. Ensure you update the legal pages with specific local regulations before going live.