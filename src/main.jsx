import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import "./index.css"
import '@mantine/core/styles.css'
import { MantineProvider } from '@mantine/core'
import 'dayjs/locale/pt-br'
import '@mantine/dates/styles.css'
import { DatesProvider } from '@mantine/dates'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MantineProvider>
      <DatesProvider settings={{ locale: 'pt-br' }}>
        <App />
      </DatesProvider>
    </MantineProvider>
  </StrictMode>
)