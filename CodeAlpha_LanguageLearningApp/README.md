# CodeAlpha_LanguageLearningApp 🌍

> **LinguaVibe** — An interactive multi-language learning platform and practice testing suite built for the **CodeAlpha App Development Internship**.

![CodeAlpha Badge](https://img.shields.io/badge/CodeAlpha-App%20Development%20Internship-4f46e5?style=for-the-badge)
![Task](https://img.shields.io/badge/Task%204-Language%20Learning%20App-06b6d4?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Completed%20%26%20Enhanced-10b981?style=for-the-badge)

---

## 📌 Project Overview & Task Specifications

This application fulfills and exceeds all requirements defined under **TASK 4: Language Learning App**:

- ✅ **Learn New Words, Phrases & Sentences**: Comprehensive curriculum covering practical phrases, phonetic guides, and example sentences in a selected target language.
- ✅ **Daily Lessons & Flashcards with Translations and Pronunciations**: Interactive flashcard player with phonetic guidance and native speech synthesis audio pronunciations.
- ✅ **Practice Quizzes & Progress Testing**: Multiple practice test formats to assess vocabulary retention and auditory comprehension.
- ✅ **Clean and Intuitive Categorized UI**: Structured categories covering *Greetings & Basics*, *Travel & Directions*, *Food & Dining*, and *Grammar Essentials*.
- ✅ **Local Learning Data Storage**: XP, daily streak, unlocked achievement badges, and mastered vocabulary persist automatically in browser `localStorage`.

---

## 🌟 Outstanding & Unique Features (Bonus)

1. **Multi-Language Switcher**:
   - 🇪🇸 Spanish (*Español*)
   - 🇫🇷 French (*Français*)
   - 🇩🇪 German (*Deutsch*)
   - 🇯🇵 Japanese (*日本語 - Kanji, Hiragana & Romaji*)
2. **Native Web Speech API with Accent Synthesis**:
   - Pronounces words in native localized accents (`es-ES`, `fr-FR`, `de-DE`, `ja-JP`).
   - Includes a **Slow Audio toggle** (`0.65x` speed) for beginners to hear syllable pronunciation clearly.
3. **Triple Practice Testing Suite**:
   - **Multiple Choice Quiz**: Rapid 4-option challenge with instant feedback.
   - **Word Match Game**: Interactive dual-column pairing game linking foreign words to English meanings.
   - **Listening Comprehension**: Pure audio-based quiz where the user listens to the spoken phrase before selecting the answer.
4. **Duolingo-Style Gamification Engine**:
   - Earn **XP Points** for every completed flashcard and quiz victory.
   - Level progression (`Novice Lvl 1` up to `Polyglot Lvl 5`).
   - Daily streak tracker.
   - Unlockable Achievement Badges (*First Words*, *Quiz Ace*, *Polyglot Apprentice*, *Listening Champion*, *100 XP Club*).
5. **Interactive Word Bank & Dictionary**:
   - Searchable index of all vocabulary with one-click instant audio playback.

---

## 🛠️ Tech Stack

- **HTML5**: Semantic tags, ARIA attributes, responsive layouts.
- **CSS3**: Custom Variables, Glassmorphism, CSS Grid, Flexbox, Micro-interactions.
- **JavaScript (ES6+)**: OOP Architecture, Web Speech API (`SpeechSynthesisUtterance`), LocalStorage API.

---

## 🚀 How to Run Locally

1. **Clone the repository**:
   ```bash
   git clone https://github.com/YourUsername/CodeAlpha_LanguageLearningApp.git
   cd CodeAlpha_LanguageLearningApp
   ```
2. **Open `index.html`** in any modern web browser or start a local server:
   ```bash
   python -m http.server 8080
   ```
3. Visit [http://localhost:8080](http://localhost:8080).

---

## 📁 Repository Structure

```
CodeAlpha_LanguageLearningApp/
├── index.html       # Primary application layout, quizzes & tabs
├── style.css        # Responsive styling, quiz states & animations
├── app.js           # Multi-language database, Web Speech engine & quizzes
└── README.md        # Comprehensive documentation
```

---

## 🎥 LinkedIn Video Explanation Template

> **Pleased to present my project completed as an App Development Intern at @CodeAlpha!** 🌍
>
> 💡 I developed **LinguaVibe** (Task 4: Language Learning App). Key features developed beyond the baseline requirements include:
> - Multi-language support (Spanish, French, German, Japanese) with accent-accurate Web Speech API audio
> - 3 distinct quiz styles: Multiple Choice, Word Match Pairing, and Auditory Listening tests
> - Duolingo-inspired gamification with XP points, streak tracker, and unlockable achievement badges
> - Comprehensive searchable dictionary with 1-click audio playback
>
> 📂 GitHub Repository: [Link to your repo]
>
> #CodeAlpha #AppDevelopment #JavaScript #CSS3 #HTML5 #EdTech #Internship

