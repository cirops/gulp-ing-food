let searchPage = 1;
let query = '';

const $input = $('input[type="text"]');
const $button = $('#btn_submit');

setInterval(() => {
  if ($input.val().length > 0) {
    $button.attr('disabled', false);
  } else {
    $button.attr('disabled', true);
  }
}, 100);

$('#search_form').submit((event) => {
  searchPage = 1;
  $('.search_prev').attr('disabled', true);
  $('#btn_submit').prop('disabled', true);
  $('.results_data').hide();
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

window.myCallback = (data) => {
  const recipes = data.results;
  if (recipes.length === 0) {
    $('.results_data').text(`No results found for "${query}".`);
  } else {
    $('.results_data').text(`Showing ${recipes.length} results for "${query}" on this page.`);
    const ul = $('<ul>');
    for (let i = 0, l = recipes.length; i < l; i += 1) {
      ul.append(`
      <div class="card">
        <div class="row">
          <div class="col-md-auto thumb-container">
              <a href="${recipes[i].href}" target="_blank"><img class="card-img-top" src="${recipes[i].thumbnail}" alt="Card image cap"></a>
          </div>
          <div class="col-md-auto">
            <div class="card-block">
              <a href="${recipes[i].href}" target="_blank"><h4 class="card-title">${recipes[i].title}</h4></a>
              <p class="card-text"><strong>Ingredients:</strong> ${recipes[i].ingredients}</p>
            </div>
          </div>
        </div>
      </div>`);
    }
    $('.search_prev').show();
    $('.search_next').show();
    $('#results_box').append(ul);
  }
  $('.results_data').show();
  $('.icon-container').hide();
  $('#btn_submit').attr('disabled', false);
};

