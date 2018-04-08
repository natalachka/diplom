(function(){
	'use srtict';

	var localStorage = new LocalStorage('asdasdasdasd');
	var authService = new AuthService(localStorage);

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

	if(authService.getCurrentUser()){
        showApp();
	}

    myBtn.addEventListener('click', showModal);
    close.addEventListener('click', function(){
        hideModal();
        hideErrors();
    });
    enter.addEventListener('click', onSignInClick);
    create.addEventListener('click', registerUser);
    secondBtn.addEventListener('click', logOut);

    function logOut(){
    	authService.logout();
        clearTasks();
        hideApp();
	}

	function clearTasks(){
        taskList.innerHTML = '';
	}

	function showModal(){
        myModal.style.display = 'flex';
    }

    function hideModal(){
        myModal.style.display = 'none';
        email.value = '';
        password.value = '';
    }

    function showApp(){
        secondBtn.style.display='block';
        container.style.display='block';
        myBtn.style.display = 'none';
        // loadUserTasks();
    }

	function hideApp(){
        secondBtn.style.display='none';
        container.style.display='none';
        myBtn.style.display = 'block';
    }

    function hideErrors(){
		error.innerText = '';
        error.style.display='none';
        email.style.border = '';
        password.style.border = '';
    }

	function onSignInClick(){
        hideErrors();
		var mail = email.value,
			pass = password.value;
		if(!mail) {
			email.style.border = "2px solid red";
			return;
		} else if (!pass) {
			password.style.border = "2px solid red";
			return;
		}else if(!mail.match(/[a-z0-9]+\@[a-z]+\.[a-z]+/i) || pass.length <= 6){
            error.innerText = 'Wrong login or pass';
            error.style.display='block';
			return;
		} else {
			if(authService.login(mail, pass)){
				hideModal();
                showApp();
            } else {
                error.innerText = 'Email is not registered';
                error.style.display = 'block';
                create.style.display='block';
            }
        }
	}

	function registerUser(){
        hideErrors();
        var mail = email.value,
            pass = password.value;
        if(!mail) {
            email.style.border = "2px solid red";
            return;
        } else if (!pass) {
            password.style.border = "2px solid red";
            return;
        }else if(!mail.match(/[a-z0-9]+\@[a-z]+\.[a-z]+/i) || pass.length <= 6){
            error.innerText = 'Wrong login or pass';
            error.style.display='block';
            return;
        } else {
        	if(authService.register(mail, pass)){
        		hideModal();
                showApp();
            } else {
                error.innerText = 'Email already registered';
                error.style.display='block';
            }
		}
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
            taskTextInput.value = '';
        }
	});
})();
