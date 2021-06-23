import { useState } from "react";
import { useHistory } from "react-router-dom";

import { makeLoginRequest } from "api";

import { Input, Typography, notification } from "antd";

import { Holder } from "./style";

const { Title } = Typography;

/* - - - - - - - - - - - - - - - - - - - - - - */

function Auth() {
  const [email, setEmail] = useState("sergey.mail@gmail.com");
  const [password, setPassword] = useState("motor123");

  const [isLoading, setIsLoading] = useState(false);

  const history = useHistory();

  const onSubmit = async (e: any) => {
    e.preventDefault();

    const requestBody = {
      email,
      password,
    };

    setIsLoading(true);

    try {
      const response = await makeLoginRequest(requestBody);
      const { accessToken } = response.data;

      localStorage.setItem("auth-key", accessToken);

      notification.success({
        message: `Success`,
        description: "You will login soon!",
        placement: "bottomLeft",
      });

      history.push("/");
    } catch (err) {
      if (err.response && err.response.data) {
        const { error } = err.response.data;

        notification.error({
          message: `Error`,
          description: error ? error : "An error occured attempting to login",
          placement: "bottomLeft",
        });
      }

      console.error("Error occured");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Holder>
      <Title level={3}>Welcome</Title>

      <form onSubmit={onSubmit}>
        <Input
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Email"
        />
        <Input
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
        />

        <button disabled={isLoading} type="submit">
          {isLoading ? "Loading..." : "Submit"}
        </button>
      </form>
    </Holder>
  );
}

export default Auth;
