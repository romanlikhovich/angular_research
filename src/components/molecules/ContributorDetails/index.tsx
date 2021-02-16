import React, {useState} from "react";
import cn from "classnames";

import {Icon, Link, Text} from "../../atoms";

import "./index.scss";
import {IContributedObject, IContributor, IRepository} from "interfaces";

const ContributorDetails = ({data}: any) => {
    const {repos, contributed_to}: IContributor = data || [];
    const [activeTab, setActiveTab] = useState<string | null>(
        repos && repos.length ? "own" : "to"
    );

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const label = e.currentTarget.getAttribute("data-label");
        if (label !== activeTab) {
            setActiveTab(label);
        }
    };

    return (
        <div className="contributor-details">
            <div className="contributor-details__navigation">
                {repos && repos.length > 0 && (
                    <div
                        className={cn("tab", activeTab === "own" && "active")}
                        data-label="own"
                        onClick={(e) => handleClick(e)}
                    >
                        <Text tag="span">Repositories </Text>
                        <Text tag="span">({repos.length})</Text>
                    </div>
                )}
                {contributed_to && contributed_to.length > 0 && (
                    <div
                        className={cn("tab", activeTab === "to" && "active")}
                        data-label="to"
                        onClick={(e) => handleClick(e)}
                    >
                        <Text tag="span">Contributed </Text>
                        <Text tag="span">({contributed_to.length})</Text>
                    </div>
                )}
            </div>
            <div className="contributor-details__repositories">
                <div
                    className={cn(
                        "contributor-repository",
                        activeTab === "own" && "active"
                    )}
                >
                    {repos &&
                    repos
                        .sort(
                            (
                                a: { stargazers_count: number },
                                b: { stargazers_count: number }
                            ) => {
                                return b.stargazers_count - a.stargazers_count;
                            }
                        )
                        .map((r: IRepository) => {
                            const {id, description, name, stargazers_count, forks} = r;

                            const link = `/repository/${id}`;
                            return (
                                <div className="repo" key={id}>
                                    <Link className="repo__link" router href={link}/>
                                    <div className="repo__details">
                                        <div className="detail">
                                            <Text tag="h4">{name}</Text>
                                        </div>
                                        <div className="detail">
                                            <Text tag="h5" type="thin">
                                                {description}
                                            </Text>
                                        </div>
                                        <div className="detail">
                                            <Icon variant="star"/>
                                            <Text tag="span">{stargazers_count}</Text>
                                        </div>
                                        <div className="detail">
                                            <Icon variant="forks"/>
                                            <Text tag="span">{forks}</Text>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                </div>
                <div
                    className={cn(
                        "contributor-repository",
                        activeTab === "to" && "active"
                    )}
                >
                    {contributed_to &&
                    contributed_to.map((c: IContributedObject) => {
                        const {id, nameWithOwner, url} = c.node;

                        return (
                            <div className="repo" key={id}>
                                <Link
                                    className="repo__link"
                                    router={false}
                                    href={url}
                                    target="__blank"
                                />
                                <div className="detail">
                                    <Text tag="span">{nameWithOwner}</Text>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default ContributorDetails;
