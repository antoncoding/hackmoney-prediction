import React, { useState } from 'react'
import 'moment-timezone'

import { Main, Layout } from '@aragon/ui'
import { walletContext } from './contexts/wallet'

import Dashboard from './pages/Dashboard'
import NavBar from './components/NavBar'

import { useConnection } from './hooks/useConnection'

import { getPreference } from './utils/storage'

import { HashRouter as Router, Switch, Route } from 'react-router-dom'

function App() {
  const wallet = useConnection()
  const defaultTheme = getPreference('theme', 'light')
  const [theme, setTheme] = useState(defaultTheme)

  return (
    <Router>

      <Main layout={false} theme={theme}>

        <walletContext.Provider value={wallet}>
          <NavBar />
          <Layout>
            <Switch>

              <Route path="/">
                <Dashboard />
              </Route>

            </Switch>
          </Layout>
        </walletContext.Provider>
      </Main>
    </Router>
  )
}

export default App
