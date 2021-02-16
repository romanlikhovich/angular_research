import {IContributedObject} from "interfaces/contributed-object";
import {IRepository, IReposObject} from "./index";

export interface IContributor {
    id: number;
    login: string;
    name: string;
    html_url: string;
    contributions: number;
    followers: number;
    repositories: number;
    repos: Array<IRepository>;
    contributed_to: Array<IContributedObject>;
    website: string;
    avatar_url: string;
    gists: number;
    contribution_years: Array<number>;
    email: string;
    company: string;
    url: string;
    location: string;
    repos_url: string;
    repos_objects: IReposObject;
    repos_id: Array<number>;
}
