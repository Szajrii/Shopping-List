export default class UserHandler {
    //those two fields are assigned in index.js due to initializing this class before firebase
    static database;
    static auth;

    static validatePassword(password) {
        return password.length >= 8;
    };

    static validateEmail(email) {
        const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return reg.test(String(email).toLowerCase());
    };
}

