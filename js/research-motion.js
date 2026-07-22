(function () {
  'use strict';

  function revealNotes() {
    var notes = document.querySelectorAll('.reveal');
    if (!notes.length || !('IntersectionObserver' in window)) {
      notes.forEach(function (node) { node.classList.add('is-visible'); });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    notes.forEach(function (node, index) {
      node.style.setProperty('--reveal-delay', Math.min(index * 55, 220) + 'ms');
      observer.observe(node);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', revealNotes);
  } else {
    revealNotes();
  }
}());
