import styles from '../styles/Home.module.css';
import { React, useState } from 'react';
import { useRouter } from 'next/router';
import { Stack } from '@chakra-ui/react';
import { Container } from '@chakra-ui/react';
import { AuthProvider } from '@saas-ui/react';
import {
  Auth,
  AuthForm,
  MagicLinkForm,
  PasswordForm,
  ForgotPasswordForm,
  UpdatePasswordForm,
  OtpForm,
  Providers,
} from '@saas-ui/react'
import * as Yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Card,
  CardBody,
  Form,
  Field,
  SubmitButton,
  useAuth 
} from '@saas-ui/react';

export default function Home() {
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();
  const schema = Yup.object({
    email: Yup.string()
      .email('Invalid email address')
      .required()
      .label('Email'),
    password: Yup.string().min(4).required().label('Password'),
  });

  const authProvider = {
    
    onLogin: async (params) => {
      let res = await fetch("/api/users1", {
        method: "POST",
        body: JSON.stringify({
          email: params.email,
          password: params.password
        }),
      });
      if (res.status === 200) {
        res = await res.json();
        router.push({
         pathname: '/dashboard',
        })
     } 
     else {
       console.log("Erorr");
     }
    },
    onSignup: async (params) => {
      let res = await fetch("/api/users", {
        method: "POST",
        body: JSON.stringify({
          Name: params.Name,
          email: params.email,
          OrganizationName: params.OrganizationName,
          PhoneNumber: params.PhoneNumber,
          password: params.password
        }),
      });
      if(res.status === 200){
          
        router.push('/');
      }
      else{
          console.log("UserExists");
      }
    },
  }

//   let handleSubmit = async (params) => {
//     let res = await fetch("/api/users1", {
//       method: "POST",
//       body: JSON.stringify({
//         email: params.email,
//         password: params.password
//       }),
//     });
//     if (res.status === 200) {
//        res = await res.json();
//        router.push({
//         pathname: '/dashboard',
//        })
//     } 
//     else {
//       setErrorMsg("Incorrect username or password. Try again!");
//     }
// };
  return (
    <>
        <AuthProvider {...authProvider}>
          <Container mt="100px" width="md">
            <Stack  maxWidth="md" >
              <Auth type="password" resolver={yupResolver(schema)}/>
            </Stack>
          </Container>
      </AuthProvider>
      
    </>
  )
}
