import React, { useState } from 'react';
import Modal from 'react-modal';
import { Link } from '@inertiajs/react';

import './styles.css';
import CategoriaContacto from './../Categoria/CategoriaContacto';
import { Dropdown } from 'react-bootstrap';
import AsignarCategoria from '../Categoria/AsignarCategoria';

Modal.setAppElement('#app');
const Index = ({ contactos }) => {


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


    

    return (
        <div style={{ textAlign: 'left' }}>
            <h2>Contactos</h2>
            <div className="container mt-4">
                <div className="row mb-3">
                    <div className="col-md-6">
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

                    <div className="col-md-6 text-right">
                        <Link href="/contacto/create" className="btn btn-dark">
                            Crear Contacto
                        </Link>
                    </div>
                </div>
                <div className="table-responsive" style={{ maxHeight: '500px', minHeight: '500px', overflowY: 'auto' }}>
                    <table className="table table-striped">
                        <thead className="thead-dark" style={{ position: 'sticky', top: 0, zIndex: 10 }}>
                            <tr>
                                <th>Apellido / Razon Social</th>
                                <th>Nombre / Nombre Fantasia</th>
                                <th>Persona</th>
                                <th>Identificación</th>
                                <th>Email</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredItems?.map(contact => (
                                <tr key={contact.id}>
                                    <td>{contact.apellidorazonsocial}</td>
                                    <td>{contact.nombrefantasia}</td>
                                    <td>{contact.fisicojuridico}</td>
                                    <td>{contact.fisicojuridico === 'JURIDICO' ? (contact.identidad_tributaria + ' ' + contact.id_identidadtributaria_dato) : (contact.identidad_personal + ' ' + contact.id_personal_dato)}</td>
                                    <td>{contact.mail_direccion}</td>
                                    <td >
                                        <Dropdown >
                                            <Dropdown.Toggle variant="dark" size="sm" className="w-100"></Dropdown.Toggle>
                                            <Dropdown.Menu >
                                                <Dropdown.Item >
                                                    <button className="btn w-100 text-start " onClick={() => openModal(contact)}>Más Info</button>
                                                </Dropdown.Item>
                                                <Dropdown.Item as={Link} href={`/contacto/${contact.id}/edit`}>
                                                    <button className="btn w-100 text-start ">Editar</button>
                                                </Dropdown.Item>
                                                <Dropdown.Item>
                                                    <button className="btn w-100 text-start " onClick={() => openModalCategoria(contact)}>Categoria</button>
                                                </Dropdown.Item>
                                                <Dropdown.Item>
                                                    <button className="btn w-100 text-start " onClick={() => openModalAddCategoria(contact)}>Asignar Categoria</button>
                                                </Dropdown.Item>
                                                <Dropdown.Item as={Link} href={`/contacto/${contact.id}/radicaciones`}>
                                                    <button className="btn w-100 text-start ">Radicaciones</button>
                                                </Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
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
