// src/pages/StaffPage.jsx
import React from 'react';
import { useParams } from 'react-router-dom';
import { COLORS } from '../styles/colors';

export default function StaffPage({ faculties }) {
  const { staffType } = useParams(); // 'teaching' or 'non-teaching'
  
  // Filter data based on type from Admin Panel
  const filteredStaff = faculties?.filter(f => 
    staffType === 'teaching' ? f.type === 'Teaching' : f.type === 'Non-Teaching'
  ) || [];

  return (
    <div style={{ minHeight: '80vh', background: '#f4f7f6' }}>
      <div style={{ background: COLORS.navy, padding: '50px 20px', color: '#fff', textAlign: 'center' }}>
        <h1 style={{ textTransform: 'capitalize' }}>{staffType.replace('-', ' ')} Staff</h1>
      </div>
      
      <div style={{ maxWidth: '1200px', margin: '40px auto', padding: '0 20px', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '25px' }}>
        {filteredStaff.length > 0 ? filteredStaff.map(staff => (
          <div key={staff.id} style={{ background: '#fff', padding: '20px', borderRadius: '15px', textAlign: 'center', boxShadow: '0 5px 15px rgba(0,0,0,0.08)' }}>
            <img src={staff.imageUrl || '/images/default-avatar.png'} alt={staff.name} style={{ width: '120px', height: '120px', borderRadius: '50%', objectFit: 'cover', border: `3px solid ${COLORS.gold}` }} />
            <h3 style={{ margin: '15px 0 5px', color: COLORS.navy }}>{staff.name}</h3>
            <p style={{ color: '#666', fontSize: '14px', margin: 0 }}>{staff.designation}</p>
            <p style={{ color: COLORS.gold, fontWeight: 'bold', fontSize: '13px' }}>{staff.department}</p>
          </div>
        )) : (
          <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '50px' }}>
            <h3>No data found in Admin Panel for {staffType} staff.</h3>
          </div>
        )}
      </div>
    </div>
  );
}