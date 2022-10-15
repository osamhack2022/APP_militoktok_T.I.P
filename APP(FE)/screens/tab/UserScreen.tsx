import FocusAwareStatusBar from '@components/FocusAwareStatusBar'
import Spacer from '@components/Spacer'
import TPButton from '@components/TPButton'
import { css } from '@emotion/native'
import useAxios from '@hooks/axios'
import { useRootStackNavigation } from '@navigators/RootStack'
import { userAtom } from '@store/atoms'
import { useQuery } from '@tanstack/react-query'
import firebase from '@utils/firebase'
import { useAtomValue } from 'jotai'
import React from 'react'
import { Text, View } from 'react-native'

const UserScreen: React.FC = () => {
	const navigation = useRootStackNavigation()
	const firebaseUser = useAtomValue(userAtom)

	const axios = useAxios()

	const userQuery = useQuery(['tapa', '/users/get/myself'], async () => {
		const res = await axios.get('/users/get/myself')
		return res.data
	})

	if (userQuery.isLoading) {
		return (
			<View
				style={css`
					flex: 1;
					justify-content: center;
					align-items: center;
				`}
			></View>
		)
	}

	return (
		<>
			<View
				style={css`
					flex: 1;
					justify-content: center;
					padding: 20px;
				`}
			>
				<Text>UserScreen</Text>
				<Spacer y={12} />
				{firebaseUser?.uid ? (
					<>
						<Text>Logged in as: {firebaseUser.uid}</Text>
						<Spacer y={12} />
						<TPButton
							onPress={() => {
								firebase.auth.signOut()
							}}
						>
							로그아웃
						</TPButton>
					</>
				) : (
					<>
						<TPButton
							onPress={() => {
								navigation.push('SignUp', { trap: false })
							}}
						>
							회원가입
						</TPButton>
						<Spacer y={12} />
						<TPButton
							onPress={() => {
								navigation.push('SignIn', { trap: false })
							}}
						>
							로그인
						</TPButton>
					</>
				)}
			</View>
			<FocusAwareStatusBar style="dark" />
		</>
	)
}

export default UserScreen
