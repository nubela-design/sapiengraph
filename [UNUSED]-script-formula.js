document.addEventListener('DOMContentLoaded', function() {
  // Get the existing card element using text content match
  const enrichCard = Array.from(document.querySelectorAll('.card h3'))
    .find(h3 => h3.textContent.trim() === "Enrich people's first name")
    ?.closest('.card');

  let activeCell = null;
  let observer = null;
  let popoverA = null;
  let popoverB = null;
  let popoverC = null;
  let popoverD = null;
  let popoverE = null;

  // Create popover element
  function createPopoverA() {
    const div = document.createElement('div');
    div.className = 'position-absolute bg-white shadow rounded';
    div.style.cssText = 'z-index: 1000; display: none;';
    div.innerHTML = `
      <div class="card border border-success shadow-lg px-4 py-4" style="min-width: 300px;">
        <h3 class="font-weight-bold d-inline-flex">
          <svg style="width: 24px;" class="mb-1 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g fill="currentColor"><path d="M12 1C5.935 1 1 5.935 1 12s4.935 11 11 11a1 1 0 1 0 0-2c-4.962 0-9-4.037-9-9s4.038-9 9-9 9 4.037 9 9v2.857c0 1.024-.833 1.857-1.857 1.857s-1.857-.833-1.857-1.857V7.714a1 1 0 1 0-2 0v.178C14.38 7.166 13.248 6.714 12 6.714c-2.914 0-5.285 2.37-5.285 5.286s2.37 5.286 5.285 5.286c1.332 0 2.535-.511 3.466-1.327.477 1.587 1.936 2.755 3.677 2.755A3.86 3.86 0 0 0 23 14.857V12c0-6.065-4.934-11-11-11m0 14.286c-1.811 0-3.286-1.475-3.286-3.286S10.188 8.714 12 8.714s3.286 1.475 3.286 3.286-1.474 3.286-3.286 3.286"></path></g></svg>
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
    div.style.cssText = 'z-index: 999; display: none;';
    div.innerHTML = `
      <div class="card border border-success shadow-lg px-4 py-4" style="min-width: 300px;">
        <h3 class="font-weight-bold d-inline-flex">
          <svg style="width: 24px;" class="mb-1 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g fill="currentColor"><path d="M12 1C5.935 1 1 5.935 1 12s4.935 11 11 11a1 1 0 1 0 0-2c-4.962 0-9-4.037-9-9s4.038-9 9-9 9 4.037 9 9v2.857c0 1.024-.833 1.857-1.857 1.857s-1.857-.833-1.857-1.857V7.714a1 1 0 1 0-2 0v.178C14.38 7.166 13.248 6.714 12 6.714c-2.914 0-5.285 2.37-5.285 5.286s2.37 5.286 5.285 5.286c1.332 0 2.535-.511 3.466-1.327.477 1.587 1.936 2.755 3.677 2.755A3.86 3.86 0 0 0 23 14.857V12c0-6.065-4.934-11-11-11m0 14.286c-1.811 0-3.286-1.475-3.286-3.286S10.188 8.714 12 8.714s3.286 1.475 3.286 3.286-1.474 3.286-3.286 3.286"></path></g></svg>
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

  function createPopoverC() {
    const div = document.createElement('div');
    div.className = 'position-absolute bg-white shadow rounded';
    div.style.cssText = 'z-index: 998; display: none;';
    div.innerHTML = `
      <div class="card border border-success shadow-lg px-4 py-4" style="min-width: 300px;">
        <h3 class="font-weight-bold d-inline-flex">
          <svg style="width: 24px;" class="mb-1 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g fill="currentColor"><path d="M19 7h-3V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2M8 18.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5zm0-4a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5zm0-4a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5zm6 8a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5zm0-4a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5zm0-4a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5zm0-4a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5zm5 12a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5zm0-4a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5zm0-4a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5z"></path></g></svg>
          Enrich people's current company
        </h3>
        <code class="text-success border border-success rounded p-2 mb-3" style="background-color: #f7fee7;">
          =SG_LOOKUP_PERSON(COMPANY)
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

  function createPopoverD() {
    const div = document.createElement('div');
    div.className = 'position-absolute bg-white shadow rounded';
    div.style.cssText = 'z-index: 997; display: none;';
    div.innerHTML = `
      <div class="card border border-success shadow-lg px-4 py-4" style="min-width: 300px;">
        <h3 class="font-weight-bold d-inline-flex">
          <svg style="width: 24px;" class="mb-1 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g fill="currentColor"><path d="M20 15.5c-1.2 0-2.5-.2-3.6-.6h-.3c-.3 0-.5.1-.7.3l-2.2 2.2c-2.8-1.5-5.2-3.8-6.6-6.6l2.2-2.2c.3-.3.4-.7.2-1-.3-1.1-.5-2.4-.5-3.6 0-.5-.4-1-1-1H4c-.5 0-1 .5-1 1 0 9.4 7.6 17 17 17 .5 0 1-.5 1-1v-3.5c0-.5-.4-1-1-1M5 5h1.5c.1.9.3 1.8.5 2.6L5.8 8.8C5.4 7.6 5.1 6.3 5 5m14 14c-1.3-.1-2.6-.4-3.8-.8l1.2-1.2c.8.2 1.7.4 2.6.5zm0-7h2a8.999 8.999 0 0 0-9-9v2c3.9 0 7 3.1 7 7m-4 0h2c0-2.8-2.2-5-5-5v2c1.7 0 3 1.3 3 3"></path></g></svg>
          Enrich people's phone number
        </h3>
        <code class="text-success border border-success rounded p-2 mb-3" style="background-color: #f7fee7;">
          =SG_LOOKUP_PERSON(PHONE)
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

  function createPopoverE() {
    const div = document.createElement('div');
    div.className = 'position-absolute bg-white shadow rounded';
    div.style.cssText = 'z-index: 996; display: none;';
    div.innerHTML = `
      <div class="card border border-success shadow-lg px-4 py-4" style="min-width: 300px;">
        <h3 class="font-weight-bold d-inline-flex">
          <svg style="width: 24px;" class="mb-1 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g fill="currentColor"><path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z"></path></g></svg>
          Enrich people's title
        </h3>
        <code class="text-success border border-success rounded p-2 mb-3" style="background-color: #f7fee7;">
          =SG_LOOKUP_PERSON(TITLE)
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

  function showPopover(x, y, column) {
    // Hide any visible popover first
    hidePopovers();
    
    let currentPopover;
    let actionMessage;

    switch(column) {
      case 'A':
        if (!popoverA) popoverA = createPopoverA();
        currentPopover = popoverA;
        actionMessage = 'Apply first name enrichment';
        break;
      case 'B':
        if (!popoverB) popoverB = createPopoverB();
        currentPopover = popoverB;
        actionMessage = 'Apply last name enrichment';
        break;
      case 'C':
        if (!popoverC) popoverC = createPopoverC();
        currentPopover = popoverC;
        actionMessage = 'Apply company enrichment';
        break;
      case 'D':
        if (!popoverD) popoverD = createPopoverD();
        currentPopover = popoverD;
        actionMessage = 'Apply phone enrichment';
        break;
      case 'E':
        if (!popoverE) popoverE = createPopoverE();
        currentPopover = popoverE;
        actionMessage = 'Apply title enrichment';
        break;
    }

    if (currentPopover) {
      currentPopover.style.left = `${x + 20}px`;
      currentPopover.style.top = `${y - 20}px`;
      currentPopover.style.display = 'block';
      
      const [dismissBtn, tryNowBtn] = currentPopover.querySelectorAll('button');
      tryNowBtn.onclick = () => {
        console.log(actionMessage);
        hidePopovers();
      };
      dismissBtn.onclick = hidePopovers;
    }
  }

  function hidePopovers() {
    if (popoverA) popoverA.style.display = 'none';
    if (popoverB) popoverB.style.display = 'none';
    if (popoverC) popoverC.style.display = 'none';
    if (popoverD) popoverD.style.display = 'none';
    if (popoverE) popoverE.style.display = 'none';
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
    const columnCWidth = columnAWidth * 3;
    const headerHeight = 50;
    
    const isColumnA = x < columnAWidth;
    const isColumnB = x >= columnAWidth && x < columnBWidth;
    const isColumnC = x >= columnBWidth && x < columnCWidth;
    const isNotHeaderRow = y > headerHeight;
    
    if (isNotHeaderRow) {
      if (isColumnA) {
        console.log('Column A clicked');
        showPopover(e.clientX, e.clientY, 'A');
      } else if (isColumnB) {
        console.log('Column B clicked');
        showPopover(e.clientX, e.clientY, 'B');
      } else if (isColumnC) {
        console.log('Column C clicked');
        showPopover(e.clientX, e.clientY, 'C');
      } else if (isColumnD) {
        console.log('Column D clicked');
        showPopover(e.clientX, e.clientY, 'D');
      } else if (isColumnE) {
        console.log('Column E clicked');
        showPopover(e.clientX, e.clientY, 'E');
      } else {
        hidePopovers();
      }
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
    if (popoverC && !popoverC.contains(e.target) && !e.target.classList.contains('univer-render-canvas')) {
      hidePopovers();
    }
    if (popoverD && !popoverD.contains(e.target) && !e.target.classList.contains('univer-render-canvas')) {
      hidePopovers();
    }
    if (popoverE && !popoverE.contains(e.target) && !e.target.classList.contains('univer-render-canvas')) {
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
