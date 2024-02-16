import { useEffect, useState } from 'react';
import './App.css';
import Board from './components/Board';
import { generateWordSet } from './Words';
import SubmittedWords from './components/SubmittedWords';

function App() {

  const [score, setScore] = useState(0)
  const [letters, setLetters] = useState([])
  const [currentWord, setCurrentWord] = useState("")
  const [submittedWords, setSubmittedWords] = useState([])
  const [centerLetter, setCenterLetter] = useState("")
  const [wordSet, setWordSet] = useState(new Set());
  const [gameState, setGameState] = useState("board")
  const [submittedInvalidWord, setSubmittedInvalidWord] = useState(false)

  let currentDate = new Date().toJSON().slice(0, 10);
  const rand = require('random-seed').create(currentDate);

  const handleTileClick = (letter) => {
    setCurrentWord(currentWord + letter.value)
  };

  const updateGameState = (gameState) => {
    setGameState(gameState)
  }

  useEffect(() => {
    generateWordSet().then((words) => {
      setWordSet(words.wordSet);
    });
  }, []);

  useEffect(() => {
    const vowels = ["A", "E", "I", "O", "U"]
    const consonants = ["B", "C", "D", "F", "G", "H", "L", "M", "N", "P", "R", "S", "T"]
    const trickyLetters = ["J", "K", "Q", "V", "W", "X", "Y", "Z"]
    var pickedLetters = []
    var theresAQ = false
    for (var i = 0; i < 9; i++) {
      var chosenLetter = ""
      var letterIndex = 0
      if (i < 6) {
        // always make sure the centre letter is not a tricky letter
        if (i === 4 || rand(100) < 90) {
          chosenLetter = consonants[rand(consonants.length)]
          letterIndex = consonants.indexOf(chosenLetter)
          consonants.splice(letterIndex, 1)
        } else {
          chosenLetter = trickyLetters[rand(trickyLetters.length)]
          letterIndex = trickyLetters.indexOf(chosenLetter)
          trickyLetters.splice(letterIndex, 1)
        }
        if (chosenLetter === "Q") {
          theresAQ = true
        }
      } else {
        chosenLetter = vowels[rand(vowels.length)]
        if (theresAQ) {
          chosenLetter = "U"
          theresAQ = false
        }
        letterIndex = vowels.indexOf(chosenLetter)
        vowels.splice(letterIndex, 1)
      }

      var isCentreLetter = i === 4 ? true : false;
      var letter = { "id": crypto.randomUUID(), "value": chosenLetter, "isCentreLetter": isCentreLetter }

      pickedLetters.push(letter)
    }


    setLetters(pickedLetters)
    setCenterLetter(pickedLetters[4].value)
  }, [])


  const submit = () => {
    if (currentWord === "" || currentWord.length < 4) {
      console.log("current word too short")
      setSubmittedInvalidWord(!submittedInvalidWord)
      return
    }

    if (!currentWord.includes(centerLetter)) {
      //TODO: maybe show error message?
      console.log("current word doesn't include center letter")
      setSubmittedInvalidWord(!submittedInvalidWord)
      return
    }

    if (submittedWords.includes(currentWord)) {
      console.log("word already submitted")
      setSubmittedInvalidWord(!submittedInvalidWord)
      return
    }

    if (!wordSet.has(currentWord.toLowerCase())) {
      console.log("word not in dictionary")
      setSubmittedInvalidWord(!submittedInvalidWord)
      return
    }

    var calculatedScore = currentWord.length > 4 ? currentWord.length : 1

    setScore(score + calculatedScore)
    setSubmittedWords([...submittedWords, currentWord])
    setCurrentWord("")

  }

  const deleteFunc = () => {
    if (currentWord === "") {
      return
    }

    setCurrentWord(currentWord.slice(0, -1))
  }

  const shuffle = () => {

    var centerLetter = letters[4]

    let shuffled = letters
      .map(value => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value)

    if (shuffled[4] !== centerLetter) {
      var wrongLetter = shuffled[4]
      var index = shuffled.indexOf(centerLetter)

      shuffled[index] = wrongLetter
      shuffled[4] = centerLetter

    }
    setLetters(shuffled)
  }

  if (gameState === "" || gameState === "board") {
    return (
      <div className="App">
        <Board
          letters={letters}
          score={score}
          currentWord={currentWord}
          onTileClick={handleTileClick}
          submit={submit}
          submittedWords={submittedWords}
          deleteFunc={deleteFunc}
          shuffle={shuffle}
          updateGameState={updateGameState}
          submittedInvalidWord={submittedInvalidWord} />
      </div>
    );
  } else if (gameState === "submittedWords") {
    return (
      <div className="App">
        <SubmittedWords
          updateGameState={updateGameState}
          submittedWords={submittedWords} />
      </div>
    );
  }
}

export default App;
