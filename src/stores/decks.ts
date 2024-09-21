import { signal, type Signal } from '@preact/signals'

export type Deck = {
    id: string;
    title: string;
    lang: 'en' | 'de'
    preQuestionText?: string;
    postQuestionText?: string;
}

export type Question = {
    id: string
    answers: Array<string | number>
}

export type SpellingQuestion = Question & {
    text: string
}

export type ArithmeticQuestion = Question & {
    id: string
    text: string
}

type SpellingDeck = Deck & {
    questions: SpellingQuestion[]
}

type ArithmeticDeck = Deck & {
    questions: ArithmeticQuestion[]
}

const english: SpellingDeck = {
    id: '000001',
    title: 'english',
    lang: 'en',
    preQuestionText: 'How do you spell',
    postQuestionText: '?',
    questions: [
        {
            id: '000001',
            text: 'banana',
            answers: ['banana', 'banana'],
        },
        {
            id: '000002',
            text: 'apple',
            answers: ['apple', 'apple'],
        },
    ],
}

const german: SpellingDeck = {
    id: '000002',
    title: 'german',
    lang: 'de',
    preQuestionText: 'Wie schreibt man',
    postQuestionText: '?',
    questions: [
        {
            id: '000001',
            text: 'Urlaub',
            answers: ['Die Urlaub', 'die Urlaub', 'Urlaub'],
        },
    ],
}

const tables: ArithmeticDeck = {
    id: '000003',
    title: 'tables',
    lang: 'en',
    questions: [
        {
            id: '000001',
            text: '2⋅2',
            answers: [4],
        },
    ],
}

const decks = [english, german, tables]

export class Decks {
    currentDeck: Signal<SpellingDeck | ArithmeticDeck | undefined>
    currentQuestion: Signal<SpellingQuestion | ArithmeticQuestion | undefined>

    constructor() {
        this.currentDeck = signal(undefined)
        this.currentQuestion = signal(undefined)
    }

    setCurrentDeck(title: string) {
        this.currentDeck.value = decks.find(d => d.title === title)
    }

    goToNextQuestion() {
        if (!this.currentDeck.value) {
            this.currentQuestion.value = undefined
        } else if (!this.currentQuestion.value) {
            this.currentQuestion.value = this.currentDeck.value.questions[0]
        } else {
            const currentIndex = this.currentDeck.value.questions.findIndex(q => this.currentQuestion.value?.id === q.id)
            if (currentIndex === this.currentDeck.value.questions.length - 1) {
                this.currentQuestion.value = undefined
            } else {
                this.currentQuestion.value = this.currentDeck.value.questions[currentIndex + 1]
            }
        }
    }

    reset() {
        this.currentQuestion.value = undefined
        this.currentDeck.value = undefined
    }
}