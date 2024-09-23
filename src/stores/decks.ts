import { signal, type Signal } from '@preact/signals'
import { decks, type SpellingDeck, type ArithmeticDeck, type ArithmeticQuestion, type SpellingQuestion } from '@/decks/mod.ts'

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