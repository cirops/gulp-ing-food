let searchPage = 1;
let query = '';

window.myCallback = (data) => {
  let recipes = data.results;

  if (recipes.length === 0) {
    $('.results_total').text('No');
    $('.results_query').text(query);
  } else {
    $('.results_total').text(recipes.length);
    $('.results_page').text(recipes.length);
    $('.results_query').text(query);
    const ul = $('<ul>');
    for (let i = 0, l = recipes.length; i < l; i += 1) {
      ul.append(`<li><strong>${recipes[i].title}</strong>`);
    }
    $('.results_positive').show();
    $('.search_prev').show();
    $('.search_next').show();
    $('#results_box').append(ul);
  }
  $('.results_data').show();
  $('.icon-container').hide();
  $('#btn_submit').attr('disabled', false);
};

$('#search_form').submit((event) => {
  searchPage = 1;
  $('.search_prev').attr('disabled', true);
  $('#btn_submit').prop('disabled', true);
  $('.results_data').hide();
  $('.results_positive').hide();
  $('#results_box').html('');
  $('.icon-container').show();
  query = $('input[name="search"]').val();
  $.ajax({
    url: `http://www.recipepuppy.com/api/?i=${query}&p=${searchPage}`,
    async: true,
    dataType: 'jsonp',
    crossDomain: true,
    jsonp: 'callback',
    jsonpCallback: 'myCallback',
  });
  event.preventDefault();
});

$('.search_next').click((event) => {
  $('.icon-container').show();
  $('#results_box').html('');
  searchPage += 1;
  $('.search_prev').prop('disabled', false);
  $.ajax({
    url: `http://www.recipepuppy.com/api/?i=${query}&p=${searchPage}`,
    async: true,
    dataType: 'jsonp',
    crossDomain: true,
    jsonp: 'callback',
    jsonpCallback: 'myCallback',
  });
  event.preventDefault();
});

$('.search_prev').click((event) => {
  $('#results_box').html('');
  $('.icon-container').show();
  $('.icon-container').show();
  $('#results_box').html('');
  searchPage -= 1;
  if (searchPage === 1) {
    $('.search_prev').prop('disabled', true);
  }
  $.ajax({
    url: `http://www.recipepuppy.com/api/?i=${query}&p=${searchPage}`,
    async: true,
    dataType: 'jsonp',
    crossDomain: true,
    jsonp: 'callback',
    jsonpCallback: 'myCallback',
  });
  event.preventDefault();
});
