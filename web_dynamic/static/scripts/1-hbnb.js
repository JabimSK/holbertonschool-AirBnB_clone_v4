$(document).ready(function () {
  // Initialize an empty object to store the checked amenities
  const selectedAmenities = {};

  // Function to update the h4 tag with the list of selected amenities
  function updateAmenities () {
    // Get the values (Amenity names) from the selectedAmenities object
    const selectedAmenityNames = Object.values(selectedAmenities);

    // Update the h4 tag inside the div with class "Amenities" with the list of selected Amenities
    $('div.Amenities h4').text(selectedAmenityNames.join(', '));
  }

  // Listen for changes on each input checkbox tag
  $("input[type='checkbox']").change(function () {
    const amenityId = $(this).data('id');
    const amenityName = $(this).data('name');

    if ($(this).prop('checked')) {
      // If the checkbox is checked, store the Amenity ID in the selectedAmenities object
      selectedAmenities[amenityId] = amenityName;
    } else {
      // If the checkbox is unchecked, remove the Amenity ID from the selectedAmenities object
      delete selectedAmenities[amenityId];
    }
    // Update the h4 tag with the list of selected amenities
    updateAmenities();
  });
});
