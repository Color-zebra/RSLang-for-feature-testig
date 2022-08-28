import { AppDispatch } from 'app/store';
import { fetchWords, Word } from 'entities/word'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';

export const SprintGame = () => {

  const [word, setWord] = useState('');
  const [translate, setTranslate] = useState('');
  const [rightAnswer, setRightAnswer] = useState<null | boolean>(null)
  const [wordsForGame, setWordsForGame] = useState<Word[] | []>([])
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [winsCounter, setWinsCounter] = useState(0);  //TODO обсудить и решить какую именно статистику по словам будем собирать, пока затычка в виде счетчика отгаданных слов
  let userAnswer: boolean | null = null;

  const dispatch: AppDispatch = useDispatch();

  const [secunds, setSecunds] = useState(0);

  const getWordsForGame = async () => { 
    const words = dispatch(fetchWords());
    const result = (await words).payload as [];
    
    return result
  }

  const getWrongAnswer = () => {
    const wrong = ['черный', 'слово', 'небо', 'лето', 'апельсин']; //TODO сделать функцию для генерации неправильного ответа, пока затычка
    const index = Math.floor(Math.random() * wrong.length);
    return wrong[index];
  }

  const createCard = async () => {
    const roll = Math.random();
    const index = Math.floor(Math.random() * wordsForGame.length);
    
    if (roll > 0.5) {
      setRightAnswer(true);
      setWord(wordsForGame[index].word);
      setTranslate(wordsForGame[index].wordTranslate);
    } else {
      setRightAnswer(false);
      setWord(wordsForGame[index].word);
      setTranslate(getWrongAnswer());
    }
  }

  const checkAnswer = () => {
    if (userAnswer === rightAnswer) {
      setWinsCounter((s) => s + 1);
      console.log('Верно!');
    } else {
      console.log('Не верно!');
    }
    
    if (!isGameOver) {
      createCard();
    }
  }

  useEffect(() => { // ! Единственное предназначение этого юзэффекта, выполнить первую генерацию карточки только после того, как в стейт будет установлен массив слов. Как сделать по другому не придумал.
    createCard();   // ! Однако из за того что первый раз он срабатывает сразу при первом рендере в консоль все равно вываливается ошибка, которая после загрузки массива слов исправляется, и дальше игра работает корректно
  }, [wordsForGame]) 

  useEffect(() => {
    const assignWords = async () => {
      const words = await getWordsForGame();
      console.log(words);
      setWordsForGame(words);
    }
    assignWords();
  }, []);

  useEffect(() => {
    if (secunds < 30) {
      setTimeout(() => {
        setSecunds(secunds => secunds + 1)
      }, 1000);
    } else {
      setIsGameOver(true)
    }
  }, [secunds, isGameOver])


  return (
    <div style={{margin: '20vh auto 20vh', textAlign: 'center'}}>
      {isGameOver
        ? <div>Game over! You gave {winsCounter} correct answers </div> 
        : <div style={{width: '280px', height: '400px', backgroundColor: 'tomato', margin: '0 auto', display: 'flex', flexDirection: 'column', justifyContent: 'space-around'}}>
            <div style={{display: 'flex', justifyContent: 'space-around'}}>
              <span>Sprint</span><span>timer: {secunds}</span>
            </div>
            <div>
              <div>
                <img src="https://via.placeholder.com/150" alt="" />
              </div>
            </div>
            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-around'}}>
              <span style={{fontSize: '25px', color: 'blue'}}>{word}</span><span> is equal </span><span style={{fontSize: '25px', color: 'aqua'}}>{translate}</span>
            </div>
            <div style={{display: 'flex', justifyContent: 'space-around'}}>
              <button onClick={() => {userAnswer = true; checkAnswer()}}>true</button>
              <button onClick={() => {userAnswer = false; checkAnswer()}}>false</button>
            </div>
          </div>}
    </div>
  )
}
