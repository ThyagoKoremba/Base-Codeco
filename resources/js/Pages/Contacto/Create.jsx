import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import Modal from 'react-modal';



import './styles.css';
Modal.setAppElement('#app');

import Swal from 'sweetalert2';

const CreateContact = ({ auth, fisicojuridico, identidades, condicionestributarias }) => {

    const initialValues = {
        id_fisicojuridico: '0',
        id_pais: '',
        car: '',
        apellidorazonsocial: '',
        nombrefantasia: '',
        nombresegundo: '',
        id_personal: '',
        id_personal_dato: '0',
        id_condiciontributaria: '0',
        id_identidadtributaria: '0',
        id_identidadtributaria_dato: '0',
        mail_direccion: '',
        telefono_numero: '',
        telefono_sn_movil: false,
        observacion: '',
        id_provincia: '',
        id_subregion: '',
        direccion_calle: '',
        codigo_postal: '',
    };

    const { data, errors, setData, post, reset } = useForm(initialValues);

    const [nombre, setNombre] = useState('Nombre');
    const [apellido, setApellido] = useState('Apellido');
    const [segundo, setSegundo] = useState('1');
    const [mascaraTributaria, setMascaraTributaria] = useState('');

    const submit = (e) => {
        e.preventDefault();
        post(route('contacto.store'), {
            onSuccess: () => {
                Swal.fire({
                    title: 'Contacto Creado',
                    text: 'El contacto ha sido creado exitosamente.',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
                reset();
            }
        });
    };

    const [isPaisModalOpen, setIsPaisModalOpen] = useState(false);
    const [paisSearchQuery, setPaisSearchQuery] = useState('');
    const [paisSearchResults, setPaisSearchResults] = useState([]);
    const [paisCurrentPage, setPaisCurrentPage] = useState(1);
    const [paisLastPage, setPaisLastPage] = useState(1);
    const [nombrePais, setNombrePais] = useState('');

    const [isRegionModalOpen, setIsRegionModalOpen] = useState(false);
    const [regionSearchQuery, setRegionSearchQuery] = useState('');
    const [regionSearchResults, setRegionSearchResults] = useState([]);
    const [regionCurrentPage, setRegionCurrentPage] = useState(1);
    const [regionLastPage, setRegionLastPage] = useState(1);
    const [nombreRegion, setNombreRegion] = useState('');

    const [isProvinciaModalOpen, setIsProvinciaModalOpen] = useState(false);
    const [provinciaSearchQuery, setProvinciaSearchQuery] = useState('');
    const [provinciaSearchResults, setProvinciaSearchResults] = useState([]);
    const [provinciaCurrentPage, setProvinciaCurrentPage] = useState(1);
    const [provinciaLastPage, setProvinciaLastPage] = useState(1);
    const [nombreProvincia, setNombreProvincia] = useState('');

    const openProvinciaModal = () => {
        setIsProvinciaModalOpen(true);
    };

    const fetchProvinciaSearchResults = async (page = 1) => {
        try {
            const response = await fetch(`/contacto/search-prov?query=${provinciaSearchQuery}&page=${page}`);
            const data = await response.json();

            setProvinciaSearchResults(data.data);
            setProvinciaCurrentPage(data.current_page);
            setProvinciaLastPage(data.last_page);
        } catch (error) {
            console.error('Error fetching province search results:', error);
        }
    };

    const handleProvinciaSearchChange = (e) => {
        setProvinciaSearchQuery(e.target.value);
        fetchProvinciaSearchResults();
    };

    const handleSelectProvincia = (provincia) => {
        data.id_provincia = provincia.id;
        setNombreProvincia(provincia.descripcion);
        closeModal();
    };

    const openPaisModal = () => {
        setIsPaisModalOpen(true);
    };

    const openRegionModal = () => {
        setIsRegionModalOpen(true);
    };

    const closeModal = () => {
        setIsRegionModalOpen(false);
        setRegionSearchResults([]);
        setRegionSearchQuery('');
        setIsPaisModalOpen(false);
        setPaisSearchResults([]);
        setPaisSearchQuery('');
        setIsProvinciaModalOpen(false);
        setProvinciaSearchResults([]);
        setProvinciaSearchQuery('');
    };

    const fetchPaisSearchResults = async (page = 1) => {
        try {
            const response = await fetch(`/contacto/search-paises?query=${paisSearchQuery}&page=${page}`);
            const data = await response.json();

            setPaisSearchResults(data.data);
            setPaisCurrentPage(data.current_page);
            setPaisLastPage(data.last_page);
        } catch (error) {
            console.error('Error fetching country search results:', error);
        }
    };

    const fetchRegionSearchResults = async (page = 1) => {
        try {
            const response = await fetch(`/contacto/search-regiones?query=${regionSearchQuery}&page=${page}`);
            const data = await response.json();

            setRegionSearchResults(data.data);
            setRegionCurrentPage(data.current_page);
            setRegionLastPage(data.last_page);
        } catch (error) {
            console.error('Error fetching region search results:', error);
        }
    };

    const handlePaisSearchChange = (e) => {
        setPaisSearchQuery(e.target.value);
        fetchPaisSearchResults();
    };

    const handleRegionSearchChange = (e) => {
        setRegionSearchQuery(e.target.value);
        fetchRegionSearchResults();
    };

    const handleSelectPais = (pais) => {
        data.id_pais = pais.id;
        setNombrePais(pais.nombre);
        closeModal();
    };

    const handleSelectRegion = (region) => {
        data.id_subregion = region.id;
        setNombreRegion(region.descripcion);
        closeModal();
    };

    return (

        <>


            <h3 className="text-center ">Crear Contacto</h3>

            <div className="container">
                <div className="row">




                    <main className="col-md-12  col-lg-12 ">
                        <div className="py-5">
                            <div className="card shadow-sm">
                                <div className="card-body">
                                    <form onSubmit={submit} className="row g-3">
                                        {/* Form content */}
                                        <h4 className="mb-3">Información Personal</h4>

                                        <div className="col-md-6">
                                            <label htmlFor="persona" className="form-label">Persona</label>
                                            <select
                                                id="persona"
                                                name="persona"
                                                value={data.id_fisicojuridico}
                                                onChange={(e) => {
                                                    const selectedId = e.target.value;
                                                    setData('id_fisicojuridico', selectedId);

                                                    const selectedPersona = fisicojuridico.find(persona => persona.id == selectedId);
                                                    console.log(selectedPersona);
                                                    if (selectedPersona) {
                                                        setNombre(selectedPersona.texto_nombre);
                                                        setApellido(selectedPersona.texto_apellido);
                                                        setSegundo(selectedPersona.sn_segundonombre);
                                                    }
                                                }}
                                                className="form-select"
                                            >
                                                <option value="">Seleccionar</option>
                                                {fisicojuridico.slice(1).map((condicion) => (
                                                    <option key={condicion.id} value={condicion.id}>
                                                        {condicion.descripcion}
                                                    </option>
                                                ))}
                                            </select>
                                            {errors.id_fisicojuridico && <div className="text-danger mt-1">{errors.id_fisicojuridico}</div>}
                                        </div>

                                        <div className="col-md-6">
                                            <label htmlFor="apellido" className="form-label">{apellido}</label>
                                            <input
                                                id="apellido"
                                                type="text"
                                                name="apellido"
                                                value={data.apellidorazonsocial}
                                                className="form-control"
                                                onChange={(e) => setData('apellidorazonsocial', e.target.value)}
                                            />
                                            {errors.apellido && <div className="text-danger mt-1">{errors.apellido}</div>}
                                        </div>

                                        <div className="col-md-6">
                                            <label htmlFor="nombre" className="form-label">{nombre}</label>
                                            <input
                                                id="nombre"
                                                type="text"
                                                name="nombre"
                                                value={data.nombrefantasia}
                                                className="form-control"
                                                onChange={(e) => setData('nombrefantasia', e.target.value)}
                                            />
                                            {errors.nombre && <div className="text-danger mt-1">{errors.nombre}</div>}
                                        </div>

                                        <div className="col-md-6">
                                            <label htmlFor="segundoNombre" className="form-label">Segundo Nombre</label>
                                            <input
                                                id="segundoNombre"
                                                type="text"
                                                name="segundoNombre"
                                                value={data.nombresegundo}
                                                className="form-control"
                                                disabled={segundo === 0}
                                                onChange={(e) => setData('nombresegundo', e.target.value)}
                                            />
                                            {errors.segundoNombre && <div className="text-danger mt-1">{errors.segundoNombre}</div>}
                                        </div>

                                        <div className="col-md-6">
                                            <label htmlFor="pais" className="form-label">País</label>
                                            <div className="input-group">
                                                <input
                                                    id="pais"
                                                    type="text"
                                                    name="pais"
                                                    value={nombrePais}
                                                    className="form-control"
                                                    readOnly
                                                />
                                                <button
                                                    type="button"
                                                    className="btn btn-outline-secondary"
                                                    onClick={openPaisModal}
                                                >
                                                    Buscar
                                                </button>
                                            </div>
                                            {errors.id_pais && <div className="text-danger mt-1">{errors.id_pais}</div>}
                                        </div>

                                        <hr></hr>
                                        <h4 className="mt-4 mb-3">Información Tributaria</h4>

                                        <div className="col-md-8">
                                            <label htmlFor="condicionTributaria" className="form-label">Condición </label>
                                            <select
                                                id="condicionTributaria"
                                                name="condicionTributaria"
                                                value={data.id_condiciontributaria}
                                                onChange={(e) => setData('id_condiciontributaria', e.target.value)}
                                                className="form-select"
                                            >
                                                <option value="">Seleccionar</option>
                                                {condicionestributarias.map((condicion) => (
                                                    <option key={condicion.id} value={condicion.id}>
                                                        {condicion.descripcion}
                                                    </option>
                                                ))}
                                            </select>
                                            {errors.id_condiciontributaria && <div className="text-danger mt-1">{errors.id_condiciontributaria}</div>}
                                        </div>

                                        <div className="col-md-6">
                                            <label htmlFor="identidadTributaria" className="form-label">Identidad Tributaria</label>
                                            <select
                                                id="identidadTributaria"
                                                name="identidadTributaria"
                                                value={data.id_identidadtributaria}
                                                onChange={(e) => {
                                                    const selectedId = e.target.value;
                                                    setData('id_identidadtributaria', selectedId);

                                                    const selectedIdentidad = identidades.find(identidad => identidad.id == selectedId);
                                                    if (selectedIdentidad) {
                                                        setMascaraTributaria(selectedIdentidad.dato_mascara);
                                                    }
                                                }}
                                                className="form-select"
                                            >
                                                <option value="">Seleccionar</option>
                                                {data.id_fisicojuridico == 2
                                                    ? identidades.filter(identidad => identidad.sn_juridica == 1).map((identidad) => (
                                                        <option key={identidad.id} value={identidad.id}>
                                                            {identidad.descripcion}
                                                        </option>
                                                    ))
                                                    : identidades.filter(identidad => identidad.sn_identidadtributaria == 0).map((identidad) => (
                                                        <option key={identidad.id} value={identidad.id}>
                                                            {identidad.descripcion}
                                                        </option>
                                                    ))
                                                }
                                            </select>
                                            {errors.id_identidadtributaria && <div className="text-danger mt-1">{errors.id_identidadtributaria}</div>}
                                        </div>

                                        <div className="col-md-6">
                                            <label htmlFor="valorIdTributaria" className="form-label">Valor</label>
                                            <input
                                                
                                                id="valorIdTributaria"
                                                type="text"
                                                placeholder={mascaraTributaria}
                                                maxLength={mascaraTributaria.length}
                                                name="valorIdTributaria"
                                                value={data.id_identidadtributaria_dato}
                                                className="form-control"
                                                onChange={(e) => setData('id_identidadtributaria_dato', e.target.value)}
                                                disabled={data.id_identidadtributaria === "1" || data.id_identidadtributaria === ""}
                                            />
                                            {errors.id_identidadtributaria_dato && <div className="text-danger mt-1">{errors.id_identidadtributaria_dato}</div>}
                                        </div>

                                        <hr></hr>

                                        <h4 className="mt-4 mb-3">Información Personal</h4>

                                        <div className="col-md-6">
                                            <label htmlFor="identidadPersonal" className="form-label">Identidad Personal</label>
                                            <select

                                                disabled={data.id_fisicojuridico == '2'}
                                                id="identidadTributaria"
                                                name="identidadTributaria"
                                                value={data.id_personal}
                                                onChange={(e) => {
                                                    const selectedIdPersonal = e.target.value;
                                                    setData('id_personal', selectedIdPersonal);

                                                    const selectedPersonal = identidades.find(identidad => identidad.id == selectedIdPersonal);
                                                    if (selectedPersonal) {
                                                        setMascaraTributaria(selectedPersonal.dato_mascara);
                                                    }
                                                }}
                                                className="form-select"
                                            >
                                                <option value="">Seleccionar</option>
                                                {identidades.filter(identidad => identidad.sn_juridica == 0).map((identidad) => (
                                                    <option key={identidad.id} value={identidad.id}>
                                                        {identidad.descripcion}
                                                    </option>
                                                ))}
                                            </select>
                                            {errors.id_personal && <div className="text-danger mt-1">{errors.id_personal}</div>}
                                        </div>

                                        <div className="col-md-6">
                                            <label htmlFor="valorIdPersona" className="form-label">Valor</label>
                                            <input
                                                id="valorIdPersona"
                                                type="text"
                                                name="valorIdPersona"
                                                value={data.id_personal_dato}
                                                className="form-control"
                                                maxLength="13"
                                                onChange={(e) => setData('id_personal_dato', e.target.value)}
                                                disabled={data.id_fisicojuridico == '2' || data.id_personal === ""}
                                            />
                                            {errors.id_personal_dato && <div className="text-danger mt-1">{errors.id_personal_dato}</div>}
                                        </div>

                                        <div className="col-md-6">
                                            <p>El código de acceso rápido es un número rápido e identificatorio para el contacto. Se recomienda usar los dos primeros y los tres últimos dígitos del CUIT. Por ejemplo: 20-12345678-9 = 12789</p>
                                        </div>

                                        <div className="col-md-4">
                                            <label htmlFor="codigoAccesoRapido" className="form-label">Código de Acceso Rápido</label>
                                            <input
                                                id="codigoAccesoRapido"
                                                type="number"
                                                maxLength="5"
                                                name="codigoAccesoRapido"
                                                value={data.car}
                                                className="form-control"
                                                onChange={(e) => setData('car', e.target.value)}
                                            />
                                            {errors.car && <div className="text-danger mt-1">{errors.car}</div>}
                                        </div>
                                        <hr />
                                        <h4 className="mt-4 mb-3">Domicilio</h4>
                                        <div className="col-md-6">
                                            <label htmlFor="provincia" className="form-label">Provincia</label>
                                            <div className="input-group">
                                                <input
                                                    id="provincia"
                                                    type="text"
                                                    name="provincia"
                                                    value={nombreProvincia}
                                                    className="form-control"
                                                    readOnly
                                                />
                                                <button
                                                    type="button"
                                                    className="btn btn-outline-secondary"
                                                    onClick={openProvinciaModal}
                                                >
                                                    Buscar
                                                </button>
                                            </div>
                                            {errors.id_provincia && <div className="text-danger mt-1">{errors.id_provincia}</div>}
                                        </div>

                                        <div className="col-md-6">
                                            <label htmlFor="region" className="form-label">Región</label>
                                            <div className="input-group">
                                                <input
                                                    id="region"
                                                    type="text"
                                                    name="region"
                                                    value={nombreRegion}
                                                    className="form-control"
                                                    readOnly
                                                />
                                                <button
                                                    type="button"
                                                    className="btn btn-outline-secondary"
                                                    onClick={openRegionModal}
                                                >
                                                    Buscar
                                                </button>
                                            </div>
                                            {errors.id_subregion && <div className="text-danger mt-1">{errors.id_subregion}</div>}
                                        </div>

                                        <div className="col-md-6">
                                            <label htmlFor="domicilio" className="form-label">Domicilio</label>
                                            <input
                                                id="domicilio"
                                                type="text"
                                                name="domicilio"
                                                value={data.direccion_calle}
                                                className="form-control"
                                                onChange={(e) => setData('direccion_calle', e.target.value)}
                                            />
                                            {errors.direccion_calle && <div className="text-danger mt-1">{errors.direccion_calle}</div>}
                                        </div>

                                        <div className="col-md-6">
                                            <label htmlFor="codigoPostal" className="form-label">Código Postal</label>
                                            <input
                                                id="codigoPostal"
                                                type="text"
                                                name="codigoPostal"
                                                value={data.codigo_postal}
                                                className="form-control"
                                                onChange={(e) => setData('codigo_postal', e.target.value)}
                                            />
                                            {errors.codigo_postal && <div className="text-danger mt-1">{errors.codigo_postal}</div>}
                                        </div>

                                        <div className="col-md-3">
                                            <label htmlFor="telefono_numero" className="form-label">Teléfono </label>
                                            <input
                                                id="telefono_numero"
                                                type="text"
                                                name="telefono_numero"
                                                value={data.telefono_numero}
                                                className="form-control"
                                                onChange={(e) => setData('telefono_numero', e.target.value)}
                                            />
                                            {errors.telefono_numero && <div className="text-danger mt-1">{errors.telefono_numero}</div>}
                                        </div>

                                        <div className="col-md-3 mt-5">

                                            <div className="form-check">
                                                <input
                                                    id="telefono_sn_movil"
                                                    type="checkbox"
                                                    name="telefono_sn_movil"
                                                    className="form-check-input"
                                                    checked={data.telefono_sn_movil}
                                                    onChange={(e) => setData('telefono_sn_movil', e.target.checked)}
                                                />
                                                <label className="form-check-label" htmlFor="telefono_sn_movil">
                                                    Es móvil
                                                </label>
                                            </div>
                                            {errors.telefono_sn_movil && <div className="text-danger mt-1">{errors.telefono_sn_movil}</div>}
                                        </div>

                                        <div className="col-md-6">
                                            <label htmlFor="email" className="form-label">Correo Electrónico</label>
                                            <input
                                                id="email"
                                                type="email"
                                                name="email"
                                                value={data.mail_direccion}
                                                className="form-control"
                                                onChange={(e) => setData('mail_direccion', e.target.value)}
                                            />
                                            {errors.mail_direccion && <div className="text-danger mt-1">{errors.mail_direccion}</div>}
                                        </div>
                                        <hr></hr>
                                        <div className="col-md-12">
                                            <label htmlFor="observacion" className="form-label"><h4>Observación</h4></label>
                                            <textarea
                                                id="observacion"
                                                name="observacion"
                                                value={data.observacion}
                                                className="form-control"
                                                onChange={(e) => setData('observacion', e.target.value)}
                                            />
                                            {errors.observacion && <div className="text-danger mt-1">{errors.observacion}</div>}
                                        </div>

                                        {/* Botones */}
                                        <div className="col-12 d-flex justify-content-end mt-4 gap-2">
                                            <button type="submit" className="btn btn-success">Guardar</button>
                                            <button type="button" className="btn btn-secondary" onClick={() => reset()}>Limpiar</button>

                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div >


            {/* Modal de búsqueda de países y regiones */}
            <Modal
                isOpen={isPaisModalOpen || isRegionModalOpen || isProvinciaModalOpen}
                onRequestClose={closeModal}
                contentLabel={
                    isPaisModalOpen
                        ? "Buscar País"
                        : isRegionModalOpen
                            ? "Buscar Región"
                            : "Buscar Provincia"
                }
                className="modal"
                style={{
                    content: {
                        backgroundColor: '#ffffff',
                        borderRadius: '10px',
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                        padding: '20px',
                        maxWidth: '600px',
                        margin: '0 auto',
                    }
                }}
                overlayClassName="modal-overlay"
            >
               
                        <div className="modal-header">
                            <h5 className="modal-title">
                                {isPaisModalOpen
                                    ? "Buscar País"
                                    : isRegionModalOpen
                                        ? "Buscar Región"
                                        : "Buscar Provincia"}
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                onClick={closeModal}
                                aria-label="Cerrar"
                            ></button>
                        </div>
                        <div className="modal-body">
                            <div className="input-group mb-3">
                                <input
                                    type="text"
                                    value={
                                        isPaisModalOpen
                                            ? paisSearchQuery
                                            : isRegionModalOpen
                                                ? regionSearchQuery
                                                : provinciaSearchQuery
                                    }
                                    onChange={(e) => {
                                        if (isPaisModalOpen) {
                                            setPaisSearchQuery(e.target.value);
                                        } else if (isRegionModalOpen) {
                                            setRegionSearchQuery(e.target.value);
                                        } else {
                                            setProvinciaSearchQuery(e.target.value);
                                        }
                                    }}
                                    placeholder={
                                        isPaisModalOpen
                                            ? "Buscar por nombre de país"
                                            : isRegionModalOpen
                                                ? "Buscar por nombre de región"
                                                : "Buscar por nombre de provincia"
                                    }
                                    className="form-control"
                                />
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={() => {
                                        if (isPaisModalOpen) {
                                            fetchPaisSearchResults();
                                        } else if (isRegionModalOpen) {
                                            fetchRegionSearchResults();
                                        } else {
                                            fetchProvinciaSearchResults();
                                        }
                                    }}
                                >
                                    Buscar
                                </button>
                            </div>
                            <table className="table table-hover" style={{ cursor: 'pointer' }}>
                                <thead>
                                    <tr>
                                        <th>Nombre</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {(isPaisModalOpen
                                        ? paisSearchResults
                                        : isRegionModalOpen
                                            ? regionSearchResults
                                            : provinciaSearchResults
                                    ).length > 0 ? (
                                        (isPaisModalOpen
                                            ? paisSearchResults
                                            : isRegionModalOpen
                                                ? regionSearchResults
                                                : provinciaSearchResults
                                        ).map((item) => (
                                            <tr key={item.id}>
                                                <td
                                                    className='table-hover'
                                                    onClick={() => {
                                                        if (isPaisModalOpen) {
                                                            handleSelectPais(item);
                                                        } else if (isRegionModalOpen) {
                                                            handleSelectRegion(item);
                                                        } else {
                                                            handleSelectProvincia(item);
                                                        }
                                                    }}
                                                >
                                                    {isPaisModalOpen
                                                        ? item.nombre
                                                        : isRegionModalOpen
                                                            ? item.descripcion
                                                            : item.descripcion}
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="2" className="text-center">No se encontraron resultados</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>

                            {(isPaisModalOpen
                                ? paisSearchResults
                                : isRegionModalOpen
                                    ? regionSearchResults
                                    : provinciaSearchResults
                            ).length > 0 ? (
                                <div className="d-flex justify-content-center gap-2">
                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        onClick={() => {
                                            if (isPaisModalOpen) {
                                                fetchPaisSearchResults(paisCurrentPage - 1);
                                            } else if (isRegionModalOpen) {
                                                fetchRegionSearchResults(regionCurrentPage - 1);
                                            } else {
                                                fetchProvinciaSearchResults(provinciaCurrentPage - 1);
                                            }
                                        }}
                                        disabled={
                                            isPaisModalOpen
                                                ? paisCurrentPage === 1
                                                : isRegionModalOpen
                                                    ? regionCurrentPage === 1
                                                    : provinciaCurrentPage === 1
                                        }
                                    >
                                        <span aria-hidden="true">&laquo;</span>
                                    </button>
                                    <span>
                                        {isPaisModalOpen
                                            ? paisCurrentPage
                                            : isRegionModalOpen
                                                ? regionCurrentPage
                                                : provinciaCurrentPage} de{" "}
                                        {isPaisModalOpen
                                            ? paisLastPage
                                            : isRegionModalOpen
                                                ? regionLastPage
                                                : provinciaLastPage}
                                    </span>
                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        onClick={() => {
                                            if (isPaisModalOpen) {
                                                fetchPaisSearchResults(paisCurrentPage + 1);
                                            } else if (isRegionModalOpen) {
                                                fetchRegionSearchResults(regionCurrentPage + 1);
                                            } else {
                                                fetchProvinciaSearchResults(provinciaCurrentPage + 1);
                                            }
                                        }}
                                        disabled={
                                            isPaisModalOpen
                                                ? paisCurrentPage === paisLastPage
                                                : isRegionModalOpen
                                                    ? regionCurrentPage === regionLastPage
                                                    : provinciaCurrentPage === provinciaLastPage
                                        }
                                    >
                                        <span aria-hidden="true">&raquo;</span>
                                    </button>
                                </div>
                            ) : (
                                ''
                            )}
                      
                </div>
            </Modal>



        </>
    );
};

export default CreateContact;
