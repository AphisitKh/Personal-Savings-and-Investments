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

export default function updateStock(id, pv, valueAll, returnYear, valueYear){
    dbcon.ref(`asset/${uid}/stock/${id}`).update({
        PV: pv,
        valueAll: valueAll,
        returnYear: returnYear,
        valueYear: valueYear
    }).then(() => {
        // navigation.navigate('Profile');
        console.log('success')
    }).catch(
        e => console.log(e)
    )
}