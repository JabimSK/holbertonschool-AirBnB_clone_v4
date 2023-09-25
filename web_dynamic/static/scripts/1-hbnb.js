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
});
