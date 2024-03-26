const axios = require("axios");
(() => {
  const data = JSON.stringify({
    clientcode: "K676865",
    password: "5607",
    totp: "718670", //TODO: change this when you generate
  });

  const config = {
    method: "post",
    url: "https://apiconnect.angelbroking.com//rest/auth/angelbroking/user/v1/loginByPassword",

    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "X-UserType": "USER",
      "X-SourceID": "WEB",
      "X-PrivateKey": "sFrEQ3Ko",
    },
    data: data,
  };

  axios(config)
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.error("Ran into an error");
      //   console.error(error); //TODO: uncomment when you need to check the error
    });
})();
