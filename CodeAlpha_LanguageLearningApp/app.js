/**
 * LinguaVibe - Advanced Interactive Language Learning Engine
 * CodeAlpha Internship Task 4
 */

const LANGUAGE_DATA = {
  es: {
    name: "Spanish",
    locale: "es-ES",
    flag: "🇪🇸",
    words: [
      {
        id: "es-1",
        term: "¡Hola!",
        phonetic: "[OH-lah]",
        translation: "Hello!",
        category: "basics",
        sentence: "¡Hola! ¿Cómo estás hoy?",
        sentenceEn: "Hello! How are you today?"
      },
      {
        id: "es-2",
        term: "Por favor",
        phonetic: "[por fah-VOR]",
        translation: "Please",
        category: "basics",
        sentence: "Un café con leche, por favor.",
        sentenceEn: "A coffee with milk, please."
      },
      {
        id: "es-3",
        term: "Muchas gracias",
        phonetic: "[MOO-chahs GRAH-syahs]",
        translation: "Thank you very much",
        category: "basics",
        sentence: "Muchas gracias por tu ayuda.",
        sentenceEn: "Thank you very much for your help."
      },
      {
        id: "es-4",
        term: "¿Dónde está la estación?",
        phonetic: "[DON-deh eh-STAH lah eh-stah-SYON]",
        translation: "Where is the station?",
        category: "travel",
        sentence: "Disculpe, ¿dónde está la estación de tren?",
        sentenceEn: "Excuse me, where is the train station?"
      },
      {
        id: "es-5",
        term: "El billete de avión",
        phonetic: "[el bee-YEH-teh deh ah-VYON]",
        translation: "The plane ticket",
        category: "travel",
        sentence: "Tengo mi billete de avión listo.",
        sentenceEn: "I have my plane ticket ready."
      },
      {
        id: "es-6",
        term: "La cuenta, por favor",
        phonetic: "[lah KWEN-tah, por fah-VOR]",
        translation: "The bill/check, please",
        category: "food",
        sentence: "¿Nos trae la cuenta, por favor?",
        sentenceEn: "Could you bring us the bill, please?"
      },
      {
        id: "es-7",
        term: "Delicioso",
        phonetic: "[deh-lee-SYOH-soh]",
        translation: "Delicious",
        category: "food",
        sentence: "Esta comida tradicional es muy deliciosa.",
        sentenceEn: "This traditional food is very delicious."
      },
      {
        id: "es-8",
        term: "Ser y Estar",
        phonetic: "[SEHR ee eh-STAR]",
        translation: "To Be (Permanent vs Temporary)",
        category: "grammar",
        sentence: "Yo soy estudiante, y estoy feliz.",
        sentenceEn: "I am a student (ser), and I am happy (estar)."
      }
    ]
  },
  fr: {
    name: "French",
    locale: "fr-FR",
    flag: "🇫🇷",
    words: [
      {
        id: "fr-1",
        term: "Bonjour",
        phonetic: "[bohn-ZHOOR]",
        translation: "Hello / Good morning",
        category: "basics",
        sentence: "Bonjour tout le monde !",
        sentenceEn: "Hello everyone!"
      },
      {
        id: "fr-2",
        term: "S'il vous plaît",
        phonetic: "[seel voo PLEH]",
        translation: "Please (formal)",
        category: "basics",
        sentence: "Un croissant chaud, s'il vous plaît.",
        sentenceEn: "A warm croissant, please."
      },
      {
        id: "fr-3",
        term: "Merci beaucoup",
        phonetic: "[mehr-SEE boh-KOO]",
        translation: "Thank you very much",
        category: "basics",
        sentence: "Merci beaucoup pour cette belle opportunité.",
        sentenceEn: "Thank you very much for this wonderful opportunity."
      },
      {
        id: "fr-4",
        term: "Où se trouve l'hôtel ?",
        phonetic: "[oo suh TROOV loh-TEL]",
        translation: "Where is the hotel located?",
        category: "travel",
        sentence: "Pardon monsieur, où se trouve l'hôtel de ville ?",
        sentenceEn: "Excuse me sir, where is city hall located?"
      },
      {
        id: "fr-5",
        term: "Bon appétit",
        phonetic: "[bohn ah-pay-TEE]",
        translation: "Enjoy your meal",
        category: "food",
        sentence: "Le dîner est servi, bon appétit !",
        sentenceEn: "Dinner is served, enjoy your meal!"
      },
      {
        id: "fr-6",
        term: "Le Passé Composé",
        phonetic: "[luh pah-SAY kohm-poh-ZAY]",
        translation: "The Compound Past Tense",
        category: "grammar",
        sentence: "J'ai visité Paris la semaine dernière.",
        sentenceEn: "I visited Paris last week."
      }
    ]
  },
  de: {
    name: "German",
    locale: "de-DE",
    flag: "🇩🇪",
    words: [
      {
        id: "de-1",
        term: "Guten Tag",
        phonetic: "[GOO-ten TAHK]",
        translation: "Good day / Hello",
        category: "basics",
        sentence: "Guten Tag, wie geht es Ihnen?",
        sentenceEn: "Good day, how are you?"
      },
      {
        id: "de-2",
        term: "Bitte schön",
        phonetic: "[BIT-teh SHOEN]",
        translation: "You're welcome / Please",
        category: "basics",
        sentence: "Bitte schön, hier ist Ihr Kaffee.",
        sentenceEn: "Here you go, here is your coffee."
      },
      {
        id: "de-3",
        term: "Vielen Dank",
        phonetic: "[FEE-len DAHNK]",
        translation: "Thank you very much",
        category: "basics",
        sentence: "Vielen Dank für Ihre freundliche Unterstützung.",
        sentenceEn: "Thank you very much for your kind support."
      },
      {
        id: "de-4",
        term: "Der Hauptbahnhof",
        phonetic: "[dehr HOWPT-bahn-hohf]",
        translation: "The central railway station",
        category: "travel",
        sentence: "Der Zug fährt vom Hauptbahnhof ab.",
        sentenceEn: "The train departs from the central station."
      },
      {
        id: "de-5",
        term: "Guten Appetit",
        phonetic: "[GOO-ten ah-peh-TEET]",
        translation: "Enjoy your meal",
        category: "food",
        sentence: "Das Essen schmeckt wunderbar, guten Appetit!",
        sentenceEn: "The food tastes wonderful, enjoy your meal!"
      },
      {
        id: "de-6",
        term: "Der, Die, Das",
        phonetic: "[dehr, dee, dahs]",
        translation: "Definite Articles (Masc, Fem, Neut)",
        category: "grammar",
        sentence: "Der Mann, die Frau, und das Kind.",
        sentenceEn: "The man (masc), the woman (fem), and the child (neut)."
      }
    ]
  },
  ja: {
    name: "Japanese",
    locale: "ja-JP",
    flag: "🇯🇵",
    words: [
      {
        id: "ja-1",
        term: "こんにちは (Konnichiwa)",
        phonetic: "[kohn-nee-chee-wah]",
        translation: "Hello / Good afternoon",
        category: "basics",
        sentence: "こんにちは、お元気ですか？",
        sentenceEn: "Hello, how are you?"
      },
      {
        id: "ja-2",
        term: "ありがとうございます (Arigatou gozaimasu)",
        phonetic: "[ah-ree-GAH-toh goh-ZAI-mahs]",
        translation: "Thank you very much",
        category: "basics",
        sentence: "いつも手伝ってくれて、ありがとうございます。",
        sentenceEn: "Thank you very much for always helping me."
      },
      {
        id: "ja-3",
        term: "駅はどこですか？ (Eki wa doko desu ka?)",
        phonetic: "[EH-kee wah DOH-koh des kah]",
        translation: "Where is the train station?",
        category: "travel",
        sentence: "すみません、東京駅はどこですか？",
        sentenceEn: "Excuse me, where is Tokyo station?"
      },
      {
        id: "ja-4",
        term: "いただきます (Itadakimasu)",
        phonetic: "[ee-tah-dah-KEE-mahs]",
        translation: "I humbly receive (Before eating)",
        category: "food",
        sentence: "美味しそうならーめんですね、いただきます！",
        sentenceEn: "This ramen looks delicious, let's eat!"
      },
      {
        id: "ja-5",
        term: "です / ではありません (Desu / Dewa arimasen)",
        phonetic: "[des / deh-wah ah-ree-mah-sen]",
        translation: "To be / Is not (Polite Copula)",
        category: "grammar",
        sentence: "私は学生です。先生ではありません。",
        sentenceEn: "I am a student. I am not a teacher."
      }
    ]
  }
};

const ACHIEVEMENTS_DATA = [
  { id: "first-step", title: "First Words", desc: "Complete your very first lesson card", icon: "fa-seedling" },
  { id: "quiz-ace", title: "Quiz Ace", desc: "Score 100% on any practice test", icon: "fa-bullseye" },
  { id: "polyglot", title: "Polyglot Apprentice", desc: "Explore lessons across 2 different languages", icon: "fa-globe" },
  { id: "audio-master", title: "Listening Champion", desc: "Complete an audio listening comprehension quiz", icon: "fa-headphones" },
  { id: "century-club", title: "100 XP Milestone", desc: "Reach 100 total experience points", icon: "fa-crown" }
];

class LanguageApp {
  constructor() {
    this.storageKey = "codealpha_lingua_user";
    this.currentLang = "es";
    this.currentCategory = "all";
    this.activeTab = "lessons";
    this.activeQuizType = "mcq";
    this.lessonIndex = 0;
    this.slowAudio = false;

    // User profile state
    this.userData = this.loadUserData();

    // Quiz state
    this.mcqState = {
      index: 0,
      score: 0,
      pool: [],
      answered: false
    };

    // Matching state
    this.matchingState = {
      selectedForeign: null,
      selectedEnglish: null,
      matchedCount: 0,
      pairs: []
    };

    this.cacheDOM();
    this.bindEvents();
    this.updateUserUI();
    this.renderLessons();
    this.renderDictionary();
    this.initMcqQuiz();
  }

  loadUserData() {
    try {
      const saved = localStorage.getItem(this.storageKey);
      if (saved) return JSON.parse(saved);
    } catch (e) {}

    return {
      xp: 240,
      streak: 3,
      languagesExplored: ["es"],
      unlockedBadges: ["first-step", "century-club"]
    };
  }

  saveUserData() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.userData));
    } catch (e) {}
  }

  addXP(points) {
    this.userData.xp += points;
    if (this.userData.xp >= 100 && !this.userData.unlockedBadges.includes("century-club")) {
      this.unlockBadge("century-club");
    }
    this.saveUserData();
    this.updateUserUI();
  }

  unlockBadge(badgeId) {
    if (!this.userData.unlockedBadges.includes(badgeId)) {
      this.userData.unlockedBadges.push(badgeId);
      this.saveUserData();
      const badge = ACHIEVEMENTS_DATA.find(b => b.id === badgeId);
      if (badge) {
        this.showToast(`🏆 Badge Unlocked: ${badge.title}!`);
      }
    }
  }

  updateUserUI() {
    const xp = this.userData.xp;
    const level = Math.floor(xp / 100) + 1;

    this.xpDisplay.textContent = xp;
    this.levelDisplay.textContent = `Lvl ${level}`;
    this.streakDisplay.textContent = this.userData.streak;
  }

  cacheDOM() {
    // Header
    this.langSelect = document.getElementById("langSelect");
    this.streakDisplay = document.getElementById("streakDisplay");
    this.xpDisplay = document.getElementById("xpDisplay");
    this.levelDisplay = document.getElementById("levelDisplay");
    this.achievementsBtn = document.getElementById("achievementsBtn");

    // Nav Tabs & Category Bar
    this.navTabs = document.querySelectorAll(".nav-tab");
    this.tabPanels = document.querySelectorAll(".tab-panel");
    this.categoryBar = document.getElementById("categoryBar");

    // Lessons Tab
    this.lessonCounter = document.getElementById("lessonCounter");
    this.lessonProgressBar = document.getElementById("lessonProgressBar");
    this.slowAudioBtn = document.getElementById("slowAudioBtn");
    this.slowAudioStatus = document.getElementById("slowAudioStatus");

    this.cardCategory = document.getElementById("cardCategory");
    this.cardSpeakBtn = document.getElementById("cardSpeakBtn");
    this.cardTargetWord = document.getElementById("cardTargetWord");
    this.cardPhonetic = document.getElementById("cardPhonetic");
    this.cardTranslation = document.getElementById("cardTranslation");
    this.cardTargetSentence = document.getElementById("cardTargetSentence");
    this.cardEnglishSentence = document.getElementById("cardEnglishSentence");

    this.lessonPrevBtn = document.getElementById("lessonPrevBtn");
    this.lessonNextBtn = document.getElementById("lessonNextBtn");
    this.lessonMarkLearnedBtn = document.getElementById("lessonMarkLearnedBtn");

    // Quizzes Tab
    this.quizTypeBtns = document.querySelectorAll(".quiz-type-btn");
    this.quizMcqContainer = document.getElementById("quizMcqContainer");
    this.quizMatchingContainer = document.getElementById("quizMatchingContainer");

    // MCQ Elements
    this.mcqProgress = document.getElementById("mcqProgress");
    this.mcqScore = document.getElementById("mcqScore");
    this.audioListeningPrompt = document.getElementById("audioListeningPrompt");
    this.playQuizAudioBtn = document.getElementById("playQuizAudioBtn");
    this.quizInstruction = document.getElementById("quizInstruction");
    this.quizTargetWord = document.getElementById("quizTargetWord");
    this.mcqOptionsGrid = document.getElementById("mcqOptionsGrid");
    this.quizFeedbackBar = document.getElementById("quizFeedbackBar");
    this.quizFeedbackMessage = document.getElementById("quizFeedbackMessage");
    this.quizNextBtn = document.getElementById("quizNextBtn");

    // Matching Elements
    this.matchScore = document.getElementById("matchScore");
    this.matchColForeign = document.getElementById("matchColForeign");
    this.matchColEnglish = document.getElementById("matchColEnglish");
    this.resetMatchingBtn = document.getElementById("resetMatchingBtn");

    // Dictionary Tab
    this.dictSearchInput = document.getElementById("dictSearchInput");
    this.dictCount = document.getElementById("dictCount");
    this.dictionaryWordGrid = document.getElementById("dictionaryWordGrid");

    // Modals
    this.achievementsModal = document.getElementById("achievementsModal");
    this.achievementsList = document.getElementById("achievementsList");
    this.victoryModal = document.getElementById("victoryModal");
    this.victoryXp = document.getElementById("victoryXp");
    this.victorySubtitle = document.getElementById("victorySubtitle");

    this.langToast = document.getElementById("langToast");
  }

  bindEvents() {
    // Language switch
    this.langSelect.addEventListener("change", (e) => {
      this.currentLang = e.target.value;
      if (!this.userData.languagesExplored.includes(this.currentLang)) {
        this.userData.languagesExplored.push(this.currentLang);
        if (this.userData.languagesExplored.length >= 2) {
          this.unlockBadge("polyglot");
        }
        this.saveUserData();
      }

      this.lessonIndex = 0;
      this.renderLessons();
      this.renderDictionary();
      this.initMcqQuiz();
      if (this.activeQuizType === "matching") this.initMatchingQuiz();
      this.showToast(`Switched to ${LANGUAGE_DATA[this.currentLang].name}!`);
    });

    // Nav Tabs
    this.navTabs.forEach(tab => {
      tab.addEventListener("click", () => {
        this.navTabs.forEach(t => t.classList.remove("active"));
        this.tabPanels.forEach(p => p.classList.remove("active"));
        tab.classList.add("active");
        const targetTab = tab.dataset.tab;
        document.getElementById(`tab${targetTab.charAt(0).toUpperCase() + targetTab.slice(1)}`).classList.add("active");
        this.activeTab = targetTab;

        if (targetTab === "quizzes") {
          this.initMcqQuiz();
        }
      });
    });

    // Category Filter
    this.categoryBar.addEventListener("click", (e) => {
      const pill = e.target.closest(".cat-pill");
      if (!pill) return;
      this.categoryBar.querySelectorAll(".cat-pill").forEach(p => p.classList.remove("active"));
      pill.classList.add("active");
      this.currentCategory = pill.dataset.cat;
      this.lessonIndex = 0;
      this.renderLessons();
      this.renderDictionary();
    });

    // Lessons Audio & Controls
    this.cardSpeakBtn.addEventListener("click", () => {
      const card = this.getCurrentLessonCard();
      if (card) this.speak(card.term);
    });

    this.slowAudioBtn.addEventListener("click", () => {
      this.slowAudio = !this.slowAudio;
      this.slowAudioStatus.textContent = this.slowAudio ? "On" : "Off";
      this.slowAudioBtn.style.borderColor = this.slowAudio ? "var(--secondary)" : "var(--border)";
    });

    this.lessonPrevBtn.addEventListener("click", () => this.prevLesson());
    this.lessonNextBtn.addEventListener("click", () => this.nextLesson());
    this.lessonMarkLearnedBtn.addEventListener("click", () => {
      this.addXP(10);
      this.unlockBadge("first-step");
      this.showToast("+10 XP Mastered! Moving to next word...");
      this.nextLesson();
    });

    // Quiz Type Toggles
    this.quizTypeBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        this.quizTypeBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        this.activeQuizType = btn.dataset.quiz;

        if (this.activeQuizType === "matching") {
          this.quizMcqContainer.classList.add("hidden");
          this.quizMatchingContainer.classList.remove("hidden");
          this.initMatchingQuiz();
        } else {
          this.quizMatchingContainer.classList.add("hidden");
          this.quizMcqContainer.classList.remove("hidden");
          this.initMcqQuiz();
        }
      });
    });

    // MCQ Actions
    this.quizNextBtn.addEventListener("click", () => this.nextMcqQuestion());
    this.playQuizAudioBtn.addEventListener("click", () => {
      const q = this.mcqState.pool[this.mcqState.index];
      if (q) this.speak(q.term);
    });

    // Matching Reset
    this.resetMatchingBtn.addEventListener("click", () => this.initMatchingQuiz());

    // Dictionary search
    this.dictSearchInput.addEventListener("input", () => this.renderDictionary());

    // Badges Modal
    this.achievementsBtn.addEventListener("click", () => this.openAchievementsModal());
  }

  getCurrentWordsPool() {
    const langObj = LANGUAGE_DATA[this.currentLang];
    if (this.currentCategory === "all") return langObj.words;
    return langObj.words.filter(w => w.category === this.currentCategory);
  }

  getCurrentLessonCard() {
    const pool = this.getCurrentWordsPool();
    if (pool.length === 0) return null;
    return pool[this.lessonIndex] || pool[0];
  }

  renderLessons() {
    const pool = this.getCurrentWordsPool();
    if (pool.length === 0) {
      this.cardTargetWord.textContent = "No words found";
      this.cardPhonetic.textContent = "";
      this.cardTranslation.textContent = "Try selecting 'All Topics'";
      this.cardTargetSentence.textContent = "";
      this.cardEnglishSentence.textContent = "";
      this.lessonCounter.textContent = "0 / 0";
      this.lessonProgressBar.style.width = "0%";
      return;
    }

    if (this.lessonIndex < 0) this.lessonIndex = 0;
    if (this.lessonIndex >= pool.length) this.lessonIndex = pool.length - 1;

    const card = pool[this.lessonIndex];
    this.cardCategory.textContent = card.category;
    this.cardTargetWord.textContent = card.term;
    this.cardPhonetic.textContent = card.phonetic;
    this.cardTranslation.textContent = card.translation;
    this.cardTargetSentence.textContent = card.sentence;
    this.cardEnglishSentence.textContent = card.sentenceEn;

    this.lessonCounter.textContent = `Card ${this.lessonIndex + 1} / ${pool.length}`;
    const pct = ((this.lessonIndex + 1) / pool.length) * 100;
    this.lessonProgressBar.style.width = `${pct}%`;

    this.lessonPrevBtn.disabled = this.lessonIndex === 0;
    this.lessonNextBtn.disabled = this.lessonIndex === pool.length - 1;
  }

  nextLesson() {
    const pool = this.getCurrentWordsPool();
    if (this.lessonIndex < pool.length - 1) {
      this.lessonIndex++;
      this.renderLessons();
    }
  }

  prevLesson() {
    if (this.lessonIndex > 0) {
      this.lessonIndex--;
      this.renderLessons();
    }
  }

  speak(text) {
    if (!('speechSynthesis' in window)) {
      this.showToast("Speech synthesis not supported in this browser.");
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = LANGUAGE_DATA[this.currentLang].locale || "es-ES";
    utterance.rate = this.slowAudio ? 0.65 : 0.92;
    window.speechSynthesis.speak(utterance);
  }

  // Quizzes Engine
  initMcqQuiz() {
    const words = [...LANGUAGE_DATA[this.currentLang].words];
    // Shuffle words for quiz
    for (let i = words.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [words[i], words[j]] = [words[j], words[i]];
    }

    this.mcqState = {
      index: 0,
      score: 0,
      pool: words.slice(0, 5),
      answered: false
    };

    if (this.activeQuizType === "listening") {
      this.audioListeningPrompt.classList.remove("hidden");
      this.quizTargetWord.classList.add("hidden");
      this.quizInstruction.textContent = "Listen to the audio and select what it means:";
    } else {
      this.audioListeningPrompt.classList.add("hidden");
      this.quizTargetWord.classList.remove("hidden");
      this.quizInstruction.textContent = "Choose the correct translation for:";
    }

    this.renderMcqQuestion();
  }

  renderMcqQuestion() {
    const q = this.mcqState.pool[this.mcqState.index];
    if (!q) return;

    this.mcqState.answered = false;
    this.quizFeedbackBar.classList.add("hidden");

    this.mcqProgress.textContent = `Question ${this.mcqState.index + 1} / ${this.mcqState.pool.length}`;
    this.mcqScore.textContent = this.mcqState.score;
    this.quizTargetWord.textContent = q.term;

    if (this.activeQuizType === "listening") {
      // Auto-play audio
      setTimeout(() => this.speak(q.term), 300);
    }

    // Generate 4 multiple-choice options (1 correct + 3 distractors)
    const allWords = LANGUAGE_DATA[this.currentLang].words;
    const distractors = allWords.filter(w => w.id !== q.id).map(w => w.translation);

    // Shuffle distractors
    for (let i = distractors.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [distractors[i], distractors[j]] = [distractors[j], distractors[i]];
    }

    const options = [q.translation, ...distractors.slice(0, 3)];
    for (let i = options.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [options[i], options[j]] = [options[j], options[i]];
    }

    this.mcqOptionsGrid.innerHTML = "";
    options.forEach((opt, idx) => {
      const btn = document.createElement("button");
      btn.className = "mcq-option-btn";
      btn.innerHTML = `<span style="opacity:0.6; font-size:0.8rem; font-weight:700;">${String.fromCharCode(65 + idx)}.</span> ${opt}`;
      btn.addEventListener("click", () => this.handleMcqSelect(btn, opt, q.translation));
      this.mcqOptionsGrid.appendChild(btn);
    });
  }

  handleMcqSelect(btn, chosen, correct) {
    if (this.mcqState.answered) return;
    this.mcqState.answered = true;

    const allBtns = this.mcqOptionsGrid.querySelectorAll(".mcq-option-btn");
    allBtns.forEach(b => b.disabled = true);

    if (chosen === correct) {
      btn.classList.add("opt-correct");
      this.mcqState.score++;
      this.mcqScore.textContent = this.mcqState.score;
      this.addXP(15);
      this.quizFeedbackMessage.innerHTML = `<span style="color: #34d399;"><i class="fa-solid fa-circle-check"></i> Correct! +15 XP</span>`;
    } else {
      btn.classList.add("opt-wrong");
      allBtns.forEach(b => {
        if (b.textContent.includes(correct)) b.classList.add("opt-correct");
      });
      this.quizFeedbackMessage.innerHTML = `<span style="color: #f87171;"><i class="fa-solid fa-circle-xmark"></i> Correct answer: <strong>${correct}</strong></span>`;
    }

    this.quizFeedbackBar.classList.remove("hidden");
  }

  nextMcqQuestion() {
    if (this.mcqState.index < this.mcqState.pool.length - 1) {
      this.mcqState.index++;
      this.renderMcqQuestion();
    } else {
      this.finishQuiz();
    }
  }

  finishQuiz() {
    const total = this.mcqState.pool.length;
    const score = this.mcqState.score;

    if (score === total) {
      this.unlockBadge("quiz-ace");
    }
    if (this.activeQuizType === "listening") {
      this.unlockBadge("audio-master");
    }

    const bonusXP = score * 10;
    this.victoryXp.textContent = bonusXP;
    this.victorySubtitle.textContent = `You scored ${score} out of ${total} on the ${this.activeQuizType.toUpperCase()} test!`;
    this.victoryModal.classList.remove("hidden");
  }

  // Word Matching Quiz
  initMatchingQuiz() {
    const allWords = [...LANGUAGE_DATA[this.currentLang].words];
    for (let i = allWords.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [allWords[i], allWords[j]] = [allWords[j], allWords[i]];
    }

    const selectedPairs = allWords.slice(0, 4);
    this.matchingState = {
      selectedForeign: null,
      selectedEnglish: null,
      matchedCount: 0,
      pairs: selectedPairs
    };

    this.matchScore.textContent = "0";

    // Foreign column
    const foreignList = [...selectedPairs];
    // English column shuffled
    const englishList = [...selectedPairs];
    for (let i = englishList.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [englishList[i], englishList[j]] = [englishList[j], englishList[i]];
    }

    this.matchColForeign.innerHTML = "";
    foreignList.forEach(item => {
      const card = document.createElement("div");
      card.className = "match-card";
      card.dataset.id = item.id;
      card.textContent = item.term;
      card.addEventListener("click", () => this.handleForeignMatchClick(card, item));
      this.matchColForeign.appendChild(card);
    });

    this.matchColEnglish.innerHTML = "";
    englishList.forEach(item => {
      const card = document.createElement("div");
      card.className = "match-card";
      card.dataset.id = item.id;
      card.textContent = item.translation;
      card.addEventListener("click", () => this.handleEnglishMatchClick(card, item));
      this.matchColEnglish.appendChild(card);
    });
  }

  handleForeignMatchClick(card, item) {
    if (card.classList.contains("matched")) return;
    this.matchColForeign.querySelectorAll(".match-card").forEach(c => c.classList.remove("selected"));
    card.classList.add("selected");
    this.matchingState.selectedForeign = { card, item };
    this.checkMatchAttempt();
  }

  handleEnglishMatchClick(card, item) {
    if (card.classList.contains("matched")) return;
    this.matchColEnglish.querySelectorAll(".match-card").forEach(c => c.classList.remove("selected"));
    card.classList.add("selected");
    this.matchingState.selectedEnglish = { card, item };
    this.checkMatchAttempt();
  }

  checkMatchAttempt() {
    const { selectedForeign, selectedEnglish } = this.matchingState;
    if (!selectedForeign || !selectedEnglish) return;

    if (selectedForeign.item.id === selectedEnglish.item.id) {
      // Match found!
      selectedForeign.card.classList.remove("selected");
      selectedEnglish.card.classList.remove("selected");
      selectedForeign.card.classList.add("matched");
      selectedEnglish.card.classList.add("matched");

      this.matchingState.matchedCount++;
      this.matchScore.textContent = this.matchingState.matchedCount;
      this.addXP(10);
      this.showToast("Pair Matched! +10 XP ✨");

      this.matchingState.selectedForeign = null;
      this.matchingState.selectedEnglish = null;

      if (this.matchingState.matchedCount === 4) {
        setTimeout(() => {
          this.victoryXp.textContent = 40;
          this.victorySubtitle.textContent = "All 4 vocabulary pairs matched perfectly!";
          this.victoryModal.classList.remove("hidden");
        }, 500);
      }
    } else {
      // Mismatch
      setTimeout(() => {
        selectedForeign.card.classList.remove("selected");
        selectedEnglish.card.classList.remove("selected");
        this.matchingState.selectedForeign = null;
        this.matchingState.selectedEnglish = null;
      }, 400);
    }
  }

  // Tab 3: Vocabulary Dictionary
  renderDictionary() {
    const search = this.dictSearchInput.value.toLowerCase().trim();
    const words = LANGUAGE_DATA[this.currentLang].words;

    let filtered = words;
    if (this.currentCategory !== "all") {
      filtered = filtered.filter(w => w.category === this.currentCategory);
    }

    if (search) {
      filtered = filtered.filter(w => 
        w.term.toLowerCase().includes(search) || 
        w.translation.toLowerCase().includes(search) || 
        w.phonetic.toLowerCase().includes(search)
      );
    }

    this.dictCount.textContent = `Showing ${filtered.length} terms in ${LANGUAGE_DATA[this.currentLang].name}`;
    this.dictionaryWordGrid.innerHTML = "";

    if (filtered.length === 0) {
      this.dictionaryWordGrid.innerHTML = `
        <p style="grid-column: 1 / -1; text-align: center; color: var(--text-muted); padding: 30px;">
          No vocabulary terms found matching "${search}".
        </p>
      `;
      return;
    }

    filtered.forEach(item => {
      const card = document.createElement("div");
      card.className = "word-entry-card";
      card.innerHTML = `
        <div>
          <div class="word-main-term">${this.escapeHTML(item.term)}</div>
          <div class="word-phonetic">${this.escapeHTML(item.phonetic)}</div>
          <div class="word-meaning">${this.escapeHTML(item.translation)}</div>
        </div>
        <button class="audio-mini-btn" title="Listen Pronunciation">
          <i class="fa-solid fa-volume-high"></i>
        </button>
      `;
      card.querySelector(".audio-mini-btn").addEventListener("click", () => this.speak(item.term));
      this.dictionaryWordGrid.appendChild(card);
    });
  }

  // Achievements Modal
  openAchievementsModal() {
    this.achievementsList.innerHTML = "";
    ACHIEVEMENTS_DATA.forEach(badge => {
      const isUnlocked = this.userData.unlockedBadges.includes(badge.id);
      const item = document.createElement("div");
      item.className = `badge-item ${isUnlocked ? 'unlocked' : ''}`;
      item.innerHTML = `
        <div class="badge-icon"><i class="fa-solid ${badge.icon}"></i></div>
        <div>
          <div class="badge-title">${badge.title}</div>
          <div class="badge-desc">${badge.desc}</div>
        </div>
        <span class="badge-status">${isUnlocked ? '✓ Unlocked' : 'Locked'}</span>
      `;
      this.achievementsList.appendChild(item);
    });

    this.achievementsModal.classList.remove("hidden");
  }

  closeAchievementsModal() {
    this.achievementsModal.classList.add("hidden");
  }

  closeVictoryModal() {
    this.victoryModal.classList.add("hidden");
  }

  showToast(msg) {
    this.langToast.textContent = msg;
    this.langToast.classList.remove("hidden");
    clearTimeout(this.toastTimer);
    this.toastTimer = setTimeout(() => {
      this.langToast.classList.add("hidden");
    }, 2800);
  }

  escapeHTML(str) {
    return str.replace(/[&<>'"]/g, tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag));
  }
}

function closeAchievementsModal() { app.closeAchievementsModal(); }
function closeVictoryModal() { app.closeVictoryModal(); }

let app;
document.addEventListener("DOMContentLoaded", () => {
  app = new LanguageApp();
});

