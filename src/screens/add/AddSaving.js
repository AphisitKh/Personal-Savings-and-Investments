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

import {dbcon, authcon} from '../../provider/firebase';
import savingToFB from './SavingToFB'
import savingIR from './SavingIR'
import upSavingToFB from '../update/upSavingToFB'

// var now = new Date().getTime();

export default function ({ navigation, route }) {
	const [now, setNowkey] = useState(Date.now());
	const [upDatetoFB, setUpDateToFB] = useState(route.params.edit);

	const [valueB, setValueB] = useState('');
	const [cusIR, setcusIR] = useState('');
	const [cusNB, setcusNB] = useState('');
	const [noteB, setnoteB] = useState('');

	const [increaseRate, setincreaseRate] = useState('');
	const [customincreaseRate, setcustomincreaseRate] = useState(null);
	const [pickerBanks, setpickerBanks] = useState(null);
	const [showCustom, setshowCustom] = useState(false);
	const [custombankName, setcustombankName] = useState(null);
	const [bankName, setbankName] = useState('');
	const banks = [
		{label: 'กรุงเทพ', value: 1},
		{label: 'กรุงไทย', value: 2},
		{label: 'กสิกรไทย', value: 3},
		{label: 'ไทยพาณิชย์', value: 4},
		{label: 'กรุงศรีอยุธยา', value: 5},
		{label: 'ทหารไทยธนชาต', value: 6},
		{label: 'ยูโอบี', value: 7},
		{label: 'ซีไอเอ็มบี ไทย', value: 8},
		{label: 'ธนชาต', value: 9},
		{label: 'ทิสโก้', value: 10},
		{label: 'เมกะ สากลพาณิชย์', value: 11},
		{label: 'เกียรตินาคินภัทร', value: 12},
		{label: 'แลนด์ แอนด์ เฮ้าส์ ', value: 13},
		{label: 'ไอซีบีซี (ไทย)', value: 14},
		{label: 'ไทยเครดิตเพื่อรายย่อย', value: 15},
		{label: 'แห่งประเทศจีน(ไทย)', value: 16},
		{label: 'อื่นๆ', value: 17},
		
	];

	const [pickerTypes, setpickerTypes] = useState(null);
	const [typeName, settypeName] = useState('');
	const Types = [
		{label: 'ออมทรัพย์', value: 1},
		{label: 'ฝากประจำ 3 เดือน', value: 2},
		{label: 'ฝากประจำ 6 เดือน', value: 3},
		{label: 'ฝากประจำ 12 เดือน', value: 4},
		{label: 'ฝากประจำ 24 เดือน', value: 5},
	];

	async function banksName(val){
		await setpickerBanks(val)
		if(val !== 17){
			await setshowCustom(false)
			await setcusIR('')
			await setcusNB('')
			await setbankName(banks.find(({value}) => value === val ).label)
		}else{
			await setbankName('')
			await setshowCustom(true)
		}
	}

	async function cusbanksName(text){
		await setcusNB(text)
		if(showCustom){
			await setbankName(text)
			// await console.log(bankName)
		}
	}

	function cusIncreaseRate(val){
		setcusIR(val)
		if(showCustom){
			setcustomincreaseRate(val)
		}
	}

	async function TypesName(val){
		await settypeName(Types.find(({value}) => value === val ).label)
		await setpickerTypes(val)
		// await switchincreaseRate(pickerBanks,pickerTypes)
	}


	function checkInput(){
		if(valueB === ''){
			Alert.alert('จำนวนเงิน', 'กรุณากรอกจำนวนเงิน')
		}else if(bankName === ''){
			Alert.alert('ธนาคาร', 'กรุณาเลือกธนาคาร')
		}else if(showCustom === true && bankName === ''){
			Alert.alert('ธนาคาร', 'กรุณาระบุชื่อธนาคาร')
		}else if(showCustom === true && customincreaseRate === ''){
			Alert.alert('ธนาคาร', 'กรุณาระบุอัตราดอกเบี้ย')
		}else if(typeName === ''){
			Alert.alert('ประเภท', 'กรุณาเลือกประเภท')
		}else{
			return true
		}
		return false
	}

	async function submit() {
		if(await checkInput()){
			let sir = await savingIR(pickerBanks,pickerTypes,customincreaseRate);
			let returnY = Number(valueB)*(Number(sir)*0.01)
			let valueY = Number(valueB) + returnY
			await setincreaseRate(sir);
			if(upDatetoFB === 0) {
				await savingToFB(valueB,bankName, pickerBanks, typeName, pickerTypes, sir, returnY, valueY, now,noteB);
			}else{
				await upSavingToFB(valueB,bankName, pickerBanks, typeName, pickerTypes, sir, returnY, valueY, upDatetoFB.id,noteB);
			}
			await navigation.navigate('Profile');
		}else{
			console.log(increaseRate)
		}
	}

	useMemo(()=>{
		if(upDatetoFB === 0 ){
			console.log('add mode');
		}else{
			// {edit: {id: editId, value: editValue, type: editType, rate: editRate, note: editNote}
			setValueB(upDatetoFB.value);
			setpickerBanks(upDatetoFB.bank);
			setpickerTypes(upDatetoFB.type);
			setnoteB(upDatetoFB.note);
			console.log(upDatetoFB.bank);
			console.log('edit mode');
			console.log(upDatetoFB.type);
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
						backgroundColor:'#4cd137'}}>

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
							เงินฝาก
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

						<Text style = {{paddingTop: 10 }}>จำนวนเงิน</Text>
						<TextInput
							containerStyle={{ marginTop: 15 }}
							placeholder="0"
                            rightContent={
                                <Text>{'\u0E3F'}</Text>
                            }
							value={valueB}
							autoCapitalize="none"
							autoCompleteType="off"
							autoCorrect={false}
							keyboardType="number-pad"
							onChangeText={(text) => setValueB(text)}
						/>
						<Text style={{ marginTop: 15, marginBottom: 15 }}>ธนาคาร </Text>
						<Picker
							items = {banks}
							value = {pickerBanks}
							placeholder = "เลือกธนาคาร"
							onValueChange={(val) => banksName(val)}
						/>
						<View>
							{
								showCustom ? 
								(
									<TextInput
										containerStyle={{ marginTop: 15 }}
										placeholder="ระบุชื่อธนาคาร"
										value={cusNB}
										autoCapitalize="none"
										autoCompleteType="off"
										autoCorrect={false}
										onChangeText={(text) => cusbanksName(text)}
									/>
								) : null
							}
						</View>
						<View>
							{
								showCustom ? 
								(
									<TextInput
										containerStyle={{ marginTop: 15 }}
										placeholder="ระบุอัตราดอกเบี้ย %"
										value={cusIR}
										autoCapitalize="none"
										autoCompleteType="off"
										autoCorrect={false}
										keyboardType="number-pad"
										onChangeText={(text) => cusIncreaseRate(text)}
									/>
								) : null
							}
						</View>


						<Text style={{ marginTop: 15, marginBottom: 15 }}>ประเภท </Text>
						<Picker
							items = {Types}
							value = {pickerTypes}
							placeholder = "เลือกประเภท"
							onValueChange={(val) => TypesName(val)}
						/>
						<Text style={{ marginTop: 15, marginBottom: 15 }}>โน๊ต </Text>
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
							color = '#4cd137'
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
