import {createTheme} from '@material-ui/core';

export const theme = createTheme({
    palette: {
      type: 'dark',
      primary: {
        light: '#bef67a',
        main: '#8bc34a',
        dark: '#5a9216',
        contrastText: '#000000',
      },
      secondary: {
        light: '#484848',
        main: '#212121',
        dark: '#000000',
        contrastText: '#ffffff',
      }
    }
  });
  