$(document).ready(() => {
  const amenityIDs = {};

  const updateAmenities = () => {
    const checkedAmenities = Object.values(amenityIDs);
    const amenitiesText = checkedAmenities.join(', ');
    $('.amenities h4').text(amenitiesText);
  };

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

  const searchPlaces = (data = {}) => {
    $.ajax({
      type: 'POST',
      url: 'http://0.0.0.0:5001/api/v1/places_search',
      contentType: 'application/json',
      data: JSON.stringify(data),
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
      article.append(`
      <div class="title_box">
        <h2>${place.name}</h2>
        <div class="price_by_night">$${place.price_by_night} per night</div>
      </div>`);
      article.append(`
      <div class="information">
        <div class="max_guest">${place.max_guest} ${place.max_guest !== 1 ? 'Guests' : 'Guest'}</div>
        <div class="number_rooms">${place.number_rooms} ${place.number_rooms !== 1 ? 'Bedrooms' : 'Bedroom'}</div>
        <div class="number_bathrooms">${place.number_bathrooms} ${place.number_bathrooms !== 1 ? 'Bathrooms' : 'Bathroom'}</div>
      </div>`);
      article.append(`
      <div class="description">${place.description}</div>`);

      placesSection.append(article);
    }
  };

  $('button').on('click', function () {
    // Make a new POST request to places_search, passing the list of checked Amenities
    const checkedAmenitiesList = Object.keys(amenityIDs);
    searchPlaces({'amenities': checkedAmenitiesList});
  });

  searchPlaces();
});
