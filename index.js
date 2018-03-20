(function(){
	'use srtict';

	// var localStorage = new LocalStorage('nick');

	// localStorage.set('currentUserEmail', 'asdasd@mail.ru');
	// console.log(currentUserEmail);
	var localStorage = new LocalStorage('asdasdasdasd');
		localStorage.set('currentUserEmail', 'hhhil');

	var myBtn = document.getElementById('myBtn');
	var myModal = document.getElementById('myModal');
	var content = document.getElementById('content');
	var close = document.getElementById('close');
	var email = document.getElementById('email');
	var password = document.getElementById('password');
	var enter = document.getElementById('enter');
	var error = document.getElementById('error');
	var secondBtn = document.getElementById('secondBtn');
	var container = document.getElementById('container');
	var create = document.getElementById('create');
	var createTaskButton = document.getElementById('add');
	var newOut = document.getElementById('out');
	var taskTextInput = document.getElementById('work');
	var taskList = document.getElementById('myUl');

	var login = document.getElementById('login');
	// content.addEventListener('click', function(event){
	// 	var target = event.target;

	// 	if(target.id === 'myBtn') {
	// 		myModal.style.display = 'flex';
	// 	}
	// 	if (target.id === 'close') {
	// 		myModal.style.display = 'none';
	// 		error.style.display='none';
	// 	}
	// 	if (target.id === 'enter') {
			
	// 			var mail = email.value;
	// 			// var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
	// 			if(!email.value) {
	// 				email.style.border = "2px solid red";
	// 				return false;
	// 			}
	// 			if(!password.value) {
	// 				password.style.border = "2px solid red";
	// 				return false;
	// 			}
	// 			if(mail.match(/[^A-Za-z0-9\-\_\$\^\|]+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})/) || password.value.length <= 6){
	// 				error.style.display='block';
	// 				create.style.display='block';
	// 				return false;
	// 					if(!email.value && password.value.length > 7) {
	// 					createAccount();
	// 				}
	// 			}
			

	// 		alert('hello');
	// 		createNote();
			
	// 	}
	// })

	function comeIn(){
		myBtn.addEventListener('click', function(){
		myModal.style.display = 'flex';
		});
	}

	comeIn();

	function exit(){
		close.addEventListener('click', function(){
		myModal.style.display = 'none';
		error.style.display='none';
		});
	}

	exit();

	function form(){
			enter.addEventListener('click', function (){
			var mail = email.value;
			// var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
			if(!email.value) {
				email.style.border = "2px solid red";
				return false;
			}
			if(!password.value) {
				password.style.border = "2px solid red";
				return false;
			}
			if(mail.match(/[^A-Za-z0-9\-\_\$\^\|]+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})/) || password.value.length <= 6){
				error.style.display='block';
				create.style.display='block';
				return false;
					if(!email.value && password.value.length > 7) {
					createAccount();
				}
			}
			

			alert('hello');
			createNote();
		})
	}
	
	form();		

	secondBtn.addEventListener('click', function(){
		secondBtn.style.display='none';
		myBtn.style.display='block';
		container.style.display='none';
		content.style.display='block';
		email.value = '';
		password.value = '';
		var nameUser = '';
			localStorage.set("currentUserEmail", nameUser);
		
		comeIn();
		exit();
		form();
	});
	
	function createAccount (){
		create.addEventListener('click', function(){
			var nameUser = mail;
			localStorage.set("currentUserEmail", nameUser);
		})
		

		myModal.style.display = 'none';
		content.style.display='none';
		myBtn.style.display='none';
		secondBtn.style.display='block';
		container.style.display='block';
		error.style.display='none';
		create.style.display='none';
		addList();
	}

	function createNote (){
		var nameUser = email.value;
		localStorage.set("currentUserEmail", nameUser);

		myModal.style.display = 'none';
		content.style.display='none';
		myBtn.style.display='none';
		secondBtn.style.display='block';
		container.style.display='block';
		
	}

    taskList.addEventListener('click', function(event){
    	var action = event.target.getAttribute('data-action');

    	if(action === 'remove'){
    		var task = event.target.closest('LI');
            taskList.removeChild(task);
		} else if(action === 'check'){
            event.target.classList.toggle('checked');
		}
	}, false);


    createTaskButton.addEventListener('click', function(){
		var li = document.createElement('li'),
			inputValue = taskTextInput.value;

        if(inputValue === ''){
            alert('Поле должно быть заполнено');
        } else {
            li.innerText = inputValue;
            li.setAttribute('data-action', 'check');
            var span = document.createElement('span');
			span.innerText = '\u00D7';
            span.className = 'close';
            span.setAttribute('data-action', 'remove');
            li.appendChild(span);
            taskList.appendChild(li);
        }
	});
})();
