import React, {useState, useEffect, useMemo} from 'react';
import { View, Linking , ImageBackground} from 'react-native';
import * as firebase from 'firebase';
import {
	Layout,
	Button,
	Text,
	TopNav,
	Section,
	SectionContent,
	TouchableOpacity
} from 'react-native-rapi-ui';


import { Icon, Tooltip } from 'react-native-elements'

import {dbcon,authcon} from '../provider/firebase';

import getBond from './get/GetBond'
import getStock from './get/GetStock'
import getSaving from './get/GetSaving'
import getProperty from './get/GetProperty'
import getOther from './get/GetOther'
import getExpenses from './get/GetExpenses'


export default function ({ navigation }) {

	const [itemStocks , setItemStocks] = useState([])
	const [itemBonds , setItemBonds] = useState([])
	const [itemSavings , setItemSavings] = useState([])
	const [itemProperty , setItemProperty] = useState([])
	const [itemOther , setItemOther] = useState([])
	const [itemExpend, setItemExpend] = useState([])

	const [tottalExpend, setTottalExpand] = useState('')
	const [tottalAssetV, setTottalAssetV] = useState('')
	const [tottalreturnY, setTottalReturnY] = useState('')

	const [wealthRate, setWealthRate] = useState('')
	const [updateState, setUpdateState] = useState(true);

	const [gBgC, setGBgC] = useState(true)
	const [yBgC, setYBgC] = useState(false)
	const [rBgC, setRBgC] = useState(false)

	function changeColor(wRate){
		if(wRate < 0.5){
			setGBgC(false)
			setYBgC(false)
			setRBgC(true)
		}else if(wRate >=0.5 && wRate < 1){
			setGBgC(false)
			setYBgC(true)
			setRBgC(false)
		}else{
			setGBgC(true)
			setYBgC(false)
			setRBgC(false)
		}
	}
	

	useEffect(()=>{
		let sumExpend = 0
		let allValueAsset = 0
		let allReturnY = 0
		let wRate = 0
		setItemStocks(getStock())
		setItemBonds(getBond())
		setItemSavings(getSaving())
		setItemProperty(getProperty())
		setItemOther(getOther())
		setItemExpend(getExpenses)

		itemSavings.forEach(obj => {
			allValueAsset += Number(obj.value)
			allReturnY += Number(obj.returnYear)
		})

		itemStocks.forEach(obj => {
			allValueAsset += Number(obj.valueAll)
			allReturnY += Number(obj.returnYear)
		})

		itemBonds.forEach(obj => {
			allValueAsset += Number(obj.value)
			allReturnY += Number(obj.returnYear)
		})

		itemProperty.forEach(obj => {
			allValueAsset += Number(obj.value)
			allReturnY += Number(obj.returnYear)
		})

		itemOther.forEach(obj => {
			allValueAsset += Number(obj.value)
			allReturnY += Number(obj.returnYear)
		})

		itemExpend.forEach(obj => {
			sumExpend += Number(obj.expenseYear)
		})

		wRate = allReturnY/sumExpend;
		changeColor(wRate);

		console.log(allReturnY)

		setTottalReturnY(allReturnY.toFixed(2));
		setTottalAssetV(allValueAsset.toFixed(2));
		setTottalExpand(sumExpend.toFixed(2));
		setWealthRate(wRate.toFixed(2))

		setTimeout(() => {
			if(updateState){
				setUpdateState(false)
			}else{
				setUpdateState(true)
			}
			console.log('------------after 5s refresh')
		}, 5000);
	},[updateState]);


	return (
		<Layout>
			<View
				style={{
					flex: 1,
					alignItems: 'center',
					justifyContent: 'center',
					marginHorizontal: 20,
				}}
			>
				<Section>
					<SectionContent>
						<View style = {{ alignSelf: 'flex-end'}}>
							<Tooltip
								backgroundColor = {'#E4F1E4'}
								width ={350}
								height = {400}
								popover={
								<View>
									<View style ={{flexDirection:'row'}}>
										<Icon
                							size={25}
                							name='stop'
                							color='#3DE73C'
										/>
										<Text>ค่าอัตราความมั่งคั่งมีค่ามากกว่าเท่ากับ 1 คือ {'\n'} ผู้ใช้มีอิสรภาพทางการเงินแล้ว {'\n'}</Text>
									</View>
									<View style ={{flexDirection:'row'}}>
										<Icon
                							size={25}
                							name='stop'
                							color='#E7BF3C'
										/>
										<Text>ค่าอัตราความมั่งคั่ง 0.5 ถึง 1 คือ {'\n'} ผู้ใช้มีแนวโน้วที่จะมีอิสรภาพทางการเงิน {'\n'}</Text>
									</View>
									<View style ={{flexDirection:'row'}}>
										<Icon
                							size={25}
                							name='stop'
                							color='#E74C3C'
										/>
										<Text>ค่าอัตราความมั่งคั่งมีค่าน้อยกว่า 0.5 คือ {'\n'} ผู้ใช้ยังไม่มีอิสรภาพทางการเงิน {'\n'}</Text>
									</View>
									<Text></Text>
									<Text>การเพิ่มค่าอัตราความมั่งคั่ง{'\n'}ที่เป็นตัวชี้ให้เห็นถึงอิสรภาพทางการเงินผู้ใช้ {'\n'}</Text>
									<Text>จะเพิ่มได้โดย</Text>
									<Text>การเพิ่มผลตอบแทนจากสินทรัพย์ที่ครอบครอง {'\n'}</Text>
									<Text>การลดจำนวนรายจ่าย</Text>
								</View>
							}>
  								<Icon
									name='help'
									color='#535353'  
								/>
							</Tooltip>
						</View>
					{gBgC ? (
					<ImageBackground source = {require('../../assets/cycGBg.png')} style = {{width: 280, height: 280, justifyContent: 'center', alignContent: 'center', margin: 20}}>
						<Text fontWeight="bold" style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 40}}>
							{wealthRate}
						</Text>
					</ImageBackground>
					):null }
					{yBgC ? (
					<ImageBackground source = {require('../../assets/cycYBg.png')} style = {{width: 280, height: 280, justifyContent: 'center', alignContent: 'center', margin: 20}}>
						<Text fontWeight="bold" style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 40 }}>
							{wealthRate}
						</Text>
					</ImageBackground>
					):null }
					{rBgC ? (
					<ImageBackground source = {require('../../assets/cycRBg.png')} style = {{width: 280, height: 280, justifyContent: 'center', alignContent: 'center', margin: 20}}>
						<Text fontWeight="bold" style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 40 }}>
							{wealthRate}
						</Text>
					</ImageBackground>
					):null }

						<Button
							style={{ marginTop: 10 }}
							text={"มูลค่าสินทรัพย์ทั้งหมดที่มี " + tottalAssetV + " บาท"}
							status="primary"
							onPress={() => {
								navigation.navigate('Profile')
							}}
						/>
						<Button
							text={"รายได้จากสินทรัพย์ที่มี " + tottalreturnY + " บาท/ปี"}
							status='success'
							onPress={() => {
								navigation.navigate('Profile');
							}}
							style={{
								marginTop: 10,
							}}
						/>
						<Button
							text={"ร่ายจ่ายทั้งหมด "+ tottalExpend + " บาท/ปี"}
							status='danger'
							onPress={() => {
								navigation.navigate('About');
							}}
							style={{
								marginTop: 10,
							}}
						/>
					</SectionContent>
				</Section>
			</View>
		</Layout>
	);
}
