import { combineReducers, createStore } from "redux";
import history from "./history/history";
import favourite from "./favourite/favourite";
import preference from "./preference/preference";

export default createStore(combineReducers({ history, favourite, preference }));