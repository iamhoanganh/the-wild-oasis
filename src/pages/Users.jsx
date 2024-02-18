import Heading from '../ui/Heading'
import { Fragment } from 'react'
import SignupForm from 'src/features/authentication/SignupForm.jsx'

function NewUsers () {
  return <Fragment>
    <Heading as="h1">Create a new user</Heading>
    <SignupForm/>
  </Fragment>
}

export default NewUsers
