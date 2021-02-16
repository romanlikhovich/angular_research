import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Image, Link, Text } from "../../atoms";

import { Loading } from "../";

import "./index.scss";

import { RootReducer } from "../../../reducers";
import { fetchContributor, fetchContributorExtraData } from "actions";

type RootState = ReturnType<typeof RootReducer>;

const ContributorCard = ({ contributorId }: any) => {
  const dispatch = useDispatch();
  const contributor = useSelector((state: RootState) => {
    return state.contributors.contributors[contributorId];
  });

  const {
    id,
    contributions,
    gists,
    repositories,
    name,
    login,
    avatar_url,
    followers,
  } = contributor || {};

  const link = `/contributor/${id}`;

  useEffect(() => {
    if (contributor) {
      if (!contributor.repos) {
        dispatch(fetchContributorExtraData(contributor));
      }
    } else {
      dispatch(fetchContributor(contributorId));
    }
  }, [dispatch, contributor, contributorId]);

  return (
    <div className="contributor-card">
      <div className="contributor-card__image-wrapper">
        <Image
          src={avatar_url}
          alt={login}
          className="contributor-card__image"
        />
      </div>
      <div className="contributor-card__information">
        <div className="details">
          <Text tag="span" type="bold">
            Name:{" "}
          </Text>
          <Text tag="span">{name}</Text>
        </div>
        <div className="details">
          <Text tag="span" type="bold">
            Login:{" "}
          </Text>
          <Text tag="span">{login}</Text>
        </div>
        <div className="details">
          <Text tag="span" type="bold">
            Repositories:{" "}
          </Text>
          <Text tag="span">{repositories}</Text>
        </div>
        <div className="details">
          <Text tag="span" type="bold">
            Contributions:{" "}
          </Text>
          <Text tag="span">{contributions}</Text>
        </div>
        <div className="details">
          <Text tag="span" type="bold">
            Followers:{" "}
          </Text>
          <Text tag="span">{followers}</Text>
        </div>
        <div className="details">
          <Text tag="span" type="bold">
            Gists:{" "}
          </Text>
          <Text tag="span">{gists}</Text>
        </div>
      </div>
      <Link href={link} router className="contributor-card__link" />
      {!contributor && <Loading className="contributor-card__loading" />}
    </div>
  );
};

export default ContributorCard;
