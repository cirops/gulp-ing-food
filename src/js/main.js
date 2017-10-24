
$('#search_form').submit((event) => {
  const query = $('input[name="search"]').val();
  $.get('https://www.googleapis.com/books/v1/volumes?q='.concat(query), (data) => {
    if (data.totalItems === 0) {
      $('.search_query_p').html(`<strong>No</strong> results found for "<em>${query}</em>".`);
    } else {
      $('.search_total_results').text(data.totalItems);
      $('.search_n_results').text(data.items.length);
      $('.search_keyword').text(query);
      const ul = $('<ul>');
      for (let i = 0, l = data.items.length; i < l; i += 1) {
        ul.append(`<li><strong>${data.items[i].volumeInfo.title}</strong> - ${data.items[i].volumeInfo.authors}`);
      }
      $('#results_box').append(ul);
    }
    $('.search_query_p').show();
  });
  event.preventDefault();
});
