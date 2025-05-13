import React, { useState, useEffect, useRef } from 'react';
import Modal from 'react-modal';
import AsignarCategoria from './AsignarCategoria';
import './../Contacto/styles.css';

import { MoreHorizontal } from "lucide-react"

Modal.setAppElement('#app');

const CategoriaContacto = ({ userId }) => {
  const [categorias, setCategorias] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [editingData, setEditingData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const tableRef = useRef(null);

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
        });
    }
  }, [userId, modalIsOpen]);

  function openModal() {
    setEditingData(null);
    setIsEditing(false);
    setIsOpen(true);
  }

  function openEditModal(data) {
    setEditingData(data);
    setIsEditing(true);
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const handleActivarDesactivar = (id, sn_activo) => {
    // Aquí iría la lógica para activar/desactivar la categoría en el backend
    console.log(`Cambiar estado de categoría ${id} a ${sn_activo ? 'inactivo' : 'activo'}`);
    // Mostrar SweetAlert de éxito o error después de la operación
    Swal.fire({
      title: 'Estado Cambiado',
      text: `La categoría se ha ${sn_activo ? 'desactivado' : 'activado'}.`,
      icon: 'success',
      confirmButtonText: 'OK'
    }).then(() => {
      // Actualizar la lista de categorías después de cambiar el estado
      fetch(`/categoria/getCategoriasByUserId/${userId}`)
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          setCategorias(data.data);
        })
        .catch(error => {
          console.error("Error fetching updated categories", error);
        });
    });
  };

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
        <div style={{ maxHeight: '300px', overflowY: 'auto' }} ref={tableRef}>
          <table className="table table-striped table-bordered">
            <thead className="thead-dark " style={{ position: 'sticky', top: 0, zIndex: 1 }}>
              <tr>
                <th>Descripción</th>

                <th>ID/MAT/N°</th>
                <th>OTORGADO POR</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {categorias.map((categoria) => {
                const entidadData = {
                  id: categoria.id_entidad,
                  apellidorazonsocial: categoria.apellidoynombre,
                  nombrefantasia: categoria.nombrefantasia,
                  car: categoria.car
                };
                return (
                  <tr key={categoria.id}>
                    <td>{categoria.descripcion}</td>

                    <td>{categoria.id_dato}</td>
                    <td>{categoria.apellidoynombre}</td>
                    <td>
                      <div className="dropdown">
                        <button className="btn btn-dark btn-icon" data-bs-toggle="dropdown" aria-expanded="false">
                          <MoreHorizontal className="h-4 w-4" />
                        </button>
                        <ul className="dropdown-menu dropdown-menu-end">
                          <li><button className="dropdown-item" onClick={() => openEditModal({
                            id: categoria.id,
                            id_contacto: userId,
                            id_categoria: categoria.id_categoria,
                            id_entidad: categoria.id_entidad,
                            id_dato: categoria.id_dato,
                            sn_activo: categoria.sn_activo,
                            entidad: entidadData
                          })}>
                            Editar
                          </button></li>
                          <li><button className="dropdown-item" onClick={() => handleActivarDesactivar(categoria.id, categoria.sn_activo)}>
                            {categoria.sn_activo ? 'Desactivar' : 'Activar'}
                          </button></li>
                        </ul>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
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

