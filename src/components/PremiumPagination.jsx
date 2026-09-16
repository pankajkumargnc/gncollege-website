// src/components/PremiumPagination.jsx — GNC Master Smart Pagination (WCAG 2.2 AA Compliant)
import React, { useMemo } from 'react';
import { COLORS } from '../styles/colors';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

export default function PremiumPagination({ 
  totalItems, 
  itemsPerPage = 15, 
  currentPage, 
  setCurrentPage, 
  showItemCount = true,
  scrollToTop = true,
  scrollAnchorId = ''
}) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  if (totalPages <= 1) return null;

  const NAVY = COLORS?.navy || '#0f2347';
  const GOLD = COLORS?.gold || '#f4a023';

  // Smart page calculation with ellipsis windows
  const paginationRange = useMemo(() => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages = [];
    const leftSiblingIndex = Math.max(currentPage - 1, 1);
    const rightSiblingIndex = Math.min(currentPage + 1, totalPages);

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPages - 2;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 5;
      for (let i = 1; i <= leftItemCount; i++) pages.push(i);
      pages.push('...');
      pages.push(totalPages);
    } else if (shouldShowLeftDots && !shouldShowRightDots) {
      pages.push(1);
      pages.push('...');
      for (let i = totalPages - 4; i <= totalPages; i++) pages.push(i);
    } else if (shouldShowLeftDots && shouldShowRightDots) {
      pages.push(1);
      pages.push('...');
      for (let i = leftSiblingIndex; i <= rightSiblingIndex; i++) pages.push(i);
      pages.push('...');
      pages.push(totalPages);
    }

    return pages;
  }, [totalPages, currentPage]);

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages || newPage === currentPage) return;
    setCurrentPage(newPage);

    if (scrollAnchorId) {
      const el = document.getElementById(scrollAnchorId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
    }
    if (scrollToTop) {
      window.scrollTo({ top: Math.max(0, window.scrollY - 380), behavior: 'smooth' });
    }
  };

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <nav 
      aria-label="Smart Pagination Navigation" 
      style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        gap: '12px', 
        marginTop: '36px', 
        padding: '16px 0',
        userSelect: 'none'
      }}
    >
      {/* 📊 Item Range Indicator */}
      {showItemCount && (
        <div style={{ fontSize: '12px', fontWeight: 700, color: '#64748b', letterSpacing: '0.3px' }}>
          Showing <span style={{ color: NAVY, fontWeight: 900 }}>{startItem}</span> to <span style={{ color: NAVY, fontWeight: 900 }}>{endItem}</span> of <span style={{ color: NAVY, fontWeight: 900 }}>{totalItems}</span> entries
        </div>
      )}

      {/* 🔘 Navigation Controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap', justifyContent: 'center' }}>
        {/* First Page Button */}
        {totalPages > 5 && (
          <button
            type="button"
            onClick={() => handlePageChange(1)}
            disabled={currentPage === 1}
            title="First Page"
            aria-label="Go to first page"
            style={{
              padding: '6px 10px',
              borderRadius: '8px',
              border: `1.5px solid ${currentPage === 1 ? '#e2e8f0' : `${NAVY}25`}`,
              background: currentPage === 1 ? '#f8fafc' : '#ffffff',
              color: currentPage === 1 ? '#cbd5e1' : NAVY,
              fontWeight: 700,
              fontSize: '12px',
              cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 2,
              transition: 'all 0.2s ease',
            }}
          >
            <ChevronsLeft size={14} />
          </button>
        )}

        {/* Previous Button */}
        <button 
          type="button"
          onClick={() => handlePageChange(currentPage - 1)} 
          disabled={currentPage === 1}
          aria-label="Go to previous page"
          style={{ 
            padding: '7px 14px', 
            borderRadius: '8px', 
            border: `1.5px solid ${currentPage === 1 ? '#e2e8f0' : `${NAVY}25`}`, 
            background: currentPage === 1 ? '#f8fafc' : '#ffffff', 
            color: currentPage === 1 ? '#94a3b8' : NAVY, 
            fontWeight: 800, 
            fontSize: '13px',
            cursor: currentPage === 1 ? 'not-allowed' : 'pointer', 
            transition: 'all 0.2s ease',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 4
          }}
        >
          <ChevronLeft size={15} /> Prev
        </button>
        
        {/* Page Number Buttons */}
        <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
          {paginationRange.map((page, idx) => {
            if (page === '...') {
              return (
                <span 
                  key={`ellipsis-${idx}`} 
                  style={{ 
                    padding: '0 6px', 
                    fontSize: '14px', 
                    fontWeight: 900, 
                    color: '#94a3b8',
                    letterSpacing: '2px' 
                  }}
                >
                  •••
                </span>
              );
            }

            const isActive = currentPage === page;
            return (
              <button 
                key={page} 
                type="button"
                onClick={() => handlePageChange(page)}
                aria-label={`Go to page ${page}`}
                aria-current={isActive ? 'page' : undefined}
                style={{ 
                  minWidth: '36px', 
                  height: '36px', 
                  padding: '0 8px',
                  borderRadius: '8px', 
                  border: isActive ? `1.5px solid ${GOLD}` : '1.5px solid #e2e8f0', 
                  background: isActive ? NAVY : '#ffffff', 
                  color: isActive ? GOLD : '#475569', 
                  fontWeight: 800, 
                  fontSize: '13px',
                  cursor: 'pointer', 
                  transition: 'all 0.2s ease', 
                  boxShadow: isActive ? `0 4px 14px ${NAVY}40` : 'none',
                  transform: isActive ? 'scale(1.04)' : 'none'
                }}
              >
                {page}
              </button>
            );
          })}
        </div>

        {/* Next Button */}
        <button 
          type="button"
          onClick={() => handlePageChange(currentPage + 1)} 
          disabled={currentPage === totalPages}
          aria-label="Go to next page"
          style={{ 
            padding: '7px 14px', 
            borderRadius: '8px', 
            border: `1.5px solid ${currentPage === totalPages ? '#e2e8f0' : `${NAVY}25`}`, 
            background: currentPage === totalPages ? '#f8fafc' : '#ffffff', 
            color: currentPage === totalPages ? '#94a3b8' : NAVY, 
            fontWeight: 800, 
            fontSize: '13px',
            cursor: currentPage === totalPages ? 'not-allowed' : 'pointer', 
            transition: 'all 0.2s ease',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 4
          }}
        >
          Next <ChevronRight size={15} />
        </button>

        {/* Last Page Button */}
        {totalPages > 5 && (
          <button
            type="button"
            onClick={() => handlePageChange(totalPages)}
            disabled={currentPage === totalPages}
            title="Last Page"
            aria-label="Go to last page"
            style={{
              padding: '6px 10px',
              borderRadius: '8px',
              border: `1.5px solid ${currentPage === totalPages ? '#e2e8f0' : `${NAVY}25`}`,
              background: currentPage === totalPages ? '#f8fafc' : '#ffffff',
              color: currentPage === totalPages ? '#cbd5e1' : NAVY,
              fontWeight: 700,
              fontSize: '12px',
              cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 2,
              transition: 'all 0.2s ease',
            }}
          >
            <ChevronsRight size={14} />
          </button>
        )}
      </div>
    </nav>
  );
}
