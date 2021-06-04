import React from 'react';
import { View, Linking } from 'react-native';
import * as firebase from 'firebase';
import {
	Layout,
	Button,
	Text,
	TopNav,
	Section,
	SectionContent,
    theme
} from 'react-native-rapi-ui';

import { Ionicons } from '@expo/vector-icons';

export default function ({ navigation }) {
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
						{/* <Text fontWeight="bold" style={{ textAlign: 'center' }}>
						</Text> */}
						<Button
							status="danger"
							text="Logout"
                            leftContent={
                                <Ionicons name="log-out" size={20} color={'white'} />
                            }
							onPress={() => {
								firebase.auth().signOut();
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
