import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    background-color: white;
    color: #839496;
    /* margin-top: 40px; */
    /* font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'; */
  }

  .wrapper {
    display: grid;
    grid-gap: 10px;
    margin: none;
    padding: none;
    grid-template-columns: 1fr repeat(2, auto) 1fr;
    justify-content: center;
  }
`;

export default GlobalStyle;

