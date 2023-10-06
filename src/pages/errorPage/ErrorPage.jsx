import ReturnButton from "../../components/returnButton/ReturnButton";
import { useEffect } from "react";

import "./ErrorPage.scss";

function ErrorPage() {
  useEffect(() => {
    document.title = "Error page";
  }, []);

  return (
    <div className='error-page'>
      <div className='container'>
        <h1 className='error-page__title'>Ooops something went wrong!</h1>
        <div className='error-page__buttons'>
          <ReturnButton
            text='Go to home page'
            path={sessionStorage.getItem("lastHomePageUrl")}
            homePage={true}
          />
          <ReturnButton text='Go back' />
        </div>
      </div>
    </div>
  );
}

export default ErrorPage;
