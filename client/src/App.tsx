import React, { FC } from 'react';
import Hello from './Hello';

interface AppProps {
  language: string;
}

const App: FC<AppProps> = ({ language }: AppProps) => (
  <>
    <h1>Welcome to Create {language} App!</h1>
    <Hello />
  </>
);

export default App;
