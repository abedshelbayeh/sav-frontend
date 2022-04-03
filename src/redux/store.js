import { combineReducers, applyMiddleware, compose, createStore } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";
import storage from "redux-persist/lib/storage";

// reducers
import boardsReducer from "./boards/boards.reducer";
import peopleReducer from "./people/people.reducer";
import canvasReducer from "./canvas/canvas.reducer";
import userReducer from "./user/user.reducer";

const combinedReducers = combineReducers({
  boards: boardsReducer,
  people: peopleReducer,
  canvas: canvasReducer,
  user: userReducer,
});

const composeEnhancers =
  (process.env.NODE_ENV === "development" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const persistConfig = {
  key: "root",
  storage,
  whitelist: [],
};

export const store = createStore(
  persistReducer(persistConfig, combinedReducers),
  composeEnhancers(applyMiddleware(thunk))
);

export const persistor = persistStore(store);
