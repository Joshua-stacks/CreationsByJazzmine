import { PaletteOptions } from "@mui/material/styles/createPalette";

declare module "@mui/material/styles/createPalette" {

  export interface PaletteOptions {
    neutral: {
      main: string;
      contrastText: string;
    };
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

export {}