
import intolerances from '../../domain/intolerances';

export const INTOLERANCE_UPDATE = "INTOLERANCE_UPDATE";

const initialState = localStorage.getItem("Preferences") === null
    ? {
        intolerances: intolerances.reduce((r, x) => {
            r[x] = true;
            return r;
        }, {})
    }
    : JSON.parse(localStorage.getItem("Preferences"));

export const getIntolerances = store => { return store.preference.intolerances }

export const intoleranceUpdate = (id, value) => ({
    type: INTOLERANCE_UPDATE,
    payload: {
        id,
        value
    }
})

export default function preferenceActions(state = initialState, action) {
    switch (action.type) {
        case INTOLERANCE_UPDATE: {
            const intolerances = { ...state.intolerances };
            intolerances[action.payload.id] = action.payload.value;
        
            const preferences = { ...state, intolerances };
            localStorage.setItem("Preferences", JSON.stringify(preferences));
            return preferences;
        }
        default:
            return state;
    }
}