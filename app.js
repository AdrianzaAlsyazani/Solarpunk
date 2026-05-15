import { bindUIEvents } from './src/js/events.js';
import { renderArticles, updateFilterButtons } from './src/js/render.js';

async function loadLibraryData() {
    try {
        const response = await fetch('./data/library.json');
        if (!response.ok) {
            throw new Error(`HTTP ${response.status} ${response.statusText}`);
        }

        const rawData = await response.json();
        return rawData.articles || [];
    } catch (error) {
        console.error('Gagal memuat data artikel:', error);
        return [];
    }
}

window.addEventListener('DOMContentLoaded', async () => {
    const libraryData = await loadLibraryData();
    updateFilterButtons('all');
    renderArticles(libraryData);
    bindUIEvents(libraryData);
});
