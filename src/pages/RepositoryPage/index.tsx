import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Repository } from "../../components/organisms";

import { RootReducer } from "../../reducers";
import { fetchContributors, fetchRepository } from "actions";

type RootState = ReturnType<typeof RootReducer>;

const RepositoryPage = (props: any) => {
  const repositoryId = props.match.params.repository;
  const dispatch = useDispatch();
  const repository = useSelector((state: RootState) => {
    return state.repositories.repositories[props.match.params.repository];
  });

  useEffect(() => {
    if (repository) {
      if (!repository.contributors) {
        dispatch(fetchContributors(repository));
      }
    } else {
      dispatch(fetchRepository(repositoryId));
    }
  }, [dispatch, repository, repositoryId]);

  return <>{repository && <Repository data={repository} />}</>;
};

export default RepositoryPage;
