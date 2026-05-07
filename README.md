# MindTracker

A simple React.js frontend application for smart study tracking that measures focus instead of just time.

## Features

- **Dashboard**: Displays study time, distraction time, tab switches, and focus score.
- **Focus Score**: Calculated as 100 - (distractionTime * 0.5) - (tabSwitches * 2).
- **Pomodoro Timer**: 25-minute timer with start, pause, and reset functionality.
- **Tab Switch Detection**: Tracks tab switches and time spent away from the tab using visibilitychange event.
- **Data Persistence**: Saves data to localStorage.
- **Charts**: Bar chart showing study vs distraction time using Recharts.

## Project Structure

```
src/
├── components/
│   ├── Dashboard.jsx
│   ├── FocusChart.jsx
│   ├── Goal.jsx
│   ├── History.jsx
│   ├── Insights.jsx
│   ├── StatsCard.jsx
│   ├── Streak.jsx
│   ├── Timer.jsx
│   └── Weekly.jsx
│
├── hooks/
│   └── useFocusTracker.js
│
├── utils/
│
├── App.jsx
├── App.css
├── index.css
└── main.jsx
```

## Usage

- Start the timer to begin a study session.
- Switch tabs to simulate distractions; the app will track them.
- View stats on the dashboard.
- Data is automatically saved to localStorage.
