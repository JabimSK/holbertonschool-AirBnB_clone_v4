$(document).ready(function () {
  // Initialize the displayed list of selected amenities
  const selectedAmenitiesList = $('div.Amenities h4');

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
