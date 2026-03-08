export type Priority = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
export type Status = 'Submitted' | 'Under Review' | 'Assigned' | 'In Progress' | 'Resolved';
export type Category = 'Road' | 'Garbage' | 'Water' | 'Electricity' | 'Safety' | 'Transport' | 'Sanitation' | 'Other';

export interface Complaint {
  id: string;
  title: string;
  description: string;
  category: Category;
  priority: Priority;
  status: Status;
  department: string;
  lat: number;
  lng: number;
  address: string;
  created: string;
  updated: string;
  sentiment: number;
  citizenName: string;
  citizenMobile: string;
  citizenEmail?: string;
  duplicateOf?: string;
  feedback?: string;
  rating?: number;
  timeline: { status: Status; date: string; note: string }[];
}

export interface Department {
  name: string;
  shortName: string;
  assigned: number;
  resolved: number;
  avgTime: number;
  rating: number;
}

export const departments: Department[] = [
  { name: 'BBMP Roads Division', shortName: 'BBMP Roads', assigned: 156, resolved: 128, avgTime: 2.8, rating: 4.2 },
  { name: 'BWSSB Water Supply', shortName: 'BWSSB', assigned: 98, resolved: 87, avgTime: 1.9, rating: 4.5 },
  { name: 'BESCOM Electricity', shortName: 'BESCOM', assigned: 124, resolved: 95, avgTime: 3.1, rating: 3.8 },
  { name: 'BBMP Solid Waste', shortName: 'BBMP SWM', assigned: 201, resolved: 189, avgTime: 1.2, rating: 4.6 },
  { name: 'BMTC Transport', shortName: 'BMTC', assigned: 67, resolved: 42, avgTime: 5.4, rating: 3.2 },
  { name: 'Bengaluru Traffic Police', shortName: 'BTP', assigned: 89, resolved: 71, avgTime: 2.5, rating: 3.9 },
  { name: 'BBMP Health & Sanitation', shortName: 'BBMP Health', assigned: 78, resolved: 65, avgTime: 2.1, rating: 4.1 },
  { name: 'PWD Karnataka', shortName: 'PWD', assigned: 45, resolved: 28, avgTime: 7.2, rating: 2.9 },
  { name: 'KPTCL Power', shortName: 'KPTCL', assigned: 56, resolved: 48, avgTime: 3.5, rating: 3.7 },
  { name: 'BDA Planning', shortName: 'BDA', assigned: 34, resolved: 19, avgTime: 8.1, rating: 2.6 },
  { name: 'KSPCB Pollution', shortName: 'KSPCB', assigned: 23, resolved: 18, avgTime: 4.2, rating: 3.5 },
  { name: 'Fire & Emergency Services', shortName: 'Fire Dept', assigned: 12, resolved: 11, avgTime: 0.5, rating: 4.8 },
];

export const complaints: Complaint[] = [
  {
    id: 'CMP-2025-00001',
    title: 'Flooded road near Indiranagar metro',
    description: 'Severe waterlogging on 100 Feet Road near Indiranagar Metro station. Vehicles stuck for hours during rain. Dangerous for two-wheelers.',
    category: 'Road',
    priority: 'HIGH',
    status: 'In Progress',
    department: 'BBMP Roads',
    lat: 12.9716,
    lng: 77.6412,
    address: '100 Feet Rd, Indiranagar, Bengaluru 560038',
    created: '2025-05-10T09:30:00Z',
    updated: '2025-05-12T14:00:00Z',
    sentiment: -0.72,
    citizenName: 'Rajesh Kumar',
    citizenMobile: '9876543210',
    timeline: [
      { status: 'Submitted', date: '2025-05-10T09:30:00Z', note: 'Complaint registered via web portal' },
      { status: 'Under Review', date: '2025-05-10T11:00:00Z', note: 'AI classified as Road Infrastructure — Priority HIGH' },
      { status: 'Assigned', date: '2025-05-11T09:00:00Z', note: 'Assigned to BBMP Roads Division, Ward 81' },
      { status: 'In Progress', date: '2025-05-12T14:00:00Z', note: 'Field team dispatched for drainage inspection' },
    ],
  },
  {
    id: 'CMP-2025-00002',
    title: 'Garbage dump on MG Road footpath',
    description: 'Large pile of garbage dumped on the footpath near MG Road metro exit. Very unhygienic, stray dogs gathering.',
    category: 'Garbage',
    priority: 'MEDIUM',
    status: 'Assigned',
    department: 'BBMP SWM',
    lat: 12.9756,
    lng: 77.6066,
    address: 'MG Road, near Metro Station Exit 2, Bengaluru 560001',
    created: '2025-05-11T07:15:00Z',
    updated: '2025-05-12T10:00:00Z',
    sentiment: -0.55,
    citizenName: 'Priya Sharma',
    citizenMobile: '9876543211',
    timeline: [
      { status: 'Submitted', date: '2025-05-11T07:15:00Z', note: 'Complaint registered via mobile app' },
      { status: 'Under Review', date: '2025-05-11T08:30:00Z', note: 'AI classified as Solid Waste — Priority MEDIUM' },
      { status: 'Assigned', date: '2025-05-12T10:00:00Z', note: 'Assigned to BBMP SWM, Ward 88' },
    ],
  },
  {
    id: 'CMP-2025-00003',
    title: 'Water supply disrupted in Koramangala 4th Block',
    description: 'No water supply for 3 days in our apartment complex. Multiple residents affected. Tank completely dry.',
    category: 'Water',
    priority: 'HIGH',
    status: 'In Progress',
    department: 'BWSSB',
    lat: 12.9352,
    lng: 77.6245,
    address: '4th Block, Koramangala, Bengaluru 560034',
    created: '2025-05-09T06:00:00Z',
    updated: '2025-05-11T16:00:00Z',
    sentiment: -0.81,
    citizenName: 'Anand Rao',
    citizenMobile: '9876543212',
    timeline: [
      { status: 'Submitted', date: '2025-05-09T06:00:00Z', note: 'Complaint registered via WhatsApp' },
      { status: 'Under Review', date: '2025-05-09T08:00:00Z', note: 'AI classified as Water Supply — Priority HIGH' },
      { status: 'Assigned', date: '2025-05-09T14:00:00Z', note: 'Assigned to BWSSB, Zone South' },
      { status: 'In Progress', date: '2025-05-11T16:00:00Z', note: 'Pipeline repair work initiated' },
    ],
  },
  {
    id: 'CMP-2025-00004',
    title: 'Streetlights not working on Outer Ring Road',
    description: 'Multiple streetlights near Marathahalli bridge are not functioning. Very dangerous for commuters at night.',
    category: 'Electricity',
    priority: 'HIGH',
    status: 'Assigned',
    department: 'BESCOM',
    lat: 12.9568,
    lng: 77.7011,
    address: 'Outer Ring Rd, Marathahalli, Bengaluru 560037',
    created: '2025-05-12T19:00:00Z',
    updated: '2025-05-13T09:00:00Z',
    sentiment: -0.68,
    citizenName: 'Deepak Menon',
    citizenMobile: '9876543213',
    timeline: [
      { status: 'Submitted', date: '2025-05-12T19:00:00Z', note: 'Complaint registered via web portal' },
      { status: 'Under Review', date: '2025-05-12T20:00:00Z', note: 'AI classified as Electricity — Priority HIGH' },
      { status: 'Assigned', date: '2025-05-13T09:00:00Z', note: 'Assigned to BESCOM, Whitefield Division' },
    ],
  },
  {
    id: 'CMP-2025-00005',
    title: 'Fire hazard near school in Jayanagar',
    description: 'Open electrical wires hanging dangerously near Government School in Jayanagar 4th T Block. Children at risk. Extremely dangerous situation.',
    category: 'Safety',
    priority: 'CRITICAL',
    status: 'In Progress',
    department: 'BESCOM',
    lat: 12.9250,
    lng: 77.5938,
    address: '4th T Block, Jayanagar, Bengaluru 560041',
    created: '2025-05-13T08:00:00Z',
    updated: '2025-05-13T10:00:00Z',
    sentiment: -0.95,
    citizenName: 'Meena Devi',
    citizenMobile: '9876543214',
    timeline: [
      { status: 'Submitted', date: '2025-05-13T08:00:00Z', note: 'CRITICAL: Auto-flagged due to school/children safety risk' },
      { status: 'Under Review', date: '2025-05-13T08:15:00Z', note: 'AI: CRITICAL priority — Safety hazard near school' },
      { status: 'Assigned', date: '2025-05-13T08:30:00Z', note: 'Emergency assignment to BESCOM + Fire Dept' },
      { status: 'In Progress', date: '2025-05-13T10:00:00Z', note: 'Emergency response team dispatched' },
    ],
  },
  {
    id: 'CMP-2025-00006',
    title: 'Bus shelter damaged on Hosur Road',
    description: 'Bus shelter near Silk Board junction completely damaged. No roof, passengers standing in rain.',
    category: 'Transport',
    priority: 'MEDIUM',
    status: 'Under Review',
    department: 'BMTC',
    lat: 12.9177,
    lng: 77.6238,
    address: 'Hosur Rd, Silk Board Junction, Bengaluru 560068',
    created: '2025-05-13T11:00:00Z',
    updated: '2025-05-13T12:30:00Z',
    sentiment: -0.45,
    citizenName: 'Suresh Babu',
    citizenMobile: '9876543215',
    timeline: [
      { status: 'Submitted', date: '2025-05-13T11:00:00Z', note: 'Complaint registered via mobile app' },
      { status: 'Under Review', date: '2025-05-13T12:30:00Z', note: 'Under review by transport department' },
    ],
  },
  {
    id: 'CMP-2025-00007',
    title: 'Open drain causing health hazard in Whitefield',
    description: 'Open drain overflowing near ITPL Main Road. Mosquito breeding ground. Multiple dengue cases reported in the area.',
    category: 'Sanitation',
    priority: 'CRITICAL',
    status: 'Assigned',
    department: 'BBMP Health',
    lat: 12.9698,
    lng: 77.7500,
    address: 'ITPL Main Rd, Whitefield, Bengaluru 560066',
    created: '2025-05-12T15:00:00Z',
    updated: '2025-05-13T09:00:00Z',
    sentiment: -0.88,
    citizenName: 'Kavitha Nair',
    citizenMobile: '9876543216',
    timeline: [
      { status: 'Submitted', date: '2025-05-12T15:00:00Z', note: 'Complaint registered — health hazard flagged' },
      { status: 'Under Review', date: '2025-05-12T16:00:00Z', note: 'AI: CRITICAL — Health hazard, dengue risk' },
      { status: 'Assigned', date: '2025-05-13T09:00:00Z', note: 'Assigned to BBMP Health & Sanitation' },
    ],
  },
  {
    id: 'CMP-2025-00008',
    title: 'Pothole causing accidents on Bellary Road',
    description: 'Large pothole on Bellary Road near Mekhri Circle. Two bike accidents this week. Urgent repair needed.',
    category: 'Road',
    priority: 'CRITICAL',
    status: 'In Progress',
    department: 'BBMP Roads',
    lat: 12.9988,
    lng: 77.5764,
    address: 'Bellary Rd, near Mekhri Circle, Bengaluru 560080',
    created: '2025-05-08T10:00:00Z',
    updated: '2025-05-13T08:00:00Z',
    sentiment: -0.91,
    citizenName: 'Vikram Singh',
    citizenMobile: '9876543217',
    timeline: [
      { status: 'Submitted', date: '2025-05-08T10:00:00Z', note: 'Complaint registered — accident reports attached' },
      { status: 'Under Review', date: '2025-05-08T11:00:00Z', note: 'CRITICAL: Accidents reported, urgent repair' },
      { status: 'Assigned', date: '2025-05-09T08:00:00Z', note: 'Assigned to BBMP Roads, Priority repair queue' },
      { status: 'In Progress', date: '2025-05-13T08:00:00Z', note: 'Road repair crew on site' },
    ],
  },
  {
    id: 'CMP-2025-00009',
    title: 'Illegal dumping near Ulsoor Lake',
    description: 'Construction debris being dumped near Ulsoor Lake. Polluting the lake water. Happening every night.',
    category: 'Garbage',
    priority: 'HIGH',
    status: 'Under Review',
    department: 'KSPCB',
    lat: 12.9812,
    lng: 77.6200,
    address: 'Ulsoor Lake Rd, Bengaluru 560008',
    created: '2025-05-13T06:00:00Z',
    updated: '2025-05-13T09:00:00Z',
    sentiment: -0.76,
    citizenName: 'Arjun Reddy',
    citizenMobile: '9876543218',
    timeline: [
      { status: 'Submitted', date: '2025-05-13T06:00:00Z', note: 'Complaint registered with photo evidence' },
      { status: 'Under Review', date: '2025-05-13T09:00:00Z', note: 'Forwarded to KSPCB for environmental assessment' },
    ],
  },
  {
    id: 'CMP-2025-00010',
    title: 'Traffic signal malfunction at Hebbal flyover',
    description: 'Traffic signal at Hebbal flyover junction not working since morning. Massive traffic jam.',
    category: 'Transport',
    priority: 'HIGH',
    status: 'Resolved',
    department: 'BTP',
    lat: 13.0358,
    lng: 77.5970,
    address: 'Hebbal Flyover Junction, Bengaluru 560024',
    created: '2025-05-07T07:00:00Z',
    updated: '2025-05-07T14:00:00Z',
    sentiment: -0.62,
    citizenName: 'Lakshmi Prasad',
    citizenMobile: '9876543219',
    feedback: 'Signal was repaired within the same day. Good response time!',
    rating: 4,
    timeline: [
      { status: 'Submitted', date: '2025-05-07T07:00:00Z', note: 'Urgent complaint — traffic chaos' },
      { status: 'Under Review', date: '2025-05-07T07:30:00Z', note: 'Priority flagged by AI system' },
      { status: 'Assigned', date: '2025-05-07T08:00:00Z', note: 'Assigned to BTP signal maintenance' },
      { status: 'In Progress', date: '2025-05-07T10:00:00Z', note: 'Technician dispatched' },
      { status: 'Resolved', date: '2025-05-07T14:00:00Z', note: 'Signal repaired and operational' },
    ],
  },
  {
    id: 'CMP-2025-00011',
    title: 'Broken water pipe on Anna Salai, Chennai',
    description: 'Major water pipe burst on Anna Salai near Gemini Circle. Water wasting continuously. Road flooded.',
    category: 'Water',
    priority: 'HIGH',
    status: 'In Progress',
    department: 'BWSSB',
    lat: 13.0604,
    lng: 80.2496,
    address: 'Anna Salai, near Gemini Circle, Chennai 600006',
    created: '2025-05-11T08:30:00Z',
    updated: '2025-05-12T11:00:00Z',
    sentiment: -0.70,
    citizenName: 'Tamil Selvan',
    citizenMobile: '9876543220',
    timeline: [
      { status: 'Submitted', date: '2025-05-11T08:30:00Z', note: 'Complaint registered with video evidence' },
      { status: 'Under Review', date: '2025-05-11T09:30:00Z', note: 'AI: Water infrastructure — HIGH priority' },
      { status: 'Assigned', date: '2025-05-11T14:00:00Z', note: 'Assigned to Metro Water Chennai' },
      { status: 'In Progress', date: '2025-05-12T11:00:00Z', note: 'Pipe replacement in progress' },
    ],
  },
  {
    id: 'CMP-2025-00012',
    title: 'Garbage not collected for a week in BTM Layout',
    description: 'Door-to-door garbage collection stopped in BTM Layout 2nd Stage. Bins overflowing. Bad smell.',
    category: 'Garbage',
    priority: 'MEDIUM',
    status: 'Assigned',
    department: 'BBMP SWM',
    lat: 12.9166,
    lng: 77.6101,
    address: 'BTM Layout 2nd Stage, Bengaluru 560076',
    created: '2025-05-12T09:00:00Z',
    updated: '2025-05-13T08:00:00Z',
    sentiment: -0.58,
    citizenName: 'Sangeetha M',
    citizenMobile: '9876543221',
    timeline: [
      { status: 'Submitted', date: '2025-05-12T09:00:00Z', note: 'Complaint registered via web portal' },
      { status: 'Under Review', date: '2025-05-12T10:00:00Z', note: 'Classified as Solid Waste — MEDIUM' },
      { status: 'Assigned', date: '2025-05-13T08:00:00Z', note: 'Assigned to BBMP SWM contractor' },
    ],
  },
  // Duplicate of CMP-2025-00001
  {
    id: 'CMP-2025-00013',
    title: 'Road flooding near Indiranagar 100ft Road',
    description: 'Waterlogging issue on 100 Feet Road, Indiranagar. Cannot commute safely.',
    category: 'Road',
    priority: 'HIGH',
    status: 'Submitted',
    department: 'BBMP Roads',
    lat: 12.9720,
    lng: 77.6415,
    address: '100 Feet Rd, Indiranagar, Bengaluru 560038',
    created: '2025-05-12T16:00:00Z',
    updated: '2025-05-12T16:00:00Z',
    sentiment: -0.65,
    citizenName: 'Ravi Shankar',
    citizenMobile: '9876543222',
    duplicateOf: 'CMP-2025-00001',
    timeline: [
      { status: 'Submitted', date: '2025-05-12T16:00:00Z', note: 'Linked to CMP-2025-00001 — duplicate detected' },
    ],
  },
  // Duplicate of CMP-2025-00003
  {
    id: 'CMP-2025-00014',
    title: 'No water in Koramangala apartments',
    description: 'Water supply cut off in Koramangala 4th Block for several days. Families suffering.',
    category: 'Water',
    priority: 'HIGH',
    status: 'Submitted',
    department: 'BWSSB',
    lat: 12.9355,
    lng: 77.6248,
    address: '4th Block, Koramangala, Bengaluru 560034',
    created: '2025-05-10T07:00:00Z',
    updated: '2025-05-10T07:00:00Z',
    sentiment: -0.78,
    citizenName: 'Girish Bhat',
    citizenMobile: '9876543223',
    duplicateOf: 'CMP-2025-00003',
    timeline: [
      { status: 'Submitted', date: '2025-05-10T07:00:00Z', note: 'Linked to CMP-2025-00003 — duplicate detected' },
    ],
  },
  {
    id: 'CMP-2025-00015',
    title: 'Stray dog menace in HSR Layout',
    description: 'Aggressive stray dogs near HSR Layout Sector 2 park. Children bitten last week. Very dangerous for kids.',
    category: 'Safety',
    priority: 'CRITICAL',
    status: 'Assigned',
    department: 'BBMP Health',
    lat: 12.9116,
    lng: 77.6389,
    address: 'Sector 2, HSR Layout, Bengaluru 560102',
    created: '2025-05-11T17:00:00Z',
    updated: '2025-05-12T09:00:00Z',
    sentiment: -0.89,
    citizenName: 'Pooja Hegde',
    citizenMobile: '9876543224',
    timeline: [
      { status: 'Submitted', date: '2025-05-11T17:00:00Z', note: 'CRITICAL: Children safety risk flagged' },
      { status: 'Under Review', date: '2025-05-11T18:00:00Z', note: 'AI: CRITICAL — Animal control needed' },
      { status: 'Assigned', date: '2025-05-12T09:00:00Z', note: 'Assigned to BBMP Animal Husbandry' },
    ],
  },
  {
    id: 'CMP-2025-00016',
    title: 'Power outage in Electronic City Phase 1',
    description: 'Frequent power cuts in Electronic City Phase 1. 4-5 hours daily for past week. IT companies affected.',
    category: 'Electricity',
    priority: 'HIGH',
    status: 'In Progress',
    department: 'BESCOM',
    lat: 12.8456,
    lng: 77.6603,
    address: 'Electronic City Phase 1, Bengaluru 560100',
    created: '2025-05-10T14:00:00Z',
    updated: '2025-05-12T16:00:00Z',
    sentiment: -0.74,
    citizenName: 'Naveen Jain',
    citizenMobile: '9876543225',
    timeline: [
      { status: 'Submitted', date: '2025-05-10T14:00:00Z', note: 'Complaint from IT park management' },
      { status: 'Under Review', date: '2025-05-10T15:00:00Z', note: 'HIGH priority — commercial area affected' },
      { status: 'Assigned', date: '2025-05-11T09:00:00Z', note: 'Assigned to BESCOM E-City division' },
      { status: 'In Progress', date: '2025-05-12T16:00:00Z', note: 'Transformer upgrade scheduled' },
    ],
  },
  // Duplicate of CMP-2025-00008
  {
    id: 'CMP-2025-00017',
    title: 'Dangerous pothole near Mekhri Circle',
    description: 'Big pothole on Bellary Road near Mekhri Circle causing vehicle damage.',
    category: 'Road',
    priority: 'HIGH',
    status: 'Submitted',
    department: 'BBMP Roads',
    lat: 12.9990,
    lng: 77.5766,
    address: 'Bellary Rd, Mekhri Circle, Bengaluru 560080',
    created: '2025-05-10T12:00:00Z',
    updated: '2025-05-10T12:00:00Z',
    sentiment: -0.82,
    citizenName: 'Arun Prasad',
    citizenMobile: '9876543226',
    duplicateOf: 'CMP-2025-00008',
    timeline: [
      { status: 'Submitted', date: '2025-05-10T12:00:00Z', note: 'Linked to CMP-2025-00008 — duplicate detected' },
    ],
  },
  {
    id: 'CMP-2025-00018',
    title: 'Overflowing sewage on FC Road, Pune',
    description: 'Sewage overflowing on Fergusson College Road near Goodluck Chowk. Stench unbearable. Health risk.',
    category: 'Sanitation',
    priority: 'HIGH',
    status: 'Assigned',
    department: 'BBMP Health',
    lat: 18.5244,
    lng: 73.8412,
    address: 'FC Road, Deccan Gymkhana, Pune 411004',
    created: '2025-05-12T08:00:00Z',
    updated: '2025-05-13T10:00:00Z',
    sentiment: -0.71,
    citizenName: 'Sneha Patil',
    citizenMobile: '9876543227',
    timeline: [
      { status: 'Submitted', date: '2025-05-12T08:00:00Z', note: 'Complaint from Pune municipal area' },
      { status: 'Under Review', date: '2025-05-12T09:30:00Z', note: 'Classified as Sanitation — HIGH priority' },
      { status: 'Assigned', date: '2025-05-13T10:00:00Z', note: 'Assigned to PMC Sewage Division' },
    ],
  },
  {
    id: 'CMP-2025-00019',
    title: 'Illegal parking blocking ambulance route',
    description: 'Illegal parking on Residency Road blocking emergency vehicle access. Fire trucks cannot pass.',
    category: 'Safety',
    priority: 'CRITICAL',
    status: 'In Progress',
    department: 'BTP',
    lat: 12.9719,
    lng: 77.6043,
    address: 'Residency Rd, Bengaluru 560025',
    created: '2025-05-13T12:00:00Z',
    updated: '2025-05-13T13:00:00Z',
    sentiment: -0.93,
    citizenName: 'Dr. Harish Kumar',
    citizenMobile: '9876543228',
    timeline: [
      { status: 'Submitted', date: '2025-05-13T12:00:00Z', note: 'CRITICAL: Emergency access blocked' },
      { status: 'Under Review', date: '2025-05-13T12:15:00Z', note: 'AI: CRITICAL — Emergency route blocked' },
      { status: 'Assigned', date: '2025-05-13T12:30:00Z', note: 'Assigned to BTP for immediate towing' },
      { status: 'In Progress', date: '2025-05-13T13:00:00Z', note: 'Towing vehicles dispatched' },
    ],
  },
  {
    id: 'CMP-2025-00020',
    title: 'Broken footpath tiles on Brigade Road',
    description: 'Multiple broken tiles on Brigade Road footpath. Senior citizens tripping. Needs immediate repair.',
    category: 'Road',
    priority: 'LOW',
    status: 'Resolved',
    department: 'BBMP Roads',
    lat: 12.9726,
    lng: 77.6077,
    address: 'Brigade Rd, Bengaluru 560001',
    created: '2025-05-01T10:00:00Z',
    updated: '2025-05-06T15:00:00Z',
    sentiment: -0.35,
    citizenName: 'Mohammed Ismail',
    citizenMobile: '9876543229',
    feedback: 'Tiles replaced with better quality ones. Footpath looks great now. Thank you PS-CRM team!',
    rating: 5,
    timeline: [
      { status: 'Submitted', date: '2025-05-01T10:00:00Z', note: 'Complaint registered via web portal' },
      { status: 'Under Review', date: '2025-05-01T12:00:00Z', note: 'Classified as Road — LOW priority' },
      { status: 'Assigned', date: '2025-05-02T09:00:00Z', note: 'Assigned to BBMP Roads maintenance' },
      { status: 'In Progress', date: '2025-05-04T10:00:00Z', note: 'Footpath repair work started' },
      { status: 'Resolved', date: '2025-05-06T15:00:00Z', note: 'Tiles replaced, quality inspected' },
    ],
  },
  {
    id: 'CMP-2025-00021',
    title: 'Fallen tree blocking road in JP Nagar',
    description: 'Large tree fallen across road in JP Nagar 6th Phase after last night storm. Road completely blocked.',
    category: 'Other',
    priority: 'HIGH',
    status: 'Assigned',
    department: 'BBMP Roads',
    lat: 12.9010,
    lng: 77.5850,
    address: '6th Phase, JP Nagar, Bengaluru 560078',
    created: '2025-05-13T05:30:00Z',
    updated: '2025-05-13T08:00:00Z',
    sentiment: -0.60,
    citizenName: 'Ganesh Murthy',
    citizenMobile: '9876543230',
    timeline: [
      { status: 'Submitted', date: '2025-05-13T05:30:00Z', note: 'Early morning complaint — storm damage' },
      { status: 'Under Review', date: '2025-05-13T06:00:00Z', note: 'Road blockage confirmed via satellite' },
      { status: 'Assigned', date: '2025-05-13T08:00:00Z', note: 'Assigned to BBMP tree removal team' },
    ],
  },
  {
    id: 'CMP-2025-00022',
    title: 'Contaminated drinking water in Malleshwaram',
    description: 'Brown colored water coming from taps in Malleshwaram 8th Cross. Smells bad. Not safe for drinking.',
    category: 'Water',
    priority: 'CRITICAL',
    status: 'In Progress',
    department: 'BWSSB',
    lat: 13.0035,
    lng: 77.5710,
    address: '8th Cross, Malleshwaram, Bengaluru 560003',
    created: '2025-05-12T07:00:00Z',
    updated: '2025-05-13T11:00:00Z',
    sentiment: -0.92,
    citizenName: 'Padma Lakshmi',
    citizenMobile: '9876543231',
    timeline: [
      { status: 'Submitted', date: '2025-05-12T07:00:00Z', note: 'Water quality complaint — health risk' },
      { status: 'Under Review', date: '2025-05-12T08:00:00Z', note: 'CRITICAL: Water contamination flagged' },
      { status: 'Assigned', date: '2025-05-12T10:00:00Z', note: 'BWSSB water testing team assigned' },
      { status: 'In Progress', date: '2025-05-13T11:00:00Z', note: 'Water samples collected, testing in progress' },
    ],
  },
];

// Chart data generators
export const getCategoryData = () => {
  const cats: Record<string, number> = {};
  complaints.forEach(c => { cats[c.category] = (cats[c.category] || 0) + 1; });
  return Object.entries(cats).map(([name, value]) => ({ name, value }));
};

export const getStatusData = () => {
  const stats: Record<string, number> = {};
  complaints.forEach(c => { stats[c.status] = (stats[c.status] || 0) + 1; });
  return Object.entries(stats).map(([name, value]) => ({ name, value }));
};

export const getDailyVolumeData = () => {
  const days = [];
  for (let i = 29; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    days.push({
      date: d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short' }),
      complaints: Math.floor(Math.random() * 30) + 10,
    });
  }
  return days;
};

export const STATUS_COLORS: Record<Status, string> = {
  'Submitted': 'bg-muted text-muted-foreground',
  'Under Review': 'bg-warning/20 text-warning',
  'Assigned': 'bg-primary/20 text-primary',
  'In Progress': 'bg-accent/20 text-accent',
  'Resolved': 'bg-success/20 text-success',
};

export const PRIORITY_COLORS: Record<Priority, string> = {
  'LOW': 'bg-muted text-muted-foreground',
  'MEDIUM': 'bg-warning/20 text-warning',
  'HIGH': 'bg-accent/20 text-accent',
  'CRITICAL': 'bg-critical/20 text-critical',
};

export const CATEGORY_DEPT_MAP: Record<Category, string> = {
  'Road': 'BBMP Roads',
  'Garbage': 'BBMP SWM',
  'Water': 'BWSSB',
  'Electricity': 'BESCOM',
  'Safety': 'BTP',
  'Transport': 'BMTC',
  'Sanitation': 'BBMP Health',
  'Other': 'PWD',
};
