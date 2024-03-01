import React, { useEffect } from 'react'
import { useLocalStorageState } from 'src/hooks/useLocalStorageState.js'
import PropTypes from 'prop-types'

const DarkModeContext = React.createContext()
function DarkModeProvider({children}) {
  const [isDarkMode, setIsDarkMode] = useLocalStorageState(window.matchMedia('prefers-color-schema: dark').matches, "isDarkMode")
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark-mode')
      document.documentElement.classList.remove('light-mode')
    } else {
      document.documentElement.classList.remove('dark-mode')
      document.documentElement.classList.add('light-mode')
    }
  }, [isDarkMode])
  const toggleDarkMode = () => setIsDarkMode((prev) => !prev)
  return (
    <DarkModeContext.Provider value={{isDarkMode, toggleDarkMode}}>
      {children}
    </DarkModeContext.Provider>
  )
}

function useDarkMode() {
  const context = React.useContext(DarkModeContext)
  if (!context) {
    throw new Error('useDarkMode must be used within a DarkModeProvider')
  }
  return context
}
DarkModeProvider.propTypes = {
  children: PropTypes.node.isRequired
}
export {DarkModeProvider, useDarkMode}