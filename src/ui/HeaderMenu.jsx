import ButtonIcon from 'src/ui/ButtonIcon.jsx'
import { HiOutlineUser } from 'react-icons/hi2'
import Logout from 'src/features/authentication/Logout.jsx'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import DarkModeToggle from 'src/ui/DarkModeToggle.jsx'

const StyledHeaderMenu = styled.ul`
  display: flex;
  gap: 0.4rem`

function HeaderMenu () {
  const navigate = useNavigate()
  return (
    <StyledHeaderMenu>
      <li>
        <ButtonIcon onClick={() => navigate('/account')}>
          <HiOutlineUser/>
        </ButtonIcon>
      </li>
      <li>
        <DarkModeToggle />
      </li>
      <li>
        <Logout/>
      </li>
    </StyledHeaderMenu>
  )
}

export default HeaderMenu