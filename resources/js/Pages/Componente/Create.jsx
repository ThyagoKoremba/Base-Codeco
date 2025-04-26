import React from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import DashboardLayout from '@/Layouts/Sidebar';
import { useState } from 'react';


const CreateComponente = ({ closeModal }) => {

    const initialValues = {
        nombre: "",
        componente_item_proceso: "",
        informacion: "",
        url: "",
        sn_modal:false,
        sn_activo: true,
    }

    const { data, errors, setData, post, reset } = useForm(initialValues)
    const [esModal, setEsModal]=useState(false);
    const submit = (e) => {
        e.preventDefault();
        post(route('componente.store'), {
            onSuccess: () => {
                window.location.reload();
                closeModal();
            },
        });
    }

    const DesactivarModal = () => {
        const nuevoEstado = !data.sn_modal; // Cambia el estado del checkbox
        setData('sn_modal', nuevoEstado); // Actualiza el estado de sn_modal

        if (nuevoEstado) {
            setData('url', ''); // Limpia el campo URL si sn_modal se desactiva
        }

        setEsModal(nuevoEstado); // Actualiza el estado local para deshabilitar el input
    };

    return (
            <div className="py-3">
                            <div className="row">
                                <div className="col">
                                    <div className="card">
                                        <div className="card-body">
                                            <form onSubmit={submit}>
                                                <div className='mb-3 row'>
                                                <div className='col-6'>
                                                        <label htmlFor="nombre" className='form-label'>Nombre</label>

                                                        <input
                                                            id="nombre"
                                                            type="text"
                                                            name="nombre"
                                                            value={data.nombre}
                                                            className="form-control"
                                                            onChange={(e) => setData('nombre', e.target.value)}
                                                        />

                                                        <InputError message={errors.nombre} className="mt-2" />
                                                    </div>
                                                    <div className='col-6'>
                                                        <label htmlFor="componente_item_proceso" className='form-label'>Descripción</label>

                                                        <input
                                                            id="componente_item_proceso"
                                                            type="text"
                                                            name="componente_item_proceso"
                                                            value={data.componente_item_proceso}
                                                            className="form-control"
                                                            onChange={(e) => setData('componente_item_proceso', e.target.value)}
                                                        />

                                                        <InputError message={errors.componente_item_proceso} className="mt-2" />
                                                    </div>

                                                    <div className='col-6 my-3'>
                                                        <label htmlFor="informacion" className='form-label'>Información</label>

                                                        <input
                                                            id="informacion"
                                                            type="text"
                                                            name="informacion"
                                                            value={data.informacion}
                                                            className="form-control"
                                                            onChange={(e) => setData('informacion', e.target.value)}
                                                        />

                                                        <InputError message={errors.informacion} className="mt-2" />
                                                    </div>
                                                </div>
                                                <hr />

                                                <div className='mb-3'>
                                                    <label htmlFor="sn_modal" className='form-label'>Modal</label>

                                                    <input
                                                        id="sn_modal"
                                                        type="checkbox"
                                                        name="sn_modal"
                                                        checked={data.sn_modal}
                                                        className="form-check-input mx-2"
                                                        onChange={DesactivarModal}
                                                    />

                                                    <InputError message={errors.sn_modal} className="mt-2" />
                                                </div>

                                                <div>
                                                    <label htmlFor="url" className='form-label'>URL</label>

                                                    <input
                                                        id="url"
                                                        type="text"
                                                        name="url"
                                                        value={data.url}
                                                        className="form-control"
                                                        onChange={(e) => setData('url', e.target.value)}
                                                        disabled={esModal}
                                                    />

                                                    <InputError message={errors.url} className="mt-2" />
                                                </div>
                                                <hr />
                                                <div className='mb-3'>
                                                    <label htmlFor="sn_activo" className='form-label'>Activo</label>

                                                    <input
                                                        id="sn_activo"
                                                        type="checkbox"
                                                        name="sn_activo"
                                                        checked={data.sn_activo}
                                                        className="form-check-input mx-2"
                                                        onChange={(e) => setData('sn_activo', e.target.checked)}
                                                    />

                                                    <InputError message={errors.sn_activo} className="mt-2" />
                                                </div>
                                                <div className="mt-4 row">
                                                    <div className='col-6'>
                                                    <button type="button" className="btn btn-secondary" onClick={() => reset()}>Limpiar</button>
                                                    </div>
                                                    <div className='col-6 d-flex justify-content-end'>
                                                    <button type="submit" className="btn btn-primary">Guardar</button>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
    )
}

export default CreateComponente;