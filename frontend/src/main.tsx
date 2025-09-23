import { createRoot } from 'react-dom/client'
import { GoogleOAuthProvider } from '@react-oauth/google'
import App from './App.tsx'
import './index.css'
import { CLIENT_ID } from './config/constants.ts';

createRoot(document.getElementById("root")!).render(
<GoogleOAuthProvider clientId={CLIENT_ID}>
<App />
</GoogleOAuthProvider>
);
