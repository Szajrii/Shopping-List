import UserHandler from "./UserHandler";

export default class RegisterHandler extends UserHandler {

    static userNameNotEmpty(userName) {
        return userName.length;
    }

    static registerUser(email, password, nickname) {
        return RegisterHandler.auth.createUserWithEmailAndPassword(email, password)
            .then( () =>{
                RegisterHandler.database.collection("Users").doc(nickname).set({
                    nickname,
                    shoppingListActive: 0,
                    shoppingListDone: 0,
                    shoppingList: []
                })
                .catch(error => console.log(error.message));
            })
            .catch(error => console.log(error.message));
    }
}
