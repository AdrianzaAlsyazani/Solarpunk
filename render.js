import { getFilteredArticles } from './state.js';

const getArticleGrid = () => document.getElementById('article-grid');
const getBody = () => document.body;

function createArticleCard(article) {
    return `
        <article class="glass-card p-8 rounded-[2rem] hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group animate-fade-in">
            <span class="text-xs font-bold tracking-widest uppercase text-amber-600">${article.category}</span>
            <h3 class="text-2xl my-4 text-emerald-900 group-hover:text-emerald-700 font-serif">${article.title}</h3>
            <p class="text-gray-600 mb-6 line-clamp-3">${article.description}</p>
            <div class="border-t border-emerald-900/5 pt-4 flex items-center justify-between">
                <div class="text-sm">
                    <span class="text-gray-400">Pengganti:</span>
                    <span class="font-medium text-emerald-800">${article.replacement}</span>
                </div>
                <button data-action="open-detail" data-article-id="${article.id}" class="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-900 font-bold hover:bg-emerald-900 hover:text-white transition-all shadow-sm">
                    →
                </button>
            </div>
        </article>
    `;
}

function renderEmptyState() {
    const articleGrid = getArticleGrid();
    articleGrid.innerHTML = `
        <div class="col-span-full py-20 text-center">
            <p class="text-xl text-emerald-800/40 font-serif italic">Belum ada alternatif yang ditemukan untuk pencarian ini...</p>
        </div>
    `;
}

export function renderArticles(articles) {
    const articleGrid = getArticleGrid();
    const filteredArticles = getFilteredArticles(articles);

    if (filteredArticles.length === 0) {
        renderEmptyState();
        return;
    }

    articleGrid.innerHTML = filteredArticles.map(createArticleCard).join('');
}

export function closeDetailModal() {
    const detailModal = document.getElementById('detail-modal');
    if (!detailModal) {
        return;
    }

    detailModal.classList.remove('opacity-100');
    const modalPanel = detailModal.querySelector('.modal-panel');
    modalPanel?.classList.remove('scale-100');

    setTimeout(() => {
        detailModal.remove();
        getBody().style.overflow = 'auto';
    }, 300);
}

export function openDetailModal(article) {
    closeDetailModal();

    const modal = document.createElement('div');
    modal.id = 'detail-modal';
    modal.className = 'fixed inset-0 z-[100] flex items-center justify-center p-4 bg-emerald-950/40 backdrop-blur-md opacity-0 transition-opacity duration-300';

    modal.innerHTML = `
        <div class="modal-panel bg-[#fdfaf3] w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-[3rem] p-8 md:p-12 shadow-2xl transform scale-95 transition-transform duration-300">
            <div class="flex justify-between items-start mb-6">
                <div>
                    <span class="text-amber-600 font-bold uppercase tracking-widest text-xs">${article.category}</span>
                    <h2 class="text-3xl md:text-4xl text-emerald-900 mt-2 font-serif">${article.title}</h2>
                </div>
                <button id="close-modal-button" class="text-gray-400 hover:text-red-500 text-2xl" aria-label="Tutup detail">✕</button>
            </div>
            <div class="space-y-6 text-gray-700 leading-relaxed">
                <section>
                    <h4 class="font-bold text-emerald-800 uppercase text-xs tracking-wider mb-2">Mengapa Ini Penting?</h4>
                    <p>${article.description}</p>
                </section>
                <section class="bg-emerald-50 p-6 rounded-2xl border border-emerald-100">
                    <h4 class="font-bold text-emerald-800 uppercase text-xs tracking-wider mb-2">Langkah Transisi (How-To)</h4>
                    <p>${article.how_to}</p>
                </section>
                <section>
                    <h4 class="font-bold text-emerald-800 uppercase text-xs tracking-wider mb-2">Dampak Ekologis</h4>
                    <p class="italic text-emerald-700">${article.impact || 'Memberikan manfaat lingkungan yang lebih baik.'}</p>
                </section>
            </div>
            <button id="close-modal-footer" class="w-full mt-8 bg-emerald-900 text-white py-4 rounded-2xl font-bold hover:bg-emerald-800 transition">Kembali ke Pustaka</button>
        </div>
    `;

    getBody().appendChild(modal);
    getBody().style.overflow = 'hidden';

    setTimeout(() => {
        modal.classList.add('opacity-100');
        modal.querySelector('.modal-panel')?.classList.add('scale-100');
    }, 10);

    modal.querySelector('#close-modal-button')?.addEventListener('click', closeDetailModal);
    modal.querySelector('#close-modal-footer')?.addEventListener('click', closeDetailModal);
}

export function updateFilterButtons(activeCategory) {
    document.querySelectorAll('.filter-btn').forEach(button => {
        const isActive = button.dataset.category === activeCategory;
        button.classList.toggle('bg-emerald-900', isActive);
        button.classList.toggle('text-white', isActive);
        button.classList.toggle('shadow-md', isActive);
        button.classList.toggle('bg-white', !isActive);
        button.classList.toggle('text-gray-700', !isActive);
        button.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    });
}
