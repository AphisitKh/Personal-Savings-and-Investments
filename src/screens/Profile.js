import React, { useState, useEffect, useMemo} from 'react';
import { View, ScrollView, TouchableOpacity, Image, FlatList, StyleSheet, Alert} from 'react-native';
import { Layout, Text } from 'react-native-rapi-ui';
import { Icon } from 'react-native-elements'
import { VictoryBar, VictoryChart, VictoryTheme, VictoryPie } from "victory-native";
import Dialog, { DialogContent } from 'react-native-popup-dialog';


import getBond from './get/GetBond'
import getStock from './get/GetStock'
import getSaving from './get/GetSaving'
import getProperty from './get/GetProperty'
import getOther from './get/GetOther'
import getStockData from './add/GetStockData'
import updateStock from './update/updateStock'

import Moment from 'moment';
import reBondToFB from './remove/reBondToFB';
import reOtherToFB from './remove/reOtherToFB';
import rePropertyToFB from './remove/rePropertyToFB';
import reSavingToFB from './remove/reSavingToFB';
import reStockToFB from './remove/reStocksToFB';


// import ApexCharts  from 'apexcharts'

export default function ({ navigation }) {

	const [now, setNowkey] = useState(Date.now());

	const [itemStocks , setItemStocks] = useState([])
	const [itemBonds , setItemBonds] = useState([])
	const [itemSavings , setItemSavings] = useState([])
	const [itemProperty , setItemProperty] = useState([])
	const [itemOther , setItemOther] = useState([])

	const [stockData , setStockData] = useState([])
	
	const [showSaving, setShowSaving] = useState(false)
	const [showStock, setShowStock] = useState(false)
	const [showBond, setShowBond] = useState(false)
	const [showProPerty, setShowProperty] = useState(false)
	const [showOther, setShowOther] = useState(false)

	const [updateState, setUpdateState] = useState(true);

	const [totalSaving, setTotalSaving] = useState('')
	const [totalSavingR, setTotalSavingR] = useState('')

	const [totalStock, setTotalStock] = useState('')
	const [totalStockR, setTotalStockR] = useState('')

	const [totalBond, setTotalBond] = useState('')
	const [totalBondR, setTotalBondR] = useState('')

	const [totalProperty, setTotalProperty] = useState('')
	const [totalPropertyR, setTotalPropertyR] = useState('')

	const [totalOther, setTotalOther] = useState('')
	const [totalOtherR, setTotalOtherR] = useState('')

	const [totalAsset, setTotalAsset] = useState('')
	const [totalAssetR, setTotalAssetR] = useState('')

	const [visibleDialog, setVisibleDialog] = useState(false)

	const [updateType, setUpdateType] = useState(null)

	const [editType, setEditType] = useState(null)
	const [editId, setEditId] = useState(null)
	const [editName, setEditName] = useState(null)
	const [editValue, setEditValue] = useState(null)
	const [editBank, setEditBank] = useState(null)
	const [editAmount, setEditAmount] = useState(null)
	const [editRate, setEditRate] = useState(null)
	const [editNote, setEditNote] = useState(null)
	const [editDateEnd, setEditDateEnd] = useState(null)
	const [editReturnRate, setEditReturnRate] = useState(null)
	const [editRateType, setEditRateType] = useState(null)
	const [editTimes, setEditTimes] = useState(null)


	function switchShowSaving(){
		if(showSaving){
			setShowSaving(false)
		}else{
			setShowSaving(true)
		}
	}
	
	function switchShowStock(){
		if(showStock){
			setShowStock(false)
		}else{
			setShowStock(true)
		}
	}

	function switchShowBond(){
		if(showBond){
			setShowBond(false)
		}else{
			setShowBond(true)
		}
	}
	
	function switchShowProperty(){
		if(showProPerty){
			setShowProperty(false)
		}else{
			setShowProperty(true)
		}
	}

	function switchShowOther(){
		if(showOther){
			setShowOther(false)
		}else{
			setShowOther(true)
		}
	}

	function getDialogSaving(id, value, bank, type, rate, note){
		setEditId(id)
		setEditValue(value)
		setEditBank(bank)
		setEditType(type)
		setEditRate(rate)
		setEditNote(note)
		setUpdateType(1)
		setVisibleDialog(true)
	}

	function getDialogStock(id, name, amount, note){
		console.log(id, name, amount, note)
		setEditId(id)
		setEditName(name)
		setEditAmount(amount)
		setEditNote(note)
		setUpdateType(2)
		setVisibleDialog(true)
	}

	function getDialogBond(id, name, value, returnRate, dateEnd, note){
		console.log(id, name, value, returnRate, dateEnd, note)
		setEditId(id)
		setEditName(name)
		setEditValue(value)
		setEditReturnRate(returnRate)
		setEditDateEnd(Number(dateEnd))
		setEditNote(note)
		setUpdateType(3)
		setVisibleDialog(true)
	}

	function getDialogProperty(id, name, value, returnRate, times, amount, dateEnd, note){
		console.log(id, name, value, returnRate, dateEnd, note)
		setEditId(id)
		setEditName(name)
		setEditValue(value)
		setEditReturnRate(returnRate)
		setEditTimes(times)
		setEditAmount(amount)
		setEditDateEnd(dateEnd)
		setEditNote(note)
		setUpdateType(4)
		setVisibleDialog(true)
	}

	function getDialogOther(id, name, value, returnRate, rateType, times,dateEnd, note){
		console.log(id, name, value, returnRate, dateEnd, note)
		setEditId(id)
		setEditName(name)
		setEditValue(value)
		setEditReturnRate(returnRate)
		setEditRateType(rateType)
		setEditTimes(times)
		setEditDateEnd(dateEnd)
		setEditNote(note)
		setUpdateType(5)
		setVisibleDialog(true)
	}

	function editAndUpToFB(){
		if(updateType === 1){
			console.log('Edit Saving');
			navigation.navigate('AddSaving', {edit: {id: editId, value: editValue, bank: editBank, type: editType, rate: editRate, note: editNote}})
		}
		if(updateType === 2){
			console.log('Edit Stock');
			navigation.navigate('AddStocks', {edit: {id: editId, name: editName, amount: editAmount, note: editNote}})
		}
		if(updateType === 3){
			console.log('Edit Bond');
			navigation.navigate('AddBonds', {edit: {id: editId, name: editName, value: editValue, rate: editReturnRate, dateEnd: editDateEnd ,note: editNote}})
		}
		if(updateType === 4){
			console.log('Edit Property');
			navigation.navigate('AddProperty', {edit: {id: editId, name: editName, value: editValue, rate: editReturnRate, times: editTimes, amount: editAmount, dateEnd: editDateEnd ,note: editNote}})
		}
		if(updateType === 5){
			console.log('Edit Other');
			navigation.navigate('AddOther', {edit: {id: editId, name: editName, value: editValue, rate: editReturnRate, times: editTimes, amount: editAmount, dateEnd: editDateEnd ,note: editNote}})
		}
	}

	function removeItems(){
		if(updateType === 1){
			reSavingToFB(editId)
		}
		if(updateType === 2){
			reStockToFB(editId)		
		}
		if(updateType === 3){
			reBondToFB(editId)
		}
		if(updateType === 4){
			rePropertyToFB(editId)
		}
		if(updateType === 5){
			reOtherToFB(editId)
		}
	}

	function formatDateEnd(itemDate){
		if(itemDate !== 0){
			return Moment(itemDate).format('MMMM Do YYYY')
		}else{
			return 'ไม่มีกำหนด'
		}
	}

	function upStockPV(){
		itemStocks.forEach(obj =>{
			console.log(obj.id)
			if(obj.PV !== stockData.find(({name})=> name === obj.name).PV){
				obj.PV = stockData.find(({name})=> name === obj.name).PV
				obj.valueAll = (Number(obj.amount)*Number(obj.PV)).toFixed(2)
				obj.returnYear = obj.valueAll * (obj.rate * 0.01)
				obj.valueYear = Number(obj.valueAll) + Number(obj.returnYear)
				// console.log(obj.PV, obj.valueAll, obj.returnYear, obj.valueYear)
				updateStock(obj.id, obj.PV, obj.valueAll, Number(obj.returnYear).toFixed(2), Number(obj.valueYear).toFixed(2))
			}else{
				console.log('.....')
			}
		})
	}


	useEffect(()=>{
		let allValueSaving = 0
		let allReturnSaving = 0
		let allValueStock = 0
		let allReturnStock = 0
		let allValueBond = 0
		let allReturnBond = 0
		let allValueProperty = 0
		let allReturnProperty = 0
		let allValueOther = 0
		let allReturnOther = 0
		let allValueAsset = 0
		let allReturnAsset = 0
		setItemStocks(getStock())
		setItemBonds(getBond())
		setItemSavings(getSaving())
		setItemProperty(getProperty())
		setItemOther(getOther())
		setStockData(getStockData())
		upStockPV()

		itemSavings.forEach(obj => {
			allValueSaving += Number(obj.value)
			allReturnSaving += Number(obj.returnYear)
			allValueAsset += Number(obj.value)
			allReturnAsset += Number(obj.returnYear)
		})

		itemStocks.forEach(obj => {
			allValueStock += Number(obj.valueAll)
			allReturnStock += Number(obj.returnYear)
			allValueAsset += Number(obj.valueAll)
			allReturnAsset += Number(obj.returnYear)
		})

		itemBonds.forEach(obj => {
			if(Number(obj.dateEnd) !== 0){
				if(Number(obj.dateEnd) < Number(now)){
					reBondToFB(obj.id)
				}else{
				allValueBond += Number(obj.value)
				allReturnBond += Number(obj.returnYear)
				allValueAsset += Number(obj.value)
				allReturnAsset += Number(obj.returnYear)
				}
			}else{
				allValueBond += Number(obj.value)
				allReturnBond += Number(obj.returnYear)
				allValueAsset += Number(obj.value)
				allReturnAsset += Number(obj.returnYear)
			}
		})

		itemProperty.forEach(obj => {
			if(Number(obj.dateEnd) !== 0){
				if(Number(obj.dateEnd) < Number(now)){
					rePropertyToFB(obj.id)
				}else{
					allValueProperty += Number(obj.value)
					allReturnProperty += Number(obj.returnYear)
					allValueAsset += Number(obj.value)
					allReturnAsset += Number(obj.returnYear)
				}
			}else{
				allValueProperty += Number(obj.value)
				allReturnProperty += Number(obj.returnYear)
				allValueAsset += Number(obj.value)
				allReturnAsset += Number(obj.returnYear)
			}
		})

		itemOther.forEach(obj => {
			if(Number(obj.dateEnd) !== 0){
				if(Number(obj.dateEnd) < Number(now)){
					reOtherToFB(obj.id)
				}else{
					allValueOther += Number(obj.value)
					allReturnOther += Number(obj.returnYear)
					allValueAsset += Number(obj.value)
					allReturnAsset += Number(obj.returnYear)
				}

			}else{
				allValueOther += Number(obj.value)
				allReturnOther += Number(obj.returnYear)
				allValueAsset += Number(obj.value)
				allReturnAsset += Number(obj.returnYear)
			}
		})

		setTotalSaving(allValueSaving.toFixed(2))
		setTotalSavingR(allReturnSaving.toFixed(2))

		setTotalStock(allValueStock.toFixed(2))
		setTotalStockR(allReturnStock.toFixed(2))
		
		setTotalBond(allValueBond.toFixed(2))
		setTotalBondR(allReturnBond.toFixed(2))

		setTotalProperty(allValueProperty.toFixed(2))
		setTotalPropertyR(allReturnProperty.toFixed(2))

		setTotalOther(allValueOther.toFixed(2))
		setTotalOtherR(allReturnOther.toFixed(2))

		setTotalAsset(allValueAsset.toFixed(2))
		setTotalAssetR(allReturnAsset.toFixed(2))

		console.log(totalSaving)
		console.log(allValueStock)

		setTimeout(() => {
			if(updateState !== null)
			{
				if(updateState){
					setUpdateState(false)
					console.log('------------after 5s refresh')
				}else{
					setUpdateState(true)
					console.log('------------after 5s refresh')
				}
			}else{
				console.log(updateState);
				console.log('clean up');
			}
		}, 5000);
	},[updateState]);

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
			</View>
			<View
				style={{
					flex: 1,
					alignItems: 'flex-start',
					justifyContent: 'center',
				}}
			>
      			<View style={styles.containerChart}>
					<View style = {{alignItems:'center'}}>
					<VictoryPie
						width={150}
						height={150}
						colorScale={["#4cd137", "#3366FF", "#e67e22", "#f1c40f", "#636e72" ]}
						labels={({ datum }) => ``}
						padding={40}
  						innerRadius={50}
  						data={[
							{ x: 'saving', y: Number(totalSaving) },
							{ x: 'stock', y: Number(totalStock) },
							{ x: 'bond', y: Number(totalBond) },
							{ x: 'property', y: Number(totalProperty) },
							{ x: 'other', y: Number(totalOther) }
						  ]}
					/>
					<Text>กราฟสินทรัพย์</Text>
					</View>
					<View style = {{alignItems:'flex-end'}}>
						<View style ={{flexDirection:'row'}}>
							<Icon
                				size={25}
                				name='stop'
                				color='#4cd137'
							/>
							<Text>saving: {(((Number(totalSaving)/Number(totalAsset)))*100).toFixed(2)} %</Text>
						</View>
						<View style ={{flexDirection:'row'}}>
							<Icon
                				size={25}
                				name='stop'
                				color='#3366FF'
							/>
							<Text>stock: {(((Number(totalStock)/Number(totalAsset)))*100).toFixed(2)} %</Text>
						</View>
						<View style ={{flexDirection:'row'}}>
							<Icon
                				size={25}
                				name='stop'
                				color='#e67e22'
							/>
							<Text>bond: {(((Number(totalBond)/Number(totalAsset)))*100).toFixed(2)} %</Text>
						</View>
						<View style ={{flexDirection:'row'}}>
							<Icon
                				size={25}
                				name='stop'
                				color='#f1c40f'
							/>
							<Text>property: {(((Number(totalProperty)/Number(totalAsset)))*100).toFixed(2)} %</Text>
						</View>
						<View style ={{flexDirection:'row'}}>
							<Icon
                				size={25}
                				name='stop'
                				color='#636e72'
							/>
							<Text>other: {(((Number(totalOther)/Number(totalAsset)))*100).toFixed(2)} %</Text>
						</View>
					</View>					  
      			</View>

      			<View style={styles.containerChart}>
					<View style = {{alignItems:'center'}}>
					<VictoryPie
						width={150}
						height={150}
						colorScale={["#4cd137", "#3366FF", "#e67e22", "#f1c40f", "#636e72" ]}
						labels={({ datum }) => ``}
						padding={40}
  						innerRadius={50}
  						data={[
							{ x: 'saving', y: Number(totalSavingR) },
							{ x: 'stock', y: Number(totalStockR) },
							{ x: 'bond', y: Number(totalBondR) },
							{ x: 'property', y: Number(totalPropertyR) },
							{ x: 'other', y: Number(totalOtherR) }
						  ]}
					/>
					<Text>กราฟรายได้จากสินทรัพย์</Text>
					</View>
					<View style = {{alignItems:'flex-end'}}>
						<View style ={{flexDirection:'row'}}>
							<Icon
                				size={25}
                				name='stop'
                				color='#4cd137'
							/>
							<Text>saving: {(((Number(totalSavingR)/Number(totalAssetR)))*100).toFixed(2)} %</Text>
						</View>
						<View style ={{flexDirection:'row'}}>
							<Icon
                				size={25}
                				name='stop'
                				color='#3366FF'
							/>
							<Text>stock: {(((Number(totalStockR)/Number(totalAssetR)))*100).toFixed(2)} %</Text>
						</View>
						<View style ={{flexDirection:'row'}}>
							<Icon
                				size={25}
                				name='stop'
                				color='#e67e22'
							/>
							<Text>bond: {(((Number(totalBondR)/Number(totalAssetR)))*100).toFixed(2)} %</Text>
						</View>
						<View style ={{flexDirection:'row'}}>
							<Icon
                				size={25}
                				name='stop'
                				color='#f1c40f'
							/>
							<Text>property: {(((Number(totalPropertyR)/Number(totalAssetR)))*100).toFixed(2)} %</Text>
						</View>
						<View style ={{flexDirection:'row'}}>
							<Icon
                				size={25}
                				name='stop'
                				color='#636e72'
							/>
							<Text>other: {(((Number(totalOtherR)/Number(totalAssetR)))*100).toFixed(2)} %</Text>
						</View>
					</View>					  
      			</View>

			</View>
			
			<View>
				<TouchableOpacity style={{
					flex: 1,
					alignItems: 'flex-start',
					justifyContent: 'center',
					backgroundColor: '#4cd137'
				}}
					onPress={()=> switchShowSaving()}>
					<Text style = {{color:'white'}}>Saving {totalSaving} บาท {'\n'}รายได้โดยรวมต่อปี {totalSavingR} บาท</Text>
				</TouchableOpacity>
				{showSaving ? (

				<View>
					<FlatList
						style={styles.flatListContainer}
						data={itemSavings}
						keyExtractor={(item, index)=> index.toString()}
						renderItem={({item})=>(
							<View style={styles.container}>
								<View style = {{flexDirection:'row', justifyContent: 'space-between',}}>

								<Text>จำนวนเงิน {item.value}</Text>
								<TouchableOpacity style={{
									backgroundColor: '',
									justifyContent: "center" ,
									flexDirection: 'column', 
									alignSelf: 'flex-end',
                					color: '#fff',
									top: '0%',  
									}} onPress={() => {
										getDialogSaving(item.id, item.value, item.bankNo, item.typeNo, item.rate, item.note)
										console.log('Edit Saving');
									}}>
                					<Icon
                						size={25}
                						name='more-vert'
                						color='#535353' 
									/>
              					</TouchableOpacity>
								</View>
								<Text>ธนาคาร {item.bank}</Text>
								<Text>รูปแบบการฝาก {item.type}</Text>
								<Text>อัตราดอกเบี้ย {item.rate}</Text>
								<Text>ดอกเบี้ยที่ได้ต่อปี {item.returnYear}</Text>
								<Text>โน๊ต {item.note}</Text>
							</View>
						)}
					/>
				</View>

				):null }
			</View>
			
			<View>
				<TouchableOpacity style={{
					flex: 1,
					alignItems: 'flex-start',
					justifyContent: 'center',
					backgroundColor: '#3366FF'
				}}
					onPress={()=> switchShowStock()}>
					<Text style = {{color:'white'}}>Stock {totalStock} บาท {'\n'}รายได้โดยรวมต่อปี {totalStockR} บาท</Text>
				</TouchableOpacity>
				
				{showStock ? (

				<View>
					<FlatList
						style={styles.flatListContainer}
						data={itemStocks}
						keyExtractor={(item, index)=> index.toString()}
						renderItem={({item})=>(
							<View style={styles.container}>
								<View style = {{flexDirection:'row', justifyContent: 'space-between',}}>

								<Text style = {{alignSelf:'flex-start'}}>ชื่อ {item.name}</Text>
	
								<TouchableOpacity style={{
									backgroundColor: '',
									justifyContent: "center" ,
									flexDirection: 'column', 
									alignSelf: 'flex-end',
                					color: '#fff',
									top: '0%',  
									}} onPress={() => {
										getDialogStock(item.id,item.name,item.amount,item.note)
										console.log('Edit Stock');
									}}>
                					<Icon
                						size={25}
                						name='more-vert'
                						color='#535353' 
									/>
              					</TouchableOpacity>

								</View>
								<Text>ราคาต่อหน่วย {item.PV}</Text>
								<Text>จำนวน {item.amount}</Text>
								<Text>มูลค่าโดยรวม {item.valueAll}</Text>
								<Text>อัตราผลตอบแทน {item.rate} %</Text>
								<Text>ผลตอบแทนที่ได้ {item.returnYear} บาท/ปี</Text>
								<Text>โน๊ต {item.note}</Text>
								<Text></Text>
							</View>
						)}
					/>
				</View>

				):null }
			</View>
			
			<View>
				<TouchableOpacity style={{
					flex: 1,
					alignItems: 'flex-start',
					justifyContent: 'center',
					backgroundColor: '#e67e22'
				}}
					onPress={()=> switchShowBond()}>
					<Text style = {{color:'white'}}>Bond {totalBond} บาท {'\n'}รายได้โดยรวมต่อปี {totalBondR} บาท</Text>
				</TouchableOpacity>
				
				{showBond ? (

				<View>
					<FlatList
						style={styles.flatListContainer}
						data={itemBonds}
						keyExtractor={(item, index)=> index.toString()}
						renderItem={({item})=>(
							<View style={styles.container}>
								<View style = {{flexDirection:'row', justifyContent: 'space-between',}}>

								<Text style = {{alignSelf:'flex-start'}}>ชื่อ {item.name}</Text>
	
								<TouchableOpacity style={{
									backgroundColor: '',
									justifyContent: "center" ,
									flexDirection: 'column', 
									alignSelf: 'flex-end',
                					color: '#fff',
									top: '0%',  
									}} onPress={() => {
										getDialogBond(item.id,item.name,item.value,item.returnRate,item.dateEnd,item.note)
										console.log('Edit Bond');
									}}>
                					<Icon
                						size={25}
                						name='more-vert'
                						color='#535353' 
									/>
              					</TouchableOpacity>

								</View>
								<Text>มูลค่า {item.value}</Text>
								<Text>อัตราผลตอบแทน {item.returnRateName}</Text>
								<Text>ผลตอบแทนที่ได้ {item.returnYear} บาท/ปี</Text>
								<Text>หมดอายุ {formatDateEnd(item.dateEnd)}</Text>
								<Text>โน๊ต {item.note}</Text>
								<Text></Text>
							</View>
						)}
					/>
				</View>

				):null }
			</View>

			
			<View>
				<TouchableOpacity style={{
					flex: 1,
					alignItems: 'flex-start',
					justifyContent: 'center',
					backgroundColor: '#f1c40f',
				}}
					onPress={()=> switchShowProperty()}>
					<Text style = {{color:'white'}}>Property {totalProperty} บาท {'\n'}รายได้โดยรวมต่อปี {totalPropertyR} บาท</Text>
				</TouchableOpacity>
				
				{showProPerty ? (

				<View>
					<FlatList
						style={styles.flatListContainer}
						data={itemProperty}
						keyExtractor={(item, index)=> index.toString()}
						renderItem={({item})=>(
							<View style={styles.container}>
								<View style = {{flexDirection:'row', justifyContent: 'space-between',}}>

								<Text style = {{alignSelf:'flex-start'}}>ชื่อ {item.name}</Text>
	
								<TouchableOpacity style={{
									backgroundColor: '',
									justifyContent: "center" ,
									flexDirection: 'column', 
									alignSelf: 'flex-end',
                					color: '#fff',
									top: '0%',  
									}} onPress={() => { 
										getDialogProperty(item.id,item.name,item.value,item.returnRate, item.everyTimeD, item.amountReturn,item.dateEnd,item.note)
										console.log('edit Property');
									}}>
                					<Icon
                						size={25}
                						name='more-vert'
                						color='#535353' 
									/>
              					</TouchableOpacity>

								</View>
								<Text>มูลค่า {item.value}</Text>
								<Text>อัตราผลตอบแทน {item.returnRateName}</Text>
								<Text>ผลตอบแทนที่ได้ {item.returnYear} บาท/ปี</Text>
								<Text>หมดอายุ {formatDateEnd(item.dateEnd)}</Text>
								<Text>โน๊ต {item.note}</Text>
								<Text></Text>
							</View>
						)}
					/>
				</View>

				):null }
			</View>

			
			<View>
				<TouchableOpacity style={{
					flex: 1,
					alignItems: 'flex-start',
					justifyContent: 'center',
					backgroundColor: '#636e72'
				}}
					onPress={()=> switchShowOther()}>
					<Text style = {{color:'white'}}>Other {totalOther} บาท {'\n'}รายได้โดยรวมต่อปี {totalOtherR} บาท</Text>
				</TouchableOpacity>
				
				{showOther ? (

				<View>
					<FlatList
						style={styles.flatListContainer}
						data={itemOther}
						keyExtractor={(item, index)=> index.toString()}
						renderItem={({item})=>(
							<View style={styles.container}>
								<View style = {{flexDirection:'row', justifyContent: 'space-between',}}>

								<Text style = {{alignSelf:'flex-start'}}>ชื่อ {item.name}</Text>
	
								<TouchableOpacity style={{
									backgroundColor: '',
									justifyContent: "center" ,
									flexDirection: 'column', 
									alignSelf: 'flex-end',
                					color: '#fff',
									top: '0%',  
									}} onPress={() => {
										getDialogOther(item.id,item.name,item.value,item.returnRate,item.rateType,item.everyTimeD ,item.dateEnd,item.note)
										console.log('Edit Other');
									}}>
                					<Icon
                						size={25}
                						name='more-vert'
                						color='#535353' 
									/>
              					</TouchableOpacity>

								</View>
								<Text>มูลค่า {item.value}</Text>
								<Text>อัตราผลตอบแทน {item.returnRateName}</Text>
								<Text>ผลตอบแทนที่ได้ {item.returnYear} บาท/ปี</Text>
								<Text>หมดอายุ {formatDateEnd(item.dateEnd)}</Text>
								<Text>โน๊ต {item.note}</Text>
								<Text></Text>
							</View>
						)}
					/>
				</View>

				):null }
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
							setUpdateType(null)
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
											removeItems();
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
			}} onPress={() => {
					setUpdateState(null)
					navigation.navigate('SecondScreen')
					}
				}>
      			<Image style={{ width: 60, height: 60, margin: 5 }} source={require('../../assets/add.png')} />
    		</TouchableOpacity>
		</Layout>
	);
}

const styles = StyleSheet.create({
	container: {
		marginTop: 10,
		marginLeft: 10,
	},
	containerChart: {
		flex: 1,
		marginTop: 10,
		marginBottom: 10,
		marginHorizontal: 10,
		marginLeft: 10,
		marginRight: 10,
		justifyContent: 'space-between',
		alignItems: "center",
		backgroundColor: "#ffffff",
		flexDirection: 'row',
		width: '95%',shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		
		elevation: 5,
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
