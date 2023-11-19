$(function () {
  // To display the current date at the top of the page
  $('#currentDay').text(dayjs().format('dddd, MMMM D, YYYY'));

  function displayCurrentDate() {
    $('#currentDay').text(dayjs().format('dddd, MMMM D, YYYY'));
  }

  // To update time block colors based on current time
  function updateTimeBlocks() {
    var currentHour = dayjs().hour();
    // var currentHour = 13;

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

// Function to generate time blocks from 9am-5pm
function generateTimeBlocks() {
  var container = $('.container-lg');
  var businessHours = 9;

  for (var i = 0; i < 9; i++) {
    var hourId = 'hour-' + businessHours;

// Function to ensure that the time for 12pm is displayed as 12pm and not 12am
    var displayHour = businessHours >= 12 ? (businessHours === 12 ? '12 PM' : (businessHours - 12) + ' PM') : businessHours + ' AM';

    container.append(`
      <div id="${hourId}" class="row time-block">
        <div class="col-2 col-md-1 hour text-center py-3">${displayHour}</div>
        <textarea class="col-8 col-md-10 description" rows="3"></textarea>
        <button class="btn saveBtn col-2 col-md-1" aria-label="save">
          <i class="fas fa-save" aria-hidden="true"></i>
        </button>
      </div>
    `);

    businessHours++;
  }
}

  // To generate time blocks
  generateTimeBlocks();

  // To set time block colors on page load
  updateTimeBlocks();

  // To save user input to local storage
  $('.description').each(function () {
    var blockId = $(this).parent().attr('id');
    $(this).val(localStorage.getItem(blockId));
  });

  // Event listener for the save button
  $('.saveBtn').on('click', function () {
    var blockId = $(this).parent().attr('id');
    var blockText = $(this).siblings('.description').val();

    localStorage.setItem(blockId, blockText);
  });

  // Set interval to check if the current time needs to be updated
  setInterval(updateTimeBlocks, 60000);
});