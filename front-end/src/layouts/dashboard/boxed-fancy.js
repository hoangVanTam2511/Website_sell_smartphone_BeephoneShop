import { Fragment, memo, useEffect } from "react";

import { Button } from "react-bootstrap";

//BoxedRouter
import BoxedFancyRouter from "../../router/boxed-fancy-router";

//header
import HeaderStyle2 from "../../components/partials/dashboard/HeaderStyle/header-style-2";

//footer
import Footer from "../../components/partials/dashboard/FooterStyle/footer";
import Loader from "../../components/Loader";

// store
import SettingOffCanvas from "../../components/setting/SettingOffCanvas";

const BoxedFancy = memo((props) => {
  useEffect(() => {
    document.body.classList.add("boxed-fancy");
    return () => {
      document.body.classList.remove("boxed-fancy");
    };
  });
  return (
    <Fragment>
    <div className="boxed-inner">
      <div id="loading">
        <Loader />
      </div>
      <span className="screen-darken"></span>
      <main className="main-content">
        <HeaderStyle2 />
        <div className="conatiner-fluid content-inner">
          <BoxedFancyRouter />
        </div>
        <div className="btn-download">
          <Button
            className="btn btn-success px-3 py-2"
            variant=" "
            href="https://iqonic.design/product/admin-templates/hope-ui-free-open-source-react-admin-template/"
            target="_blank"
          >
            {/* <svg width="22" className="me-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path opacity="0.4" fillRule="evenodd" clipRule="evenodd" d="M5.91064 20.5886C5.91064 19.7486 6.59064 19.0686 7.43064 19.0686C8.26064 19.0686 8.94064 19.7486 8.94064 20.5886C8.94064 21.4186 8.26064 22.0986 7.43064 22.0986C6.59064 22.0986 5.91064 21.4186 5.91064 20.5886ZM17.1606 20.5886C17.1606 19.7486 17.8406 19.0686 18.6806 19.0686C19.5106 19.0686 20.1906 19.7486 20.1906 20.5886C20.1906 21.4186 19.5106 22.0986 18.6806 22.0986C17.8406 22.0986 17.1606 21.4186 17.1606 20.5886Z" fill="currentColor"></path>
                            <path fillRule="evenodd" clipRule="evenodd" d="M20.1907 6.34909C20.8007 6.34909 21.2007 6.55909 21.6007 7.01909C22.0007 7.47909 22.0707 8.13909 21.9807 8.73809L21.0307 15.2981C20.8507 16.5591 19.7707 17.4881 18.5007 17.4881H7.59074C6.26074 17.4881 5.16074 16.4681 5.05074 15.1491L4.13074 4.24809L2.62074 3.98809C2.22074 3.91809 1.94074 3.52809 2.01074 3.12809C2.08074 2.71809 2.47074 2.44809 2.88074 2.50809L5.26574 2.86809C5.60574 2.92909 5.85574 3.20809 5.88574 3.54809L6.07574 5.78809C6.10574 6.10909 6.36574 6.34909 6.68574 6.34909H20.1907ZM14.1307 11.5481H16.9007C17.3207 11.5481 17.6507 11.2081 17.6507 10.7981C17.6507 10.3781 17.3207 10.0481 16.9007 10.0481H14.1307C13.7107 10.0481 13.3807 10.3781 13.3807 10.7981C13.3807 11.2081 13.7107 11.5481 14.1307 11.5481Z" fill="currentColor"></path>
                        </svg>
                        <span>Download</span> */}
            <svg
              className="icon-24"
              width="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                opacity="0.4"
                d="M17.554 7.29614C20.005 7.29614 22 9.35594 22 11.8876V16.9199C22 19.4453 20.01 21.5 17.564 21.5L6.448 21.5C3.996 21.5 2 19.4412 2 16.9096V11.8773C2 9.35181 3.991 7.29614 6.438 7.29614H7.378L17.554 7.29614Z"
                fill="currentColor"
              ></path>
              <path
                d="M12.5464 16.0374L15.4554 13.0695C15.7554 12.7627 15.7554 12.2691 15.4534 11.9634C15.1514 11.6587 14.6644 11.6597 14.3644 11.9654L12.7714 13.5905L12.7714 3.2821C12.7714 2.85042 12.4264 2.5 12.0004 2.5C11.5754 2.5 11.2314 2.85042 11.2314 3.2821L11.2314 13.5905L9.63742 11.9654C9.33742 11.6597 8.85043 11.6587 8.54843 11.9634C8.39743 12.1168 8.32142 12.3168 8.32142 12.518C8.32142 12.717 8.39743 12.9171 8.54643 13.0695L11.4554 16.0374C11.6004 16.1847 11.7964 16.268 12.0004 16.268C12.2054 16.268 12.4014 16.1847 12.5464 16.0374Z"
                fill="currentColor"
              ></path>
            </svg>
          </Button>
        </div>
        <Footer />
      </main>
    </div>
    <SettingOffCanvas/>
    </Fragment>
  );
});

export default BoxedFancy;
