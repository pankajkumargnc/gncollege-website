import React, { useState } from 'react';
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
