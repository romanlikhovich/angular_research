export interface IRepository {
    id: number;
    node_id: string;
    name: string;
    full_name: string;
    private: boolean;
    html_url: string;
    description: string;
    forks_count: number;
    forks: number;
    language: string;
    stargazers_count: number;
    contributors_url: string;
    contributors: Array<number>;
}
