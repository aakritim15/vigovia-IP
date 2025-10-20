import { PDFViewer } from '@react-pdf/renderer';
import ItineraryPdf from '../pdf/ItineraryPdf';

const ItineraryPdfRenderer = ({ formData }) => {
  return (
    <div className="w-full h-screen">
      <PDFViewer style={{ width: '100%', height: '100%' }}>
        <ItineraryPdf formData={formData} />
      </PDFViewer>
    </div>
  );
};

export default ItineraryPdfRenderer;