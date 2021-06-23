import { useEffect, useState } from "react";

// import { Link } from "react-router-dom";

import { useQuery } from "react-query";

import { isEmpty, uniq } from "lodash";
import { format } from "date-fns";

import { getAllResultsRecordsRequest, commitNewResultRecordRequest } from "api";

import { queryClient } from "../../root";

import {
  Spin,
  Typography,
  Modal,
  Input,
  Radio,
  Button,
  notification,
} from "antd";

import {
  Holder,
  Header,
  ModalInnerContainer,
  RecordsList,
  BlobContainer,
  Record,
} from "./style";

const { Title } = Typography;

/* - - - - - - - - - - - - - - - - - - - - - - */

type ResultKind = "push-up-bars" | "push-up" | "pull-up";

const QUERY_ID = "results-records";

// TODO: semantic markup! (lists) !!

function Dashboard() {
  const { data, isFetching } = useQuery(QUERY_ID, getAllResultsRecordsRequest);

  const [resultCount, setResultCount] = useState("");
  const [resultKind, setResultKind] = useState<ResultKind>("push-up-bars");

  // TODO: redo all this stuff with state machines
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // TODO: redo this logic with (state machine and) showing loading from opened modal / screen
  const handleNewResultCommitmentSubmit = async () => {
    setModalIsVisible(false);

    try {
      setIsLoading(true);

      const { data } = await commitNewResultRecordRequest({
        kind: resultKind,
        count: resultCount,
      });

      // FIXME: types
      queryClient.setQueryData(QUERY_ID, (records: any) => [...records, data]);

      notification.success({
        message: `Success`,
        description: "Record has been successully added",
        placement: "bottomLeft",
      });
    } catch (err) {
      console.error(err);

      notification.error({
        message: `Error`,
        description: "Could not able to add the record",
        placement: "bottomLeft",
      });
    } finally {
      setIsLoading(false);
      setResultCount("");
    }
  };

  const constructPortions = () => {
    if (isEmpty(data)) return <span>No data to show</span>;

    const dates = uniq(
      data.map((rec: any) => format(new Date(rec.createdAt), "MM/dd/yyyy"))
    );

    const blobs = dates.map((date) => {
      return {
        date: date,
        records: data.filter((rec: any) => {
          const recDate = format(new Date(rec.createdAt), "MM/dd/yyyy");
          return recDate === date;
        }),
      };
    });

    return blobs.map((blob: any) => {
      return (
        <BlobContainer key={blob.date}>
          <span className="date">{blob.date}</span>

          {blob.records.map((record: any) => (
            <Record key={record._id}>
              <div className="row count">
                <span>Count:</span>
                <span>{record.count}</span>
              </div>

              <div className="row">
                <span>Kind:</span>
                <span>{record.kind}</span>
              </div>
            </Record>
          ))}
        </BlobContainer>
      );
    });
  };

  return (
    <Holder className="holder">
      <Modal
        title="Add new result"
        visible={modalIsVisible}
        onOk={handleNewResultCommitmentSubmit}
        onCancel={() => setModalIsVisible(false)}
      >
        <ModalInnerContainer>
          <Input
            type="number"
            placeholder="Count"
            onChange={(e: any) => setResultCount(e.target.value)}
            value={resultCount}
          />

          <Radio.Group
            onChange={(e: any) => setResultKind(e.target.value)}
            value={resultKind}
          >
            <Radio value="push-up-bars">Bars</Radio>
            <Radio value="push-up">Push ups</Radio>
            <Radio value="pull-up">Pull ups</Radio>
          </Radio.Group>
        </ModalInnerContainer>
      </Modal>

      <Header className="header">
        <Title>Dashboard</Title>

        <div className="row">
          <Button
            type="primary"
            disabled={isFetching}
            onClick={() => setModalIsVisible(true)}
          >
            Add new result
          </Button>
          {(isFetching || isLoading) && <Spin />}
        </div>
      </Header>

      <RecordsList className="records-list">{constructPortions()}</RecordsList>
    </Holder>
  );
}

export default Dashboard;
