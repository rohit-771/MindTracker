function StatsCard({ title, value, type }) {
  const getCardStyle = () => {
    switch (type) {
      case 'study':
        return { gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: '#fff' };
      case 'distraction':
        return { gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', color: '#fff' };
      case 'switches':
        return { gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', color: '#fff' };
      case 'score':
        return { gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)', color: '#fff' };
      default:
        return { gradient: 'linear-gradient(135deg, #fff 0%, #f8f9fa 100%)', color: '#333' };
    }
  };

  const style = getCardStyle();

  return (
    <div className="stats-card" style={{ background: style.gradient, color: style.color }}>
      <h3>{title}</h3>
      <p>{value}</p>
    </div>
  );
}

export default StatsCard;
