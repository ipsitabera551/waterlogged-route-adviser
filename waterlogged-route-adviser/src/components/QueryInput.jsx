import React, { useState } from 'react';
import { Search, Sparkles, Send } from 'lucide-react';
import { SAMPLE_QUERIES } from '../data/sampleQueries';

export default function QueryInput({ onAnalyzeQuery, currentQuery }) {
  const [inputVal, setInputVal] = useState(currentQuery || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputVal.trim()) {
      onAnalyzeQuery(inputVal);
    }
  };

  const handleSelectSample = (sampleText) => {
    setInputVal(sampleText);
    onAnalyzeQuery(sampleText);
  };

  return (
    <div className="glass-card">
      <div className="card-header">
        <h2 className="card-title">
          <Sparkles size={18} style={{ color: '#00f2fe' }} />
          <span>Gemini Natural Language Commute Query</span>
        </h2>
        <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Powered by Gemini AI</span>
      </div>

      <form onSubmit={handleSubmit} className="query-box">
        <div className="input-group">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            className="query-input"
            placeholder="e.g. Traveling from Salt Lake Sector V to Park Circus on a scooter..."
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
          />
          <button
            type="submit"
            className="btn btn-primary"
            style={{ position: 'absolute', right: '6px', padding: '8px 14px' }}
          >
            <Send size={15} />
            <span>Analyze</span>
          </button>
        </div>

        <div>
          <p style={{ fontSize: '0.76rem', color: '#94a3b8', marginBottom: '6px', fontWeight: 600 }}>
            💡 Try Hackathon Sample Prompts:
          </p>
          <div className="sample-pills">
            {SAMPLE_QUERIES.map((sq) => (
              <button
                key={sq.id}
                type="button"
                className="sample-pill"
                onClick={() => handleSelectSample(sq.query)}
              >
                {sq.title}
              </button>
            ))}
          </div>
        </div>
      </form>
    </div>
  );
}
