import React from 'react'
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer'

const styles = StyleSheet.create({
  page: {
    padding: 24,
    fontSize: 12,
    color: '#222'
  },
  title: {
    fontSize: 18,
    marginBottom: 8,
    fontWeight: 'bold'
  },
  subtitle: {
    fontSize: 12,
    marginBottom: 16,
    color: '#555'
  },
  sectionTitle: {
    fontSize: 14,
    marginTop: 12,
    marginBottom: 6,
    fontWeight: 'bold'
  },
  item: {
    marginBottom: 4
  }
})

const ItineraryPdf = ({ formData }) => {
  const days = Array.isArray(formData?.days) ? formData.days : []
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>{formData?.tripTitle || 'Trip Itinerary'}</Text>
        <Text style={styles.subtitle}>{formData?.duration || ''} • {formData?.travelers || ''}</Text>

        <Text style={styles.sectionTitle}>Schedule</Text>
        {days.map((d, idx) => (
          <View key={idx} wrap={false}>
            <Text style={styles.item}>Day {idx + 1} - {d?.date}</Text>
            <Text style={styles.item}>  Morning: {d?.activities?.morning || '-'}</Text>
            <Text style={styles.item}>  Afternoon: {d?.activities?.afternoon || '-'}</Text>
            <Text style={styles.item}>  Evening: {d?.activities?.evening || '-'}</Text>
          </View>
        ))}
      </Page>
    </Document>
  )
}

export default ItineraryPdf