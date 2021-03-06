import React, { useContext } from 'react';
import * as firebase from 'firebase';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { theme } from 'react-native-rapi-ui';
import TabBarIcon from '../components/utils/TabBarIcon';
import TabBarText from '../components/utils/TabBarText';
//Screens
import Home from '../screens/Home';
import SecondScreen from '../screens/SecondScreen';
// --- Add
import AddSaving from '../screens/add/AddSaving';
import AddStocks from '../screens/add/AddStocks';
import AddBonds from '../screens/add/AddBonds';
import AddProperty from '../screens/add/AddProperty';
import AddOther from '../screens/add/AddOther';
import AddExpenses from '../screens/add/AddExpenses';

import About from '../screens/About';
import Profile from '../screens/Profile';
import Loading from '../screens/utils/Loading';
import Setting from '../screens/Setting';
// Auth screens
import Login from '../screens/auth/Login';
import Register from '../screens/auth/Register';
import ForgetPassword from '../screens/auth/ForgetPassword';
import { AuthContext } from '../provider/AuthProvider';

// Better put your these secret keys in .env file
const firebaseConfig = {
	apiKey: 'AIzaSyAJBatdEqnXprOp5NTzKJiWGDz4VS0FXGU',
	authDomain: 'fir-and-i-90684.firebaseapp.com',
	databaseURL: 'https://fir-and-i-90684-default-rtdb.firebaseio.com',
	projectId: 'fir-and-i-90684',
	storageBucket: 'fir-and-i-90684.appspot.com',
	messagingSenderId: '933723844291',
	appId: '1:933723844291:web:1541cb45081c1aa2ba7c76',
};

if (firebase.apps.length === 0) {
	firebase.initializeApp(firebaseConfig);
}

const AuthStack = createStackNavigator();
const Auth = () => {
	return (
		<AuthStack.Navigator
			screenOptions={{
				headerShown: false,
			}}
		>
			<AuthStack.Screen name="Login" component={Login} />
			<AuthStack.Screen name="Register" component={Register} />
			<AuthStack.Screen name="ForgetPassword" component={ForgetPassword} />
		</AuthStack.Navigator>
	);
};

const MainStack = createStackNavigator();
const Main = () => {
	return (
		<MainStack.Navigator
			screenOptions={{
				headerShown: false,
			}}
		>
			<MainStack.Screen name="MainTabs" component={MainTabs} />
			<MainStack.Screen name="SecondScreen" component={SecondScreen} />
			<MainStack.Screen name="AddSaving" component={AddSaving} />
			<MainStack.Screen name="AddStocks" component={AddStocks} />
			<MainStack.Screen name="AddBonds" component={AddBonds} />
			<MainStack.Screen name="AddProperty" component={AddProperty} />
			<MainStack.Screen name="AddOther" component={AddOther} />
			<MainStack.Screen name="AddExpenses" component={AddExpenses} />
		</MainStack.Navigator>
	);
};

const Tabs = createBottomTabNavigator();
const MainTabs = () => {
	return (
		<Tabs.Navigator
			tabBarOptions={{
				tabStyle: { borderTopWidth: 0 },
				style: { borderTopWidth: 1, borderColor: '#c0c0c0' },
				activeTintColor: theme.primary,
			}}
		>
			{/* these icons using Ionicons */}
			<Tabs.Screen
				name="Home"
				component={Home}
				options={{
					tabBarLabel: ({ focused }) => (
						<TabBarText focused={focused} title="????????????????????????" />
					),
					tabBarIcon: ({ focused }) => (
						<TabBarIcon focused={focused} icon={'md-home'} />
					),
				}}
			/>
			<Tabs.Screen
				name="Profile"
				component={Profile}
				options={{
					tabBarLabel: ({ focused }) => (
						<TabBarText focused={focused} title="???????????????????????????" />
					),
					tabBarIcon: ({ focused }) => (
						<TabBarIcon focused={focused} icon={'podium'} />
					),
				}}
			/>
			
			<Tabs.Screen
				name="About"
				component={About}
				options={{
					tabBarLabel: ({ focused }) => (
						<TabBarText focused={focused} title="?????????????????????" />
					),
					tabBarIcon: ({ focused }) => (
						<TabBarIcon focused={focused} icon={'trending-down'} />
					),
				}}
			/>

			<Tabs.Screen
				name="Setting"
				component={Setting}
				options={{
					tabBarLabel: ({ focused }) => (
						<TabBarText focused={focused} title="?????????????????????" />
					),
					tabBarIcon: ({ focused }) => (
						<TabBarIcon focused={focused} icon={'ios-settings'} />
					),
				}}
			/>
		</Tabs.Navigator>
	);
};

export default () => {
	const auth = useContext(AuthContext);
	const user = auth.user;
	return (
		<NavigationContainer>
			{user == null && <Loading />}
			{user == false && <Auth />}
			{user == true && <Main />}
		</NavigationContainer>
	);
};
