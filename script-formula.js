document.addEventListener('DOMContentLoaded', function() {
  // Get the existing card element using text content match
  const enrichCard = Array.from(document.querySelectorAll('.card h3'))
    .find(h3 => h3.textContent.trim() === "Enrich people's first name")
    ?.closest('.card');

  let activeCell = null;
  let observer = null;

  function setupCanvasListener(canvas) {
    console.log('Setting up canvas listener for:', canvas);
    
    // Remove old listener if exists
    canvas.removeEventListener('click', handleCanvasClick);
    
    // Add new click listener
    canvas.addEventListener('click', handleCanvasClick);
  }

  function handleCanvasClick(e) {
    console.log('Canvas clicked');
    
    // Get the click coordinates relative to the canvas
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    console.log('Click coordinates:', { x, y });
    
    // Adjust these values based on your spreadsheet layout
    const columnAWidth = 150; // Increased from 100
    const headerHeight = 50; // Increased from 30
    
    // Check if click is in first column
    const isColumnA = x < columnAWidth;
    const isNotHeaderRow = y > headerHeight;
    
    console.log('Click analysis:', {
        isColumnA,
        isNotHeaderRow,
        columnAWidth,
        headerHeight
    });
    
    if (isColumnA && isNotHeaderRow) {
        console.log('Column A clicked (not header)');
        enrichCard?.classList.add('border-success');
        activeCell = { x, y };
    } else {
        console.log('Not column A or is header:', 
            isColumnA ? 'In column A' : 'Not in column A',
            isNotHeaderRow ? 'Not in header' : 'In header'
        );
        enrichCard?.classList.remove('border-success');
        activeCell = null;
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

  // Optional: Remove highlight when pressing Escape
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && activeCell) {
      enrichCard?.classList.remove('border-success');
      activeCell = null;
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
