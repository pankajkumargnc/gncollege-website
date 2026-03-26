import React from 'react';
import { COLORS } from '../styles/colors';

export default function PremiumPagination({ totalItems, itemsPerPage = 15, currentPage, setCurrentPage }) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  if (totalPages <= 1) return null;

  const NAVY = COLORS?.navy || '#0f2347';
  const GOLD = COLORS?.gold || '#f4a023';

  const pages = [];
  for (let i = 1; i <= totalPages; i++) pages.push(i);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', marginTop: '40px', padding: '20px 0' }}>
      <button 
        onClick={() => setCurrentPage(p => Math.max(1, p - 1))} 
        disabled={currentPage === 1}
        style={{ padding: '8px 16px', borderRadius: '8px', border: `1.5px solid ${NAVY}33`, background: currentPage === 1 ? '#f1f5f9' : '#fff', color: currentPage === 1 ? '#94a3b8' : NAVY, fontWeight: 700, cursor: currentPage === 1 ? 'not-allowed' : 'pointer', transition: '0.2s' }}
      >
        ◀ Prev
      </button>
      
      <div style={{ display: 'flex', gap: '6px' }}>
        {pages.map(p => (
          <button 
            key={p} 
            onClick={() => setCurrentPage(p)}
            style={{ width: '36px', height: '36px', borderRadius: '8px', border: 'none', background: currentPage === p ? NAVY : '#f8fafc', color: currentPage === p ? GOLD : '#64748b', fontWeight: 800, cursor: 'pointer', transition: '0.2s', boxShadow: currentPage === p ? `0 4px 12px ${NAVY}40` : 'none' }}
          >
            {p}
          </button>
        ))}
      </div>

      <button 
        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} 
        disabled={currentPage === totalPages}
        style={{ padding: '8px 16px', borderRadius: '8px', border: `1.5px solid ${NAVY}33`, background: currentPage === totalPages ? '#f1f5f9' : '#fff', color: currentPage === totalPages ? '#94a3b8' : NAVY, fontWeight: 700, cursor: currentPage === totalPages ? 'not-allowed' : 'pointer', transition: '0.2s' }}
      >
        Next ▶
      </button>
    </div>
  );
}
