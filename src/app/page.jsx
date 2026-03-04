"use client"
import { useState } from "react";
import styles from "./page.module.scss";
import Link from "next/link";
import Image from "next/image";
import { useGlobalState } from '../GlobalStateContext';

export default function Home() {
    const { setTest } = useGlobalState();
    const [currentView, setCurrentView] = useState("spelling");

    const handleTestSelection = (testName) => {
        setTest(testName);
    };

    const renderButtons = () => {
        if (currentView === "spelling") {
            return (
                <div className={styles.testListDiv}>
                    <ul className={styles.testButtonList} style={{ listStyleType: "none", paddingLeft: 0 }}>
                        {["T-1", "T-2", "T-3", "T-4", "T-5", "U-1", "U-2", "U-3", "U-4", "U-5", "V-1",].map((test) => (
                            <li key={test}>
                                <Link href="/test">
                                    <button
                                        onClick={() => handleTestSelection(`Spelling Test ${test}`)}
                                        className={styles.testButton}
                                    >
                                        List {test}
                                    </button>
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <ul className={styles.testButtonList} style={{ listStyleType: "none", paddingLeft: 0 }}>
                        {["V-2", "V-3", "W-1", "W-2", "W-3", "X-1", "X-2", "Y-1", "Y-2", "Z-1", "Z-2"].map((test) => (
                            <li key={test}>
                                <Link href="/test">
                                    <button
                                        onClick={() => handleTestSelection(`Spelling Test ${test}`)}
                                        className={styles.testButton}
                                    >
                                        List {test}
                                    </button>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            );
        }

        if (currentView === "states") {
            return (
                <div className={styles.testListDivStates}>
                    <h3 className={styles.statesTitle}> States</h3>
                    <ul className={styles.testButtonListStates} style={{ listStyleType: "none", paddingLeft: 0 }}>
                        {["States 1-10", "States 11-20", "States 21-30", "States 31-40", "States 41-50",].map((test) => (
                            <li key={test}>
                                <Link href="/test">
                                    <button
                                        onClick={() => handleTestSelection(test)}
                                        className={styles.testButton}
                                    >
                                        {test}
                                    </button>
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <h3 className={styles.statesTitle}>Capitals</h3>
                    <ul className={styles.testButtonListStates} style={{ listStyleType: "none", paddingLeft: 0 }}>
                        {["Capitals 1-10", "Capitals 11-20", "Capitals 21-30", "Capitals 31-40", "Capitals 41-50"].map((test) => (
                            <li key={test}>
                                <Link href="/test">
                                    <button
                                        onClick={() => handleTestSelection(test)}
                                        className={styles.testButton}
                                    >
                                        {test}
                                    </button>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            );
        }

        return null;
    };


    return (
        <div className={styles.page}>
            <main className={styles.main}>
                <h1>5th Grade Spelling</h1>
                <p
                    style={{ fontSize: "1.2rem", }}
                ><br />Check out the new SpellRight app <br />(use the code <em><strong>&quot;THEOAKS26&quot;</strong></em>)
                </p>
                <a
                    href='https://spellright.app'
                    target='_blank'
                >
                    <button className={styles.linkButton}>

                        <em>Go to the new site!</em>

                    </button>
                </a>
                <div className={styles.categoryButtons}>
                    <button
                        onClick={() => setCurrentView("spelling")}
                        className={`${styles.categoryButton} ${currentView === "spelling" ? styles.categoryEnabled : ""
                            }`}
                    >
                        Spelling Lists
                    </button>
                    <button
                        onClick={() => setCurrentView("states")}
                        className={`${styles.categoryButton} ${currentView === "states" ? styles.categoryEnabled : ""
                            }`}
                    >
                        States and Capitals
                    </button>
                </div>
                <div className={styles.testButtonDiv}>
                    {renderButtons()}
                </div>

            </main>
            <footer className={styles.footer}>
                <div className={styles.imageDiv} >
                    <Image
                        aria-hidden
                        src="/assets/lacey_no_bg.png"
                        alt="Globe icon"
                        width={55}
                        height={55}
                    />
                </div>
                <div>Mrs. Hvattum&apos;s 5th Grade →</div>
                {/* </a> */}
            </footer>
        </div>
    );
}