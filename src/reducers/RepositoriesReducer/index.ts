import { IRepository, IRepositories, IRepositoriesObject } from "interfaces";
import {
  FETCH_REPOSITORIES,
  FETCH_REPOSITORY,
  UPDATE_REPOSITORY,
} from "../../types";

const initialState: IRepositories = {
  repositories: {},
};

export const RepositoriesReducer = (
  state: IRepositories = initialState,
  action: any
) => {
  switch (action.type) {
    case FETCH_REPOSITORIES:
      const newObject: IRepositoriesObject = {};

      const values = action.payload;

      for (let i = 0; i < values.length; i++) {
        let el: IRepository = values[i];

        if (!state.repositories[el.id]) {
          newObject[el.id] = el;
        }
      }

      return {
        ...state,
        repositories: { ...state.repositories, ...newObject },
      };

    case FETCH_REPOSITORY:
      state.repositories[action.payload.id] = action.payload;

      return {
        ...state,
        repositories: { ...state.repositories },
      };

    case UPDATE_REPOSITORY:
      let repositoryId = action.payload.id;

      state.repositories[repositoryId] = action.payload;

      return {
        ...state,
        repositories: { ...state.repositories },
      };

    default:
      return state;
  }
};
