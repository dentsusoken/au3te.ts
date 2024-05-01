import App from '../webapp/App';
import page from '../webapp/index';

export class AuthorizationEndpoint {
  get() {
    // const a = page();
    const aaa = App({ text: 'This is App !!' });
    return new Response(page({ children: aaa }), {
      headers: {
        'Content-Type': 'text/html',
      },
    });
  }
}
