/* ═══════════════════════════════════════════
   PIXOVA STUDIO — portfolio.js
   Portfolio filtering with fade animation
═══════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');

  if (!filterBtns.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active button
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      portfolioItems.forEach(item => {
        const match = filter === 'all' || item.dataset.category === filter;

        if (match) {
          item.style.display = '';
          // Trigger fade-in
          item.style.opacity = '0';
          item.style.transform = 'translateY(16px)';
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              item.style.transition = 'opacity 0.45s ease, transform 0.45s ease';
              item.style.opacity = '1';
              item.style.transform = 'translateY(0)';
            });
          });
        } else {
          item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
          item.style.opacity = '0';
          item.style.transform = 'translateY(10px)';
          setTimeout(() => { item.style.display = 'none'; }, 310);
        }
      });
    });
  });

});
