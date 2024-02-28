import { styled } from "styled-components";
import HeaderMenu from 'src/ui/HeaderMenu.jsx'
import UserAvatar from 'src/features/authentication/UserAvatar.jsx'

const StyledHeader = styled.header`
  background-color: var(--color-grey-0);
  padding: 1.2rem 4.8rem;
  border-bottom: 1px solid var(--color-grey-100);
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 2.4rem;
`;
function Header() {
  return <StyledHeader>
    <UserAvatar />
    <HeaderMenu />
  </StyledHeader>;
}

export default Header;
