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
                <div className={styles.testListDiv}>
                    <ul className={styles.testButtonList} style={{ listStyleType: "none", paddingLeft: 0 }}>
                        {["States 1-10", "States 11-20", "States 21-30", "States 31-40", "States 41-50", "Capitols 1-10", "Capitols 11-20", "Capitols 21-30", "Capitols 31-40", "Capitols 41-50"].map((test) => (
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

        return null; // No buttons visible until a category is selected
    };


    return (
        <div className={styles.page}>
            <main className={styles.main}>
                <h1>5th Grade Spelling</h1>

                {/* <h3>Directions:</h3> */}
                <ul
                    className={styles.directionsList}
                    style={{
                        listStyleType: "none",
                        paddingLeft: 0
                    }}>
                    <li className={styles.directionItem}>
                        <div className={styles.directionsRow}>
                            {/* <Image
                                aria-hidden
                                src="/assets/lacey_no_bg.png"
                                alt="Globe icon"
                                width={45}
                                height={45}
                                className={styles.directionsImg1}
                            /> */}
                            <h3>
                                {/* Click on this week&apos;s spelling list to practice. */}
                                ✓ Click on the list you want to practice.
                            </h3>
                        </div>
                    </li>
                    <li className={styles.directionItem}>
                        <div className={styles.directionsRow}>
                            <h3>
                                ✓ You can either type or speak your answer.
                            </h3>
                            {/* <Image
                                aria-hidden
                                src="/assets/lacey_no_bg.png"
                                alt="Globe icon"
                                width={45}
                                height={45}
                                className={styles.directionsImg2}
                            /> */}
                        </div>

                    </li>
                    {/* <li className={styles.directionItem}>
                        If you are using a phone, you may need to give your browser speech recognition permissions to use the speech option.
                    </li> */}

                </ul>

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
                        States and Capitols
                    </button>
                </div>
                <div className={styles.testButtonDiv}>
                    {renderButtons()}
                </div>


                {/* 
                <div className={styles.testButtonDiv}>
                    <ul className={styles.testButtonList}
                        style={{
                            listStyleType: "none",
                            paddingLeft: 0
                        }}>
                        <li>
                            <Link href="/test">
                                <button onClick={() => handleTestSelection('Spelling Test T-1')} className={styles.testButton} >
                                    List T-1
                                </button>
                            </Link>
                        </li>
                        <li>
                            <Link href="/test">
                                <button onClick={() => handleTestSelection('Spelling Test T-2')} className={styles.testButton} >
                                    List T-2
                                </button>
                            </Link>
                        </li>
                        <li>
                            <Link href="/test">
                                <button onClick={() => handleTestSelection('Spelling Test T-3')} className={styles.testButton} >
                                    List T-3
                                </button>
                            </Link>
                        </li>
                        <li>
                            <Link href="/test">
                                <button onClick={() => handleTestSelection('Spelling Test T-4')} className={styles.testButton} >
                                    List T-4
                                </button>
                            </Link>
                        </li>
                        <li>
                            <Link href="/test">
                                <button onClick={() => handleTestSelection('Spelling Test T-5')} className={styles.testButton} >
                                    List T-5
                                </button>
                            </Link>
                        </li>
                        <li>
                            <Link href="/test">
                                <button onClick={() => handleTestSelection('Spelling Test U-1')} className={styles.testButton} >
                                    List U-1
                                </button>
                            </Link>
                        </li>
                        <li>
                            <Link href="/test">
                                <button onClick={() => handleTestSelection('Spelling Test U-2')} className={styles.testButton} >
                                    List U-2
                                </button>
                            </Link>
                        </li>
                        <li>
                            <Link href="/test">
                                <button onClick={() => handleTestSelection('Spelling Test U-3')} className={styles.testButton} >
                                    List U-3
                                </button>
                            </Link>
                        </li>
                        <li>
                            <Link href="/test">
                                <button onClick={() => handleTestSelection('Spelling Test U-4')} className={styles.testButton} >
                                    List U-4
                                </button>
                            </Link>
                        </li>
                        <li>
                            <Link href="/test">
                                <button onClick={() => handleTestSelection('Spelling Test U-5')} className={styles.testButton} >
                                    List U-5
                                </button>
                            </Link>
                        </li>
                        <li>
                            <Link href="/test">
                                <button onClick={() => handleTestSelection('Spelling Test V-1')} className={styles.testButton} >
                                    List V-1
                                </button>
                            </Link>
                        </li>
                        <li>
                            <Link href="/test">
                                <button onClick={() => handleTestSelection('Spelling Test V-2')} className={styles.testButton} >
                                    List V-2
                                </button>
                            </Link>
                        </li>
                        <li>
                            <Link href="/test">
                                <button onClick={() => handleTestSelection('Spelling Test V-3')} className={styles.testButton} >
                                    List V-3
                                </button>
                            </Link>
                        </li>
                        <li>
                            <Link href="/test">
                                <button onClick={() => handleTestSelection('Spelling Test W-1')} className={styles.testButton} >
                                    List W-1
                                </button>
                            </Link>
                        </li>
                        <li>
                            <Link href="/test">
                                <button onClick={() => handleTestSelection('Spelling Test W-2')} className={styles.testButton} >
                                    List W-2
                                </button>
                            </Link>
                        </li>
                        <li>
                            <Link href="/test">
                                <button onClick={() => handleTestSelection('Spelling Test W-3')} className={styles.testButton} >
                                    List W-3
                                </button>
                            </Link>
                        </li>
                        <li>
                            <Link href="/test">
                                <button onClick={() => handleTestSelection('Spelling Test X-1')} className={styles.testButton} >
                                    List X-1
                                </button>
                            </Link>
                        </li>
                        <li>
                            <Link href="/test">
                                <button onClick={() => handleTestSelection('Spelling Test X-2')} className={styles.testButton} >
                                    List X-2
                                </button>
                            </Link>
                        </li>
                        <li>
                            <Link href="/test">
                                <button onClick={() => handleTestSelection('Spelling Test Y-1')} className={styles.testButton} >
                                    List Y-1
                                </button>
                            </Link>
                        </li>
                        <li>
                            <Link href="/test">
                                <button onClick={() => handleTestSelection('Spelling Test Y-2')} className={styles.testButton} >
                                    List Y-2
                                </button>
                            </Link>
                        </li>
                        <li>
                            <Link href="/test">
                                <button onClick={() => handleTestSelection('Spelling Test Z-1')} className={styles.testButton} >
                                    List Z-1
                                </button>
                            </Link>
                        </li>
                        <li>
                            <Link href="/test">
                                <button onClick={() => handleTestSelection('Spelling Test Z-2')} className={styles.testButton} >
                                    List Z-2
                                </button>
                            </Link>
                        </li>
                    </ul>
                    <ul
                        className={styles.testButtonList}
                        style={{
                            listStyleType: "none",
                            paddingLeft: 0
                        }}>
                        <li>
                            <Link href="/test">
                                <button onClick={() => handleTestSelection('States Test 1-10')} className={styles.testButton} >
                                    States 1-10
                                </button>
                            </Link>
                        </li>
                        <li>
                            <Link href="/test">
                                <button onClick={() => handleTestSelection('States Test 11-20')} className={styles.testButton} >
                                    States 11-20
                                </button>
                            </Link>
                        </li>
                        <li>
                            <Link href="/test">
                                <button onClick={() => handleTestSelection('States Test 21-30')} className={styles.testButton} >
                                    States 21-30
                                </button>
                            </Link>
                        </li>
                        <li>
                            <Link href="/test">
                                <button onClick={() => handleTestSelection('States Test 31-40')} className={styles.testButton} >
                                    States 31-40
                                </button>
                            </Link>
                        </li>
                        <li>
                            <Link href="/test">
                                <button onClick={() => handleTestSelection('States Test 41-50')} className={styles.testButton} >
                                    States 41-50
                                </button>
                            </Link>
                        </li>
                        <li>
                            <Link href="/test">
                                <button onClick={() => handleTestSelection('Capitols 1-10')} className={styles.testButton} >
                                    Capitols 1-10
                                </button>
                            </Link>
                        </li>
                        <li>
                            <Link href="/test">
                                <button onClick={() => handleTestSelection('Capitols 11-20')} className={styles.testButton} >
                                    Capitols 11-20
                                </button>
                            </Link>
                        </li>
                        <li>
                            <Link href="/test">
                                <button onClick={() => handleTestSelection('Capitols 21-30')} className={styles.testButton} >
                                    Capitols 21-30
                                </button>
                            </Link>
                        </li>
                        <li>
                            <Link href="/test">
                                <button onClick={() => handleTestSelection('Capitols 31-40')} className={styles.testButton} >
                                    Capitols 31-40
                                </button>
                            </Link>
                        </li>
                        <li>
                            <Link href="/test">
                                <button onClick={() => handleTestSelection('Capitols 41-50')} className={styles.testButton} >
                                    Capitols 41-50
                                </button>
                            </Link>
                        </li>
                    </ul>

                </div> */}
                {/* <button style={{ backgroundColor: "#00DFA2", outline: "none", border: "none", padding: "0.5rem 1rem", borderRadius: "0.5rem", fontSize: "2rem" }}><Link href='/test'>GO</Link></button> */}

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