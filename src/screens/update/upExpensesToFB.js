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

export default function upExpensesToFB(valueE, nameE, typeName, dayT, dateEndTimestamp, expTime, totalExpenses, now, noteB){
    dbcon.ref(`expenses/${uid}/${now}`).update({
        value: valueE, //จำนวนเงิน
        name: nameE, //ชื่อ
        type: typeName, //ชื่อรูปแบบการทำซ้ำ
        everyTimeD: dayT, //ค่าการทำซ้ำในหน่วยวัน
        dateEnd: dateEndTimestamp, //ทำถึงวันที่
        expenseTimes: expTime, //จำนวนครั้งที่ต้องจ่าย
        expenseYear: totalExpenses, //
        note: noteB //โน๊ต
    }).then(() => {
        console.log('success')
    }).catch(
        e => console.log(e)
    )
}