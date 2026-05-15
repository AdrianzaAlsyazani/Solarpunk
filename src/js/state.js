export const state = {
    currentCategory: 'all',
    searchQuery: ''
};

export function setSearchQuery(value) {
    state.searchQuery = value.trim();
}

export function setCurrentCategory(category) {
    state.currentCategory = category || 'all';
}

export function getFilteredArticles(articles) {
    const search = state.searchQuery.toLowerCase();

    return articles.filter(article => {
        const matchesCategory = state.currentCategory === 'all' || article.category === state.currentCategory;
        const matchesSearch = search.length === 0 || [article.title, article.description, article.category]
            .some(text => text.toLowerCase().includes(search));

        return matchesCategory && matchesSearch;
    });
}
