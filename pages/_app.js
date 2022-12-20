import '../styles/globals.css';
import { SaasProvider } from '@saas-ui/react';
import { AuthProvider } from '@saas-ui/react';
import { baseTheme } from '@saas-ui/react';

import '@fontsource/inter/variable.css';




export default function App({ Component, pageProps }) {
  return (
    <SaasProvider theme={baseTheme} >
      <AuthProvider>
      <Component {...pageProps} />
      </AuthProvider>
    </SaasProvider>
  )
}
