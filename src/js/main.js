let searchPage = 0;
let query = '';

$('#search_form').submit((event) => {
  $('#btn_submit').prop('disabled', true);
  $('#results_box').html('');
  $('.icon-container').show();
  query = $('input[name="search"]').val();
  $.get(`https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=10`, (data) => {
    $('.results_data').hide();
    $('.results_positive').hide();

    if (data.totalItems === 0) {
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
      $('.search_prev').show();
      $('.search_prev').prop('disabled', true);
      searchPage = 0;
      $('.search_next').show();
      $('#results_box').append(ul);
    }

    $('.results_data').show();
    $('.icon-container').hide();
    $('#btn_submit').attr('disabled', false);
  });
  event.preventDefault();
});

$('.search_next').click((event) => {
  $('.icon-container').show();
  $('#results_box').html('');
  searchPage += 1;
  $('.search_prev').prop('disabled', false);
  $.get(`https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=10&startIndex=${searchPage * 10}`, (data) => {
    $('.results_data').hide();
    $('.results_positive').hide();

    $('.results_total').text(data.totalItems);
    $('.results_page').text(data.items.length);
    $('.results_query').text(query);
    const ul = $('<ul>');
    for (let i = 0, l = data.items.length; i < l; i += 1) {
      ul.append(`<li><strong>${data.items[i].volumeInfo.title}</strong> - ${data.items[i].volumeInfo.authors}`);
    }
    $('.results_positive').show();
    $('.search_prev').show();
    $('.search_next').show();
    $('#results_box').append(ul);
    $('.results_data').show();
    $('.icon-container').hide();
    $('#btn_submit').attr('disabled', false);
  });
  event.preventDefault();
});

$('.search_prev').click((event) => {
  $('#results_box').html('');
  $('icon-container').show();
  searchPage -= 1;
  if (searchPage === 0) {
    $('.search_prev').attr('disabled', true);
  }

  $.get(`https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=10&startIndex=${searchPage * 10}`, (data) => {
    $('.results_data').hide();
    $('.results_positive').hide();

    $('.results_total').text(data.totalItems);
    $('.results_page').text(data.items.length);
    $('.results_query').text(query);
    const ul = $('<ul>');
    for (let i = 0, l = data.items.length; i < l; i += 1) {
      ul.append(`<li><strong>${data.items[i].volumeInfo.title}</strong> - ${data.items[i].volumeInfo.authors}`);
    }
    $('.results_positive').show();
    $('.search_prev').show();
    $('.search_next').show();
    $('#results_box').append(ul);
    $('.results_data').show();
    $('.icon-container').hide();
    $('#btn_submit').attr('disabled', false);
  });
  event.preventDefault();
});
