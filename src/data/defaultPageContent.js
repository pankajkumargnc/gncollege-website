// src/data/defaultPageContent.js
// ═══════════════════════════════════════════════════════════════════
// DEFAULT PAGE CONTENT — Pre-populated data for Content Manager
// This mirrors the hardcoded content from page components so that
// the admin can see and edit existing content even BEFORE seeding.
// ═══════════════════════════════════════════════════════════════════

const DEFAULT_PAGE_CONTENT = {

  // ────────────────────── ABOUT US ──────────────────────
  'college-profile': {
    title: 'College Profile',
    subtitle: 'Excellence in Education Since 1970',
    sections: [
      {
        id: 'intro', heading: 'College Overview', type: 'text', order: 1,
        content: '<p class="rich-text-content">Guru Nanak College, Dhanbad (A Sikh Minority Degree College) was Established by the Gurudwara Prabandhak Committee in 1970 to mark the fifth Birth Centenary of the great Guru after whom this college is named.</p><p class="rich-text-content mt-4">The college is managed by a Governing Council nominated by the Gurudwara Prabandhak Committee, Dhanbad, and draws its inspiration from the teachings of the faith propounded by Guru Nanak Devji.</p>'
      },
      {
        id: 'about', heading: 'About the College', type: 'text', order: 2,
        content: '<p class="rich-text-content">Initially the college got affiliated to the Ranchi University – Ranchi since 1970 the year it was started. But with the passage of time, Binod Bihari Mahto Koylanchal University, Dhanbad came into existence in 2017; and the affiliation of the college got transferred to this new University in 2017.</p><p class="rich-text-content mt-4">At present, the college has got permanent affiliation with Binod Bihari Mahto Koylanchal University, Dhanbad in the faculties of Humanities, Social Sciences, commerce and such vocational courses as Bachelor of Computer Applications. The college has got “Deficit Grant College Status” by the government of Jharkhand. Also the college is registered u/s 2F and 12B of the UGC Act.</p><p class="rich-text-content mt-4">The main aim and objective behind sponsoring this college was to impart value-based teaching to the young men and women of Dhanbad. The college attaches great importance to moral teaching. The college does not merely offer teaching in such subjects as would enable young students to earn their bread and butter, but it also emphasizes grooming them into worthy (morally sound) citizens.</p>'
      },
      {
        id: 'stats', heading: 'Key Statistics', type: 'list', order: 3,
        content: JSON.stringify([
          { label: 'Years of Legacy', value: '56+', icon: '🏛️' },
          { label: 'Expert Faculty', value: '120+', icon: '👨‍🏫' },
          { label: 'Students', value: '5000+', icon: '🎓' },
          { label: 'Courses', value: '30+', icon: '📚' }
        ])
      }
    ],
    seo: { title: 'College Profile | Guru Nanak College, Dhanbad', description: 'Explore the history, legacy, and campus profile of Guru Nanak College Dhanbad, established in 1970.' }
  },

  'vision-mission': {
    title: 'Vision & Mission',
    subtitle: 'Our guiding principles and future aspirations',
    sections: [
      {
        id: 'vision', heading: 'Our Vision', type: 'text', order: 1,
        content: '<p>To be a premier institution of higher learning that nurtures leaders of tomorrow — intellectually competent, ethically grounded, and socially responsible — drawing inspiration from the teachings of Guru Nanak Devji.</p><p>We envision creating a knowledge hub that fosters academic excellence, innovation, and inclusive development in the coal capital of India, contributing to nation-building through value-based education.</p>'
      },
      {
        id: 'mission', heading: 'Our Mission', type: 'text', order: 2,
        content: '<p>To provide quality and inclusive higher education to all sections of society, with special focus on the underprivileged, empowering students through academic excellence, skill development, and value-based learning.</p><p>To implement the National Education Policy (NEP 2020) framework effectively, ensuring multi-disciplinary learning, research orientation, and holistic development of students through the Four Year Undergraduate Programme (FYUGP).</p>'
      },
      {
        id: 'core-values', heading: 'Core Values', type: 'list', order: 3,
        content: JSON.stringify([
          { icon: '🕊️', label: 'Peace & Harmony' },
          { icon: '🎓', label: 'Academic Excellence' },
          { icon: '🤝', label: 'Inclusivity' },
          { icon: '💡', label: 'Innovation' },
          { icon: '🌿', label: 'Service to Society' },
          { icon: '⚖️', label: 'Integrity' }
        ])
      }
    ],
    seo: { title: 'Vision & Mission | Guru Nanak College, Dhanbad', description: 'Discover the vision, mission and core values of Guru Nanak College, Dhanbad — nurturing leaders since 1970 through value-based education and inclusive learning.' }
  },

  'principal-message': {
    title: "Principal's Message",
    subtitle: 'A word from our Principal to students and parents',
    sections: [
      {
        id: 'principal-info', heading: 'Principal Information', type: 'text', order: 1,
        content: JSON.stringify({
          name: 'Dr. Sanjay Prasad',
          designation: 'Principal',
          qualification: 'M.Com, Ph.D.',
          institution: 'Guru Nanak College, Dhanbad',
          photo: 'images/principal.webp',
          quote: 'Education is not merely the acquisition of knowledge, but the transformation of character and the cultivation of a purposeful life.'
        })
      },
      {
        id: 'message', heading: 'Message to Students & Parents', type: 'text', order: 2,
        content: '<p>Dear Students and Parents, it gives me immense pleasure to welcome you to Guru Nanak College, Dhanbad — an institution that has been nurturing young minds for over five decades.</p><p>Our college stands as a beacon of quality education in Jharkhand, offering a rich blend of academic rigour, co-curricular activities, and personal development. With NAAC accreditation and UGC recognition under Section 2(f) and 12(B), we are committed to maintaining the highest standards of educational excellence.</p><p>Under the guidance of the National Education Policy (NEP 2020), we have embraced the Four Year Undergraduate Programme (FYUGP) with multiple entry and exit options, ensuring that our students receive a flexible and holistic learning experience aligned with global standards.</p><p>I invite you to be part of our vibrant community and assure you of our complete support at every step of your academic journey. Together, let us build a future that our founders envisioned — rooted in the values of Guru Nanak Devji.</p>'
      }
    ],
    seo: { title: "Principal's Message | Guru Nanak College, Dhanbad", description: "Read the message from the Principal of Guru Nanak College, Dhanbad to students and parents about the institution's commitment to quality education." }
  },

  'organogram': {
    title: 'Organogram',
    subtitle: 'Organizational structure and hierarchy of Guru Nanak College, Dhanbad',
    sections: [
      {
        id: 'organogram-image', heading: 'Official Organogram', type: 'text', order: 1,
        content: JSON.stringify({ imagePath: 'images/organogram.webp', pdfUrl: '/pdfs/organogram.pdf' })
      }
    ],
    seo: { title: 'Organogram | Guru Nanak College, Dhanbad', description: 'View the organizational structure and administrative hierarchy of Guru Nanak College, Dhanbad.' }
  },

  'governing-body': {
    title: 'Governing Body',
    subtitle: 'The apex decision-making body of Guru Nanak College, Dhanbad',
    sections: [
      {
        id: 'about-gb', heading: 'About the Governing Body', type: 'text', order: 1,
        content: '<p>The Governing Body of Guru Nanak College, Dhanbad is the supreme authority responsible for the overall management, policy decisions, and financial matters of the college. It is constituted as per UGC guidelines and the regulations of Binod Bihari Mahto Koylanchal University (BBMKU), Dhanbad.</p>'
      },
      {
        id: 'gb-stats', heading: 'Current Session', type: 'text', order: 2,
        content: JSON.stringify({ session: '2024-25', totalMembers: '8', chairperson: 'President, GPC' })
      },
      {
        id: 'gb-members', heading: 'Members of Governing Body', type: 'table', order: 3,
        content: JSON.stringify({
          headers: ['S.No.', 'Name', 'Designation', 'Category', 'Role in GB'],
          rows: [
            ['1', 'President, GPC', 'President, Gurudwara Prabandhak Committee', 'Management Nominee', 'Chairperson'],
            ['2', 'Secretary, GPC', 'Secretary, Gurudwara Prabandhak Committee', 'Management Nominee', 'Member'],
            ['3', 'Principal, GNC', 'Principal, Guru Nanak College', 'Ex-officio', 'Member Secretary'],
            ['4', 'Management Nominee', 'Nominated by Managing Committee', 'Management Nominee', 'Member'],
            ['5', 'UGC Nominee', 'Nominated by University Grants Commission', 'UGC Nominee', 'Member'],
            ['6', 'University Nominee', 'Nominated by BBMKU, Dhanbad', 'University Nominee', 'Member'],
            ['7', 'Teaching Staff Rep.', 'Elected by Teaching Staff', 'Teaching Staff Rep.', 'Member'],
            ['8', 'Non-Teaching Rep.', 'Elected by Non-Teaching Staff', 'Non-Teaching Rep.', 'Member']
          ]
        })
      }
    ],
    seo: { title: 'Governing Body | Guru Nanak College, Dhanbad', description: 'Learn about the Governing Body of Guru Nanak College — the apex decision-making authority for management, policy, and financial matters.' }
  },

  'staff-council': {
    title: 'Staff Council',
    subtitle: 'The collective voice of teaching and non-teaching staff at GNC',
    sections: [
      {
        id: 'about-sc', heading: 'About Staff Council', type: 'text', order: 1,
        content: '<p>The Staff Council of Guru Nanak College, Dhanbad is a representative body of the teaching and non-teaching staff. It serves as an advisory body to the Principal on academic and administrative matters, and acts as a platform for raising and resolving staff concerns.</p>'
      },
      {
        id: 'sc-members', heading: 'Staff Council Members', type: 'table', order: 2,
        content: JSON.stringify({
          headers: ['S.No.', 'Name', 'Designation', 'Department', 'Role'],
          rows: [
            ['1', 'Principal', 'Principal', 'Administration', 'President / Chairman'],
            ['2', 'Senior Faculty', 'Associate Professor', 'Commerce', 'Secretary'],
            ['3', 'Faculty Member', 'Assistant Professor', 'Hindi', 'Joint Secretary'],
            ['4', 'Faculty Member', 'Assistant Professor', 'English', 'Member'],
            ['5', 'Faculty Member', 'Assistant Professor', 'Economics', 'Member'],
            ['6', 'Faculty Member', 'Assistant Professor', 'History', 'Member'],
            ['7', 'Non-Teaching Staff', 'Office Superintendent', 'Administration', 'Non-Teaching Rep.']
          ]
        })
      },
      {
        id: 'sc-functions', heading: 'Key Functions', type: 'list', order: 3,
        content: JSON.stringify([
          'Academic planning and curriculum discussions',
          'Implementation of university and UGC guidelines',
          'Student welfare and discipline matters',
          'Organizing college events and programs',
          'Grievance redressal of staff members',
          'Annual academic calendar preparation'
        ])
      }
    ],
    seo: { title: 'Staff Council | Guru Nanak College, Dhanbad', description: 'Learn about the Staff Council of Guru Nanak College — the representative body for teaching and non-teaching staff.' }
  },

  // ────────────────────── COMMITTEES ──────────────────────
  ...generateCommitteeDefaults(),

  // ────────────────────── ACADEMICS ──────────────────────
  'course-offered': {
    title: 'Courses Offered (NEP 2022)',
    subtitle: 'Four Year Undergraduate Programme (FYUGP) with Multiple Entry & Exit Options.',
    sections: [
      {
        id: 'nep-timeline', heading: 'NEP Exit Points', type: 'list', order: 1,
        content: JSON.stringify([
          { duration: '1 Year', award: 'UG Certificate' },
          { duration: '2 Years', award: 'UG Diploma' },
          { duration: '3 Years', award: 'Bachelor Degree' },
          { duration: '4 Years', award: 'Bachelor with Honours / Research' }
        ])
      },
      {
        id: 'courses', heading: 'Department-wise Courses', type: 'text', order: 2,
        content: JSON.stringify({
          'BCA': ['BCA (Computer Application)'],
          'BBA': ['BBA (Business Administration)'],
          'Commerce': ['Accounting & Finance', 'Marketing', 'Human Resource'],
          'Humanities': ['Hindi', 'English'],
          'Social Science': ['History', 'Political Science', 'Psychology', 'Economics']
        })
      }
    ],
    seo: { title: 'Courses Offered — NEP 2022 | Guru Nanak College, Dhanbad', description: 'Explore all courses offered at Guru Nanak College under NEP 2020 FYUGP.' }
  },

  'academic-calendar': {
    title: 'Academic Calendar',
    subtitle: 'Key dates, examination schedules, and holidays for the current session.',
    sections: [
      {
        id: 'timeline', heading: 'Session Timeline', type: 'list', order: 1,
        content: JSON.stringify([
          { month: 'July - August', title: 'Admissions & Orientation', desc: 'Commencement of new academic session and induction for Semester 1.' },
          { month: 'September - October', title: 'Internal Mid-Semester Exams', desc: 'First assessment for all UG programs.' },
          { month: 'November', title: 'Youth Fest & Sports Meet', desc: 'Annual cultural and sports week.' },
          { month: 'December - January', title: 'University End-Semester Exams', desc: 'Final theory and practical examinations.' },
          { month: 'February - March', title: 'Even Semester Commences', desc: 'Classes resume for Semester 2, 4, and 6.' }
        ])
      }
    ],
    seo: { title: 'Academic Calendar | Guru Nanak College, Dhanbad', description: 'View the academic calendar of Guru Nanak College with examination schedules and session timelines.' }
  },

  // ────────────────────── ADMISSION ──────────────────────
  'admission-rule': {
    title: 'Admission Procedure',
    subtitle: 'Complete step-by-step guide for UG and Vocational admission under NEP 2020.',
    sections: [
      {
        id: 'important-rule', heading: 'Important Rule', type: 'text', order: 0,
        content: '<p><strong>Important:</strong> Students attending less than 75% classes will not be eligible to fill up university examination forms. Violation of discipline may lead to removal.</p>'
      },
      {
        id: 'steps', heading: 'Admission Steps', type: 'list', order: 1,
        content: JSON.stringify([
          { title: 'Apply via Chancellor Portal', desc: 'Desirous students must apply through the Chancellor Portal (https://jharkhanduniversities.nic.in/) under NEP-2020.', fee: 'Application Fee: Rs. 100/-' },
          { title: 'Merit List & Verification', desc: 'Selected students must visit respective campuses with original documents for physical verification.', fee: 'Check Document Required Page' },
          { title: 'University Registration', desc: 'After verification, pay the BBMKU Registration Fee on Chancellor Portal again.', fee: 'JAC Board: Rs. 308/- | Others: Rs. 758/-' },
          { title: 'College Online Admission Form', desc: 'Register on www.gncollege.org or enrollonline.co.in. Upload Chancellor Portal fee receipt and marksheet.', fee: 'Wait for approval message' },
          { title: 'Final Fee Payment', desc: 'After approval, pay the college fee via Student Diary Cloud App or CIMS portal using Card/UPI/NetBanking.', fee: 'Online Payment Only' }
        ])
      }
    ],
    seo: { title: 'Admission Procedure | Guru Nanak College, Dhanbad', description: 'Complete step-by-step admission process for UG and Vocational courses at Guru Nanak College under NEP 2020.' }
  },

  'document-required': {
    title: 'Documents Required',
    subtitle: 'Bring these documents during physical verification at the campus.',
    sections: [
      {
        id: 'documents', heading: 'Required Documents', type: 'list', order: 1,
        content: JSON.stringify([
          { t: 'Chancellor Portal Form', d: 'Printed copy of the submitted application form.', type: 'Print' },
          { t: 'Application Fee Receipt', d: 'Proof of Rs. 100/- payment on Chancellor Portal.', type: 'Print' },
          { t: 'Original CLC/TC', d: 'Original copy will be kept by the college (keep photocopies for yourself).', type: 'Original' },
          { t: 'Qualifying Marksheet', d: 'Self-attested photocopy of previous exam.', type: 'Photocopy' },
          { t: 'Admit Card', d: 'Self-attested photocopy of qualifying exam admit card.', type: 'Photocopy' },
          { t: 'Migration Certificate', d: 'Original or Downloaded from Digilocker (Required for non-JAC board).', type: 'Original' },
          { t: 'Caste Certificate', d: 'If applicable for reservation claims.', type: 'Photocopy' }
        ])
      }
    ],
    seo: { title: 'Documents Required for Admission | Guru Nanak College, Dhanbad', description: 'Complete list of documents required during physical verification for admission at Guru Nanak College, Dhanbad.' }
  },

  'fee-structure': {
    title: 'Fee Structure',
    subtitle: 'Detailed semester-wise fee breakdown for 4-Year FYUGP (8 Semesters), BCA, and BBA.',
    sections: [
      {
        id: 'ug-fee', heading: 'UG Regular Fee (8 Semesters)', type: 'table', order: 1,
        content: JSON.stringify({
          headers: ['Fee Head', 'Boys Odd Sem (1,3,5,7)', 'Boys Even Sem (2,4,6,8)', 'Girls Odd Sem (1,3,5,7)', 'Girls Even Sem (2,4,6,8)'],
          rows: [
            ['Tuition Fee', '₹120', '₹120', '₹0', '₹0'],
            ['Admission fee', '₹20', '₹0', '₹20', '₹0'],
            ['Electric Charge', '₹30', '₹30', '₹30', '₹30'],
            ['Library Fee', '₹50', '₹0', '₹50', '₹0'],
            ['NSS', '₹20', '₹20', '₹20', '₹20'],
            ['Students Union', '₹20', '₹0', '₹20', '₹0'],
            ['Students Fund', '₹80', '₹80', '₹80', '₹80'],
            ['Annual Charge', '₹191', '₹0', '₹191', '₹0'],
            ['College Fund', '₹1650', '₹1650', '₹1650', '₹1650'],
            ['Internal Exam Fee', '₹50', '₹50', '₹50', '₹50'],
            ['Development Fund', '₹500', '₹500', '₹500', '₹500'],
            ['Practical fee (Vocational Paper)', '₹150', '₹150', '₹150', '₹150'],
            ['ERP & Mobile App Charge', '₹165', '₹0', '₹165', '₹0'],
            ['Hand Book Charge', '₹100', '₹0', '₹100', '₹0']
          ],
          totals: ['Grand Total', '₹3146', '₹2600', '₹3026', '₹2480'],
          note: 'Under NEP 2020 (FYUGP), the undergraduate course is spread over 8 semesters.'
        })
      },
      {
        id: 'vocational-fee', heading: 'Vocational Fee (BCA / BBA)', type: 'table', order: 2,
        content: JSON.stringify({
          BCA: { headers: ['Particulars', 'Odd Semesters', 'Even Semesters'], rows: [['Course Fee', '₹15,000', '₹15,000'], ['Development & ERP Fee', '₹916', '₹165']], totals: ['Grand Total', '₹15,916', '₹15,165'] },
          BBA: { headers: ['Particulars', 'Odd Semesters', 'Even Semesters'], rows: [['Course Fee', '₹13,000', '₹13,000'], ['Development & ERP Fee', '₹916', '₹165']], totals: ['Grand Total', '₹13,916', '₹13,165'] }
        })
      }
    ],
    seo: { title: 'Fee Structure | Guru Nanak College, Dhanbad', description: 'Detailed semester-wise fee structure for UG, BCA, and BBA courses at Guru Nanak College under NEP 2020 FYUGP.' }
  },

  'intake-capacity': {
    title: 'Intake Capacity',
    subtitle: 'Subject-wise maximum seat availability for the current academic session.',
    sections: [
      {
        id: 'seats', heading: 'Department-wise Capacity', type: 'list', order: 1,
        content: JSON.stringify([
          { title: 'Commerce', seats: 550, icon: '📈', color: '#f4a023', sub: 'B.Com Honours' },
          { title: 'Arts (History & Pol. Sc)', seats: 312, icon: '🏛️', color: '#0f2347', sub: '156 Seats Each' },
          { title: 'Arts (Eng, Eco, Psy, Hin)', seats: 512, icon: '📚', color: '#0ea5e9', sub: '128 Seats Each' },
          { title: 'BCA', seats: 90, icon: '💻', color: '#ef4444', sub: 'Vocational Course' },
          { title: 'BBA', seats: 90, icon: '💼', color: '#10b981', sub: 'Vocational Course' }
        ])
      }
    ],
    seo: { title: 'Intake Capacity | Guru Nanak College, Dhanbad', description: 'Subject-wise seat availability and intake capacity for all departments at Guru Nanak College, Dhanbad.' }
  },

  // ────────────────────── ACTIVITIES ──────────────────────
  'nss': {
    title: 'National Service Scheme (NSS)',
    subtitle: 'Motto: "Not Me But You". Developing student personality through community service.',
    sections: [
      {
        id: 'stats', heading: 'NSS Statistics', type: 'list', order: 1,
        content: JSON.stringify([
          { num: '500+', label: 'Active Volunteers', icon: '🙋‍♂️' },
          { num: '50+', label: 'Blood Units Donated', icon: '🩸' },
          { num: '20+', label: 'Adopted Villages', icon: '🏡' },
          { num: '1000+', label: 'Trees Planted', icon: '🌳' }
        ])
      },
      {
        id: 'activities', heading: 'Major Activities', type: 'list', order: 2,
        content: JSON.stringify(['Swachh Bharat Abhiyan', 'Blood Donation Camps', 'Traffic Awareness Drives', 'Disaster Relief & Rescue', 'National Integration Camps'])
      }
    ],
    seo: { title: 'NSS | Guru Nanak College, Dhanbad', description: 'National Service Scheme unit at Guru Nanak College — community service, blood donations, cleanliness drives.' }
  },

  'ncc': {
    title: 'National Cadet Corps (NCC)',
    subtitle: 'Motto: "Unity and Discipline". Shaping the youth into patriotic and disciplined citizens.',
    sections: [
      {
        id: 'about', heading: 'About NCC Wing', type: 'text', order: 1,
        content: '<p>The NCC unit of Guru Nanak College actively participates in Republic Day Camps (RDC), Combined Annual Training Camps (CATC), and Trekking expeditions. Cadets are trained in drill, map reading, and weapon handling.</p>'
      },
      {
        id: 'certificates', heading: 'Certificates', type: 'list', order: 2,
        content: JSON.stringify(['B-Certificate', 'C-Certificate'])
      }
    ],
    seo: { title: 'NCC | Guru Nanak College, Dhanbad', description: 'National Cadet Corps wing at Guru Nanak College — building patriotic citizens through military training.' }
  },

  'workshop': {
    title: 'Workshops & Seminars',
    subtitle: 'Bridging the gap between academia and industry through expert sessions.',
    sections: [
      {
        id: 'workshops', heading: 'Recent Workshops', type: 'list', order: 1,
        content: JSON.stringify([
          { title: 'Intellectual Property Rights (IPR)', dept: 'IQAC Cell', date: 'October 2023' },
          { title: 'New Education Policy (NEP 2020) Seminar', dept: 'Education Dept', date: 'August 2023' },
          { title: 'Cyber Security & Ethical Hacking', dept: 'BCA Department', date: 'July 2023' },
          { title: 'Financial Literacy for Youth', dept: 'Commerce Dept', date: 'May 2023' }
        ])
      }
    ],
    seo: { title: 'Workshops & Seminars | Guru Nanak College, Dhanbad', description: 'Recent workshops and seminars organized at Guru Nanak College.' }
  },

  'games-sports': {
    title: 'Games & Sports',
    subtitle: 'Promoting physical fitness, teamwork, and sportsmanship among students.',
    sections: [
      {
        id: 'outdoor', heading: 'Outdoor Sports', type: 'list', order: 1,
        content: JSON.stringify(['Cricket', 'Football', 'Volleyball', 'Athletics'])
      },
      {
        id: 'indoor', heading: 'Indoor Games', type: 'list', order: 2,
        content: JSON.stringify(['Table Tennis', 'Chess', 'Carrom', 'Badminton'])
      }
    ],
    seo: { title: 'Games & Sports | Guru Nanak College, Dhanbad', description: 'Sports facilities and athletic programs at Guru Nanak College.' }
  },

  'rotaract-club': {
    title: 'Rotaract Club',
    subtitle: 'Motto: "Fellowship Through Service". A global movement of young leaders.',
    sections: [
      {
        id: 'about', heading: 'Empowering Youth', type: 'text', order: 1,
        content: '<p>The Rotaract Club of Guru Nanak College operates under the guidance of Rotary International. It provides an opportunity for young men and women to enhance the knowledge and skills that will assist them in personal development, to address the physical and social needs of their communities.</p>'
      },
      {
        id: 'focus', heading: 'Key Focus Areas', type: 'list', order: 2,
        content: JSON.stringify(['Leadership Development', 'Community Service', 'Professional Networking'])
      }
    ],
    seo: { title: 'Rotaract Club | Guru Nanak College, Dhanbad', description: 'Rotaract Club at Guru Nanak College — fellowship through service.' }
  },

  'sadbhavana-diwas': {
    title: 'Sadbhavana Diwas',
    subtitle: 'Promoting National Integration, Peace, and Communal Harmony.',
    sections: [
      {
        id: 'about', heading: 'Harmony & Peace Pledge', type: 'text', order: 1,
        content: '<p><strong>Observed Annually on 20th August</strong></p><blockquote>"I take this solemn pledge that I will work for the emotional oneness and harmony of all the people of India regardless of caste, region, religion, or language. I further pledge that I shall resolve all differences among us through dialogue and constitutional means without resorting to violence."</blockquote>'
      }
    ],
    seo: { title: 'Sadbhavana Diwas | Guru Nanak College, Dhanbad', description: 'Sadbhavana Diwas celebration at Guru Nanak College — promoting national integration and harmony.' }
  },

  // ────────────────────── CAMPUS ──────────────────────
  'infrastructure': {
    title: 'World-Class Infrastructure',
    subtitle: 'Modern facilities for holistic education and development.',
    sections: [
      {
        id: 'facilities', heading: 'Key Facilities', type: 'list', order: 1,
        content: JSON.stringify([
          { title: 'Central Library', icon: '📚', desc: 'Over 50,000 books and digital journals.' },
          { title: 'Science Labs', icon: '🔬', desc: 'State-of-the-art equipments.' },
          { title: 'Auditorium', icon: '🎭', desc: '500+ seating capacity.' },
          { title: 'Sports Ground', icon: '⚽', desc: 'Vast playground for outdoor sports.' }
        ])
      }
    ],
    seo: { title: 'Infrastructure | Guru Nanak College, Dhanbad', description: 'Explore the world-class infrastructure of Guru Nanak College.' }
  },

  'classrooms': {
    title: 'Smart Classrooms',
    subtitle: 'Modern learning environment with smart technology integration.',
    sections: [
      {
        id: 'features', heading: 'Classroom Features', type: 'list', order: 1,
        content: JSON.stringify(['Spacious & Well-Ventilated', 'Ergonomic Seating', 'Interactive Smart Boards'])
      },
      {
        id: 'desc', heading: 'About', type: 'text', order: 2,
        content: '<p>Comfortable, well-ventilated, and equipped with smart tech.</p>'
      }
    ],
    seo: { title: 'Classrooms | Guru Nanak College, Dhanbad', description: 'Smart classrooms at Guru Nanak College with interactive smart boards.' }
  },

  'ict-rooms': {
    title: 'ICT & Computer Labs',
    subtitle: 'Empowering students with high-end workstations.',
    sections: [
      {
        id: 'about', heading: 'About ICT Facilities', type: 'text', order: 1,
        content: '<p>Our ICT rooms and computer laboratories are equipped with high-performance workstations, latest software, high-speed internet connectivity, and multimedia projectors to facilitate modern digital learning experiences for students across all departments.</p>'
      }
    ],
    seo: { title: 'ICT & Computer Labs | Guru Nanak College, Dhanbad', description: 'State-of-the-art ICT rooms and computer laboratories at Guru Nanak College.' }
  },

  'green-campus': {
    title: 'Our Green Initiatives',
    subtitle: 'Committed to environmental sustainability and eco-friendly campus practices.',
    sections: [
      {
        id: 'about', heading: 'Green Campus', type: 'text', order: 1,
        content: '<p>Guru Nanak College is committed to maintaining an eco-friendly campus with extensive green cover, rainwater harvesting, solar panels for clean energy, ban on single-use plastic, and regular tree plantation drives led by the NSS unit. Our green campus initiatives align with the UGC guidelines on sustainable development in higher education.</p>'
      }
    ],
    seo: { title: 'Green Campus | Guru Nanak College, Dhanbad', description: 'Environmental sustainability initiatives at Guru Nanak College.' }
  },

  // ────────────────────── HOMEPAGE COUNTERS ──────────────────────
  'site-counters': {
    title: 'Site Counter Data',
    subtitle: 'Key statistics shown on the homepage.',
    sections: [
      {
        id: 'counters', heading: 'Counter Stats', type: 'list', order: 1,
        content: JSON.stringify([
          { label: 'Students Enrolled', value: '4,000+', icon: '👨‍🎓', raw: 4000 },
          { label: 'Successful Alumni', value: '45,000+', icon: '🎓', raw: 45000 },
          { label: 'Years of Legacy', value: '55+', icon: '🏛️', raw: 55 }
        ])
      }
    ],
    seo: { title: 'Guru Nanak College, Dhanbad', description: 'Key statistics of Guru Nanak College, Dhanbad.' }
  }
};

// ── Committee Defaults Generator ──
function generateCommitteeDefaults() {
  const committees = [
    { slug: 'womens-cell', name: "Women's Cell", icon: '👩‍💼', desc: 'Dedicated to the safety, empowerment, and welfare of female students and staff at GNC.', purpose: ['Ensure a safe and harassment-free environment for women on campus.', "Conduct awareness programs on women's rights and legal provisions.", 'Provide counselling and support to female students in need.'], responsibilities: ['Monitor campus safety for women', "Handle complaints related to women's issues", 'Organize gender sensitization workshops', 'Coordinate with ICC for harassment cases'], chair: 'Senior Faculty Member', chairDesig: 'Associate Professor, Department of Hindi' },
    { slug: 'anti-ragging', name: 'Anti-Ragging Committee', icon: '🚫', desc: 'Committed to maintaining a 100% ragging-free campus in compliance with UGC & Supreme Court guidelines.', purpose: ['Prevent and prohibit ragging in all forms on campus.', 'Create awareness among students about legal consequences of ragging.', 'Investigate complaints and take strict action against offenders.'], responsibilities: ['Display anti-ragging notices', 'Collect anti-ragging affidavits', 'Investigate complaints promptly', 'Coordinate with police if required', 'Conduct orientation programs'], chair: 'Senior Faculty Member', chairDesig: 'Associate Professor, Department of Commerce' },
    { slug: 'sc-st', name: 'SC/ST Cell', icon: '🤝', desc: 'A dedicated welfare and support centre for Scheduled Caste and Scheduled Tribe students.', purpose: ['Ensure equal educational opportunities for SC/ST students.', 'Guide students about government scholarships and reservations.', 'Resolve academic and social issues faced by SC/ST students.'], responsibilities: ['Facilitate scholarship applications', 'Address grievances of SC/ST students', 'Organize awareness camps', 'Maintain data of SC/ST enrollment', 'Liaison with government welfare departments'], chair: 'Faculty Member', chairDesig: 'Assistant Professor, Department of History' },
    { slug: 'obc', name: 'OBC Cell', icon: '📚', desc: 'Supporting students from Other Backward Classes with their academic and welfare needs.', purpose: ['Facilitate awareness of OBC reservations and government schemes.', 'Guide OBC students for scholarship applications.', 'Provide academic and career counselling.'], responsibilities: ['Scholarship guidance for OBC students', 'Address academic grievances', 'Facilitate income/caste certificate help', 'Organize career awareness programs'], chair: 'Faculty Member', chairDesig: 'Assistant Professor, Department of Political Science' },
    { slug: 'grievance', name: 'Grievance Redressal Cell', icon: '⚖️', desc: 'An official platform for students and staff to raise and resolve their academic and administrative grievances.', purpose: ['Provide a fair and transparent mechanism for addressing grievances.', 'Ensure prompt redressal of student and staff complaints.', 'Maintain a record of grievances and their resolution.'], responsibilities: ['Receive and register grievances', 'Investigate complaints within stipulated time', 'Maintain grievance register', 'Submit reports to Principal', 'Ensure confidentiality and impartiality'], chair: 'Senior Faculty Member', chairDesig: 'Associate Professor, Department of English' },
    { slug: 'icc', name: 'Internal Complaints Committee (ICC)', icon: '🛡️', desc: 'Constituted under Sexual Harassment of Women at Workplace Act, 2013.', purpose: ['Prevent, prohibit, and redress sexual harassment complaints.', 'Conduct sensitization programs for students and staff.', 'Ensure impartial inquiry and fair resolution of complaints.'], responsibilities: ['Receive complaints of sexual harassment', 'Conduct inquiry within 90 days', 'Maintain confidentiality of complainant', 'Submit annual report to District Officer', 'Organize prevention workshops'], chair: 'Presiding Officer', chairDesig: 'Senior Lady Faculty Member' },
    { slug: 'minority', name: 'Minority Cell', icon: '🌙', desc: 'A welfare cell to support and guide students from minority communities in their academic journey.', purpose: ['Guide minority students about government scholarships and schemes.', 'Create an inclusive environment for minority students.', 'Address specific academic and personal issues.'], responsibilities: ['Pre-matric and post-matric scholarship guidance', 'Address minority student grievances', 'Organize awareness programs', 'Maintain enrollment data'], chair: 'Faculty Member', chairDesig: 'Assistant Professor, Department of Economics' },
    { slug: 'placement', name: 'Placement Cell', icon: '💼', desc: 'Bridging students with career opportunities through training, internships, and campus placements.', purpose: ['Facilitate campus placements and internship opportunities.', 'Organize skill development and career guidance programs.', 'Maintain industry-academia partnerships.'], responsibilities: ['Coordinate with companies for campus drives', 'Organize mock interviews and GD sessions', 'Maintain placement records', 'Career counselling for final year students', 'Organize job fairs'], chair: 'Placement Officer', chairDesig: 'Faculty, Department of BCA/BBA' },
    { slug: 'rusa', name: 'RUSA Cell', icon: '🏛️', desc: 'Rashtriya Uchchatar Shiksha Abhiyan — implementing central schemes for quality improvement.', purpose: ['Implement RUSA-funded projects and infrastructure development.', 'Ensure compliance with RUSA guidelines and reporting requirements.'], responsibilities: ['Coordinate RUSA grant utilization', 'Maintain RUSA project documentation', 'Submit utilization certificates', 'Monitor RUSA-funded activities', 'Liaison with State Higher Education Council'], chair: 'RUSA Coordinator', chairDesig: 'Nominated by Principal' },
  ];

  const result = {};
  committees.forEach(c => {
    result[c.slug] = {
      title: c.name, subtitle: c.desc,
      sections: [
        { id: 'chairperson', heading: 'Chairperson / Convener', type: 'text', order: 1, content: JSON.stringify({ name: c.chair, designation: c.chairDesig, icon: c.icon }) },
        { id: 'purpose', heading: 'Purpose', type: 'list', order: 2, content: JSON.stringify(c.purpose) },
        { id: 'responsibilities', heading: 'Key Responsibilities', type: 'list', order: 3, content: JSON.stringify(c.responsibilities) },
        { id: 'members', heading: 'Committee Members', type: 'table', order: 4, content: JSON.stringify({ headers: ['S.No.', 'Name', 'Designation', 'Department', 'Role'], rows: [['1', c.chair, c.chairDesig, '-', 'Chairperson'], ['2', 'Faculty Member', 'Assistant Professor', 'As per nomination', 'Member Secretary'], ['3', 'Faculty Member', 'Assistant Professor', 'As per nomination', 'Member'], ['4', 'Faculty Member', 'Assistant Professor', 'As per nomination', 'Member'], ['5', 'Non-Teaching Staff', 'As per nomination', 'Administration', 'Member']] }) }
      ],
      seo: { title: `${c.name} | Guru Nanak College, Dhanbad`, description: c.desc }
    };
  });
  return result;
}

export default DEFAULT_PAGE_CONTENT;
