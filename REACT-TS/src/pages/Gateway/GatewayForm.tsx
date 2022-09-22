import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import ErrorMessage from "../../components/ErrorMessage";
import {GatewayValidator} from '../../Validations/GatewayValidator'
import GatewayService from "../../services/GatewayService";
import {toast} from 'react-toastify';
import {useNavigate, useParams} from 'react-router-dom';
import "../../assets/css/index.css";

interface IFormInputs {
    name: string;
    serialNumber: string;
    ip: string;
}


const GatewayForm = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [gateway, setGateway] = useState<IFormInputs | {}>({});
    const navigate = useNavigate();
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
    } = useForm<IFormInputs>({resolver: yupResolver(GatewayValidator)});

    useEffect(() => {
        if (mode === 'Edit')
            getGateway();
    }, [])

    const getGateway = async () => {
        const response = await GatewaySrv.find(id, {});
        setGateway(response.data)
        setValue('name', response.data.name)
        setValue('serialNumber', response.data.serialNumber)
        setValue('ip', response.data.ip)
    }

    const onSubmit = async (data: IFormInputs) => {
        setIsSubmitting(true);
        try {
            if (mode === 'Add') {
                const res = await GatewaySrv.create(data)
                // console.log('res', res)
                if (res && res.status) {
                    toast.success("Gateway Created Successfully")
                    setIsSubmitting(false);
                    navigate(`/`);
                }
            } else if (mode === 'Edit') {
                const res = await GatewaySrv.update(id, data)
                // console.log('res', res)
                if (res && res.status) {
                    toast.success("Gateway Created Successfully")
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
            <h1>{mode} Gateway</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="name">Name</label>
                    <input {...register("name")} placeholder="Name"/>
                    {errors?.name && <ErrorMessage message={errors?.name?.message}/>}
                </div>

                <div>
                    <label htmlFor="serialNumber">Serial Number</label>
                    <input {...register("serialNumber")} placeholder="serial Number"/>
                    {errors?.serialNumber && <ErrorMessage message={errors?.serialNumber?.message}/>}
                </div>

                <div>
                    <label htmlFor="ip">IP</label>
                    <input
                        {...register("ip")}
                        placeholder="10.0.0.7"
                    />
                    {errors?.ip && <ErrorMessage message={errors?.ip?.message}/>}
                </div>
                <input type="submit" disabled={isSubmitting}/>
            </form>
        </>
    );
}

export default GatewayForm;


