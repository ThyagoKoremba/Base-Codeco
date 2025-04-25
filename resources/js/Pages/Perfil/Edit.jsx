import React from 'react';
import { useForm } from '@inertiajs/react';
import InputError from '@/Components/InputError';

const EditPerfil = ({ perfil, closeModal }) => {
    const initialValues = {
        nombre: perfil?.nombre || '',
        abreviatura: perfil?.abreviatura || '',
        informacion: perfil?.informacion || '',
    };

    const { data, errors, setData, put } = useForm(initialValues);

    const submit = (e) => {
        e.preventDefault();
        put(route('perfil.update', perfil?.id), {
            onSuccess: () => {
                window.location.reload();
                closeModal(); // Cierra el modal al guardar exitosamente
            },
        });
    };

    return (

        <div className="py-3">
            <div className='card'>
                <div className='card-body'>

                    <form onSubmit={submit}>
                        <div className="mb-3 row">
                            <div className="col-6">
                                <label htmlFor="nombre" className="form-label" readOnly>Nombre</label>
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
                            <div className="col-6">
                                <label htmlFor="abreviatura" className="form-label">Abreviatura</label>
                                <input
                                    id="abreviatura"
                                    type="text"
                                    name="abreviatura"
                                    value={data.abreviatura}
                                    className="form-control"
                                    onChange={(e) => setData('abreviatura', e.target.value)}
                                />
                                <InputError message={errors.abreviatura} className="mt-2" />
                            </div>
                            <div className="col-6 my-3">
                                <label htmlFor="informacion" className="form-label">Información</label>
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
                        <div className="row">
                            <div className="d-flex justify-content-end">
                                <button type="submit" className="btn btn-primary">Guardar</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditPerfil;