import { useState } from "react";
import axios from "axios";

import { Input, Typography, notification } from "antd";

import { Holder } from "./style";

/* - - - - - - - - - - - - - - - - - - - - - - */

const { Title } = Typography;

const api_url = "https://damp-thicket-05259.herokuapp.com/api";

function Auth() {
  const [email, setEmail] = useState("sergey.mail@gmail.com");
  const [password, setPassword] = useState("motor");

  const [isLoading, setIsLoading] = useState(false);

  const openNotification = (message: string) => {
    notification.error({
      message: `Error`,
      description: message,
      placement: "bottomLeft",
    });
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();

    const requestBody = {
      email,
      password,
    };

    setIsLoading(true);

    try {
      const rawData = await axios.post(`${api_url}/auth/login`, requestBody);

      console.log(rawData.data);

      notification.success({
        message: `Success`,
        description: "You will login soon!",
        placement: "bottomLeft",
      });
    } catch (err) {
      if (err.response.data) {
        const { error } = err.response.data;

        notification.error({
          message: `Error`,
          description: error ? error : "An error occured attempting to login",
          placement: "bottomLeft",
        });
      }
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
