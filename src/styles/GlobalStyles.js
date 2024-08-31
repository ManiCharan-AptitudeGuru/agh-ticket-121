import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  :root {
    --primary-color: #3498db;
    --secondary-color: #2ecc71;
    --background-color: #ecf0f1;
    --text-color: #34495e;
    --error-color: #e74c3c;
    --success-color: #27ae60;
    --card-background: #ffffff;
  }

  * {
    box-sizing: border-box;
  }

  body {
    font-family: 'Poppins', sans-serif;
    background-color: var(--background-color);
    color: var(--text-color);
    margin: 0;
    padding: 0;
  }
`;

export default GlobalStyles;
