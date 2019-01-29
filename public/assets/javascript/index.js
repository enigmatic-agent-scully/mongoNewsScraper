$(document).ready(function() {
  const articlesContainer = $('.articles-container');

  const loadArticles = () => {
    $.get('/api/articles?saved=false').then(data => {
      articlesContainer.empty();
      if (data && data.length) {
        renderArticles(data);
      } else {
        renderEmpty();
      }
    });
  };
  loadArticles();
  const renderArticles = articles => {
    const articleCards = [];
    for (let i = 0; i < articles.length; i++) {
      articleCards.push(createCard(articles[i]));
    }
    articlesContainer.append(articleCards);
  };

  const createCard = article => {
    var card = $(`<div class='card'>`);
    var cardHeader = $(`<div class='card-header'>`).append(
      $('<h3>').append(
        $(`<a class='article-link' target='_blank' rel='noopener noreferrer'>`)
          .attr('href', article.link)
          .text(article.title),
        $(`<a class='btn btn-success save'>Save Article</a>`)
      )
    );

    card.append(cardHeader);
    card.data('_id', article._id);
    return card;
  };

  const renderEmpty = () => {
    var emptyAlert = $(
      [
        `<div class='alert alert-warning text-center'>`,
        `<h4>No new articles today!</h4>`,
        '</div>',
        `<div class='card'>`,
        `<div class='card-header text-center'>`,
        '<h3>What Would You Like To Do?</h3>',
        '</div>',
        `<div class='card-body text-center'>`,
        `<h4><a class='scrape-new' href='/api/get'>Try Scraping New Articles</a></h4>`,
        `<h4><a href='/saved'>Go to Saved Articles</a></h4>`,
        '</div>',
        '</div>'
      ].join('')
    );
    articlesContainer.append(emptyAlert);
  };

  function saveArticle() {
    var articleToSave = $(this)
      .parents('.card')
      .data();

    $(this)
      .parents('.card')
      .remove();

    articleToSave.saved = true;
    $.ajax({
      method: 'PUT',
      url: '/api/articles/' + articleToSave._id,
      data: articleToSave
    }).then(data => {
      if (data.saved) {
        loadArticles();
      }
    });
  }

  const getNewArticles = () => {
    $.get('/api/get').then(data => {
      console.log(data);
      loadArticles();
    });
  };

  const clearArticles = () => {
    $.get('/api/clear').then(() => {
      articlesContainer.empty();
      loadArticles();
    });
  };

  $(document).on('click', '.btn.save', saveArticle);
  $(document).on('click', '.scrape-new', getNewArticles);
  $('.clear').on('click', clearArticles);
});
