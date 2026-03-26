import os
import re

# --- Terminal Colors ---
GREEN = '\033[92m'
YELLOW = '\033[93m'
RED = '\033[91m'
BLUE = '\033[94m'
RESET = '\033[0m'

print(f"{BLUE}======================================================{RESET}")
print(f"{BLUE}🚀 GNC COLLEGE - AUTO FIXER & PAGINATION INJECTOR 🚀{RESET}")
print(f"{BLUE}======================================================{RESET}\n")

# --- 1. GENERATE PAGINATION COMPONENTS ---
def create_pagination_components():
    components_dir = os.path.join('src', 'components')
    if not os.path.exists(components_dir):
        os.makedirs(components_dir)

    # 1A. Premium Pagination (For Dynamic Lists/Arrays)
    pagination_code = """import React from 'react';
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
"""
    with open(os.path.join(components_dir, 'PremiumPagination.jsx'), 'w', encoding='utf-8') as f:
        f.write(pagination_code)
    print(f"{GREEN}✅ [CREATED] src/components/PremiumPagination.jsx (For Lists > 15 items){RESET}")

    # 1B. AutoPaginate (For Static Content / Long divs)
    autopaginate_code = """import React, { useState } from 'react';
import PremiumPagination from './PremiumPagination';

export default function AutoPaginate({ children, itemsPerPage = 10 }) {
  const [currentPage, setCurrentPage] = useState(1);
  
  // Convert static children into an array
  const childrenArray = React.Children.toArray(children);
  const totalItems = childrenArray.length;
  
  // Calculate slice
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentChildren = childrenArray.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div>
      <div className="auto-paginated-content">
        {currentChildren}
      </div>
      <PremiumPagination 
        totalItems={totalItems} 
        itemsPerPage={itemsPerPage} 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage} 
      />
    </div>
  );
}
"""
    with open(os.path.join(components_dir, 'AutoPaginate.jsx'), 'w', encoding='utf-8') as f:
        f.write(autopaginate_code)
    print(f"{GREEN}✅ [CREATED] src/components/AutoPaginate.jsx (For Static Long Content){RESET}")

# --- 2. SCAN AND FIX PDF MODALS ---
def scan_and_fix_pdf_modals():
    print(f"\n{BLUE}🔍 Scanning project for PDF Links & Modals...{RESET}")
    
    target_dirs = ['src/pages', 'src/components']
    
    for directory in target_dirs:
        if not os.path.exists(directory):
            continue
            
        for root, _, files in os.walk(directory):
            for file in files:
                if file.endswith('.jsx'):
                    filepath = os.path.join(root, file)
                    with open(filepath, 'r', encoding='utf-8') as f:
                        content = f.read()
                    
                    # Check if file has PDF/Drive links
                    has_pdf_link = bool(re.search(r'\.pdf|drive\.google\.com', content, re.IGNORECASE))
                    has_modal_import = 'PDFModal' in content
                    
                    if has_pdf_link:
                        if has_modal_import:
                            print(f"{GREEN}✅ [OK] {file} - PDFModal is already perfectly installed.{RESET}")
                        else:
                            print(f"{YELLOW}⚠️ [ACTION REQUIRED] {file} - PDF links found, but PDFModal is MISSING!{RESET}")
                            
                            # Auto-inject basic import if safe
                            if "import React" in content:
                                # Determine relative path
                                depth = filepath.count(os.sep) - 1
                                prefix = "../" * depth if depth > 0 else "./"
                                import_statement = f"\nimport PDFModal from '{prefix}components/PDFModal'; // Auto-Injected\n"
                                
                                new_content = content.replace("import React", f"import React{import_statement}", 1)
                                
                                # We won't auto-inject complex JSX state via regex as it breaks React easily.
                                print(f"   {BLUE}👉 Fix manually: Add `const [selectedPdf, setSelectedPdf] = useState(null);` and render `<PDFModal />` at the bottom of the component.{RESET}")

if __name__ == "__main__":
    create_pagination_components()
    scan_and_fix_pdf_modals()
    print(f"\n{GREEN}🎉 Script execution completed successfully!{RESET}")