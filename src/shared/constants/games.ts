import { GAME } from ".";

export const games: Record<GAME, { title: string, description: string, statsKey: string, maxWords: number }> = {
  [GAME.AUDIO]: {
    title: 'Аудиовызов',
    description: `«Аудиовызов» - это тренировка, которая улучшает восприятие речи на слух. Выберите из предложенных вариантов ответа правильный перевод слова, который услышите.`,
    statsKey: 'a',
    maxWords: 10,
  },
  [GAME.SPRINT]: {
    title: 'Спринт',
    description: `«Спринт» - это тренировка для повторения заученных слов из вашего словаря. Выберите соответсвует ли перевод предложенному слову.`,
    statsKey: 's',
    maxWords: 60,
  }
}