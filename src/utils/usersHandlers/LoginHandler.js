import UserHandler from "./UserHandler";

export default class LoginrHandler extends UserHandler {

    static loginUser(email, password) {
        return LoginrHandler.auth.signInWithEmailAndPassword(email, password);
    }
}
