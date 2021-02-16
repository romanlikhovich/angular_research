import {IContributor} from "interfaces";
import React from "react";

import {Column, Container, Row, Section} from "../../atoms";

import {ContributorDetails, Profile} from "../../molecules";

import "./index.scss";

const Contributor = ({data}: any) => {
    const {repos, contributed_to}: IContributor = data || {};

    return (
        <Section className="contributor">
            <Container>
                <Row>
                    <Column lg="3" className="offset-lg-1">
                        <Profile data={data}/>
                    </Column>
                    <Column lg="6" className="offset-lg-1">
                        {(repos || contributed_to) && <ContributorDetails data={data}/>}
                    </Column>
                </Row>
            </Container>
        </Section>
    );
};

export default Contributor;
