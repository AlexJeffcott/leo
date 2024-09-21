import classes from '@/app.module.css'
import { Avatar } from '@/icons/avatar.tsx'
import { type FunctionalComponent, type JSX } from 'preact'
import { useSignal } from '@preact/signals'
import { useDecksStore } from '@/contexts/decks.tsx'
import { useRoutesStore } from '@/contexts/routes.tsx'
import { useStableVariable } from '@/hooks/use-stable-variable.tsx'

export const App: FunctionalComponent = () => {
  const routesStore = useRoutesStore()

  return (
    <main class={classes.page}>
      {routesStore.currentRoute.value === 'welcome' && <Welcome />}
      {routesStore.currentRoute.value === 'spelling' && <Spelling />}
    </main>
  )
}

export const Welcome: FunctionalComponent = () => {
  const decksStore = useDecksStore()
  const routesStore = useRoutesStore()

  const goToEnglishSpelling = useStableVariable(() => {
    decksStore.reset()
    routesStore.currentRoute.value = 'spelling'
    decksStore.setCurrentDeck('english')
    decksStore.goToNextQuestion()
  })

  const goToGerman = useStableVariable(() => {
    decksStore.reset()
    routesStore.currentRoute.value = 'spelling'
    decksStore.setCurrentDeck('german')
    decksStore.goToNextQuestion()
  })

  const goToTimesTables = useStableVariable(() => {
    decksStore.reset()
    routesStore.currentRoute.value = 'maths'
    decksStore.setCurrentDeck('tables')
    decksStore.goToNextQuestion()
  })

  return (
    <>
      <h1 class={classes.title}>Hello, welcome to LEO!</h1>
      <Avatar class={classes.avatar} />
      <button onClick={goToEnglishSpelling}>
        English Spelling
      </button>
      <button onClick={goToGerman}>
        German Spelling
      </button>
      <button onClick={goToTimesTables}>
        Multiplication Tables
      </button>
    </>
  )
}

export const Spelling: FunctionalComponent = () => {
  const decksStore = useDecksStore()
  const routesStore = useRoutesStore()

  const textInput = useSignal('')
  const status = useSignal<'right' | 'wrong' | 'unchecked'>('unchecked')

  const checkQuestion = useStableVariable(() => {
    if (decksStore.currentQuestion.value) {
      if (decksStore.currentQuestion.value.answers.includes(textInput.value)) {
        status.value = 'right'
      } else {
        status.value = 'wrong'
      }
    }
  })

  const goToWelcome = useStableVariable(() => {
    routesStore.currentRoute.value = 'welcome'
    textInput.value = ''
    status.value = 'unchecked'
    decksStore.reset()
  })

  const goToNextQuestion = useStableVariable(() => {
    textInput.value = ''
    status.value = 'unchecked'
    decksStore.goToNextQuestion()
  })

  const play = useStableVariable(() => {
    const audioElement = document.getElementById('player')
    if (audioElement instanceof HTMLAudioElement) {
      audioElement.play()
    }
  })

  if (
    decksStore.currentDeck.value?.title !== 'english' &&
    decksStore.currentDeck.value?.title !== 'german'
  ) {
    routesStore.currentRoute.value = 'welcome'
    decksStore.reset()
    return <></>
  }

  return (
    <>
      <button onClick={goToWelcome}>
        back
      </button>
      <h1 class={classes.title}>{decksStore.currentDeck.value?.title}</h1>
      {decksStore.currentQuestion.value && decksStore.currentDeck.value && (
        <>
          <h3 class={classes.questionText}>
            {decksStore.currentDeck.value.preQuestionText}
            <audio
              id='player'
              src={`/${decksStore.currentQuestion.value.text}.mp3`}
            />
            <button class={classes.audioButton} onClick={play}>👂</button>
            {decksStore.currentDeck.value.postQuestionText}
          </h3>
          {status.value === 'unchecked' && (
            <p>Click on the ear to hear the word.</p>
          )}
          {status.value === 'wrong' && <p>That’s not right, try again.</p>}
          {status.value === 'right' && <p>That’s right! Click “next”.</p>}
          <input
            value={textInput.value}
            onChange={(event) => {
              if (
                event.target && 'value' in event.target &&
                typeof event.target.value === 'string'
              ) {
                textInput.value = event.target.value
              }
            }}
          />
          {/* TODO: show a different message when there are no more questions */}
          {status.value === 'unchecked' && (
            <button onClick={checkQuestion}>check</button>
          )}
          {status.value === 'wrong' && (
            <button onClick={checkQuestion}>try again</button>
          )}
          {status.value === 'right' && (
            <button onClick={goToNextQuestion}>next</button>
          )}
        </>
      )}
    </>
  )
}

// function speak(text: string, lang: 'de' | 'en') {
//   const utterance = new SpeechSynthesisUtterance(text)
//   const voices = speechSynthesis.getVoices()
//   utterance.voice = voices[0]
//   utterance.lang = lang
//   speechSynthesis.speak(utterance)
// }
