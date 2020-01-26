import firebase from 'firebase'

export default class ListHandler {

    constructor (email) {
        this.email = email;
        this.database = firebase.firestore();
    }

    uploadList = list => {
       return this.database.collection("Users").doc(this.email).update({
            shoppingList: firebase.firestore.FieldValue.arrayUnion(list)
        })
    };

    downloadLists = () => {
        return this.database.collection("Users").doc(this.email).get();
    }
}
