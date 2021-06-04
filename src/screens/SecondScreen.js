import React, {useEffect}from 'react';
import { View, Image } from 'react-native';
import { Layout, TopNav, Text, theme, Section, SectionContent, Button } from 'react-native-rapi-ui';
import { Ionicons } from '@expo/vector-icons';

export default function ({ navigation }) {


	return (
		<Layout>
			<TopNav
				middleContent="เพิ่มสินทรัพย์ใหม่"
				leftContent={
					<Ionicons name="chevron-back" size={20} color={theme.black} />
				}
				leftAction={() => navigation.goBack()}
			/>
			<View
				style={{
					flex: 1,
					alignItems: 'center',
					justifyContent: 'flex-start',
					marginHorizontal: 1,
				}}
			>
				<Section style = {{width: '100%'}}>
					<SectionContent>
						<Text fontWeight="bold" style={{ textAlign: 'center' }}>
						</Text>
						<Button
							leftContent={
								<Image
									resizeMode="contain"
									style={{
										height: 20,
										width: 20,
									}}
									source={require('../../assets/favicon.png')}
								/>
							}
							style={{ marginTop: 10 }}
							text="เงินฝาก"
							color='#4cd137'
							onPress={() => {
								navigation.navigate('AddSaving',{edit:0});
							}}
							outline
						/>
						<Button
							leftContent={
								<Image
									resizeMode="contain"
									style={{
										height: 20,
										width: 20,
									}}
									source={require('../../assets/favicon.png')}
								/>
							}
							text="หุ้น"
							color='#3366FF'
							onPress={() => {
								navigation.navigate('AddStocks', {edit:0});
							}}
							style={{
								marginTop: 10,
							}}
							outline
						/>
						<Button
							color ='#e67e22'
							leftContent={
								<Image
									resizeMode="contain"
									style={{
										height: 20,
										width: 20,
										alignSelf: 'flex-start'
									}}
									source={require('../../assets/favicon.png')}
								/>
							}
							text="ตราสารหนี้"
							onPress={() => {
								navigation.navigate('AddBonds', {edit: 0});
							}}
							style={{
								marginTop: 10,
							}}
							outline
						/>
						<Button
							leftContent={
								<Image
									resizeMode="contain"
									style={{
										height: 20,
										width: 20,
									}}
									source={require('../../assets/favicon.png')}
								/>
							}
							text="อสังหาริมทรัพย์"
							color='#f1c40f'
							onPress={() => {
								navigation.navigate('AddProperty', {edit: 0});
							}}
							style={{
								marginTop: 10,
							}}
							outline
						/>
						<Button
							leftContent={
								<Image
									resizeMode="contain"
									style={{
										height: 20,
										width: 20,
									}}
									source={require('../../assets/favicon.png')}
								/>
							}
							color='#636e72'
							text="อื่นๆ"
							onPress={() => {
								navigation.navigate('AddOther');
							}}
							style={{
								marginTop: 10,
							}}
							outline
						/>
					</SectionContent>
				</Section>
			</View>
		</Layout>
	);
}
