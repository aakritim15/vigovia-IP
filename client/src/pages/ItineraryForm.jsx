import { useState } from 'react';
import FormHeader from '../components/form/FormHeader';
import PDFPreview from '../components/form/PDFPreview';
import FormFooter from '../components/form/FormFooter';
import Box from '../components/Box/Box';
import DayTimelineSection from '../components/day/DayTimelineSection';

const ItineraryForm = () => {
  // State to manage form data
  const [formData, setFormData] = useState({
    tripTitle: 'Singapore Adventure',
    duration: '5 days',
    travelers: '2 adults',
    departureDate: '2024-11-01',
    departureCity: 'Delhi',
    arrivalCity: 'Singapore',
    days: [
      {
        date: '2024-11-01',
        activities: {
          morning: 'City Tour',
          afternoon: 'Gardens by the Bay',
          evening: 'Marina Bay Light Show'
        },
        hotel: 'Marina Bay Sands'
      },
      {
        date: '2024-11-02',
        activities: {
          morning: 'Sentosa Island',
          afternoon: 'Universal Studios',
          evening: 'Night Safari'
        },
        hotel: 'Marina Bay Sands'
      },
      {
        date: '2024-11-03',
        activities: {
          morning: 'Shopping at Orchard Road',
          afternoon: 'Singapore Flyer',
          evening: 'Clarke Quay Dinner'
        },
        hotel: 'Marina Bay Sands'
      }
    ],
    hotels: [
      {
        city: 'Singapore',
        checkIn: '2024-11-01',
        checkOut: '2024-11-05',
        nights: '4',
        hotelName: 'Marina Bay Sands'
      }
    ],
    payments: [
      {
        amount: '1500',
        dueDate: '2024-10-15',
        description: 'Initial Deposit'
      },
      {
        amount: '1500',
        dueDate: '2024-10-30',
        description: 'Final Payment'
      }
    ],
    inclusions: ['Return Flights', 'Hotel Accommodation', 'Daily Breakfast', 'Airport Transfers'],
    exclusions: ['Travel Insurance', 'Personal Expenses', 'Optional Tours']
  });

  return (
    <div className="min-h-screen bg-white pb-24">
      <FormHeader />
      <Box formData={formData} />
      <DayTimelineSection formData={formData} />
      <PDFPreview formData={formData} />
      <FormFooter />
    </div>
  );
};

export default ItineraryForm;