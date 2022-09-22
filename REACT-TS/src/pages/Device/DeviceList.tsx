import React, {useEffect, useState} from "react";
import Table from 'react-bootstrap/Table';
import deleteImage from "../../assets/images/delete.png";
import DeviceService from "../../services/DeviceService";
import DeleteModal from "../../components/DeleteModal";
import {Button} from "react-bootstrap"
import {useNavigate, useParams} from 'react-router-dom';
import "../../assets/css/index.css";

interface Device {
    _id: string;
    vendor: string;
    gateway: string;
    status: string;
    uID:number;
}

interface GatewayInterface {
    name: string;
    serialNumber: string;
    ip: string;
}

const DeviceList = () => {
    const [devices, setDevices] = useState<Device[] | []>([]);
    const [gateway, setGateway] = useState<GatewayInterface| {} >({});
    const [deletedItem, setDeletedItem] = useState<any>({});
    const [deleteModal, setDeleteModal] = useState<boolean>(false);
    const DeviceSrv = new DeviceService();
    const navigate = useNavigate();
    const {id} = useParams();

    useEffect(() => {
        getAllDevices();
    }, [])

    const getAllDevices = async () => {
        let params = {}
        if (id)
            params = {gateway: id};
        const response = await DeviceSrv.getList(params);
        setDevices(response.data.devices)
        setGateway(response.data.gateway)
    }

    const handleCloseModal = (action: string) => {
        setDeleteModal(false);
        if (action === "delete") {
            getAllDevices();
        }
    };

    return (
        <>
            <div className="mb-2">

                <Button variant="primary" size="lg" onClick={() => navigate('/device/create/')}>
                    Add New Device
                </Button>

            </div>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>#</th>
                    <th>UID</th>
                    <th>Vendor</th>
                    <th>Gateway</th>
                    <th>status</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {devices.map((device, index) =>
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{device.uID}</td>
                        <td>{device.vendor}</td>
                        <td>{"name" in gateway ? gateway?.name :''}</td>
                        <td>{device.status}</td>
                        <td>
                            <Button variant="primary" size="lg" onClick={() => navigate(`/device/${device._id}`)}>
                                Edit
                            </Button>
                            <button
                                className="btn btnUnset pe-2"
                                onClick={() => {
                                    setDeletedItem(device);
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
                titleMsg={deletedItem?.vendor}
                deletedItem={deletedItem}
                modelService={DeviceSrv}
                onCloseModal={(action) => handleCloseModal(action)}
                eventType="Device"
            />
        </>
    );
}

export default DeviceList;
