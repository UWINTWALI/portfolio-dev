import { Anchor } from './CustomHtml';
import ReactGA from 'react-ga4';

function Footer(): JSX.Element {
  return (
    <>
      <footer className="flex flex-col items-center justify-center w-full py-6 border-t">
        <div className="flex items-center justify-center">
          <Anchor
            className="ml-1"
            href="https://github.com/UWINTWALI"
            style={{ textDecoration: 'none' }}
          >
            Jean de Dieu UWINTWALI @ {new Date().getFullYear()}
          </Anchor>
        </div>
      </footer>
    </>
  );
}

export default Footer;
