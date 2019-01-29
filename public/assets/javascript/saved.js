$(document).ready(() => {
  const articlesContainer = $('.articles-container');

  const loadPage = () => {
    $.get('/api/articles?saved=true').then(data => {
      articlesContainer.empty();

      if (data && data.length) {
        renderArticles(data);
      } else {
        renderEmpty();
      }
    });
  };
  loadPage();
  const renderArticles = articles => {
    var articleCards = [];
    for (var i = 0; i < articles.length; i++) {
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
        $("<a class='btn btn-danger delete'>Delete From Saved</a>"),
        $("<a class='btn btn-info comments'>Article Comments</a>")
      )
    );

    card.append(cardHeader);

    card.data('_id', article._id);
    return card;
  };

  const renderEmpty = () => {
    var emptyAlert = $(
      [
        "<div class='alert alert-warning text-center'>",
        "<h4>Uh Oh. Looks like we don't have any saved articles.</h4>",
        '</div>',
        "<div class='card'>",
        "<div class='card-header text-center'>",
        '<h3>Would You Like to Browse Available Articles?</h3>',
        '</div>',
        "<div class='card-body text-center'>",
        "<h4><a href='/'>Browse Articles</a></h4>",
        '</div>',
        '</div>'
      ].join('')
    );
    articlesContainer.append(emptyAlert);
  };

  const renderCommentsList = data => {
    var commentsToRender = [];
    var currentComment;
    if (!data.comments.length) {
      currentComment = $(
        "<li class='list-group-item'>No comments for this article yet.</li>"
      );
      commentsToRender.push(currentComment);
    } else {
      for (var i = 0; i < data.comments.length; i++) {
        currentComment = $("<li class='list-group-item comment'>")
          .text(data.comments[i].commentText)
          .append(
            $("<button class='btn btn-danger comment-delete'>x</button>")
          );
        currentComment.children('button').data('_id', data.comments[i]._id);
        commentsToRender.push(currentComment);
      }
    }
    $('.comment-container').append(commentsToRender);
  };

  function handleArticleDelete() {
    var articleToDelete = $(this)
      .parents('.card')
      .data();

    $(this)
      .parents('.card')
      .remove();

    $.ajax({
      method: 'DELETE',
      url: '/api/articles/' + articleToDelete._id
    }).then(data => {
      if (data.ok) {
        loadPage();
      }
    });
  }
  function handleArticleComments(event) {
    var currentArticle = $(this)
      .parents('.card')
      .data();
    $.get('/api/comments/' + currentArticle._id).then(data => {
      var modalText = $("<div class='container-fluid text-center'>").append(
        $('<h4>').text('Comments For Article: ' + currentArticle._id),
        $('<hr>'),
        $("<ul class='list-group comment-container'>"),
        $("<textarea placeholder='New Comment' rows='4' cols='60'>"),
        $("<button class='btn btn-success save'>Save Comment</button>")
      );
      bootbox.dialog({
        message: modalText,
        closeButton: true
      });
      var commentData = {
        _id: currentArticle._id,
        comments: data || []
      };
      $('.btn.save').data('article', commentData);
      renderCommentsList(commentData);
    });
  }

  function handleCommentSave() {
    var commentData;
    var newComment = $('.bootbox-body textarea')
      .val()
      .trim();
    if (newComment) {
      commentData = {
        _headlineId: $(this).data('article')._id,
        commentText: newComment
      };
      $.post('/api/comments', commentData).then(() => {
        bootbox.hideAll();
      });
    }
  }

  function handleCommentDelete() {
    var commentToDelete = $(this).data('_id');
    $.ajax({
      url: '/api/comments/' + commentToDelete,
      method: 'DELETE'
    }).then(() => {
      bootbox.hideAll();
    });
  }

  const clearArticles = () => {
    $.get('api/clear').then(() => {
      articlesContainer.empty();
      loadPage();
    });
  };

  $(document).on('click', '.btn.delete', handleArticleDelete);
  $(document).on('click', '.btn.comments', handleArticleComments);
  $(document).on('click', '.btn.save', handleCommentSave);
  $(document).on('click', '.btn.comment-delete', handleCommentDelete);
  $('.clear').on('click', clearArticles);
});
