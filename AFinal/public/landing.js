function loginCheck() {
  if((loginUsername.value == "") || (loginPassword.value == "")) {
    alert("Invalid Username or Password");
  } else {
    // location.pathname = "/checking/" + loginUsername.value + "_" + loginPassword.value;
    checkCredentials(loginUsername.value);
  }
}

function continueGuest() {
  console.log("current path:", location.pathname);
  location.pathname = "/mainShop.html"
}

function checkCredentials(username){
    var request = new XMLHttpRequest();
    request.open('POST', "/login");

    var requestBody = JSON.stringify({
      name: username
    });

    request.setRequestHeader(
      'Content-Type',
      'application/json'
    );

    request.addEventListener('load', function (event) {
      if (event.target.status === 200) {
        location.pathname = "/mainShop.html";
      }
      else if (event.target.status === 204) {
        alert("User Does Not Exist");
      }
    });

    console.log(requestBody);

    request.send(requestBody);
}

var loginButton = document.getElementsByClassName("login-continue-button");
var guestButton = document.getElementsByClassName("login-guest-button");
var loginUsername = document.getElementById("login-username-input");
var loginPassword = document.getElementById("login-password-input");

loginButton[0].addEventListener("click", loginCheck);
guestButton[0].addEventListener("click", continueGuest);
