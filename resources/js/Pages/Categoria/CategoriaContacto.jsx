import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import AsignarCategoria from './AsignarCategoria';
import './../Contacto/styles.css';

Modal.setAppElement('#app');

const CategoriaContacto = ({ userId }) => {
    const [categorias, setCategorias] = useState([]);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [editingData, setEditingData] = useState(null); // Estado para los datos de edición
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        if (userId) {
            fetch(`/categoria/getCategoriasByUserId/${userId}`)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    return response.json();
                })
                .then((data) => {
                    setCategorias(data.data);
                })
                .catch((error) => {
                    console.error('Error fetching categories:', error);
                    // Handle error display to user if needed
                });
        }
    }, [userId, modalIsOpen]); // Dependencia de modalIsOpen para que se actualice la lista al cerrar el modal

    function openModal() {
        setEditingData(null); // Limpiar datos de edición al abrir para crear
        setIsEditing(false);
        setIsOpen(true);
    }

    function openEditModal(data) {
        setEditingData(data); // Establecer datos para editar
        setIsEditing(true);
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    return (
        <div className="container mt-4 " style={{ maxWidth: '600px' }}>
            <div className="row mb-3">
                <div className="col-md-9">
                    <h3>Categorías </h3>
                </div>
                <div className="col-md-3 d-flex justify-content-end align-items-center">
                    <button className="btn btn-primary w-100" onClick={openModal}>
                        Nuevo
                    </button>
                </div>
            </div>
            {categorias.length === 0 ? (
                <p>No posee categorías asignadas.</p>
            ) : (
                <table className="table table-striped table-bordered">
                    <thead className="thead-dark">
                        <tr>
                            <th>Descripción</th>
                            <th>ID</th>
                            <th>ID/MAT/N°</th>
                            <th>OTORGADO POR</th>
                            <th>Acciones</th> {/* Nueva columna para el botón de editar */}
                        </tr>
                    </thead>
                    <tbody>
                        {categorias.map((categoria) => {
                            // Combine entidad data for easier use in AsignarCategoria
                            const entidadData = {
                                id: categoria.id_entidad,
                                apellidorazonsocial: categoria.apellidoynombre, // Ajusta según la estructura real
                                nombrefantasia: categoria.nombrefantasia,
                                car: categoria.car
                            };
                            return (
                                <tr key={categoria.id}>
                                    <td>{categoria.descripcion}</td>
                                    <td>{categoria.id_categoria}</td>
                                    <td>{categoria.id_dato}</td>
                                    <td>{categoria.apellidoynombre}</td>
                                    <td>
                                        <button
                                            className="btn btn-sm btn-primary"
                                            onClick={() => openEditModal({
                                                id: categoria.id, // Include the ID for editing
                                                id_contacto: userId,
                                                id_categoria: categoria.id_categoria,
                                                id_entidad: categoria.id_entidad,
                                                id_dato: categoria.id_dato,
                                                sn_activo: categoria.sn_activo,
                                                entidad: entidadData
                                            })}
                                        >
                                            Editar
                                        </button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            )}

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                className="modal"
                overlayClassName="modal-overlay"
                contentLabel="Asignar Contacto Modal"
            >
                <div className="modal-header">
                    <button
                        type="button"
                        className="btn-close"
                        onClick={closeModal}
                        aria-label="Cerrar"
                    ></button>
                </div>
                <AsignarCategoria
                    userId={userId}
                    onClose={closeModal}
                    isEditing={isEditing}
                    initialData={editingData || {}}
                />
            </Modal>
        </div>
    );
};

export default CategoriaContacto;
