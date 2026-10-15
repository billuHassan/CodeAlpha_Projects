# CodeAlpha_FlashcardQuizApp ⚡

> **BrainSpark Flashcards** — An interactive, accessible, and high-performance flashcard quiz application built for the **CodeAlpha App Development Internship**.

![CodeAlpha Badge](https://img.shields.io/badge/CodeAlpha-App%20Development%20Internship-4f46e5?style=for-the-badge)
![Task](https://img.shields.io/badge/Task%201-Flashcard%20Quiz%20App-0ea5e9?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Completed%20%26%20Enhanced-10b981?style=for-the-badge)

---

## 📌 Project Overview & Task Specifications

This application fulfills and exceeds all requirements defined under **TASK 1: Flashcard Quiz App**:

- ✅ **Front and Back Card Faces**: Distinct Question (front) and Answer (back) with interactive "Show Answer" / "Flip" action.
- ✅ **Card Navigation**: Intuitive "Next" and "Previous" buttons with real-time card indicators (e.g. *Card 3 / 10*).
- ✅ **Full Customization**: Ability to add new flashcards, edit existing cards on the fly, and delete obsolete cards.
- ✅ **Simple & Clean UI**: Minimalist, glassmorphism-inspired dark mode interface with accessible contrast and fluid micro-animations.

---

## 🌟 Outstanding & Unique Features (Bonus)

To deliver an exceptional user experience, this version includes advanced features beyond the standard requirements:

1. **Dual Modes (Study Mode vs. Quiz Challenge)**:
   - **Study Mode**: Freely explore cards, flip at your own pace, and view explanations.
   - **Quiz Challenge**: Timed challenge with instant self-assessment ("Mastered!" vs. "Need Practice"), culminating in an end-of-quiz score summary report with accuracy percentage and time elapsed.
2. **3D Card Flip Animation**: Smooth CSS 3D perspective transitions (`transform: rotateY(180deg)`) for a realistic physical card sensation.
3. **Category / Deck Management**: Pre-loaded decks for *Web Development*, *Data Structures & Algorithms*, and *Spanish Vocabulary*, plus ability to add custom decks.
4. **Text-to-Speech (TTS) Engine**: Integrated Web Speech API to read aloud both questions and answers with natural pronunciation.
5. **Local Storage Persistence**: Flashcards and custom decks persist across browser sessions automatically.
6. **Deck Backup & Migration (Export / Import JSON)**: Export your entire deck collection to a single `.json` file and import decks across devices.
7. **Keyboard Shortcuts Support**:
   - `Spacebar`: Flip card / Show Answer
   - `→` (Right Arrow): Next card
   - `←` (Left Arrow): Previous card
   - `1` / `D`: Need Practice (in Quiz Mode)
   - `2` / `K`: Mastered (in Quiz Mode)
8. **Live Search & Deck Filter**: Rapidly search questions or answers inside the card management dialog.
9. **Card Shuffling**: One-click Fisher-Yates deck shuffle for randomized spaced repetition.

---

## 🛠️ Tech Stack

- **HTML5**: Semantic, accessible markup (ARIA attributes, keyboard navigation).
- **CSS3**: Modern CSS Variables, Flexbox, CSS Grid, 3D Transforms (`perspective`, `transform-style: preserve-3d`), Glassmorphism.
- **JavaScript (ES6+)**: Object-Oriented clean architecture, zero third-party framework overhead, Web Speech API, LocalStorage API, File API.
- **Icons**: FontAwesome 6 (CDN with clean unicode fallbacks).

---

## 🚀 How to Run Locally

No build tools or Node.js runtime required! The project runs immediately in any modern web browser.

1. **Clone the repository**:
   ```bash
   git clone https://github.com/YourUsername/CodeAlpha_FlashcardQuizApp.git
   cd CodeAlpha_FlashcardQuizApp
   ```
2. **Open `index.html`**:
   - Double-click `index.html`, or
   - Use VS Code Live Server, or
   - Run a quick Python local server:
     ```bash
     python -m http.server 8080
     ```
   - Open [http://localhost:8080](http://localhost:8080) in your browser.

---

## 📁 Repository Structure

```
CodeAlpha_FlashcardQuizApp/
├── index.html       # Primary application layout and modal markup
├── style.css        # Responsive styling, animations & theme definitions
├── app.js           # Flashcard state engine, quiz controller, audio & storage
└── README.md        # Comprehensive documentation
```

---

## 🎥 LinkedIn Video Explanation Template

When publishing your project on LinkedIn as required by the internship instructions:

> **Excited to share my latest project as an App Development Intern at @CodeAlpha!** 🚀
>
> 💡 I developed **BrainSpark Flashcards** (Task 1: Flashcard Quiz App). Beyond the core requirements of flip cards and CRUD management, I enhanced the app with:
> - Dual Study & Quiz Challenge modes with real-time accuracy scoring
> - Web Speech API text-to-speech for interactive audio pronunciation
> - LocalStorage persistence and JSON Deck Import/Export
> - Realistic 3D card flip animations and keyboard shortcuts
>
> 📂 GitHub Repository: [Link to your repo]
> 
> #CodeAlpha #AppDevelopment #WebDevelopment #JavaScript #CSS3 #HTML5 #Internship

