// Copy text
$(document).ready(function(){
  // Initialize tooltips
  $('[data-toggle="tooltip"]').tooltip();

  // Copy text on click
  $('.copy-icon').click(function(){
    var textToCopy = $(this).closest('.copy-text').text().trim();
    var tempInput = $('<input>');
    $('body').append(tempInput);
    tempInput.val(textToCopy).select();
    document.execCommand('copy');
    tempInput.remove();

    // Show tooltip with "Copied!" message
    $(this).tooltip('hide')
           .attr('data-original-title', 'Copied!')
           .tooltip('show');

    // Revert tooltip back to "Copy" after 2 seconds
    var that = $(this);
    setTimeout(function(){
      that.tooltip('hide')
          .attr('data-original-title', 'Copy')
          .tooltip();
    }, 2000);
  });
});

document.addEventListener('DOMContentLoaded', function() {

  const toggleSwitch = document.getElementById('billingSwitch');
  const billedElements = document.querySelectorAll('.billed');

  // Get all contentToHide elements 
  const contentToHide = document.querySelectorAll('.contentToHide');
   
  // Initial billed text
  billedElements.forEach(function(element) {
    element.textContent = toggleSwitch.checked ? '/mo, billed annually' : '/mo, billed monthly';
  });

  // Toggle change listener
  toggleSwitch.addEventListener('change', function() {
    
    // Update billed text
    billedElements.forEach(function(element) {
      element.textContent = toggleSwitch.checked ? '/mo, billed annually' : '/mo, billed monthly';
    });

    // Loop through each contentToHide 
    contentToHide.forEach(function(element) {

      const delText = element.querySelector('del');
      const spanText = element.querySelector('span');

      if(!toggleSwitch.checked) {
        element.classList.add('text-white');
        delText.classList.remove('text-muted'); 
        spanText.classList.remove('text-info');
      } else {
        element.classList.remove('text-white');     
        delText.classList.add('text-muted');
        spanText.classList.add('text-info');
      }

    });

  });

  $('[data-toggle="tooltip"]').tooltip();

});