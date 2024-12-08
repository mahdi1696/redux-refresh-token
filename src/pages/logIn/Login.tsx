import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAppDispatch } from "@/hooks/redux";
import { useLogInMutation } from "@/lib/redux/features/auth/authApi";
import { setCredential } from "@/lib/redux/features/auth/authSlice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type Props = {};

export default function Login({}: Props) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setCredential({}));
    return () => {};
  }, []);

  const [userName, setUserName] = useState<string | undefined>("0935123456");
  const [password, setPassword] = useState<string | undefined>("123456");
  const [login, { isLoading, error }] = useLogInMutation();
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (userName && password) {
      try {
        const result = await login({ userName, password }).unwrap();
        if (result.accessToken) {
          dispatch(setCredential({ token: result?.accessToken }));
          navigate("/protected");
        }
      } catch (error) {}
    }
  };

  return (
    <div className="max-w-96 flex flex-col gap-2  m-2 p-2">
      <h1>Login</h1>
      <Input
        type="tel"
        value={userName}
        onChange={(e) => {
          setUserName(e.target.value);
        }}
      ></Input>
      <Input
        type="password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      ></Input>
      <Button className="w-fit" disabled={isLoading} onClick={handleLogin}>
        {isLoading ? "Login..." : "Login"}
      </Button>
      {error && <p className="">{"there is an error"}</p>}
    </div>
  );
}
