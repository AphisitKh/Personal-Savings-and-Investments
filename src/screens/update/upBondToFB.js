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

export default function upBondToFB(valueE, nameE, typeName, RRN, RR, RT, dayT, dateEndTimestamp, expTime, returnY, totalReturnV, now, noteB){
    dbcon.ref(`asset/${uid}/bond/${now}`).update({
        value: valueE, //จำนวนเงิน
        name: nameE, //ชื่อ
        type: typeName, //ชื่อรูปแบบการทำซ้ำ
        returnRateName: RRN, //ชื่อรูปแบบผลตอบแทน
        returnRate: RR, //ค่าอัตราผลตอบแทน
        rateType: RT, //ประเภทผลตอบแทน 1 บาท 2 %
        everyTimeD: dayT, //ค่าการทำซ้ำในหน่วยวัน
        dateEnd: dateEndTimestamp, //ทำถึงวันที่
        returnTimes: expTime, //จำนวนครั้งที่ได้ผลตอบแทน
        returnYear: returnY, //ผลตอบแทนรวมต่อปี
        valueYear: totalReturnV,
        note: noteB //โน๊ต
    }).then(() => {
        console.log('success')
    }).catch(
        e => console.log(e)
    )
}