import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';


const AsignarCategoria = ({ onClose, userId }) => {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [contacts, setContacts] = useState([]);
    const [selectedContactId, setSelectedContactId] = useState(null);
    const [searchError, setSearchError] = useState('');
    const [isSearchVisible, setIsSearchVisible] = useState(true);

    const [id_dato, setIdDato] = useState(''); // New state for ID/MAT/N°

   console.log(selectedCategory)
   
    useEffect(() => {
        // Fetch categories
        fetch('/categoria/list')
            .then((response) => response.json())
            .then((data) => {
                setCategories(data);
            })
            .catch((error) => {
                console.error('Error fetching categories:', error);
            });
    }, []);

     const handleSearchChange = (event) => {
        const term = event.target.value;
        setSearchTerm(term);
        setContacts([]); // Clear previous results
        setSelectedContactId(''); // Clear selected contact
        setSearchError('');

        if (term.length >= 5) {
            fetch(`/contacto/search/${term}`) // Replace with your actual API endpoint for searching contacts
                .then((response) => response.json())
                .then((data) => {
                    if (data.length > 0) {
                        setContacts(data);
                    } else {
                        setSearchError('No se encontraron contactos con ese término.');
                    }
                })
                .catch((error) => {
                    console.error('Error searching contacts:', error);
                    setSearchError('Error al buscar contactos.');
                });
        } else if (term.length > 0) {
            setSearchError('Ingrese al menos 5 caracteres para buscar.');
        }
    };
 
    const handleContactSelect = (contact) => {
        setSelectedContactId(contact);
        setIsSearchVisible(false); // Oculta la búsqueda
        setContacts([]);
        setSearchTerm('');
        setSearchError('');
    };

    const handleAssign = () => {
        if (!selectedContactId) {
            Swal.fire({
                icon: 'warning',
                title: '¡Atención!',
                text: 'Por favor, seleccione un contacto.',
            });
            return;
        }

        if (!selectedCategory) {
            Swal.fire({
                icon: 'warning',
                title: '¡Atención!',
                text: 'Por favor, seleccione una categoría.',
            });
            return;
        }

        const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

        fetch(`/categoria/asignarCategoria`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': csrfToken,
            },
            body: JSON.stringify({ userId: userId, category: selectedCategory, contacto_id: selectedContactId.id, id_dato: id_dato }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Categoría asignada:', data);
                Swal.fire({
                    icon: 'success',
                    title: '¡Éxito!',
                    text: 'La categoría se ha asignado correctamente.',
                    showConfirmButton: false,
                    timer: 1500,
                }).then(() => {
                    onClose();
                });
            })
            .catch((error) => {
                console.error('Error asignando categoría:', error);
                Swal.fire({
                    icon: 'error',
                    title: '¡Error!',
                    text: 'Hubo un problema al asignar la categoría.',
                });
            });
    };

    const handleClear = () => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: 'Se limpiará el formulario. ¿Deseas continuar?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, limpiar',
            cancelButtonText: 'Cancelar',
        }).then((result) => {
            if (result.isConfirmed) {
                setSelectedCategory('');
                setSearchTerm('');
                setContacts([]);
                setSelectedContactId(null);
                setSearchError('');
                setIsSearchVisible(true);
                setIdDato('');
                Swal.fire({
                    icon: 'success',
                    title: '¡Listo!',
                    text: 'El formulario se ha limpiado.',
                    showConfirmButton: false,
                    timer: 1000,
                });
            }
        });
    };
    return (
      <>
                <div className="container  mt-4" style={{ maxWidth: '600px' }}> 
               <h4>Asignar Categoría </h4> 

               
                
              

                <div className="m-3">
                    <label htmlFor="categorySelect" className="form-label">Categoría:</label>
                    <select
                        className="form-control"
                        id="categorySelect"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        style={{ maxWidth: '500px' }}
                    >
                        <option value="">Seleccione una categoría</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.descripcion}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="m-3">
                    <label htmlFor="contactSearch" className="form-label">Otorgado por:</label>
                    {isSearchVisible && (
    <div>
  
        <input
            type="text"
            className="form-control"
            id="contactSearch"
            placeholder="Buscar contacto (mínimo 5 caracteres)"
            value={searchTerm}
            onChange={handleSearchChange}
            style={{ maxWidth: '500px' }}
        />
        {searchError && <div className="form-text text-danger">{searchError}</div>}
        {contacts.length > 0 && (
            <ul className="list-group mt-2">
                {contacts.map((contact) => (
                    <li
                        key={contact.id}
                        className={`list-group-item list-group-item-action ${selectedContactId?.id === contact.id ? 'active' : ''}`}
                        onClick={() => handleContactSelect(contact)}
                        style={{ cursor: 'pointer' }}
                    >
                        {contact.apellidorazonsocial || contact.car || `ID: ${contact.id}`}
                    </li>
                ))}
            </ul>
        )}
    </div>
)}
                   {selectedContactId && (
    <div className=" text-success  mt-2"> {selectedContactId.apellidorazonsocial || selectedContactId.car || `ID: ${selectedContactId.id}`} {selectedContactId.nombrefantasia}</div>
)}
                </div> 
               
                <div className="m-3">
                    <label htmlFor="contactSearch" className="form-label">ID/MAT/N°:</label>
                    <input
                        type="number"
                        className="form-control"
                        id="contactSearch"
                       
                        value={id_dato}
                        onChange={(e) => setIdDato(e.target.value)}
                     
                        style={{ maxWidth: '500px' }}
                    />
                    </div>

                <button className="btn btn-success m-3" onClick={handleAssign}  disabled={!selectedContactId || !selectedCategory}>
                    Asignar
                </button>
                <button className="btn btn-warning m-3" onClick={handleClear}>
                    Limpiar
                </button>
                </div>
                </>
           
    );
};

export default AsignarCategoria;