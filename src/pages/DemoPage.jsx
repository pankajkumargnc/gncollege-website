import React, { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import '../styles/index.css';

// Professional Content Library for a Premium University Website
const contentLibrary = {
  'vision-mission': {
    title: 'Vision & Mission',
    heroImage: 'https://images.unsplash.com/photo-1531545514256-b1400bc00f31?q=80&w=1974&auto=format&fit=crop',
    overviewImage: 'https://images.unsplash.com/photo-1579547945413-497e1b991e61?q=80&w=2070&auto=format&fit=crop',
    overviewText: [
      "Our vision is to be a beacon of knowledge and a center for academic excellence, nurturing leaders of tomorrow who are intellectually competent, ethically sound, and socially compassionate. We aspire to create a transformative educational experience that is global in scope but rooted in our core values.",
      "We are committed to fostering a vibrant community of scholars, students, and staff, where inquiry, innovation, and enterprise are encouraged. Our mission is to contribute to society through the pursuit of education, learning, and research at the highest international levels of excellence."
    ],
    sections: [
      {
        title: 'Our Core Vision',
        content: 'To ascend as a globally recognized institution, pioneering research and shaping future-ready professionals who lead with integrity and a commitment to societal advancement.'
      },
      {
        title: 'Our Strategic Mission',
        content: 'To deliver a dynamic and interdisciplinary curriculum, foster a culture of critical inquiry and innovation, and build strong industry-academia partnerships that provide our students with unparalleled opportunities for growth and success.'
      }
    ]
  },
  'principal-message': {
    title: 'Message from the Principal',
    heroImage: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=2084&auto=format&fit=crop',
    overviewImage: 'https://images.unsplash.com/photo-1580582932707-520aed93a94d?q=80&w=1932&auto=format&fit=crop',
    overviewText: [
      "It is with immense pride and pleasure that I welcome you to Guru Nanak College, an institution where we are deeply committed to the pursuit of academic excellence and the holistic development of our students. Our ethos is built upon the foundational teachings of Guru Nanak Dev Ji, emphasizing integrity, compassion, and the relentless pursuit of knowledge.",
      "In a rapidly evolving world, education must transcend the boundaries of the classroom. We endeavor to create a dynamic learning environment that nurtures critical thinking, fosters innovation, and equips our students with the skills and resilience to navigate the challenges of the future. Our goal is not just to award degrees, but to cultivate leaders and responsible citizens."
    ],
    sections: [
      {
        title: 'A Legacy of Excellence',
        content: 'Since our inception in 1970, we have upheld a tradition of academic distinction. Our esteemed faculty, state-of-the-art infrastructure, and a culture of continuous improvement are the cornerstones of our legacy. We believe in providing an education that is both profound and progressive.'
      },
      {
        title: 'Nurturing Future Leaders',
        content: 'We recognize that each student is a unique reservoir of talent. Our focus extends beyond academic curricula to include a rich tapestry of extracurricular activities, sports, and community service, ensuring the all-round development of personality and character. We are dedicated to mentoring our students to become confident, articulate, and enlightened individuals.'
      }
    ]
  },
  'organogram': {
    title: 'College Organogram',
    heroImage: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop',
    overviewImage: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop',
    overviewText: [
      "The organizational structure of Guru Nanak College is designed to ensure efficient governance, academic integrity, and administrative accountability. Our organogram provides a clear and transparent framework that delineates roles, responsibilities, and the channels of communication across all levels of the institution.",
      "This hierarchical yet collaborative structure facilitates streamlined decision-making and empowers our various departments and committees to function effectively, all while being aligned with the overarching vision and mission of the college."
    ],
    sections: [
      {
        title: 'The Governing Council',
        content: 'As the apex body, the Governing Council, nominated by the Gurudwara Prabandhak Committee, Dhanbad, provides strategic direction and oversight. It is responsible for formulating policies, ensuring financial stability, and upholding the values upon which the college was founded.'
      },
      {
        title: 'Academic and Administrative Leadership',
        content: 'Led by the Principal, the academic and administrative wings work in synergy. This includes the Heads of Departments, who oversee curriculum and teaching quality, and the administrative staff, who manage student services, finance, and campus operations to ensure a seamless academic experience.'
      }
    ]
  },
  'teaching-staff': {
    title: 'Our Esteemed Faculty',
    heroImage: 'https://images.unsplash.com/photo-1543269664-76bc3997d9ea?q=80&w=2070&auto=format&fit=crop',
    overviewImage: 'https://images.unsplash.com/photo-1573496774435-34b3a7a4c9f8?q=80&w=2070&auto=format&fit=crop',
    overviewText: [
      "The faculty at Guru Nanak College is a distinguished body of scholars, researchers, and mentors who are the backbone of our academic ecosystem. With profound expertise in their respective fields and an unwavering commitment to teaching, they inspire and guide our students to achieve their highest potential.",
      "Our educators employ a blend of traditional wisdom and modern pedagogical techniques to create an engaging and intellectually stimulating learning environment. They are not just teachers, but mentors who are invested in the personal and professional growth of every student."
    ],
    sections: [
      {
        title: 'Pillars of Knowledge',
        content: 'Our faculty members are accomplished academics, many holding doctoral degrees from prestigious universities. Their active engagement in research and publications ensures that our curriculum remains contemporary, relevant, and aligned with global standards of excellence.'
      },
      {
        title: 'Commitment to Mentorship',
        content: 'Beyond the classroom, our professors serve as dedicated mentors, offering guidance on academic pathways, career choices, and personal development. This culture of mentorship fosters a supportive and nurturing community where students feel empowered to explore their interests and overcome challenges.'
      }
    ]
  },
  'womens-cell': {
    title: "Women's Empowerment Cell",
    heroImage: 'https://images.unsplash.com/photo-1608222351213-824143f83951?q=80&w=1932&auto=format&fit=crop',
    overviewImage: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop',
    overviewText: [
      "The Women's Empowerment Cell at Guru Nanak College is a dedicated body committed to fostering a safe, equitable, and empowering environment for all female students and staff. We strive to promote gender sensitization and address issues pertinent to women's rights and well-being within the campus.",
      "Through a series of targeted initiatives, workshops, and awareness programs, the cell works to build confidence, enhance skills, and ensure that every woman in our community has the opportunity to thrive academically, professionally, and personally."
    ],
    sections: [
      {
        title: 'Our Core Objectives',
        content: 'To create a secure and respectful campus environment, free from harassment and discrimination. To organize awareness programs on gender equality, legal rights, and health. To provide a platform for female students to voice their concerns and to conduct skill development workshops that promote self-reliance.'
      },
      {
        title: 'Key Initiatives',
        content: 'The cell regularly organizes seminars with eminent personalities, self-defense workshops, health and hygiene camps, and competitions to encourage creative expression. We also provide confidential counseling and support services for any student in need.'
      }
    ]
  },
  // Default content for other pages
  'default': {
    title: 'Guru Nanak College',
    heroImage: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop',
    overviewImage: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=2073&auto=format&fit=crop',
    overviewText: [
      "Welcome to this section of Guru Nanak College. We are dedicated to providing the best educational environment and resources for our students. This section provides detailed information about our initiatives, guidelines, and the various opportunities available.",
      "Our institution stands on the pillars of excellence, integrity, and community service. We strive to foster holistic development through academic rigor and extracurricular engagement."
    ],
    sections: [
      {
        title: 'Key Information',
        content: 'Strict adherence to college guidelines is maintained to ensure a disciplined and productive environment for all students and staff. We provide adequate resources, modern infrastructure, and support systems.'
      },
      {
        title: 'Further Details',
        content: 'For more specific details, documents, or inquiries, please feel free to contact the administrative block or refer to the official notices board.'
      }
    ]
  }
};

const DemoPage = () => {
  const location = useLocation();
  
  // Get page key from URL (e.g., 'vision-mission')
  const getPageKey = () => {
    const pathSegments = location.pathname.split('/').filter(Boolean);
    if (pathSegments.length === 0) return 'default';
    return pathSegments[pathSegments.length - 1];
  };

  const pageKey = getPageKey();
  const content = contentLibrary[pageKey] || contentLibrary['default'];
  const title = content.title || 'Guru Nanak College';

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="profile-page-wrapper">
      <header className="profile-hero" style={{ backgroundImage: `url(${content.heroImage})` }}>
        <div className="hero-overlay"></div>
        <div className="hero-content anim-fade-in">
          <h1 className="hero-title">{title}</h1>
          <p className="hero-subtitle">Guru Nanak College, Dhanbad</p>
        </div>
      </header>

      <div className="profile-container">
        <div className="profile-layout">
          <main className="profile-main">
            <section className="glass-panel profile-section anim-slide-up">
              <div className="section-grid" style={{ marginBottom: '3rem' }}>
                <div className="text-content">
                  <h2 className="section-heading">Overview of {title}</h2>
                  <div className="heading-underline" style={{ borderBottom: '2px solid #f59e0b' }}></div>
                  {content.overviewText.map((para, index) => (
                    <p key={index} className={`rich-text-content ${index > 0 ? 'mt-4' : ''}`}>
                      {para}
                    </p>
                  ))}
                </div>
                <div className="image-content">
                  <img src={content.overviewImage} alt={`${title} at Guru Nanak College`} className="profile-img hover-scale" />
                </div>
              </div>

              <div>
                <h2 className="section-heading">Core Tenets</h2>
                <div className="heading-underline" style={{ borderBottom: '2px solid #f59e0b' }}></div>
                {content.sections.map((section, index) => (
                  <div key={index} className="content-card" style={{ background: '#f8fafc', borderLeft: '5px solid #0f172a' }}>
                    <h4>{section.title}</h4>
                    <p>{section.content}</p>
                  </div>
                ))}
              </div>
            </section>
          </main>

          <aside className="profile-sidebar anim-slide-up" style={{animationDelay: '0.4s'}}>
            <div className="widget">
              <h3 className="widget-title"><span>📑</span> Quick Links</h3>
              <ul className="quick-links">
                {[
                  { label: 'College Profile', path: '/about-us/college-profile' },
                  { label: 'Admission Rules', path: '/admission/rule' },
                  { label: 'Vision & Mission', path: '/about-us/vision-mission' },
                  { label: 'Departments', path: '/academics/course-offered' },
                  { label: 'IQAC', path: '/academics/iqac' },
                  { label: 'Photo Gallery', path: '/gallery' },
                  { label: 'Contact Us', path: '/contact' }
                ].map((link, i) => (
                  <li key={i} className="quick-link-item">
                    <Link to={link.path} className="quick-link" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                      <span className="link-arrow">›</span> {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="helpdesk-widget">
              <div style={{ fontSize: '45px', marginBottom: '15px', position: 'relative', zIndex: 2 }}>📞</div>
              <h4 style={{ margin: '0 0 12px', fontSize: '19px', color: '#f4a023', position: 'relative', zIndex: 2 }}>Need Assistance?</h4>
              <p style={{ fontSize: '14px', margin: '0 0 20px', color: '#e2e8f0', lineHeight: '1.6', position: 'relative', zIndex: 2 }}>
                Contact our administration office for any queries.
              </p>
              <a href="tel:+917903340991" className="helpdesk-btn">Call Helpdesk Now</a>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default DemoPage;