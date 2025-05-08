import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import AsignarCategoria from './AsignarCategoria';
import './../Contacto/styles.css'


Modal.setAppElement('#app'); 

const CategoriaContacto = ({ userId }) => {
  const [categorias, setCategorias] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);



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
          setCategorias(data);
        })
        .catch((error) => {
          console.error('Error fetching categories:', error);
          // Handle error display to user if needed
        });
    }
  }, [userId, closeModal]);

  
  function openModal() {
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
            Asignar Contacto
          </button>
        </div>
      </div>
      {/* Display assigned categories */}
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
            </tr>
          </thead>
          <tbody>
            {/* Ensure unique key */}
            {categorias.map((categoria) => (
  <tr key={categoria.id}>
    <td>{categoria.categoria?.descripcion}</td>
    <td>{categoria.id}</td>
    <td>{categoria.id_dato}</td>
    <td>{categoria.contacto?.apellidorazonsocial || categoria.contacto?.car || `ID: ${categoria.id_contacto}`}</td>
  </tr>
))}
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
        <AsignarCategoria userId={userId} closeModal={closeModal} categorias={categorias} />
      
      </Modal>
    </div>
  );
};

export default CategoriaContacto;