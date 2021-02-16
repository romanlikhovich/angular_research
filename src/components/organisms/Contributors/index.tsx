import React, {useState} from "react";

import {Column, Container, Row, Section, Text} from "../../atoms";

import {ContributorCard, Filter} from "../../molecules";

import "./index.scss";

const Contributors = ({data}: any) => {
    const sortedByOption = {
        contributions: "contributions",
        followers: "followers",
        gists: "gists",
        repositories: "repositories",
    };

    const [sortedBy, setSortedBy] = useState(sortedByOption.contributions);

    const handleClick = (e: React.MouseEvent<HTMLElement>) => {
        const target = e.currentTarget.getAttribute("data-value");

        if (target !== sortedBy) {
            // @ts-ignore
            setSortedBy(sortedByOption[target]);
        }
    };

    const sortedData = Object.values(data).sort((a: any, b: any) => {
        return b[sortedBy] - a[sortedBy];
    });

    const contributorsCards = sortedData.map((k: any) => {
        return <ContributorCard contributorId={k.id} key={k.id}/>;
    });

    return (
        <Section className="contributors">
            <Container>
                <Row>
                    <Column lg="6" className="offset-lg-3">
                        <div className="contributors__filter">
                            <div className="contributors__filter-container">
                                <Text tag="span">Sort by:</Text>
                                <Filter
                                    options={sortedByOption}
                                    activeOption={sortedBy}
                                    onClick={handleClick}
                                />
                            </div>
                        </div>
                        {contributorsCards}
                    </Column>
                </Row>
            </Container>
        </Section>
    );
};

export default Contributors;
