import { fetchContributor, fetchContributorExtraData } from "actions";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Contributor } from "../../components/organisms";

import { RootReducer } from "../../reducers";

type RootState = ReturnType<typeof RootReducer>;

const ContributorPage = (props: any) => {
  const contributorId = props.match.params.user;
  const dispatch = useDispatch();
  const contributor = useSelector((state: RootState) => {
    return state.contributors.contributors[props.match.params.user];
  });

  useEffect(() => {
    if (contributor) {
      if (!contributor.repos) {
        dispatch(fetchContributorExtraData(contributor));
      }
    } else {
      dispatch(fetchContributor(contributorId));
    }
  }, [dispatch, contributor, contributorId]);

  return <Contributor data={contributor} />;
};

export default ContributorPage;
