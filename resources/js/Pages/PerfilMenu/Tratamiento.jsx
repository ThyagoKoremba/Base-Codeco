import React, { useState, useEffect } from 'react'; // Asegúrate de importar useState desde React
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, router } from '@inertiajs/react';
import Modal from 'react-modal';
import './../../../css/app.css';
import DashboardLayout from '@/Layouts/Sidebar';

Modal.setAppElement('#app');

const Create = ({ auth }) => {
    const initialValues = {
        id_menu: '',
        id_perfil: '',
        sn_activo: true,
    };

    const [shouldReset, setShouldReset] = useState(false);
    const [isPerfilModalOpen, setIsPerfilModalOpen] = useState(false);
    const [perfilSearchQuery, setPerfilSearchQuery] = useState('');
    const [perfilSearchResults, setPerfilSearchResults] = useState([]);
    const [perfilCurrentPage, setPerfilCurrentPage] = useState(1);
    const [perfilLastPage, setPerfilLastPage] = useState(1);
    const [nombrePerfil, setNombrePerfil] = useState('');
    const [perfilSeleccionado, setPerfilSeleccionado] = useState(null);
    const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);
    const [menuSearchQuery, setMenuSearchQuery] = useState('');
    const [menuSearchResults, setMenuSearchResults] = useState([]);
    const [menuCurrentPage, setMenuCurrentPage] = useState(1);
    const [menuLastPage, setMenuLastPage] = useState(1);
    const [nombreMenu, setNombreMenu] = useState('');
    const [perfilMenuData, setPerfilMenuData] = useState([]);

    const { data, setData, post } = useForm(initialValues);

        const fetchData = async () => {
            const response = await fetch('/configuracion/perfil-menu/perfil-menu-data');
            const result = await response.json();
            setPerfilMenuData(result.data);
        };

        useEffect(()=>{
            fetchData();
        },[])

    //Guardar Cambios en las relacion menu-componentes
    const handleSubmit = (e) => {
        e.preventDefault();

        const dataToSend = {
            id_menu: data.id_menu,
            id_perfil: data.id_perfil,
            sn_activoo: data.sn_activo,
        };

        post(route('perfilmenu.store'), dataToSend)
        fetchData();
    };

    const handleReset = () => {
        setNombreMenu('');
        setPerfilSeleccionado(null);
        setNombrePerfil('');
    };

    if (shouldReset) {
        handleReset();
        setShouldReset(false);
    }

    // FETCH para los componentes del modal
    const fetchPerfilSearchResults = async (page = 1) => {
        const response = await fetch(`/configuracion/perfil-menu/search-perfil?query=${perfilSearchQuery}&page=${page}`);
        const data = await response.json();

        setPerfilSearchResults(data.data);
        setPerfilCurrentPage(data.current_page);
        setPerfilLastPage(data.last_page);
    };



    // FETCH para traer los Menus
    const fetchMenuSearchResults = async (page = 1) => {
        try {
            const response = await fetch(`/configuracion/perfil-menu/search-menus?query=${menuSearchQuery}&page=${page}`);
            const data = await response.json();
            setMenuSearchResults(data.data);
            setMenuCurrentPage(data.current_page);
            setMenuLastPage(data.last_page);
        } catch (error) {
            console.error('Error al realizar la solicitud:', error);
        }
    };

    // Función para seleccionar un componente
    const handleSelectPerfil = (perfil) => {
        data.id_perfil = perfil.id;
        setNombrePerfil(perfil.nombre);
        setPerfilSeleccionado(perfil);
        closeModal();
    };

    // Función para seleccionar una menu
    const handleSelectMenu = (menu) => {
        data.id_menu = menu.id;
        setNombreMenu(menu.nombre);
        closeModal();
    };

    const openMenuModal = () => {
        setIsMenuModalOpen(true);
    };

    const openPerfilModal = () => {
        setIsPerfilModalOpen(true);
    };

    const closeModal = () => {
        setIsMenuModalOpen(false);
        setMenuSearchResults([]);
        setMenuSearchQuery('');
        setIsPerfilModalOpen(false);
        setPerfilSearchResults([]);
        setPerfilSearchQuery('');
    };

    return (
      <>
   
                <div className="d-flex justify-content-between">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">Perfil - Menú</h2>
                </div>

            <div className='container'>
                <div className="card">
                    <div className="card-body">
                        {/* BOTONES DE BUSQUEDA */}
                        <form onSubmit={handleSubmit}>
                            <div className='row mb-3 justify-content-between'>
                                <div className="card col-5 mb-3 mx-3">
                                    <h3 className='p-2'>Perfil</h3>
                                    <div className="input-group mb-3 p-2 ">
                                        <input
                                            id="Perfil"
                                            type="text"
                                            name="Perfil"
                                            value={nombrePerfil}
                                            className="form-control"
                                            readOnly
                                        />
                                        <button
                                            className="btn btn-primary"
                                            onClick={(e) => {
                                                e.preventDefault(); // Prevent form submission
                                                openPerfilModal();
                                            }}
                                        >
                                            Buscar
                                        </button>
                                    </div>
                                </div>
                                <div className="card col-5 mb-3 mx-3">
                                    <h3 className='p-2'>Menú</h3>
                                    <div className="input-group mb-3 p-2">
                                        <input
                                            id="Menu"
                                            type="text"
                                            name="Menu"
                                            value={nombreMenu}
                                            className="form-control"
                                            readOnly
                                        />
                                        <button
                                            className="btn btn-primary"
                                            onClick={(e) => {
                                                e.preventDefault(); // Prevent form submission
                                                openMenuModal();
                                            }}
                                        >
                                            Buscar
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="my-4 row d-flex justify-content-between">
                                <div className="col-5">

                                </div>
                                <div className="col-5 d-flex justify-content-between">
                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        onClick={(e) => {
                                            e.preventDefault(); // Prevent form submission
                                            handleReset();
                                        }}
                                    >
                                        Limpiar
                                    </button>
                                    <button type='submit'
                                        className='btn btn-primary'
                                        onClick={handleSubmit}>Guardar</button>
                                </div>
                            </div>
                        </form>

                        <table className='table'>
                            <thead>
                                <tr>
                                    <th>Perfil Nombre</th>
                                    <th>Perfil ID</th>
                                    <th>Perfil Estado</th>
                                    <th>Menú Nombre</th>
                                    <th>Menú ID</th>
                                    <th>Menú Estado</th>
                                    <th>Estado Perfil-Menú</th>
                                </tr>
                            </thead>
                            <tbody>
                                {perfilMenuData.map((item) => (
                                    <tr key={`${item.perfil_id}-${item.menu_id}`}>

                                        <td>{item.perfil_nombre}</td>
                                        <td>{item.perfil_id}</td>
                                        <td>{item.perfil_activo ? 'Activo' : 'Inactivo'}</td>

                                        <td>{item.menu_nombre}</td>
                                        <td>{item.menu_id}</td>
                                        <td>{item.menu_activo ? 'Activo' : 'Inactivo'}</td>
                                        <td>{item.relacion_activa ? 'Activo' : 'Inactivo'}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <Modal
                isOpen={isMenuModalOpen || isPerfilModalOpen}
                onRequestClose={closeModal}
                contentLabel={isMenuModalOpen ? "Buscar Menú" : "Buscar Perfil"}
                style={{
                    content: {
                        backgroundColor: '#ffffff',
                        borderRadius: '10px',
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                        padding: '20px',
                        maxWidth: '600px',
                        margin: '0 auto',
                        width: '50%',
                        overflow: 'auto',
                        inset: 'unset',
                    }
                }}
                overlayClassName="modal-overlay"
            >
                <div className="modal-dialog modal-lg h-100">
                    <div className="modal-content h-100">
                        <div className="modal-header d-flex justify-content-between">
                            <h5 className="modal-title mb-3">
                                {isMenuModalOpen ? "Buscar Menu" : "Buscar Perfil"}
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                onClick={closeModal}
                                aria-label="Cerrar"
                            ></button>
                        </div>
                        <div className="modal-body h-100 d-flex flex-column">
                            <div className='mb-auto'>
                                <div className="card">
                                    <div className="card-body">
                                        <div className='input-group'>
                                            <input
                                                type="text"
                                                value={
                                                    isMenuModalOpen
                                                        ? menuSearchQuery
                                                        : perfilSearchQuery}
                                                onChange={(e) => {
                                                    if (isMenuModalOpen) {
                                                        setMenuSearchQuery(e.target.value);
                                                    } else {
                                                        setPerfilSearchQuery(e.target.value);
                                                    }
                                                }}
                                                placeholder={
                                                    isMenuModalOpen
                                                        ? "Buscar por nombre de Menú" : "Buscar por nombre de Perfil"}
                                                className="form-control"
                                            />
                                            <button
                                                type="button"
                                                className="btn btn-primary"
                                                onClick={() => {
                                                    if (isMenuModalOpen) {
                                                        fetchMenuSearchResults();
                                                    } else {
                                                        fetchPerfilSearchResults();
                                                    }
                                                }}
                                            >
                                                Buscar
                                            </button>
                                        </div>
                                    </div>
                                    <table className="table table-hover" style={{ cursor: 'pointer' }}>
                                        <thead>
                                            <tr>
                                                <th>Nombre</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {(isMenuModalOpen
                                                ? menuSearchResults
                                                : perfilSearchResults).length > 0 ? (
                                                (isMenuModalOpen
                                                    ? menuSearchResults
                                                    : perfilSearchResults).map((item) => (
                                                        <tr key={item.id}>
                                                            <td
                                                                className='table-hover'
                                                                onClick={() => {
                                                                    if (isMenuModalOpen) {
                                                                        handleSelectMenu(item);
                                                                    } else {
                                                                        handleSelectPerfil(item);
                                                                    }
                                                                }}
                                                            >
                                                                {isMenuModalOpen
                                                                    ? item.nombre
                                                                    : isPerfilModalOpen
                                                                        ? item.relacion !== null
                                                                            ? <p>{item.nombre} <span className='text-muted'>- Asignado</span></p>
                                                                            : <p>{item.nombre}</p>
                                                                        : item.nombre}
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

                                    {(isMenuModalOpen
                                        ? menuSearchResults
                                        : perfilSearchResults
                                    ).length > 0 ? (
                                        <div className="d-flex justify-content-center gap-2 my-2">
                                            <button
                                                type="button"
                                                className="btn btn-secondary"
                                                onClick={() => {
                                                    if (isMenuModalOpen) {
                                                        fetchMenuSearchResults(menuCurrentPage - 1);
                                                    } else {
                                                        fetchPerfilSearchResults(perfilCurrentPage - 1);
                                                    }
                                                }}
                                                disabled={
                                                    isMenuModalOpen
                                                        ? menuCurrentPage === 1
                                                        : perfilCurrentPage === 1
                                                }
                                            >
                                                <span aria-hidden="true">&laquo;</span>
                                            </button>
                                            <span>
                                                {isMenuModalOpen
                                                    ? menuCurrentPage
                                                    : perfilCurrentPage} de{" "}
                                                {isMenuModalOpen
                                                    ? menuLastPage
                                                    : perfilLastPage}
                                            </span>
                                            <button
                                                type="button"
                                                className="btn btn-secondary"
                                                onClick={() => {
                                                    if (isMenuModalOpen) {
                                                        fetchMenuSearchResults(menuCurrentPage + 1);
                                                    } else {
                                                        fetchPerfilSearchResults(perfilCurrentPage + 1);
                                                    }
                                                }}
                                                disabled={
                                                    isMenuModalOpen
                                                        ? menuCurrentPage === menuLastPage
                                                        : perfilCurrentPage === perfilLastPage
                                                }
                                            >
                                                <span aria-hidden="true">&raquo;</span>
                                            </button>
                                        </div>
                                    ) : (
                                        ''
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        </>
   
    );
};

export default Create;