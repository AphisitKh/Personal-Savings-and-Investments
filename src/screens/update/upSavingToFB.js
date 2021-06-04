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

export default function upSavingToFB(valueB, bankName, bankNo, typeName, typeNo, increaseRate, returnY, valueY, id, noteB){
    dbcon.ref(`asset/${uid}/saving/${id}`).update({
        value: valueB,
        bank: bankName,
        bankNo: bankNo,
        type: typeName,
        typeNo: typeNo,
        rate: increaseRate,
        returnYear: returnY,
        valueYear: valueY,
        note: noteB
    }).then(() => {
        // navigation.navigate('Profile');
        console.log('success')
    }).catch(
        e => console.log(e)
    )
}