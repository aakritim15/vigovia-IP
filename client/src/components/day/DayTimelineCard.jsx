import React from 'react'
import './style.css'

function formatDateLabel(input) {
  const tryParse = (str) => {
    const d = new Date(str)
    if (!isNaN(d)) return d
    const m = str.match(/^(\d{1,2})[\/-](\d{1,2})[\/-](\d{4})$/)
    if (m) return new Date(`${m[3]}-${m[2]}-${m[1]}`)
    return null
  }
  const d = typeof input === 'string' ? tryParse(input) : input
  if (!d) return input || ''
  const day = d.getDate()
  const month = d.toLocaleString('default', { month: 'short' })
  const suffix = (n) =>
    (n % 10 === 1 && n % 100 !== 11) ? 'st' :
    (n % 10 === 2 && n % 100 !== 12) ? 'nd' :
    (n % 10 === 3 && n % 100 !== 13) ? 'rd' : 'th'
  return `${day}${suffix(day)} ${month}`
}

const DayTimelineCard = ({ dayNumber, date, activities, subtitle, imageUrl }) => {
  return (
    <div className="day-card">
      {/* vertical day pill on the far left */}
      <div className="day-strip"><span className="label">{`Day ${dayNumber}`}</span></div>

      {/* left column: image + date circle */}
      <div className="left-col">
        <div
          className="day-image"
          aria-hidden="true"
          style={imageUrl ? { backgroundImage: `url(${imageUrl})` } : {}}
        />
        <div className="date-badge">{formatDateLabel(date)}</div>
      </div>

      {/* middle column: vertical dotted timeline with 3 nodes */}
      <div className="timeline">
        <span className="timeline-dot" style={{ top: '12%' }} />
        <span className="timeline-dot" style={{ top: '50%' }} />
        <span className="timeline-dot" style={{ top: '88%' }} />
      </div>

      {/* right column: vertical section of slots */}
      <div className="day-content">
        {subtitle ? <div className="subtitle">{subtitle}</div> : null}
        <div className="vertical-slots">
          <div className="slot">
            <div className="slot-title">Morning</div>
            <div className="slot-text">{activities?.morning || '-'}</div>
          </div>
          <div className="slot">
            <div className="slot-title">Afternoon</div>
            <div className="slot-text">{activities?.afternoon || '-'}</div>
          </div>
          <div className="slot">
            <div className="slot-title">Evening</div>
            <div className="slot-text">{activities?.evening || '-'}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DayTimelineCard


