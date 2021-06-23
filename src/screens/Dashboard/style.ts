import styled from "styled-components";

export const Holder = styled.div`
  position: relative;
  width: 100%;
  padding: 25px;
`;

export const Header = styled.header`
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  width: 100%;
  padding-top: 20px;
  background: #fff;

  .row {
    display: flex;
    align-items: center;
  }

  button {
    width: 200px;
    height: 45px;
    margin-right: 20px;
  }
`;

export const ModalInnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  input {
    width: 75%;
    height: 45px;
    margin-bottom: 30px;
  }
`;

export const RecordsList = styled.ul`
  width: 100%;
  margin-top: 150px;
`;

export const BlobContainer = styled.div`
  span.date {
    display: block;
    margin-bottom: 10px;
  }

  border-bottom: 1px dashed grey;
`;

export const Record = styled.li`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 16px;

  .row {
    display: flex;
    align-items: center;
    margin-bottom: 6px;

    span:first-child {
      margin-right: 10px;
    }

    &.count {
      span:last-child {
        color: #1890ff;
        font-size: 20px;
      }
    }
  }
`;
