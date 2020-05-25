//Generic User Dashboard js.
//System Profossal: 'STUDENT PROFILING AND GRADING SYSTEM'
//The grades will be only inputed because the data does already exist.

const db = firebase.firestore();
let auth = firebase.auth();
let updateStatus = false;
let st = true;

function setUser(){
	auth = JSON.parse(sessionStorage.getItem('UID'));
	try {	
		let user = auth.currentUser;
		getData();
		db.collection('User').doc(user.uid).get().then((snapshot) =>{

				$('#header_account_data')[0].textContent = snapshot.data().Teacher_name;
				$('#header_user_pict')[0].setAttribute('src',snapshot.data().Image);
				let ul = document.createElement('ul');
					ul.setAttribute('id','header_logout');
				let li = document.createElement('li');
					li.setAttribute('id','logout');
					li.textContent ='Log out';
					ul.appendChild(li);
				$('#header_account_data')[0].appendChild(ul);

				li.addEventListener("click", function(e){
					e.preventDefault();
					firebase.auth().signOut().then(()=>{
						console.log('user signout');
						sessionStorage.removeItem('UID');
						window.location = "index.html";
					});	
				});
		});
	} catch (error) {
		//location = 'index.html';
	}
}

document.getElementById('header_account_data').addEventListener('click', (e) => {
	e.preventDefault();
	if(st){
		$("#header_logout")[0].style.display = "block";
		st = false;
	}else{
		$('#header_logout')[0].style.display = "none";
		st = true;
	}
});
//a logout case that will execute when the user click the log out button
//located at upper right , under the name of the user.
//the user need set ther cursor under the name of the user in order for the logout button to display


//this is an exit close button for creating profile
//when user click this it hides the modal of New Student
document.getElementById("newstudent_header_close").addEventListener("click",function(){
	$("#newstudent")[0].style.display = "none";
	$(".Overlay")[0].style.display = "none";
	$(".newstudent_content")[0].style.visibility = "visible";
	$(".content_father")[0].style.visibility = "hidden";
	$(".content_mother")[0].style.visibility = "hidden";
	$(".content_guardian")[0].style.visibility = "hidden";
	$(".content_emergency")[0].style.visibility = "hidden";

	//This will set the button to its default look
	$("#Next-info")[0].innerHTML = "Next";
	$("#Next-info")[0].style.background = "#3B86FF";

	//call the function clear that can be found at line #322
	clear();
	indexValue = 1;
});

//This is a part of navigation sidebar
//When user click this a modal for creating a profile of student will Popup.
document.getElementById("NewStudent").addEventListener("click",function(){
	//an overlay is needed to prevent user to click other components when the modal is popup.
	$(".Overlay")[0].style.display = "block";
	//show modal: New Student
	$("#newstudent")[0].style.display = "block";
});

let indexValue = 1;
//New Student modal has 4 parts.
//1st the student information, 2nd father information, 3rd mother information, 4 guardian information at fifth you will only select between the 3 person 
// to contact incase of emergency
document.getElementById("Next-info").addEventListener("click",function(){
	let name_option = $("#emergency_data")[0];


	if(this.innerHTML != 'Save'){
		if(indexValue==1){
			studentNoEmptyFields().then((message) => {
				$(".newstudent_content")[0].style.visibility = "hidden";
				$(".content_father")[0].style.visibility = "visible";
				indexValue++;
			}).catch( (error) => {
				alert(error);
			});

		}else if(indexValue==2){
			fatherNoEmptyFields().then((message) => {
				$(".content_father")[0].style.visibility = "hidden";
				$(".content_mother")[0].style.visibility = "visible"; 
				const option = document.createElement("option");
				option.text = $('#content_father_name')[0].value;
				name_option.add(option);
				indexValue ++;
			}).catch((error) => {
				alert(error);
			});
		}else if(indexValue==3){
			fatherNoEmptyFields().then((message) => {
				$(".content_mother")[0].style.visibility = "hidden";
				$(".content_guardian")[0].style.visibility = "visible";
				const option = document.createElement("option");
				option.text = $('#content_mother_name')[0].value;
				name_option.add(option);
				indexValue ++;
			}).catch((error) => {
				alert(error);
			});
		}else if(indexValue==4){

			fatherNoEmptyFields().then((message) => {
				$(".content_guardian")[0].style.visibility = "hidden";
				$(".content_emergency")[0].style.visibility = "visible";
				const option = document.createElement("option");
				option.text = $("#content_guardian_name")[0].value;
				name_option.add(option);
				indexValue ++;
			}).catch((error) => {
				alert(error);
			});

			$("#Next-info")[0].innerHTML = "Save";
			$("#Next-info")[0].style.background = "green";
		}
	}else{
		if(this.innerHTML == 'Save'){
			try {
				if(auth.currentUser){
					studentProfile();
				}
			} catch (error) {
				alert('You can`t add student account ! Please sign in first');
			}
		}
	}
});

//Back-info is the opposite of Next-info
//this is needed incase of incorrect input , the user still can correct it
document.getElementById("Back-info").addEventListener("click",function(){
	let name_option = $("emergency_data");
	name_option.remove(name_option.length - 1);

	if(indexValue==2){
		$(".newstudent_content")[0].style.visibility = "visible";
		$(".content_father")[0].style.visibility = "hidden"; 
	}else if(indexValue==3){
		$(".content_father")[0].style.visibility = "visible";
		$(".content_mother")[0].style.visibility = "hidden";
	}else if(indexValue==4){
		$(".content_mother")[0].style.visibility = "visible";
		$(".content_guardian")[0].style.visibility = "hidden";
	}else if(indexValue==5){
		$("#Next-info")[0].innerHTML = "Next";
		$("#Next-info")[0].style.background = "#3B86FF";
		$(".content_guardian")[0].style.visibility = "visible";
		$(".content_emergency")[0].style.visibility = "hidden";

	}else{

	}
	if(indexValue>1){
		indexValue--;	
	}
});

function studentNoEmptyFields(){
	return new Promise((resolve,reject) => {
		let lrn  = 	$('#content_student_lrn')[0].value;
		let fname = $('#content_student_given_name')[0].value;
		let mname = $('#content_student_middle_name')[0].value;
		let lname = $('#content_student_sur_name')[0].value;
		let dob = $('#content_student_dob')[0].value;
		let pob = $('#content_student_pob')[0].value;
		let addr =$('#content_student_addr')[0].value;

		if(lrn != '' && fname != '' && mname != '' && lname != '' && dob != "" && pob != '' && addr != ''){
			if(lrn.length > 3 && fname.length > 3 && lname.length > 3 && pob.length > 4 && addr.length > 4){
				resolve(true);
			}
			else{
				reject('Some data is too short.')
			}
		}else{
			reject('Please input information needed.');
		}
	});	
}

function fatherNoEmptyFields(){
	return new Promise((resolve,reject) => {
		let name = 	$('#content_father_name')[0].value;
		let occupation = $('#content_father_occupation')[0].value;
		let office = $('#content_father_office')[0].value;
		let contact = $('#content_father_contact')[0].value;

		if(name != '' && occupation != '' && office != '' && contact != ''){
			if(name.length > 6 && occupation.length > 2 && office.length > 2 && contact.length > 2){
				resolve(true);
			}else{
				reject('Some data is too short.')
			}
		}else{
			reject('Please input information needed.');
		}
	});	
}
function motherNoEmptyFields(){
	return new Promise((resolve,reject) => {
		let name = 	$('#content_mother_name')[0].value;
		let occupation = $('#content_mother_occupation')[0].value;
		let office = $('#content_mother_office')[0].value;
		let contact = $('#content_mother_contact')[0].value;

		if(name != '' && occupation != '' && office != '' && contact != ''){
			if(name.length > 6 && occupation.length > 2 && office.length > 2 && contact.length > 2){
				resolve(true);
			}else{
				reject('Some data is too short.')
			}
		}else{
			reject('Please input information needed.');
		}
	});	
}
function guardianNoEmptyFields(){
	return new Promise((resolve,reject) => {
		let name = 	$('#content_guardian_name')[0].value;
		let occupation = $('#content_guardian_occupation')[0].value;
		let office = $('#content_guardian_office')[0].value;
		let contact = $('#content_guardian_contact')[0].value;

		if(name != '' || occupation != '' || office != '' || contact != ''){
			if(name.length > 6 && occupation.length > 2 && office.length > 2 && contact.length > 2){
				resolve(true);
			}else{
				reject('Some data is too short.')
			}
		}else{
			reject('Please input information needed.');
		}
	});	
}

document.getElementById('content_student_lrn').addEventListener('keyup',function(){
	if(allnumericID(this.value[0]) == true && this.value[0] !='-'){
		if(allnumericID(this.value) == false){
			this.value = this.value.slice(0,this.value.length - 1);
		}
	}else{
		this.value = '';
	}
})

document.getElementById('content_student_sur_name').addEventListener('keyup', function() {
	if(allLetter(this.value) == false){
		this.value = this.value.slice(0,this.value.length - 1);
	}
})
document.getElementById('content_student_middle_name').addEventListener('keyup', function() {
	if(allLetter(this.value) == false){
		this.value = "";
	}
})
document.getElementById('content_student_given_name').addEventListener('keyup', function() {
	if(allLetter(this.value) == false){
		this.value = "";
	}
})
document.getElementById('content_student_dob').addEventListener('change',function(){
	let year = this.value.slice(0,4);
	const yearToday = new Date().getFullYear();
	if(year > yearToday - 10){
		this.value = "";
		alert('year must be ' + (Number(year) -10) + ' and below');
	}else if(year < yearToday - 25){
		this.value = "";
		alert('The child must be less than 15 yrs old');
	}else{

	}
})
document.getElementById('content_student_pob').addEventListener('keyup', () => {
	if(allLetter(this.value) == false){
		this.value = "";
	}
})
document.getElementById('content_father_name').addEventListener('keyup',() => {
	if(allLetter(this.value) == false){
		this.value = this.value.slice(0,this.value.length-1);
	}
})
document.getElementById('content_mother_name').addEventListener('keyup',() => {
	if(allLetter(this.value) == false){
		this.value = this.value.slice(0,this.value.length-1);
	}
})
document.getElementById('content_guardian_name').addEventListener('keyup',() => {
	if(allLetter(this.value) == false){
		this.value = this.value.slice(0,this.value.length-1);
	}
})

document.getElementById('content_father_occupation').addEventListener('keyup',() => {
	if(allLetter(this.value) == false){
		this.value = this.value.slice(0,this.value.length-1);
	}
})
document.getElementById('content_mother_occupation').addEventListener('keyup',() => {
	if(allLetter(this.value) == false){
		this.value = this.value.slice(0,this.value.length-1);
	}
})
document.getElementById('content_guardian_occupation').addEventListener('keyup',() => {
	if(allLetter(this.value) == false){
		this.value = this.value.slice(0,this.value.length-1);
	}
})


function allLetter(inputtext){
	var letter = /^[A-Za-z - '']+$/;
	if(inputtext.match(letter)){
		return true;
	}else{
		return false;
	}
}

function allnumericID(inputtext){
	var letter = /^[0-9- -]+$/;
	try{
		if(inputtext.match(letter)){
			return true;
		}else{
			return false;
		}
	}catch(error){

	}
}

///******  ADD GRADE MODULE  *******////
document.getElementById("grade_header_close").addEventListener("click", function(){
	$(".Overlay")[0].style.display = "none";
	$("#grade")[0].style.display = "none";
});

document.getElementById("AddStudentGrade").addEventListener("click", function(){
	$(".Overlay")[0].style.display = "block";
	$("#grade")[0].style.display = "block";
});

///******  STUDENT LIST MODULE  *******////
document.getElementById("student_list_close").addEventListener("click", function(){
	$(".Overlay")[0].style.display = "none";
	$("#student_list")[0].style.display = "none";
});

document.getElementById("StudentList").addEventListener("click", function(){
	$(".Overlay")[0].style.display = "block";
	$("#student_list")[0].style.display = "block";
});

//function to create a profile of student
//the student of profile will be created first followed by the father information, then mother and guardian.
//contact for emergency will be save to student profile so that it will allow user to look who to contact with incase of emergency.
//the creation of the profile may take some time, it depends to the internet speed, a faster internet speed will upload the profile of the student faster.
function studentProfile(){	
	//the data that is specified here is a data use in enrollment form of wmsu elementary department.
	const lrn = $('#content_student_lrn')[0].value;
	const first = $('#content_student_given_name')[0].value;
	const middle = $('#content_student_middle_name')[0].value;
	const last = $('#content_student_sur_name')[0].value;

	const glvl = $('#content_student_grade')[0].value;
	const sex = $('#content-student_sex')[0].value;
	const DoB = $('#content_student_dob')[0].value;
	const PoB = $('#content_student_pob')[0].value;
	const religion = $('#content_student_religion')[0].value;
	const address = $('#content_student_addr')[0].value;
	const name_option = $("#emerg")[0].value;	
	


	const ref = firebase.storage().ref();
	const file = $('#newstudent_content_openfile')[0].files[0];
	const name = new Date() + '-' + file.name;

	const metadata = {
		contentType:file.type
	}

	const task = ref.child(name).put(file,metadata);

	task.then(snapshot => snapshot.ref.getDownloadURL())
	.then(url => {
		db.collection('Students').add({
			LRN : lrn,
			First: first,
			Middle: middle,
			Last: last,
			Grade: glvl,
			Sex: sex,
			Dob: DoB,
			Pob: PoB,
			Religion: religion,
			Adress: address,
			Emergency:name_option,
			Graduate: false,
			MyPicture: url
		})
		.then(function(docRef){
			close();
			alert("Account Successfully saved !");
			studentFather(docRef.id);
			studentMother(docRef.id);
			studentGuardian(docRef.id);
			addDataToHistory(first +' '+ middle +' '+ last,'New Student been added');
			console.log("Document written with ID:" , docRef.id)
			clear();
		})
		.catch(function(error){
			console.error("Error adding document: ", error);
		});
	});

}

function addDataToHistory(name,process_type){
	db.collection('History').add({
		Transaction_Type:process_type,
		Student_Name:name,
		Date: new Date().toString()
	}).then((docRef) => { 
		console.log('Transaction Complete.');
	}).catch((error)=> {
		console.log('Error Generating History: ', error);
	});
}

function close(){
	$("#newstudent")[0].style.display = "none";
	$(".Overlay")[0].style.display = "none";
	$(".content")[0].style.visibility = "visible";
	$(".content_father")[0].style.visibility = "hidden";
	$(".content_mother")[0].style.visibility = "hidden";
	$(".content_guardian")[0].style.visibility = "hidden";
	$(".content_emergency")[0].style.visibility = "hidden";

	//This will set the button to its default look
	$("#Next-info")[0].innerHTML = "Next";
	$("#Next-info")[0].style.background = "#3B86FF";
	indexValue = 0;
}

//this will be called after the student profiled is created.
function studentFather(id){
	const Fname = $('#content_father_name')[0].value;
	const occu = $('#content_father_occupation')[0].value;
	const off= $('#content_father_office')[0].value;
	const cont = $('#content_father_contact')[0].value;

	db.collection('Students').doc(id).collection('RelatedPerson').add({
		relationship: 'Father',
		name: Fname,
		occupation: occu,
		office: off,
		contact: cont
	})
	.then(function(docRef){
		console.log("Document written with ID:" , docRef.id)
	})
	.catch(function(error){
		console.error("Error adding document: ", error);
	});
}
//this will be called after inserting the data of father to its student.
function studentMother(id){
	const Mname = $('#content_mother_name')[0].value;
	const occu = $('#content_mother_occupation')[0].value;
	const off = $('#content_mother_office')[0].value;
	const cont = $('#content_mother_contact')[0].value;

	db.collection('Students').doc(id).collection('RelatedPerson').add({
		relationship: 'Mother',		
		name: Mname,
		occupation: occu,
		office: off,
		contact: cont
	})
	.then(function(docRef){
		console.log("Document written with ID:" , docRef.id)
	})
	.catch(function(error){
		console.error("Error adding document: ", error);
	});
}
//this will be called after inserting the data of mother to its student.
function studentGuardian(id){
	const Gname = $('#content_guardian_name')[0].value;
	const occu = $('#content_guardian_occupation')[0].value;
	const off = $('#content_guardian_office')[0].value;
	const cont = $('#content_guardian_contact')[0].value;


	db.collection('Students').doc(id).collection('RelatedPerson').add({
		relationship: 'Guardian',		
		name: Gname,
		occupation: occu,
		office: off,
		contact: cont
	})
	.then(function(docRef){
		console.log("Document written with ID:" , docRef.id)
	})
	.catch(function(error){
		console.error("Error adding document: ", error);
	});
}

//this will allow user to select a profile picture of the student in its device.
document.getElementById('newstudent_content_openfile').addEventListener('change',function(){
	//read file : select student profile and display.
	//after selecting a profile picture for the student this will generate to display it to an image element('img') 
	const img = document.querySelector('#newstudent_content_picture');
	const file = this.files[0];

	if(file){
		const reader = new FileReader();

		reader.addEventListener('load',function(){
		    img.setAttribute('src',this.result)
		});

	reader.readAsDataURL(file);
	} 
});

function recordlist(doc){
	var record = document.querySelector('.main_left_student_record');
	
	let li = document.createElement('li');
	let img = document.createElement('img');
	let name = document.createElement('h3');
	let lrndata = document.createElement('span');
	let edit = document.createElement('i');

	li.setAttribute('data-id',doc.id);
	img.setAttribute('src',doc.data().MyPicture);
	name.textContent = doc.data().First + ' ' + doc.data().Middle + ' ' + doc.data().Last;
	lrndata.textContent = 'LRN : ' + doc.data().LRN;
	edit.setAttribute('class','fas fa-edit');

	li.appendChild(img);
	li.appendChild(name);
	li.appendChild(lrndata);
	li.appendChild(edit); 
	record.appendChild(li);

	edit.addEventListener('click',(e) =>{
		e.preventDefault();
		$('#profile_grade_level')[0].removeAttribute('disabled');
		cleanTable();
		let stud_name = $('#profile_student_name')[0];
		let id = e.target.parentElement.getAttribute('data-id');
		stud_name.value = name.textContent;
		stud_name.setAttribute('data-id',id);
		myRecord(id);
		if($('#grade_control_newRecord')[0].style.background == 'green'){
			$('#grade_control_newRecord')[0].style.background = '#3B86FF';
		}
	});

}

function myRecord(id){
	if($('#profile_grade_level')[0].length != 0){
		const x = $('#profiel_grade_level')[0].length;

		for( i = 0 ; i < x ; i ++ ){
			$('#profile_grade_level')[0].remove(0);
		}
	}

    db.collection('Students').doc(id).collection('Grade').orderBy('grade_Level','desc').get().then((snapshot) => {
		snapshot.docs.forEach(doc =>{
			let option = document.createElement('option');
			option.textContent = doc.data().grade_Level;
			$('#profile_grade_level')[0].appendChild(option);
		})

		if($('#profile_grade_level')[0].length == 0){
			$('#newRecord')[0].style.background = 'green';
		}
		else{
			retrieveListOfStudentSubject();
		}
	}, error => {
		console.error('Error at getting student grades :',error);
	})
}

//Information of the parameter 'doc' can be found at line #301-309
function DisplayStudent(doc){
	//Retrieve a record of student in the database and display in 'Student List'
	//Retrieve the holder of the list which is a element('ul') that has class name of 'list-of'
	//element can be found at list-Container -> list-content -> student-list -> records
	var studentList = document.querySelector('.profile_record_list');
	
	//Create the needed element to append to list.
	let li = document.createElement('li');
	let img = document.createElement('img');
	let name = document.createElement('h4');
	let lrndata = document.createElement('span');
	let mygradesData = document.createElement('span');
	let edit = document.createElement('i');

	//Set the Appropriate Attributes for the element needed in the list
	//Some of the Attributes are unique, like Profile picture of the student, name of the student, Lrn and doc.id
	//doc.id is a Unique ID (' Primary key ') in the database that holds the data of the student 
	li.setAttribute('data-id',doc.id);
	img.setAttribute('src',doc.data().MyPicture);
	name.textContent = doc.data().First + ' ' + doc.data().Middle + ' ' + doc.data().Last;
	lrndata.textContent = 'LRN : ' + doc.data().LRN;
	lrndata.setAttribute('id','span-lrn');
	mygradesData.textContent = 'My grades';
	mygradesData.setAttribute('id','span-grades')
	edit.setAttribute('class','fas fa-edit');

	//Append elements to list('li')
	//the ('li') has a horizontal display , append an element starting from left to right
	//the img or Profile picture of the student is in the left side of the list that's why the img is the first element to append to list('li')
	li.appendChild(img);
	li.appendChild(name);
	li.appendChild(lrndata);
	li.appendChild(mygradesData);
	li.appendChild(edit); 

	//finnally append the list('li') to its holder('ul')
	//the design of the list has already been created, only the creation of the elements are needed
	studentList.appendChild(li);

	edit.addEventListener('click', (e) => {
		e.stopPropagation();
		let id = e.target.parentElement.getAttribute('data-id');
		viewProfile(id);
	});

	mygradesData.addEventListener('click',(e) =>{
		e.preventDefault();
		alert('This feature is under progress');
		// $('.list-Container')[0].style.display = 'none';
		// $('.Overlay')[0].style.display = 'block';
		// $('.myGrades')[0].style.display = 'block';
	});
}

//retrieve the list of student in the database('firebase:cloud firestore')
//the result of this function will send to function "DisplayStudent" as a parameter of it.
//the called function will do its work and diplay the colledted data.
function getData(){
		if(auth.currentUser){
			db.collection('Students').where('Graduate',"==",false).onSnapshot((snapshot)=>{
					let changes = snapshot.docChanges();
					changes.forEach(change =>{
						if(changes.type == 'Create'){
							DisplayStudent(change.doc);
							recordlist(change.doc);
							alert('Account has been added.');
						}else if(changes.type=='Update'){
							alert('Account has been update.');
						}else if(changes.type=='Remove'){
							alert('Account has been remove.');
						}else{
							DisplayStudent(change.doc);
							recordlist(change.doc);
						}
					})
			});
		}
}
//this function will execute after a user create the profile of the student
//it is important for this to execute to allow the user to create another student profile with ease
function clear(){
	//this will erase the student data inputed
	$('#content_student_lrn')[0].value ="";
	$('#content_student_given_name')[0].value ="";;
	$('#content_student_middle_name')[0].value ="";
	$('#content_student_sur_name')[0].value ="";

	$('#content_student_grade')[0].value ="";
	$('#content_student_sex')[0].value ="";
	$('#content_student_dob')[0].value ="";
	$('#content_student_pob')[0].value ="";
	$('#content_student_religion')[0].value ="";
	$('#content_student_addr')[0].value ="";

	//this will erase the data of the parent('father') of the student
	$('#content_father_name')[0].value ="";
	$('#content_father_occupation')[0].value ="";
	$('#content_father_office')[0].value ="";
	$('#content_father_contact')[0].value ="";

	//this will erase the data of the parent('mother') of the student
	$('#content_mother_name')[0].value ="";
	$('#content_mother_occupation')[0].value ="";
	$('#content_mother_office')[0].value ="";
	$('#content_mother_contact')[0].value ="";

	//this will erase the data of the person('Guardian') related to the student
	$('#content_guardian_name')[0].value ="";
	$('#content_guardian_occupation')[0].value ="";
	$('#content_guardian_office')[0].value ="";
	$('#content_guardian_contact')[0].value ="";

	//this will set the profile to default
	var img = $('#newstudent_content_picture')[0];
	img.src = 'profile/avatar-icon.png';
	$('#newstudent_content_openfile')[0].value = "";
}
document.getElementById('profile_header_close').addEventListener('click',function(){
	$('.profile')[0].style.display='none';
	$('.student_list')[0].style.display='block';
});

//Retrieve the actual record of the student
function viewProfile(id){
	if(auth.currentUser){
		db.collection('Students').doc(id).get().then((snapshot) => {
	
				var im = $('#profile_header_picture')[0];
				im.setAttribute('src',snapshot.data().MyPicture);
				im.setAttribute('data-id',id);
				$('#profile_student_lrn')[0].value = snapshot.data().LRN;
				$('#profile_student_name')[0].value = snapshot.data().First + ' ' + snapshot.data().Middle + ' ' + snapshot.data().Last;
				$('#profile_student_grade')[0].value = snapshot.data().Grade;
				$('#profile_student_sex')[0].value = snapshot.data().Sex;
				$('#profile_student_religion')[0].value = snapshot.data().Religion;
				$('#profile_student_dob')[0].value = snapshot.data().Dob;
				$('#profile_student_pob')[0].value = snapshot.data().Pob;
				$('#profile_student_address')[0].value = snapshot.data().Adress;
				$('#profile_student_emergency')[0].value = snapshot.data().Emergency;
	
				retrieveRelatedPerson(id);
			}
		)
	}
}
// Retrieve information of parents and guardian
function retrieveRelatedPerson(id){

	db.collection('Students').doc(id).collection('RelatedPerson').get().then((querySnapshot) => {
		querySnapshot.forEach(doc => {
			if(doc.data().relationship == 'Father'){
				$('#profile_father_name')[0].value = doc.data().name;
				$('#profile_father_occupation')[0].value = doc.data().occupation;
				$('#profile_father_office')[0].value = doc.data().office;
				$('#profile_father_contact')[0].value = doc.data().contact;

			}else if(doc.data().relationship == 'Mother'){
				$('#profile_mother_name')[0].value = doc.data().name;
				$('#profile_mother_occupation')[0].value = doc.data().occupation;
				$('#profile_mother_office')[0].value = doc.data().office;
				$('#profile_mother_contact')[0].value = doc.data().contact;

			}else if(doc.data().relationship == 'Guardian'){
				$('#profile_guardian_name')[0].value = doc.data().name;
				$('#profile_guardian_occupation')[0].value = doc.data().occupation;
				$('#profile_guardian_office')[0].value = doc.data().office;
				$('#profile_guardian_contact')[0].value = doc.data().contact;
			}else{

			}
		});
	});
	$('.student_list')[0].style.display='none';
	$('.myProfile')[0].style.display = 'block';
}
//this will generate if the user select other option in grade level.
document.getElementById('profile_grade_level').addEventListener('change',() => {
	cleanTable();
	retrieveListOfStudentSubject(); 
})

//this get the subjects of the student base on what grade level selected. 'Student Module'
function retrieveListOfStudentSubject(){
	let choice = $('#profile_grade_level')[0].value;
	let id = $('#profile_student_name')[0].getAttribute('data-id');
	let glvl = $('#profile_grade_level')[0].value;


	db.collection('Students').doc(id).collection('Grade').where('grade_Level','==',glvl).onSnapshot( snapshot => {
			let changes = snapshot.docChanges();
			changes.forEach(change => {
				$('#register_profile_grades')[0].setAttribute('data-id',change.doc.id);
				getMySubjects(change.doc);
		
				setTimeout(() => {
					const card = $('#register_profile_grades')[0];
					let tr = document.createElement('tr');
					let subjectname = document.createElement('td');
						subjectname.textContent = "General Percent Average";
						subjectname.setAttribute('colspan',5);
					let tdf = document.createElement('td');
					let tdr = document.createElement('td');
						tdf.textContent = change.doc.data().GPA;
						tdr.textContent = change.doc.data().Remarks;
						tr.appendChild(subjectname);
						tr.appendChild(tdf);
						tr.appendChild(tdr);
						card.appendChild(tr);
					},600);
		})
	});
}
//this will get the subject of the student that is save to its records.
function getMySubjects(doc){
		let id = $('#profile_student_name')[0].getAttribute('data-id');
		$('#register_profile_grades')[0].setAttribute('data-id',doc.id);

		db.collection('Students').doc(id).collection('Grade').doc(doc.id).collection('MySubject').get().then(snapshot => {
			snapshot.docs.forEach( doc =>{
					DisplayMySubjects(doc);
			})
		})
}
//this will display the subject of the student in the table.
function DisplayMySubjects(doc){
	const myTable = $('#register_profile_grades')[0];
	
	const tr = document.createElement('tr');
	const td_desc = document.createElement('td');
	const td1 = document.createElement('td');
	const td2 = document.createElement('td');
	const td3 = document.createElement('td');
	const td4 = document.createElement('td');
	const tdfinal = document.createElement('td');
	const tdremarks = document.createElement('td');


	tr.setAttribute('data-id',doc.id);
	td_desc.textContent = doc.data().subject_desc;
	td1.textContent = doc.data().first_quarter;
	td2.textContent = doc.data().second_quarter;
	td3.textContent = doc.data().third_quarter;
	td4.textContent = doc.data().fourth_quarter;
	tdfinal.textContent = doc.data().final_grade;
	tdremarks.textContent = doc.data().Remarks;

	tr.appendChild(td_desc);
	tr.appendChild(td1);
	tr.appendChild(td2);
	tr.appendChild(td3);
	tr.appendChild(td4);
	tr.appendChild(tdfinal);
	tr.appendChild(tdremarks);
	myTable.appendChild(tr);
}

//this get the subject list in the database. 'Subject Module'
function retrieveListofSubject(){
	let choice = $('#profile_grade_level')[0].value;
	db.collection('Subject').where('subject_glevel','==', choice).onSnapshot(snapshot => {
		let changes = snapshot.docChanges();
		changes.forEach(change =>{
			DisplayListofSubject(change.doc);
		})
	})

	return new Promise(resolve => {
		setTimeout(() => {
			resolve('resolve');
		},1001);
	})
}
//this will dispaly the subject on the table.
function DisplayListofSubject(doc){
	const card = $('#register_profile_grades')[0];
	let tr = document.createElement('tr');
	let subjectname = document.createElement('td');
	subjectname.textContent = doc.data().subject_desc;
	tr.appendChild(subjectname);

	for(i = 0 ; i<6 ; i++){
		let td = document.createElement('td');
		if( i >= 0 && i <4 ){
			td.setAttribute('contenteditable',true);
		}
		tr.appendChild(td);	


		td.addEventListener('keyup',(e) => {
			e.preventDefault();
			if(allnumeric(e.target.textContent)){
				if(e.target.innerHTML <= 100 && e.target.innerHTML >= 65 || e.target.innerHTML == 10){
					getValueAtCells(e);

				}else{
					if(e.target.innerHTML >9 && e.target.innerHTML < 65 || e.target.innerHTML > 100 || e.target.innerHTML < 0){
						e.target.innerHTML = "";
					}
				}

				
			}else{
				e.target.textContent = "";
			}
		});
	}
	card.appendChild(tr);
}

function allnumeric(inputtext){
	var numbers = /^[0-9]+$/;
	if(inputtext.match(numbers)){
		return true;
	}else{
		return false;
	}
}

function getValueAtCells(e){
	let x = $('#register_profile_grades')[0];
	let i = e.target.parentElement.rowIndex;
	let subCells = x.rows.item(i).cells;

	if(subCells.item(1).innerHTML != "" && subCells.item(2).innerHTML != "" && subCells.item(3).innerHTML != "" && subCells.item(4).innerHTML != "" ){
		const fi = parseInt(subCells.item(1).textContent);
		const se = parseInt(subCells.item(2).textContent);
		const th = parseInt(subCells.item(3).textContent);
		const fo = parseInt(subCells.item(4).textContent);
		const finalgrade = getfinal(fi,se,th,fo);
		subCells.item(5).textContent = finalgrade;

		if(finalgrade >=75){
			subCells.item(6).textContent = 'PASSED';
		}
		else{
			subCells.item(6).textContent = 'FAILED';
		}
			let indexRow = $('#register_profile_grades tr').length-1;

			let subs = x.rows.item( indexRow ).cells;
			const sum = getGPA();

			if(Number.isNaN(sum) == false){

				const gpa = parseFloat(sum / (x.rows.length - 3)).toFixed(2);

				if(gpa % 1 == 0){
					subs.item(1).textContent = parseInt(gpa);
				}
				else{
					subs.item(1).textContent = gpa;
				}

				if(gpa >=75){
					subs.item(2).textContent = 'PASSED';
				}
				else{
					subs.item(2).textContent = 'FAILED';
				}
			}
		
	}
}

//get the gpa of overall grades
function getGPA(){
	const rowIndex = $('#register_profile_grades')[0];
	let gpa = 0;
		for( i = 2 ; i < rowIndex.rows.length-1 ; i ++){
			let subCells = rowIndex.rows.item(i).cells;
				gpa += parseFloat(subCells.item(5).textContent);
		}
	return gpa;
}

function getfinal(fi,se,th,fo){
	return parseFloat((fi + se + th + fo ) / 4);
}
//this will remove the subjects in the table.
function cleanTable(){
	let x = $('#register_profile_grades tr').length;
	if(x>2){
		for(i=2 ; i<x ; i++){
			$('#register_profile_grades')[0].deleteRow(2);
		}
	}
}

//this will call the function to save the new record.
document.getElementById('grade_control_saveGrade').addEventListener('click', () => {
	//save grades with subject.
	let id = $('#profile_student_name')[0].getAttribute('data-id');
	recordsByGradeLevel(id);
	removeEditable();
	updateStatus = false;
})

//this will save the new record if new record is created.
function recordsByGradeLevel(id){
	const l = $('#register_profile_grades tr').length-1;
	const x = $('#register_profile_grades')[0];
	let subCells =x.rows.item(l).cells;

	db.collection('Students').doc(id).collection('Grade').add({
		grade_Level:$('#profile_grade_level')[0].value,
		GPA:subCells.item(1).textContent,
		Remarks:subCells.item(2).textContent
	}).then(docRef => {
		addSubjectToThisRecord(docRef);
		console.log("New records has been added with an ID :",docRef.id);
		if(updateStatus == false){
			$('#profile_grade_level')[0].removeAttribute('disabled');
			console.log('New Record has been saved !');
		}
		addDataToHistory($('#profile_student_name')[0].value,'New Record been added')
	}).catch( (error) => {
		console.error('Error Adding document:',error);
	});
}

//this will save the list of subject under the grade record.
//means that the subject will be save base on which grade level do belong.
function addSubjectToThisRecord(doc){

	const x = $('#register_profile_grades')[0];
	let id = $('#profile_student_name')[0].getAttribute('data-id');

	for( i = 2 ; i < x.rows.length-1 ; i++ ){
		var subCells =x.rows.item(i).cells;

		db.collection('Students').doc(id).collection('Grade').doc(doc.id).collection('MySubject').add({
			subject_desc:subCells.item(0).textContent,
			first_quarter:subCells.item(1).textContent,
			second_quarter:subCells.item(2).textContent,
			third_quarter:subCells.item(3).textContent,
			fourth_quarter:subCells.item(4).textContent,
			final_grade:subCells.item(5).textContent,
			Remarks: subCells.item(6).textContent
		}).then(docRef => {
			console.log('New Subject is been added with ID:',docRef.id);
		}).catch(error => {
			console.error('Error Adding document:',error);
		});
	}
}

//this will popup the modal to allow the user to create a new record.
document.getElementById('grade_control_newRecord').addEventListener('click', (e) => {
	e.preventDefault();
	let x = $('#profile_student_name')[0].getAttribute('data-id');
	if( x == null)
	{
		alert('Please select an profile first');
	}else{
		const index = $('#student_grade_level')[0].length;
		if(index <6 ){
			$('#addRecord_newrecord')[0].value =  (index + 1);
			$('#grade_addRecord')[0].style.display = 'block';
		}else{
			alert('You reach the maximum grade level');
		}
	}
})
//this will will allow the user to update the subjects grades in the table
document.getElementById('grade_control_updateRecord').addEventListener('click',(e) => {
	e.preventDefault();
	if($('#grade_control_updateRecord')[0].textContent == "Edit"){
		let x = $('#register_profile_grades')[0];
		for( i = 2 ; i < x.rows.length - 1 ; i++ ){
			let subCells = x.rows.item(i).cells;

			for( j = 1 ; j < 5 ; j++ ){
				subCells.item(j).setAttribute('contenteditable',true);
				subCells.item(j).addEventListener('keyup',(e) => {
					e.preventDefault();
					if(e.target.innerHTML <= 100 && e.target.innerHTML >= 65 || e.target.innerHTML == 10){
						getValueAtCells(e);
					}else{
						if(e.target.innerHTML >9 && e.target.innerHTML < 65 || e.target.innerHTML > 100 || e.target.innerHTML < 0){
							e.target.innerHTML = "";
						}
					}
				});
			}

			if( i == (x.rows.length - 2)){
				$('#grade_control_updateRecord')[0].textContent = 'Update';
				$('#grade_control_updateRecord')[0].style.background = 'green';
			}
		}
	}
	else{
		updateStatus = true;
			let card = $('#register_profile_grades')[0].getAttribute('data-id');

			const x = $('#register_profile_grades')[0];
			let id = $('#profile_student_name')[0].getAttribute('data-id');


			for( i = 2 ; i < x.rows.length - 1 ; i++ ){
				var subCells =x.rows.item(i).cells;
				var subject_ID = x.rows.item(i).getAttribute('data-id');
				console.log(subject_ID);

				db.collection('Students').doc(id).collection('Grade').doc(card).collection('MySubject').doc(subject_ID).set({
					subject_desc:subCells.item(0).innerHTML,
					first_quarter:subCells.item(1).innerHTML,
					second_quarter:subCells.item(2).innerHTML,
					third_quarter:subCells.item(3).innerHTML,
					fourth_quarter:subCells.item(4).innerHTML,
					final_grade:subCells.item(5).innerHTML,
					Remarks: subCells.item(6).innerHTML
				}).then(docRef => {
					console.log('Subject has been updated with ID:',subject_ID);
				}).catch(error => {
					console.error('Error Adding document:',error);
				});
			}

			setGrade();
			cleanTable();
			$('#grade_control_updateRecord')[0].textContent = 'Edit';
			$('#grade_control_updateRecord')[0].style.background = '#3B86FF';
	}
})

function setGrade(){
	const x = $('#register_profile_grades')[0];
	let card = $('#register_profile_grades')[0].getAttribute('data-id');
	let id = $('#profile_student_name')[0].getAttribute('data-id');

	const length = $('#register_student_grades tr').length-1;
	let card_cells =x.rows.item(length).cells;

	db.collection('Students').doc(id).collection('Grade').doc(card).set({
		GPA:card_cells.item(1).textContent,
		Remarks:card_cells.item(2).textContent,
		grade_Level:$('#profile_grade_level')[0].value
	}).then(docRef =>{
		addDataToHistory($('#profile_student_name')[0].value,'Update Record');
		console.log('grade been updated. ');
	}).catch(error =>{
		console.error('Error updating grades ',error)
	});
}
//after updating the grades this function will be called to make grades un editable.
function removeEditable(){
	let x = $('#register_student_grades')[0];

		for( i = 2 ; i < x.rows.length - 1 ; i++ ){
			let subCells = x.rows.item(i).cells;

			subCells.item(1).setAttribute('contenteditable',false);
			subCells.item(2).setAttribute('contenteditable',false);
			subCells.item(3).setAttribute('contenteditable',false);
			subCells.item(4).setAttribute('contenteditable',false);

			if( i == (x.rows.length - 1)){
				$('#updateRecord')[0].textContent = 'Update';
				$('#updateRecord')[0].style.background = 'green';
			}
		}
}

//this will create a new record.
document.getElementById('addRecord_addNewRecord').addEventListener('click',(e) => {
	e.preventDefault();
	let option = document.createElement('option');
	option.textContent = $('#addRecord_newRecord')[0].value;
	const ind = $('#profile_grade_level')[0].length;
	$('#profile_grade_level')[0].add(option,$('profile_grade_level')[0]);
	$('#profile_grade_level')[0].options[ind].selected = ind;
	$('#profile_grade_level')[0].setAttribute('disabled',true);
	cleanTable();
	getSubjects();

	$('#addRecord_newRecord')[0].value = '';
	e.target.parentElement.style.display = 'none';

	if($('#grade_control_newRecord')[0].style.background == 'green'){
		$('#grade_control_newRecord')[0].style.background = '#3B86FF';
	}
})
//this will be use to display the last row of the table;
async function getSubjects(){
	const result = await retrieveListofSubject();

	if(result == 'resolve'){
		const card = $('#register_profile_grades')[0];
		let tr = document.createElement('tr');
		let subjectname = document.createElement('td');
		subjectname.textContent = "General Percent Average";
		subjectname.setAttribute('colspan',5);
		let tdf = document.createElement('td');
		let tdr = document.createElement('td');
		tr.appendChild(subjectname);
		tr.appendChild(tdf);
		tr.appendChild(tdr);
		card.appendChild(tr);
	}
}

document.getElementById('addRecord_cancelNewRecord').addEventListener('click',(e) =>{
	e.preventDefault();
	e.target.parentElement.style.display = 'none';
})

document.getElementById('close-forms').addEventListener('click',(e)=>{
	e.preventDefault();
	//$('.myGrades')[0].style.display='none';
	//$('.list-Container')[0].style.display = 'block';
})

document.getElementById('profile_delete').addEventListener('click', (e) =>{
	e.preventDefault();
	$('.profile_modal_overlay')[0].style.display ='block';
	$('.profile_modal_delete')[0].style.display='block';
})
document.getElementById('profile_modal_Cancel').addEventListener('click', (e) =>{
	e.preventDefault();
	$('.profile_modal_overlay')[0].style.display ='none';
	$('.profile-modal-delete')[0].style.display='none';
})
document.getElementById('profile_modal_Continue').addEventListener('click', (e) =>{
	e.preventDefault();
	let teacher_id=$('#teacher-id')[0].value;
	if(teacher_id == '2014-01942'){
		$('.Modal-Delete-Overlay')[0].style.display ='none';
		$('.Modal-Delete-Profile')[0].style.display='none';
	}
})
document.getElementById('profile_archive').addEventListener('click',(e) =>{
	e.preventDefault();
	let myID = $('#profile_header_picture')[0].getAttribute('data-id');

	db.collection('Student').doc(id).set({
		Graduate:true
	}).then((docRef)=>{
		console.log('Data Updated with ID: ',error);
	}).catch(error => {
		console.error('Error at line 1200' , error);
	});
})

db.collection('History').orderBy('Date','desc').onSnapshot((snapshot) =>{
	let changes = snapshot.docChanges();
	if(auth.currentUser){
		changes.forEach(change =>{
			userHistoryTransaction(change.doc);
		});
	}
})
function userHistoryTransaction(doc){
	const timeline_list = $('#history_list')[0];

	let li = document.createElement('li');
	let br1 = document.createElement('br');
	let br2 = document.createElement('br');
	let span1 = document.createElement('span');
	let span2 = document.createElement('span');
	let span3 = document.createElement('span');

	span1.setAttribute('id','comment');
	span2.setAttribute('id','userN');
	span3.setAttribute('id','timestamp-detail');
	span1.textContent = doc.data().Transaction_Type;
	span2.textContent = doc.data().Student_Name;
	span3.textContent = doc.data().Date.slice(0,24);

	li.appendChild(span1);
	li.appendChild(br1);
	li.appendChild(span2);
	li.appendChild(br2);
	li.appendChild(span3);

	timeline_list.appendChild(li);
}
document.getElementById('profile_edit').addEventListener('click',(e)=>{
	e.preventDefault();
	alert('This feature is under construction.');
})

	//On right side Grade-level should display the Grade level of students this are present record and previous record
	//on creating a new record the system should check first the record(grade level) he/she wants to create ,
	//checking process is the selected grade level will be compare if it is register to a student record by grade level(selectlevel)
	//simple checklist but promising.