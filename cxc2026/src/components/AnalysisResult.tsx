import './AnalysisResult.css'
import type { RealFoodAnalysis } from '../types'

interface Props {
  data: RealFoodAnalysis | null // We now expect the full object, not just a list
  loading: boolean
  error: string
}

export default function AnalysisResults({ data, loading, error }: Props) {
  
  // Helper for Score Color
  const getScoreColor = (score: number) => {
    if (score >= 80) return '#2ecc71'; // Green
    if (score >= 50) return '#f1c40f'; // Yellow
    return '#e74c3c'; // Red
  }

  // Loading State
  if (loading) return (
    <div className="results-container loading">
      <div className="spinner">🧠</div>
      <p>Analyzing Real Food Score...</p>
    </div>
  )

  // Error State
  if (error) return <div className="results-container error"><p>⚠️ {error}</p></div>

  // Empty State
  if (!data) return null;

  const { score, bar, reasons, ingredients_breakdown } = data;

  return (
    <div className="results-container">
      
      {/* 1. BIG SCORE CARD */}
      <div className="score-card">
        <h3 className="card-title">Real Food Score</h3>
        <div className="score-circle" style={{ borderColor: getScoreColor(score) }}>
          <span className="score-number" style={{ color: getScoreColor(score) }}>
            {score}
          </span>
          <span className="score-label">/ 100</span>
        </div>
      </div>

      {/* 2. THE VISUAL BAR (Positive vs Negative) */}
      <div className="bar-section">
        <div className="bar-labels">
            <span style={{color: '#2ecc71'}}>Healthy Signs</span>
            <span style={{color: '#e74c3c'}}>Processing Signs</span>
        </div>
        <div className="progress-bar-container">
            {/* Green Bar (Positive) */}
            <div 
                className="bar-segment positive" 
                style={{ flex: bar.positive_ratio || 0.5 }}
            />
            {/* Red Bar (Negative) */}
            <div 
                className="bar-segment negative" 
                style={{ flex: bar.negative_ratio || 0.5 }}
            />
        </div>
      </div>

      {/* 3. TOP REASONS (Bullet Points) */}
      <div className="reasons-section">
        {reasons.positives.length > 0 && (
            <div className="reason-box good">
                <h4>✅ Why it's good</h4>
                <ul>
                    {reasons.positives.map((r, i) => <li key={i}>{r}</li>)}
                </ul>
            </div>
        )}
        {reasons.concerns.length > 0 && (
            <div className="reason-box bad">
                <h4>⚠️ Concerns</h4>
                <ul>
                    {reasons.concerns.map((r, i) => <li key={i}>{r}</li>)}
                </ul>
            </div>
        )}
      </div>

      {/* 4. INGREDIENT BREAKDOWN (Dropdowns) */}
      <h3 className="section-header">Ingredient Breakdown</h3>
      
      {/* A. Concerning Ingredients */}
      <IngredientDropdown 
        title="⚠️ Concerning Additives" 
        items={ingredients_breakdown.concerning} 
        color="red"
        isOpen={true} // Default open
      />

      {/* B. Helpful Ingredients */}
      <IngredientDropdown 
        title="🥗 Whole Foods / Helpful" 
        items={ingredients_breakdown.helpful} 
        color="green" 
      />

      {/* C. Mixed / Neutral */}
      <IngredientDropdown 
        title="🤷 Mixed / Complex" 
        items={ingredients_breakdown.mixed} 
        color="orange" 
      />
      
      <IngredientDropdown 
        title="🧂 Neutral (Water/Salt)" 
        items={ingredients_breakdown.neutral} 
        color="grey" 
      />

    </div>
  )
}

// Mini Component for the Dropdowns
function IngredientDropdown({ title, items, color, isOpen = false }: any) {
    if (!items || items.length === 0) return null;
    
    return (
        <details className={`ing-dropdown ${color}`} open={isOpen}>
            <summary>
                {title} 
                <span className="count-badge">{items.length}</span>
            </summary>
            <div className="dropdown-content">
                {items.map((item: string, i: number) => (
                    <div key={i} className="ing-chip">{item}</div>
                ))}
            </div>
        </details>
    )
}