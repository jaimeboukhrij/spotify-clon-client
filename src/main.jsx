import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter as Router } from 'react-router-dom'
import { AuthProviderWrapper } from './contexts/auth.context'
import { TrackPlayProviderWrapper } from './contexts/trackPlaying'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Router>
    <AuthProviderWrapper>
      <TrackPlayProviderWrapper>

        <App />
      </TrackPlayProviderWrapper>
    </AuthProviderWrapper>

  </Router>
)
