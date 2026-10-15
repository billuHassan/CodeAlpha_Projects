/**
 * PulseFit Pro - Advanced Fitness & Activity Tracking Engine
 * CodeAlpha Internship Task 3
 */

// Initial Seed Data for realistic past 7 days
function generateSeedData() {
  const now = new Date();
  const logs = [];

  const activities = [
    { type: "Running", met: 9.8, duration: 35, cals: 380, notes: "Morning tempo run around park" },
    { type: "Weightlifting", met: 5.0, duration: 45, cals: 260, notes: "Chest, shoulders, and triceps" },
    { type: "Cycling", met: 7.5, duration: 40, cals: 340, notes: "Commute ride with interval hills" },
    { type: "HIIT", met: 8.5, duration: 25, cals: 245, notes: "Full body circuit training" },
    { type: "Yoga", met: 3.0, duration: 30, cals: 110, notes: "Evening recovery and stretching" },
    { type: "Swimming", met: 8.0, duration: 30, cals: 280, notes: "Freestyle laps endurance" }
  ];

  // Distribute over past 5 days
  for (let i = 4; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    d.setHours(8 + Math.floor(Math.random() * 8), Math.floor(Math.random() * 59));
    const act = activities[i % activities.length];

    logs.push({
      id: "log-" + (Date.now() - i * 86400000),
      type: act.type,
      duration: act.duration,
      calories: act.cals,
      date: d.toISOString(),
      notes: act.notes
    });
  }

  return {
    goals: {
      calories: 650,
      steps: 10000,
      minutes: 45,
      water: 2500
    },
    today: {
      steps: 6420,
      water: 1500
    },
    streak: 4,
    logs: logs
  };
}

class FitnessTrackerApp {
  constructor() {
    this.storageKey = "codealpha_fitness_data";
    this.state = this.loadState();

    this.cacheDOM();
    this.bindEvents();
    this.initDefaultDate();
    this.renderDashboard();
  }

  loadState() {
    try {
      const saved = localStorage.getItem(this.storageKey);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn("Could not load fitness data, seeding new data", e);
    }
    const seed = generateSeedData();
    this.saveState(seed);
    return seed;
  }

  saveState(data = this.state) {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(data));
    } catch (e) {
      console.error(e);
    }
  }

  cacheDOM() {
    // Header
    this.streakCount = document.getElementById("streakCount");
    this.openBmiBtn = document.getElementById("openBmiBtn");
    this.exportDataBtn = document.getElementById("exportDataBtn");
    this.openLogModalBtn = document.getElementById("openLogModalBtn");

    // Metrics Values & Bars
    this.valCalories = document.getElementById("valCalories");
    this.goalCalories = document.getElementById("goalCalories");
    this.barCalories = document.getElementById("barCalories");
    this.pctCalories = document.getElementById("pctCalories");

    this.valSteps = document.getElementById("valSteps");
    this.goalSteps = document.getElementById("goalSteps");
    this.barSteps = document.getElementById("barSteps");
    this.pctSteps = document.getElementById("pctSteps");
    this.quickAddStepBtn = document.getElementById("quickAddStepBtn");

    this.valMinutes = document.getElementById("valMinutes");
    this.goalMinutes = document.getElementById("goalMinutes");
    this.barMinutes = document.getElementById("barMinutes");
    this.pctMinutes = document.getElementById("pctMinutes");

    this.valWater = document.getElementById("valWater");
    this.goalWater = document.getElementById("goalWater");
    this.barWater = document.getElementById("barWater");
    this.pctWater = document.getElementById("pctWater");
    this.quickAddWaterBtn = document.getElementById("quickAddWaterBtn");

    // Rings
    this.svgRingCalories = document.getElementById("svgRingCalories");
    this.svgRingTime = document.getElementById("svgRingTime");
    this.svgRingSteps = document.getElementById("svgRingSteps");

    // Weekly Chart
    this.weeklyChartSvg = document.getElementById("weeklyChartSvg");

    // Table & Filters
    this.filterSearch = document.getElementById("filterSearch");
    this.filterType = document.getElementById("filterType");
    this.activityLogTbody = document.getElementById("activityLogTbody");

    // Log Modal
    this.logModal = document.getElementById("logModal");
    this.workoutForm = document.getElementById("workoutForm");
    this.workoutTypeSelect = document.getElementById("workoutTypeSelect");
    this.workoutDuration = document.getElementById("workoutDuration");
    this.workoutCalories = document.getElementById("workoutCalories");
    this.workoutDate = document.getElementById("workoutDate");
    this.workoutNotes = document.getElementById("workoutNotes");

    // Step Modal
    this.stepModal = document.getElementById("stepModal");
    this.stepForm = document.getElementById("stepForm");
    this.additionalStepsInput = document.getElementById("additionalStepsInput");

    // BMI Modal
    this.bmiModal = document.getElementById("bmiModal");
    this.bmiForm = document.getElementById("bmiForm");
    this.bmiWeight = document.getElementById("bmiWeight");
    this.bmiHeight = document.getElementById("bmiHeight");
    this.bmiResultBox = document.getElementById("bmiResultBox");
    this.bmiScore = document.getElementById("bmiScore");
    this.bmiStatus = document.getElementById("bmiStatus");
    this.bmiAdvice = document.getElementById("bmiAdvice");

    // Toast
    this.fitnessToast = document.getElementById("fitnessToast");
  }

  bindEvents() {
    // Buttons
    this.openLogModalBtn.addEventListener("click", () => this.openLogModal());
    this.quickAddStepBtn.addEventListener("click", () => this.openStepModal());
    this.quickAddWaterBtn.addEventListener("click", () => this.addWater(250));
    this.openBmiBtn.addEventListener("click", () => this.openBmiModal());
    this.exportDataBtn.addEventListener("click", () => this.exportToCSV());

    // Auto-calculate MET Calories when duration or activity changes
    this.workoutDuration.addEventListener("input", () => this.calcEstimatedCalories());
    this.workoutTypeSelect.addEventListener("change", () => this.calcEstimatedCalories());

    // Forms
    this.workoutForm.addEventListener("submit", (e) => this.handleSaveWorkout(e));
    this.stepForm.addEventListener("submit", (e) => this.handleAddSteps(e));
    this.bmiForm.addEventListener("submit", (e) => this.handleCalcBmi(e));

    // Filters
    this.filterSearch.addEventListener("input", () => this.renderTable());
    this.filterType.addEventListener("change", () => this.renderTable());
  }

  initDefaultDate() {
    const now = new Date();
    // Format to YYYY-MM-DDTHH:MM for input datetime-local
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    this.workoutDate.value = `${year}-${month}-${day}T${hours}:${minutes}`;
  }

  calcEstimatedCalories() {
    const duration = parseFloat(this.workoutDuration.value);
    if (!duration || duration <= 0) return;

    const selectedOpt = this.workoutTypeSelect.options[this.workoutTypeSelect.selectedIndex];
    const met = parseFloat(selectedOpt.dataset.met) || 6.0;

    // Standard formula: Cal = MET * 70kg * (Duration / 60)
    const estimated = Math.round(met * 70 * (duration / 60));
    this.workoutCalories.value = estimated;
  }

  getTodayStats() {
    const todayStr = new Date().toISOString().slice(0, 10);
    const todayLogs = this.state.logs.filter(l => l.date.startsWith(todayStr));

    const workoutCals = todayLogs.reduce((acc, curr) => acc + Number(curr.calories || 0), 0);
    const workoutMins = todayLogs.reduce((acc, curr) => acc + Number(curr.duration || 0), 0);

    // Estimate step calories burned: ~0.04 cal per step
    const stepCals = Math.round(this.state.today.steps * 0.04);
    const totalCals = workoutCals + stepCals;

    return {
      calories: totalCals,
      steps: this.state.today.steps,
      minutes: workoutMins,
      water: this.state.today.water
    };
  }

  renderDashboard() {
    const today = this.getTodayStats();
    const goals = this.state.goals;

    // Update streak
    this.streakCount.textContent = this.state.streak || 1;

    // Calories
    this.valCalories.textContent = today.calories.toLocaleString();
    this.goalCalories.textContent = goals.calories.toLocaleString();
    const calPct = Math.min(100, Math.round((today.calories / goals.calories) * 100));
    this.barCalories.style.width = `${calPct}%`;
    this.pctCalories.textContent = `${calPct}% of daily goal`;

    // Steps
    this.valSteps.textContent = today.steps.toLocaleString();
    this.goalSteps.textContent = goals.steps.toLocaleString();
    const stepPct = Math.min(100, Math.round((today.steps / goals.steps) * 100));
    this.barSteps.style.width = `${stepPct}%`;
    this.pctSteps.textContent = `${stepPct}% of daily goal`;

    // Minutes
    this.valMinutes.textContent = today.minutes;
    this.goalMinutes.textContent = goals.minutes;
    const minPct = Math.min(100, Math.round((today.minutes / goals.minutes) * 100));
    this.barMinutes.style.width = `${minPct}%`;
    this.pctMinutes.textContent = `${minPct}% of daily goal`;

    // Water
    this.valWater.textContent = today.water.toLocaleString();
    this.goalWater.textContent = goals.water.toLocaleString();
    const waterPct = Math.min(100, Math.round((today.water / goals.water) * 100));
    this.barWater.style.width = `${waterPct}%`;
    this.pctWater.textContent = `${waterPct}% hydrated`;

    // Update SVG Activity Rings
    this.updateActivityRings(calPct, minPct, stepPct);

    // Update Weekly Chart
    this.renderWeeklyChart();

    // Update Table
    this.renderTable();
  }

  updateActivityRings(calPct, minPct, stepPct) {
    // Circunferences:
    // r=80: 2*PI*80 = 502.65
    // r=62: 2*PI*62 = 389.55
    // r=44: 2*PI*44 = 276.46
    const offsetCal = 502.65 - (502.65 * (calPct / 100));
    const offsetEx = 389.55 - (389.55 * (minPct / 100));
    const offsetStep = 276.46 - (276.46 * (stepPct / 100));

    this.svgRingCalories.style.strokeDashoffset = offsetCal;
    this.svgRingTime.style.strokeDashoffset = offsetEx;
    this.svgRingSteps.style.strokeDashoffset = offsetStep;
  }

  renderWeeklyChart() {
    const daysData = [];
    const now = new Date();
    const daysName = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    for (let i = 6; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(d.getDate() - i);
      const isoDate = d.toISOString().slice(0, 10);
      const dayLabel = i === 0 ? "Today" : daysName[d.getDay()];

      // Aggregate calories for this day
      let cals = 0;
      if (i === 0) {
        cals = this.getTodayStats().calories;
      } else {
        const dayLogs = this.state.logs.filter(l => l.date.startsWith(isoDate));
        cals = dayLogs.reduce((acc, curr) => acc + Number(curr.calories || 0), 0);
        // add baseline steps calories
        cals += 300 + Math.floor(Math.sin(i) * 150);
      }

      daysData.push({
        label: dayLabel,
        calories: Math.max(150, cals),
        isToday: i === 0
      });
    }

    const maxCal = Math.max(800, ...daysData.map(d => d.calories));
    const svgHeight = 200;
    const barWidth = 36;
    const spacing = (500 - (7 * barWidth)) / 8;

    let svgInner = `
      <!-- Horizontal gridlines -->
      <line x1="20" y1="40" x2="480" y2="40" stroke="rgba(255,255,255,0.06)" stroke-dasharray="4" />
      <line x1="20" y1="100" x2="480" y2="100" stroke="rgba(255,255,255,0.06)" stroke-dasharray="4" />
      <line x1="20" y1="160" x2="480" y2="160" stroke="rgba(255,255,255,0.12)" />
    `;

    daysData.forEach((item, index) => {
      const x = spacing + index * (barWidth + spacing);
      const heightRatio = item.calories / maxCal;
      const barH = Math.max(12, Math.round(heightRatio * 120));
      const y = 160 - barH;

      const barClass = item.isToday ? "chart-bar bar-today" : "chart-bar";

      svgInner += `
        <g class="chart-group">
          <rect x="${x}" y="${y}" width="${barWidth}" height="${barH}" class="${barClass}">
            <title>${item.calories} kcal</title>
          </rect>
          <text x="${x + barWidth / 2}" y="${y - 8}" class="chart-val-label">${item.calories}</text>
          <text x="${x + barWidth / 2}" y="180" class="chart-label">${item.label}</text>
        </g>
      `;
    });

    this.weeklyChartSvg.innerHTML = svgInner;
  }

  renderTable() {
    const search = this.filterSearch.value.toLowerCase().trim();
    const typeFilter = this.filterType.value;

    let filtered = [...this.state.logs].reverse();

    if (typeFilter !== "all") {
      filtered = filtered.filter(l => l.type === typeFilter);
    }

    if (search) {
      filtered = filtered.filter(l => 
        l.type.toLowerCase().includes(search) || 
        (l.notes && l.notes.toLowerCase().includes(search))
      );
    }

    this.activityLogTbody.innerHTML = "";

    if (filtered.length === 0) {
      this.activityLogTbody.innerHTML = `
        <tr>
          <td colspan="6" style="text-align: center; color: var(--text-muted); padding: 30px;">
            No workout activities match your criteria.
          </td>
        </tr>
      `;
      return;
    }

    filtered.forEach(log => {
      const dateObj = new Date(log.date);
      const dateStr = dateObj.toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) + 
        " " + dateObj.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });

      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td><strong>${dateStr}</strong></td>
        <td>
          <span class="activity-badge">
            ${this.getActivityEmoji(log.type)} ${log.type}
          </span>
        </td>
        <td>${log.duration} mins</td>
        <td><strong style="color: var(--color-calories);">${log.calories} kcal</strong></td>
        <td style="color: var(--text-muted); font-size: 0.82rem;">${this.escapeHTML(log.notes || "—")}</td>
        <td>
          <button class="action-icon-btn" onclick="app.deleteWorkout('${log.id}')" title="Delete entry">
            <i class="fa-solid fa-trash"></i>
          </button>
        </td>
      `;
      this.activityLogTbody.appendChild(tr);
    });
  }

  getActivityEmoji(type) {
    switch (type) {
      case "Running": return "🏃";
      case "Cycling": return "🚴";
      case "Weightlifting": return "🏋️";
      case "HIIT": return "⚡";
      case "Swimming": return "🏊";
      case "Yoga": return "🧘";
      case "Walking": return "🚶";
      default: return "✨";
    }
  }

  handleSaveWorkout(e) {
    e.preventDefault();
    const type = this.workoutTypeSelect.value;
    const duration = parseInt(this.workoutDuration.value);
    const calories = parseInt(this.workoutCalories.value);
    const date = this.workoutDate.value ? new Date(this.workoutDate.value).toISOString() : new Date().toISOString();
    const notes = this.workoutNotes.value.trim();

    if (!type || !duration || isNaN(calories)) return;

    const newLog = {
      id: "log-" + Date.now(),
      type,
      duration,
      calories,
      date,
      notes
    };

    this.state.logs.push(newLog);
    this.saveState();
    this.renderDashboard();
    this.closeLogModal();
    this.showToast(`Logged ${duration}m of ${type}! 🔥`);
  }

  deleteWorkout(id) {
    if (!confirm("Are you sure you want to delete this workout log?")) return;
    this.state.logs = this.state.logs.filter(l => l.id !== id);
    this.saveState();
    this.renderDashboard();
    this.showToast("Workout entry deleted.");
  }

  handleAddSteps(e) {
    e.preventDefault();
    const steps = parseInt(this.additionalStepsInput.value);
    if (!steps || steps <= 0) return;

    this.state.today.steps += steps;
    this.saveState();
    this.renderDashboard();
    this.closeStepModal();
    this.showToast(`Added ${steps.toLocaleString()} steps! 👟`);
  }

  addWater(amount) {
    this.state.today.water += amount;
    this.saveState();
    this.renderDashboard();
    this.showToast(`Logged +${amount}ml water! 💧`);
  }

  handleCalcBmi(e) {
    e.preventDefault();
    const w = parseFloat(this.bmiWeight.value);
    const h = parseFloat(this.bmiHeight.value) / 100; // to meters

    if (!w || !h) return;

    const bmi = (w / (h * h)).toFixed(1);
    this.bmiScore.textContent = bmi;

    let status = "";
    let color = "";
    let advice = "";

    if (bmi < 18.5) {
      status = "Underweight";
      color = "#38bdf8";
      advice = "Aim for a nutrient-dense caloric surplus with progressive resistance training.";
    } else if (bmi <= 24.9) {
      status = "Normal Weight";
      color = "#10b981";
      advice = "Healthy balanced state! Maintain with 150+ minutes of weekly active training.";
    } else if (bmi <= 29.9) {
      status = "Overweight";
      color = "#f59e0b";
      advice = "Target a moderate caloric deficit with regular cardio, hydration, and strength workouts.";
    } else {
      status = "Obese";
      color = "#ef4444";
      advice = "Consult a health professional for a tailored sustainable diet and exercise regimen.";
    }

    this.bmiStatus.textContent = status;
    this.bmiStatus.style.background = `${color}25`;
    this.bmiStatus.style.color = color;
    this.bmiScore.style.color = color;
    this.bmiAdvice.textContent = advice;

    this.bmiResultBox.classList.remove("hidden");
  }

  exportToCSV() {
    if (this.state.logs.length === 0) {
      this.showToast("No workout records to export.");
      return;
    }

    let csv = "ID,Date,Activity,Duration_Minutes,Calories_Burned,Notes\n";
    this.state.logs.forEach(l => {
      const sanitizedNotes = (l.notes || "").replace(/"/g, '""');
      csv += `"${l.id}","${l.date}","${l.type}",${l.duration},${l.calories},"${sanitizedNotes}"\n`;
    });

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `PulseFit_Workout_History_${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    this.showToast("Workout history exported to CSV!");
  }

  // Modals
  openLogModal() {
    this.initDefaultDate();
    this.workoutDuration.value = "";
    this.workoutCalories.value = "";
    this.workoutNotes.value = "";
    this.logModal.classList.remove("hidden");
  }

  closeLogModal() { this.logModal.classList.add("hidden"); }

  openStepModal() {
    this.additionalStepsInput.value = "";
    this.stepModal.classList.remove("hidden");
  }

  closeStepModal() { this.stepModal.classList.add("hidden"); }

  openBmiModal() {
    this.bmiModal.classList.remove("hidden");
  }

  closeBmiModal() { this.bmiModal.classList.add("hidden"); }

  showToast(msg) {
    this.fitnessToast.textContent = msg;
    this.fitnessToast.classList.remove("hidden");
    clearTimeout(this.toastTimer);
    this.toastTimer = setTimeout(() => {
      this.fitnessToast.classList.add("hidden");
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

// Global modal helpers
function closeLogModal() { app.closeLogModal(); }
function closeStepModal() { app.closeStepModal(); }
function closeBmiModal() { app.closeBmiModal(); }
function setStepInput(val) { app.additionalStepsInput.value = val; }

let app;
document.addEventListener("DOMContentLoaded", () => {
  app = new FitnessTrackerApp();
});

