import React from "react";

import { Image, Link, Text } from "../../atoms";

import "./index.scss";

const Profile = ({ data }: any) => {
  const {
    name,
    html_url,
    description,
    stargazers_count,
    language,
    contributions,
    followers,
    repositories,
    website,
    avatar_url,
  } = data || {};

  return (
    <div className="profile">
      {avatar_url && (
        <div className="profile-image__wrapper">
          <Image className="profile-image" src={avatar_url} alt={name} />
        </div>
      )}
      <div className="profile__details">
        <div className="detail">
          <Text tag="h2" type="bold">
            {name}
          </Text>
        </div>
        {description && (
          <div className="detail">
            <Text tag="h4" type="thin">
              {description}
            </Text>
          </div>
        )}
        {language && (
          <div className="detail">
            <Text tag="span" type="bold">
              Language:{" "}
            </Text>
            <Text tag="span">{language}</Text>
          </div>
        )}
        {stargazers_count > 0 && (
          <div className="detail">
            <Text tag="span" type="bold">
              Stars:
            </Text>
            <Text tag="span">{stargazers_count}</Text>
          </div>
        )}
        {html_url && (
          <div className="detail">
            <Link href={html_url} router={false} className="link">
              <Text tag="span" type="bold">
                Github
              </Text>
            </Link>
          </div>
        )}
        {repositories > 0 && (
          <div className="detail">
            <Text tag="span" type="bold">
              Repositories:
            </Text>
            <Text tag="span">{repositories}</Text>
          </div>
        )}
        {followers > 0 && (
          <div className="detail">
            <Text tag="span" type="bold">
              Followers:
            </Text>
            <Text tag="span">{followers}</Text>
          </div>
        )}
        {contributions > 0 && (
          <div className="detail">
            <Text tag="span" type="bold">
              Contributions:
            </Text>
            <Text tag="span">{contributions}</Text>
          </div>
        )}
        {website && (
          <div className="detail">
            <Link
              href={website}
              router={false}
              target="__blank"
              className="link"
            >
              <Text tag="span" type="bold">
                {website}
              </Text>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
