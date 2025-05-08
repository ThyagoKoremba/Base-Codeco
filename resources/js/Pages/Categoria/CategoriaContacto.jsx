import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import AsignarContacto from './AsignarContacto'; // Assuming AsignarContacto.js is in the same directory

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    zIndex:2000
  },
};


Modal.setAppElement('#app'); 

const CategoriaContacto = ({ userId }) => {
  const [categorias, setCategorias] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);

  console.log(categorias);

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
  }, [userId]);

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
          <button className="btn btn-primary" onClick={openModal}>
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
              {/*<th>ID/MAT/N°</th>
              <th>OTORGADO POR</th>*/}
            </tr>
          </thead>
          <tbody>
            {/* Ensure unique key */}
            {categorias.map((categoria) => (
              <tr key={categoria.id}>
                <td>{categoria.categoria_descripcion}</td>
                <td>{categoria.id}</td>
                {/*<td>{categoria.otro_id}</td>
                <td>{categoria.otorgado_por}</td>*/}
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Asignar Contacto Modal"
      >
        <h2>Asignar Contacto a Categoría</h2>
        <AsignarContacto userId={userId} closeModal={closeModal} categorias={categorias} />
        <button className="btn btn-secondary mt-3" onClick={closeModal}>
          Cerrar
        </button>
      </Modal>
    </div>
  );
};

export default CategoriaContacto;