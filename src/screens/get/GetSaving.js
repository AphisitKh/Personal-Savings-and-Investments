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

export default function getSaving(){
    const items = [];
    dbcon.ref(`asset/${uid}/saving`).on('value', snapshot =>{
        snapshot.forEach(element => {
            items.push({
                id: element.key,
                value: element.val().value,
                bank: element.val().bank,
                bankNo: element.val().bankNo,
                type: element.val().type,
                typeNo: element.val().typeNo,
                rate: element.val().rate,
                returnYear: element.val().returnYear,
                valueYear: element.val().valueYear,
                note: element.val().note,
            })
        });
    })
    return items
}