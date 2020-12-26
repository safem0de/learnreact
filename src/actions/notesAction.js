import {GET_NOTES, NOTES_STATUS} from '../actionTypes';
import {firestore} from '../firebase';

export function getNotes(){
    return dispatch => {
        const element = {};
        const ref = firestore.collection('notes');
        ref.get()
            .then((querySnap)=> {
                querySnap.forEach((doc) =>{
                    if (doc.exists){
                        // https://stackoverflow.com/questions/1168807/how-can-i-add-a-key-value-pair-to-a-javascript-object
                        element[doc.id] = {
                            title:doc.get('title'),
                            body:doc.get('body'),
                            uid:doc.get('uid'),
                            comments:doc.get('comments')
                        };
                    }
                });
            });

        dispatch({
            type: NOTES_STATUS,
            payload: true
        });

        ref.get().then(() =>{
            dispatch({
                type: GET_NOTES,
                payload: element
            })

            dispatch({
                type:NOTES_STATUS,
                payload:false
            })
        },()=>{
            dispatch({
                type:NOTES_STATUS,
                payload:-1
            });
        });
    };
}

export function saveNote(note){
    const addNoteHandler = (obj) => {
        const ref = firestore.collection('notes');
            ref
                .add(obj)
                .then(()=>{
                    console.log("successful");
                    window.location.reload();
                })
                .catch((err)=>{
                    console.log(err);
                });
    }
    return dispatch => addNoteHandler(note)
}

export function deleteNote(key){
    return dispatch => firestore.collection('notes').doc(key).delete().then(()=> {
        console.log("Document successfully deleted!");
        window.location.reload();
    }).catch((error) => {
        console.error("Error removing document: ", error);
    });
}

export function saveComment(noteId,comment){
    const addCommentHandler = (doc,obj) => {
        const ref = firestore.collection('notes').doc(doc);
            ref
                .set({comments:{
                    [Date.now()]:obj
                }},{merge:true}
                ).then(()=> {
                    console.log("Document successfully updated!");
                    window.location.reload();
                }).catch((err)=>{
                    console.error("Update document: ", err);
                });
    }
    return dispatch => addCommentHandler(noteId,comment);
}

export function editNote(id,note){
    const editNoteHandler = (id,note) => {
        const ref = firestore.collection('notes').doc(id)
        ref.update(note).then(() => {
            console.log("Document successfully updated!");
            window.location.reload();
        })
        .catch((error)=> {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
        });
    }
    return dispatch => editNoteHandler(id,note)
}