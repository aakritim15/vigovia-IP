import React from 'react'
import DayTimelineCard from './DayTimelineCard'
import './style.css'

const DayTimelineSection = ({ formData }) => {
  const fallbackCity = formData?.destination || formData?.arrivalCity || 'City'

  const suggestions = [
    formData?.arrivalCity ? `Arrival in ${formData.arrivalCity} & City Exploration` : 'Arrival & City Exploration',
    `${fallbackCity} City Excursion`,
    'Gardens By The Bay + Marina Bay',
  ]

  return (
    <div className="day-section">
      {formData?.days?.map((day, idx) => (
        <DayTimelineCard
          key={idx}
          dayNumber={idx + 1}
          date={day.date}
          activities={day.activities}
          subtitle={day.subtitle || suggestions[idx] || `${fallbackCity} Day ${idx + 1}`}
        />
      ))}
    </div>
  )
}

export default DayTimelineSection