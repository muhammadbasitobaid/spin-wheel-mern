import React, { useEffect } from "react";

const FacebookLogin: React.FC = () => {
  useEffect(() => {
    // Initialize Facebook SDK
    //   @ts-ignore
    window.fbAsyncInit = function () {
      //   @ts-ignore
      FB.init({
        appId: process.env.REACT_APP_FACEBOOK_APP_ID, // Replace with your Facebook app ID
        cookie: true,
        xfbml: true,
        version: "v2.0", // Replace with the Facebook API version you're using
      });

      //   @ts-ignore
      // Check login status on load
      FB.getLoginStatus(function (response) {
        statusChangeCallback(response);
      });
    };

    // Load the Facebook SDK script
    (function (d, s, id) {
      const fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      const js = d.createElement(s);
      js.id = id;
      //   @ts-ignore
      js.src = "//connect.facebook.net/pl_PL/all.js";
      //   @ts-ignore
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");
  }, []);

  // Handle status change callback
  const statusChangeCallback = (response: any) => {
    if (response.status === "connected") {
      testAPI();
    } else {
      // document.getElementById("status")!.innerHTML =
      console.log("Please log into this webpage.");
    }
  };

  // Check login state
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const checkLoginState = () => {
    //   @ts-ignore
    FB.getLoginStatus(function (response) {
      statusChangeCallback(response);
    });
  };

  // Test the Graph API
  const testAPI = () => {
    console.log("Welcome! Fetching your information.... ");
    //   @ts-ignore
    FB.api("/me", function (response: any) {
      console.log("Successful login for: " + response.name);
    });
  };

  return (
    <div className="absolute top-4 right-4 !w-full">
      <div
        className="!w-full fb-login-button"
        data-scope="public_profile,email"
        data-onlogin="checkLoginState();"
        onClick={checkLoginState}
        id="fb-login-btn"
      >
        Login with facebook
      </div>
      <div id="status"></div>
    </div>
  );
};

export default FacebookLogin;
