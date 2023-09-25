$(document).ready(function () {
  const selectedAmenities = {};

  // Function to update the h4 tag with the list of selected amenities
  function updateAmenitiesList () {
    const amenitiesList = Object.values(selectedAmenities).join(', ');
    $('.amenities h4').text(amenitiesList);
  }

  // Listen for changes on all input checkbox tags
  $("input[type='checkbox']").change(function () {
    const amenityName = $(this).data('name');
    // Check if the checkbox is checked
    if ($(this).prop('checked')) {
      // Append the amenity to the displayed list
      selectedAmenitiesList.append(amenityName + ', ');
    } else {
      // Remove the amenity from the displayed list
      selectedAmenitiesList.html(selectedAmenitiesList.html().replace(amenityName + ', ', ''));
    }
  });
});
