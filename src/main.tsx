import { scan } from "react-scan"
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ThemeProvider } from './components/layout/ThemeProvider.tsx'



scan({
  enabled: true,
})

createRoot(document.getElementById('root')!).render(
  /*  <StrictMode> */
  <ThemeProvider>
    <App />
  </ThemeProvider>
  /* </StrictMode> */
)
