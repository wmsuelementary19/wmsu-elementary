let auth = firebase.auth();
let db = firebase.firestore();
$(document).ready(function(){
    // Get value on button click and show alert
        $("#sign_in").click(function(e){    
         e.preventDefault();
         
        var email = $("#username").val();
        var password = $("#password").val();

        auth.signInWithEmailAndPassword(email,password).then((cred) => {
            try {
                db.collection('User').doc(cred.user.uid).get().then((snapshot) =>{
                    sessionStorage.setItem('UID',JSON.stringify(auth));
                    if(snapshot.data().User_Type){
                        location = 'file:///Users/shunetantiado/Desktop/SE%20Dev%20Presentation/ADMIN/Public/WMSUElementaryDashBoard.html';
                    }else{
                        location = 'file:///Users/shunetantiado/Desktop/SE%20Dev%20Presentation/WMSU_Elementary_Website/Public/WMSUElementaryDashBoard.html';
                    }
                });
            } catch (error) {
                console.error(error);
            }
        }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            alert("error: "+ errorMessage);
            // ...
        });
    }); 
});
