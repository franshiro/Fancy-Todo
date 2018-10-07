$(document).ready(function () {
    hideButton()
});


function hideButton(){
   let token = localStorage.getItem('token')
    if(token){
        $('#buttonSignOutLogin').empty()
        $('#buttonSignOutLogin').append(`
            <button type="button" id="buttonSignOut" class="btn btn-primary" onclick="signOut()">Sign Out</button>
        `)
    }
    else{
        $('#buttonSignOutLogin').empty()
        $('#buttonSignOutLogin').append(`
        <button type="button" id="buttonLogin" class="btn btn-primary" data-toggle="modal" data-target="#modalLogin">
                    Login
        </button>
        `)
    }
}
function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    var id_token = googleUser.getAuthResponse().id_token;
    $.ajax({
        method : 'POST',
        url : `http://localhost:3000/signin/google`,
        data : {
            googleToken : id_token
        }
    })
    .done(data => {
        console.log(id_token)
        localStorage.setItem('token', data.token)
    })
    .fail(err => {
        console.log(err)
    })
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
    console.log('User signed out.');
    localStorage.removeItem('token')
    });
    // console.log('user signed out')
    // localStorage.removeItem('token')
}

function signin(){
    $.ajax({
        method : 'POST',
        url : `http://localhost:3000/signin`,
        data : {
            email : $('#loginEmail').val(),
            password : document.getElementById('loginPassword').value
        }
    })
    .done(response => {
        if(response.token){
            localStorage.setItem('token', response.token)
        }
    })
    .fail(err => {
        console.log(err)
    })
}

function signup(){
    $.ajax({
        method : 'POST',
        url : `http://localhost:3000/signup`,
        data : {
            email : $('#registerEmail').val(),
            password : document.getElementById('registerPassword').value,
            name : $('#registerName').val()
        }
    })
    .done(response => {
        console.log(response)
    })
    .fail(err => {
        console.log(err)
    })
   
}
