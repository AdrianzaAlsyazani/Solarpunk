import { setCurrentCategory, setSearchQuery } from './state.js';
import { renderArticles, updateFilterButtons, openDetailModal, closeDetailModal } from './render.js';

export function bindUIEvents(articles) {
    const searchInput = document.getElementById('search-input');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const moodToggle = document.getElementById('mood-toggle');
    const moodIcon = document.getElementById('mood-icon');
    const toggleBtn = document.getElementById('toggle-filter');
    const toggleIcon = document.getElementById('toggle-icon');
    const drawer = document.getElementById('filter-drawer');
    const articleGrid = document.getElementById('article-grid');

    searchInput.addEventListener('input', event => {
        setSearchQuery(event.target.value);
        renderArticles(articles);
    });

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.dataset.category || 'all';
            setCurrentCategory(category);
            updateFilterButtons(category);
            renderArticles(articles);

            if (window.innerWidth < 768) {
                drawer.style.maxHeight = '0px';
                toggleBtn.setAttribute('aria-expanded', 'false');
                toggleIcon.style.transform = 'rotate(0deg)';
            }
        });
    });

    toggleBtn.addEventListener('click', () => {
        const isOpen = drawer.style.maxHeight && drawer.style.maxHeight !== '0px';
        if (isOpen) {
            drawer.style.maxHeight = '0px';
            toggleBtn.setAttribute('aria-expanded', 'false');
            toggleIcon.style.transform = 'rotate(0deg)';
        } else {
            drawer.style.maxHeight = `${drawer.scrollHeight}px`;
            toggleBtn.setAttribute('aria-expanded', 'true');
            toggleIcon.style.transform = 'rotate(180deg)';
        }
    });

    articleGrid.addEventListener('click', event => {
        const button = event.target.closest('[data-action="open-detail"]');
        if (!button) {
            return;
        }

        const articleId = button.dataset.articleId;
        const article = articles.find(item => item.id === articleId);
        if (article) {
            openDetailModal(article);
        }
    });

    document.addEventListener('keydown', event => {
        if (event.key === 'Escape') {
            closeDetailModal();
        }
    });

    document.body.addEventListener('click', event => {
        const modal = document.getElementById('detail-modal');
        if (!modal || !event.target.closest('#detail-modal')) {
            return;
        }

        if (event.target === modal) {
            closeDetailModal();
        }
    });

    moodToggle.addEventListener('click', () => {
        document.body.classList.toggle('senja-mode');

        const isSenja = document.body.classList.contains('senja-mode');
        moodIcon.innerText = isSenja ? '🌙' : '☀️';
        moodToggle.classList.toggle('bg-amber-100', !isSenja);
        moodToggle.classList.toggle('text-amber-800', !isSenja);
        moodToggle.classList.toggle('bg-emerald-900', isSenja);
        moodToggle.classList.toggle('text-emerald-100', isSenja);
    });
}
