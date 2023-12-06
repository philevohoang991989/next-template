import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
const YOUR_API_BASE_URL = 'https://nsk-ocr-backoffice-dev.demo.bnksolution.com';

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log({credentials,YOUR_API_BASE_URL});
        
        try {
            // Call your API to validate credentials
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(credentials),
            });
            
            if (response) {
                const user = await response.json();
                console.log({user});
                
                if(user?.statusCode){
                  console.log(user.message);
                }else{
                  return Promise.resolve(user);
                }
               
              } else {
                // Handle authentication failure
                return Promise.resolve(null);
              }
          } catch (error) {
            console.error('Authentication error:', error);
            return Promise.resolve(null);
          }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {

      if (user) {
        return {
          ...token,
          username: user.access_token,
        };
      }
      return token;
    },
    async session({ session, token }) {
      console.log({token});
      
      return {
        ...session,
        user: {
          ...session.user,
        },
        token: token.username
      };
    },
  },
};