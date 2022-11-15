import { ThemeProvider } from 'styled-components'
import { Router } from './Router'
import { BrowserRouter } from 'react-router-dom'
import { defaultTheme } from './styles/themes/default'
import { GlobalStyle } from './styles/themes/global'
import { CycleContextProvider } from './contexts/CycleContext'

export function App() {
    return (
        <ThemeProvider theme={defaultTheme}>

            <BrowserRouter>
            <CycleContextProvider>
                <Router />
            </CycleContextProvider>
            </BrowserRouter>

            <GlobalStyle />
        </ThemeProvider>
    )
}
