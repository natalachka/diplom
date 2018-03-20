(function(){
    window.AuthService = function AuthService(storage){
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
                    storage.set('currentUser', newUser);
                    return true;
                }
            } else {
                registeredUsers = [];
                registeredUsers.push(newUser);
                storage.set('registeredUsers', registeredUsers);
                storage.set('currentUser', newUser);
                return true;
            }
        };

        this.login = function(email, pass){
            registeredUsers = storage.get('registeredUsers') || [];

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
                    storage.set('currentUser', user);
                    return true;
                }
            }
        }

        this.logout = function(){
            storage.set('currentUser', null);
        };

        this.getCurrentUser = function(){
            return  storage.get('currentUser');
        }
    }
})();   