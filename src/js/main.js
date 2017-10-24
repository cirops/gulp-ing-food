
$('#search_form').submit((event) => {
  $('#results_box').html('');
  $('.icon-container').show();
  const query = $('input[name="search"]').val();
  $.get('https://www.googleapis.com/books/v1/volumes?q='.concat(query), (data) => {
    $('.results_data').hide();
    $('.results_positive').hide();
    if (data.totalItems === 0) {
      // $('.search_query_p').html(`<strong>No</strong> results found for "<em>${query}</em>".`);
      $('.results_total').text('No');
      $('.results_query').text(query);
    } else {
      $('.results_total').text(data.totalItems);
      $('.results_page').text(data.items.length);
      $('.results_query').text(query);
      const ul = $('<ul>');
      for (let i = 0, l = data.items.length; i < l; i += 1) {
        ul.append(`<li><strong>${data.items[i].volumeInfo.title}</strong> - ${data.items[i].volumeInfo.authors}`);
      }
      $('.results_positive').show();
      $('#results_box').append(ul);
      
    }
    $('.results_data').show();
    $('.icon-container').hide();
  });
  event.preventDefault();
});
