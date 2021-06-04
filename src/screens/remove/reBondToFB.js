import {dbcon, authcon} from '../../provider/firebase';

var uid = '';
    authcon.onAuthStateChanged(function (user) {
        if (user) {
            uid = user.uid.toString()
	        console.log(uid)
        } else {
            console.log('Something wrong!');      
        }
    })

export default function reBondToFB(now){
    dbcon.ref(`asset/${uid}/bond/${now}`).remove(
    ).then(() => {
        console.log('success')
    }).catch(
        e => console.log(e)
    )
}