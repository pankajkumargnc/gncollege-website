// src/data/db.js

// Centralized categories - single source of truth
export const GALLERY_CATEGORIES = ['All Events', 'Campus', 'Recent Programs', 'Cultural Activity', 'NSS Programs', 'Departments']
// ✅ FIX: Added 'Campus' — was missing; caused 3 gallery items to vanish when any filter was applied

export const MENU_SECTIONS = ['About Us', 'Campus', 'Academics', 'Admission', 'Student Corner', 'Activity', 'NAAC', 'Publication', 'Gallery']

export const SOCIAL_LINKS = [
  { id: 'facebook', label: 'f', href: 'https://facebook.com/gnc.dhanbad' }, // ✅ Update with real URLs
  { id: 'twitter', label: 't', href: 'https://twitter.com/' },
  { id: 'youtube', label: 'y', href: 'https://youtube.com/' },
  { id: 'linkedin', label: 'in', href: 'https://linkedin.com/' },
]


// ✅ Single source of truth for departments (used in HomeFeatures + elsewhere)
export const departments = [
  { name: 'Department of Commerce', emoji: '💼', icon: '💰', symbol: '📒', desc: 'Expertise in Finance, Accounts, and Trade.', color: '#3498db' },
  { name: 'Humanities & Social Science', emoji: '📖', icon: '🎨', symbol: '🎭', desc: 'Exploring Humanity, Culture, and Social Science.', color: '#e74c3c' },
  { name: 'Computer Science (BCA)', emoji: '💻', icon: '💻', symbol: '展开', desc: 'Bachelor of Computer Applications - Future of IT.', color: '#27ae60' },
  { name: 'Business Administration (BBA)', emoji: '📊', icon: '📈', symbol: '📊', desc: 'Bachelor of Business Administration - Master the Market.', color: '#9b59b6' },
]

export const facilities = [
  { name: 'Class Rooms', emoji: '🏫' }, { name: 'Computer Lab', emoji: '💻' },
  { name: 'Library', emoji: '📚' }, { name: 'Seminar Hall', emoji: '🎤' },
  { name: 'Auditorium', emoji: '🎭' }, { name: 'Playground', emoji: '⚽' },
  { name: 'Badminton Court', emoji: '🏸' }, { name: 'Gymnasium', emoji: '🏋️' },
  { name: 'Digital Classrooms', emoji: '📱' }, { name: 'Cultural Dept.', emoji: '🎵' },
  { name: 'Washroom (B)', emoji: '🚿' }, { name: 'Washroom (G)', emoji: '🚿' },
  { name: 'Water Purifier', emoji: '💧' }, { name: 'Canteen', emoji: '🍽️' },
  { name: 'Girls Common Room', emoji: '👩' }, { name: 'Online Lecture', emoji: '📡' },
]

export const navLinks = [
  { label: 'Home', href: '/' },
  {
    label: 'About Us',
    href: '#',
    sub: [
      { label: 'Principal Message', href: '/about-us/principal-message' },
      { label: 'Vision & Mission', href: '/about-us/vision-mission' },
      { label: 'College Profile', href: '/about-us/college-profile' },
      { label: 'Sikh Heritage', href: '/about-us/sikh-heritage' },
      {
        label: 'College Management',
        sub: [
          { label: 'Principal', href: '/about-us/college-management/principal' },
          { label: 'Organogram', href: '/about-us/college-management/organogram' },
          { label: 'Presidents', href: '/about-us/college-management/presidents' },
          { label: 'Secretaries', href: '/about-us/college-management/secretaries' },
        ]
      },
      {
        label: 'College Staff',
        sub: [
          { label: 'Teaching Staff', href: '/about-us/college-staff/teaching-staff' },
          { label: 'Non-Teaching Staff', href: '/about-us/college-staff/non-teaching-staff' },
        ]
      },
      {
        label: 'Various Committees',
        sub: [
          { label: 'Placement', href: '/about-us/various-committees/placement' },
          { label: "Women's Cell", href: '/about-us/various-committees/womens-cell' },
          { label: 'Grievance', href: '/about-us/various-committees/grievance' },
          { label: 'Anti Ragging', href: '/about-us/various-committees/anti-ragging' },
          { label: 'SC/ST', href: '/about-us/various-committees/sc-st' },
          { label: 'OBC', href: '/about-us/various-committees/obc' },
          { label: 'ICC', href: '/about-us/various-committees/icc' },
          { label: 'Minority', href: '/about-us/various-committees/minority' },
          { label: 'RUSA', href: '/about-us/various-committees/rusa' },
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
    href: '#',
    sub: [
      {
        label: 'Departments',
        sub: [
          { label: 'BCA', href: '/academics/departments/bca' },
          { label: 'BBA', href: '/academics/departments/bba' },
          { label: 'Commerce', href: '/academics/departments/commerce' },
          { label: 'Social Science', href: '/academics/departments/social-science' },
          { label: 'Humanities', href: '/academics/departments/humanities' },
        ]
      },
      { label: 'Course Offered', href: '/academics/course-offered' },
      { label: 'Academic Calendar', href: '/academics/academic-calendar' },
      { label: 'Syllabus', href: '/syllabus' },
      { label: 'IQAC', href: '/academics/iqac' },
      { label: 'Placements', href: '/academics/placements' },
      { label: 'Alumni Success Wall', href: '/alumni' },
    ]
  },
  {
    label: 'Admission',
    href: '#',
    sub: [
      {
        label: 'Notification',
        sub: [
          { label: 'Latest', href: '/admission/notification/latest' },
          { label: 'Upcoming News', href: '/admission/notification/upcoming' },
        ]
      },
      { label: 'Fee Structure', href: '/admission/fee-structure' },
      { label: 'Admission Rule', href: '/admission/rule' },
      { label: 'Document Required', href: '/admission/document-required' },
      { label: 'Intake Capacity', href: '/admission/intake-capacity' },
      { label: 'Scholarships & Financial Aid', href: '/scholarships' },
    ]
  },
  {
    label: 'Student Corner',
    href: '/student-corner',
    sub: [
      { label: 'Student Corner Hub', href: '/student-corner' },
      { label: 'Document Request & Tracking', href: '/documents/request' },
      { label: 'Notices & Circulars', href: '/notifications' },
      { label: 'Examination Results', href: '/publication/examination-results/2024' },
      { label: 'Syllabus & NEP FYUGP', href: '/syllabus' },
      { label: 'Academic Calendar', href: '/academics/academic-calendar' },
      { label: 'Scholarships & E-Kalyan', href: '/scholarships' },
      { label: 'College Documents & Vault', href: '/documents' },
      { label: 'Grievance Redressal Cell', href: '/about-us/various-committees/grievance' },
      { label: 'Anti-Ragging Committee', href: '/about-us/various-committees/anti-ragging' },
    ]
  },
  {
    label: 'NAAC',
    href: '/naac/portal',
    sub: [
      { label: 'NAAC Portal & Overview', href: '/naac/portal' },
      { label: 'IQAC Quality Cell', href: '/naac/iqac' },
      { label: '7 Criteria Explorer', href: '/naac/criteria' },
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
          { label: 'Peer Team Report', href: '/naac/ssr-1st-cycle/peer-team-report' },
        ]
      },
      { label: 'AQAR Repository', href: '/naac/aqar' },
      { label: 'Best Practices & Distinctiveness', href: '/naac/best-practices' },
      { label: 'NIRF & Perspective Plan', href: '/naac/nirf' },
    ]
  },
  {
    label: 'Activity',
    href: '#',
    sub: [
      { label: 'NSS', href: '/activity/nss' },
      { label: 'NCC', href: '/activity/ncc' },
      { label: 'Workshop', href: '/activity/workshop' },
      { label: 'Game & Sports', href: '/activity/games-sports' },
      {
        label: 'Collaboration',
        sub: [
          { label: 'Rotaract Club', href: '/activity/collaboration/rotaract-club' },
          { label: 'Sadbhavana Diwas', href: '/activity/collaboration/sadbhavana-diwas' },
        ]
      },
    ]
  },
  {
    label: 'Publication',
    href: '#',
    sub: [
      {
        label: 'Examination Results',
        sub: [
          { label: 'Result 2024', href: '/publication/examination-results/2024' },
          { label: 'Result 2023', href: '/publication/examination-results/2023' },
        ]
      },
      { label: 'College Library', href: '/publication/college-library' },
      { label: 'E-Magazine', href: '/publication/e-magazine' },
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
    href: '#',
    sub: [
      {
        label: 'Campus Visuals',
        sub: [
          { label: 'Bhuda', href: '/campus/visuals/bhuda' },
          { label: 'Bank More', href: '/campus/visuals/bank-more' },
          { label: 'Vocational Building', href: '/campus/visuals/vocational-building' },
        ]
      },
      { label: 'Infrastructure', href: '/campus/infrastructure' },
      { label: 'Classroom', href: '/campus/classroom' },
      { label: 'ICT Rooms', href: '/campus/ict-rooms' },
      { label: 'Green Campus', href: '/campus/green-campus' },
      { label: '360° Virtual Tour', href: '/campus/virtual-tour' },
    ]
  },
  {
    label: 'Gallery',
    href: '/gallery',
    sub: [
      { label: 'Photo Gallery', href: '/gallery/photos' },
      { label: 'Video Gallery', href: '/gallery/videos' },
    ]
  },
  { label: 'Contact Us', href: '/contact' },
]

// ✅ FIX: Added id to each slide — some components may use .id for keying
export const sliderSlides = [
  { id: 1, text: '🏆 Winner - 4th Inter-College Youth Festival' },
  { id: 2, text: '🎓 Admissions Open for FYUGP 2026-30 - Apply Today!' },
  { id: 3, text: '✅ NAAC Accredited Institution - Excellence in Education' },
  { id: 4, text: '💻 AICTE Approved BCA & BBA Courses Available' },
  { id: 5, text: '📚 Affiliated to B.B.M.K. University, Dhanbad' },
]