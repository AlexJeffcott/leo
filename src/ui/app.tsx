import classes from '@/ui/app.module.css'
import { Avatar, Speaker } from '@/icons/mod.ts'
import { type FunctionalComponent } from 'preact'
import { useSignal } from '@preact/signals'
import { useDecksStore, useRoutesStore } from '@/contexts/mod.ts'
import { useStableVariable } from '@/hooks/mod.ts'
import { Button } from '@/ui/components/mod.ts'

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
    decksStore.log()
    decksStore.goToNextQuestion()
  })

  const goToGermanSpelling = useStableVariable(() => {
    decksStore.reset()
    routesStore.currentRoute.value = 'spelling'
    decksStore.setCurrentDeck('deutsch')
    decksStore.log()
    decksStore.goToNextQuestion()
  })

  return (
    <>
      <h1 class={classes.title}>Hello, welcome to LEO!</h1>
      <Avatar class={classes.avatar} />
      <Button onClick={goToEnglishSpelling} text='English Spelling' />
      <Button onClick={goToGermanSpelling} text='Deutsch Spelling' />
    </>
  )
}

export const Spelling: FunctionalComponent = () => {
  const decksStore = useDecksStore()
  const routesStore = useRoutesStore()

  const textInput = useSignal('')
  const status = useSignal<'right' | 'wrong' | 'wrong-again' | 'unchecked'>(
    'unchecked',
  )

  const checkQuestion = useStableVariable(() => {
    if (decksStore.currentQuestion.value) {
      if (decksStore.currentQuestion.value.answers.includes(textInput.value)) {
        status.value = 'right'
      } else {
        status.value = status.value === 'wrong' ? 'wrong-again' : 'wrong'
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
    decksStore.currentDeck.value?.title !== 'deutsch'
  ) {
    routesStore.currentRoute.value = 'welcome'
    decksStore.reset()
    return <></>
  }

  return (
    <>
      <Button class={classes.backBtn} onClick={goToWelcome} text='<' />
      {decksStore.currentQuestion.value && decksStore.currentDeck.value && (
        <>
          <h3 class={classes.questionText}>
            {decksStore.currentDeck.value.preQuestionText}
            <audio
              id='player'
              src={`/audio/${decksStore.currentQuestion.value.text}.mp3`}
            />
            <Button
              onClick={play}
              icon={Speaker}
            />
            {decksStore.currentDeck.value.postQuestionText}
          </h3>
          <input
            spellcheck={false}
            type='text'
            class={classes.input}
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
          {status.value === 'wrong' && <p>That’s not right, try again.</p>}
          {status.value === 'wrong-again' && (
            <p>
              It was "{decksStore.currentQuestion.value.text}". Let’ try
              another. Click “next”.
            </p>
          )}
          {status.value === 'right' && <p>That’s right! Click “next”.</p>}
          {/* TODO: show a different message when there are no more questions */}
          {status.value === 'unchecked' && (
            <button onClick={checkQuestion}>check</button>
          )}
          {status.value === 'wrong' && (
            <button onClick={checkQuestion}>try again</button>
          )}
          {status.value === 'wrong-again' && (
            <button onClick={goToNextQuestion}>let's try another</button>
          )}
          {status.value === 'right' && (
            <button onClick={goToNextQuestion}>next</button>
          )}
        </>
      )}
    </>
  )
}
