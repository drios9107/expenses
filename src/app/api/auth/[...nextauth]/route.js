import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import axios from "axios"
import toast from "react-hot-toast"

export const authOptions = {
    providers: [
        GithubProvider({
            clientId: process.env.NEXT_PUBLIC_GITHUB_ID,
            clientSecret: process.env.NEXT_PUBLIC_GITHUB_SECRET,
        }),
        GoogleProvider({
            clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
            clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET
        }),
        CredentialsProvider({
            // The name to display on the sign in form (e.g. 'Sign in with...')
            name: 'Credentials',
            // The credentials is used to generate a suitable form on the sign in page.
            // You can specify whatever fields you are expecting to be submitted.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            // credentials: {
            //     user: { label: "Username", type: "text" },
            //     password: { label: "Password", type: "password" }
            // },
            async authorize(credentials, req) {
                return axios.post(`${process.env.NEXT_PUBLIC_BACKEND}/auth/login`, credentials)
                    .then(({ data }) => {
                        console.log('***dataResponse', data);
                        return data
                    })
                    .catch(error => {
                        console.log('***errorResponse', error);
                        toast.error(error?.data?.message)
                        // return null;
                    })
            }
        })
    ],
    pages: {
        signIn: "/login"
    },
    session: {
        jwt: true,
    },
    callbacks: {
        async signIn({ user, account }) {
            // console.log('***signIn callback', { user, account });
            const isMyGithubAccount = (user?.email === 'david.rios@alphalabs.uy' && account?.provider === 'github');
            return isMyGithubAccount || account?.provider === 'credentials'
        },
        async jwt({ token, user }) {
            if (user) { //user received from backend
                // console.log('***jwt', user);
                token = { accessToken: user.token, _id: user._id, email: user.email };
            }
            return token;
        },
        async session({ session, token }) { //redefined token in jwt sync function
            const result = {
                user: {
                    _id: token._id,
                    email: token.email,
                    exp: token.exp,
                    token: token.accessToken,
                }
            }

            // console.log('***session', result);
            return result;
        },
    },
    secret: process.env.NEXT_PUBLIC_NEXTAUTH_SECRET,
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };