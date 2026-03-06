import { COLORS } from '../styles/colors';

const CollegeProfile = () => {
  return (
    <div style={{ background: '#f8f9fa', padding: '60px 20px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', background: '#fff', padding: '60px', borderRadius: 12, boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>

        {/* 1. PAGE HEADER */}
        <header style={{ textAlign: 'center', marginBottom: 60, borderBottom: `2px solid ${COLORS.gold}`, paddingBottom: 30 }}>
          <h1 style={{ fontSize: 48, fontWeight: 900, color: COLORS.navy, marginBottom: 10 }}>College Profile</h1>
          <p style={{ fontSize: 18, color: '#666' }}>Guru Nanak College, Dhanbad: A Legacy of Excellence</p>
        </header>

        {/* 2. INTRODUCTION SECTION */}
        <section style={{ marginBottom: 60, display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 50, alignItems: 'center' }}>
          <img src="/logo.png" alt="GNC Logo" style={{ width: '100%', borderRadius: '50%', border: `5px solid ${COLORS.gold}` }} />
          <div>
            <h2 style={{ fontSize: 32, fontWeight: 800, color: COLORS.navy, marginBottom: 20 }}>Welcome to Guru Nanak College</h2>
            <p style={{ lineHeight: 1.8, color: '#555', textAlign: 'justify' }}>
              Established in 1970 to mark the 500th birth anniversary of Guru Nanak Dev Ji, Guru Nanak College, Dhanbad, stands as a beacon of knowledge and character development. As a Sikh minority institution, we are committed to providing quality higher education to students from all backgrounds, fostering an environment of inclusivity, academic rigor, and holistic growth.
            </p>
          </div>
        </section>

        {/* 3. VISION & MISSION */}
        <section style={{ marginBottom: 60, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40 }}>
          <div style={{ background: '#f1f5f9', padding: 40, borderRadius: 12 }}>
            <h3 style={{ fontSize: 24, fontWeight: 700, color: COLORS.navy, borderLeft: `4px solid ${COLORS.gold}`, paddingLeft: 15, marginBottom: 20 }}>Our Vision</h3>
            <p style={{ color: '#666', lineHeight: 1.7, textAlign: 'justify' }}>To be a center of academic excellence that empowers students with knowledge, skills, and values to become responsible global citizens and leaders of tomorrow.</p>
          </div>
          <div style={{ background: '#f1f5f9', padding: 40, borderRadius: 12 }}>
            <h3 style={{ fontSize: 24, fontWeight: 700, color: COLORS.navy, borderLeft: `4px solid ${COLORS.gold}`, paddingLeft: 15, marginBottom: 20 }}>Our Mission</h3>
            <p style={{ color: '#666', lineHeight: 1.7, textAlign: 'justify' }}>To provide accessible and affordable education, promote research and innovation, and instill ethical principles to create a just and humane society.</p>
          </div>
        </section>

        {/* 4. PRINCIPAL'S MESSAGE */}
        <section style={{ marginBottom: 60, display: 'flex', gap: 40, alignItems: 'center' }}>
          <div style={{ flex: 1 }}>
            <h2 style={{ fontSize: 32, fontWeight: 800, color: COLORS.navy, marginBottom: 20 }}>Message from the Principal</h2>
            <p style={{ fontStyle: 'italic', color: '#555', lineHeight: 1.8, textAlign: 'justify' }}>
              "We believe in nurturing not just great students, but great human beings. Our focus is on providing an education that is a blend of modern learning and timeless values. We welcome you to be a part of our journey."
            </p>
            <p style={{ marginTop: 20, fontWeight: 700, color: COLORS.navy }}>- Dr. Sanjay Prasad, Principal</p>
          </div>
          <img src="images/pf1.jpeg" alt="Principal" style={{ width: 200, height: 200, borderRadius: '50%', objectFit: 'cover', border: `5px solid ${COLORS.navy}` }} />
        </section>

        {/* 5. COLLEGE HISTORY */}
        <section>
          <h2 style={{ fontSize: 32, fontWeight: 800, color: COLORS.navy, textAlign: 'center', marginBottom: 40 }}>Our Journey Through Time</h2>
          <div style={{ position: 'relative', borderLeft: '3px solid #ddd', padding: '0 20px 0 40px' }}>
            {/* Timeline Item 1 */}
            <div style={{ marginBottom: 40, position: 'relative' }}>
              <div style={{ position: 'absolute', left: -52, top: 0, width: 20, height: 20, background: COLORS.gold, borderRadius: '50%', border: '3px solid #fff', boxShadow: '0 0 0 3px #ddd' }}></div>
              <h4 style={{ fontSize: 20, fontWeight: 700, color: COLORS.navy }}>1970 - The Foundation</h4>
              <p style={{ color: '#666', textAlign: 'justify' }}>The college was established by the Gurudwara Prabandhak Committee, Dhanbad, to commemorate the 5th birth centenary of Guru Nanak Dev Ji.</p>
            </div>
            {/* Timeline Item 2 */}
            <div style={{ marginBottom: 40, position: 'relative' }}>
              <div style={{ position: 'absolute', left: -52, top: 0, width: 20, height: 20, background: COLORS.gold, borderRadius: '50%', border: '3px solid #fff', boxShadow: '0 0 0 3px #ddd' }}></div>
              <h4 style={{ fontSize: 20, fontWeight: 700, color: COLORS.navy }}>1985 - Introduction of Science Stream</h4>
              <p style={{ color: '#666', textAlign: 'justify' }}>To cater to the growing demand for science education, the college introduced Bachelor of Science (B.Sc.) programs.</p>
            </div>
            {/* Timeline Item 3 */}
            <div style={{ marginBottom: 40, position: 'relative' }}>
              <div style={{ position: 'absolute', left: -52, top: 0, width: 20, height: 20, background: COLORS.gold, borderRadius: '50%', border: '3px solid #fff', boxShadow: '0 0 0 3px #ddd' }}></div>
              <h4 style={{ fontSize: 20, fontWeight: 700, color: COLORS.navy }}>2005 - NAAC Accreditation</h4>
              <p style={{ color: '#666', textAlign: 'justify' }}>The college was first accredited by the National Assessment and Accreditation Council (NAAC), recognizing its commitment to quality education.</p>
            </div>
             {/* Timeline Item 4 */}
             <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', left: -52, top: 0, width: 20, height: 20, background: COLORS.gold, borderRadius: '50%', border: '3px solid #fff', boxShadow: '0 0 0 3px #ddd' }}></div>
              <h4 style={{ fontSize: 20, fontWeight: 700, color: COLORS.navy }}>2020 - Golden Jubilee</h4>
              <p style={{ color: '#666', textAlign: 'justify' }}>Celebrated 50 years of academic excellence and service to the community with various events and programs.</p>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default CollegeProfile;
