import { StrictMode } from 'react'
import App, { appElement, appElementId } from './containers/App'
import ReactDOM from 'react-dom/client'

import './index.css'
import fetchLibrary from './services/cards'

// import reportWebVitals from './reportWebVitals'

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
;(async () => {
  const library = await fetchLibrary()
  if (appElement) {
    ReactDOM.createRoot(appElement).render(
      <StrictMode>
        <App {...library} />
      </StrictMode>
    )
  } else {
    throw new Error(`Element with id ${appElementId} not found.`)
  }
})()

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals()
