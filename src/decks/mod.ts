import en from '@/assets/decks/en.json' with { type: "json" }
import de from '@/assets/decks/de.json' with { type: "json" }

export type Deck = {
    id: string;
    title: string;
    lang: 'en' | 'de' | 'it'
    preQuestionText?: string;
    postQuestionText?: string;
}

export type Question = {
    id: string
    answers: Array<string | number>
}

export type SpellingQuestion = Question & {
    text: string
    example: string
}

export type ArithmeticQuestion = Question & {
    id: string
    text: string
}

export type SpellingDeck = Deck & {
    questions: SpellingQuestion[]
}

export type ArithmeticDeck = Deck & {
    questions: ArithmeticQuestion[]
}

const english = en as SpellingDeck
const german = de as SpellingDeck

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

export const decks = [english, german, tables]