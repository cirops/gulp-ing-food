let searchPage = 1;
let query = '';

const ui = {
  submitButton: $('#btn_submit'),
  previousButton: $('.search_prev'),
  nextButton: $('.search_next'),
  spinner: $('.icon-container'),
  feedback: $('.results_data'),
  form: $('#search_form'),
  searchInput: $('#search_form input'),
  resultContainer: $('#results_box'),
};

const showLoader = () => {
  ui.resultContainer.html('');
  ui.spinner.show();
};

function fetchPage(pageIndex) {
  showLoader();
  searchPage = pageIndex;

  if (searchPage === 1) {
    ui.previousButton.prop('disabled', true);
  } else {
    ui.previousButton.prop('disabled', false);
  }

  $.ajax({
    url: `http://www.recipepuppy.com/api/?i=${query}&p=${searchPage}`,
    async: true,
    dataType: 'jsonp',
    crossDomain: true,
    jsonp: 'callback',
    jsonpCallback: 'fetchSuccess',
  }).catch(() => {
    ui.feedback.text(`No more results for "${query}".`);
    ui.spinner.hide();
    ui.submitButton.attr('disabled', false);
    ui.nextButton.attr('disabled', true);
  });
}

ui.form.submit((event) => {
  ui.submitButton.prop('disabled', true);
  ui.feedback.hide();
  ui.previousButton.hide();
  ui.nextButton.hide();
  query = ui.searchInput.val();

  fetchPage(1);
  event.preventDefault();
});

ui.previousButton.click((event) => {
  fetchPage(searchPage - 1);
  ui.nextButton.attr('disabled', false);
  event.preventDefault();
});

ui.nextButton.click((event) => {
  fetchPage(searchPage + 1);
  event.preventDefault();
});

window.fetchSuccess = (data) => {
  const recipes = data.results;
  if (recipes.length === 0) {
    ui.feedback.text(`No results found for "${query}".`);
  } else {
    ui.feedback.text(`Showing ${recipes.length} results for "${query}" on this page.`);
    const ul = $('<ul>');
    const recipesAsHtml = recipes.map(recipe => `
      <div class="card">
        <div class="row">
          <div class="col-md-auto thumb-container">
              <a href="${recipe.href}" target="_blank"><img class="card-img-top" src="${recipe.thumbnail ? recipe.thumbnail : 'food-placeholder.png'}" alt="Card image cap"></a>
          </div>
          <div class="col-md-auto" style="max-width: 80vw">
            <div class="card-block">
              <a href="${recipe.href}" target="_blank"><h4 class="card-title">${recipe.title}</h4></a>
              <p class="card-text "><strong>Ingredients:</strong> ${recipe.ingredients}</p>
            </div>
          </div>
        </div>
      </div>
    `);
    ul.append(recipesAsHtml);
    ui.previousButton.show();
    ui.nextButton.show();
    ui.resultContainer.append(ul);
  }
  ui.feedback.show();
  ui.spinner.hide();
  ui.submitButton.attr('disabled', false);
};

const checkInputValue = () => {
  const value = ui.searchInput.val();

  if (value) {
    ui.submitButton.attr('disabled', false);
    ui.submitButton.css('cursor', 'pointer');
  } else {
    ui.submitButton.attr('disabled', true);
    ui.submitButton.css('cursor', 'not-allowed');
  }
};

$(() => {
  ui.searchInput.on('keyup', checkInputValue);
  checkInputValue();
});
