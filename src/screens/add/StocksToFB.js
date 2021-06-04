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

export default function stockToFB(name, rate, pv, amount, valueAll, returnY, valueY, now, noteB){
    dbcon.ref(`asset/${uid}/stock/${now}`).set({
        name: name,
        rate: rate,
        PV: pv,
        amount: amount,
        valueAll: valueAll,
        returnYear: returnY,
        valueYear: valueY, 
        note: noteB,
    }).then(() => {
        // navigation.navigate('Profile');
        console.log('success')
    }).catch(
        e => console.log(e)
    )
}