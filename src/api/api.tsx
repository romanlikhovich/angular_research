import { IContributor, IRepository } from "../interfaces";

const limit = 100;
const timeoutDelay = 0;
const token = "c75b46036fba79b8d7fa78825b2eae83d12878f3";

const api = "https://api.github.com/orgs/";

const timeout = () => {
  return new Promise((resolve) => setTimeout(resolve, timeoutDelay));
};

const fetchApi = async (url: string, page: number = 1) => {
  const headers = {
    "Content-type": "application/json",
    Authorization: "token " + token,
  };

  let data: any;

  try {
    const resultPage = await fetch(`${url}?per_page=${limit}&page=${page}`, {
      headers: headers,
    });

    const result = await Promise.all([await resultPage.json(), timeout()]);

    data = result[0];
  } catch (e) {
    console.log(e);
  } finally {
    return data;
  }
};

const fetchGraphql = async (gql: { query: string }) => {
  const headers = {
    "Content-type": "application/json",
    Authorization: "Bearer " + token,
  };

  let data: any;

  try {
    let req = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: headers,
      body: JSON.stringify(gql),
    });

    const result = await Promise.all([await req.json(), timeout()]);

    data = result[0].data;
  } catch (e) {
    console.log(e);
  } finally {
    return data;
  }
};

export const getContributors = async (repository: IRepository) => {
  const { contributors_url } = repository;
  let next = true;
  let page = 1;
  let contributors: any = [];

  while (next) {
    const result = await fetchApi(contributors_url, page);

    if (result.length < limit) {
      next = false;
      page = 1;
    } else {
      page += 1;
    }

    if (result.length >= 1) {
      contributors.push(...result);
    }
  }

  return contributors;
};

export const loadRepositories = async (language: string) => {
  let repositories = [];
  const res = await fetch(api + language);
  const { public_repos, repos_url } = await res.json();
  const pages = Math.ceil(public_repos / limit);

  for (let i = 1; i <= pages; i++) {
    const resultPage = await fetch(`${repos_url}?per_page=${limit}&page=${i}`);

    const result = await resultPage.json();

    repositories.push(...result);
  }

  return repositories;
};

export const loadContributorData = async (
  contributor: IContributor,
  allContributions?: boolean
) => {
  const { login } = contributor;

  const gql = {
    query: `
        {
          user(login: "${login}") {
              name
              login
              email
              id
              company
              url
              avatarUrl
              websiteUrl
              location
              repositories(ownerAffiliations: OWNER) {
                totalCount
              }
              repositoriesContributedTo(first: 100, privacy: PUBLIC) {
                edges {
                  node {
                    id
                    nameWithOwner
                    shortDescriptionHTML(limit: 120)
                    url
                    openGraphImageUrl
                  }
                }
              }
              gists {
                totalCount
              }
              followers {
                totalCount
              }
              contributionsCollection {
                  contributionYears
              }
          }
        }
       `,
  };

  const contrib = await fetchGraphql(gql);

  if (contrib && contrib.user) {
    const {
      repositoriesContributedTo,
      gists,
      followers,
      repositories,
      contributionsCollection: { contributionYears },
      name,
      login,
      email,
      company,
      url,
      websiteUrl,
      location,
    } = contrib.user || {};

    contributor.gists = gists.totalCount;
    contributor.followers = followers.totalCount;
    contributor.contributed_to = repositoriesContributedTo.edges;
    contributor.repositories = repositories.totalCount;
    contributor.contribution_years = [...contributionYears];
    contributor.name = name;
    contributor.login = login;
    contributor.email = email;
    contributor.company = company;
    contributor.url = url;
    contributor.website = websiteUrl;
    contributor.location = location;

    if (allContributions) {
      contributor["contributions"] = 0;

      for (let i = 0; i < contributionYears.length; i++) {
        const gql = {
          query: `
                {
                  user(login: "${login}") {
                    contributionsCollection(to: "${contributionYears[i]}-12-31T00:00:00Z", from: "${contributionYears[i]}-01-01T00:00:00Z") {
                        contributionCalendar {
                          totalContributions
                        }
                      }
                  }
                }
               `,
        };

        const data = await fetchGraphql(gql);

        if (data) {
          const contributionsAmount =
            data.user.contributionsCollection.contributionCalendar
              .totalContributions;

          contributor["contributions"] += contributionsAmount;
        }
      }
    }
  }

  const getContributorRepos = async (contributor: IContributor) => {
    const { repos_url } = contributor;
    let next = true;
    let page = 1;

    contributor.repos = [];

    while (next) {
      const repositories = await fetchApi(repos_url, page);
      if (repositories.length < limit) {
        next = false;
        page = 1;
      } else {
        page += 1;
      }

      if (repositories.length) {
        contributor.repos = [...contributor.repos, ...repositories];
      }
    }

    contributor.repos_objects = contributor.repos.reduce(
      (repositories: any, repository: IRepository) => ({
        ...repositories,
        [repository.id]: repository,
      }),
      {}
    );

    const reposId = contributor.repos.map((r: IRepository) => r.id);

    contributor.repos_id = [...reposId];
  };

  await getContributorRepos(contributor);

  return contributor;
};

export const getUser = async (id: string) => {
  const userUrl = `https://api.github.com/user/${id}`;
  const result = await fetchApi(userUrl);
  return await loadContributorData(result, true);
};

export const getRepository = async (id: string) => {
  const repositoryUrl = `https://api.github.com/repositories/${id}`;
  return await fetchApi(repositoryUrl);
};
