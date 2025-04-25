import React from 'react';
import { useForm } from '@inertiajs/react';
import InputError from '@/Components/InputError';

const EditComponente = ({ componente, closeModal }) => {
    // Proporciona valores predeterminados si 'componente' es null o undefined
    const initialValues = {
        nombre: componente?.nombre || '',
        descripcion: componente?.componente_item_proceso || '',
        informacion: componente?.informacion || '',
        url: componente?.url || '',
    };

    const { data, errors, setData, put } = useForm(initialValues);

    const submit = (e) => {
        e.preventDefault();
        put(route('componente.update', componente?.id), {
            onSuccess: () => {
                window.location.reload();
                closeModal(); // Cierra el modal al guardar exitosamente
            },
        });
    };

    return (
        <div className="py-3">
                    <div className="card">
                        <div className="card-body">
                            <form onSubmit={submit}>
                                <div className="mb-3 row">
                                    <div className="col-6">
                                        <label htmlFor="nombre" className="form-label">Nombre</label>
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
                                        <label htmlFor="componente_item_proceso" className="form-label">Descripción</label>
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
                                <hr />
                                <div>
                                    <label htmlFor="url" className="form-label">URL</label>
                                    <input
                                        id="url"
                                        type="text"
                                        name="url"
                                        value={data.url}
                                        className="form-control"
                                        onChange={(e) => setData('url', e.target.value)}
                                    />
                                    <InputError message={errors.url} className="mt-2" />
                                </div>
                                <div className="mt-4 row">
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

export default EditComponente;