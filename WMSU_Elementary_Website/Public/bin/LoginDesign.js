
function validateForm(){
	let form_user = document.forms["myForm"]["user"].value;
	let form_pass = document.forms["myForm"]["pass"].value;

	if(form_user.length < 5 && form_pass.length < 5){
		alert("password must be 8 character");
	}else{
		if(form_user == "User" && form_pass == "userpassword"){
			return true	
		}else{
			window.alert("username or password incorrect")
		}
	}
	return false
}
