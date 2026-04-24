import NextAuth from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import axios from 'axios'

export const authOptions = {
	providers: [
		GithubProvider({
			clientId: process.env.GITHUB_ID,
			clientSecret: process.env.GITHUB_SECRET
		}),
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET
		}),
		CredentialsProvider({
			name: 'Credentials',
			async authorize(credentials, req) {
				try {
					const { data } = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND}/auth/login`, credentials)
					return data
				} catch (error) {
					throw new Error(error?.response?.data?.code)
				}
			}
		})
	],
	pages: {
		signIn: '/login',
		error: '/login'
	},
	session: {
		jwt: true
	},
	callbacks: {
		async signIn({ user, account }) {
			// const isMyGoogleAccount = user?.email === 'drio9107@gmail.com' && account?.provider === 'google'
			const isLoggedWithCredentials = !user?.error && account?.provider === 'credentials'

			if (account.provider === 'github' || account.provider === 'google') {
				const payload = {
					user: { email: user.email },
					provider: account.provider,
					accessToken: account.access_token
				}

				return axios
					.post(`${process.env.NEXT_PUBLIC_BACKEND}/auth/verifyOauthAccessToken`, payload)
					.then(({ data }) => {
						user._id = data._id
						user.role = data.role
						user.token = data.token

						return true
					})
					.catch(error => {
						console.log('***signin error', error?.response?.data?.code)
						throw new Error(error?.response?.data?.code)
					})
			}

			return isLoggedWithCredentials
		},
		async jwt({ token, user }) {
			if (user) token = { accessToken: user?.token, _id: user?._id, email: user?.email, role: user?.role }

			return token
		},
		async session({ session, token }) {
			//redefined token in jwt sync function
			const result = {
				user: {
					_id: token?._id,
					email: token?.email,
					role: token?.role,
					exp: token?.exp,
					token: token?.accessToken
				}
			}

			return result
		}
	},
	secret: process.env.NEXTAUTH_SECRET
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
