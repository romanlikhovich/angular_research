import React from "react";

import {Column, Container, Link, Row, Section, Text} from "../../atoms";

import "./index.scss";

const PageNotFound = () => {
    return (
        <Section className="page-not-found">
            <Container>
                <Row>
                    <Column lg="12">
                        <div className="page-not-found__content">
                            <Text tag="h1" className="page-not-found__title">
                                404
                            </Text>
                            <Text
                                tag="h3"
                                type="thin"
                                className="page-not-found__description"
                            >
                                Sorry, the page you're looking for doesn't exist.
                            </Text>
                            <Link href="/" router className="page-not-found__link">
                                <Text type="bold" className="page-not-found__link-text">
                                    Return home
                                </Text>
                            </Link>
                        </div>
                    </Column>
                </Row>
            </Container>
        </Section>
    );
};

export default PageNotFound;
