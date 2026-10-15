# CodeAlpha_FitnessTrackerApp 🏃‍♂️

> **PulseFit Pro** — A modern, high-performance fitness dashboard and activity logging application built for the **CodeAlpha App Development Internship**.

![CodeAlpha Badge](https://img.shields.io/badge/CodeAlpha-App%20Development%20Internship-4f46e5?style=for-the-badge)
![Task](https://img.shields.io/badge/Task%203-Fitness%20Tracker%20App-10b981?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Completed%20%26%20Enhanced-10b981?style=for-the-badge)

---

## 📌 Project Overview & Task Specifications

This application fulfills and exceeds all requirements defined under **TASK 3: Fitness Tracker App**:

- ✅ **Daily Fitness Activity Tracking**: Tracks steps, workouts, active duration, and calories burned against configurable daily targets.
- ✅ **Manual Fitness Data Logging**: Intuitive modals to log workouts (duration, exercise type, calories, notes) and quick-log step increments.
- ✅ **Dashboard Summary Screen**: Dynamic summary screen displaying real-time daily metrics, hydration, and past 7-day progress.
- ✅ **Visual Elements (Graphs & Progress Bars)**: Includes Apple-Fitness-style 3-Ring SVG visualizers, animated progress bars, and responsive SVG weekly bar charts.
- ✅ **Local Storage Persistence**: All logs, step counts, hydration data, and streak progress persist automatically in browser `localStorage`.

---

## 🌟 Outstanding & Unique Features (Bonus)

1. **Apple-Fitness-Style 3-Ring SVG Visualizer**:
   - Outer Ring: Move (Total Calories Burned)
   - Middle Ring: Exercise (Active Minutes)
   - Inner Ring: Steps Goal
   - Smooth `stroke-dashoffset` circular animations reflecting goal completion percentages.
2. **Weekly 7-Day SVG Bar Chart**:
   - Zero-dependency, ultra-lightweight SVG chart comparing calorie burns across the week with distinct highlighting for today.
3. **MET-Based Automatic Calorie Estimator**:
   - Calculates calories burned in real-time based on Metabolic Equivalent of Task (MET) ratings for running, cycling, swimming, weightlifting, HIIT, yoga, and walking.
4. **Water Hydration Tracker**:
   - 1-click quick add (+250ml glass) with progress bar tracking toward the daily 2,500ml hydration goal.
5. **Interactive BMI & Caloric Needs Calculator**:
   - Computes Body Mass Index (BMI) with category status (Underweight, Normal, Overweight, Obese) and provides actionable fitness recommendations.
6. **Comprehensive Activity History Log**:
   - Filter by workout type, live instant search, and one-click deletion with dynamic dashboard recalculation.
7. **CSV Data Export**:
   - Export your entire fitness and workout history as a standardized `.csv` spreadsheet ready for Excel, Google Sheets, or fitness trainers.
8. **Workout Streak Tracker**:
   - Visual fire badge tracking continuous daily workout streaks to build lasting habits.

---

## 🛠️ Tech Stack

- **HTML5**: Semantic tags, Accessible SVG graphics (`viewBox`, `stroke-dasharray`).
- **CSS3**: Custom CSS Properties, Glassmorphism, CSS Grid, Flexbox, Micro-interactions.
- **JavaScript (ES6+)**: Pure Object-Oriented JS, LocalStorage API, Blob API (for CSV download).

---

## 🚀 How to Run Locally

1. **Clone the repository**:
   ```bash
   git clone https://github.com/YourUsername/CodeAlpha_FitnessTrackerApp.git
   cd CodeAlpha_FitnessTrackerApp
   ```
2. **Open `index.html`** directly in any modern browser, or launch a local server:
   ```bash
   python -m http.server 8080
   ```
3. Visit [http://localhost:8080](http://localhost:8080).

---

## 📁 Repository Structure

```
CodeAlpha_FitnessTrackerApp/
├── index.html       # Primary dashboard layout and modals
├── style.css        # Responsive dashboard styling & SVG ring definitions
├── app.js           # State management, MET engine, chart builder & CSV export
└── README.md        # Comprehensive documentation
```

---

## 🎥 LinkedIn Video Explanation Template

> **Excited to present my project completed during the @CodeAlpha App Development Internship!** 🏃‍♂️
>
> 💡 I developed **PulseFit Pro** (Task 3: Fitness Tracker App). In addition to workout logging and daily statistics, I engineered:
> - Interactive Apple-Fitness-style 3-Ring SVG visualizers
> - MET-based automatic calorie calculation for diverse sports activities
> - Responsive 7-day SVG weekly bar chart
> - Built-in BMI calculator and 1-click CSV health data exporter
>
> 📂 GitHub Repository: [Link to your repo]
>
> #CodeAlpha #AppDevelopment #JavaScript #CSS3 #HTML5 #FitnessTech #Internship

