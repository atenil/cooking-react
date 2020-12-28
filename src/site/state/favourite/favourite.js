export const FAVOURITE_ADD = "FAVOURITE_ADD";
export const FAVOURITE_REMOVE = "FAVOURITE_REMOVE";

const initialState = localStorage.getItem("Favourites") === null
        ? []
        : JSON.parse(localStorage.getItem("Favourites")).map(x => ({ ...x, date: new Date(x.date) }))
;

export const getFavourites = store => {return store.favourite}

export const favouriteAdd = (id, title, image) => ({
    type: FAVOURITE_ADD,
    payload: {
        id,
        date: new Date(),
        title,
        image
    }
})

export const favouriteRemove = id => ({
    type: FAVOURITE_REMOVE,
    payload: {
        id
    }
})

export default function favouriteActions(state = initialState, action) {
    switch (action.type) {
        case FAVOURITE_ADD: {
            const favourites = [action.payload, ...state];
            localStorage.setItem("Favourites", JSON.stringify(favourites));
            return favourites;
        }
        case FAVOURITE_REMOVE: {
            const favouriteIndex = state.findIndex(x => x.id === action.payload.id);
            if(favouriteIndex>-1){
                const favourites = [...state]
                favourites.splice(favouriteIndex,1);
                localStorage.setItem("Favourites", JSON.stringify(favourites));
                return favourites;
            }
            return state;
        }
        default:
            return state;
    }
}