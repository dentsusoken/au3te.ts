import { renderToStaticMarkup } from 'react-dom/server';
import './css/index.css';

// const App = () => <div>Use React !!</div>;
type PageProps = {
  children: React.ReactNode;
};

export const Viewable = ({ children }: PageProps) => `
  <!DOCTYPE html>
  <html lang="ja">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>タイトル</title>
  </head>
  <body>
    ${renderToStaticMarkup(children)}
  </body>
  </html>
`;
