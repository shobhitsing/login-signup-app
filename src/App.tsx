import { useState } from 'react'
import Login from './components/Login'
import Signup from './components/Signup'
import './App.css'

type AuthScreen = 'login' | 'signup'

function App() {
  const [currentScreen, setCurrentScreen] = useState<AuthScreen>('login')

  const switchToSignup = () => setCurrentScreen('signup')
  const switchToLogin = () => setCurrentScreen('login')

  return (
    <div className="app">
      {currentScreen === 'login' ? (
        <Login onSwitchToSignup={switchToSignup} />
      ) : (
        <Signup onSwitchToLogin={switchToLogin} />
      )}
    </div>
  )
}

export default App