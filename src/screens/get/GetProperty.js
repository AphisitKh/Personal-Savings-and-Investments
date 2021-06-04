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

export default function getProperty(){
    const items = [];
    dbcon.ref(`asset/${uid}/property`).on('value', snapshot =>{
        snapshot.forEach(element => {
            items.push({
                id: element.key,
                value: element.val().value,
                name: element.val().name,
                type: element.val().type,
                returnRateName: element.val().returnRateName,
                returnRate: element.val().returnRate,
                rateType: element.val().rateType,
                amountReturn: element.val().amountReturn,
                everyTimeD: element.val().everyTimeD,
                dateEnd: element.val().dateEnd,
                returnTimes: element.val().returnTimes,
                returnYear: element.val().returnYear,
                valueYear: element.val().valueYear,
                note: element.val().note,
            })
        });
    })
    return items
}