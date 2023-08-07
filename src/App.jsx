import styled from "styled-components";
import GlobalStyles from "./styles/GlobalStyles";
import { Button } from "./Button";
const H1 = styled.h1`
  color: red;
  font-size: 30px;
  font-weight: 600;
  background-color: beige;
`;
const Input = styled.input`
  border: 1px solid var(--color-neutral-300);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-sm);
  box-shadow: var(--shadow-sm);
  padding: 0.8rem 1.2rem;
`;
const StyledApp = styled.div`
  background-color: orange;
  padding: 20px;
`;
function App() {
  return (
    <>
      <GlobalStyles />
      <StyledApp>
        <H1>The Wild Oasis</H1>
        <Button>Click Me</Button>
      </StyledApp>
    </>
  );
}

export default App;
