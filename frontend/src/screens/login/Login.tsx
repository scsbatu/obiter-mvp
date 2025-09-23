import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  getUserToken,
  saveUserGoogleToken,
  saveUserToken,
} from "@/utils/cacheStorage";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import { useAuthContext } from "@/hooks/useAuthContext";
import { errorView } from "@/helpers/ErrorHandler";
import isEmpty from "lodash/isEmpty";

const LoginPage = () => {
  const navigate = useNavigate();
  const { dispatch, user }: any = useAuthContext();

  const currentToken = getUserToken();
  
  useEffect(() => {
    if (!isEmpty(currentToken) && !isEmpty(currentToken)) {
      navigate("/dashboard", { replace: true });
    }
  }, [user, navigate,currentToken]);

  const userLogin = async (credentialResponse: any) => {
    if (!credentialResponse?.access_token) {
      return errorView("No access token received");
    }
    const res = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
      headers: {
        Authorization: `Bearer ${credentialResponse.access_token}`,
      },
    });
    const userInfo = await res.json();
    if (!userInfo) return errorView("Something went wrong");
    dispatch({ type: "LOGIN", payload: userInfo });
    saveUserToken(credentialResponse.access_token);
    saveUserGoogleToken(userInfo?.sub || "");
    navigate("/dashboard");
  };

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => userLogin(tokenResponse),
    onError: () => errorView("Login Failed"),
  });

  return (
    <section className="min-h-screen flex items-center justify-center bg-background py-20">
      <div className="container px-6 flex justify-center">
        <Card className="w-full max-w-md bg-card/1 border-border">
          <CardContent className="p-8 flex flex-col items-center">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-primary mb-2">
                Welcome OBLITER AI
              </h2>
              <p className="text-light-gold">
                Access your legal analysis workspace
              </p>
            </div>

            <div className="space-y-6 w-full flex flex-col items-center">
              <div className="flex justify-center">
                <Button
                  variant="outline"
                  className="w-full border-border hover:bg-primary/50"
                  onClick={() => login()}
                >
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Continue with Google
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default LoginPage;
