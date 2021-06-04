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

export default function reSavingToFB(id){
    dbcon.ref(`asset/${uid}/saving/${id}`).update().then(() => {
        // navigation.navigate('Profile');
        console.log('success')
    }).catch(
        e => console.log(e)
    )
}