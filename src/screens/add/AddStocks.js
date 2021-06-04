import React, { useState, useEffect, useMemo } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
	ScrollView,
	TouchableOpacity,
	View,
	KeyboardAvoidingView,
	Image,
	TopNav,
	theme,
	SafeAreaView,
	LogBox,
	Alert
} from 'react-native';
import * as firebase from 'firebase';
import { Ionicons } from '@expo/vector-icons';
import { Layout, Text, TextInput, Button, Picker} from 'react-native-rapi-ui';
import Autocomplete from 'react-native-dropdown-autocomplete-textinput';
import dataStock from './dataBPVToFB'
import getStockData from './GetStockData'
import stockToFB from './StocksToFB'
import upStockToFB from '../update/upStocksToFB'

LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();


export default function ({ navigation, route}) {

	const [now, setNowkey] = useState(Date.now());
	const [upDatetoFB, setUpDateToFB] = useState(route.params.edit);
	const [holdStock, setHoldStock] = useState(null)

	const [noteB, setnoteB] = useState('');

	const [valueS, setValueS] = useState('');
	const [stockPV, setStockPV] = useState('');
	const [stockA, setStockA] = useState('');
	const [stockR, setStockR] = useState('');
	const [increaseRate, setincreaseRate] = useState('');
	const [getStock , setGetStock] = useState(getStockData())

	const [addStockName, setAddStockName] = useState('')
	const [scroll, setScroll] = useState(true)


	const stocksN = [
		{
		  "id": 1,
		  "name": "ADVANC",
		  "rate": 4.08
		},
		{
		  "id": 2,
		  "name": "AOT",
		  "rate": 0.31
		},
		{
		  "id": 3,
		  "name": "AWC",
		  "rate": 0.27
		},
		{
		  "id": 4,
		  "name": "BAM",
		  "rate": 2.79
		},
		{
		  "id": 5,
		  "name": "BBL",
		  "rate": 2.18
		},
		{
		  "id": 6,
		  "name": "BDMS",
		  "rate": 2.62
		},
		{
		  "id": 7,
		  "name": "BEM",
		  "rate": 1.32
		},
		{
		  "id": 8,
		  "name": "BGRIM",
		  "rate": 1.12
		},
		{
		  "id": 9,
		  "name": "BH",
		  "rate": 2.44
		},
		{
		  "id": 10,
		  "name": "BJC",
		  "rate": 2.29
		},
		{
		  "id": 11,
		  "name": "BTS",
		  "rate": 5.58
		},
		{
		  "id": 12,
		  "name": "CBG",
		  "rate": 1.89
		},
		{
		  "id": 13,
		  "name": "COM7",
		  "rate": 1.41
		},
		{
		  "id": 14,
		  "name": "CPALL",
		  "rate": 1.57
		},
		{
		  "id": 15,
		  "name": "CPF",
		  "rate": 3.72
		},
		{
		  "id": 16,
		  "name": "CPN",
		  "rate": 1.46
		},
		{
		  "id": 17,
		  "name": "CRC",
		  "rate": 1.25
		},
		{
		  "id": 18,
		  "name": "DELTA",
		  "rate": 0.66
		},
		{
		  "id": 19,
		  "name": "DTAC",
		  "rate": 9.72
		},
		{
		  "id": 20,
		  "name": "EA",
		  "rate": 0.51
		},
		{
		  "id": 21,
		  "name": "EGCO",
		  "rate": 3.85
		},
		{
		  "id": 22,
		  "name": "GLOBAL",
		  "rate": 0.82
		},
		{
		  "id": 23,
		  "name": "GPSC",
		  "rate": 2.2
		},
		{
		  "id": 24,
		  "name": "GULF",
		  "rate": 1.16
		},
		{
		  "id": 25,
		  "name": "HMPRO",
		  "rate": 2.17
		},
		{
		  "id": 26,
		  "name": "INTUCH",
		  "rate": 3.89
		},
		{
		  "id": 27,
		  "name": "IVL",
		  "rate": 1.58
		},
		{
		  "id": 28,
		  "name": "KBANK",
		  "rate": 2.11
		},
		{
		  "id": 29,
		  "name": "KTB",
		  "rate": 2.57
		},
		{
		  "id": 30,
		  "name": "KTC",
		  "rate": 1.14
		},
		{
		  "id": 31,
		  "name": "LH",
		  "rate": 6.41
		},
		{
		  "id": 32,
		  "name": "MINT",
		  "rate": 1.11
		},
		{
		  "id": 33,
		  "name": "MTC",
		  "rate": 0.62
		},
		{
		  "id": 34,
		  "name": "OR",
		  "rate": 0.33
		},
		{
		  "id": 35,
		  "name": "OSP",
		  "rate": 2.99
		},
		{
		  "id": 36,
		  "name": "PTT",
		  "rate": 2.61
		},
		{
		  "id": 37,
		  "name": "PTTEP",
		  "rate": 3.63
		},
		{
		  "id": 38,
		  "name": "PTTGC",
		  "rate": 1.56
		},
		{
		  "id": 39,
		  "name": "RATCH",
		  "rate": 4.82
		},
		{
		  "id": 40,
		  "name": "SAWAD",
		  "rate": 2.45
		},
		{
		  "id": 41,
		  "name": "SCB",
		  "rate": 2.29
		},
		{
		  "id": 42,
		  "name": "SCC",
		  "rate": 3.23
		},
		{
		  "id": 43,
		  "name": "SCGP",
		  "rate": 0.78
		},
		{
		  "id": 44,
		  "name": "TISCO",
		  "rate": 7.18
		},
		{
		  "id": 45,
		  "name": "TOA",
		  "rate": 1.49
		},
		{
		  "id": 46,
		  "name": "TOP",
		  "rate": 1.25
		},
		{
		  "id": 47,
		  "name": "TRUE",
		  "rate": 2.27
		},
		{
		  "id": 48,
		  "name": "TTB",
		  "rate": 4.02
		},
		{
		  "id": 49,
		  "name": "TU",
		  "rate": 4.11
		},
		{
		  "id": 50,
		  "name": "VGI",
		  "rate": 1.01
		}
	   ];

	const stocksData = [
		{
		  "id": 1,
		  "name": "ADVANC",
		  "rate": 4.08,
		  "PV": 171
		},
		{
		  "id": 2,
		  "name": "AOT",
		  "rate": 0.31,
		  "PV": 64.5
		},
		{
		  "id": 3,
		  "name": "AWC",
		  "rate": 0.27,
		  "PV": 4.82
		},
		{
		  "id": 4,
		  "name": "BAM",
		  "rate": 2.79,
		  "PV": 18.9
		},
		{
		  "id": 5,
		  "name": "BBL",
		  "rate": 2.18,
		  "PV": 115.5
		},
		{
		  "id": 6,
		  "name": "BDMS",
		  "rate": 2.62,
		  "PV": 21.8
		},
		{
		  "id": 7,
		  "name": "BEM",
		  "rate": 1.32,
		  "PV": 8.2
		},
		{
		  "id": 8,
		  "name": "BGRIM",
		  "rate": 1.12,
		  "PV": 44.75
		},
		{
		  "id": 9,
		  "name": "BH",
		  "rate": 2.44,
		  "PV": 132
		},
		{
		  "id": 10,
		  "name": "BJC",
		  "rate": 2.29,
		  "PV": 35.25
		},
		{
		  "id": 11,
		  "name": "BTS",
		  "rate": 5.58,
		  "PV": 9.5
		},
		{
		  "id": 12,
		  "name": "CBG",
		  "rate": 1.89,
		  "PV": 130.5
		},
		{
		  "id": 13,
		  "name": "COM7",
		  "rate": 1.41,
		  "PV": 71
		},
		{
		  "id": 14,
		  "name": "CPALL",
		  "rate": 1.57,
		  "PV": 60
		},
		{
		  "id": 15,
		  "name": "CPF",
		  "rate": 3.72,
		  "PV": 27.25
		},
		{
		  "id": 16,
		  "name": "CPN",
		  "rate": 1.46,
		  "PV": 52.25
		},
		{
		  "id": 17,
		  "name": "CRC",
		  "rate": 1.25,
		  "PV": 35.75
		},
		{
		  "id": 18,
		  "name": "DELTA",
		  "rate": 0.66,
		  "PV": 574
		},
		{
		  "id": 19,
		  "name": "DTAC",
		  "rate": 9.72,
		  "PV": 31.5
		},
		{
		  "id": 20,
		  "name": "EA",
		  "rate": 0.51,
		  "PV": 61.25
		},
		{
		  "id": 21,
		  "name": "EGCO",
		  "rate": 3.85,
		  "PV": 177
		},
		{
		  "id": 22,
		  "name": "GLOBAL",
		  "rate": 0.82,
		  "PV": 21.7
		},
		{
		  "id": 23,
		  "name": "GPSC",
		  "rate": 2.2,
		  "PV": 76.5
		},
		{
		  "id": 24,
		  "name": "GULF",
		  "rate": 1.16,
		  "PV": 35
		},
		{
		  "id": 25,
		  "name": "HMPRO",
		  "rate": 2.17,
		  "PV": 13.9
		},
		{
		  "id": 26,
		  "name": "INTUCH",
		  "rate": 3.89,
		  "PV": 64.5
		},
		{
		  "id": 27,
		  "name": "IVL",
		  "rate": 1.58,
		  "PV": 47
		},
		{
		  "id": 28,
		  "name": "KBANK",
		  "rate": 2.11,
		  "PV": 119.5
		},
		{
		  "id": 29,
		  "name": "KTB",
		  "rate": 2.57,
		  "PV": 10.9
		},
		{
		  "id": 30,
		  "name": "KTC",
		  "rate": 1.14,
		  "PV": 74
		},
		{
		  "id": 31,
		  "name": "LH",
		  "rate": 6.41,
		  "PV": 8.15
		},
		{
		  "id": 32,
		  "name": "MINT",
		  "rate": 1.11,
		  "PV": 32.25
		},
		{
		  "id": 33,
		  "name": "MTC",
		  "rate": 0.62,
		  "PV": 62.5
		},
		{
		  "id": 34,
		  "name": "OR",
		  "rate": 0.33,
		  "PV": 31.25
		},
		{
		  "id": 35,
		  "name": "OSP",
		  "rate": 2.99,
		  "PV": 37.5
		},
		{
		  "id": 36,
		  "name": "PTT",
		  "rate": 2.61,
		  "PV": 41.5
		},
		{
		  "id": 37,
		  "name": "PTTEP",
		  "rate": 3.63,
		  "PV": 120.5
		},
		{
		  "id": 38,
		  "name": "PTTGC",
		  "rate": 1.56,
		  "PV": 64
		},
		{
		  "id": 39,
		  "name": "RATCH",
		  "rate": 4.82,
		  "PV": 51.75
		},
		{
		  "id": 40,
		  "name": "SAWAD",
		  "rate": 2.45,
		  "PV": 75.75
		},
		{
		  "id": 41,
		  "name": "SCB",
		  "rate": 2.29,
		  "PV": 103.5
		},
		{
		  "id": 42,
		  "name": "SCC",
		  "rate": 3.23,
		  "PV": 438
		},
		{
		  "id": 43,
		  "name": "SCGP",
		  "rate": 0.78,
		  "PV": 55.75
		},
		{
		  "id": 44,
		  "name": "TISCO",
		  "rate": 7.18,
		  "PV": 89.75
		},
		{
		  "id": 45,
		  "name": "TOA",
		  "rate": 1.49,
		  "PV": 37.25
		},
		{
		  "id": 46,
		  "name": "TOP",
		  "rate": 1.25,
		  "PV": 60
		},
		{
		  "id": 47,
		  "name": "TRUE",
		  "rate": 2.27,
		  "PV": 3.16
		},
		{
		  "id": 48,
		  "name": "TTB",
		  "rate": 4.02,
		  "PV": 1.15
		},
		{
		  "id": 49,
		  "name": "TU",
		  "rate": 4.11,
		  "PV": 17.9
		},
		{
		  "id": 50,
		  "name": "VGI",
		  "rate": 1.01,
		  "PV": 6.4
		}
	   ];
	
	function userStockData(name, rate, pv){
		setAddStockName(name);
		setStockR(rate);
		setStockPV(pv);
		console.log(name, pv, rate)
	}

	function checkInput(){
		if(addStockName === ''){
			Alert.alert('ชื่อ', 'กรุณาเลือกชื่อหุ้นที่ต้องการ')
		}else if(stockA === ''){
			Alert.alert('จำนวน', 'กรุณากรอกจำนวนหุ้น')
		}else{
			return true
		}
		return false
	}


	// useEffect(()=>{
	// 	stocksData.forEach(obj => {
	// 		dataStock(obj.id,obj.name,obj.rate,obj.PV)
	// 	})
	// },[])

	useEffect(()=>{
		console.log(getStock)
	},[])


	async function submit() {
		if(checkInput()){
			let valueAll = Number(stockA)*Number(stockPV)
			//FV = PV x ( 1 + i ) ^ n
			let finalV = Number(valueAll) * (1+(Number(stockR)*0.01))
			let returnY = finalV - valueAll
			if(upDatetoFB === 0){
				stockToFB(addStockName, stockR, stockPV, stockA, valueAll.toFixed(2), returnY.toFixed(2), finalV.toFixed(2), now, noteB)
			}else{
				upStockToFB(addStockName, stockR, stockPV, stockA, valueAll.toFixed(2), returnY.toFixed(2), finalV.toFixed(2), upDatetoFB.id, noteB)
			}
			// console.log(valueAll, finalV);
			console.log(true)
			await navigation.navigate('Profile');

		}else{
			console.log(false)
		}
	}

	useMemo(()=>{
		if(upDatetoFB === 0 ){
			console.log('add mode');
		}else{
			setHoldStock(upDatetoFB.name)
			setStockA(upDatetoFB.amount)
			setnoteB(upDatetoFB.noteB)
			console.log('edit mode');
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
						backgroundColor:'#3366FF'}}>

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
							หุ้น
					</Text>
					<Text style = {{alignSelf: 'center'}}>         </Text>
				</View>
				{/* <ScrollView
					onKeyboardDidShow={() => setScroll(false)}
					onKeyboardDidHide={() => setScroll(true)}
					scrollEnabled={scroll}
					keyboardShouldPersistTaps="handled"
					contentContainerStyle={{
						flexGrow: 1,
					}}
				> */}
					<View

						style={{
							flex: 3,
							paddingHorizontal: 20,
							paddingBottom: 20,
							backgroundColor: '#ffffff',
						}}
					>
						<Text style = {{paddingTop: 15 }}>ชื่อ</Text>

						<Autocomplete
              				data={getStock}
							placeholder={holdStock}
              				displayKey="name"
              				isMandatory={false}
							height={'180%'}
							maxHeight ={200}
							textInputStyle={{marginBottom: 15}}
              				onSelect={value => userStockData(value.name, value.rate, value.PV)}
            			/>

						<Text style = {{paddingTop: 15 }}>จำนวนหุ้น</Text>
						<TextInput
							containerStyle={{ marginTop: 15 }}
							placeholder="0"
							value={stockA}
							autoCapitalize="none"
							autoCompleteType="off"
							autoCorrect={false}
							keyboardType="number-pad"
							onChangeText={(text) => setStockA(text)}
						/>

						<Text style={{ marginTop: 15,}}>โน๊ต </Text>
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
							text={'บันทึก'}
							onPress={() => {
								submit();
							}}
							style={{
								marginTop: 20,
							}}
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
				{/* </ScrollView> */}
			</Layout>
		</KeyboardAvoidingView>
	);
}
