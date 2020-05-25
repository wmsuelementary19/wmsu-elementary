// Initialize Cloud Firestore through Firebase
const db = firebase.firestore();
let auth = firebase.auth();

function setUser(){
	auth = JSON.parse(sessionStorage.getItem('UID'));
	try {	
		let user = auth.currentUser;

		db.collection('User').doc(user.uid).get().then((snapshot) =>{

				$('#header_account_data')[0].textContent = snapshot.data().User_name;
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
		console.error(error);
	}
}	


google.charts.load('current',{packages:['corechart']});
google.charts.setOnLoadCallback(drawCurveChart);


function drawCurveChart(){
	var data = google.visualization.arrayToDataTable([
		['Year','Graduates','Non-Graduates'],
		['2004',0,0],
		['2005',200,50],
		['2006',150,50],
		['2007',290,20],
		['2008',120,30],
		['2009',140,20],
		['2010',170,30],
		['2011',130,80],
		['2012',160,70],
		['2013',180,10]
	]);

	var curve_options={
		title: '',
		curveType: 'function',
		legend:{position:'bottom'}
	};

	var curvechart = new google.visualization.LineChart(document.getElementById('curve_chart'));
	curvechart.draw(data,curve_options);
}

document.getElementById("userModule_header_close").addEventListener("click",function(){
	$("#userModule")[0].style.display = "none";
	$(".Overlay")[0].style.display = "none";
	index = 0;
});

document.getElementById("NewUser").addEventListener("click",function(){
	$(".Overlay")[0].style.display = "block";
	$("#userModule")[0].style.display = "block";
});

///******  SUBJECT MODULE  *******////
document.getElementById("close-subject").addEventListener("click", function(){
	$(".Overlay")[0].style.display = "none";
	document.querySelector(".subject-Container").style.display = "none";
});

document.getElementById("Subject").addEventListener("click", function(){
	$(".Overlay")[0].style.display = "block";
	document.querySelector(".subject-Container").style.display = "block";
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

///******  ALUMNI LIST MODULE  *******////
document.getElementById("close-alumni").addEventListener("click", function(){
	$(".Overlay")[0].style.display = "none";
	$(".alumni-Container")[0].style.display = "none";
});

document.getElementById("Alumni").addEventListener("click", function(){
	$(".Overlay")[0].style.display = "block";
	$(".alumni-Container")[0].style.display = "block";
});

///******  NOTIFICATION LIST MODULE  *******////
document.getElementById("close-notification").addEventListener("click", function(){
	$(".Overlay")[0].style.display = "none";
	$(".notification-Container")[0].style.display = "none";
});

document.getElementById("notification-record").addEventListener("click", function(){
	$(".Overlay")[0].style.display = "block";
	$(".notification-Container")[0].style.display = "block";
});

const list = $(".list-of-subject")[0];

document.getElementById('save').addEventListener('click',(e)=>{
	if(e.target.textContent == 'Save'){
		storeSubject();
	}else if(e.target.textContent == 'Update'){
		updateSubject();
	}
})
function storeSubject(){
		const sub_id = $("#subject-ID")[0].value;
		const sub_name = $("#sub-name")[0].value;
		const sub_desc = $("#sub-desc")[0].value;
		const sub_glvl = $('#subjectGradeLevel')[0].value;
		
		db.collection("Subject").add({
		    subject_id: sub_id,
		    subject_name: sub_name,
		    subject_desc: sub_desc,
		    subject_glevel:sub_glvl,
		    Active:true
		})
		.then(function(docRef) {
			clearText();
			alert("Subject Saved !");
	    	console.log("Document written with ID: ", docRef.id);
		})
		.catch(error => {
			console.error('Something happen', error);
		})
}
function updateSubject(){
	const sid = $('#subject-ID')[0].getAttribute('data-id');
	
	const sub_id = $("#subject-ID")[0].value;
	const sub_name = $("#sub-name")[0].value;
	const sub_desc = $("#sub-desc")[0].value;
	const sub_glvl = $('#subjectGradeLevel')[0].value;
	
	db.collection("Subject").doc(sid).set({
		subject_id: sub_id,
		subject_name: sub_name,
		subject_desc: sub_desc,
		subject_glevel:sub_glvl,
		Active:true
	})
	.then(function() {
		clearText();
		alert("Subject has been Updated !");
	})
	.catch(error => {
		console.error('Something happen', error);
	})
}

document.getElementById("clear").addEventListener('click',function(){
	clearText();
});


function clearText(){
	$('#subject-ID')[0].value = "";
	$('#sub-name')[0].value = "";
	$('#sub-desc')[0].value = "";
	$('#subjectGradeLevel')[0].selectedIndex = 0;
}
function DisplaySubject(doc){
				let li = document.createElement('li');
				let name = document.createElement('span');
				let edit = document.createElement('i');
				let btn = document.createElement('button');
				let btndelete = document.createElement('i');

				li.setAttribute('data-id',doc.id);
				edit.setAttribute('class','fas fa-edit');
				edit.setAttribute('id','edit');
				btn.setAttribute('id','delete');
				btndelete.setAttribute('class','fas fa-times');
				btn.appendChild(btndelete);
				name.textContent = doc.data().subject_desc;

				li.appendChild(name);
				li.appendChild(edit);
				li.appendChild(btn);

				list.appendChild(li);

}

db.collection('Subject').onSnapshot((snapshot)=>{
		let changes = snapshot.docChanges();
		changes.forEach(change =>{

			if(change.type == "added"){
				DisplaySubject(change.doc);
			}else if(change.type == 'modified'){

			}
		})
});

document.getElementById('list_of_subject').addEventListener('click',(e)=>{
	if(e.target.className.slice(7,11)=='edit'){
		//This function will be use to allow user to edit subject.
		const id = e.target.parentElement.getAttribute('data-id');

		db.collection('Subject').doc(id).get().then(doc =>{
			$('#subject-ID')[0].setAttribute('data-id',doc.id);
			$('#subject-ID')[0].value = doc.data().subject_id;
			$('#sub-name')[0].value = doc.data().subject_name;
			$('#sub-desc')[0].value = doc.data().subject_desc;
			$('#subjectGradeLevel')[0].value = doc.data().subject_glevel;
		});
		$('#save')[0].textContent = 'Update';
	}else if(e.target.className.slice(7,12)=='delete'){
		//This function will be use to allow user to delete subject.
		const id = e.target.parentElement.getAttribute('data-id');
		db.collection('Subject').doc(id).remove;
	}
})

document.getElementById('profile_header_close').addEventListener('click',function(){
	$('.profile')[0].style.display='none';
	$('#student_list')[0].style.display='block';
});

function DisplayStudent(doc){
	var studentList = $('.profile_record_list')[0];
				
	let li = document.createElement('li');
	let img = document.createElement('img');
	let name = document.createElement('h4');
	let lrndata = document.createElement('span');
	let edit = document.createElement('i');

	li.setAttribute('data-id',doc.id);
	img.setAttribute('src',doc.data().MyPicture);
	name.textContent = doc.data().First + ' ' + doc.data().Middle + ' ' + doc.data().Last;
	lrndata.textContent = 'LRN : ' + doc.data().LRN;
	lrndata.setAttribute('id','span-lrn');
	edit.setAttribute('class','fas fa-edit');

	li.appendChild(img);
	li.appendChild(name);
	li.appendChild(lrndata);
	li.appendChild(edit); 
	studentList.appendChild(li);


	edit.addEventListener('click', (e) => {
		e.stopPropagation();
		let id = e.target.parentElement.getAttribute('data-id');
		viewProfile(id);
	});
}

db.collection('Students').where("Graduate","==",false).onSnapshot((snapshot)=>{
		let changes = snapshot.docChanges();
		changes.forEach(change =>{
			DisplayStudent(change.doc);
		})
});

function DisplayGraduates(doc){
	var studentList = $('.list-of-alumnis')[0];
				
	let li = document.createElement('li');
	let img = document.createElement('img');
	let name = document.createElement('h4');
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
	studentList.appendChild(li);


	img.addEventListener('click', (e) => {
		e.stopPropagation();
		let id = e.target.parentElement.getAttribute('data-id');
		viewProfile(id);
	});
}

db.collection('Students').where("Graduate","==",true).onSnapshot((snapshot) => {
	let changes = snapshot.docChanges();
	changes.forEach(change => {
		DisplayGraduates(change.doc);
	})
});

// Retrieve the actual record of the student
// set to comment for testing only

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
	$('#student_list')[0].style.display='none';
	$('.profile')[0].style.display = 'block';
}

//this will allow user to select a profile picture of the student in its device.
document.getElementById('select_profile_picture').addEventListener('change',function(){
	//read file : select student profile and display.
	//after selecting a profile picture for the student this will generate to display it to an image element('img') 
	const img = $('#user_profile_picture')[0];
	const file = this.files[0];

	if(file){
		const reader = new FileReader();

		reader.addEventListener('load',function(){
		    img.setAttribute('src',this.result)
		});

		reader.readAsDataURL(file);
	} 
});

document.getElementById('userModule_Save_button').addEventListener('click',() => {
	console.log();
	if($('#userModule_Save_button')[0].textContent == 'SAVE'){
		createNewUserAccount();
	}else{
		updateUserAccount();
	}
});

function createNewUserAccount(){			
	// Add a second document with a generated ID.
	let newAuth = firebase.auth();
	const id = $("#userModule_input_userID")[0].value;
	const name = $("#userModule_input_name")[0].value;

	let userType = null;
		if($('#userModule_select_userType')[0].value == 'ADMIN'){
			userType = true;
		}else{
			userType = false;
		}

	let section = null;

		if(userType){
			section = 'NONE';
		}else{
			section = $('#userModule_input_section')[0].value;
		}
		
	const email = $('#userModule_input_email')[0].value;
	const password = $('#userModule_input_password')[0].value;

	const ref = firebase.storage().ref();


	newAuth.createUserWithEmailAndPassword(email,password).then(cred => {

		const newFiles = $('#select_profile_picture')[0].files[0];
		const timesave = new Date() + '-' + newFiles.name;
		const metadata = {
			contentType:newFiles.type
		}

		const task = ref.child(timesave).put(newFiles,metadata);

		task.then(snapshot => snapshot.ref.getDownloadURL())
			.then(url => {
				return db.collection('User').doc(cred.user.uid).set({
					User_ID:id,
					User_name:name,
					User_section:section,
					User_Type:userType,
					Image:url
				})
			})
		}).then(() => {
			clearUserDetails();
			console.log('New user is created');
	});
}
function updateUserAccount(){
	// Update account of the selected user.
	const uid = $('#user_profile_picture')[0].getAttribute('data-id');
	const id = $("#userModule_input_userID")[0].value;
	const name = $("#userModule_input_name")[0].value;
	let userType = null;
		if($('#userModule_select_userType')[0].value == 'ADMIN'){
			userType = true;
		}else{
			userType = false;
		}

	let section = null;

		if(userType){
			section = 'NONE';
		}else{
			section = $('#userModule_input_section')[0].value;
		}

	const url = $('#user_profile_picture')[0].getAttribute('src');
	try {
		db.collection('User').doc(uid).set({
			User_ID:id,
			User_name:name,
			User_section:section,
			User_Type:userType,
			Image:url
		})
		console.log('Account has Successfully updated !');
		$('#user_profile_picture')[0].setAttribute('data-id','');
		clearUserDetails();
		$('#userModule_Save_button')[0].textContent = 'SAVE';
	} catch (error) {
		console.error(error);
	}

}

document.getElementById('userModule_search_user').addEventListener('click',()=>{
	db.collection('User').where('name','==',$('#search_user_data')[0].value).get().then((snapshot)=>{
		snapshot.docs.forEach(doc=>{
			setUsertablelist(doc);
		})
	})
})
document.getElementById('userModule_Cancel_button').addEventListener('click',()=>{ clearUserDetails(); });

function clearUserDetails(){
	console.log('hapen');
	$('#userModule_input_userID')[0].value = "";
	$('#userModule_input_name')[0].value = "";
	$('#userModule_input_section')[0].value = "";
	$('#userModule_input_email')[0].value = "";
	$('#userModule_input_password')[0].value = "";
	$('#select_profile_picture')[0].value = "";
	$('#user_profile_picture')[0].src = "profile/avatar-icon.png";
}


db.collection('User').onSnapshot((snapshot)=>{
	let changes = snapshot.docChanges();
	changes.forEach( change =>{
			if(change.type == 'added'){
				setUsertablelist(change.doc);
			}
			else if(change.type == 'modified'){
				updateDataInTable(change.doc);
			}else{
			//	setUsertablelist(change.doc);
			}
	});
})

function updateDataInTable(doc){
	const table = $('.table_userRecords')[0];
	for(i = 1 ; i < table.rows.length ; i++){
		if(table.rows[i].getAttribute('data-id')==doc.id){
			if(doc.data().User_Type){
				table.rows[i].cells[1].textContent = 'ADMIN';
			}else{
				table.rows[i].cells[1].textContent = 'TEACHER';
			}
		}
	}
}

function setUsertablelist(doc){
	let table = $('#leftBody_Main_UserRecords tbody')[0];

	let tr = document.createElement('tr');
	let tdname = document.createElement('td');
	let tdtype = document.createElement('td');
	let div = document.createElement('div');
	let btnedit = document.createElement('button');
	let btndelete = document.createElement('button');
	let i_edit = document.createElement('i');
	let i_delete = document.createElement('i');

	tr.setAttribute('data-id',doc.id);
	tr.setAttribute('class','rows')
	tdname.textContent = doc.data().User_name;
	div.setAttribute('id','userRecords_control');

	btnedit.setAttribute('id','userRecord_edit');
	btndelete.setAttribute('id','userRecord_delete');
	i_edit.setAttribute('class','fas fa-edit');
	i_delete.setAttribute('class','fas fa-trash');
	btnedit.appendChild(i_edit);
	btndelete.appendChild(i_delete);
	div.appendChild(btnedit);
	div.appendChild(btndelete);
	div.setAttribute('class','divclass')
	div.style.display = 'none';

	if(doc.data().User_Type){
		tdtype.textContent ="ADMIN";
	}else{
		tdtype.textContent ="TEACHER";
	}
	tdtype.appendChild(div);
	tr.appendChild(tdname);
	tr.appendChild(tdtype);
	table.appendChild(tr);

	tr.addEventListener('mouseenter',()=>{
		div.style.display = 'block';
	});
	tr.addEventListener('mouseleave',()=>{
		div.style.display = 'none';
	})
}

$('.table_userRecords tbody').on('click','#userRecord_delete',function(e){
	//get the selected row data and delete in database
	let userID = $('.table_userRecords tbody tr')[$(this).closest('tr').index()].getAttribute('data-id');
	try {	
		firebase.auth().getUser(userID).then(user =>{
			console.log(user);
		});
		//db.collection('User').doc(id).remove();
		//$(this).closest('tr').remove();
	} catch (error) {
		console.error(error);
	}
});

$('.table_userRecords tbody').on('click','#userRecord_edit',function(e){
	let id = $('.table_userRecords tbody tr')[$(this).closest('tr').index()].getAttribute('data-id');
	console.log(id);
	$('#userModule_Save_button')[0].textContent = 'EDIT';

	try {
		db.collection('User').doc(id).get().then((snapshot)=>{
			$('#user_profile_picture')[0].setAttribute('data-id',id);
			$('#user_profile_picture')[0].setAttribute('src',snapshot.data().Image);
			$('#userModule_input_userID')[0].value = snapshot.data().User_ID;
			$('#userModule_input_name')[0].value = snapshot.data().User_name;

			if(snapshot.data().User_Type){
				$('#userModule_select_userType')[0].selectedIndex = 0;
				$('#userModule_select_userType')[0].setAttribute('disable',true)
			}else{
				$('#userModule_select_userType')[0].selectedIndex = 0;
				$('#userModule_select_userType')[0].setAttribute('disable',true)
			}

			$('#userModule_input_section')[0].value = snapshot.data().User_section;
			$('#userModule_input_section')[0].setAttribute('disable',true);
		})
	} catch (error) {
		console.log(error);
	}
});

document.getElementById('userModule_search_user').addEventListener('click',(e)=>{
	if($('#search_by_user_type')[0].value == 'ADMIN'){
		cleanUserList();
		db.collection('User').where('User_Type','==',true).get().then(changes => {
			console.log(changes.doc.data().User_name);
			//error happens here . the data must be displayed when the user changes the selected type of user type.
		})
	}else if($('#search_by_user_type')[0].value == 'TEACHER'){

	}else{

	}
})

function cleanUserList(){
	let list = $('.table_userRecords')[0];

	for(i = 1 ; i = list.rows.length - 1 ; i++){
		list.deleteRow(1);
	}
}

 db.collection('History').orderBy('Date','desc').onSnapshot((snapshot) =>{
 	let changes = snapshot.docChanges();
 	changes.forEach(change =>{
 		userHistoryTransaction(change.doc);
	 });
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

	history_list.appendChild(li);
}