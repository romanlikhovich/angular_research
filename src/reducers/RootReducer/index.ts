import { combineReducers } from "redux";
import { RepositoriesReducer, ContributorsReducer, AppReducer } from "../";

export const RootReducer = combineReducers({
  repositories: RepositoriesReducer,
  contributors: ContributorsReducer,
  app: AppReducer,
});
