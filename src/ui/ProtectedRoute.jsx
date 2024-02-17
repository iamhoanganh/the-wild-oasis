import PropTypes from 'prop-types'
import { useUser } from 'src/features/authentication/useUser.js'
import Spinner from 'src/ui/Spinner.jsx'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired
}

const FullPage = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--color-grey-50);
`

function ProtectedRoute ({ children }) {
  const navigate = useNavigate()
  // 1. load authenticated user
  const { isLoading, isAuthenticated } = useUser()

  // 2. show loading
  // 3. no authen user, redirect to login
  useEffect(() => {
    if (!isAuthenticated && !isLoading) navigate('/login')
  }, [isAuthenticated,isLoading, navigate])

  if (isLoading) return <FullPage><Spinner/></FullPage>

  // 4. if authen user, show children
  if (isAuthenticated) return children
}

export default ProtectedRoute