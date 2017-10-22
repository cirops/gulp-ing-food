
$('#search_form').submit((event) => {
  const query = $('input[name="search"]').val();
  $.get('https://www.googleapis.com/books/v1/volumes?q='.concat(query), (data) => {
    if (data.items.length <= 0) {
      $('.search_n_results').text('No');
    } else {
      $('.search_n_results').text(data.items.length);
    }
    $('.search_keyword').text(query);
    $('.search_query_p').show();
    const ul = $('<ul>');
    for (let i = 0, l = data.items.length; i < l; i += 1) {
      ul.append('<li><strong>'.concat(data.items[i].volumeInfo.title).concat('</strong> - ').concat(data.items[i].volumeInfo.authors));
    }
    $('#results_box').append(ul);
  });
  event.preventDefault();
});
