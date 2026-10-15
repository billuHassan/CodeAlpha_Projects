/**
 * Rahmour Flashcards - Real-Time Learning & Quiz Engine
 */

const DEFAULT_DECKS = {
  "web-dev": {
    id: "web-dev",
    name: "Web Development",
    category: "Coding",
    cards: [
      {
        id: "wd-1",
        question: "What is the primary difference between let, const, and var in JavaScript?",
        answer: "var is function-scoped and hoisted with undefined; let and const are block-scoped. const prohibits reassignment, while let permits it."
      },
      {
        id: "wd-2",
        question: "What does CSS Flexbox's 'justify-content' property control?",
        answer: "It aligns flex items along the main axis of the flex container (e.g., flex-start, center, space-between)."
      },
      {
        id: "wd-3",
        question: "What is an asynchronous Promise in JavaScript?",
        answer: "An object representing the eventual completion or failure of an asynchronous operation and its resulting value (Pending, Fulfilled, or Rejected)."
      },
      {
        id: "wd-4",
        question: "What is the purpose of semantic HTML tags (like <article>, <section>, <nav>)?",
        answer: "They provide clear meaning to both browsers and developers, boosting accessibility (screen readers) and SEO ranking."
      },
      {
        id: "wd-5",
        question: "What is the Event Loop in JavaScript?",
        answer: "A single-threaded mechanism that continuously monitors the Call Stack and Task/Microtask Queues to push asynchronous callbacks into execution."
      }
    ]
  },
  "dsa": {
    id: "dsa",
    name: "Data Structures & Algorithms",
    category: "Computer Science",
    cards: [
      {
        id: "dsa-1",
        question: "What is the average time complexity of searching in a Hash Map?",
        answer: "O(1) constant time, assuming an efficient hash function and minimal bucket collisions."
      },
      {
        id: "dsa-2",
        question: "What is the difference between a Stack and a Queue?",
        answer: "A Stack operates on LIFO (Last-In, First-Out), while a Queue operates on FIFO (First-In, First-Out)."
      },
      {
        id: "dsa-3",
        question: "What is the worst-case time complexity of QuickSort?",
        answer: "O(n²), occurring when the chosen pivot is repeatedly the smallest or largest element (mitigated by randomized pivots)."
      },
      {
        id: "dsa-4",
        question: "When would you prefer a Doubly Linked List over a Singly Linked List?",
        answer: "When bidirectional traversal is required, or when deleting a given node reference in O(1) time without knowing its predecessor."
      }
    ]
  },
  "spanish": {
    id: "spanish",
    name: "Spanish Vocabulary",
    category: "Language",
    cards: [
      {
        id: "sp-1",
        question: "¿Cómo se dice 'Hello, how are you?' en español?",
        answer: "Hola, ¿cómo estás? (informal) o Hola, ¿cómo está usted? (formal)."
      },
      {
        id: "sp-2",
        question: "Translate to English: 'El éxito es la suma de pequeños esfuerzos repetidos cada día.'",
        answer: "'Success is the sum of small efforts repeated every day.'"
      },
      {
        id: "sp-3",
        question: "¿Qué significa 'Por favor' y 'Muchas gracias'?",
        answer: "'Please' and 'Thank you very much'."
      }
    ]
  }
};

class FlashcardApp {
  constructor() {
    this.storageKey = "rahmour_flashcards_decks";
    this.activeDeckId = "web-dev";
    this.currentIndex = 0;
    this.isFlipped = false;
    this.mode = "study"; // 'study' | 'quiz'
    this.decks = this.loadDecks();

    this.quizStats = {
      correct: 0,
      missed: 0,
      startTime: null,
      timerInterval: null
    };

    this.cacheDOM();
    this.bindEvents();
    this.populateDeckSelector();
    this.renderCurrentCard();
  }

  loadDecks() {
    try {
      const saved = localStorage.getItem(this.storageKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Object.keys(parsed).length > 0) return parsed;
      }
    } catch (e) {
      console.warn("Using default decks", e);
    }
    this.saveDecks(DEFAULT_DECKS);
    return JSON.parse(JSON.stringify(DEFAULT_DECKS));
  }

  saveDecks(data = this.decks) {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(data));
    } catch (e) {
      console.error(e);
    }
  }

  cacheDOM() {
    this.deckSelect = document.getElementById("deckSelect");
    this.newDeckBtn = document.getElementById("newDeckBtn");
    this.manageCardsBtn = document.getElementById("manageCardsBtn");
    this.addCardBtn = document.getElementById("addCardBtn");
    this.studyModeBtn = document.getElementById("studyModeBtn");
    this.quizModeBtn = document.getElementById("quizModeBtn");
    this.cardCounter = document.getElementById("cardCounter");
    this.deckCategoryTag = document.getElementById("deckCategoryTag");
    this.progressBar = document.getElementById("progressBar");
    this.quizTimer = document.getElementById("quizTimer");
    this.timerDisplay = document.getElementById("timerDisplay");

    this.emptyDeckState = document.getElementById("emptyDeckState");
    this.cardStage = document.getElementById("cardStage");
    this.flashcardElement = document.getElementById("flashcardElement");
    this.cardQuestionText = document.getElementById("cardQuestionText");
    this.cardAnswerText = document.getElementById("cardAnswerText");
    this.ttsFrontBtn = document.getElementById("ttsFrontBtn");
    this.ttsBackBtn = document.getElementById("ttsBackBtn");
    this.editCurrentCardBtn = document.getElementById("editCurrentCardBtn");
    this.editCurrentCardBtnBack = document.getElementById("editCurrentCardBtnBack");

    this.prevBtn = document.getElementById("prevBtn");
    this.flipBtn = document.getElementById("flipBtn");
    this.flipBtnText = document.getElementById("flipBtnText");
    this.nextBtn = document.getElementById("nextBtn");
    this.quizAssessmentBar = document.getElementById("quizAssessmentBar");
    this.btnForgot = document.getElementById("btnForgot");
    this.btnKnew = document.getElementById("btnKnew");

    this.shuffleBtn = document.getElementById("shuffleBtn");
    this.resetDeckBtn = document.getElementById("resetDeckBtn");
    this.exportImportBtn = document.getElementById("exportImportBtn");

    // Modals
    this.newDeckModal = document.getElementById("newDeckModal");
    this.newDeckForm = document.getElementById("newDeckForm");
    this.newDeckNameInput = document.getElementById("newDeckNameInput");
    this.newDeckCategoryInput = document.getElementById("newDeckCategoryInput");

    this.cardModal = document.getElementById("cardModal");
    this.cardModalTitle = document.getElementById("cardModalTitle");
    this.cardForm = document.getElementById("cardForm");
    this.editCardId = document.getElementById("editCardId");
    this.cardQuestionInput = document.getElementById("cardQuestionInput");
    this.cardAnswerInput = document.getElementById("cardAnswerInput");

    this.manageModal = document.getElementById("manageModal");
    this.cardSearchInput = document.getElementById("cardSearchInput");
    this.manageCardsList = document.getElementById("manageCardsList");
    this.deleteDeckBtn = document.getElementById("deleteDeckBtn");

    this.quizResultsModal = document.getElementById("quizResultsModal");
    this.quizScorePercentage = document.getElementById("quizScorePercentage");
    this.quizCorrectCount = document.getElementById("quizCorrectCount");
    this.quizMissedCount = document.getElementById("quizMissedCount");
    this.quizTimeTaken = document.getElementById("quizTimeTaken");

    this.exportModal = document.getElementById("exportModal");
    this.downloadBackupBtn = document.getElementById("downloadBackupBtn");
    this.importFileInput = document.getElementById("importFileInput");
    this.toastNotification = document.getElementById("toastNotification");
  }

  bindEvents() {
    this.deckSelect.addEventListener("change", (e) => {
      this.activeDeckId = e.target.value;
      this.currentIndex = 0;
      this.isFlipped = false;
      this.renderCurrentCard();
    });

    this.studyModeBtn.addEventListener("click", () => this.setMode("study"));
    this.quizModeBtn.addEventListener("click", () => this.setMode("quiz"));

    this.flashcardElement.addEventListener("click", (e) => {
      if (e.target.closest(".tool-btn")) return;
      this.toggleFlip();
    });

    this.flipBtn.addEventListener("click", () => this.toggleFlip());
    this.prevBtn.addEventListener("click", () => this.prevCard());
    this.nextBtn.addEventListener("click", () => this.nextCard());

    this.btnKnew.addEventListener("click", () => this.recordQuizAnswer(true));
    this.btnForgot.addEventListener("click", () => this.recordQuizAnswer(false));

    this.shuffleBtn.addEventListener("click", () => this.shuffleCurrentDeck());
    this.resetDeckBtn.addEventListener("click", () => {
      this.currentIndex = 0;
      this.isFlipped = false;
      this.renderCurrentCard();
      this.showToast("Deck reset to start.");
    });

    this.ttsFrontBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      this.speakText(this.getActiveCard()?.question || "");
    });
    this.ttsBackBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      this.speakText(this.getActiveCard()?.answer || "");
    });

    this.editCurrentCardBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      const card = this.getActiveCard();
      if (card) this.openEditCardModal(card.id);
    });
    this.editCurrentCardBtnBack.addEventListener("click", (e) => {
      e.stopPropagation();
      const card = this.getActiveCard();
      if (card) this.openEditCardModal(card.id);
    });

    this.newDeckBtn.addEventListener("click", () => this.openNewDeckModal());
    this.addCardBtn.addEventListener("click", () => this.openAddCardModal());
    this.manageCardsBtn.addEventListener("click", () => this.openManageModal());
    this.exportImportBtn.addEventListener("click", () => this.openExportModal());

    this.newDeckForm.addEventListener("submit", (e) => this.handleCreateDeck(e));
    this.cardForm.addEventListener("submit", (e) => this.handleSaveCard(e));
    this.cardSearchInput.addEventListener("input", (e) => this.filterManageCards(e.target.value));
    this.deleteDeckBtn.addEventListener("click", () => this.deleteCurrentDeck());

    this.downloadBackupBtn.addEventListener("click", () => this.exportDecksJSON());
    this.importFileInput.addEventListener("change", (e) => this.importDecksJSON(e));

    window.addEventListener("keydown", (e) => {
      if (["INPUT", "TEXTAREA"].includes(document.activeElement.tagName)) return;
      if (e.code === "Space") {
        e.preventDefault();
        this.toggleFlip();
      } else if (e.code === "ArrowRight") {
        e.preventDefault();
        this.nextCard();
      } else if (e.code === "ArrowLeft") {
        e.preventDefault();
        this.prevCard();
      } else if (this.mode === "quiz" && this.isFlipped) {
        if (e.key === "1" || e.key === "d") this.recordQuizAnswer(false);
        if (e.key === "2" || e.key === "k") this.recordQuizAnswer(true);
      }
    });
  }

  populateDeckSelector() {
    this.deckSelect.innerHTML = "";
    Object.values(this.decks).forEach(deck => {
      const opt = document.createElement("option");
      opt.value = deck.id;
      opt.textContent = `${deck.name} (${deck.cards.length})`;
      if (deck.id === this.activeDeckId) opt.selected = true;
      this.deckSelect.appendChild(opt);
    });
  }

  getActiveDeck() {
    return this.decks[this.activeDeckId] || null;
  }

  getActiveCard() {
    const deck = this.getActiveDeck();
    if (!deck || !deck.cards || deck.cards.length === 0) return null;
    return deck.cards[this.currentIndex] || null;
  }

  renderCurrentCard() {
    const deck = this.getActiveDeck();
    if (!deck || deck.cards.length === 0) {
      this.emptyDeckState.classList.remove("hidden");
      this.cardStage.classList.add("hidden");
      this.cardCounter.textContent = "0 / 0";
      this.progressBar.style.width = "0%";
      this.prevBtn.disabled = true;
      this.nextBtn.disabled = true;
      this.flipBtn.disabled = true;
      return;
    }

    this.emptyDeckState.classList.add("hidden");
    this.cardStage.classList.remove("hidden");
    this.prevBtn.disabled = false;
    this.nextBtn.disabled = false;
    this.flipBtn.disabled = false;

    if (this.currentIndex < 0) this.currentIndex = 0;
    if (this.currentIndex >= deck.cards.length) this.currentIndex = deck.cards.length - 1;

    const card = deck.cards[this.currentIndex];

    this.isFlipped = false;
    this.flashcardElement.classList.remove("is-flipped");
    this.flipBtnText.textContent = "Show Answer";

    this.cardQuestionText.textContent = card.question;
    this.cardAnswerText.textContent = card.answer;

    this.cardCounter.textContent = `Card ${this.currentIndex + 1} / ${deck.cards.length}`;
    this.deckCategoryTag.innerHTML = `<i class="fa-solid fa-tag"></i> ${deck.category || 'General'}`;

    const progress = ((this.currentIndex + 1) / deck.cards.length) * 100;
    this.progressBar.style.width = `${progress}%`;

    this.prevBtn.disabled = this.currentIndex === 0;
    this.nextBtn.disabled = this.currentIndex === deck.cards.length - 1;

    if (this.mode === "quiz") {
      this.quizAssessmentBar.classList.add("hidden");
    }
  }

  toggleFlip() {
    const card = this.getActiveCard();
    if (!card) return;

    this.isFlipped = !this.isFlipped;
    if (this.isFlipped) {
      this.flashcardElement.classList.add("is-flipped");
      this.flipBtnText.textContent = "Show Question";
      if (this.mode === "quiz") {
        this.quizAssessmentBar.classList.remove("hidden");
      }
    } else {
      this.flashcardElement.classList.remove("is-flipped");
      this.flipBtnText.textContent = "Show Answer";
      if (this.mode === "quiz") {
        this.quizAssessmentBar.classList.add("hidden");
      }
    }
  }

  nextCard() {
    const deck = this.getActiveDeck();
    if (!deck || this.currentIndex >= deck.cards.length - 1) return;
    this.currentIndex++;
    this.renderCurrentCard();
  }

  prevCard() {
    if (this.currentIndex <= 0) return;
    this.currentIndex--;
    this.renderCurrentCard();
  }

  setMode(mode) {
    this.mode = mode;
    if (mode === "study") {
      this.studyModeBtn.classList.add("active");
      this.quizModeBtn.classList.remove("active");
      this.quizTimer.classList.add("hidden");
      this.quizAssessmentBar.classList.add("hidden");
      this.stopQuizTimer();
      this.renderCurrentCard();
    } else {
      this.quizModeBtn.classList.add("active");
      this.studyModeBtn.classList.remove("active");
      this.quizTimer.classList.remove("hidden");
      this.startQuiz();
    }
  }

  startQuiz() {
    this.quizStats = {
      correct: 0,
      missed: 0,
      startTime: Date.now(),
      timerInterval: null
    };
    this.currentIndex = 0;
    this.renderCurrentCard();
    this.startQuizTimer();
    this.showToast("Quiz challenge started! Flip each card and test your knowledge.");
  }

  startQuizTimer() {
    this.stopQuizTimer();
    this.timerDisplay.textContent = "00:00";
    this.quizStats.timerInterval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - this.quizStats.startTime) / 1000);
      const mins = String(Math.floor(elapsed / 60)).padStart(2, "0");
      const secs = String(elapsed % 60).padStart(2, "0");
      this.timerDisplay.textContent = `${mins}:${secs}`;
    }, 1000);
  }

  stopQuizTimer() {
    if (this.quizStats.timerInterval) {
      clearInterval(this.quizStats.timerInterval);
      this.quizStats.timerInterval = null;
    }
  }

  recordQuizAnswer(known) {
    if (known) {
      this.quizStats.correct++;
    } else {
      this.quizStats.missed++;
    }

    const deck = this.getActiveDeck();
    if (this.currentIndex < deck.cards.length - 1) {
      this.nextCard();
    } else {
      this.finishQuiz();
    }
  }

  finishQuiz() {
    this.stopQuizTimer();
    const total = this.quizStats.correct + this.quizStats.missed;
    const accuracy = total > 0 ? Math.round((this.quizStats.correct / total) * 100) : 0;
    const elapsed = Math.floor((Date.now() - this.quizStats.startTime) / 1000);

    this.quizScorePercentage.textContent = `${accuracy}%`;
    this.quizCorrectCount.textContent = this.quizStats.correct;
    this.quizMissedCount.textContent = this.quizStats.missed;
    this.quizTimeTaken.textContent = `${elapsed}s`;

    this.quizResultsModal.classList.remove("hidden");
  }

  shuffleCurrentDeck() {
    const deck = this.getActiveDeck();
    if (!deck || deck.cards.length <= 1) return;

    for (let i = deck.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck.cards[i], deck.cards[j]] = [deck.cards[j], deck.cards[i]];
    }

    this.currentIndex = 0;
    this.saveDecks();
    this.renderCurrentCard();
    this.showToast("Deck shuffled!");
  }

  speakText(text) {
    if (!('speechSynthesis' in window)) {
      this.showToast("Text-to-speech not supported on this browser.");
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.95;
    window.speechSynthesis.speak(utterance);
  }

  openNewDeckModal() {
    this.newDeckNameInput.value = "";
    this.newDeckCategoryInput.value = "";
    this.newDeckModal.classList.remove("hidden");
    this.newDeckNameInput.focus();
  }

  closeNewDeckModal() {
    this.newDeckModal.classList.add("hidden");
  }

  handleCreateDeck(e) {
    e.preventDefault();
    const name = this.newDeckNameInput.value.trim();
    const category = this.newDeckCategoryInput.value.trim();
    if (!name) return;

    const deckId = "deck-" + Date.now();
    this.decks[deckId] = {
      id: deckId,
      name,
      category: category || "General",
      cards: []
    };

    this.activeDeckId = deckId;
    this.currentIndex = 0;
    this.saveDecks();
    this.populateDeckSelector();
    this.renderCurrentCard();
    this.closeNewDeckModal();
    this.showToast(`Created new deck "${name}"!`);
  }

  openAddCardModal() {
    this.cardModalTitle.textContent = "Add New Flashcard";
    this.editCardId.value = "";
    this.cardQuestionInput.value = "";
    this.cardAnswerInput.value = "";
    this.cardModal.classList.remove("hidden");
    this.cardQuestionInput.focus();
  }

  openEditCardModal(cardId) {
    const deck = this.getActiveDeck();
    if (!deck) return;
    const card = deck.cards.find(c => c.id === cardId);
    if (!card) return;

    this.cardModalTitle.textContent = "Edit Flashcard";
    this.editCardId.value = card.id;
    this.cardQuestionInput.value = card.question;
    this.cardAnswerInput.value = card.answer;
    this.cardModal.classList.remove("hidden");
    this.cardQuestionInput.focus();
  }

  handleSaveCard(e) {
    e.preventDefault();
    const q = this.cardQuestionInput.value.trim();
    const a = this.cardAnswerInput.value.trim();
    const id = this.editCardId.value;

    if (!q || !a) return;

    const deck = this.getActiveDeck();
    if (!deck) return;

    if (id) {
      const card = deck.cards.find(c => c.id === id);
      if (card) {
        card.question = q;
        card.answer = a;
        this.showToast("Flashcard updated!");
      }
    } else {
      const newCard = {
        id: "card-" + Date.now(),
        question: q,
        answer: a
      };
      deck.cards.push(newCard);
      this.currentIndex = deck.cards.length - 1;
      this.showToast("New flashcard created!");
    }

    this.saveDecks();
    this.populateDeckSelector();
    this.renderCurrentCard();
    this.closeCardModal();
  }

  deleteCard(cardId) {
    const deck = this.getActiveDeck();
    if (!deck) return;
    if (!confirm("Are you sure you want to delete this flashcard?")) return;

    deck.cards = deck.cards.filter(c => c.id !== cardId);
    if (this.currentIndex >= deck.cards.length) {
      this.currentIndex = Math.max(0, deck.cards.length - 1);
    }

    this.saveDecks();
    this.populateDeckSelector();
    this.renderCurrentCard();
    this.filterManageCards(this.cardSearchInput.value);
    this.showToast("Flashcard deleted.");
  }

  openManageModal() {
    this.cardSearchInput.value = "";
    this.filterManageCards("");
    this.manageModal.classList.remove("hidden");
  }

  filterManageCards(query) {
    const deck = this.getActiveDeck();
    if (!deck) return;

    const q = query.toLowerCase();
    const filtered = deck.cards.filter(c => 
      c.question.toLowerCase().includes(q) || 
      c.answer.toLowerCase().includes(q)
    );

    this.manageCardsList.innerHTML = "";
    if (filtered.length === 0) {
      this.manageCardsList.innerHTML = `<p style="text-align:center; color:#94a3b8; padding: 20px;">No cards found matching "${query}".</p>`;
      return;
    }

    filtered.forEach(card => {
      const row = document.createElement("div");
      row.className = "manage-card-row";
      row.innerHTML = `
        <div class="row-texts">
          <div class="row-q">${this.escapeHTML(card.question)}</div>
          <div class="row-a">${this.escapeHTML(card.answer)}</div>
        </div>
        <div class="row-actions">
          <button class="btn btn-secondary btn-sm" onclick="app.openEditCardModal('${card.id}')">
            <i class="fa-solid fa-pen"></i>
          </button>
          <button class="btn btn-outline-danger btn-sm" onclick="app.deleteCard('${card.id}')">
            <i class="fa-solid fa-trash"></i>
          </button>
        </div>
      `;
      this.manageCardsList.appendChild(row);
    });
  }

  deleteCurrentDeck() {
    const deck = this.getActiveDeck();
    if (!deck) return;
    if (Object.keys(this.decks).length <= 1) {
      alert("You must keep at least one deck!");
      return;
    }

    if (!confirm(`Are you sure you want to delete the deck "${deck.name}"?`)) return;

    delete this.decks[this.activeDeckId];
    this.activeDeckId = Object.keys(this.decks)[0];
    this.currentIndex = 0;
    this.saveDecks();
    this.populateDeckSelector();
    this.renderCurrentCard();
    this.closeManageModal();
    this.showToast("Deck deleted successfully.");
  }

  exportDecksJSON() {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.decks, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `Rahmour_Flashcards_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    this.showToast("Decks exported successfully!");
  }

  importDecksJSON(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const imported = JSON.parse(event.target.result);
        if (typeof imported === "object" && imported !== null) {
          this.decks = { ...this.decks, ...imported };
          this.saveDecks();
          this.populateDeckSelector();
          this.renderCurrentCard();
          this.closeExportModal();
          this.showToast("Decks imported successfully!");
        } else {
          alert("Invalid file format: Expected flashcard deck JSON.");
        }
      } catch (err) {
        alert("Failed to parse JSON file.");
      }
    };
    reader.readAsText(file);
  }

  showToast(msg) {
    this.toastNotification.textContent = msg;
    this.toastNotification.classList.remove("hidden");
    clearTimeout(this.toastTimeout);
    this.toastTimeout = setTimeout(() => {
      this.toastNotification.classList.add("hidden");
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

  closeCardModal() { this.cardModal.classList.add("hidden"); }
  closeManageModal() { this.manageModal.classList.add("hidden"); }
  closeExportModal() {
    this.exportModal.classList.add("hidden");
    this.importFileInput.value = "";
  }
  closeQuizModal() {
    this.quizResultsModal.classList.add("hidden");
    this.setMode("study");
  }
  restartQuiz() {
    this.quizResultsModal.classList.add("hidden");
    this.startQuiz();
  }
}

function closeNewDeckModal() { app.closeNewDeckModal(); }
function closeCardModal() { app.closeCardModal(); }
function closeManageModal() { app.closeManageModal(); }
function closeExportModal() { app.closeExportModal(); }
function closeQuizModal() { app.closeQuizModal(); }
function restartQuiz() { app.restartQuiz(); }
function openAddCardModal() { app.openAddCardModal(); }

let app;
document.addEventListener("DOMContentLoaded", () => {
  app = new FlashcardApp();
});
