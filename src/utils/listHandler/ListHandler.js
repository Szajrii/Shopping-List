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
    };

    markAsDone = (name, callback) => {
        let data;
        this.database.collection("Users").doc(this.email).get()
            .then(doc => {
                data = doc.data().shoppingList;
                const index = data.findIndex(d => d.title === name);
                data[index].status = 'done';

                this.database.collection("Users").doc(this.email).update({
                    shoppingList: data
                })
                    .then(()=> {
                        callback();
                    })
                    .catch(err => console.log(err));
            })
            .catch(err => console.log(err));
    };

    removeList = (name, callback)=> {
        let data;
        this.database.collection("Users").doc(this.email).get()
            .then(doc => {
                data = doc.data().shoppingList;
                const index = data.findIndex(d => d.title === name);
                data.splice(index, 1);

                this.database.collection("Users").doc(this.email).update({
                    shoppingList: data
                })
                    .then(()=> {
                        callback();
                    })
                    .catch(err => console.log(err));
            })
            .catch(err => console.log(err));
    }
}
