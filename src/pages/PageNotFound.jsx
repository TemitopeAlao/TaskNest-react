import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const StyledPageNotFound = styled.main`
  min-height: 100vh;
  background: linear-gradient(135deg, #5200a3, #7a2bd6);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2.4rem;
`;

const Box = styled.section`
  background-color: #fff;
  border-radius: 16px;
  padding: 4rem 3.2rem;
  max-width: 520px;
  width: 100%;
  text-align: center;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.15);

  h1 {
    font-size: 2.4rem;
    margin-bottom: 1.2rem;
    color: #1f2937;
  }

  p {
    font-size: 1.5rem;
    color: #6b7280;
    margin-bottom: 3.2rem;
  }
`;

const BackButton = styled.button`
  border: none;
  background-color: #5200a3;
  color: #fff;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  border-radius: 999px;
  cursor: pointer;

  &:hover {
    background-color: #6a1fcf;
  }
`;

function PageNotFound() {
  const navigate = useNavigate();

  return (
    <StyledPageNotFound>
      <Box>
        <h1>Page not found</h1>

        <p>The page you’re trying to reach doesn’t exist or has been moved.</p>

        <BackButton onClick={() => navigate(-1)}>← Go back</BackButton>
      </Box>
    </StyledPageNotFound>
  );
}

export default PageNotFound;
