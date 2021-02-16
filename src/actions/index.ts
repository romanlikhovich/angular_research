import {
    FETCH_CONTRIBUTOR,
    FETCH_CONTRIBUTORS,
    FETCH_MAIN_CONTRIBUTORS,
    FETCH_REPOSITORIES,
    FETCH_REPOSITORY,
    HIDE_LOADER,
    SHOW_LOADER,
    UPDATE_CONTRIBUTOR,
    UPDATE_REPOSITORY,
} from "../types";

import {getContributors, getRepository, getUser, loadContributorData, loadRepositories,} from "../api/api";
import {IContributor, IContributorObject, IRepository} from "interfaces";

export function showLoader() {
    return {
        type: SHOW_LOADER,
    };
}

export function hideLoader() {
    return {
        type: HIDE_LOADER,
    };
}

export const fetchMainContributors = (
    language: string,
    limit: number = 5000
) => {
    return async (dispatch: any) => {
        let contributorsObject: IContributorObject = {};
        let repositories: any;
        try {
            dispatch(showLoader());
            repositories = await loadRepositories(language);
            let count = 0;
            for (const [i, repository] of repositories.entries()) {
                if (count > limit) return;
                const contributors = await getContributors(repository);
                const ids = contributors.map((c: IContributor) => c.id);
                repositories[i].contributors = [...ids];
                for (const contributor of contributors) {
                    if (count > limit) return;
                    if (!contributorsObject[contributor.id]) {
                        const data = await loadContributorData(contributor, true);
                        contributorsObject[contributor.id] = data;
                    }
                    count++;
                }
            }
        } catch (e) {
            console.log(e);
        } finally {
            dispatch({type: FETCH_REPOSITORIES, payload: repositories});
            dispatch({type: FETCH_MAIN_CONTRIBUTORS, payload: contributorsObject});
            dispatch(hideLoader());
        }
    };
};

export const fetchContributorExtraData = (contributor: IContributor) => {
    return async (dispatch: any) => {
        let data: any;
        try {
            dispatch(showLoader());
            data = await loadContributorData(contributor);
        } catch (e) {
            console.log(e);
        } finally {
            dispatch({type: UPDATE_CONTRIBUTOR, payload: data});
            dispatch({
                type: FETCH_REPOSITORIES,
                payload: data.repos,
            });
            dispatch(hideLoader());
        }
    };
};

export const fetchContributor = (id: string) => {
    return async (dispatch: any) => {
        let contributor: any;
        try {
            dispatch(showLoader());
            contributor = await getUser(id);
        } catch (e) {
            console.log(e);
        } finally {
            dispatch({type: FETCH_CONTRIBUTOR, payload: contributor});
            dispatch({
                type: FETCH_REPOSITORIES,
                payload: contributor.repos,
            });
            dispatch(hideLoader());
        }
    };
};

export const fetchContributors = (repository: IRepository) => {
    return async (dispatch: any) => {
        let contributorsObject: IContributorObject = {};
        try {
            dispatch(showLoader());
            const contributors = await getContributors(repository);

            const ids = contributors.map((c: IContributor) => c.id);
            repository.contributors = [...ids];

            for (let j = 0; j < contributors.length; j++) {
                const data = await loadContributorData(contributors[j]);
                contributorsObject[contributors[j].id] = {
                    ...contributors[j],
                    ...data,
                };
            }
        } catch (e) {
            console.log(e);
        } finally {
            dispatch({type: UPDATE_REPOSITORY, payload: repository});
            dispatch({type: FETCH_CONTRIBUTORS, payload: contributorsObject});
            dispatch(hideLoader());
        }
    };
};

export const fetchRepository = (id: string) => {
    return async (dispatch: any) => {
        let repository: any;
        try {
            dispatch(showLoader());
            repository = await getRepository(id);
            const contributors = await getContributors(repository);
            const ids = contributors.map((c: IContributor) => c.id);
            repository.contributors = [...ids];
        } catch (e) {
            console.log(e);
        } finally {
            dispatch({type: FETCH_REPOSITORY, payload: repository});
            dispatch(hideLoader());
        }
    };
};
