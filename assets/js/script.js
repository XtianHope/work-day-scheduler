// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

$(function () {
  // To display the current date at the top of the page
  $('#currentDay').text(dayjs().format('dddd, MMMM D'));

  // To update time block colors based on current time
  function updateTimeBlocks() {
    var currentHour = dayjs().hour();

    $('.time-block').each(function () {
      const blockHour = parseInt($(this).attr('id').split('-')[1]);

      $(this).removeClass('past present future');

      if (blockHour < currentHour) {
        $(this).addClass('past');
      } else if (blockHour === currentHour) {
        $(this).addClass('present');
      } else {
        $(this).addClass('future');
      }
    });
  }
});

updateTimeBlocks();

// To save user input to local storage
$('.description').each(function () {
  var blockId = $(this).parent().attr('id');
  $(this).val(localStorage.getItem(blockId));
});