import rawData from './data/library.json' assert { type: 'json' };
import { bindUIEvents } from './src/js/events.js';
import { renderArticles, updateFilterButtons } from './src/js/render.js';

const libraryData = rawData.articles || [];

window.addEventListener('DOMContentLoaded', () => {
    updateFilterButtons('all');
    renderArticles(libraryData);
    bindUIEvents(libraryData);
});