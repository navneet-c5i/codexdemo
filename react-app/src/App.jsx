import { useEffect, useMemo, useRef, useState } from 'react'
import './App.css'

function formatTime(timeMs) {
  const minutes = Math.floor(timeMs / 60000)
  const seconds = Math.floor((timeMs % 60000) / 1000)
  const centiseconds = Math.floor((timeMs % 1000) / 10)

  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(
    centiseconds,
  ).padStart(2, '0')}`
}

function App() {
  const [isRunning, setIsRunning] = useState(false)
  const [elapsedMs, setElapsedMs] = useState(0)
  const intervalRef = useRef(null)

  useEffect(() => {
    if (!isRunning) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
      return
    }

    intervalRef.current = setInterval(() => {
      setElapsedMs((current) => current + 10)
    }, 10)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [isRunning])

  const displayTime = useMemo(() => formatTime(elapsedMs), [elapsedMs])

  const handleStartStop = () => {
    setIsRunning((running) => !running)
  }

  const handleReset = () => {
    setIsRunning(false)
    setElapsedMs(0)
  }

  return (
    <main className="stopwatch-page">
      <section className="stopwatch-card">
        <h1>Stopwatch</h1>
        <p className="time-display" aria-live="polite">
          {displayTime}
        </p>
        <div className="button-row">
          <button type="button" onClick={handleStartStop}>
            {isRunning ? 'Stop' : 'Start'}
          </button>
          <button type="button" onClick={handleReset} disabled={elapsedMs === 0}>
            Reset
          </button>
        </div>
      </section>
    </main>
  )
}

export default App
