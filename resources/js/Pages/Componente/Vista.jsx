import { React, useState } from 'react';
import './../../../css/app.css';
import CreateComponente from './Create';
import Modal from 'react-modal';
import EditComponente from './Edit';
import VerificarComponente from '@/Components/VerificarComponente';
import ComponenteModalOURL from '@/Components/ComponenteModal';

Modal.setAppElement('#app');

const Vista = ({ auth, componentes }) => {


    const [isVerModalOpen, setIsVerModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredItems, setFilteredItems] = useState(componentes);

    const handleSearch = () => {
        const resultados = componentes.filter((componente) =>
            componente.nombre.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredItems(resultados);
    };

    const limpiarSearch=()=>{
        setSearchQuery("");
        setFilteredItems(componentes)
    }

    const openVerModal = (item) => {
        setSelectedItem(item);
        setIsVerModalOpen(true);
    };

    const closeVerModal = () => {
        setIsVerModalOpen(false);
        setSelectedItem(null);
    };

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const openEditModal = (componente) => {
        setSelectedItem(componente);
        setIsEditModalOpen(true);
    };

    const closeEditModal = () => {
        setIsEditModalOpen(false);
        setSelectedItem(null);
    };

    // Modal Crear
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };


    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>

            <div className="d-flex justify-content-between mb-5">
                <h2 className="">Componentes</h2>
                <ComponenteModalOURL nombre={"NuevoComponente"} onclick={openModal} nombreBoton={'Nuevo'} />
            </div>
            <div className='row mx-4 my-4'>
                <div className="col-3">
                    <div className='input-group'>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Buscar por Nombre"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)} 
                        />
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={handleSearch} 
                        >
                            Buscar
                        </button>
                    </div>
                </div>
                <div className="col-2">
                    <button 
                    className="btn btn-secondary"
                    onClick={limpiarSearch}
                    >
                        Todos
                    </button>
                </div>
            </div>


            <div className="tabla-pantalla">
                <div className="table-responsive overflow-visible">
                    <table className="table table-striped table-hover align-middle">
                        <thead className="sticky-top">
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Nombre</th>
                                <th scope="col">Item/Proceso/Botón</th>
                                <th scope="col">URL</th>
                                <th scope="col">Modal</th>
                                <th scope="col">Activo</th>
                                <th scope="col">Opciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredItems.map((componente) => (
                                <tr key={componente.id}>
                                    <th scope="row">{componente.id}</th>
                                    <td>{componente.nombre}</td>
                                    <td>{componente.componente_item_proceso}</td>
                                    <td>{componente.url}</td>
                                    <td>{componente.sn_modal === 1 ? 'Si' : 'No'}</td>
                                    <td>{componente.sn_activo === 1 ? 'Si' : 'No'}</td>
                                    <td>
                                        <div className="dropdown">
                                            <button
                                                className="btn btn-secondary"
                                                type="button"
                                                id="dropdownMenu2"
                                                data-bs-toggle="dropdown"
                                                aria-haspopup="true"
                                                aria-expanded="false"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="16"
                                                    height="16"
                                                    fill="currentColor"
                                                    className="bi bi-three-dots-vertical"
                                                    viewBox="0 0 16 16"
                                                >
                                                    <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
                                                </svg>
                                            </button>
                                            <div
                                                className="dropdown-menu"
                                                aria-labelledby="dropdownMenu2"
                                            >
                                                <VerificarComponente nombre={'EditarComponente'}>
                                                    <a
                                                        className="dropdown-item"
                                                        onClick={() =>
                                                            openEditModal(componente)
                                                        }
                                                    >
                                                        Editar
                                                    </a>
                                                </VerificarComponente>
                                                <a
                                                    className="dropdown-item"
                                                    onClick={() =>
                                                        openVerModal(componente)
                                                    }
                                                >
                                                    Ver
                                                </a>
                                                <a
                                                    className="dropdown-item"
                                                    href={route(
                                                        'componente.cambiarEstado',
                                                        [componente]
                                                    )}
                                                >
                                                    {componente.sn_activo === 1
                                                        ? 'Desactivar'
                                                        : 'Activar'}
                                                </a>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                contentLabel={"Crear"}
                style={{
                    content: {
                        backgroundColor: '#ffffff',
                        borderRadius: '10px',
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                        padding: '20px',
                        maxWidth: '600px',
                        margin: '0 auto',
                        width: 'auto',
                        overflow: 'auto',
                        top: 'unset',
                        right: 'unset',
                        bottom: 'unset',
                        left: 'unset',
                    },
                }}
                overlayClassName="modal-overlay"
            >
                <div className="modal-header d-flex justify-content-between">
                    <h3 className="modal-title">Nuevo Componente</h3>
                    <button
                        type="button"
                        className="btn-close"
                        onClick={closeModal}
                        aria-label="Cerrar"
                    ></button>
                </div>

                <div className="mb-auto">
                    <CreateComponente closeModal={closeModal} />
                </div>
            </Modal>
            <Modal
                isOpen={isVerModalOpen}
                onRequestClose={closeVerModal}
                contentLabel={"Ver"}
                style={{
                    content: {
                        backgroundColor: '#ffffff',
                        borderRadius: '10px',
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                        padding: '20px',
                        maxWidth: '600px',
                        margin: '0 auto',
                        width: 'auto',
                        overflow: 'auto',
                        top: 'unset',
                        right: 'unset',
                        bottom: 'unset',
                        left: 'unset',
                    }
                }}
                overlayClassName="modal-overlay"
            >
                <div className="modal-dialog modal-lg h-100">
                    <div className="modal-content h-100">
                        <div className="modal-header d-flex justify-content-between">
                            <h5 className="modal-title mb-3">
                                {selectedItem && (
                                    <span>Ver Componente - {selectedItem.id}</span>
                                )}
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                onClick={closeVerModal}
                                aria-label="Cerrar"
                            ></button>
                        </div>
                        <div className="modal-body h-100 d-flex flex-column">
                            <div className='mb-auto'>
                                <div className="card">
                                    <div className="card-body">
                                        {selectedItem && (
                                            <>
                                                <div className="row">
                                                    <p className="col-6">Nombre: <span className="text-muted">{selectedItem.nombre}</span></p>
                                                    <p className="col-6">Descripción: <span className="text-muted">{selectedItem.componente_item_proceso}</span></p>
                                                    <p className="col-6">Información: <span className="text-muted">{selectedItem.informacion}</span></p>


                                                </div>
                                                <hr />
                                                <p className="col-6">URL: <span className="text-muted">{selectedItem.url}</span></p>

                                                <hr />
                                                <div className="row">
                                                    <p className="col-6">Modal: <span className="text-muted">{selectedItem.sn_modal === 1 ? 'Si' : 'No'}</span></p>
                                                    <p className="col-6">Activo: <span className="text-muted">{selectedItem.sn_activo === 1 ? 'Si' : 'No'}</span></p>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>
                                <div className="d-flex justify-content-end">
                                    <button onClick={closeVerModal} className="btn btn-secondary mt-3">Cerrar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
            <Modal
                isOpen={isEditModalOpen}
                onRequestClose={closeEditModal}
                contentLabel={'Editar'}
                style={{
                    content: {
                        backgroundColor: '#ffffff',
                        borderRadius: '10px',
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                        padding: '20px',
                        maxWidth: '600px',
                        margin: '0 auto',
                        width: 'auto',
                        overflow: 'auto',
                        top: 'unset',
                        right: 'unset',
                        bottom: 'unset',
                        left: 'unset',
                    },
                }}
                overlayClassName="modal-overlay"
            >
                <div className="modal-header d-flex justify-content-between">
                    <h3 className="modal-title">Editar Componente</h3>
                    <button
                        type="button"
                        className="btn-close"
                        onClick={closeEditModal}
                        aria-label="Cerrar"
                    ></button>
                </div>

                <div className="mb-auto">
                    <EditComponente
                        closeModal={closeEditModal}
                        componente={selectedItem}
                    />
                </div>
            </Modal>
        </>
    );
};

export default Vista;