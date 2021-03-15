import Home from "./home.js";
import {sound} from '../data/sound.js'


const Game = (_ => {
  const letters = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']
  const words = ['apple', 'ball', 'cat', 'dog', 'elephant']
  let chosenWord;
  let quessingWord;
  let lives;
  let guesses;

  // cache the DOM
  const $hangman = document.querySelector('.hangman');
  const init = () => {
   chosenWord = chooseWord()
   quessingWord = Array(chosenWord.length).fill('_')
    guesses = []
    lives = 7;
    showInitPage()
    listeners()
  }

  const listeners = _ =>{
    $hangman.addEventListener('click',event =>{
      if(event.target.matches('.hangman__letter')){
        sound.click.play()
        check(event.target.innerHTML)
      }
      if(event.target.matches('.hangman__trigger')){
        Home.init()
        sound.click.play()
      }
    })
  }
  const isAlreadyTaken = (letter) =>{
    return guesses.includes(letter)
  }

  const check = guess =>{
     if(isAlreadyTaken(guess)) return;

    guesses.push(guess)

    // if the guess exist in chosenword (if you guess the right letter)
    if(chosenWord.includes(guess)){
      // update the quessing word(_ _ _ > a p a)
      updateGuessingWord(guess)
      console.log(quessingWord)

    }else{
      lives--
    }
     render()
    // check if the game is over

  }
  const render = _ =>{
    document.querySelector('.hangman__lives').innerHTML = lives
    document.querySelector('.hangman__word').innerHTML = quessingWord.join("")
  }

const updateGuessingWord = letter =>{
  chosenWord.split("").forEach((elem,index)=>{
    if(elem === letter){
      quessingWord[index] = elem;
    }
  })
}


  const showInitPage = _ =>{
    
    let markup = `
    <p class="hangman__stats">Lives:
     <span class="hangman__lives">${lives}</span>
    </p>
     <h1 class='hangman__title'>Hangman</h1>
     <canvas class="hangman__board" height="155px"></canvas>
     <div class="hangman__word">${quessingWord.join("")}</div>
     <p class="hangman__instructions">Pick a letter below to guess the whole word.</p>
     <ul class="hangman__letters">
     ${createLetters()}
     </ul>
     <button class="button hangman__trigger">Main Menu</button>
    `
   
    $hangman.innerHTML = markup;
  }

  const createLetters = _ =>{
    let markup = ``;
    letters.forEach(letter=>{
      markup += `
       <li class="hangman__letter">${letter}</li>
      `
    })
    return markup;
  }

  
  const chooseWord = _ =>{
    let randNum = Math.floor(Math.random() * words.length);
    return words[randNum]
  }

  return{
    init
  }

 
})()

export default Game