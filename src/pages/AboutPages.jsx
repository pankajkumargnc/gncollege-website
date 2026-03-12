// src/pages/AboutPages.jsx
import React from 'react';
import { COLORS } from '../styles/colors';

const N = COLORS.navy || '#0f2347';
const G = COLORS.gold || '#f4a023';

const PageHeader = ({ title, sub }) => (
  <div style={{ background: N, padding: '60px 20px', textAlign: 'center', color: '#fff' }}>
    <h1 style={{ fontSize: '32px', fontWeight: 800, margin: 0 }}>{title}</h1>
    <p style={{ color: G, marginTop: 10, fontSize: '16px' }}>{sub}</p>
  </div>
);

// 1.1 College Profile
export const CollegeProfile = () => (
  <div>
    <PageHeader title="College Profile" sub="Estd. 1970 | Guru Nanak College, Dhanbad" />
    <div style={{ maxWidth: '800px', margin: '40px auto', padding: '0 20px', lineHeight: '1.8', color: '#444' }}>
      <p>Guru Nanak College, Dhanbad was established in the year 1970 on the occasion of the 500th Birth Anniversary of Guru Nanak Devji. It is a Sikh Minority Degree College affiliated to BBMKU, Dhanbad.</p>
      <p>The college has been a pioneer in providing quality education in Coal Capital of India, focusing on holistic development and academic excellence.</p>
    </div>
  </div>
);

// 1.2 Vision & Mission
export const VisionMission = () => (
  <div>
    <PageHeader title="Vision & Mission" sub="Our Core Values & Future Goals" />
    <div style={{ maxWidth: '1000px', margin: '40px auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', padding: '0 20px' }}>
      <div style={{ background: '#fff', padding: '30px', borderRadius: '15px', boxShadow: '0 5px 15px rgba(0,0,0,0.05)', borderTop: `5px solid ${G}` }}>
        <h2 style={{ color: N }}>Our Vision</h2>
        <p>To be a premier institution that provides inclusive education and fosters the spirit of service as taught by Guru Nanak Devji.</p>
      </div>
      <div style={{ background: '#fff', padding: '30px', borderRadius: '15px', boxShadow: '0 5px 15px rgba(0,0,0,0.05)', borderTop: `5px solid ${N}` }}>
        <h2 style={{ color: N }}>Our Mission</h2>
        <p>To provide quality higher education to the underprivileged sections of society and empower them through knowledge and skill-building.</p>
      </div>
    </div>
  </div>
);

// 1.3 Universal Committee Page
export const CommitteePage = ({ name, desc, icon }) => (
  <div>
    <PageHeader title={name} sub="Safety & Welfare Committees" />
    <div style={{ maxWidth: '800px', margin: '40px auto', padding: '0 20px' }}>
      <div style={{ background: '#fff', padding: '40px', borderRadius: '20px', textAlign: 'center', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
        <div style={{ fontSize: '50px', marginBottom: '20px' }}>{icon}</div>
        <h2 style={{ color: N }}>{name}</h2>
        <p style={{ fontSize: '18px', color: '#666' }}>{desc}</p>
        <div style={{ marginTop: '30px', padding: '20px', background: '#f9f9f9', borderRadius: '10px', border: '1px dashed #ccc' }}>
          List of members is currently under review and will be updated from Admin Panel.
        </div>
      </div>
    </div>
  </div>
);