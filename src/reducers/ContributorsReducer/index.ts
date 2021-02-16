import {IContributorObject, IContributorObjects} from "interfaces";
import {FETCH_CONTRIBUTOR, FETCH_CONTRIBUTORS, FETCH_MAIN_CONTRIBUTORS, UPDATE_CONTRIBUTOR,} from "../../types";

const initialState: IContributorObjects = {
    contributors: {},
    mainContributors: {},
};

export const ContributorsReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case FETCH_MAIN_CONTRIBUTORS:
            return {
                ...state,
                contributors: {...state.contributors, ...action.payload},
                mainContributors: {...state.mainContributors, ...action.payload},
            };
        case FETCH_CONTRIBUTORS:
            const newObject: IContributorObject = {};

            const values = Object.values(action.payload);

            for (let i = 0; i < values.length; i++) {
                const el: any = values[i];

                if (!state.contributors[el.id]) {
                    newObject[el.id] = el;
                }
            }

            return {
                ...state,
                contributors: {...state.contributors, ...newObject},
            };
        case FETCH_CONTRIBUTOR:
            const contributor: IContributorObject = {};
            contributor[action.payload.id] = action.payload;

            return {
                ...state,
                contributors: {...state.contributors, ...contributor},
            };

        case UPDATE_CONTRIBUTOR:
            let repositoryId = action.payload.id;
            state.contributors[repositoryId] = action.payload;

            return {
                ...state,
                repositories: {...state.contributors},
            };

        default:
            return state;
    }
};
