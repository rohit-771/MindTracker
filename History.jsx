import { useMemo } from 'react';

function History() {
  const history = useMemo(() => {
    // Load last 7 days - show all days even if no data
    const data = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateKey = date.toISOString().split('T')[0];
      const dayData = JSON.parse(localStorage.getItem(`daily-${dateKey}`)) || {
        studyTime: 0,
        distractionTime: 0,
        focusScore: 0,
        tabSwitches: 0
      };
      data.push({
        date: date.toLocaleDateString(),
        ...dayData
      });
    }
    return data;
  }, []);

  return (
    <div className="history-section">
      <h3>Daily History (Last 7 Days)</h3>
      {history.length === 0 ? (
        <p>No history available yet. Complete some study sessions!</p>
      ) : (
        <div className="history-list">
          {history.map((day, index) => (
            <div key={index} className="history-item">
              <div className="history-date">{day.date}</div>
              <div className="history-stats">
                <span>Study: {Math.floor(day.studyTime / 60)}m</span>
                <span>Distraction: {day.distractionTime.toFixed(1)}m</span>
                <span>Focus: {day.focusScore.toFixed(1)}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default History;
