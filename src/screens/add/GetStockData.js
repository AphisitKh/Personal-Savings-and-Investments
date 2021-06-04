import {dbcon, authcon} from '../../provider/firebase';


export default function getStockData(){
    const items = [];
    dbcon.ref(`SET50`).on('value', snapshot =>{
        snapshot.forEach(element => {
            items.push({
                id: element.key,
                name: element.val().name,
                PV: element.val().PV,
                rate: element.val().rate
            })
        });
    })
    return items
}