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

export default function getBond(){
    const items = [];
    dbcon.ref(`asset/${uid}/stock`).on('value', snapshot =>{
        snapshot.forEach(element => {
            items.push({
                id: element.key,
                name: element.val().name,
                rate: element.val().rate,
                PV: element.val().PV,
                amount: element.val().amount,
                valueAll: element.val().valueAll,
                returnYear: element.val().returnYear,
                valueYear: element.val().valueYear,
                note: element.val().note,
            })
        });
    })
    return items
}