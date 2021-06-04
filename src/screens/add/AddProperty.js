import React, { useState, useMemo } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
	ScrollView,
	TouchableOpacity,
	View,
	KeyboardAvoidingView,
	Image,
	TopNav,
	theme,
	Alert,
} from 'react-native';
import * as firebase from 'firebase';
import { Ionicons } from '@expo/vector-icons';
import { Layout, Text, TextInput, Button, Picker} from 'react-native-rapi-ui';

import savingIR from './SavingIR'
import propertyToFB from './PropertyToFB'
import upPropertyToFB from '../update/upPropertyToFB'

import DateTimePickerModal from "react-native-modal-datetime-picker";
import Moment from 'moment';

// var now = new Date().getTime();

export default function ({ navigation, route }) {
	const [now, setNowkey] = useState(Date.now());
	const [upDatetoFB, setUpDateToFB] = useState(route.params.edit);

    const [valueE, setValueE] = useState('');
    const [nameE, setNameE] = useState('');
    const [showChooseD,setShowChooseD] = useState(false)
    const [pickerRecur, setPickerRecur] = useState('')
    const [recurName, setRecurName] = useState('')
    const recurTime=[
		{label: 'ไม่ทำซ้ำ', value: 0},
		{label: 'วันละครั้ง', value: 365},
		{label: '2 วันครั้ง', value: 182},
		{label: 'สัปดาห์ละครั้ง', value: 52},
		{label: '2 สัปดาห์ครั้ง', value: 26},
		{label: '4 สัปดาห์ครั้ง', value: 13},
		{label: 'เดือนละครั้ง', value: 12},
		{label: '2 เดือนครั้ง', value: 6},
		{label: '3 เดือนครั้ง', value: 4},
		{label: '4 เดือนครั้ง', value: 3},
		{label: '6 เดือนครั้ง', value: 2},
		{label: 'ปีละครั้ง', value: 1},
		{label: 'กำหนดเอง', value: 1000},

    ];

    const [cusET, setCusET] = useState('')
	const [cusIR, setcusIR] = useState('');
	const [cusA, setcusA] = useState('');
	const [customincreaseRate, setcustomincreaseRate] = useState(null);

	const [typeName, settypeName] = useState('');
    const [pickercustomRe, setPickerCustomRe] = useState(0)
    const customRecurType = [
		{label: 'วัน', value: 365},
		{label: 'สัปดาห์', value: 52},
		{label: 'เดือน', value: 12},
    ];

	const [pickerCusIT, setPickerCusIT] = useState(1)
	const [cusITName, setCusITName] = useState('บาท')
	const [cusFullIcName, setCusFullIcName] = useState('')
	const customInType = [
		{label: 'บาท', value: 1},
		{label: '%', value: 2},
	];

	const [noteB, setnoteB] = useState('');
	const [showCustom, setshowCustom] = useState(false);
	const [pickerTypes, setpickerTypes] = useState(null);
	

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
	const [chooseDate, setChooseDate] = useState('')
    const [chooseTime, setChooseTime] = useState(null)
    const [numofdayEnd, setNumOfDayEnd] = useState('')

	const showDatePicker = () => {
	  setDatePickerVisibility(true);
	};
  
	const hideDatePicker = () => {
	  setDatePickerVisibility(false);
	};
  
	const handleConfirm = (date) => {
	//   console.warn("A date has been picked: ", date);
		setChooseDate(Moment(date).format('MMMM Do YYYY'))
        setNumOfDayEnd(Moment(date).dayOfYear())
        setChooseTime(date)
		hideDatePicker();
	};

	async function recurTName(val){
		await setPickerRecur(val)
        await setChooseDate('')
        await setChooseTime('')
        console.log(Moment(Date.now()).dayOfYear())
        console.log(Moment(Date.now()).format('MMMM Do YYYY'))
        
        if(val !== 1000){
            await setshowCustom(false)
            await setCusET('')
            await setPickerCustomRe(null)
            await settypeName('')
			await setShowChooseD(true)
            if(val === 0){
                await setShowChooseD(false)
            }
			await setRecurName(recurTime.find(({value}) => value === val ).label)
		}else{
			await setShowChooseD(true)
            await setshowCustom(true)
		}
	}

    async function dayTimes(){
        if(setPickerRecur !== 1000){
            await setDayT(pickerRecur)
        }else{
            // let newcusReN = ''
        }

    }


	async function cusRecurName(){
        let newcusReN = ''
		if(showCustom){
            let numC = cusET
            newcusReN = numC + ' ' +typeName+'ครั้ง'
            setRecurName(newcusReN)
            return newcusReN
		}
	}

	async function cusTypesName(val){
		await settypeName(customRecurType.find(({value}) => value === val ).label)
		await setPickerCustomRe(val)
	}

	async function pCusITName(val){
		await setCusITName(customInType.find(({value}) => value === val ).label)
		await setPickerCusIT(val)
	}

	async function pCusITFullName(){
        let newFullN = ''
		let numCIR = cusIR
		newFullN = numCIR + ' ' + cusITName 
		setCusFullIcName(newFullN)
		return newFullN
	}

	async function assetReturn(CITN, CIV, ITs, PVI){
		let finalV = 0
		let persentV = Number(PVI)
		let increaseV = 0
		if(CITN === 1){
			increaseV = Number(CIV)
			finalV = persentV + (increaseV * ITs); //baht
		}else{
			//%
			//FV = PV x ( 1 + i ) ^ n
			increaseV = Number(CIV)*0.01
			finalV = persentV * Math.pow((1 + increaseV),ITs)
		}
		return finalV
	}


	function checkInput(){
		if(nameE === ''){
			Alert.alert('ชื่อรายการ', 'กรุณากรอกชื่อรายการ')
			return false
		}
		if(valueE === ''){
			Alert.alert('มูลค่าโดยรวม', 'กรุณากรอกมูลค่าโดยรวม')
			return false
		}
		if(Number(valueE)<=0){
			Alert.alert('มูลค่าโดยรวม', 'ต้องมีค่ามากกว่า 0')
			return false
		}
		if(pickerCusIT === ''){
			Alert.alert('ผลตอบแทน', 'กรุณาเลือกรูปแบบ')
			return false
		}
		if(pickerCusIT !== ''){
			if(Number(cusIR)<=0){
				Alert.alert('ผลตอบแทน', 'ต้องมีค่ามากกว่า 0 ')
				return false
			}else if(cusIR === ''){
				Alert.alert('ผลตอบแทน', 'กรุณากรอกจำนวนผลตอบแทน')
				return false
			}
		}
		if(cusA === ''){
			Alert.alert('จำนวน', 'กรอกจำนวนหน่วยต่อผลตอบแทน')
			return false
		}
		if(Number(cusA)<=0){
			Alert.alert('จำนวน', 'ต้องมีค่ามากกว่า 0 ')
			return false
		}
		if(pickerRecur === ''){
			Alert.alert('ระยะเวลาผลตอบแทน', 'กรุณาเลือกรูปแบบระยะเวลาผลตอบแทน')
			return false
		}
		if(showCustom === true && cusET === ''){
			Alert.alert('ระยะเวลาผลตอบแทน', 'กรุณากรอกจำนวน')
			return false
		}
		if(showCustom === true && pickercustomRe === 0){
			Alert.alert('ระยะเวลาผลตอบแทน', 'กรุณาเลือกรูปแบบ')
			return false
		}
		if(showCustom === true && pickercustomRe === 52){
            if(Number(cusET) > 52){
                Alert.alert('ระยะเวลาผลตอบแทน', 'จำนวนที่เป็นไปได้มากที่สุดคือ 52 \nกรุณากรอกใหม่')
				return false
            }else if(Number(cusET) < 1){
                Alert.alert('ระยะเวลาผลตอบแทน', 'จำนวนที่เป็นไปได้น้อยที่สุดคือ 1 \nกรุณากรอกใหม่')
				return false
            }else{    
		    	return true
            }
		}
		if(showCustom === true && pickercustomRe === 365){
            if(Number(cusET) > 365){
                Alert.alert('ทำซ้ำ', 'จำนวนที่เป็นไปได้มากที่สุดคือ 365 \nกรุณากรอกใหม่')
				return false
            }else if(Number(cusET) < 1){
                Alert.alert('ทำซ้ำ', 'จำนวนที่เป็นไปได้น้อยที่สุดคือ 1 \nกรุณากรอกใหม่')
				return false
            }else{    
		    	return true
            }
		}
		if(showCustom === true && pickercustomRe === 12){
            if(Number(cusET) > 12){
                Alert.alert('ทำซ้ำ', 'จำนวนที่เป็นไปได้มากที่สุดคือ 12 \nกรุณากรอกใหม่')
				return false
            }else if(Number(cusET) < 1){
                Alert.alert('ทำซ้ำ', 'จำนวนที่เป็นไปได้น้อยที่สุดคือ 1 \nกรุณากรอกใหม่')
				return false
            }else{    
		    	return true
            }
		}
		// console.log('checkinput')
		return true
	}

	async function submit() {
		if(await checkInput()){
            let dayT = 0
            let expT = 0
            let dayEnd = chooseDate
            let typeRecurName = ''
			let inRateName = await pCusITFullName();
            if(showCustom){
                typeRecurName = await cusRecurName();
                let cusETN = Number(cusET)
                dayT = ~~(pickercustomRe/cusETN)
            }else{
                dayT = pickerRecur
                typeRecurName = recurName
            }
            if(chooseTime !== ''){
                console.log(dayT);
                expT = ~~((numofdayEnd - (Moment(now).dayOfYear()))/~~(365/dayT))
                if(expT <= 0){
                    expT = 1
                }
            }else{
                expT = dayT
                if(expT <= 0){
                    expT = 1
                }
            }
			let cusTotR = Number(cusIR)*Number(cusA)
			let totalReturnV = await assetReturn(pickerCusIT, cusTotR, expT, valueE)
			let returnY = Number(totalReturnV) - Number(valueE);
			console.log(inRateName);
			console.log(cusTotR)
			if(upDatetoFB === 0){
				await propertyToFB(valueE, nameE, typeRecurName, inRateName, cusTotR, pickerCusIT, cusA, dayT, Number(chooseTime), expT, returnY.toFixed(2), totalReturnV.toFixed(2), now, noteB)
			}else{
				await upPropertyToFB(valueE, nameE, typeRecurName, inRateName, cusTotR, pickerCusIT, cusA, dayT, Number(chooseTime), expT, returnY.toFixed(2), totalReturnV.toFixed(2), upDatetoFB.id, noteB)
			
			}
            await navigation.navigate('Profile');
		}else{
			console.log(checkInput())
		}
	}

	useMemo(()=>{
		if(upDatetoFB === 0 ){
			console.log('add mode');
		}else{
			// {edit: {id: editId, value: editValue, type: editType, rate: editRate, note: editNote}
			console.log('edit mode');
			setValueE(upDatetoFB.value);
			setNameE(upDatetoFB.name);
			setcusIR(Number(upDatetoFB.rate)/Number(upDatetoFB.amount));
			setPickerRecur(upDatetoFB.times);
			setcusA(upDatetoFB.amount)
			setChooseDate(Moment(upDatetoFB.dateEnd).format('MMMM Do YYYY'));
			setChooseTime(upDatetoFB.dateEnd);
			console.log(Moment(upDatetoFB.dateEnd).format('MMMM Do YYYY'));
		}
	},[])

	return (
		<KeyboardAvoidingView behavior="height" enabled style={{ flex: 1 }}>
			<StatusBar style="auto" translucent backgroundColor="#f7f7f7" />
			<Layout>
				<View style={{
						alignSelf: 'stretch',
						flexDirection: 'row',
						justifyContent: 'space-between',
						paddingHorizontal: 10,
						paddingBottom: 10,
						paddingTop: 10,
						backgroundColor:'#f1c40f'}}>

					<TouchableOpacity 
						onPress={() => {
									navigation.goBack();
								}}>
						<Ionicons name="close" size={40} alignContent = {'center'} color = {'white'}/>
					</TouchableOpacity>
					
					<Text
							fontWeight="bold"
							size="h3"
							style={{
								alignSelf: 'center',
								color: 'white'
							}}
						>
							อสังหาริมทรัพย์
					</Text>
					<Text style = {{alignSelf: 'center'}}>         </Text>
				</View>
				<ScrollView
					contentContainerStyle={{
						flexGrow: 1,
					}}
				>
					<View

						style={{
							flex: 3,
							paddingHorizontal: 20,
							paddingBottom: 20,
							backgroundColor: '#ffffff',
						}}
					>

						<Text style = {{paddingTop: 10 }}>ชื่อรายการ </Text>
						<TextInput
							containerStyle={{ marginTop: 15 }}
							placeholder="ชื่อรายการ"
							value={nameE}
							autoCapitalize="none"
							autoCompleteType="off"
							autoCorrect={false}
							onChangeText={(text) => setNameE(text)}
						/>

						<Text style = {{paddingTop: 10 }}>มูลค่าโดยรวม</Text>
						<TextInput
							containerStyle={{ marginTop: 15 }}
							placeholder="0"
                            rightContent={
                                <Text>{'\u0E3F'}</Text>
                            }
							value={valueE}
							autoCapitalize="none"
							autoCompleteType="off"
							autoCorrect={false}
							keyboardType="number-pad"
							onChangeText={(text) => setValueE(text)}
						/>
						<Text style = {{paddingTop: 10 }}>ผลตอบแทน</Text>
								<TextInput
									containerStyle={{ marginTop: 15}}
									placeholder="0"
									rightContent={
										<Text>{'\u0E3F'}</Text>
									}
									value={cusIR}
									autoCapitalize="none"
									autoCompleteType="off"
									autoCorrect={false}
									keyboardType="number-pad"
									onChangeText={(text) => setcusIR(text)}
								/>
						
						<Text style = {{paddingTop: 10 }}>จำนวน</Text>
								<TextInput
									containerStyle={{ marginTop: 15}}
									placeholder="0"
									value={cusA}
									autoCapitalize="none"
									autoCompleteType="off"
									autoCorrect={false}
									keyboardType="number-pad"
									onChangeText={(text) => setcusA(text)}
								/>
						<Text style={{ marginTop: 15, marginBottom: 15 }}>ระยะเวลาที่ได้ผลตอบแทน </Text>
						<Picker
							items = {recurTime}
							value = {pickerRecur}
							placeholder = "ระยะเวลาผลตอบแทน"
							onValueChange={(val) => recurTName(val)}
						/>
						<View>
							{
								showChooseD ? 
								(
                                    <View style={{paddingTop: 15}}>
                                    {
                                        showCustom ?(
                                            <View style={{flexDirection:'row',width:'100%',}}>
                                                <View style={{direction:'ltr'}}>
						                            <TextInput
                                                        containerStyle={{width: 100, marginEnd: 20}}
							                            placeholder="0"
							                            value={cusET}
							                            autoCapitalize="none"
							                            autoCompleteType="off"
							                            autoCorrect={false}
							                            keyboardType="number-pad"
							                            onChangeText={(text) => setCusET(text)}
						                            />
                                                </View>
                                                <View style={{direction:'rtl',marginEnd: 20}}>
                                                    <Picker
							                            items = {customRecurType}
							                            value = {pickercustomRe}
							                            placeholder = "เลือกรูปแบบ"
							                            onValueChange = {(val) => cusTypesName(val)}
						                            />
                                                </View>
                                                
                                                <View style={{direction:'rtl',alignSelf:'center'}}>
                                                    <Text>ครั้ง</Text>
                                                </View>
                                            </View>
                                        ):null
                                    }
                                    <Button
                                        color = '#f1c40f'
                                        leftContent = {
                                            <Text style = {{color: 'white', fontWeight:'bold', direction:'ltr', alignItems: 'flex-start'}}>ถึงวันที่</Text>
                                        }
                                        rightContent ={
                                            <Text style = {{color: 'white', fontWeight:'bold', alignItems: 'flex-end' }}>{chooseDate}</Text>
                                        }
                                        onPress={showDatePicker}
                                        style={{
                                            justifyContent: 'space-between',
                                            marginTop: 10,
                                        }}
                                        // disabled={loading}
                                    />
            
                                    <DateTimePickerModal
                                        isVisible={isDatePickerVisible}
                                        mode="date"
                                        onConfirm={handleConfirm}
                                        onCancel={hideDatePicker}
                                      />
            
                                    </View>
								) : null
							}
						</View>


						<Text style={{ marginTop: 15, marginBottom: 0 }}>โน๊ต </Text>
						<TextInput
							containerStyle={{ marginTop: 15 }}
							placeholder="โน๊ต"
							value={noteB}
							autoCapitalize="none"
							autoCompleteType="off"
							autoCorrect={false}
							onChangeText={(text) => setnoteB(text)}
						/>

						<Button
                            color='#f1c40f'
							text={'บันทึก'}
							onPress={() => {
								submit();
							}}
							style={{
								marginTop: 20,
							}}
							// disabled={loading}
						/>

						<View
							style={{
								flexDirection: 'row',
								alignItems: 'center',
								marginTop: 15,
								justifyContent: 'center',
							}}
						>

						</View>
					</View>
				</ScrollView>
			</Layout>
		</KeyboardAvoidingView>
	);
}
