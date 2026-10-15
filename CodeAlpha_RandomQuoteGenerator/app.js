/**
 * AuraQuotes - Advanced Random Quote Generator Engine
 * CodeAlpha Internship Task 2
 */

const DEFAULT_QUOTES = [
  // Tech & Code
  {
    id: "tech-1",
    text: "Simplicity is prerequisite for reliability.",
    author: "Edsger W. Dijkstra",
    bio: "Pioneer of Computer Science & Turing Award Winner",
    category: "tech"
  },
  {
    id: "tech-2",
    text: "Talk is cheap. Show me the code.",
    author: "Linus Torvalds",
    bio: "Creator of Linux & Git",
    category: "tech"
  },
  {
    id: "tech-3",
    text: "Programs must be written for people to read, and only incidentally for machines to execute.",
    author: "Harold Abelson",
    bio: "Co-author of SICP & MIT Professor",
    category: "tech"
  },
  {
    id: "tech-4",
    text: "First, solve the problem. Then, write the code.",
    author: "John Johnson",
    bio: "Software Architect & Engineering Leader",
    category: "tech"
  },
  {
    id: "tech-5",
    text: "Make it work, make it right, make it fast.",
    author: "Kent Beck",
    bio: "Creator of Extreme Programming & TDD",
    category: "tech"
  },

  // Inspirational
  {
    id: "insp-1",
    text: "The future belongs to those who believe in the beauty of their dreams.",
    author: "Eleanor Roosevelt",
    bio: "Diplomat, Activist & Former First Lady",
    category: "inspirational"
  },
  {
    id: "insp-2",
    text: "The only limit to our realization of tomorrow will be our doubts of today.",
    author: "Franklin D. Roosevelt",
    bio: "32nd U.S. President",
    category: "inspirational"
  },
  {
    id: "insp-3",
    text: "It does not matter how slowly you go as long as you do not stop.",
    author: "Confucius",
    bio: "Ancient Chinese Philosopher",
    category: "inspirational"
  },
  {
    id: "insp-4",
    text: "Everything you've ever wanted is sitting on the other side of fear.",
    author: "George Addair",
    bio: "Inspirational Thinker & Author",
    category: "inspirational"
  },

  // Philosophy
  {
    id: "phil-1",
    text: "We suffer more often in imagination than in reality.",
    author: "Seneca",
    bio: "Stoic Philosopher & Statesman",
    category: "philosophy"
  },
  {
    id: "phil-2",
    text: "You have power over your mind - not outside events. Realize this, and you will find strength.",
    author: "Marcus Aurelius",
    bio: "Roman Emperor & Stoic Philosopher",
    category: "philosophy"
  },
  {
    id: "phil-3",
    text: "An unexamined life is not worth living.",
    author: "Socrates",
    bio: "Founding Father of Western Philosophy",
    category: "philosophy"
  },
  {
    id: "phil-4",
    text: "He who has a why to live can bear almost any how.",
    author: "Friedrich Nietzsche",
    bio: "Cultural Critic & Philosopher",
    category: "philosophy"
  },

  // Success
  {
    id: "succ-1",
    text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    author: "Winston Churchill",
    bio: "Statesman & Nobel Laureate",
    category: "success"
  },
  {
    id: "succ-2",
    text: "The secret of getting ahead is getting started.",
    author: "Mark Twain",
    bio: "Beloved Novelist & Humorist",
    category: "success"
  },
  {
    id: "succ-3",
    text: "Action is the foundational key to all success.",
    author: "Pablo Picasso",
    bio: "Revolutionary Painter & Sculptor",
    category: "success"
  },

  // Mindfulness
  {
    id: "mind-1",
    text: "Do not dwell in the past, do not dream of the future, concentrate the mind on the present moment.",
    author: "Buddha",
    bio: "Spiritual Teacher & Founder of Buddhism",
    category: "mindfulness"
  },
  {
    id: "mind-2",
    text: "Smile, breathe, and go slowly.",
    author: "Thich Nhat Hanh",
    bio: "Zen Master & Global Peace Advocate",
    category: "mindfulness"
  },
  {
    id: "mind-3",
    text: "Quiet the mind, and the soul will speak.",
    author: "Ma Jaya Sati Bhagavati",
    bio: "Spiritual Teacher & Humanitarian",
    category: "mindfulness"
  }
];

class QuoteApp {
  constructor() {
    this.storageKeyQuotes = "codealpha_quotes_database";
    this.storageKeyFavs = "codealpha_quotes_favorites";
    this.storageKeyTheme = "codealpha_quotes_theme";

    this.quotes = this.loadQuotes();
    this.favorites = this.loadFavorites();
    this.activeCategory = "all";
    this.currentQuote = null;
    this.autoPlayInterval = null;
    this.isSpeaking = false;

    this.cacheDOM();
    this.bindEvents();
    this.applyTheme(this.loadTheme());
    this.displayRandomQuote();
    this.updateFavBadge();
  }

  loadQuotes() {
    try {
      const saved = localStorage.getItem(this.storageKeyQuotes);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.warn("Could not load custom quotes, using defaults", e);
    }
    return [...DEFAULT_QUOTES];
  }

  saveQuotes() {
    try {
      localStorage.setItem(this.storageKeyQuotes, JSON.stringify(this.quotes));
    } catch (e) {
      console.error(e);
    }
  }

  loadFavorites() {
    try {
      const saved = localStorage.getItem(this.storageKeyFavs);
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return [];
  }

  saveFavorites() {
    try {
      localStorage.setItem(this.storageKeyFavs, JSON.stringify(this.favorites));
    } catch (e) {}
  }

  loadTheme() {
    return localStorage.getItem(this.storageKeyTheme) || "cosmic";
  }

  applyTheme(theme) {
    document.body.setAttribute("data-theme", theme);
    this.themeSelect.value = theme;
    localStorage.setItem(this.storageKeyTheme, theme);
  }

  cacheDOM() {
    // Header
    this.themeSelect = document.getElementById("themeSelect");
    this.viewFavoritesBtn = document.getElementById("viewFavoritesBtn");
    this.favBadge = document.getElementById("favBadge");
    this.addQuoteModalBtn = document.getElementById("addQuoteModalBtn");

    // Categories
    this.categoryTabs = document.getElementById("categoryTabs");

    // Card
    this.quoteCard = document.getElementById("quoteCard");
    this.quoteCategory = document.getElementById("quoteCategory");
    this.quoteText = document.getElementById("quoteText");
    this.quoteAuthor = document.getElementById("quoteAuthor");
    this.quoteAuthorBio = document.getElementById("quoteAuthorBio");
    this.soundWave = document.getElementById("soundWave");

    // Action buttons
    this.favCurrentBtn = document.getElementById("favCurrentBtn");
    this.favIcon = document.getElementById("favIcon");
    this.ttsBtn = document.getElementById("ttsBtn");
    this.copyBtn = document.getElementById("copyBtn");
    this.shareMenuBtn = document.getElementById("shareMenuBtn");
    this.shareMenu = document.getElementById("shareMenu");
    this.downloadImageBtn = document.getElementById("downloadImageBtn");

    // Social share options
    this.shareTwitterBtn = document.getElementById("shareTwitterBtn");
    this.shareLinkedInBtn = document.getElementById("shareLinkedInBtn");
    this.shareWhatsAppBtn = document.getElementById("shareWhatsAppBtn");
    this.shareNativeBtn = document.getElementById("shareNativeBtn");

    // Primary
    this.newQuoteBtn = document.getElementById("newQuoteBtn");
    this.autoPlayBtn = document.getElementById("autoPlayBtn");

    // Modals
    this.favoritesModal = document.getElementById("favoritesModal");
    this.favoritesList = document.getElementById("favoritesList");
    this.clearFavoritesBtn = document.getElementById("clearFavoritesBtn");

    this.addQuoteModal = document.getElementById("addQuoteModal");
    this.customQuoteForm = document.getElementById("customQuoteForm");
    this.customQuoteText = document.getElementById("customQuoteText");
    this.customAuthorText = document.getElementById("customAuthorText");
    this.customCategorySelect = document.getElementById("customCategorySelect");

    // Toast & Canvas
    this.toast = document.getElementById("toast");
    this.quoteCanvas = document.getElementById("quoteCanvas");
  }

  bindEvents() {
    this.themeSelect.addEventListener("change", (e) => this.applyTheme(e.target.value));

    // Categories
    this.categoryTabs.addEventListener("click", (e) => {
      const pill = e.target.closest(".cat-pill");
      if (!pill) return;
      this.categoryTabs.querySelectorAll(".cat-pill").forEach(p => p.classList.remove("active"));
      pill.classList.add("active");
      this.activeCategory = pill.dataset.cat;
      this.displayRandomQuote();
    });

    // Primary
    this.newQuoteBtn.addEventListener("click", () => this.displayRandomQuote());
    this.autoPlayBtn.addEventListener("click", () => this.toggleAutoPlay());

    // Quote actions
    this.favCurrentBtn.addEventListener("click", () => this.toggleFavoriteCurrent());
    this.ttsBtn.addEventListener("click", () => this.toggleSpeech());
    this.copyBtn.addEventListener("click", () => this.copyCurrentQuote());
    this.downloadImageBtn.addEventListener("click", () => this.generateQuoteImage());

    // Share popover
    this.shareMenuBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      this.shareMenu.classList.toggle("hidden");
    });

    document.addEventListener("click", (e) => {
      if (!this.shareMenu.contains(e.target) && e.target !== this.shareMenuBtn) {
        this.shareMenu.classList.add("hidden");
      }
    });

    this.shareTwitterBtn.addEventListener("click", () => this.shareToTwitter());
    this.shareLinkedInBtn.addEventListener("click", () => this.shareToLinkedIn());
    this.shareWhatsAppBtn.addEventListener("click", () => this.shareToWhatsApp());
    this.shareNativeBtn.addEventListener("click", () => this.shareNative());

    // Modals
    this.viewFavoritesBtn.addEventListener("click", () => this.openFavoritesModal());
    this.clearFavoritesBtn.addEventListener("click", () => this.clearAllFavorites());
    this.addQuoteModalBtn.addEventListener("click", () => this.openAddQuoteModal());
    this.customQuoteForm.addEventListener("submit", (e) => this.handleSaveCustomQuote(e));
  }

  getFilteredQuotes() {
    if (this.activeCategory === "all") return this.quotes;
    return this.quotes.filter(q => q.category === this.activeCategory);
  }

  displayRandomQuote() {
    const pool = this.getFilteredQuotes();
    if (pool.length === 0) {
      this.showToast("No quotes found in this category.");
      return;
    }

    // Pick random different from current if possible
    let nextQuote = pool[Math.floor(Math.random() * pool.length)];
    if (pool.length > 1 && this.currentQuote && nextQuote.id === this.currentQuote.id) {
      const altPool = pool.filter(q => q.id !== this.currentQuote.id);
      nextQuote = altPool[Math.floor(Math.random() * altPool.length)];
    }

    // Smooth fade transition
    this.quoteCard.classList.add("fade-out");
    setTimeout(() => {
      this.currentQuote = nextQuote;
      this.quoteText.textContent = nextQuote.text;
      this.quoteAuthor.textContent = `— ${nextQuote.author}`;
      this.quoteAuthorBio.textContent = nextQuote.bio || "";
      this.quoteCategory.textContent = nextQuote.category;

      this.updateFavoriteButtonState();
      this.quoteCard.classList.remove("fade-out");
    }, 180);
  }

  updateFavoriteButtonState() {
    if (!this.currentQuote) return;
    const isFav = this.favorites.some(f => f.id === this.currentQuote.id);
    if (isFav) {
      this.favCurrentBtn.classList.add("active");
      this.favIcon.className = "fa-solid fa-heart";
    } else {
      this.favCurrentBtn.classList.remove("active");
      this.favIcon.className = "fa-regular fa-heart";
    }
  }

  toggleFavoriteCurrent() {
    if (!this.currentQuote) return;
    const idx = this.favorites.findIndex(f => f.id === this.currentQuote.id);
    if (idx > -1) {
      this.favorites.splice(idx, 1);
      this.showToast("Removed from favorites.");
    } else {
      this.favorites.push(this.currentQuote);
      this.showToast("Saved to favorites!");
    }
    this.saveFavorites();
    this.updateFavoriteButtonState();
    this.updateFavBadge();
  }

  updateFavBadge() {
    const count = this.favorites.length;
    if (count > 0) {
      this.favBadge.textContent = count;
      this.favBadge.classList.remove("hidden");
    } else {
      this.favBadge.classList.add("hidden");
    }
  }

  toggleSpeech() {
    if (!('speechSynthesis' in window)) {
      this.showToast("Speech synthesis is not supported on your browser.");
      return;
    }

    if (this.isSpeaking) {
      window.speechSynthesis.cancel();
      this.isSpeaking = false;
      this.soundWave.classList.add("hidden");
      return;
    }

    if (!this.currentQuote) return;

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(`"${this.currentQuote.text}" by ${this.currentQuote.author}`);
    utterance.rate = 0.92;
    utterance.pitch = 1.0;

    utterance.onstart = () => {
      this.isSpeaking = true;
      this.soundWave.classList.remove("hidden");
    };

    utterance.onend = () => {
      this.isSpeaking = false;
      this.soundWave.classList.add("hidden");
    };

    utterance.onerror = () => {
      this.isSpeaking = false;
      this.soundWave.classList.add("hidden");
    };

    window.speechSynthesis.speak(utterance);
  }

  copyCurrentQuote() {
    if (!this.currentQuote) return;
    const formatted = `"${this.currentQuote.text}" — ${this.currentQuote.author}`;
    navigator.clipboard.writeText(formatted).then(() => {
      this.showToast("Quote copied to clipboard!");
    }).catch(() => {
      this.showToast("Failed to copy quote.");
    });
  }

  toggleAutoPlay() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
      this.autoPlayInterval = null;
      this.autoPlayBtn.classList.remove("active");
      this.autoPlayBtn.innerHTML = '<i class="fa-solid fa-play"></i> Auto-Play (Off)';
      this.showToast("Auto-play stopped.");
    } else {
      this.autoPlayInterval = setInterval(() => {
        this.displayRandomQuote();
      }, 7000);
      this.autoPlayBtn.classList.add("active");
      this.autoPlayBtn.innerHTML = '<i class="fa-solid fa-pause"></i> Auto-Play (On)';
      this.showToast("Auto-play started (every 7s).");
    }
  }

  // Social Sharing
  shareToTwitter() {
    if (!this.currentQuote) return;
    const text = encodeURIComponent(`"${this.currentQuote.text}" — ${this.currentQuote.author}\n\n#Quotes #Wisdom`);
    window.open(`https://twitter.com/intent/tweet?text=${text}`, "_blank");
    this.shareMenu.classList.add("hidden");
  }

  shareToLinkedIn() {
    if (!this.currentQuote) return;
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, "_blank");
    this.shareMenu.classList.add("hidden");
  }

  shareToWhatsApp() {
    if (!this.currentQuote) return;
    const text = encodeURIComponent(`"${this.currentQuote.text}" — ${this.currentQuote.author}`);
    window.open(`https://api.whatsapp.com/send?text=${text}`, "_blank");
    this.shareMenu.classList.add("hidden");
  }

  shareNative() {
    if (!this.currentQuote) return;
    if (navigator.share) {
      navigator.share({
        title: "Inspiring Quote",
        text: `"${this.currentQuote.text}" — ${this.currentQuote.author}`,
        url: window.location.href
      }).catch(() => {});
    } else {
      this.copyCurrentQuote();
    }
    this.shareMenu.classList.add("hidden");
  }

  // HTML5 Canvas Quote Image Generator
  generateQuoteImage() {
    if (!this.currentQuote) return;

    const canvas = this.quoteCanvas;
    const ctx = canvas.getContext("2d");
    const width = canvas.width;
    const height = canvas.height;

    // Background Gradient based on current theme
    const theme = document.body.getAttribute("data-theme") || "cosmic";
    const grad = ctx.createLinearGradient(0, 0, width, height);

    if (theme === "emerald") {
      grad.addColorStop(0, "#064e3b");
      grad.addColorStop(1, "#022c22");
    } else if (theme === "sunset") {
      grad.addColorStop(0, "#881337");
      grad.addColorStop(1, "#4c0519");
    } else if (theme === "cyberpunk") {
      grad.addColorStop(0, "#0f172a");
      grad.addColorStop(1, "#0284c7");
    } else if (theme === "minimal") {
      grad.addColorStop(0, "#1c1c1c");
      grad.addColorStop(1, "#121212");
    } else {
      grad.addColorStop(0, "#1e1b4b");
      grad.addColorStop(1, "#0f172a");
    }

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // Decorative border
    ctx.strokeStyle = "rgba(255, 255, 255, 0.15)";
    ctx.lineWidth = 4;
    ctx.strokeRect(60, 60, width - 120, height - 120);

    // Quote icon mark
    ctx.fillStyle = "rgba(255, 255, 255, 0.15)";
    ctx.font = "bold 160px Georgia";
    ctx.fillText("“", 120, 260);

    // Quote Text Wrapping
    ctx.fillStyle = "#ffffff";
    ctx.font = "italic 52px Georgia";
    ctx.textAlign = "center";

    const maxWidth = width - 260;
    const lineHeight = 74;
    const words = this.currentQuote.text.split(" ");
    let line = "";
    const lines = [];

    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + " ";
      const metrics = ctx.measureText(testLine);
      if (metrics.width > maxWidth && n > 0) {
        lines.push(line);
        line = words[n] + " ";
      } else {
        line = testLine;
      }
    }
    lines.push(line);

    // Render centered lines
    const startY = height / 2 - (lines.length * lineHeight) / 2 + 30;
    lines.forEach((l, i) => {
      ctx.fillText(l.trim(), width / 2, startY + (i * lineHeight));
    });

    // Author
    ctx.font = "bold 36px 'Plus Jakarta Sans', sans-serif";
    ctx.fillStyle = "#cbd5e1";
    ctx.fillText(`— ${this.currentQuote.author}`, width / 2, startY + (lines.length * lineHeight) + 60);

    // Bio
    if (this.currentQuote.bio) {
      ctx.font = "normal 24px 'Plus Jakarta Sans', sans-serif";
      ctx.fillStyle = "#94a3b8";
      ctx.fillText(this.currentQuote.bio, width / 2, startY + (lines.length * lineHeight) + 105);
    }

    // Branding Footer
    ctx.font = "bold 22px 'Plus Jakarta Sans', sans-serif";
    ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
    ctx.fillText("AuraQuotes • CodeAlpha Internship", width / 2, height - 100);

    // Download PNG
    const link = document.createElement("a");
    link.download = `Quote_${this.currentQuote.author.replace(/\s+/g, '_')}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();

    this.showToast("Quote image downloaded!");
  }

  // Modals
  openFavoritesModal() {
    this.favoritesList.innerHTML = "";
    if (this.favorites.length === 0) {
      this.favoritesList.innerHTML = `<p style="text-align:center; color:#94a3b8; padding: 20px;">No saved quotes yet. Click the heart icon on any quote!</p>`;
    } else {
      this.favorites.forEach(fav => {
        const item = document.createElement("div");
        item.className = "favorite-item";
        item.innerHTML = `
          <div>
            <div class="fav-item-quote">"${this.escapeHTML(fav.text)}"</div>
            <div class="fav-item-author">— ${this.escapeHTML(fav.author)}</div>
          </div>
          <button class="fav-item-del" onclick="app.removeFavorite('${fav.id}')" title="Delete">
            <i class="fa-solid fa-trash"></i>
          </button>
        `;
        this.favoritesList.appendChild(item);
      });
    }
    this.favoritesModal.classList.remove("hidden");
  }

  removeFavorite(id) {
    this.favorites = this.favorites.filter(f => f.id !== id);
    this.saveFavorites();
    this.updateFavBadge();
    this.updateFavoriteButtonState();
    this.openFavoritesModal();
    this.showToast("Removed from favorites.");
  }

  clearAllFavorites() {
    if (this.favorites.length === 0) return;
    if (!confirm("Clear all your saved quotes?")) return;
    this.favorites = [];
    this.saveFavorites();
    this.updateFavBadge();
    this.updateFavoriteButtonState();
    this.openFavoritesModal();
    this.showToast("All favorites cleared.");
  }

  openAddQuoteModal() {
    this.customQuoteText.value = "";
    this.customAuthorText.value = "";
    this.addQuoteModal.classList.remove("hidden");
    this.customQuoteText.focus();
  }

  handleSaveCustomQuote(e) {
    e.preventDefault();
    const text = this.customQuoteText.value.trim();
    const author = this.customAuthorText.value.trim();
    const cat = this.customCategorySelect.value;

    if (!text || !author) return;

    const newQuote = {
      id: "custom-" + Date.now(),
      text,
      author,
      bio: "Custom Added Quote",
      category: cat
    };

    this.quotes.unshift(newQuote);
    this.saveQuotes();
    this.currentQuote = newQuote;
    this.quoteText.textContent = newQuote.text;
    this.quoteAuthor.textContent = `— ${newQuote.author}`;
    this.quoteAuthorBio.textContent = newQuote.bio;
    this.quoteCategory.textContent = newQuote.category;
    this.updateFavoriteButtonState();

    this.closeAddQuoteModal();
    this.showToast("Custom quote saved and displayed!");
  }

  showToast(msg) {
    this.toast.textContent = msg;
    this.toast.classList.remove("hidden");
    clearTimeout(this.toastTimer);
    this.toastTimer = setTimeout(() => {
      this.toast.classList.add("hidden");
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

  closeFavoritesModal() { this.favoritesModal.classList.add("hidden"); }
  closeAddQuoteModal() { this.addQuoteModal.classList.add("hidden"); }
}

function closeFavoritesModal() { app.closeFavoritesModal(); }
function closeAddQuoteModal() { app.closeAddQuoteModal(); }

let app;
document.addEventListener("DOMContentLoaded", () => {
  app = new QuoteApp();
});

