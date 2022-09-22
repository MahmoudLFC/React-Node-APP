import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import Form from 'react-bootstrap/Form';
import {yupResolver} from "@hookform/resolvers/yup";
import ErrorMessage from "../../components/ErrorMessage";
import {DeviceValidator} from '../../Validations/DeviceValidator'
import DeviceService from "../../services/DeviceService";
import GatewayService from "../../services/GatewayService";
import {toast} from 'react-toastify';
import {useNavigate, useParams} from 'react-router-dom';
import "../../assets/css/index.css";

interface IFormInputs {
    vendor: string;
    gateway: string;
    status: string;
    uID:number;
}

interface gatewayOptions {
    _id: string;
    name: string;
}


const DeviceForm = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [gatewayOptions, setGatewayOptions] = useState<gatewayOptions[]|[]>([]);
    const navigate = useNavigate();
    const DeviceSrv = new DeviceService();
    const GatewaySrv = new GatewayService();
    const {id} = useParams();
    let mode: string = 'Add';
    if (id)
        mode = 'Edit';

    const {
        setValue,
        register,
        formState: {errors},
        handleSubmit
    } = useForm<IFormInputs>({resolver: yupResolver(DeviceValidator)});

    useEffect(() => {
        getGatewayDropDown();
        if (mode === 'Edit')
            getDevice();
    }, [])

    const getDevice = async () => {
        const response = await DeviceSrv.find(id, {});
        setValue('vendor', response.data.vendor)
        setValue('gateway', response.data.gateway)
        setValue('status', response.data.status)
        setValue('uID', response.data.uID)
    }

    const getGatewayDropDown = async () => {
        const response = await GatewaySrv.getDropDown('gateway');
        setGatewayOptions(response.data)
    }

    const onSubmit = async (data: IFormInputs) => {
        setIsSubmitting(true);
        try {
            if (mode === 'Add') {
                const res = await DeviceSrv.create(data)
                if (res && res.status) {
                    toast.success("Device Created Successfully")
                    setIsSubmitting(false);
                    navigate(`/`);
                }
            } else if (mode === 'Edit') {
                const res = await DeviceSrv.update(id, data)
                if (res && res.status) {
                    toast.success("Device Updated Successfully")
                    setIsSubmitting(false);
                    navigate(`/`);
                }
            }
        } catch (error: any) {
            if (error.response && error.response.status && (error.response.status === 400 || error.response.status === 422)) {
                toast.error(error.response.data[0]);
            } else {
                toast.error(error);
            }
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <h1>{mode} Device</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="name">Vendor</label>
                    <input {...register("uID")} placeholder="uID"/>
                    {errors?.uID && <ErrorMessage message={errors?.uID?.message}/>}
                </div>
                <div>
                    <label htmlFor="name">Vendor</label>
                    <input {...register("vendor")} placeholder="Vendor"/>
                    {errors?.vendor && <ErrorMessage message={errors?.vendor?.message}/>}
                </div>

                <div>
                    <label htmlFor="gateway">Gateway</label>
                    <Form.Select {...register("gateway")}  aria-label="Default select example">
                        <option value="">Open this select menu</option>
                        {gatewayOptions.map((gateway, index) =>
                            <option key={index} value={gateway._id}>{gateway.name}</option>
                        )}
                    </Form.Select>
                    {errors ?.gateway && <ErrorMessage message={errors.gateway.message} />}
                </div>

                <div>
                    <label htmlFor="status">Status</label>
                    <Form.Select {...register("status")}  aria-label="Default select example">
                        <option>Open this select menu</option>
                        <option value='online'>Online</option>
                        <option value='offline'>Offline</option>
                    </Form.Select>
                    {errors ?.status && <ErrorMessage message={errors.status.message} />}
                </div>

                <input type="submit" disabled={isSubmitting}/>
            </form>
        </>
    );
}

export default DeviceForm;


