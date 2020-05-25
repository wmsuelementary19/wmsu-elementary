document.getElementById("close").addEventListener("click",function(){
		document.querySelector(".Student-content").style.visibility = "hidden";
		document.querySelector(".Grade-Level").style.visibility = "hidden";
		document.querySelector(".Student-Sex").style.visibility = "hidden";
		document.querySelector(".Date-Of-Birth").style.visibility = "hidden";
		document.querySelector(".Place-Of-Birth").style.visibility = "hidden";
		document.querySelector(".Religion").style.visibility = "hidden";
		document.querySelector(".Address").style.visibility = "hidden";
		document.querySelector(".Father-Name").style.visibility = "hidden";
		document.querySelector(".Father-Occupation").style.visibility = "hidden";
		document.querySelector(".Father-Office").style.visibility = "hidden";
		document.querySelector(".Father-Contact-Info").style.visibility = "hidden";
		document.querySelector(".Mother-Name").style.visibility = "hidden";
		document.querySelector(".Mother-Occupation").style.visibility = "hidden";
		document.querySelector(".Mother-Office").style.visibility = "hidden";
		document.querySelector(".Mother-Contact-Info").style.visibility = "hidden";
		document.querySelector(".Guardian-Name").style.visibility = "hidden";
		document.querySelector(".Guardian-Occupation").style.visibility = "hidden";
		document.querySelector(".Guardian-Office").style.visibility = "hidden";
		document.querySelector(".Guardian-Contact-Info").style.visibility = "hidden";
    	document.querySelector(".NewStudent-Container").style.visibility = "hidden";
    	document.getElementById("Next-info").innerHTML = "Next";
    	document.getElementById("Next-info").style.background ="#3B86FF";
    	numberOfWindow = 0;
});

document.getElementById("NewStudent").addEventListener("click",function(){
    document.querySelector(".Student-content").style.visibility = "visible";
    document.querySelector(".NewStudent-Container").style.visibility = "visible";
    document.querySelector(".NewStudent-Container").style.display = "flex";
});

let numberOfWindow = 0;

document.getElementById("Next-info").addEventListener("click",function(){
	if(numberOfWindow<19){
		numberOfWindow ++;		
	}

	if(numberOfWindow<8 && numberOfWindow>0){
		if(numberOfWindow == 1){	
	    	document.querySelector(".Student-content").style.visibility = "hidden";
    		document.querySelector(".Grade-Level").style.visibility = "visible";
		}else if(numberOfWindow == 2){
	    	document.querySelector(".Student-content").style.visibility = "hidden";
    		document.querySelector(".Grade-Level").style.visibility = "visible";
		}else if(numberOfWindow == 3){
	    	document.querySelector(".Grade-Level").style.visibility = "hidden";
    		document.querySelector(".Student-Sex").style.visibility = "visible";
		}else if(numberOfWindow == 4){
	    	document.querySelector(".Student-Sex").style.visibility = "hidden";
    		document.querySelector(".Date-Of-Birth").style.visibility = "visible";
		}else if(numberOfWindow == 5){
	    	document.querySelector(".Date-Of-Birth").style.visibility = "hidden";
    		document.querySelector(".Place-Of-Birth").style.visibility = "visible";
		}else if(numberOfWindow == 6){
	    	document.querySelector(".Place-Of-Birth").style.visibility = "hidden";
    		document.querySelector(".Religion").style.visibility = "visible";
		}else if(numberOfWindow == 7){
	    	document.querySelector(".Religion").style.visibility = "hidden";
    		document.querySelector(".Address").style.visibility = "visible";
		}else {
		}
	}else if(numberOfWindow>7 && numberOfWindow<12){
		if(numberOfWindow == 8){
	    	document.querySelector(".Address").style.visibility = "hidden";
    		document.querySelector(".Father-Name").style.visibility = "visible";
		}else if(numberOfWindow == 9){
	    	document.querySelector(".Father-Name").style.visibility = "hidden";
    		document.querySelector(".Father-Occupation").style.visibility = "visible";
		}else if(numberOfWindow == 10){
	    	document.querySelector(".Father-Occupation").style.visibility = "hidden";
    		document.querySelector(".Father-Office").style.visibility = "visible";		
		}else if(numberOfWindow == 11){
	    	document.querySelector(".Father-Office").style.visibility = "hidden";
    		document.querySelector(".Father-Contact-Info").style.visibility = "visible";
		}else{

		}
	}else if(numberOfWindow>11 && numberOfWindow<16){
		if(numberOfWindow == 12){
	    	document.querySelector(".Father-Contact-Info").style.visibility = "hidden";
    		document.querySelector(".Mother-Name").style.visibility = "visible";
		}else if(numberOfWindow == 13){
	    	document.querySelector(".Mother-Name").style.visibility = "hidden";
    		document.querySelector(".Mother-Occupation").style.visibility = "visible";
		}else if(numberOfWindow == 14){
	    	document.querySelector(".Mother-Occupation").style.visibility = "hidden";
    		document.querySelector(".Mother-Office").style.visibility = "visible";		
		}else if(numberOfWindow == 15){
	    	document.querySelector(".Mother-Office").style.visibility = "hidden";
    		document.querySelector(".Mother-Contact-Info").style.visibility = "visible";
		}else{

		}
	}else if(numberOfWindow>15 && numberOfWindow<20){		
		if(numberOfWindow == 16){
	    	document.querySelector(".Mother-Contact-Info").style.visibility = "hidden";
    		document.querySelector(".Guardian-Name").style.visibility = "visible";
		}else if(numberOfWindow == 17){
	    	document.querySelector(".Guardian-Name").style.visibility = "hidden";
    		document.querySelector(".Guardian-Occupation").style.visibility = "visible";
		}else if(numberOfWindow == 18){
	    	document.querySelector(".Guardian-Occupation").style.visibility = "hidden";
    		document.querySelector(".Guardian-Office").style.visibility = "visible";			
		}else if(numberOfWindow == 19){
	    	document.querySelector(".Guardian-Office").style.visibility = "hidden";
    		document.querySelector(".Guardian-Contact-Info").style.visibility = "visible";
    		document.getElementById("Next-info").innerHTML = "Submit";
    		document.getElementById("Next-info").style.background ="#1E1";
		}else{

		}
	}else{

	}
});

document.getElementById("Back-info").addEventListener("click",function(){

	if(numberOfWindow<8 && numberOfWindow>0){
		if(numberOfWindow == 1){	
	    	document.querySelector(".Student-content").style.visibility = "visible";
    		document.querySelector(".Grade-Level").style.visibility = "hidden";
		}else if(numberOfWindow == 2){
	    	document.querySelector(".Student-content").style.visibility = "visible";
    		document.querySelector(".Grade-Level").style.visibility = "hidden";
		}else if(numberOfWindow == 3){
	    	document.querySelector(".Grade-Level").style.visibility = "visible";
    		document.querySelector(".Student-Sex").style.visibility = "hidden";
		}else if(numberOfWindow == 4){
	    	document.querySelector(".Student-Sex").style.visibility = "visible";
    		document.querySelector(".Date-Of-Birth").style.visibility = "hidden";	
		}else if(numberOfWindow == 5){
	    	document.querySelector(".Date-Of-Birth").style.visibility = "visible";
    		document.querySelector(".Place-Of-Birth").style.visibility = "hidden";
		}else if(numberOfWindow == 6){
	    	document.querySelector(".Place-Of-Birth").style.visibility = "visible";
    		document.querySelector(".Religion").style.visibility = "hidden";
		}else if(numberOfWindow == 7){
	    	document.querySelector(".Religion").style.visibility = "visible";
    		document.querySelector(".Address").style.visibility = "hidden";
		}else {

		}
	}else if(numberOfWindow>7 && numberOfWindow<12){
		if(numberOfWindow == 8){
	    	document.querySelector(".Address").style.visibility = "visible";
    		document.querySelector(".Father-Name").style.visibility = "hidden";
		}else if(numberOfWindow == 9){
	    	document.querySelector(".Father-Name").style.visibility = "visible";
    		document.querySelector(".Father-Occupation").style.visibility = "hidden";
		}else if(numberOfWindow == 10){
	    	document.querySelector(".Father-Occupation").style.visibility = "visible";
    		document.querySelector(".Father-Office").style.visibility = "hidden";		
		}else if(numberOfWindow == 11){
	    	document.querySelector(".Father-Office").style.visibility = "visible";
    		document.querySelector(".Father-Contact-Info").style.visibility = "hidden";
		}else{

		}
	}else if (numberOfWindow>11 && numberOfWindow<16) {
		if(numberOfWindow == 12){
	    	document.querySelector(".Father-Contact-Info").style.visibility = "visible";
    		document.querySelector(".Mother-Name").style.visibility = "hidden";
		}else if(numberOfWindow == 13){
	    	document.querySelector(".Mother-Name").style.visibility = "visible";
    		document.querySelector(".Mother-Occupation").style.visibility = "hidden";
		}else if(numberOfWindow == 14){
	    	document.querySelector(".Mother-Occupation").style.visibility = "visible";
    		document.querySelector(".Mother-Office").style.visibility = "hidden";		
		}else if(numberOfWindow == 15){
	    	document.querySelector(".Mother-Office").style.visibility = "visible";
    		document.querySelector(".Mother-Contact-Info").style.visibility = "hidden";
		}else{

		}

	}else if(numberOfWindow>15 && numberOfWindow<20){		
		if(numberOfWindow == 16){
	    	document.querySelector(".Mother-Contact-Info").style.visibility = "visible";
    		document.querySelector(".Guardian-Name").style.visibility = "hidden";
		}else if(numberOfWindow == 17){
	    	document.querySelector(".Guardian-Name").style.visibility = "visible";
    		document.querySelector(".Guardian-Occupation").style.visibility = "hidden";
		}else if(numberOfWindow == 18){
	    	document.querySelector(".Guardian-Occupation").style.visibility = "visible";
    		document.querySelector(".Guardian-Office").style.visibility = "hidden";	
		}else if(numberOfWindow == 19){
	    	document.querySelector(".Guardian-Office").style.visibility = "visible";
    		document.querySelector(".Guardian-Contact-Info").style.visibility = "hidden";
    		document.getElementById("Next-info").innerHTML = "Next";
    		document.getElementById("Next-info").style.background ="#3B86FF";
		}else{

		}
	}else{

	}
	if(numberOfWindow>0){
		numberOfWindow --;		
	}

});

document.getElementById("AddStudentGrade").addEventListener("click",function(){
	document.querySelector(".Student-Grade-Container").style.visibility = "visible";
});

document.getElementById("closed").addEventListener("click",function(){
	document.querySelector(".Student-Grade-Container").style.visibility = "hidden";
});


document.getElementById("Subject").addEventListener("click",function(){
	document.querySelector(".Subject-Container").style.visibility = "visible";
});

document.getElementById("subject-closed").addEventListener("click",function(){
	document.querySelector(".Subject-Container").style.visibility = "hidden";
});


document.getElementById("StudentList").addEventListener("click",function(){
	document.querySelector(".Student-list-Container").style.visibility = "visible";
});

document.getElementById("list-closed").addEventListener("click",function(){
	document.querySelector(".Student-list-Container").style.visibility = "hidden";
});


document.getElementById("Allumni").addEventListener("click",function(){
	document.querySelector(".Allumni-list-Container").style.visibility = "visible";
});

document.getElementById("A-list-closed").addEventListener("click",function(){
	document.querySelector(".Allumni-list-Container").style.visibility = "hidden";
});