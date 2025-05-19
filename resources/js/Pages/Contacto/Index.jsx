import React, { useState } from 'react';
import Modal from 'react-modal';
import { Link } from '@inertiajs/react';

import './styles.css';
import CategoriaContacto from './../Categoria/CategoriaContacto';
import { Dropdown } from 'react-bootstrap';
import AsignarCategoria from '../Categoria/AsignarCategoria';

Modal.setAppElement('#app');
const Index = ({ contactos }) => {


console.log(contactos);

    const [searchQuery, setSearchQuery] = useState("");
    const [modal, setModal] = useState(false);
    const [modalCategoria, setModalCategoria] = useState(false);
    const [selectedContact, setSelectedContact] = useState(null);
    const [modalAddCategoria, setModalAddCategoria] = useState(false);
    const [filteredItems, setFilteredItems] = useState(contactos);

    const handleSearch = () => {
        const resultados = contactos.filter((contactos) =>
            contactos.nombrefantasia.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredItems(resultados);
    };

    const openModal = (contact) => {
        setSelectedContact(contact);
        setModal(true);
    }

    const closeModal = () => {
        setModal(false);
        setSelectedContact(null);
    }
    const openModalCategoria = (contact) => {
        setSelectedContact(contact);
        setModalCategoria(true);
    }
    const closeModalCategoria = () => {
        setModalCategoria(false);
        setSelectedContact(null);
    }

    const openModalAddCategoria = (contact) => {
        setSelectedContact(contact);
        setModalAddCategoria(true);
    }
    const closeModalAddCategoria = () => {
        setModalAddCategoria(false);
        setSelectedContact(null);
    }

const handleLimpiar = () => {
    setSearchQuery("");
};
    

    return (
        <div style={{ textAlign: 'left' }}>
            <h2>Contactos</h2>
            <div className="container mt-4">
                <div className="row mb-3">
                    <div className="col-4">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Contacto"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)} 
                        />
                    </div>
                    <div className="col-3">
                        <button
                            type="button"
                            className="btn btn-primary "
                            onClick={handleSearch} 
                        >
                            Buscar
                        </button>
                          <button
                            type="button"
                            className="btn btn-primary ms-2"
                            onClick={handleLimpiar} 
                        >
                           <i class="fa-solid fa-filter-circle-xmark"></i>
                        </button>
                    </div>
                   
                    <div className="col-md-4 d-flex justify-content-end align-items-end">
                        <Link href="/contacto/create" className="btn btn-dark">
                            Nuevo
                        </Link>
                    </div>
                </div>
                <div className="table-responsive" style={{ maxHeight: '500px', minHeight: '500px', overflowY: 'auto' }}>
                    <table className="table table-bordered  table-striped">
                        <thead  style={{ position: 'sticky', top: 0, zIndex: 10, textAlign: 'center' }}>
                            <tr >
                                <th >Apellido / Nombre - Razon Social</th>
                                <th>ID</th>
                                <th>ID Persona / Tribut</th>
                                <th>Cond. Tribut.</th>
                                <th>Teléfono</th>
                                <th>Email</th>
                                <th>País/Pcia-SR</th>
                                <th>Situación</th>
                                <th ></th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredItems?.map(contact => (
                                <tr style={{ textAlign: 'center'}} key={contact.id}>
                                    <td>{contact.apellidoynombre}</td>
                                    <td>{contact.id}</td>
                                    
                                    <td>{contact.id_fisicojuridico === 2 ? (contact.identidad_tributaria + ' ' + contact.id_identidadtributaria_dato) : (contact.identidad_personal + ' ' + contact.id_personal_dato)}</td>
                                    <td>{contact.id_condiciontributaria}</td>
                                    <td>{contact.telefono_numero}</td>
                                    <td>{contact.mail_direccion}</td>
                                    <td>{contact.pais} / {contact.provincia} / {contact.sucursal}</td>
                                    <td>{contact.sn_activo === 1 ? 'Activo' : 'Inactivo'}</td>
                                    
                                    <td style={{ textAlign: 'right' }}>
                                        <div className="dropdown ">
                                            <button className="btn btn-dark" type="button" id="dropdownMenu2"
                                                data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                    fill="currentColor" className="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                                                    <path
                                                        d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
                                                </svg>
                                            </button>
                                            <ul className="dropdown-menu dropdown-menu-end">
                                                <li>
                                                    <button className="dropdown-item" onClick={() => openModal(contact)}>
                                                        Más Info
                                                    </button>
                                                </li>
                                                <li>
                                                    <Link href={`/contacto/${contact.id}/edit`} className="dropdown-item">
                                                        Editar
                                                    </Link>
                                                </li>
                                                <li>
                                                    <button className="dropdown-item" onClick={() => openModalCategoria(contact)}>
                                                        Categoria
                                                    </button>
                                                </li>
                                                <li>
                                                    <Link href={`/contacto/${contact.id}/radicaciones`} className="dropdown-item">
                                                        Radicaciones
                                                    </Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <Modal
                isOpen={modalCategoria}
                onRequestClose={closeModalCategoria}
                contentLabel={selectedContact?.nombrefantasia}
                className="modal"
                overlayClassName="modal-overlay"
            >
                <div className="modal-header">
                    <h5 className="modal-title">{selectedContact?.apellidoynombre}</h5>
                    <button
                        type="button"
                        className="btn-close"
                        onClick={closeModalCategoria}
                        aria-label="Cerrar"
                    ></button>
                </div>
                <div className="container">
                    <CategoriaContacto userId={selectedContact?.id} />
                </div>
            </Modal>

            <Modal
                isOpen={modalAddCategoria}
                onRequestClose={closeModalAddCategoria}
                contentLabel={selectedContact?.nombrefantasia}
                className="modal"
                overlayClassName="modal-overlay"
            >
                <div className="modal-header">
                    <h5 className="modal-title">{selectedContact?.apellidoynombre}</h5>
                    <button
                        type="button"
                        className="btn-close"
                        onClick={closeModalAddCategoria}
                        aria-label="Cerrar"
                    ></button>
                </div>
                <div className="container">
                    <AsignarCategoria userId={selectedContact?.id} />
                </div>
            </Modal>

            <Modal
                isOpen={modal}
                onRequestClose={closeModal}
                contentLabel={selectedContact?.nombrefantasia}
                className="modal"
                overlayClassName="modal-overlay"
            >
                <div className="modal-header">
                    <h5 className="modal-title">{selectedContact?.apellidoynombre}</h5>
                    <button
                        type="button"
                        className="btn-close"
                        onClick={closeModal}
                        aria-label="Cerrar"
                    ></button>
                </div>
                <div className="modal-body" style={{ maxHeight: '370px', overflowY: 'auto' }}>
                    {selectedContact && (
                        <table className="table table-striped">
                            <tbody>
                                <tr>
                                    <th>Teléfono {selectedContact.telefono_sn_movil === '1' ? 'Móvil' : 'Fijo'}</th>
                                    <td>{selectedContact.telefono_numero}</td>
                                </tr>
                                <tr>
                                    <th>Condición</th>
                                    <td>{selectedContact.condiciontributaria}</td>
                                </tr>
                                <tr>
                                    <th>Dirección</th>
                                    <td>{selectedContact.direccion_calle}</td>
                                </tr>
                                <tr>
                                    <th>Región</th>
                                    <td>{selectedContact.region}</td>
                                </tr>
                                <tr>
                                    <th>País</th>
                                    <td>{selectedContact.pais}</td>
                                </tr>
                                <tr>
                                    <th>Observación</th>
                                    <td>{selectedContact.observacion}</td>
                                </tr>
                                <tr>
                                    <th>Activo</th>
                                    <td>{selectedContact.activo === '1' ? 'Activo' : 'Inactivo'}</td>
                                </tr>
                                <tr>
                                    <th>Estado</th>
                                    <td>{selectedContact.estado}</td>
                                </tr>
                            </tbody>
                        </table>
                    )}
                </div>
            </Modal>
        </div>
    );
}

export default Index;
