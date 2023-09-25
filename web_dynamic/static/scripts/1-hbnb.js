$(document).ready(function () {
  const selectedAmenities = {};

  // Function to update the h4 tag with the list of selected amenities
  function updateAmenitiesList () {
    const amenitiesList = Object.values(selectedAmenities).join(', ');
    $('.amenities h4').text(amenitiesList);
  }

  // Listen for changes on checkbox inputs
  $('.amenities input[type="checkbox"]').change(function () {
    const amenityId = $(this).data('id');
    const amenityName = $(this).data('name');

    if ($(this).is(':checked')) {
      // Checkbox is checked, store the Amenity ID and Name
      selectedAmenities[amenityId] = amenityName;
    } else {
      // Checkbox is unchecked, remove the Amenity ID
      delete selectedAmenities[amenityId];
    }

    // Update the amenities list display
    updateAmenitiesList();
  });
});
