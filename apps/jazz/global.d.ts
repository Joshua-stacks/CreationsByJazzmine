import { PaletteOptions } from '@mui/material/styles/createPalette';

declare module '@mui/material/styles/createPalette' {
  interface PaletteOptions {
    neutral: {
      main: string;
      contrastText: string;
    };
  }
}

declare module '@mui/material/TextField' {
  interface TextFieldPropsColorOverrides {
    neutral: true;
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    neutral: true;
  }
}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MONGO_URI: string;
      NODE_ENV: 'development' | 'production';
    }
  }
}

export {};
