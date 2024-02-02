import { useEffect, useState } from 'react';
import './App.css';
import Board from './components/Board';
import { generateWordSet } from './Words';
import SubmittedWords from './components/SubmittedWords';

function App() {

  const [score, setScore] = useState(0)
  const [letters, setLetters] = useState(["R", "A", "I", "G", "N", "T", "L", "E", "M"])
  const [currentWord, setCurrentWord] = useState("")
  const [submittedWords, setSubmittedWords] = useState([])
  const [centerLetter, setCenterLetter] = useState("N")
  const [wordSet, setWordSet] = useState(new Set());
  const [gameState, setGameState] = useState("board")

  const handleTileClick = (index) => {
    setCurrentWord(currentWord + letters[index])
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
        if (i == 4 || Math.random() < 0.9) {
          chosenLetter = consonants[Math.floor(Math.random() * consonants.length)]
          letterIndex = consonants.indexOf(chosenLetter)
          consonants.splice(letterIndex, 1)
        } else {
          chosenLetter = trickyLetters[Math.floor(Math.random() * trickyLetters.length)]
          letterIndex = trickyLetters.indexOf(chosenLetter)
          trickyLetters.splice(letterIndex, 1)
        }
        if (chosenLetter === "Q") {
          theresAQ = true
        }
      } else {
        chosenLetter = vowels[Math.floor(Math.random() * vowels.length)]
        if (theresAQ) {
          chosenLetter = "U"
          theresAQ = false
        }
        letterIndex = vowels.indexOf(chosenLetter)
        vowels.splice(letterIndex, 1)
      }

      pickedLetters.push(chosenLetter)
    }


    setLetters(pickedLetters)
    setCenterLetter(pickedLetters[4])
  }, [])


  const submit = () => {
    if (currentWord === "" || currentWord.length < 4) {
      console.log("current word too short")
      return
    }

    if (!currentWord.includes(centerLetter)) {
      //TODO: maybe show error message?
      console.log("current word doesn't include center letter")
      alert("current word doesn't include center letter")
      return
    }

    if (submittedWords.includes(currentWord)) {
      console.log("word already submitted")
      return
    }

    if (!wordSet.has(currentWord.toLowerCase())) {
      console.log("word not in dictionary")
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

    //TODO: make this neater
    if (shuffled[4] !== centerLetter) {
      var wrongLetter = shuffled[4]
      var index = shuffled.indexOf(centerLetter)

      shuffled[index] = wrongLetter
      shuffled[4] = centerLetter

    }
    setLetters(shuffled)
  }

  if (gameState == "" || gameState == "board") {
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
          updateGameState={updateGameState} />
      </div>
    );
  } else if (gameState == "submittedWords") {
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
