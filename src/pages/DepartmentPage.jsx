// src/pages/DepartmentPage.jsx
// ══════════════════════════════════════════════════════════════════
//  REFACTORED DEPARTMENT PORTAL — High-Performance Shell
//  Split into specialized components for better maintainability
// ══════════════════════════════════════════════════════════════════

import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { COLORS } from '../styles/colors';
import PDFModal from '../components/PDFModal';

// Specialized Sub-Components
import { NAVY, Spin } from '../components/departments/DepartmentUI';
import { DepartmentHub } from '../components/departments/DepartmentHub';
import { DepartmentHero } from '../components/departments/DepartmentHero';
import { DepartmentDetail } from '../components/departments/DepartmentDetail';

/* ── Department Static Meta Configuration ────────────────────────── */
const DEPT_META = {
  bca: {
    short: 'BCA', icon: '💻', color: '#0ea5e9',
    heroBg: 'linear-gradient(145deg,#f0f9ff,#dbeafe 50%,#fef9ec)',
    facultyKeys: ['BCA'],
  },
  bba: {
    short: 'BBA', icon: '📊', color: '#f59e0b',
    heroBg: 'linear-gradient(145deg,#fffbeb,#fef3c7 50%,#f0f9ff)',
    facultyKeys: ['BBA'],
  },
  commerce: {
    short: 'Commerce', icon: '🏦', color: '#10b981',
    heroBg: 'linear-gradient(145deg,#f0fdf4,#d1fae5 50%,#fef9ec)',
    facultyKeys: ['Commerce'],
  },
  humanities: {
    short: 'Humanities', icon: '📚', color: '#8b5cf6',
    heroBg: 'linear-gradient(145deg,#faf5ff,#ede9fe 50%,#f0f9ff)',
    facultyKeys: ['Hindi', 'English'],
    subjects: [
      { label: 'Dept. of Hindi',   slug: 'hindi',   icon: '📖', desc: 'Sanskriti aur sahitya ka sangam' },
      { label: 'Dept. of English', slug: 'english', icon: '📝', desc: 'Global language and literature' },
    ],
  },
  'social-science': {
    short: 'Social Science', icon: '🌍', color: '#ef4444',
    heroBg: 'linear-gradient(145deg,#fff5f5,#fee2e2 50%,#fef9ec)',
    facultyKeys: ['History', 'Political Science', 'Economics', 'Psychology'],
    subjects: [
      { label: 'History',            slug: 'history',            icon: '🏛️', desc: 'Past events aur civilizations ka adhyayan' },
      { label: 'Political Science',  slug: 'political-science',  icon: '⚖️', desc: 'Governance, policies aur public life' },
      { label: 'Economics',          slug: 'economics',          icon: '📈', desc: 'Resources, finance aur development' },
      { label: 'Psychology',         slug: 'psychology',         icon: '🧠', desc: 'Human behavior and mental processes' },
    ],
  },
};

/* ── Default Content for empty states — Ultra Premium Seeding ──────────────── */
const DEFAULT_CONTENT = {
  bca: {
    fullName: 'Bachelor of Computer Applications', 
    tagline: 'Code the Future. Innovate the World.',
    about: 'The BCA department at GNC College is a hub for budding software developers and tech innovators. We provide a rigorous academic environment combined with hands-on technical training to meet global industry standards.',
    vision: 'To be a premier center for excellence in computer education, producing highly skilled tech professionals with ethical values and innovative mindsets.',
    mission: 'Empowering students through cutting-edge curriculum, state-of-the-art computer labs, and strong industry-academia collaborations.',
    stats: [
      { label: 'Placements', value: '100% Support' },
      { label: 'Status', value: 'AICTE Appr.' },
      { label: 'Internships', value: 'Industry Linked' },
      { label: 'Labs', value: 'Advanced IT' }
    ],
    highlights: [
      { title: 'AICTE Approved', desc: 'Officially recognized technical education standards.', icon: '📜' },
      { title: 'Placement Portal', desc: 'Dedicated support for top IT industry hiring.', icon: '💼' },
      { title: 'Advanced IT Lab', desc: 'High-speed systems with latest software stacks.', icon: '💻' }
    ],
    curriculum: { 
      'Semester 1': ['C Programming Fundamentals', 'Discrete Mathematics', 'Computer Organization', 'Professional Communication', 'Lab: C Programming'],
      'Semester 2': ['Data Structures in C++', 'Numerical Techniques', 'Operating Systems', 'Environmental Science', 'Lab: Data Structures']
    },
    hod: { name: 'Dr. Munish Parmar', qual: 'MCA, Ph.D.', imageUrl: '' }
  },
  bba: {
    fullName: 'Bachelor of Business Administration', 
    tagline: 'Leading with Vision, Managing with Value.',
    about: 'Our BBA program is designed to build the foundation of future business leaders. We focus on case studies, industrial visits, and leadership development that prepare students for the global corporate landscape.',
    vision: 'Creating high-caliber management professionals who drive innovation and ethical business growth globally.',
    mission: 'Providing a transformative educational experience through practical management techniques and entrepreneurial mentorship.',
    stats: [
      { label: 'Training', value: 'Job Ready' },
      { label: 'Focus', value: 'Management' },
      { label: 'Projects', value: 'Real World' },
      { label: 'Status', value: 'Leading Hub' }
    ],
    highlights: [
      { title: 'Business Ethics', desc: 'Strong focus on ethical leadership and values.', icon: '⚖️' },
      { title: 'Case Study Hub', desc: 'Interactive learning with real-world scenarios.', icon: '📊' },
      { title: 'Placement Cell', desc: 'Connecting students with corporate giants.', icon: '🤝' }
    ],
    curriculum: {
      'Semester 1': ['Principles of Management', 'Business Economics', 'Business Statistics', 'English Language', 'IT for Managers'],
      'Semester 2': ['Organizational Behavior', 'Market Research', 'Business Law', 'Accounting for Managers', 'Minor Project']
    },
    hod: { name: 'Dr. R.N. Sinha', qual: 'MBA, Ph.D. (Finance)', imageUrl: '' }
  },
  commerce: {
    fullName: 'Department of Commerce', 
    tagline: 'Financial Excellence and Global Accounting.',
    about: 'The Commerce department offers deep insights into accountancy, business law, and global trade. We bridge traditional financial wisdom with modern fintech concepts for holistic development.',
    vision: 'To produce socially responsible commerce graduates with profound financial acumen and professional integrity.',
    mission: 'Academic rigor and professional skill-building in finance, taxation, and auditing through specialized workshops.',
    stats: [
      { label: 'Academic', value: 'University Top' },
      { label: 'CA/CS', value: 'Special Prep' },
      { label: 'Career', value: 'Finance/Bank' },
      { label: 'Labs', value: 'Tally Expert' }
    ],
    curriculum: {
      'Semester 1': ['Financial Accounting', 'Business Organization', 'Micro Economics', 'Accountancy Lab'],
      'Semester 2': ['Corporate Accounting', 'Auditing Principles', 'Macro Economics', 'Business Law']
    }
  },
  hindi: {
    fullName: 'Department of Hindi', 
    tagline: 'Hindi: Sahitya, Sanskriti aur Shaurya.',
    about: 'Hindi vibhaag ke madhyam se hum hindi sahitya, kavita aur bhartiya sanskriti ko yuva pichee tak pahunchate hain. Humara dhyan bhasha ki shuddhta aur sahitya ki gahrai par hai.',
    vision: 'Hindi bhasha aur sahitya ka vishv-star par prachar aur prasar.',
    mission: 'Vidhyarthiyon mein hindi sahitya ke prati ruchi aur critical research ki bhavna ko jagrit karna.',
    stats: [
      { label: 'Language', value: 'National' },
      { label: 'Focus', value: 'Sahitya' },
      { label: 'Seminars', value: 'Monthly' },
      { label: 'BBMKU', value: 'Top Dept' }
    ],
    curriculum: {
      'Semester 1': ['Hindi Sahitya ka Itihas', 'Kavya Shastra', 'Prayojanmulak Hindi', 'Vyakaran aur Bhasha Shastra'],
      'Semester 2': ['Adhunik Hindi Kavita', 'Natak aur Sahitya', 'Bhasha Vigyan', 'Upanyas aur Kahani']
    }
  },
  english: {
    fullName: 'Department of English', 
    tagline: 'Mastering Literature and Communication.',
    about: 'The English department provides a rich environment for studying world literature and linguistics. We focus on communicative proficiency and critical analysis of literary masterpieces.',
    vision: 'Fostering a global perspective through literature and empowering students with professional communication skills.',
    mission: 'Exposing students to diverse cultural narratives and promoting creative expression in the English language.',
    stats: [
      { label: 'Modern', value: 'Digital Lab' },
      { label: 'Literature', value: 'Global' },
      { label: 'Skills', value: 'Communication' },
      { label: 'Careers', value: 'Media/Edu.' }
    ],
    curriculum: {
      'Semester 1': ['British Poetry and Drama', 'History of English Literature', 'Communication Skills', 'Phonetics and Linguistics'],
      'Semester 2': ['Post-Colonial Literature', 'Creative Writing', 'American Literature', 'Modern Critical Theory']
    }
  },
  history: {
    fullName: 'Department of History', 
    tagline: 'Learning from the Past, Shaping the Future.',
    about: 'Discovering the chronicles of human civilization. We analyze the impact of historical events on modern society and foster a deep sense of heritage appreciation.',
    vision: 'To be a center for critical historical research and heritage preservation.',
    mission: 'Providing an unbiased and analytical view of history through fieldwork and archival studies.',
    stats: [
      { label: 'Research', value: 'Archives' },
      { label: 'Heritage', value: 'Indian/World' },
      { label: 'Civil', value: 'PSC Prep' },
      { label: 'Explore', value: 'Field Work' }
    ],
    curriculum: {
      'Semester 1': ['Ancient Indian History', 'World Civilizations', 'History of Modern India', 'Cultural Heritage'],
      'Semester 2': ['Medieval India', 'Modern European History', 'Historiography', 'Archival Research Methods']
    }
  },
  'political-science': {
    fullName: 'Dept. of Political Science', 
    tagline: 'Understanding Power, Policy, and Public Life.',
    about: 'A deep dive into political theories, international relations, and public administration. We prepare students for careers in governance, law, and diplomacy.',
    vision: 'Building informed and responsible citizens with a deep understanding of democratic values.',
    mission: 'Promoting analytical thinking about political systems and public policy through debate and research.',
    stats: [
      { label: 'Law', value: 'Foundation' },
      { label: 'Public', value: 'Policy' },
      { label: 'Debates', value: 'Quarterly' },
      { label: 'Civic', value: 'Leadership' }
    ],
    curriculum: {
      'Semester 1': ['Political Theory', 'Indian Constitution', 'Comparative Politics', 'Public Administration'],
      'Semester 2': ['International Relations', 'Western Political Thought', 'Modern Governments', 'Political Sociology']
    }
  },
  economics: {
    fullName: 'Department of Economics', 
    tagline: 'Analyzing Wealth, Resource, and Growth.',
    about: 'The Economics department focuses on analytical data, resource management, and global financial policies. We bridge theoretical models with real-world economic challenges.',
    vision: 'To lead in economic research and policy analysis for social and financial development.',
    mission: 'Equipping students with quantitative and qualitative economic tools for global career paths.',
    stats: [
      { label: 'Financial', value: 'Analytics' },
      { label: 'Resource', value: 'Expertise' },
      { label: 'Budget', value: 'Projects' },
      { label: 'BBMKU', value: 'Academic Star' }
    ],
    curriculum: {
      'Semester 1': ['Micro Economic Theory', 'Statistical Methods for Economics', 'Mathematical Economics', 'General Accounting'],
      'Semester 2': ['Macro Economic Theory', 'Development Economics', 'Public Finance', 'Economic Indian History']
    }
  },
  psychology: {
    fullName: 'Department of Psychology', 
    tagline: 'Exploring the Depth of Human Behavior.',
    about: 'We study the intricacies of the human mind, social behavior, and clinical mental health. Our program emphasizes both laboratory research and community mental health.',
    vision: 'Promoting mental well-being and psychological awareness through research and practice.',
    mission: 'Creating sensitive and skilled practitioners in the field of psychology and counseling.',
    stats: [
      { label: 'Lab', value: 'High Tech' },
      { label: 'Mind', value: 'Expertise' },
      { label: 'Care', value: 'Counseling' },
      { label: 'Social', value: 'Impact' }
    ],
    curriculum: {
      'Semester 1': ['Foundation of Psychology', 'Social Behavior', 'Biological Basis of Behavior', 'Developmental Psychology'],
      'Semester 2': ['Environmental Psychology', 'Cognitive Psychology', 'Clinical Foundations', 'Psychological Research Lab']
    }
  }
};

/* ── Single Department View ────────────────────────────────────────── */
function SingleDeptPage({ slug, subSlug }) {
  const meta = DEPT_META[slug] || { short: slug.toUpperCase(), icon: '🏛️', color: NAVY, heroBg: 'linear-gradient(145deg,#f8fafc,#f1f5f9)', facultyKeys: [slug] };
  const C = meta.color;
  const [data, setData] = useState(null);
  const [loading, setL] = useState(true);
  const [semTab, setSem] = useState(null);
  const [previewPdf, setPreviewPdf] = useState(null);

  // Determine the document we need from Firestore
  const targetDocId = subSlug || slug;

  useEffect(() => {
    setSem(null);
    const unsub = onSnapshot(doc(db, 'departments', targetDocId), snap => {
      const fsData = snap.exists() ? snap.data() : {};
      const def = DEFAULT_CONTENT[targetDocId] || {};
      
      // Intelligent field-level merging: use def if fsData field is empty/missing
      const merged = {
        ...def,
        ...fsData,
        // Ensure arrays and objects merged correctly if empty in FS
        stats: (fsData.stats?.length) ? fsData.stats : def.stats,
        highlights: (fsData.highlights?.length) ? fsData.highlights : def.highlights,
        curriculum: (fsData.curriculum && Object.keys(fsData.curriculum).length) ? fsData.curriculum : def.curriculum,
        about: fsData.about || def.about,
        vision: fsData.vision || def.vision,
        mission: fsData.mission || def.mission,
        fullName: fsData.fullName || def.fullName,
        tagline: fsData.tagline || def.tagline,
        hod: (fsData.hod?.name) ? fsData.hod : def.hod
      };

      setData(merged);
      const sems = Object.keys(merged.curriculum || {});
      if (sems.length) setSem(sems[0]);
      setL(false);
    }, (err) => {
      console.error(err);
      setData(DEFAULT_CONTENT[targetDocId] || {});
      setL(false);
    });
    return () => unsub();
  }, [targetDocId]);

  if (loading) return <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Spin color={C} /></div>;

  const d = data || {};
  const activeSem = semTab || (Object.keys(d.curriculum || {})[0]);

  return (
    <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", background: '#f8fafc', minHeight: '100vh', color: '#334155' }}>
      <style>{`
        .dp-hl{background:#fff;border:1.5px solid #f1f5f9;border-radius:16px;padding:22px 20px;height:100%;transition:all .3s cubic-bezier(.22,1,.36,1);}
        .dp-hl:hover{border-color:${C}3a;box-shadow:0 10px 28px ${C}12;transform:translateY(-3px);}
        .dp-rep{display:flex;align-items:center;gap:16px;background:#fff;border:1.5px solid #f1f5f9;border-radius:14px;padding:18px 20px;cursor:pointer;transition:all .2s;}
        .dp-rep:hover{border-color:${C}38;box-shadow:0 6px 20px ${C}0e;}
        .dp-ach{display:flex;gap:12px;align-items:flex-start;padding:14px 18px;background:#fff;border:1.5px solid #f1f5f9;border-radius:12px;transition:border-color .18s;}
        .dp-ach:hover{border-color:${C}38;}
        .dp-subj{display:flex;align-items:center;gap:11px;padding:11px 15px;background:#fff;border:1.5px solid #f1f5f9;border-radius:10px;transition:all .25s ease;}
        .dp-subj:hover{border-color:${C}38;background:${C}06;transform:translateX(4px);}
        .dp-sem{padding:10px 17px;border:1.5px solid #e2e8f0;border-radius:9px;background:#fff;color:#64748b;font-weight:600;cursor:pointer;transition:all .25s ease;min-height:44px;display:inline-flex;align-items:center;}
        .dp-sem.on{background:linear-gradient(135deg,${NAVY},#1a3a7c);color:#fff;border-color:transparent;box-shadow:0 4px 14px ${C}28;}
        .dp-fee-hd{display:grid;grid-template-columns:2fr 1fr 2fr;background:linear-gradient(135deg,${NAVY},#1a3a7c);padding:13px 20px;border-radius:14px 14px 0 0;}
        .dp-fee-row{display:grid;grid-template-columns:2fr 1fr 2fr;padding:14px 20px;border-bottom:1px solid #f1f5f9;}
        @media(max-width:900px){ .dp-g3{grid-template-columns:1fr 1fr !important;} }
        @media(max-width:640px){ .dp-g3,.dp-g2{grid-template-columns:1fr !important;} .dp-fee-hd,.dp-fee-row{grid-template-columns:1fr 1fr !important;} .dp-fee-note{display:none;} }
      `}</style>

      <DepartmentHero 
        slug={slug} 
        meta={meta} 
        d={d} 
        C={C} 
        feeRows={d.feeStructure || []} 
        facultyKeys={meta.facultyKeys || [meta.short]} 
        subSlug={subSlug}
      />

      <DepartmentDetail 
        d={d} 
        meta={meta} 
        activeSem={activeSem} 
        setSem={setSem} 
        setPreviewPdf={setPreviewPdf} 
        deptSlug={slug}
        subSlug={subSlug}
      />

      <div style={{ borderTop: '1px solid #f1f5f9', padding: '22px 20px', textAlign: 'center' }}>
        <Link to="/academics/departments"
          style={{ color: '#94a3b8', fontSize: 13, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 7, transition: 'color .15s' }}
          onMouseEnter={e => e.currentTarget.style.color = C}
          onMouseLeave={e => e.currentTarget.style.color = '#94a3b8'}
        >← Back to All Departments</Link>
      </div>

      {previewPdf && <PDFModal url={previewPdf.url} title={previewPdf.title} onClose={() => setPreviewPdf(null)} />}
    </div>
  );
}

/* ── Main Router Component ───────────────────────────────────────── */
export default function DepartmentPage() {
  const { deptSlug, subSlug } = useParams();
  
  // Decide which view to render based on URL params
  if (!deptSlug) {
    return <DepartmentHub DEPT_META={DEPT_META} />;
  }
  
  return <SingleDeptPage slug={deptSlug} subSlug={subSlug} />;
}