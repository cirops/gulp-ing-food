
$('#search_form').submit(function( event ) {
  var query = $('input[name="search"]').val();
  $.get("https://www.googleapis.com/books/v1/volumes?q=" + query, function(data){
    $(".search_query").text(query);
    $(".search_query_p").show();
    var ul = $("<ul>");
    for (var i = 0, l = data.items.length; i < l; ++i) {
      ul.append("<li><strong>" + data.items[i].volumeInfo.title + "</strong> - " + data.items[i].volumeInfo.authors[0]);
    }
    $("#results_box").append(ul);
  });
  event.preventDefault();
});