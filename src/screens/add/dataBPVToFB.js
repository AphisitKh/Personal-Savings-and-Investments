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

export default function dataStock(id, name, rate, PV){
    dbcon.ref(`SET50/${id}`).set({
        name: name, //
        rate: rate, //
        PV: PV, //
    }).then(() => {
        console.log('success')
    }).catch(
        e => console.log(e)
    )
}