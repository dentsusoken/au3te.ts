type AppProps = {
  text: string;
};

export default function App({ text }: AppProps) {
  return <div>{text}</div>;
}
