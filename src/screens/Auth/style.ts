import styled from "styled-components";

export const Holder = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  border: 1px solid red;

  h3 {
    margin-bottom: 25px;
  }

  form {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 100%;

    input {
      width: 75%;
      height: 50px;
      margin-bottom: 15px;
    }

    button {
      width: 75%;
      height: 50px;
      margin-top: 25px;
      // background: #16b8f3;
      background: red;
      border: 0;
      color: #fff;
      font-size: 17px;
    }
  }
`;
