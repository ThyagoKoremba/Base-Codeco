import React, { useState, useEffect } from 'react';


const CategoriaContacto = ({ userId }) => {
    const [categorias, setCategorias] = useState([]);
  
    console.log(categorias)
    // Effect to fetch categories when userId changes
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
    }, [userId]); // Depend on userId

 

   

    return (
        <div className="container mt-4 " style={{ maxWidth: '600px' }}>
            <div className="row mb-3">
                <div className="col-md-9">
                    <h3>Categorías </h3>
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
                            <tr key={categoria.id }>
                                <td>{ categoria.categoria_descripcion}</td>
                                <td>{categoria.id}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

          
        </div>
    );
};

export default CategoriaContacto;