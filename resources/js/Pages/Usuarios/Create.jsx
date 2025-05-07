import React from 'react';
import { useForm } from '@inertiajs/react';
import InputError from '@/Components/InputError';

const CreateUser = ({ closeModal }) => {
    const initialValues = {
        name:'',
        email: '',
        password:''
    };

    const { data, errors, setData, put } = useForm(initialValues);

    const submit = (e) => {
        e.preventDefault();
        put(route('usuario.store'), {
            onSuccess: () => {
                window.location.reload();
                closeModal(); // Cierra el modal
            }
        });
    };

    return (

        <div className="py-3">
            <div className='card'>
                <div className='card-body'>

                    <form onSubmit={submit}>
                        <div className="mb-3 row">
                            <div className="col-6">
                                <label htmlFor="name" className="form-label">Nombre</label>
                                <input
                                    id="name"
                                    type="text"
                                    name="name"
                                    value={data.name}
                                    className="form-control"
                                    onChange={(e) => setData('name', e.target.value)}
                                />
                                <InputError message={errors.name} className="mt-2" />
                            </div>
                            <div className="col-6">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input
                                    id="email"
                                    type="text"
                                    name="email"
                                    value={data.email}
                                    className="form-control"
                                    onChange={(e) => setData('email', e.target.value)}
                                />
                                <InputError message={errors.email} className="mt-2" />
                            </div>
                            <div className="col-6">
                                <label htmlFor="password" className="form-label">Contraseña</label>
                                <input
                                    id="password"
                                    type="text"
                                    name="password"
                                    value={data.password}
                                    className="form-control"
                                    onChange={(e) => setData('password', e.target.value)}
                                />
                                <InputError message={errors.password} className="mt-2" />
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

export default CreateUser;