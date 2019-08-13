import { createGlobalStyle } from './themed-styled-components';

export const myTheme = {
  font: {
    heading: "'Playfair Display', serif",
    body: "'Montserrat', sans-serif",
  },
  fontSize: {
    heading1: '3.6rem',
    heading2: '3.2rem',
    heading3: '2.8rem',
    heading4: '2.4rem',
    heading5: '2.1rem',
    heading6: '2rem',
    large: '1.7rem',
    medium: '1.6rem',
    small: '1.5rem',
  },
  color: {
    primary: '#ff6600',
    secondary: 'rgb(246,246,239)',
    gray: '#828282',
    error: 'hsl(1, 84%, 44%)',
    outline: 'hsl(194, 47%, 56%)',
  },
  mobileQuery: {
    mobileS: '320px',
    mobileM: '375px',
    mobileL: '425px',
    tablet: '768px',
    laptop: '1024px',
    laptopL: '1440px',
    desktop: '1920px',
  },
};

export const GlobalStyle = createGlobalStyle`
  html,
  body {
    box-sizing: border-box;
    font-feature-settings: 'liga1' on;
    -moz-font-feature-settings: 'liga' on;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    font-size: 10px;
    line-height: 1.45;
    margin: 0;
    font-family: Verdana, Geneva, sans-serif;
  }

  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }

  ::selection {
    color: ${props => props.theme.color.secondary};
    background: ${props => props.theme.color.primary};
  }

  ::-moz-selection {
    color: ${props => props.theme.color.secondary};
    background: ${props => props.theme.color.primary};
  }

  input {
    max-width: 500px;
  }

  .gray {
    color: ${props => props.theme.color.gray};
  }

  .orange {
    background-color: ${props => props.theme.color.primary};
  }

  .background-gray {
    background-color: ${props => props.theme.color.secondary};
  }

  .f11 {
    font-size: 11px;
  }

  .w85 {
    width: 85%;
  }

  .button {
    font-family: monospace;
    font-size: 10pt;
    color: black;
    background-color: ${props => props.theme.color.primary};
    text-align: center;
    padding: 2px 6px 3px;
    border-width: 2px;
    border-style: outset;
    border-color: ${props => props.theme.color.primary};
    cursor: pointer;
    max-width: 250px;
  }
`;
