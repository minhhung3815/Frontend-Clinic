import React, { useContext } from "react";
import { Card, Col, Row } from "antd";
// import { UserOutlined, HeartOutlined } from "@ant-design/icons";
import NewContext from "Context/createContext";
import "./style.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStethoscope, faHospitalUser, faPeopleRoof } from '@fortawesome/free-solid-svg-icons';
const CardList = () => {
  const { totalAccount } = useContext(NewContext);
  
  const listData = [
    {
      name: "Patients",
      color: "#55CE63",
      number: totalAccount[0],
      icon:faHospitalUser,
    },
    {
      name: "Doctors",
      color: "#009EFB",
      number: totalAccount[1],
      icon:faStethoscope,
    },
    {
      name: "Managers",
      color: "#7A92A3",
      number: totalAccount[2],
      icon:faPeopleRoof,
    },
  ];
  // <FontAwesomeIcon icon={faPeopleRoof} />
  return (
    <Row gutter={16}>
      {listData.map((data) => (
        <Col span={8} key={data.color}>
          <Card className="card-item">
            <div className="circle" style={{ background: data.color , display:'flex', justifyContent:'center', alignItems:'center'}} >
              <div >
                <FontAwesomeIcon icon={data.icon} style={{height:'26px'}}/>
              </div>
            </div>
            
            <div className="content">
              <div className="total">{data.number}</div>
              <div className="button" style={{ background: data.color , display:'flex', justifyContent:'center', alignItems:'center'}}>
                <div>
                  {data.name}
                </div>
              </div>
            </div>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default CardList;
