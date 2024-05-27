$(document).ready(function() {
  const data = [
    {
      companyName: "Google",
      website: "https://google.com",
      description: "A problem isn't truly solved until it's solved for all. Googlers build products that help create opportunities for everyone, whether down the street or across the globe.",
      logo: "./assets/img/logo/Google-logoicon.svg"
    },
    {
      companyName: "Amazon",
      website: "https://amazon.com",
      description: "Amazon is guided by four principles: customer obsession rather than competitor focus, passion for invention, commitment to operational excellence, and long-term thinking.",
      logo: "./assets/img/logo/amazon logo.jpeg"
    },
    {
      companyName: "Apple",
      website: "https://apple.com",
      description: "We’re a diverse collective of thinkers and doers, continually reimagining what’s possible to help us all do what we love in new ways.",
      logo: "./assets/img/logo/Apple 14.svg"
    },
    {
      companyName: "Microsoft",
      website: "https://microsoft.com",
      description: "Every company has a mission. What's ours? To empower every person and every organization to achieve more.",
      logo: "./assets/img/logo/microsoft.svg"
    },
    {
      companyName: "IBM",
      website: "https://ibm.com",
      description: "At IBM, we do more than work. We create. We create as technologists, developers, and engineers. We create with our partners.",
      logo: "./assets/img/logo/ibm logo.svg"
    }
  ];

  // Function to filter data based on input
  function filterData(input) {
    return data.filter(item => item.companyName.toLowerCase().includes(input.toLowerCase()));
  }

  // Function to display search results
  function displayResults(results) {
    const resultList = $('#searchResults');
    resultList.empty(); // Clear previous results
    if (results.length === 0) {
      resultList.append('<p>No results found.</p>');
    } else {
      results.forEach(result => {
        resultList.append(`
          <div class="border-bottom px-4 py-4 mb-3 mb-md-6">
            <img class="img-fluid img mb-4" width="32" height="auto" alt="company logo" src="${result.logo}">
            <h5 class="h2 font-weight-bold mb-md-4">
              ${result.companyName}
            </h5>
            <a class="text-success" href="http://${result.website}" target="_blank">${result.website}</a>
            <p class="card-text text-muted text-truncate">${result.description}</p>
            <div>
              <a href="cbs-dashboard-listing.html" class="btn btn-xs btn-outline-success btn-sm mb-2 mb-md-0">
                Preview
              </a>
              <button type="button" class="btn btn-xs btn-success btn-sm ml-2">
                Unlock and list customers | <span class="text-monospace font-weight-normal">4 credits</span>
              </button>
            </div>
          </div>
        `);
      });
    }

    // Hide dataCrawled section when there is input in the search bar
    $('#dataCrawled').hide();
  }

  // Event listener for input field
  $('#searchInput').on('input', function() {
    const input = $(this).val(); // Get the input value
    const results = filterData(input); // Filter data based on input
    displayResults(results); // Display filtered results

    // Show search results container when there is input in the search bar
    $('#searchResultsContainer').show();

    // Hide dataCrawled section when there is input in the search bar
    $('#dataCrawled').hide();

    // Show dataCrawled section when there is no input in the search bar
    if ($('#searchInput').val() === '') {
      $('#dataCrawled').show();
    }
  });

  // Hide search results container when focus is lost from searchInput
  $('#searchInput').on('blur', function() {
    // Hide search results container
    $('#searchResultsContainer').hide();
  });
});