"use client"
import { useEffect, useState, useRef } from 'react';
import { currentList } from '../../lists/currentList.js';

import styles from './page.module.scss';
import Link from 'next/link.js';
import Image from 'next/image.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeUp, faBullhorn, faMegaphone, faMicrophone, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

const Page = () => {
    const list = currentList;
    const [nextMondayDate, setNextMondayDate] = useState('');
    const [wordCount, setWordCount] = useState(0);
    const [currentWord, setCurrentWord] = useState('');
    const [isTesting, setIsTesting] = useState(false);
    const [score, setScore] = useState(0);
    const [userInput, setUserInput] = useState('');
    const [userWordList, setUserWordList] = useState([]);
    const [mainBtnMessage, setMainBtnMessage] = useState('Start');
    const [voices, setVoices] = useState([]);
    const [selectedVoice, setSelectedVoice] = useState(null)
    const [isListening, setIsListening] = useState('false');
    const inputRef = useRef(null);

    useEffect(() => {
        if (isListening) {
            startSpeechRecognition();
        }
    }, [isListening]);

    const startSpeechRecognition = () => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

        if (!SpeechRecognition) {
            alert('Speech recognition is not supported by your browser.');
            return;
        }

        const recognition = new window.webkitSpeechRecognition();
        recognition.lang = 'en-US'; // Set the language
        recognition.interimResults = false; // Get only final results
        recognition.continuous = false; // Stop recognition after result

        recognition.onstart = () => {
            console.log('Voice recognition started');
        };

        recognition.onresult = (event) => {
            const spokenText = event.results[0][0].transcript;
            const recognizedLetters = spokenText.trim().toUpperCase().split(" ");

            // Filter and process only individual letters
            let newInput = '';
            recognizedLetters.forEach((letter) => {
                if (/^[A-Z]$/.test(letter)) {
                    newInput += letter; // Build new input with valid letters
                } else {
                    console.log("Ignored non-letter input:", letter);
                }
            });

            // Replace the current input with the recognized letters
            setUserInput(newInput);
        };

        recognition.onerror = (event) => {
            console.error('Error occurred in recognition:', event.error);
        };

        recognition.onend = () => {
            console.log('Voice recognition ended');
            setIsListening(false); // Stop listening after recognition ends
        };

        recognition.start(); // Start speech recognition
    };

    const handleMicrophoneClick = () => {
        setIsListening(true); // Start listening when microphone button is clicked
    };
    useEffect(() => {
        const handleVoicesChanged = () => {
            const availableVoices = window.speechSynthesis.getVoices();
            setVoices(availableVoices);

            // Preselect a specific voice
            const defaultVoice = availableVoices.find(voice => voice.name === 'IBM Watson - Michael');

            setSelectedVoice(defaultVoice);
        };

        window.speechSynthesis.onvoiceschanged = handleVoicesChanged;

        // Fetch voices on component mount
        handleVoicesChanged();

        return () => {
            window.speechSynthesis.onvoiceschanged = null; // Clean up the event listener
        };
    }, []);

    useEffect(() => {
        if (isTesting && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isTesting]);


    useEffect(() => {

        function getNextMonday() {
            const today = new Date();

            const dayOfWeek = today.getDay();

            let daysUntilNextMonday;
            if (dayOfWeek === 0) {

                daysUntilNextMonday = 1;
            } else if (dayOfWeek === 1 || dayOfWeek === 2) {

                daysUntilNextMonday = 0;
            } else {

                daysUntilNextMonday = (8 - dayOfWeek) % 7;
            }

            const nextMonday = new Date(today);
            nextMonday.setDate(today.getDate() + daysUntilNextMonday);
            return nextMonday.toDateString();
        }
        setNextMondayDate(getNextMonday());
    }, []);

    const startTest = () => {
        setIsTesting(true);
        setCurrentWord(list[0]);
        setWordCount(0);
        setScore(0);
        playWord(list[0]);
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }

    const handleNextWord = () => {
        if (!isTesting) return;
        if (userInput.trim().length < 1) return;
        if (wordCount >= list.length - 1) {
            setIsTesting(false);
            setMainBtnMessage('Test Again')
        }

        setUserWordList((prevList) => [...prevList, userInput]);
        // console.table(userWordList);

        console.log("userword: ", userInput, "currentWord: ", currentWord);
        if (userInput.trim().toLowerCase() === currentWord.toLowerCase()) {
            setScore((prevScore) => prevScore + 1);
            console.log("userword: ", userInput, "currentWord: ", currentWord);
        }

        if (wordCount < list.length) {
            setCurrentWord(list[wordCount + 1]);
            setWordCount((prevCount) => prevCount + 1);
            playWord(list[wordCount + 1]);
            setUserInput('');
            console.log(`Correct! New Score: ${score}`);
        } else {
            console.log('you finished the test! Final score: ', score);
            setIsTesting(false);
        }
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }

    const handleInputChange = (event) => {
        setUserInput(event.target.value);
    }

    const handleClearInput = () => {
        setUserInput('');
    };

    // const playWord = (word) => {
    //     const speech = new SpeechSynthesisUtterance(word);
    //     if (selectedVoice) {
    //         speech.voice = selectedVoice;
    //     }
    //     window.speechSynthesis.speak(speech);
    // };
    const playWord = (word) => {
        const speech = new SpeechSynthesisUtterance(word);

        // const naturalVoice = voices.find(voice =>
        //     voice.name.includes("Google US English") ||
        //     // voice.name.includes("Google UK English") ||
        //     voice.name.includes("Microsoft Zira") || // Microsoft's natural voices
        //     voice.name.includes("Microsoft David")   // Another option
        // );
        const usVoice = voices.find(voice =>
            voice.lang === 'en-US' &&
            (voice.name.includes("Google US English") || voice.name.includes("Microsoft David") || voice.name.includes("Samantha"))
        );


        speech.voice = selectedVoice || usVoice || voices.find(voice => voice.lang === 'en-US');
        speech.rate = 0.85;
        window.speechSynthesis.speak(speech);
    };

    const repeatWord = () => {
        playWord(currentWord);
    }

    return (
        <main className={styles.main}>
            <h1 className={styles.title}><Link href='/'>5th Grade Spelling</Link></h1>
            {/* {!isTesting && <h3>
                Test for the week of {nextMondayDate}
            </h3>} */}
            <div>Score: <span>{score}/{wordCount}</span></div>
            {!isTesting && <button className={styles.btn} onClick={
                startTest
            }>{mainBtnMessage}</button>}
            {isTesting && <div className={styles.test}>



                {isTesting && <div className={styles.inputContainer}>

                    <h4 className={styles.subtitle}>Type the word here:</h4>
                    <div>
                        <input
                            type="text"
                            className={styles.input}
                            value={userInput}
                            onChange={handleInputChange}
                            placeholder=""
                            ref={inputRef}
                            spellcheck="false"
                        />
                        {userInput && (
                            <button className={styles.clearButton} onClick={handleClearInput}>
                                <FontAwesomeIcon icon={faTimesCircle} />
                            </button>
                        )}
                    </div>
                    <button className={styles.micButton} onClick={handleMicrophoneClick}>
                        <FontAwesomeIcon icon={faMicrophone} style={{ color: "#ffffff" }} />
                    </button>
                </div>

                }
                {isTesting && <div className={styles.buttons}>
                    <button onClick={repeatWord} className={styles.repeatBtn}>
                        <h4>Repeat Word</h4>
                        <FontAwesomeIcon icon={faVolumeUp} style={styles.icon} />
                    </button>
                    <button className={styles.nextBtn} onClick={handleNextWord}>
                        Next
                    </button>
                </div>}
                {/* <ol>
                    {oct8.map((word, index) => {
                        return (<li key={index} className='word'>{word}</li>)
                    })}
                </ol> */}
            </div>}
        </main>
    )
}

export default Page;

