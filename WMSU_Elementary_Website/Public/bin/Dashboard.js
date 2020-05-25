
document.getElementById("logout").addEventListener("click", function(){	
	window.location = "file:///Users/shunetantiado/Desktop/SE%20Dev%20Presentation/WMSU_Elementary_Website/Public/index.html";
});
document.getElementById("close").addEventListener("click",function(){
	document.querySelector(".NewStudent-Container").style.display = "none";
	document.querySelector(".Overlay").style.display = "none";
	index = 0;
});
document.getElementById("NewStudent").addEventListener("click",function(){
	document.querySelector(".Overlay").style.display = "block";
	document.querySelector(".NewStudent-Container").style.display = "block";
});

document.getElementById("mae").addEventListener("click", function(){
	let name = document.querySelector("#Cabrera").textContent;
	console.log(name);
	document.querySelector("#student-name").value = name;
});

let index = 0;

document.getElementById("Next-info").addEventListener("click",function(){
	if(index <= 4){
		index++;	
	}
	if(index==1){
		document.querySelector(".content").style.visibility = "hidden";
		document.querySelector(".father-information").style.visibility = "visible"; 
	}else if(index==2){
		document.querySelector(".father-information").style.visibility = "hidden";
		document.querySelector(".mother-information").style.visibility = "visible";
	}else if(index==3){
		document.querySelector(".mother-information").style.visibility = "hidden";
		document.querySelector(".guardian-information").style.visibility = "visible";
	}else if(index==4){

		document.querySelector(".guardian-information").style.visibility = "hidden";
		document.querySelector(".incase-of-emergency").style.visibility = "visible";


		let name_option = document.getElementById("emerg");
		var option = document.createElement("option");
		
		option.text = document.getElementById("F-name").value;
		name_option.add(option);

		var option = document.createElement("option");
		option.text = document.getElementById("M-name").value;
		name_option.add(option);

		var option = document.createElement("option");
		option.text = document.getElementById("G-name").value;
		name_option.add(option);

		document.getElementById("Next-info").innerHTML = "Save";
		document.getElementById("Next-info").style.background = "green";
	}else{

	}
});

document.getElementById("Back-info").addEventListener("click",function(){
	if(index==1){
		document.querySelector(".content").style.visibility = "visible";
		document.querySelector(".father-information").style.visibility = "hidden"; 
	}else if(index==2){
		document.querySelector(".father-information").style.visibility = "visible";
		document.querySelector(".mother-information").style.visibility = "hidden";
	}else if(index==3){
		document.querySelector(".mother-information").style.visibility = "visible";
		document.querySelector(".guardian-information").style.visibility = "hidden";
	}else if(index==4){
		document.getElementById("Next-info").innerHTML = "Next";
		document.getElementById("Next-info").style.background = "#3B86FF";
		document.querySelector(".guardian-information").style.visibility = "visible";
		document.querySelector(".incase-of-emergency").style.visibility = "hidden";

	}else{

	}

	if(index>0){
		index--;	
	}
});
///******  ADD GRADE MODULE  *******////
document.getElementById("close-grade").addEventListener("click", function(){
	document.querySelector(".Overlay").style.display = "none";
	document.querySelector(".grade-Container").style.display = "none";
});

document.getElementById("AddStudentGrade").addEventListener("click", function(){
	document.querySelector(".Overlay").style.display = "block";
	document.querySelector(".grade-Container").style.display = "block";
});

///******  STUDENT LIST MODULE  *******////
document.getElementById("close-list").addEventListener("click", function(){
	document.querySelector(".Overlay").style.display = "none";
	document.querySelector(".list-Container").style.display = "none";
});

document.getElementById("StudentList").addEventListener("click", function(){
	document.querySelector(".Overlay").style.display = "block";
	document.querySelector(".list-Container").style.display = "block";
});

