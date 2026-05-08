function Insights({ tabSwitches, focusScore, distractionTime }) {
  const getInsights = () => {
    const insights = [];

    if (tabSwitches > 20) {
      insights.push({
        type: 'warning',
        message: 'You are switching tabs frequently. Try to stay focused!'
      });
    }

    if (focusScore > 80) {
      insights.push({
        type: 'positive',
        message: 'Great focus today! Keep it up!'
      });
    }

    if (distractionTime > 10) {
      insights.push({
        type: 'warning',
        message: 'You are getting distracted frequently. Consider taking breaks.'
      });
    }

    if (focusScore < 40) {
      insights.push({
        type: 'negative',
        message: 'Your focus score is low. Try the Pomodoro technique!'
      });
    }

    if (insights.length === 0) {
      insights.push({
        type: 'neutral',
        message: 'Keep working on your focus habits!'
      });
    }

    return insights;
  };

  const insights = getInsights();

  return (
    <div className="insights-section">
      <h3>Smart Insights</h3>
      <div className="insights-list">
        {insights.map((insight, index) => (
          <div key={index} className={`insight ${insight.type}`}>
            <span className="insight-icon">
              {insight.type === 'positive' ? '✅' : insight.type === 'warning' ? '⚠️' : '💡'}
            </span>
            <span className="insight-message">{insight.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Insights;
