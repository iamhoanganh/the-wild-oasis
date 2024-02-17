import ButtonIcon from 'src/ui/ButtonIcon.jsx'
import { HiArrowRightOnRectangle } from 'react-icons/hi2'
import { useLogout } from 'src/features/authentication/useLogout.js'
import SpinnerMini from 'src/ui/SpinnerMini.jsx'

function Logout () {
  const {logout, isLoading} = useLogout()

  return (
    <ButtonIcon disabled={isLoading} onClick={logout}>
      { !isLoading ? <HiArrowRightOnRectangle/> : <SpinnerMini />}
    </ButtonIcon>
  )
}

export default Logout