// src/data/db.js

// Centralized categories - single source of truth
export const GALLERY_CATEGORIES = ['All Events', 'Campus', 'Recent Programs', 'Cultural Activity', 'NSS Programs', 'Departments']
// ✅ FIX: Added 'Campus' — was missing; caused 3 gallery items to vanish when any filter was applied

export const PDF_CATEGORIES  = ['NAAC', 'Annual Report', 'IQAC', 'Regulations', 'Examination', 'General']
export const MENU_SECTIONS   = ['About Us', 'Campus', 'Academics', 'Admission', 'Activity', 'NAAC', 'Publication', 'Gallery']

export const SOCIAL_LINKS = [
  { id: 'facebook', label: 'f',  href: 'https://facebook.com/gnc.dhanbad' }, // ✅ Update with real URLs
  { id: 'twitter',  label: 't',  href: 'https://twitter.com/' },
  { id: 'youtube',  label: 'y',  href: 'https://youtube.com/' },
  { id: 'linkedin', label: 'in', href: 'https://linkedin.com/' },
]

export const initialNotices = [
  { id: 1, text: 'Notice regarding Admission B.A/B.Com./BCA/BBA Session 2024-2028', date: '2024-11-01', isNew: true },
  { id: 2, text: 'FIRST MERIT LIST ALL SUBJECTS PHASE-V 2024', date: '2024-10-28', isNew: true },
  { id: 3, text: 'BBA: Merit List (PHASE-4) 2024', date: '2024-10-20', isNew: true },
  { id: 4, text: 'ALL SUBJECT ASSIGNMENT GE (I-IV) 2020-23 & 2021-2024', date: '2024-10-15', isNew: false },
  { id: 5, text: 'SEM II (2023-27) Internal Exam Schedule Released', date: '2024-10-10', isNew: false },
]

export const initialAnnouncements = [
  { id: 1, text: 'Online fee payment 2024-25 is now open. Visit the payment portal.', date: '2024-11-01', isNew: true },
  { id: 2, text: 'AICTE Approved BCA & BBA Courses - Admission Open', date: '2024-10-25', isNew: true },
  { id: 3, text: 'Vocational (BCA & BBA) 2024-28 Admissions Started', date: '2024-10-18', isNew: false },
  { id: 4, text: 'NAAC Accreditation Document Submission Completed', date: '2024-10-05', isNew: false },
]

export const initialEvents = [
  { id: 1, month: 'OCT', day: '2',  title: 'Gandhi Ji Jayanti Celebration', desc: 'On 2nd October 2024, Guru Nanak College and NSS unit celebrated the 155th birth anniversary of Mahatma Gandhi.', color: '#e74c3c', img: '🎉' },
  { id: 2, month: 'OCT', day: '1',  title: 'Swachh Raho, Swasth Raho', desc: 'On 01.10.2024, NSS unit organized a cleanliness awareness rally across the campus.', color: '#27ae60', img: '🌿' },
  { id: 3, month: 'JUL', day: '11', title: 'Induction Programme for New Students', desc: 'On 11 July 2024, induction programme was held for newly enrolled students of Commerce department.', color: '#3498db', img: '🎓' },
  { id: 4, month: 'AUG', day: '29', title: 'National Sports Day Programme', desc: 'On 29 August 2024, National Sports Day was celebrated in memory of Major Dhyan Chand.', color: '#9b59b6', img: '🏅' },
]

export const initialGallery = [
  { id: 1, title: 'College Building',  category: 'Campus',           emoji: '🏫' },
  { id: 2, title: 'Annual Function',   category: 'Cultural Activity', emoji: '🎭' },
  { id: 3, title: 'NSS Camp',          category: 'NSS Programs',      emoji: '🌿' },
  { id: 4, title: 'Sports Day',        category: 'Recent Programs',   emoji: '⚽' },
  { id: 5, title: 'Library',           category: 'Campus',            emoji: '📚' },
  { id: 6, title: 'Computer Lab',      category: 'Departments',       emoji: '💻' },
  { id: 7, title: 'Seminar Hall',      category: 'Campus',            emoji: '🎤' },
  { id: 8, title: 'Cultural Program',  category: 'Cultural Activity', emoji: '🎵' },
]

export const initialPDFReports = [
  { id: 1, title: 'NAAC Self Study Report 2023', date: '2023-12-01', category: 'NAAC' },
  { id: 2, title: 'Annual Report 2022-23',        date: '2023-09-15', category: 'Annual Report' },
  { id: 3, title: 'IQAC Report 2022-23',          date: '2023-08-20', category: 'IQAC' },
  { id: 4, title: 'UG Regulation (FYUGP)',        date: '2023-07-01', category: 'Regulations' },
]

// ✅ Single source of truth for departments (used in HomeFeatures + elsewhere)
export const departments = [
  { name: 'Department of Commerce',        emoji: '💼', icon: '💰', symbol: '📒', desc: 'Expertise in Finance, Accounts, and Trade.',                color: '#3498db' },
  { name: 'Humanities & Social Science',   emoji: '📖', icon: '🎨', symbol: '🎭', desc: 'Exploring Humanity, Culture, and Social Science.',          color: '#e74c3c' },
  { name: 'Computer Science (BCA)',        emoji: '💻', icon: '💻', symbol: '展开', desc: 'Bachelor of Computer Applications - Future of IT.',       color: '#27ae60' },
  { name: 'Business Administration (BBA)', emoji: '📊', icon: '📈', symbol: '📊', desc: 'Bachelor of Business Administration - Master the Market.', color: '#9b59b6' },
]

export const facilities = [
  { name: 'Class Rooms',        emoji: '🏫' }, { name: 'Computer Lab',   emoji: '💻' },
  { name: 'Library',            emoji: '📚' }, { name: 'Seminar Hall',   emoji: '🎤' },
  { name: 'Auditorium',         emoji: '🎭' }, { name: 'Playground',     emoji: '⚽' },
  { name: 'Badminton Court',    emoji: '🏸' }, { name: 'Gymnasium',      emoji: '🏋️' },
  { name: 'Digital Classrooms', emoji: '📱' }, { name: 'Cultural Dept.', emoji: '🎵' },
  { name: 'Washroom (B)',       emoji: '🚿' }, { name: 'Washroom (G)',   emoji: '🚿' },
  { name: 'Water Purifier',     emoji: '💧' }, { name: 'Canteen',        emoji: '🍽️' },
  { name: 'Girls Common Room',  emoji: '👩' }, { name: 'Online Lecture', emoji: '📡' },
]

export const navLinks = [
  { label: 'Home', href: '/' },
  {
    label: 'About Us',
    href: '/',
    sub: [
      { label: 'Principal Message', href: '/about-us/principal-message' },
      { label: 'Vision & Mission', href: '/about-us/vision-mission' },
      { label: 'College Profile', href: '/about-us/college-profile' },
      {
        label: 'College Management',
        sub: [
          { label: 'Principal',   href: '/about-us/college-management/principal' },
          { label: 'Organogram',  href: '/about-us/college-management/organogram' },
          { label: 'Presidents',  href: '/about-us/college-management/presidents' },
          { label: 'Secretaries', href: '/about-us/college-management/secretaries' },
        ]
      },
      {
        label: 'College Staff',
        sub: [
          { label: 'Teaching Staff',     href: '/about-us/college-staff/teaching-staff' },
          { label: 'Non-Teaching Staff', href: '/about-us/college-staff/non-teaching-staff' },
        ]
      },
      {
        label: 'Various Committees',
        sub: [
          { label: 'Placement',    href: '/about-us/various-committees/placement' },
          { label: "Women's Cell",  href: '/about-us/various-committees/womens-cell' },
          { label: 'Grievance',    href: '/about-us/various-committees/grievance' },
          { label: 'Anti Ragging', href: '/about-us/various-committees/anti-ragging' },
          { label: 'SC/ST',        href: '/about-us/various-committees/sc-st' },
          { label: 'OBC',          href: '/about-us/various-committees/obc' },
          { label: 'ICC',          href: '/about-us/various-committees/icc' },
          { label: 'Minority',     href: '/about-us/various-committees/minority' },
          { label: 'RUSA',         href: '/about-us/various-committees/rusa' },
        ]
      },
      {
        label: 'Regulations',
        sub: [
          {
            label: 'B.B.M.K. University Dhanbad',
            sub: [
              { label: 'FYUGP (NEP-2020)', href: '/about-us/regulations/fyugp-nep' },
              { label: 'UG Circular (Eligibility 2020-23)', href: '/about-us/regulations/bbmku-circular' },
              { label: 'UG Regulation (CBCS)', href: '/about-us/regulations/bbmku-ug' },
            ]
          },
          { label: 'College Affiliation Paper B.B.M.K.U.', href: '/about-us/regulations/college-affiliation' },
          { label: 'UGC Under Section 2(f) & 12(B)', href: '/about-us/regulations/ugc-certificate' },
          {
            label: 'V.B.U. Hazaribag',
            sub: [
              { label: 'BCA Regulation', href: '/about-us/regulations/vbu-bca' },
              { label: 'UG Regulation 2015', href: '/about-us/regulations/vbu-ug' },
            ]
          },
          { label: 'ByeLaws', href: '/about-us/regulations/college-byelaws' },
          { label: 'Minority Exemption', href: '/about-us/regulations/minority-exemption' },
        ]
      },
    ]
  },
  {
    label: 'Academics',
    href: '/',
    sub: [
      {
        label: 'Departments',
        sub: [
          { label: 'BCA',             href: '/academics/departments/bca' },
          { label: 'BBA',             href: '/academics/departments/bba' },
          { label: 'Commerce',        href: '/academics/departments/commerce' },
          { label: 'Social Science',  href: '/academics/departments/social-science' },
          { label: 'Humanities',      href: '/academics/departments/humanities' },
        ]
      },
      { label: 'Course Offered',    href: '/academics/course-offered' },
      { label: 'Academic Calendar',  href: '/academics/academic-calendar' },
      { label: 'Syllabus',           href: '/syllabus' },
      { label: 'IQAC',              href: '/academics/iqac' },
    ]
  },
  {
    label: 'Admission',
    href: '/',
    sub: [
      {
        label: 'Notification',
        sub: [
          { label: 'Latest',        href: '/admission/notification/latest' },
          { label: 'Upcoming News', href: '/admission/notification/upcoming' },
        ]
      },
      { label: 'Fee Structure',       href: '/admission/fee-structure' },
      { label: 'Admission Rule',      href: '/admission/rule' },
      { label: 'Document Required',   href: '/admission/document-required' },
      { label: 'Intake Capacity',   href: '/admission/intake-capacity' },
    ]
  },
  {
    label: 'NAAC',
    href: '/',
    sub: [
      {
        label: 'SSR 2nd Cycle',
        sub: [
          { label: 'Cycle 2 Documents', href: '/naac/ssr-2nd-cycle/cycle-2-documents' },
          { label: 'Executive Summary', href: '/naac/ssr-2nd-cycle/executive-summary' },
        ]
      },
      {
        label: 'SSR 1st Cycle',
        sub: [
          { label: 'Cycle 1 Documents', href: '/naac/ssr-1st-cycle/cycle-1-documents' },
          { label: 'Peer Team Report',  href: '/naac/ssr-1st-cycle/peer-team-report' },
        ]
      },
      { label: 'AQAR',             href: '/naac/aqar' },
      { label: 'NIRF',             href: '/naac/nirf' },
      { label: 'Perspective Plan', href: '/naac/perspective-plan' },
    ]
  },
  {
    label: 'Activity',
    href: '/',
    sub: [
      { label: 'NSS',         href: '/activity/nss' },
      { label: 'NCC',         href: '/activity/ncc' },
      { label: 'Workshop',    href: '/activity/workshop' },
      { label: 'Game & Sports', href: '/activity/games-sports' },
      {
        label: 'Collaboration',
        sub: [
          { label: 'Rotaract Club',    href: '/activity/collaboration/rotaract-club' },
          { label: 'Sadbhavana Diwas', href: '/activity/collaboration/sadbhavana-diwas' },
        ]
      },
    ]
  },
  {
    label: 'Publication',
    href: '/',
    sub: [
      {
        label: 'Examination Results',
        sub: [
          { label: 'Result 2024', href: '/publication/examination-results/2024' },
          { label: 'Result 2023', href: '/publication/examination-results/2023' },
        ]
      },
      { label: 'College Library', href: '/publication/college-library' },
      { label: 'E-Magazine',      href: '/publication/e-magazine' },
      {
        label: 'SSS Report',
        sub: [
          { label: 'Report 2023-24', href: '/publication/sss-report/2023-24' },
          { label: 'Report 2022-23', href: '/publication/sss-report/2022-23' },
        ]
      },
    ]
  },
  {
    label: 'Campus',
    href: '/',
    sub: [
      {
        label: 'Campus Visuals',
        sub: [
          { label: 'Bhuda',               href: '/campus/visuals/bhuda' },
          { label: 'Bank More',           href: '/campus/visuals/bank-more' },
          { label: 'Vocational Building', href: '/campus/visuals/vocational-building' },
        ]
      },
      { label: 'Infrastructure', href: '/campus/infrastructure' },
      { label: 'Classroom',      href: '/campus/classroom' },
      { label: 'ICT Rooms',      href: '/campus/ict-rooms' },
      { label: 'Green Campus',   href: '/campus/green-campus' },
    ]
  },
  {
    label: 'Gallery',
    href: '/gallery',
    sub: [
      { label: 'Photo Gallery',  href: '/gallery/photos' },
      { label: 'Video Gallery',  href: '/gallery/videos' },
    ]
  },
  { label: 'Contact Us', href: '/contact' },
]

// ✅ FIX: Added id to each slide — some components may use .id for keying
export const sliderSlides = [
  { id: 1, text: '🏆 Winner - 4th Inter-College Youth Festival' },
  { id: 2, text: '🎓 Admission 2024-28 Now Open - Apply Today!' },
  { id: 3, text: '✅ NAAC Accredited Institution - Excellence in Education' },
  { id: 4, text: '💻 AICTE Approved BCA & BBA Courses Available' },
  { id: 5, text: '📚 Affiliated to B.B.M.K. University, Dhanbad' },
]