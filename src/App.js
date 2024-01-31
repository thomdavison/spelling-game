import { useEffect, useState } from 'react';
import './App.css';
import Board from './components/Board';

function App() {

  const [score, setScore] = useState(0)
  const [letters, setLetters] = useState(["R", "A", "I", "G", "N", "T", "L", "E", "M"])
  const [currentWord, setCurrentWord] = useState("")
  const [submittedWords, setSubmittedWords] = useState([])
  const [centerLetter, setCenterLetter] = useState("N")
  const [words, setWords] = useState(null)

  const handleTileClick = (index) => {
    setCurrentWord(currentWord + letters[index])
  };

  useEffect(() => {
    const vowels = ["A", "E", "I", "O", "U"]
    const consonants = ["B", "C", "D", "F", "G", "H", "J", "K", "L", "M", "N", "P", "Q", "R", "S", "T", "V", "W", "X", "Y", "Z"]

    var pickedLetters = []
    for (var i = 0; i < 9; i++) {
      var chosenLetter = ""
      var letterIndex = 0
      if (i < 6) {
        chosenLetter = consonants[Math.floor(Math.random() * consonants.length)]
        letterIndex = consonants.indexOf(chosenLetter)
        consonants.splice(letterIndex, 1)
      } else {
        chosenLetter = vowels[Math.floor(Math.random() * vowels.length)]
        letterIndex = vowels.indexOf(chosenLetter)
        vowels.splice(letterIndex, 1)
      }

      pickedLetters.push(chosenLetter)
    }

    setLetters(pickedLetters)
  }, [])

  useEffect(() => {
    var checkWord = require('check-if-word')
    setWords(checkWord('en'))
  }, [])

  const submit = () => {
    if (currentWord === "" || currentWord.length < 3) {
      return
    }

    if (!currentWord.includes(centerLetter)) {
      //TODO: maybe show error message?
      return
    }

    if (submittedWords.includes(currentWord)) {
      return
    }

    if (!words.check(currentWord)) {
      //TODO: show its not a real word
      console.log("Not a real word")
      return
    }

    setScore(score + currentWord.length)
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

  return (
    <div className="App">
      <Board letters={letters}
        score={score}
        currentWord={currentWord}
        onTileClick={handleTileClick}
        submit={submit}
        submittedWords={submittedWords}
        deleteFunc={deleteFunc}
        shuffle={shuffle} />
    </div>
  );
}

export default App;
