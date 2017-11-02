let searchPage = 1;
let query = '';

const $button = $('#btn_submit');
const $buttonPrev = $('.search_prev');
const $buttonNext = $('.search_next');

function fetchPage(pageIndex) {
  $('#results_box').html('');
  $('.icon-container').show();
  searchPage = pageIndex;

  if (searchPage === 1) {
    $buttonPrev.prop('disabled', true);
  } else {
    $buttonPrev.prop('disabled', false);
  }
  $.ajax({
    url: `http://www.recipepuppy.com/api/?i=${query}&p=${searchPage}`,
    async: true,
    dataType: 'jsonp',
    crossDomain: true,
    jsonp: 'callback',
    jsonpCallback: 'fetchSuccess',
  }).catch(() => {
    $('.results_data').text(`No more results for "${query}".`);
    $('.icon-container').hide();
    $('#btn_submit').attr('disabled', false);
    $buttonNext.attr('disabled', true);
  });
}

$('#search_form').submit((event) => {
  $('#btn_submit').prop('disabled', true);
  $('.results_data').hide();
  query = $('input[name="search"]').val();

  fetchPage(1);
  event.preventDefault();
});

$buttonPrev.click((event) => {
  fetchPage(searchPage - 1);
  $buttonNext.attr('disabled', false);
  event.preventDefault();
});

$buttonNext.click((event) => {
  fetchPage(searchPage + 1);
  event.preventDefault();
});

window.fetchSuccess = (data) => {
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
              <a href="${recipes[i].href}" target="_blank"><img class="card-img-top" src="${recipes[i].thumbnail ? recipes[i].thumbnail: 'food-placeholder.png'}" alt="Card image cap"></a>
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

const checkInputValue = () => {
  const value = $('#search_form input').val();

  if (value) {
    $button.attr('disabled', false);
    $button.css('cursor', 'pointer');
  } else {
    $button.attr('disabled', true);
    $button.css('cursor', 'not-allowed');
  }
};

$('#search_form input').on('keyup', checkInputValue);
checkInputValue();
