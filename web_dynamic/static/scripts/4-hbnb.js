$(document).ready(() => {
  const amenityIDs = {};

  // Function to update the h4 tag with the list of amenities checked
  const updateAmenities = () => {
    const checkedAmenities = Object.values(amenityIDs);
    const amenitiesText = checkedAmenities.join(', ');
    $('.amenities h4').text(amenitiesText);
  };

  // Listen for changes on input checkboxes
  $('.amenities ul').on('change', 'input[type="checkbox"]', function (e) {
    const amenityID = $(this).data('id'); // Get the Amenity ID from the data-id attribute
    const amenityName = $(this).data('name');

    if ($(this).prop('checked')) {
      amenityIDs[amenityID] = amenityName;
    } else {
      delete amenityIDs[amenityID];
    }

    updateAmenities();
  });

  const checkAPIStatus = () => {
    $.ajax({
      type: 'GET',
      url: 'http://0.0.0.0:5001/api/v1/status/',
      success: (data) => {
        if (data.status === 'OK') {
          $('#api_status').addClass('available');
        } else {
          $('#api_status').removeClass('available');
        }
      }
    });
  };
  checkAPIStatus();

  const searchPlaces = () => {
    $.ajax({
      type: 'POST',
      url: 'http://0.0.0.0:5001/api/v1/places_search',
      contentType: 'application/json',
      data: JSON.stringify({}),
      success: function (data) {
        console.log(data);
        displayPlaces(data);
      },
      error: function (error) {
        console.error('Error searching places:', error);
      }
    });
  };

  const displayPlaces = (placesData) => {
    const placesSection = $('section.places');
    placesSection.empty();

    for (const place of placesData) {
      const article = $('<article>');
      article.append(`<div class="title_box"><h2>${place.name}</h2><div class="price_by_night">$${place.price_by_night} per night</div></div>`);
      article.append(`<div class="information"><div class="max_guest">${place.max_guest} Guests</div><div class="number_rooms">${place.number_rooms} Bedrooms</div><div class="number_bathrooms">${place.number_bathrooms} Bathroom</div></div>`);
      article.append(`<div class="description">${place.description}</div>`);

      placesSection.append(article);
    }
  };

  $('button').on('click', function () {
    // Make a new POST request to places_search with the list of checked Amenities
    $.ajax({
      type: 'POST',
      url: 'http://0.0.0.0:5001/api/v1/places_search',
      contentType: 'application/json',
      data: JSON.stringify({
        amenities: Object.keys(amenityIDs), // Pass the list of checked amenity IDs
      }),
      success: function (data) {
        displayPlaces(data);
      },
      error: function (error) {
        console.error('Error searching places:', error);
      }
    });
  });

  searchPlaces();
});
