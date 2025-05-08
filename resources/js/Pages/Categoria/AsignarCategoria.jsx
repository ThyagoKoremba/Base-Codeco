import React, { useState, useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import Swal from 'sweetalert2';
import { set } from 'date-fns';


const AsignarCategoria = ({ onClose, userId, categorias }) => {
    
    const [selectedCategory, setSelectedCategory] = useState('');
const AsignarCategoria = ({ onClose, userId }) => {

    const initialValues = {
        id_contacto: userId,
        id_categoria: '',
        id_entidad: '',
        id_dato: '',
        id_user: '',
        sn_activo: true,
    }

    const { data, setData, post } = useForm(initialValues);


    const [categorias, setCategorias] = useState([]);
    const [selectedCategoria, setSelectedCategoria] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [contactos, setContactos] = useState([]);
    const [selectedContactId, setSelectedContactId] = useState(null);
    const [searchError, setSearchError] = useState('');
    const [isSearchVisible, setIsSearchVisible] = useState(true);

    const [id_dato, setIdDato] = useState(''); // New state for ID/MAT/N°

   console.log(selectedCategory)
   
   /*  useEffect(() => {
        // Fetch categories
        fetch('/categoria/list')
            .then((response) => response.json())
            .then((data) => {
                setCategories(data);
            })
            .catch((error) => {
                console.error('Error fetching categories:', error);
            });
    }, []); */

    const fetchCategorias = async () => {

        const response = await fetch('/categoria/getCategorias');
        const result = await response.json();
        setCategorias(result.data);
    };

    useEffect(() => {
        fetchCategorias();
    }, [])

    const handleSearchChange = (event) => {
        const term = event.target.value;
        setSearchTerm(term);
        setContactos([]); // Clear previous results
        setSelectedContactId(''); // Clear selected contact
        setSearchError('');

        if (term.length >= 5) {
            fetch(`/contacto/search/${term}`) // Replace with your actual API endpoint for searching contactos
                .then((response) => response.json())
                .then((data) => {
                    if (data.length > 0) {
                        setContactos(data);
                    } else {
                        setSearchError('No se encontraron contactos con ese término.');
                    }
                })
                .catch((error) => {
                    console.error('Error searching contactos:', error);
                    setSearchError('Error al buscar contactos.');
                });
        } else if (term.length > 0) {
            setSearchError('Ingrese al menos 5 caracteres para buscar.');
        }
    };

    const handleContactSelect = (contact) => {
        setSelectedContactId(contact);
        data.id_entidad = contact.id;
        setIsSearchVisible(false); // Oculta la búsqueda
        setContactos([]);
        setSearchTerm('');
        setSearchError('');
    };

    const handleCategoriaSelect = (categoria) => {
        setSelectedCategoria(categoria);
        data.id_categoria = categoria;
    }

    const handleAssign = (e) => {
        e.preventDefault();
        if (!selectedContactId) {
            Swal.fire({
                icon: 'warning',
                title: '¡Atención!',
                text: 'Por favor, seleccione un contacto.',
            });
            return;
        }

        if (!selectedCategoria) {
            Swal.fire({
                icon: 'warning',
                title: '¡Atención!',
                text: 'Por favor, seleccione una categoría.',
            });
            return;
        }
        const dataToSend = {
            id_contacto: userId,
            id_categoria: data,
            id_entidad: data.id_entidad,
            id_dato: data.id_dato,
            sn_activo: true,
        }
        post(route('categoria.asignar'), dataToSend)
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
                setSelectedCategoria('');
                setSearchTerm('');
                setContactos([]);
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
                        value={selectedCategoria}
                        onChange={(e) => handleCategoriaSelect(e.target.value)} // Actualiza el estado con el id de la categoría
                        style={{ maxWidth: '500px' }}
                    >
                        <option value="">Seleccione una categoría</option>
                        {categorias.map((category) => (
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
                            {contactos.length > 0 && (
                                <ul className="list-group mt-2">
                                    {contactos.map((contact) => (
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

                        value={data.id_dato}
                        onChange={(e) => setData('id_dato', e.target.value)}

                        style={{ maxWidth: '500px' }}
                    />
                </div>

                <button className="btn btn-success m-3" onClick={handleAssign} disabled={!selectedContactId || !selectedCategoria}>
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