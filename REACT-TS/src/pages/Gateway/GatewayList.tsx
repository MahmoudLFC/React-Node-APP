import React, {useEffect, useState} from "react";
import Table from 'react-bootstrap/Table';
import deleteImage from "../../assets/images/delete.png";
import GatewayService from "../../services/GatewayService";
import DeleteModal from "../../components/DeleteModal";
import {Button} from "react-bootstrap"
import {useNavigate} from 'react-router-dom';
import "../../assets/css/index.css";

interface Gateway {
    _id: string;
    name: string;
    serialNumber: string;
    ip: string;
    devices: number;
}

const GatewayList = (props:any) => {
    const [gateways, setGateways] = useState<Gateway[] | []>([]);
    const [deletedItem, setDeletedItem] = useState<any>({});
    const [deleteModal, setDeleteModal] = useState<boolean>(false);
    const GatewaySrv = new GatewayService();
    const navigate = useNavigate();

    useEffect(() => {
        getAllGateways();
    }, [])

    const getAllGateways = async () => {
        const response = await GatewaySrv.getList([]);
        setGateways(response.data)
    }

    const handleCloseModal = (action: string) => {
        setDeleteModal(false);
        if (action === "delete") {
            getAllGateways();
        }
    };

    return (
        <>
            <div className="mb-2">

                <Button variant="primary" size="lg" onClick={()=>navigate('/gateway/create/')}>
                    Add New Gateway
                </Button>

            </div>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Serial Number</th>
                    <th>IP</th>
                    <th>Devices #</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {gateways.map((gateway, index) =>
                    <tr key={index}>
                        <td>{index+1}</td>
                        <td>{gateway.name}</td>
                        <td>{gateway.serialNumber}</td>
                        <td>{gateway.ip}</td>
                        <td>{gateway.devices}</td>
                        <td>
                            <Button variant="primary" className="pe-2" size="sm" onClick={()=>navigate(`/gateway/${gateway._id}`)}>
                                Edit
                            </Button>
                            <Button variant="success" className="pe-2" size="sm" onClick={()=>navigate(`/gateway/${gateway._id}/devices`)}>
                                Devices
                            </Button>
                            <button
                                className="btn btnUnset pe-2"
                                onClick={() => {
                                    setDeletedItem(gateway);
                                    setDeleteModal(!deleteModal);
                                }}
                            >
                                <img src={deleteImage}/>
                            </button>
                        </td>
                    </tr>
                )}
                </tbody>
            </Table>
            <DeleteModal
                open={deleteModal}
                titleMsg={deletedItem?.name}
                deletedItem={deletedItem}
                modelService={GatewaySrv}
                onCloseModal={(action) => handleCloseModal(action)}
                eventType="GateWay"
            />
        </>
    );
}

export default GatewayList;
