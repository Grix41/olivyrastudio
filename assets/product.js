(function () {
  var stage = document.getElementById('gallery-stage');
  var galleryImage = document.getElementById('gallery-image');
  var thumbs = Array.prototype.slice.call(document.querySelectorAll('.gallery-thumb'));

  if (!stage || !galleryImage || !thumbs.length) return;

  thumbs.forEach(function (thumb) {
    thumb.addEventListener('click', function () {
      var view = thumb.getAttribute('data-view');
      stage.classList.remove('is-detail-a', 'is-detail-b');
      if (view !== 'full') stage.classList.add('is-' + view);
      thumbs.forEach(function (item) {
        item.setAttribute('aria-pressed', String(item === thumb));
      });
    });
  });
})();
