import React,{useEffect, useState, } from 'react';
import { View, ScrollView, TouchableOpacity, Image, FlatList, StyleSheet, Alert} from 'react-native';
import { Layout, Text, Button} from 'react-native-rapi-ui';
// import { DatePickerModal } from 'react-native-paper-dates'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Moment from 'moment';
import getExpenses from './get/GetExpenses'

import Dialog, { DialogContent } from 'react-native-popup-dialog';
import { Icon } from 'react-native-elements'
import reExpensesToFB from './remove/reExpensesToFB';


export default function ({ navigation }) {
	const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
	const [chooseDate, setChooseDate] = useState('')
	const [itemExpend, setItemExpend] = useState([])
	const [visibleDialog, setVisibleDialog] = useState(false)

	const [editId, setEditId] = useState(null)
	const [editName, setEditName] = useState(null)
	const [editValue, setEditValue] = useState(null)
	const [editTimes, setEditTimes] = useState(null)
	const [editDateEnd, setEditDateEnd] = useState(null)
	const [editNote, setEditNote] = useState(null)

	const [updateState, setUpdateState] = useState(true)

	

	const showDatePicker = () => {
	  setDatePickerVisibility(true);
	};
  
	const hideDatePicker = () => {
	  setDatePickerVisibility(false);
	};
  
	const handleConfirm = (date) => {
	//   console.warn("A date has been picked: ", date);
		setChooseDate(Moment(date).format('MMMM do YYYY'))
		hideDatePicker();
	};

	function formatDateEnd(itemDate){
		if(itemDate !== 0){
			return Moment(itemDate).format('MMMM Do YYYY')
		}else{
			return 'ไม่มีกำหนด'
		}
	}

	function getDialogExpend(id, value, name, times, dateEnd, note){
		setEditId(id)
		setEditValue(value)
		setEditName(name)
		setEditTimes(times)
		setEditDateEnd(dateEnd)
		setEditNote(note)
		setVisibleDialog(true)
	}

	function editAndUpToFB(){
		navigation.navigate('AddExpenses',{edit:{id: editId, value: editValue, name:editName, times: editTimes, dateEnd: editDateEnd, note:editNote}})
	}

	function removeEx(){
		reExpensesToFB(editId)
	}
	
	useEffect(()=>{
		setItemExpend(getExpenses())
		setTimeout(() => {
			if(updateState){
				setUpdateState(false)
			}else{
				setUpdateState(true)
			}
			console.log('------------after 5s refresh')
		}, 5000);
	},[updateState])

	
	return (
		<Layout>
			<ScrollView>
			<View
				style={{
					flex: 1,
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				<Text>{chooseDate}</Text>
			</View>

			{/* <Button title={"Show Date Picker"} onPress={showDatePicker} />
			<DateTimePickerModal
        		isVisible={isDatePickerVisible}
        		mode="date"
        		onConfirm={handleConfirm}
        		onCancel={hideDatePicker}
      		/> */}
			  	<View>
					<FlatList
						style={ styles.flatListContainer }
						data={itemExpend}
						keyExtractor={(item, index)=> index.toString()}
						renderItem={({item})=>(
							<View style = {styles.container}>
								<View style = {{flexDirection:'row', justifyContent: 'space-between',}}>

								<Text>ชื่อ {item.name}</Text>
								<TouchableOpacity style={{
									backgroundColor: '',
									justifyContent: "center" ,
									flexDirection: 'column', 
									alignSelf: 'flex-end',
                					color: '#fff',
									top: '0%',  
									}} onPress={() => {
										getDialogExpend(item.id, item.value, item.name, item.everyTimeD, item.dateEnd, item.note)
										console.log('Edit ex');
									}}>
                					<Icon
                						size={25}
                						name='more-vert'
                						color='#535353' 
									/>
              					</TouchableOpacity>
								</View>
								<Text>จำนวนเงิน {item.value}</Text>
								<Text>รายจ่ายต่อปี {item.expenseYear} บาท/ปี</Text>
								<Text>ทำซ้ำ {item.type}</Text>
								<Text>หมดอายุ {formatDateEnd(item.dateEnd)}</Text>
								<Text>โน๊ต {item.note}</Text>
								<Text></Text>
							</View>
						)}
					/>
				</View>

				<Dialog
				visible={visibleDialog}
				width={200}
				height={90}
				onTouchOutside={()=>{setVisibleDialog(false)}}
			>
				<DialogContent>
					<Text style={{marginTop: '7%', fontSize: 18, color: '#535353', alignSelf: 'center'}} 
						onPress={() => {
							console.log('edit')
							editAndUpToFB()
      						setVisibleDialog(false)
      				}}>
						Edit
					</Text>
      				<View style={{
            			marginTop: '5%',
        				borderBottomColor: '#C6C6C6',
        				borderBottomWidth: 1.5,
        				alignSelf: 'center',
        				width: '100%'
      				}} />
      					<Text style={{color: '#DC2222', fontSize: 18, alignSelf: 'center', marginTop: '5%'}} onPress={() => {
        					setVisibleDialog(false)
        					Alert.alert(
          						'Remove',
          						'Are you sure remove this post.',
          						[
        							{
              							text: 'Ok',
              							onPress: () => 
              							{
											removeEx()
											console.log('remove')
										},
            						},
            						{
              							text: 'Cancel',
              							onPress: () => {}
            						}
          						],
          						{cancelable: false}
        					);
      					}}>Remove</Text>
				</DialogContent>
			</Dialog>

			</ScrollView>

			<TouchableOpacity style={{
				color: '#fff',
      			flexDirection: 'column',
      			alignSelf: 'flex-end',
      			position: 'absolute',
      			padding: 0,
      			bottom: 1,
      			right: 3
			}} onPress={() => navigation.navigate('AddExpenses', {edit: 0})}>
      			<Image style={{ width: 60, height: 60, margin: 5 }} source={require('../../assets/expendAdd.png')} />
    		</TouchableOpacity>

		</Layout>
	);
}


const styles = StyleSheet.create({
	container: {
		marginLeft: 10,
		marginTop: 10,
	},
	flatListContainer:{
		flex: 1,
		marginTop: 10,
		marginBottom: 10,
		marginHorizontal: 10,
		backgroundColor: "#ffffff",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		
		elevation: 5,

	}
  });