import NProgress from 'nprogress';
import Router from 'next/router';

Router.events.on('routeChangeStart', () => {
  NProgress.start();
});

Router.events.on('routeChangeComplete', () => {
  NProgress.done();
});

Router.events.on('routeChangeError', () => {
  NProgress.done();
});

const Header = () => <header>heading</header>;

export default Header;
