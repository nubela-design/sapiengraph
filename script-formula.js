document.addEventListener('DOMContentLoaded', function() {
  // Create popover element
  const popover = document.createElement('div');
  popover.className = 'card position-fixed d-none';
  popover.style.zIndex = '9999';
  popover.innerHTML = `
    <div class="card mb-0 px-4 py-4">
      <h3 class="h3 font-weight-bold">
        Enrich people's first name
      </h3>
      <code class="text-success border border-success rounded p-2">
        =SG_LOOKUP_PERSON(FIRST_NAME)
      </code>
    </div>
  `;
  document.body.appendChild(popover);

  // Track currently active popover
  let activePopover = null;

  // Function to position popover
  function positionPopover(cell) {
    const cellRect = cell.getBoundingClientRect();
    const popoverRect = popover.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    
    // Check if there's room below the cell
    const spaceBelow = viewportHeight - cellRect.bottom;
    const spaceAbove = cellRect.top;
    
    if (spaceBelow >= popoverRect.height + 10) {
      // Position below the cell
      popover.style.top = (cellRect.bottom + 5) + 'px';
    } else if (spaceAbove >= popoverRect.height + 10) {
      // Position above the cell
      popover.style.top = (cellRect.top - popoverRect.height - 5) + 'px';
    } else {
      // If no space above or below, position at cell's middle
      popover.style.top = (cellRect.top + (cellRect.height / 2) - (popoverRect.height / 2)) + 'px';
    }

    // Center horizontally with the cell
    popover.style.left = (cellRect.left + (cellRect.width / 2) - (popoverRect.width / 2)) + 'px';
  }

  // Wait for sheet to be initialized
  setTimeout(() => {
    const peopleSheet = document.querySelector('#peopleWorkbook');
    if (peopleSheet) {
      // Handle click events
      peopleSheet.addEventListener('click', function(e) {
        const cell = e.target.closest('.univer-sheet-cell');
        
        // If clicking outside any cell, hide popover
        if (!cell) {
          popover.classList.add('d-none');
          activePopover = null;
          return;
        }

        // Check if it's column A (but not A1)
        if (cell.classList.contains('column-0')) {
          const rowClass = Array.from(cell.classList).find(c => c.startsWith('row-'));
          if (rowClass && rowClass !== 'row-0') {
            // Show popover first (but hidden) to get its dimensions
            popover.style.visibility = 'hidden';
            popover.classList.remove('d-none');
            
            // Position the popover
            positionPopover(cell);
            
            // Make popover visible
            popover.style.visibility = 'visible';
            activePopover = cell;
            
            // Prevent event bubbling
            e.stopPropagation();
          }
        } else {
          // Hide popover when clicking other cells
          popover.classList.add('d-none');
          activePopover = null;
        }
      });
    }
  }, 1000); // Wait for 1 second to ensure sheet is loaded

  // Optional: Close popover when pressing Escape
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && activePopover) {
      popover.classList.add('d-none');
      activePopover = null;
    }
  });

  // Optional: Reposition popover on scroll or resize
  window.addEventListener('scroll', function() {
    if (activePopover) {
      positionPopover(activePopover);
    }
  }, true);

  window.addEventListener('resize', function() {
    if (activePopover) {
      positionPopover(activePopover);
    }
  });
});
