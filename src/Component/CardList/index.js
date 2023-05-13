import React, { useContext } from "react";
import { Card, Col, Row } from "antd";
// import { UserOutlined, HeartOutlined } from "@ant-design/icons";
import NewContext from "Context/createContext";
import "./style.scss";
const CardList = () => {
  const { totalAccount } = useContext(NewContext);
  const listData = [
    {
      name: "Patients",
      color: "#55CE63",
      number: totalAccount[0],
    },
    {
      name: "Doctors",
      color: "#009EFB",
      number: totalAccount[1],
    },
    {
      name: "Managers",
      color: "#7A92A3",
      number: totalAccount[2],
    },
  ];
  return (
    <Row gutter={16}>
      {listData.map((data) => (
        <Col span={8} key={data.color}>
          <Card className="card-item">
            <div className="circle" style={{ background: data.color }} />
            <div className="content">
              <div className="total">{data.number}</div>
              <div className="button" style={{ background: data.color }}>
                {data.name}
              </div>
            </div>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default CardList;
