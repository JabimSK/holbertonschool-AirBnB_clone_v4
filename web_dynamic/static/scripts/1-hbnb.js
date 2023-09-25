$(document).ready(() => {
  // Initialize an empty dictionary to store Amenity IDs
  const amenityIDs = {};

  // Function to update the h4 tag with the list of amenities checked
  const updateAmenities = () => {
    const checkedAmenities = Object.values(amenityIDs); // Get the values (Amenity IDs) from the dictionary
    const amenitiesText = checkedAmenities.join(', '); // Create a comma-separated string of checked amenities
    $('.amenities h4').text(amenitiesText); // Update the h4 tag with the list of checked amenities
  };

  // Listen for changes on input checkboxes
  $('.amenities ul').on('change', 'input[type="checkbox"]', function (e) {
    const amenityID = $(this).data('id'); // Get the Amenity ID from the data-id attribute

    if ($(this).prop('checked')) {
      // If the checkbox is checked, add the Amenity ID to the dictionary
      amenityIDs[amenityID] = $(this).data('name');
    } else {
      // If the checkbox is unchecked, remove the Amenity ID from the dictionary
      delete amenityIDs[amenityID];
    }

    // Update the h4 tag with the list of checked amenities
    updateAmenities();
  });
});
