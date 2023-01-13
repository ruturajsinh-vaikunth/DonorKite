import NextAuth from "next-auth/next";
import { MongoClient } from "mongodb";
// import { Providers } from "next-auth/react";
import Credentials from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
export default NextAuth({
    session: {
        strategy: 'jwt'
    },
    providers: [
        Credentials({
            async authorize(credentials){
                const client = await MongoClient.connect('mongodb+srv://Rutu5095:Rutu5095@demo-nextjs.oaeodat.mongodb.net/nextjs-mongodb-demo?retryWrites=true&w=majority');

                const users = client.db().collection('users');
                const result = await users.findOne({
                    email: credentials.email,
                });

                if(!result){
                    throw new Error("No user found with the email");
                }

                const checkPassword = await compare(credentials.password, result.password);

                if(!checkPassword){
                    throw new Error("Password doesnt match");
                }

                return { email: result.email };
            }
        })
    ],
    callbacks: {
        jwt: async({token, user}) => {
            user && (token.user = user);

            return Promise.resolve(token);
        },
        session: async({session, token}) => {
            console.log("user in ...next auth api", token);

            session.user = token.user;

            return Promise.resolve(session);
        },
    },
});