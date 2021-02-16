import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Contributors } from "../../components/organisms";

import { fetchMainContributors } from "../../actions";

import { RootReducer } from "../../reducers";

type RootState = ReturnType<typeof RootReducer>;

const ContributorsPage = () => {
  const dispatch = useDispatch();
  const contributors = useSelector(
    (state: RootState) => state.contributors.mainContributors
  );

  useEffect(() => {
    if (!contributors.length) {
      dispatch(fetchMainContributors("angular", 10));
    }
  }, [dispatch, contributors.length]);

  return <Contributors data={contributors} />;
};

export default ContributorsPage;
