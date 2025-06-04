
document.getElementById('searchButton').addEventListener('click', function () {
      const searchInput = document.getElementById('searchInput').value.toLowerCase();
    
      fetch('travel_recommendation_api.json')
        .then(response => response.json())
        .then(data => {
          const allDestinations = [];
    
          // Extract cities from countries
          data.countries.forEach(country => {
            country.cities.forEach(city => {
              allDestinations.push({
                name: city.name,
                country: country.name,
                imageUrl: city.imageUrl,
                description: city.description
              });
            });
          });
    
          // Add temples
          data.temples.forEach(temple => {
            allDestinations.push({
              name: temple.name,
              country: 'Various',
              imageUrl: temple.imageUrl,
              description: temple.description
            });
          });
    
          // Add beaches
          data.beaches.forEach(beach => {
            allDestinations.push({
              name: beach.name,
              country: 'Various',
              imageUrl: beach.imageUrl,
              description: beach.description
            });
          });
    
          const filtered = allDestinations.filter(item =>
            item.name.toLowerCase().includes(searchInput) ||
            item.description.toLowerCase().includes(searchInput)
          );
    
          displayRecommendations(filtered);
        });
    });
    
    document.getElementById('resetButton').addEventListener('click', function () {
      document.getElementById('recommendations').innerHTML = '';
      document.getElementById('searchInput').value = '';
    });
    
    function getLocalTime(country) {
      const timezones = {
        "Australia": "Australia/Sydney",
        "Japan": "Asia/Tokyo",
        "Brazil": "America/Sao_Paulo",
        "France": "Europe/Paris",
        "India": "Asia/Kolkata",
        "Cambodia": "Asia/Phnom_Penh",
        "French Polynesia": "Pacific/Tahiti"
      };
      const timezone = timezones[country];
      try {
        const options = {
          timeZone: timezone,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false
        };
        return timezone ? new Intl.DateTimeFormat('en-US', options).format(new Date()) : 'Time unavailable';
      } catch (e) {
        return 'Time unavailable';
      }
    }
    
    function displayRecommendations(recommendations) {
      const container = document.getElementById('recommendations');
      container.innerHTML = '';
      recommendations.forEach(item => {
        const div = document.createElement('div');
        div.className = 'recommendation';
        const localTime = getLocalTime(item.country);
        div.innerHTML = `
          <h3>${item.name}</h3>
          <img src="${item.imageUrl}" alt="${item.name}">
          <p><strong>Country:</strong> ${item.country}</p>
          <p><strong>Description:</strong> ${item.description}</p>
          <p><strong>Local Time:</strong> ${localTime}</p>
        `;
        container.appendChild(div);
      });
    }
    