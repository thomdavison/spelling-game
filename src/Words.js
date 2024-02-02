import wordBank from "./data/words_alpha.txt";

export const generateWordSet = async () => {
    let wordSet;
    let wordArr
    await fetch(wordBank)
        .then((response) => response.text())
        .then((result) => {
            wordArr = result.split("\n");
            wordSet = new Set(wordArr);
        });
    return { wordSet, wordArr };
};