import React, { useRef, useState, useEffect } from 'react'
import TripSummary from '../components/TripSummary'
import DayTimelineCard from '../components/DayTimelineCard'
import FlightItineraryItem from '../components/FlightItineraryItem'
import CsvPillTable from '../components/CsvPillTable'

/* ---------------- CSV seeds ---------------- */
const header1 = 'City,Check In,Check Out,Nights,Hotel Name'
const header2 = 'Point,Details'
const header3 = 'Service,Details'
const header4 = 'Category,Count,Details,Status / Comments'
const header5 = 'City,Activity,Type,Time Required'
const header6 = 'Installment,Amount,Due Date'

const initialTable1 = `${header1}
Singapore,24/02/2024,26/02/2024,2,"Super Townhouse Oak
Vashi Formerly Blue Diamond"
Singapore,24/02/2024,26/02/2024,2,"Super Townhouse Oak
Vashi Formerly Blue Diamond"
Singapore,24/02/2024,26/02/2024,2,"Super Townhouse Oak
Vashi Formerly Blue Diamond"
Singapore,24/02/2024,26/02/2024,2,"Super Townhouse Oak
Vashi Formerly Blue Diamond"
Singapore,24/02/2024,26/02/2024,2,"Super Townhouse Oak
Vashi Formerly Blue Diamond"
`;

const initialTable2 = `${header2}
Airlines Standard Policy,"In Case Of Visa Rejection, Visa Fees Or Any Other Non Cancellable Component Cannot Be Reimbursed At Any  Cost."
Flight/Hotel Cancellation,"In Case Of Visa Rejection, Visa Fees Or Any Other Non Cancellable Component Cannot Be Reimbursed At Any  Cost."
Trip Insurance,"In Case Of Visa Rejection, Visa Fees Or Any Other Non Cancellable Component Cannot Be Reimbursed At Any  Cost."
Hotel Check-In & Check Out,"In Case Of Visa Rejection, Visa Fees Or Any Other Non Cancellable Component Cannot Be Reimbursed At Any  Cost."
Visa Rejection,"In Case Of Visa Rejection, Visa Fees Or Any Other Non Cancellable Component Cannot Be Reimbursed At Any  Cost."
`;

const initialTable3 = `${header3}
Flight Tickets And Hotel Vouchers,"Delivered 3 Days Post Full Payment"
Web Check-In,"Boarding Pass Delivery Via Email/WhatsApp"
Support,"Chat Support – Response Time: 4 Hours"
Cancellation Support,"Provided"
Trip Support,"Response Time: 5 Minutes"
`;

const initialTable4 = `${header4}
Flight,2,"All Flights Mentioned","Awaiting Confirmation"
Tourist Tax,2,"Yotel (Singapore), Oakwood (Sydney), Mercure (Cairns), Novotel (Gold Coast), Holiday Inn (Melbourne)","Awaiting Confirmation"
Hotel,2,"Airport To Hotel - Hotel To Attractions - Day Trips If Any","Included"
`;

const initialTable5 = `${header5}
Rio De Janeiro,"Sydney Harbour Cruise & Taronga  Zoo","Nature/Sightseeing","2-3 Hours"
Rio De Janeiro,"Sydney Harbour Cruise & Taronga  Zoo","Airlines Standard","2-3 Hours"
Rio De Janeiro,"Sydney Harbour Cruise & Taronga  Zoo","Airlines Standard","2-3 Hours"
Rio De Janeiro,"Sydney Harbour Cruise & Taronga  Zoo","Airlines Standard","2-3 Hours"
Rio De Janeiro,"Sydney Harbour Cruise & Taronga  Zoo","Airlines Standard","2-3 Hours"
Rio De Janeiro,"Sydney Harbour Cruise & Taronga  Zoo","Airlines Standard","2-3 Hours"
Rio De Janeiro,"Sydney Harbour Cruise & Taronga  Zoo","Airlines Standard","2-3 Hours"
Rio De Janeiro,"Sydney Harbour Cruise & Taronga  Zoo","Airlines Standard","2-3 Hours"
Rio De Janeiro,"Sydney Harbour Cruise & Taronga  Zoo","Airlines Standard","2-3 Hours"
Rio De Janeiro,"Sydney Harbour Cruise & Taronga  Zoo","Airlines Standard","2-3 Hours"
Rio De Janeiro,"Sydney Harbour Cruise & Taronga  Zoo","Airlines Standard","2-3 Hours"
`;

const initialTable6 = `${header6}
Installment 1,"₹3,50,000","Initial Payment"
Installment 2,"₹4,00,000","Post Visa Approval"
Installment 3,"Remaining","20 Days Before Departure"
`;

/* ---------- helpers to enforce locked headers ---------- */
const keepHeader = (csv, headerLine) => {
  const lines = (csv ?? '').split(/\r?\n/)
  if (!lines.length) return headerLine
  lines[0] = headerLine
  // strip trailing blank lines to avoid extra empty row
  while (lines.length && lines[lines.length - 1].trim() === '') lines.pop()
  return lines.join('\n')
}

/** Minimal print CSS; browser handles pagination/margins */
function PrintStyles() {
  useEffect(() => {
    const id = 'itinerary-print-css'
    if (document.getElementById(id)) return
    const style = document.createElement('style')
    style.id = id
    style.type = 'text/css'
    style.textContent = `
      @media print {
        * { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
        .no-print { display: none !important; }
        .avoid-break { break-inside: avoid-page; page-break-inside: avoid; }
        h1, h2, h3 { break-after: avoid; }
        img { max-width: 100% !important; height: auto !important; }
        .overflow-hidden { overflow: visible !important; }
      }
    `
    document.head.appendChild(style)
  }, [])
  return null
}

function EditBar({ editing, onEdit, onSave, onCancel }) {
  return (
    <div className="sticky top-0 z-50 flex justify-end w-full bg-white/60 backdrop-blur supports-[backdrop-filter]:bg-white/40 no-print">
      <div className="w-[min(100%,1120px)] mx-auto px-2 py-2 flex gap-2 justify-end">
        {!editing ? (
          <button
            onClick={onEdit}
            className="px-3 py-1.5 rounded-full border border-[#541C9C] text-[#541C9C] text-sm font-medium hover:bg-[#541C9C]/5"
          >
            Edit
          </button>
        ) : (
          <>
            <button
              onClick={onSave}
              className="px-3 py-1.5 rounded-full bg-[#541C9C] text-white text-sm font-medium hover:opacity-90"
            >
              Save
            </button>
            <button
              onClick={onCancel}
              className="px-3 py-1.5 rounded-full border text-sm font-medium hover:bg-black/5"
            >
              Cancel
            </button>
          </>
        )}
      </div>
    </div>
  )
}

function Landing() {
  const [editing, setEditing] = useState(false)
  const [isExporting, setIsExporting] = useState(false)

  // >>> Only name & city are editable, duration is computed
  const [guestName, setGuestName] = useState('Rahul')
  const [city, setCity] = useState('Singapore')

  const [tripFields, setTripFields] = useState([
    { label: 'Departure From :', value: 'Mumbai' },
    { label: 'Departure :', value: '31/10/2025' },
    { label: 'Arrival :', value: '01/11/2025' },
    { label: 'Destination :', value: 'Singapore' },
    { label: 'No. Of Travellers :', value: '4' },
  ])

  const [visaFields, setVisaFields] = useState([
    { label: 'Visa Type :', value: '123456' },
    { label: '', value: '' },
    { label: 'Validity :', value: '123456' },
    { label: '', value: '' },
    { label: 'Processing Date :', value: '123456' },
  ])

  const [days, setDays] = useState([
    {
      dayLabel: 'Day 1',
      imageUrl: 'https://picsum.photos/id/237/200/300',
      dateTitle: '27th November',
      subtitle: 'Arrival In Singapore & City Exploration',
      segments: [
        { label: 'Morning',   points: ['Arrive in Singapore. Transfer from airport to hotel.'] },
        { label: 'Afternoon', points: ['Check into your hotel.', 'Visit Marina Bay Sands Sky Park (2–3 hours).', 'Optional: Stroll along Marina Bay Waterfront Promenade or Helix Bridge.'] },
        { label: 'Evening',   points: ['Explore Gardens by the Bay, including Supertree Grove (3–4 hours).'] },
      ],
    },
    {
      dayLabel: 'Day 2',
      imageUrl: 'https://picsum.photos/id/232/202/300',
      dateTitle: '28th November',
      subtitle: 'Arrival In Singapore & City Exploration',
      segments: [
        { label: 'Morning',   points: ['Arrive in Singapore. Transfer from airport to hotel.'] },
        { label: 'Afternoon', points: ['Check into your hotel.', 'Visit Marina Bay Sands Sky Park (2–3 hours).', 'Optional: Stroll along Marina Bay Waterfront Promenade or Helix Bridge.'] },
        { label: 'Evening',   points: ['Explore Gardens by the Bay, including Supertree Grove (3–4 hours).'] },
      ],
    },
    {
      dayLabel: 'Day 3',
      imageUrl: 'https://picsum.photos/id/231/201/300',
      dateTitle: '29th November',
      subtitle: 'Arrival In Singapore & City Exploration',
      segments: [
        { label: 'Morning',   points: ['Arrive in Singapore. Transfer from airport to hotel.'] },
        { label: 'Afternoon', points: ['Check into your hotel.', 'Visit Marina Bay Sands Sky Park (2–3 hours).', 'Optional: Stroll along Marina Bay Waterfront Promenade or Helix Bridge.'] },
        { label: 'Evening',   points: ['Explore Gardens by the Bay, including Supertree Grove (3–4 hours).'] },
      ],
    },
    {
      dayLabel: 'Day 4',
      imageUrl: 'https://picsum.photos/id/227/300/300',
      dateTitle: '30th November',
      subtitle: 'Arrival In Singapore & City Exploration',
      segments: [
        { label: 'Morning',   points: ['Arrive in Singapore. Transfer from airport to hotel.'] },
        { label: 'Afternoon', points: ['Check into your hotel.', 'Visit Marina Bay Sands Sky Park (2–3 hours).', 'Optional: Stroll along Marina Bay Waterfront Promenade or Helix Bridge.'] },
        { label: 'Evening',   points: ['Explore Gardens by the Bay, including Supertree Grove (3–4 hours).'] },
      ],
    },
  ])

  const [flights, setFlights] = useState([
    { date: "Thu 10 Jan'24", flight: 'Fly Air India (AX-123)', details: 'From Delhi (DEL) To Singapore (SIN).' },
    { date: "Thu 10 Jan'24", flight: 'Fly Air India (AX-123)', details: 'From Delhi (DEL) To Singapore (SIN).' },
    { date: "Thu 10 Jan'24", flight: 'Fly Air India (AX-123)', details: 'From Delhi (DEL) To Singapore (SIN).' },
    { date: "Thu 10 Jan'24", flight: 'Fly Air India (AX-123)', details: 'From Delhi (DEL) To Singapore (SIN).' },
  ])

  const [csv1, setCsv1] = useState(initialTable1)
  const [csv2, setCsv2] = useState(initialTable2)
  const [csv3, setCsv3] = useState(initialTable3)
  const [csv4, setCsv4] = useState(initialTable4)
  const [csv5, setCsv5] = useState(initialTable5)
  const [csv6, setCsv6] = useState(initialTable6)

  // backup for Cancel
  const snapshot = () => ({
    guestName, city,
    tripFields: structuredClone(tripFields),
    visaFields: structuredClone(visaFields),
    days: structuredClone(days),
    flights: structuredClone(flights),
    csv1, csv2, csv3, csv4, csv5, csv6,
  })
  const [backup, setBackup] = useState(null)

  const pdfRef = useRef(null)

  // Print (native Save as PDF)
  const saveAsPdf = async () => {
    setIsExporting(true)
    try { window.getSelection()?.removeAllRanges?.() } catch {}
    await new Promise(r => setTimeout(r, 10))
    const cleanup = () => setIsExporting(false)
    const onAfterPrint = () => { window.removeEventListener('afterprint', onAfterPrint); window.removeEventListener('focus', onFocusBack); cleanup() }
    const onFocusBack  = () => { window.removeEventListener('afterprint', onAfterPrint); window.removeEventListener('focus', onFocusBack);  cleanup() }
    window.addEventListener('afterprint', onAfterPrint, { once: true })
    window.addEventListener('focus', onFocusBack, { once: true })
    window.print()
  }

  // Computed header texts
  const heroH2Text = `Hi, ${guestName}!`
  const heroH1Text = `${city} Itinerary`
  const daysCount = days.length
  const durationText = `${daysCount} Days ${daysCount} Nights`

  const reindexDays = (arr) =>
    arr.map((d, idx) => ({ ...d, dayLabel: `Day ${idx + 1}` }));

  return (
    <>
      <PrintStyles />

      {isExporting && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-white/70 backdrop-blur-sm no-print">
          <div className="flex flex-col items-center gap-3">
            <div className="h-10 w-10 rounded-full border-4 border-gray-300 border-t-[#541C9C] animate-spin" />
            <div className="text-sm text-gray-800">Preparing print preview…</div>
          </div>
        </div>
      )}

      <EditBar
        editing={editing}
        onEdit={() => { setBackup(snapshot()); setEditing(true) }}
        onSave={() => setEditing(false)}
        onCancel={() => {
          if (backup) {
            setGuestName(backup.guestName); setCity(backup.city)
            setTripFields(backup.tripFields); setVisaFields(backup.visaFields)
            setDays(backup.days); setFlights(backup.flights)
            setCsv1(backup.csv1); setCsv2(backup.csv2); setCsv3(backup.csv3);
            setCsv4(backup.csv4); setCsv5(backup.csv5); setCsv6(backup.csv6);
          }
          setEditing(false)
        }}
      />

      <div id="pdf-capture" ref={pdfRef}>
        <div className="avoid-break">
          <div className='flex flex-row justify-center'>
            <img src='/logo.png' className='w-64'/>
          </div>

          <div className="mx-auto my-6 w-[min(100%,1120px)] rounded-3xl bg-gradient-to-r from-[#4BA1EB] to-[#936FE0] pt-8 pb-3 py-10 text-white shadow-[0_8px_28px_rgba(73,42,175,0.25)] font-poppins">
            <div className="flex flex-col items-center text-center gap-4">
              {/* Hi, <name>!  -> only name editable */}
              {!editing ? (
                <h2 className="text-3xl md:text-4xl font-medium tracking-tight">{heroH2Text}</h2>
              ) : (
                <div className="text-3xl md:text-4xl font-medium tracking-tight">
                  <span>Hi, </span>
                  <input
                    className="text-black px-2 py-1 rounded"
                    value={guestName}
                    onChange={(e)=>setGuestName(e.target.value)}
                    style={{ width: Math.max(4, guestName.length) + 'ch' }}
                  />
                  <span>!</span>
                </div>
              )}

              {/* <city> Itinerary -> only city editable */}
              {!editing ? (
                <h1 className="text-4xl md:text-4xl font-semibold tracking-tight">{heroH1Text}</h1>
              ) : (
                <div className="text-4xl md:text-4xl font-semibold tracking-tight">
                  <input
                    className="text-black px-2 py-1 rounded"
                    value={city}
                    onChange={(e)=>setCity(e.target.value)}
                    style={{ width: Math.max(6, city.length) + 'ch' }}
                  />
                  <span> Itinerary</span>
                </div>
              )}

              {/* Duration auto-calculated; never editable */}
              <p className="text-xl md:text-2xl text-white/90">{durationText}</p>

              <img src='/props1.svg' className='w-48 mx-auto'/>
            </div>
          </div>
        </div>

        <div className="avoid-break">
          <TripSummary
            fields={tripFields}
            editable={editing}
            onChange={setTripFields}
          />
        </div>

        {days.map((d, i) => (
          <React.Fragment key={i}>
            <div className="avoid-break">
              <DayTimelineCard
                dayLabel={d.dayLabel}                // label stays read-only in UI
                imageUrl={d.imageUrl}
                dateTitle={d.dateTitle}
                subtitle={d.subtitle}
                segments={d.segments}
                editable={editing}
                onChange={(nv) => {
                  // sanitize: never allow dayLabel to change
                  const next = [...days]
                  next[i] = { ...nv, dayLabel: days[i].dayLabel }
                  setDays(next)
                }}
                onRemove={
                  editing
                    ? () =>
                        setDays(prev => reindexDays(prev.filter((_, idx) => idx !== i)))
                    : undefined
                }
                
              />
            </div>
            <hr className='mx-auto border-1 border-black w-[min(100%,1120px)]'/>
          </React.Fragment>
        ))}

        {editing && (
          <div className="w-[min(100%,1120px)] mx-auto -mt-4 mb-4">
            <button
              className="px-3 py-1.5 rounded-full border text-sm"
              onClick={() => setDays([...days, {
                dayLabel: `Day ${days.length + 1}`,  // generated; never editable
                imageUrl: '',
                dateTitle: '',
                subtitle: '',
                segments: [{ label: 'Morning', points: [''] }],
              }])}
            >
              + Day
            </button>
          </div>
        )}

        <div className="avoid-break">
          <div className='w-[min(100%,1120px)] mx-auto my-6'>
            <div className='text-3xl text-left font-bold font-roboto'><span>Flight </span><span className='text-[#680099]'>Summary</span></div>
          </div>

          {flights.map((f, i) => (
            <FlightItineraryItem
              key={i}
              date={f.date}
              flight={f.flight}
              details={f.details}
              editable={editing}
              onChange={(nv) => {
                const next = [...flights]; next[i] = nv; setFlights(next)
              }}
              onRemove={editing ? () => setFlights(flights.filter((_, idx)=>idx!==i)) : undefined}
            />
          ))}

          {editing && (
            <div className="w-[min(100%,1120px)] mx-auto -mt-2 mb-4">
              <button
                className="px-3 py-1.5 rounded-full border text-sm"
                onClick={() => setFlights([...flights, { date: '', flight: '', details: '' }])}
              >
                + Flight
              </button>
            </div>
          )}

          <div className='w-[min(100%,1120px)] mx-auto my-6'>
            <div className='text-sm text-left font-light font-roboto'>
              <span>Note: All flights include meals, seat choice (excluding XL), and 20kg/25Kg checked  baggage.</span>
            </div>
          </div>
        </div>

        <hr className='mx-auto border-1 border-black w-[min(100%,1120px)]'/>

        <div className="avoid-break">
          <div className='w-[min(100%,1120px)] mx-auto my-6'>
            <div className='text-3xl text-left font-bold font-roboto'><span>Hotel </span><span className='text-[#680099]'>Bookings</span></div>
          </div>

          {/* Lock headings by forcing the first row on every change */}
          <CsvPillTable
            csv={csv1}
            onCsvChange={(v)=>setCsv1(keepHeader(v, header1))}
            editable={editing}
            headerColor="#321e5d"
            dataColor="#f9eeff"
            radius={28}
            columnConfig={[
              { key: 'City',       title: 'City',       width: '220px' },
              { key: 'Check In',   title: 'Check In',   width: '200px' },
              { key: 'Check Out',  title: 'Check Out',  width: '200px' },
              { key: 'Nights',     title: 'Nights',     width: '120px', align: 'center' },
              { key: 'Hotel Name', title: 'Hotel Name', width: '1fr' },
            ]}
          />

          {/* Notes: NEVER editable */}
          <div className='w-[min(100%,1120px)] mx-auto my-6'>
            <div className='text-sm text-left font-light font-roboto flex flex-col gap-2'>
              <span>1. All hotels are tentative and can be replaced with similar.</span>
              <span>2. Breakfast included for all hotel stays.</span>
              <span>3. All Hotels will be 4* and above category.</span>
              <span>4. A maximum occupancy of 2 people/room is allowed in most hotels. </span>
            </div>
          </div>
        </div>

        <hr className='mx-auto border-1 border-black w-[min(100%,1120px)]'/>

        <div className="avoid-break">
          <div className='w-[min(100%,1120px)] mx-auto my-6'>
            <div className='text-3xl text-left font-bold font-roboto'><span>Important </span><span className='text-[#680099]'>Notes</span></div>
          </div>
          <CsvPillTable
            csv={csv2}
            onCsvChange={(v)=>setCsv2(keepHeader(v, header2))}
            editable={editing}
            headerColor="#321e5d"
            dataColor="#f9eeff"
            radius={28}
            columnConfig={[
              { key: 'Point',   title: 'Point',   width: '300px' },
              { key: 'Details', title: 'Details', width: '1fr' },
            ]}
          />
        </div>

        <div className="avoid-break">
          <div className='w-[min(100%,1120px)] mx-auto my-6'>
            <div className='text-3xl text-left font-bold font-roboto'><span>Scope Of </span><span className='text-[#680099]'>Service</span></div>
          </div>
          <CsvPillTable
            csv={csv3}
            onCsvChange={(v)=>setCsv3(keepHeader(v, header3))}
            editable={editing}
            headerColor="#321e5d"
            dataColor="#f9eeff"
            radius={28}
            columnConfig={[
              { key: 'Service', title: 'Service', width: '400px' },
              { key: 'Details', title: 'Details', width: '1fr' },
            ]}
          />
        </div>

        <div className="avoid-break">
          <div className='w-[min(100%,1120px)] mx-auto my-6'>
            <div className='text-3xl text-left font-bold font-roboto'><span>Inclusion </span><span className='text-[#680099]'>Summary</span></div>
          </div>
          <CsvPillTable
            csv={csv4}
            onCsvChange={(v)=>setCsv4(keepHeader(v, header4))}
            editable={editing}
            headerColor="#321e5d"
            dataColor="#f9eeff"
            radius={28}
            columnConfig={[
              { key: 'Category',            title: 'Category',            width: '180px' },
              { key: 'Count',               title: 'Count',               width: '90px' },
              { key: 'Details',             title: 'Details',             width: '500px' },
              { key: 'Status / Comments',   title: 'Status / Comments',   width: '1fr' },
            ]}
          />
        </div>

        <div className="avoid-break">
          <div className='w-[min(100%,1120px)] mx-auto my-6'>
            <div className='text-3xl text-left font-bold font-roboto'><span>Activity </span><span className='text-[#680099]'>Table</span></div>
          </div>
          <CsvPillTable
            csv={csv5}
            onCsvChange={(v)=>setCsv5(keepHeader(v, header5))}
            editable={editing}
            headerColor="#321e5d"
            dataColor="#f9eeff"
            radius={28}
            columnConfig={[
              { key: 'City',           title: 'City',           width: '180px' },
              { key: 'Activity',       title: 'Activity',       width: '500px' },
              { key: 'Type',           title: 'Type',           width: '180px' },
              { key: 'Time Required',  title: 'Time Required',  width: '1fr'  },
            ]}
          />
        </div>

        <div className="avoid-break">
          <div className='w-[min(100%,1120px)] mx-auto my-6 flex flex-col gap-6'>
            <div className='text-3xl text-left font-bold font-roboto'><span>Terms and </span><span className='text-[#680099]'>Conditions</span></div>
            <div className='text-xl text-left font-bold font-roboto text-[#2F80ED] underline'><span>View all terms and conditions </span></div>
          </div>
        </div>

        <hr className='mx-auto border-1 border-black w-[min(100%,1120px)]'/>

        <div className="avoid-break">
          <div className='w-[min(100%,1120px)] mx-auto my-6'>
            <div className='text-3xl text-left font-bold font-roboto'><span>Payment </span><span className='text-[#680099]'>Plan</span></div>
          </div>
          <FlightItineraryItem
            date={'Total Amount'}
            flight={'₹ 9,00,000'}
            details={'for 3 pax (inclusive of GST)'}
            editable={editing}
            onChange={()=>{}}
          />
          <FlightItineraryItem
            date={<span className='px-10'>TCS</span>}
            flight={'Not Collected'}
            details={''}
            editable={editing}
            onChange={()=>{}}
          />
          <CsvPillTable
            csv={csv6}
            onCsvChange={(v)=>setCsv6(keepHeader(v, header6))}
            editable={editing}
            headerColor="#321e5d"
            dataColor="#f9eeff"
            radius={28}
            columnConfig={[
              { key: 'Installment', title: 'Installment', width: '1fr'  },
              { key: 'Amount',      title: 'Amount',      width: '500px'},
              { key: 'Due Date',    title: 'Due Date',    width: '1fr'  },
            ]}
          />
        </div>

        <div className="avoid-break">
          <div className='w-[min(100%,1120px)] mx-auto my-6'>
            <div className='text-3xl text-left font-bold font-roboto'><span>Visa </span><span className='text-[#680099]'>Details</span></div>
          </div>
          <TripSummary
            fields={visaFields}
            editable={editing}
            onChange={setVisaFields}
          />
        </div>

        <hr className='mx-auto border-1 border-black w-[min(100%,1120px)]'/>

        <div className='w-[min(100%,1120px)] mx-auto my-6 mb-20 flex flex-col gap-5 justify-center align-center'>
          <span className="font-['Red_Hat_Text',sans-serif] text-4xl text-[#321E5D] leading-normal tracking-[0.015em]">PLAN.PACK.GO!</span>
          <div>
            <button
              className='w-[24vw] bg-[#541C9C] px-8 py-4 font-semibold text-lg text-white rounded-full justify-center'
              onClick={saveAsPdf}
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Landing
