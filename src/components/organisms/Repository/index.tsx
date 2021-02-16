import React from "react";

import { Column, Container, Row, Section, Text } from "../../atoms";

import { ContributorCard, Profile } from "../../molecules";

import "./index.scss";

const Repository = ({ data }: any) => {
  const { contributors: repositoryContributor } = data;

  const contributorCards =
    repositoryContributor &&
    repositoryContributor.map((k: number) => {
      return <ContributorCard contributorId={k} key={k} />;
    });

  return (
    <Section className="repository">
      <Container>
        <Row>
          <Column lg="4" className="offset-lg-1">
            <Profile data={data} />
          </Column>
          <Column lg="6" className="offset-lg-1">
            {contributorCards && (
              <Text tag="h2" className="repository-contributors__title">
                Contributors:
              </Text>
            )}
            {contributorCards}
          </Column>
        </Row>
      </Container>
    </Section>
  );
};

export default Repository;
