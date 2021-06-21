import { useState } from "react";

import { Input, Typography } from "antd";

import { Holder } from "./style";

const { Title } = Typography;

const api_url = "https://damp-thicket-05259.herokuapp.com/api";

function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (e: any) => {
    e.preventDefault();

    // const token = await fetch(api_url)
  };

  return (
    <Holder>
      <Title level={3}>Welcome</Title>

      {email && <span>{email}</span>}
      {password && <span>{password}</span>}

      <form onSubmit={onSubmit}>
        <Input
          required
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Email"
        />
        <Input
          required
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
        />

        <button type="submit">Submit</button>
      </form>
    </Holder>
  );
}

export default Auth;
