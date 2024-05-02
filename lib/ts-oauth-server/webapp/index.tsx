import { renderToStaticMarkup } from 'react-dom/server';

// const App = () => <div>Use React !!</div>;
type PageProps = {
  children: React.ReactNode;
};

export default ({ children }: PageProps) => `
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