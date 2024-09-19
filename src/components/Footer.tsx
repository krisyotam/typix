import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { State } from "store/reducer";
import "stylesheets/Footer.scss";
import contributorsData from "../wordlists/contributors.json"; // Adjust the path as needed

interface Contributor {
    login: string;
    name: string;
    contributions: number;
}

export default function Footer() {
    const [contributors, setContributors] = useState<Contributor[]>([]);
    const { timerId } = useSelector((state: State) => state.time);
    const [showList, setShowList] = useState<boolean>(false);

    useEffect(() => {
        // Load and filter local contributors data
        const filteredContributors = (contributorsData as Contributor[]).filter(
            (contributor) => contributor.login !== "salmannotkhan"
        );
        setContributors(filteredContributors);
    }, []);

    return (
        <div className={`bottom-area ${timerId ? "hidden" : ""}`}>
            <span className="hint">
                <kbd>Ctrl</kbd> + <kbd>k</kbd> to open command pallet
            </span>
            <span className="hint">
                <kbd>Tab</kbd> to restart test
            </span>
            <footer>
                <a
                    target="_blank"
                    rel="noreferrer"
                    href="https://www.github.com/krisyotam/typing-test">
                    <span>&lt;/&gt;</span> github
                </a>
                <span>
                    created by{" "}
                    <a
                        target="_blank"
                        rel="noreferrer"
                        href="https://www.github.com/krisyotam">
                        @krisyotam
                    </a>
                </span>
                {showList ? (
                    <div className="contributor-list" onBlur={console.log}>
                        <h2>contributors</h2>
                        {contributors.map((contributor) => (
                            <a
                                className="contributor"
                                href={`https://github.com/${contributor.login}`}
                                target="_blank"
                                rel="noreferrer"
                                key={contributor.login}>
                                <img
                                    height={50}
                                    width={50}
                                    src={`https://github.com/${contributor.login}.png`} // Assuming default GitHub avatar URL pattern
                                    alt={`${contributor.login}'s avatar`}
                                />
                                <div className="contributor-details">
                                    <div>@{contributor.login}</div>
                                    <div>
                                        {contributor.contributions} commits
                                    </div>
                                </div>
                            </a>
                        ))}
                    </div>
                ) : null}
                <button onClick={() => setShowList((s) => !s)}>
                    {showList ? "x close" : "{} contributors"}
                </button>
            </footer>
        </div>
    );
}


