(function(){
    window.AuthService = function AuthService(storage){
        var currentUser = null;

        this.register = function(email, pass){
            var newUser = {email: email, pass: pass};
            registeredUsers = storage.registeredUsers;

            if(registeredUsers){
                var index = registeredUsers.findIndex(function(user){
                    return user.email === email;
                });
                
                if (index !== -1){
                    return null;    
                } else {
                    registeredUsers.push(newUser);
                    storage.set('registeredUsers', registeredUsers);
                    currentUser =  newUser;
                    return currentUser;
                }
            } else {
                registeredUsers = [];
                registeredUsers.push(newUser);
                storage.set('registeredUsers', registeredUsers);
                currentUser =  newUser;
                return currentUser;
            }
        };

        this.login = function(email, pass){
            registeredUsers = storage.registeredUsers;

            var index = registeredUsers.findIndex(function(user){
                return user.email === email;
            });

            if(index === -1){
                return false;
            } else {
                var user = registeredUsers[index];

                if(pass !== user.pass){
                    return false;
                } else {
                    currentUser = user;
                    return true;
                }
            }
        }

        this.logout = function(){
            currentUser = null;
        }

        this.getCurrentUser = function(){
            return currentUser;
        }
    }
})();   