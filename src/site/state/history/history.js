export const HISTORY_ADD_SEARCH = "HISTORY_ADD_SEARCH";
export const HISTORY_ADD_RECIPE = "HISTORY_ADD_RECIPE";

const initialState = {
    searchs: localStorage.getItem("SearchHistory") === null
        ? []
        : JSON.parse(localStorage.getItem("SearchHistory")).map(x => ({ ...x, date: new Date(x.date) })),
    recipes: localStorage.getItem("RecipeHistory") === null
        ? []
        : JSON.parse(localStorage.getItem("RecipeHistory")).map(x => ({ ...x, date: new Date(x.date) }))
};

export const getHistorySearchs = store => store.history.searchs
export const getHistoryRecipes = store => store.history.recipes

export const historyAddSearch = search => ({
    type: HISTORY_ADD_SEARCH,
    payload: {
        date: new Date(),
        search
    }
})

export const historyAddRecipe = (id, title, image) => ({
    type: HISTORY_ADD_RECIPE,
    payload: {
        id,
        date: new Date(),
        title,
        image
    }
})

export default function historyActions(state = initialState, action) {
    switch (action.type) {
        case HISTORY_ADD_SEARCH: {
            var searchs = [action.payload, ...state.searchs];
            localStorage.setItem("SearchHistory", JSON.stringify(searchs));
            return {
                ...state,
                searchs
            };
        }
        case HISTORY_ADD_RECIPE: {
            var recipes = [action.payload, ...state.recipes];
            localStorage.setItem("RecipeHistory", JSON.stringify(recipes));
            return {
                ...state,
                recipes
            };
        }
        default:
            return state;
    }
}