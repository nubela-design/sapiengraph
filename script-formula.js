document.addEventListener('DOMContentLoaded', function() {
  // Get the existing card element using text content match
  const enrichCard = Array.from(document.querySelectorAll('.card h3'))
    .find(h3 => h3.textContent.trim() === "Enrich people's first name")
    ?.closest('.card');

  let activeCell = null;
  let observer = null;
  let popoverA = null;
  let popoverB = null;

  // Create popover element
  function createPopoverA() {
    const div = document.createElement('div');
    div.className = 'position-absolute bg-white shadow rounded';
    div.style.cssText = 'z-index: 1000; display: none;';
    div.innerHTML = `
      <div class="card border border-success shadow-lg px-4 py-4" style="min-width: 300px;">
        <h3 class="h3 font-weight-bold">
          <svg style="width: 24px;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g fill="currentColor"><path d="M12 1C5.935 1 1 5.935 1 12s4.935 11 11 11a1 1 0 1 0 0-2c-4.962 0-9-4.037-9-9s4.038-9 9-9 9 4.037 9 9v2.857c0 1.024-.833 1.857-1.857 1.857s-1.857-.833-1.857-1.857V7.714a1 1 0 1 0-2 0v.178C14.38 7.166 13.248 6.714 12 6.714c-2.914 0-5.285 2.37-5.285 5.286s2.37 5.286 5.285 5.286c1.332 0 2.535-.511 3.466-1.327.477 1.587 1.936 2.755 3.677 2.755A3.86 3.86 0 0 0 23 14.857V12c0-6.065-4.934-11-11-11m0 14.286c-1.811 0-3.286-1.475-3.286-3.286S10.188 8.714 12 8.714s3.286 1.475 3.286 3.286-1.474 3.286-3.286 3.286"></path></g></svg>
          Enrich people's first name
        </h3>
        <code class="text-success border border-success rounded p-2 mb-3" style="background-color: #f7fee7;">
          =SG_LOOKUP_PERSON(FIRST_NAME)
        </code>
        <div class="d-flex justify-content-end">
          <button class="btn btn-xs btn-secondary-soft mr-2">Dismiss</button>
          <button class="btn btn-xs btn-success">Try now</button>
        </div>
      </div>
    `;
    document.body.appendChild(div);
    return div;
  }

  function createPopoverB() {
    const div = document.createElement('div');
    div.className = 'position-absolute bg-white shadow rounded';
    div.style.cssText = 'z-index: 1000; display: none;';
    div.innerHTML = `
      <div class="card border border-success shadow-lg px-4 py-4" style="min-width: 300px;">
        <h3 class="h3 font-weight-bold">
          <svg style="width: 24px;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g fill="currentColor"><path d="M12 1C5.935 1 1 5.935 1 12s4.935 11 11 11a1 1 0 1 0 0-2c-4.962 0-9-4.037-9-9s4.038-9 9-9 9 4.037 9 9v2.857c0 1.024-.833 1.857-1.857 1.857s-1.857-.833-1.857-1.857V7.714a1 1 0 1 0-2 0v.178C14.38 7.166 13.248 6.714 12 6.714c-2.914 0-5.285 2.37-5.285 5.286s2.37 5.286 5.285 5.286c1.332 0 2.535-.511 3.466-1.327.477 1.587 1.936 2.755 3.677 2.755A3.86 3.86 0 0 0 23 14.857V12c0-6.065-4.934-11-11-11m0 14.286c-1.811 0-3.286-1.475-3.286-3.286S10.188 8.714 12 8.714s3.286 1.475 3.286 3.286-1.474 3.286-3.286 3.286"></path></g></svg>
          Enrich people's last name
        </h3>
        <code class="text-success border border-success rounded p-2 mb-3" style="background-color: #f7fee7;">
          =SG_LOOKUP_PERSON(LAST_NAME)
        </code>
        <div class="d-flex justify-content-end">
          <button class="btn btn-xs btn-secondary-soft mr-2">Dismiss</button>
          <button class="btn btn-xs btn-success">Try now</button>
        </div>
      </div>
    `;
    document.body.appendChild(div);
    return div;
  }
  
  function showPopover(x, y, isColumnA) {
    // Hide any visible popover first
    hidePopovers();
    
    if (isColumnA) {
      if (!popoverA) popoverA = createPopoverA();
      popoverA.style.left = `${x + 20}px`;
      popoverA.style.top = `${y - 20}px`;
      popoverA.style.display = 'block';
      
      const [cancelBtn, applyBtn] = popoverA.querySelectorAll('button');
      applyBtn.onclick = () => {
        console.log('Apply first name enrichment');
        hidePopovers();
      };
      cancelBtn.onclick = hidePopovers;
    } else {
      if (!popoverB) popoverB = createPopoverB();
      popoverB.style.left = `${x + 20}px`;
      popoverB.style.top = `${y - 20}px`;
      popoverB.style.display = 'block';
      
      const [cancelBtn, applyBtn] = popoverB.querySelectorAll('button');
      applyBtn.onclick = () => {
        console.log('Apply last name enrichment');
        hidePopovers();
      };
      cancelBtn.onclick = hidePopovers;
    }
  }

  function hidePopovers() {
    if (popoverA) popoverA.style.display = 'none';
    if (popoverB) popoverB.style.display = 'none';
    activeCell = null;
  }

  function setupCanvasListener(canvas) {
    console.log('Setting up canvas listener for:', canvas);
    
    // Remove old listener if exists
    canvas.removeEventListener('click', handleCanvasClick);
    
    // Add new click listener
    canvas.addEventListener('click', handleCanvasClick);
  }

  function handleCanvasClick(e) {
    console.log('Canvas clicked');
    
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const columnAWidth = 150;
    const columnBWidth = columnAWidth * 2;
    const headerHeight = 50;
    
    const isColumnA = x < columnAWidth;
    const isColumnB = x >= columnAWidth && x < columnBWidth;
    const isNotHeaderRow = y > headerHeight;
    
    if ((isColumnA || isColumnB) && isNotHeaderRow) {
      console.log(`Column ${isColumnA ? 'A' : 'B'} clicked (not header)`);
      activeCell = { x, y };
      showPopover(e.clientX, e.clientY, isColumnA);
    } else {
      hidePopovers();
    }
  }

  // Wait for sheet to be initialized
  waitForElement('#enrichment-people-sheet', (peopleSheet) => {
    console.log('Found sheet, setting up observer');
    
    // Create an observer instance
    observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.addedNodes.length) {
          mutation.addedNodes.forEach((node) => {
            if (node.classList?.contains('univer-render-canvas')) {
              console.log('Canvas added to DOM');
              setupCanvasListener(node);
            }
          });
        }
      });
    });

    // Start observing the sheet for canvas changes
    observer.observe(peopleSheet, {
      childList: true,
      subtree: true
    });

    // Also check for existing canvas
    const existingCanvas = peopleSheet.querySelector('.univer-render-canvas');
    if (existingCanvas) {
      console.log('Found existing canvas');
      setupCanvasListener(existingCanvas);
    }
  });

  // Add document click handler to close popover when clicking outside
  document.addEventListener('click', function(e) {
    if (popoverA && !popoverA.contains(e.target) && !e.target.classList.contains('univer-render-canvas')) {
      hidePopovers();
    }
    if (popoverB && !popoverB.contains(e.target) && !e.target.classList.contains('univer-render-canvas')) {
      hidePopovers();
    }
  });

  // Add escape key handler
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      hidePopovers();
    }
  });

  // Debug logging
  console.log('All cards:', document.querySelectorAll('.card h3'));
  console.log('Found card:', enrichCard);
  console.log('Sheet element:', document.querySelector('#enrichment-people-sheet'));
});

// Function to check if element exists
function waitForElement(selector, callback, maxTries = 10) {
  if (maxTries <= 0) {
    console.error('Element not found after maximum tries:', selector);
    return;
  }

  const element = document.querySelector(selector);
  if (element) {
    console.log('Found element:', selector);
    callback(element);
  } else {
    console.log('Waiting for element:', selector, 'Tries left:', maxTries);
    setTimeout(() => {
      waitForElement(selector, callback, maxTries - 1);
    }, 1000);
  }
}
