$(document).ready(function() {
    $('.fa-magnifying-glass').click(function() {
        var searchTerm = $('.search-input').val();
        
        $.ajax({
            url: 'http://en.wikipedia.org/w/api.php',
            data: {
                action: 'query',
                list: 'search',
                srsearch: searchTerm,
                format: 'json'
            },
            dataType: 'jsonp',
            success: processResult
        });
    });
});

function processResult(apiResult) {
    var resultsContainer = $('.results-container');
    resultsContainer.empty(); // Clear previous results
    
    for (var i = 0; i < apiResult.query.search.length; i++) {
        var title = apiResult.query.search[i].title;
        var snippet = apiResult.query.search[i].snippet;

        // Append search result to the results container
        resultsContainer.append('<div class="result">' +
            '<h2>' + title + '</h2>' +
            '<p>' + snippet + '</p>' +
            '</div>');
    }
}
