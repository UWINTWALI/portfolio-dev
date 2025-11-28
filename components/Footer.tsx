import { Anchor } from './CustomHtml';
import ReactGA from 'react-ga4';

function Footer(): JSX.Element {
  return (
    <>
      <footer className="flex flex-col items-center justify-center w-full py-6 border-t">
        <div className="flex items-center justify-center">
          made with <span className="text-red-500 mx-1">❤</span> by
          <Anchor className="ml-1" href="https://github.com/UWINTWALI">
            Jean de Dieu UWINTWALI
          </Anchor>
        </div>
      </footer>
    </>
  );
}

export default Footer;
