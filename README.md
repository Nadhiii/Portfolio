# Portfolio Website

A modern, responsive portfolio website built with React, Vite, and Tailwind CSS. Features smooth animations, dark mode support, and comprehensive analytics tracking.

## 🚀 Live Demo

[View Live Portfolio](https://your-portfolio-url.com) _(Update with your actual URL)_

## ✨ Features

- **Modern Design**: Clean, professional interface with dark/light mode toggle
- **Responsive**: Optimized for all devices and screen sizes
- **Smooth Animations**: Framer Motion powered transitions and interactions
- **Performance Optimized**: Lazy loading, code splitting, and image optimization
- **Analytics Ready**: Google Analytics 4 and GTM integration
- **Contact Form**: EmailJS integration for seamless communication
- **Project Showcase**: Interactive gallery with lightbox for project screenshots

## 🛠️ Tech Stack

- **Frontend**: React 19, Vite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Routing**: React Router
- **Analytics**: Google Analytics 4, Google Tag Manager
- **Email**: EmailJS
- **Icons**: Lucide React
- **Image Gallery**: React Slick, FSLightbox

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Nadhiii/Portfolio.git
   cd Portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   VITE_EMAILJS_SERVICE_ID=your_service_id
   VITE_EMAILJS_TEMPLATE_ID=your_template_id
   VITE_EMAILJS_PUBLIC_KEY=your_public_key
   VITE_GA_MEASUREMENT_ID=your_ga_id
   VITE_GTM_ID=your_gtm_id
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── About.jsx
│   ├── Contact.jsx
│   ├── Header.jsx
│   ├── Hero.jsx
│   ├── Projects.jsx
│   └── Skills.jsx
├── pages/              # Page components
│   ├── HomePage.jsx
│   ├── PlutoPage.jsx
│   └── NotFoundPage.jsx
├── assets/             # Images and static files
├── utils/              # Utility functions
│   └── analytics.js
└── App.jsx             # Main application component
```

## 🎨 Customization

### Updating Content
- **Personal Info**: Edit `src/components/Hero.jsx` and `src/components/About.jsx`
- **Projects**: Update `src/components/Projects.jsx` with your projects
- **Skills**: Modify `src/components/Skills.jsx` with your skills
- **Contact**: Update contact information in `src/components/Contact.jsx`

### Styling
- **Colors**: Update `tailwind.config.js` for custom color schemes
- **Fonts**: Modify font settings in `tailwind.config.js`
- **Animations**: Customize animations in component files using Framer Motion

## 📊 Analytics Setup

1. **Google Analytics 4**
   - Create a GA4 property
   - Add your Measurement ID to `.env`

2. **Google Tag Manager**
   - Set up a GTM container
   - Add your GTM ID to `.env`

3. **EmailJS**
   - Create an EmailJS account
   - Set up email service and template
   - Add credentials to `.env`

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm run build
npx vercel
```

### Netlify
```bash
npm run build
# Upload dist folder to Netlify
```

### GitHub Pages
```bash
npm run build
# Deploy dist folder to gh-pages branch
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📧 Contact

**Your Name** - [your.email@example.com](mailto:your.email@example.com)

Project Link: [https://github.com/Nadhiii/Portfolio](https://github.com/Nadhiii/Portfolio)

## 🙏 Acknowledgments

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Lucide Icons](https://lucide.dev/)

---

⭐ Star this repository if it helped you build your own portfolio!
