import React from "react";
import FrontPage from "./FrontPage/FrontPage";
import ScrollPage from "./ScrollPage/ScrollPage";
import './MainPage.css';

function MainPage(){
      return(
          <div className="main-page">
                 <FrontPage />
                 <ScrollPage/>      
          </div>
      )
}

export default MainPage;