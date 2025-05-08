import React, { useState, useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import Swal from 'sweetalert2';

const AsignarCategoria = ({ onClose, userId }) => {
    const initialValues = {
        id_contacto: userId,
        id_categoria: '',
        id_entidad: '',
        id_dato: '',
        sn_activo: true,
    };

    const { data, setData, post, reset, processing, errors } = useForm(initialValues);

    const [categorias, setCategorias] = useState([]);
    const [selectedCategoriaId, setSelectedCategoriaId] = useState(''); // Guardamos solo el ID
    const [searchTerm, setSearchTerm] = useState('');
    const [contactos, setContactos] = useState([]);
    const [selectedContact, setSelectedContact] = useState(null); // Guardamos el objeto del contacto seleccionado
    const [searchError, setSearchError] = useState('');
    const [isSearchVisible, setIsSearchVisible] = useState(true);

    useEffect(() => {
        // Fetch categories
        fetch('/categoria/getCategorias')
            .then((response) => response.json())
            .then((data) => {
                setCategorias(data);
            })
            .catch((error) => {
                console.error('Error fetching categories:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error al cargar las categorías',
                    text: 'Hubo un problema al obtener la lista de categorías.',
                });
            });
    }, []);

    const handleSearchChange = (event) => {
        const term = event.target.value;
        setSearchTerm(term);
        setContactos([]); // Clear previous results
        setSelectedContact(null); // Clear selected contact
        setData('id_entidad', ''); // Limpiar el ID de la entidad al cambiar la búsqueda
        setSearchError('');
        setIsSearchVisible(true); // Aseguramos que la lista de búsqueda sea visible

        if (term.length >= 5) {
            fetch(`/contacto/search/${term}`)
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
                    Swal.fire({
                        icon: 'error',
                        title: 'Error al buscar contactos',
                        text: 'Hubo un problema al realizar la búsqueda.',
                    });
                });
        } else if (term.length > 0) {
            setSearchError('Ingrese al menos 5 caracteres para buscar.');
        }
    };

    const handleContactSelect = (contact) => {
        setSelectedContact(contact);
        setData('id_entidad', contact.id);
        setIsSearchVisible(false); // Oculta la búsqueda después de seleccionar
        setContactos([]);
        setSearchTerm('');
        setSearchError('');
    };

    const handleCategoriaSelect = (categoryId) => {
        setSelectedCategoriaId(categoryId);
        setData('id_categoria', categoryId);
    };

    const handleAssign = (e) => {
        e.preventDefault();

        if (!data.id_entidad) {
            Swal.fire({
                icon: 'warning',
                title: '¡Atención!',
                text: 'Por favor, seleccione un contacto.',
            });
            return;
        }

        if (!data.id_categoria) {
            Swal.fire({
                icon: 'warning',
                title: '¡Atención!',
                text: 'Por favor, seleccione una categoría.',
            });
            return;
        }

        post(route('categoria.asignar'))
            .then((response) => {
                if (response.ok) {
                    Swal.fire({
                        icon: 'success',
                        title: '¡Asignado!',
                        text: 'La categoría se ha asignado correctamente.',
                        timer: 1500,
                        showConfirmButton: false,
                    });
                    reset(); // Limpiar el formulario después de la asignación
                    setSelectedContact(null);
                    setSelectedCategoriaId('');
                    setIsSearchVisible(true);
                } else {
                    return response.json().then(data => {
                        if (data && data.errors) {
                            let errorMessages = Object.values(data.errors).flat().join('<br>');
                            Swal.fire({
                                icon: 'error',
                                title: 'Error al asignar',
                                html: errorMessages,
                            });
                        } else {
                            Swal.fire({
                                icon: 'error',
                                title: 'Error al asignar',
                                text: 'Hubo un problema al asignar la categoría.',
                            });
                        }
                    });
                }
            })
            .catch((error) => {
                console.error('Error assigning category:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error al asignar',
                    text: 'Hubo un error inesperado al intentar asignar la categoría.',
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
                reset();
                setSelectedCategoriaId('');
                setSearchTerm('');
                setContactos([]);
                setSelectedContact(null);
                setSearchError('');
                setIsSearchVisible(true);
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
        <div className="container mt-4" style={{ maxWidth: '600px' }}>
            <h4>Asignar Categoría</h4>

            <div className="m-3">
                <label htmlFor="categorySelect" className="form-label">Categoría:</label>
                <select
                    className="form-control"
                    id="categorySelect"
                    value={selectedCategoriaId}
                    onChange={(e) => handleCategoriaSelect(e.target.value)}
                    style={{ maxWidth: '500px' }}
                >
                    <option value="">Seleccione una categoría</option>
                    {categorias.data?.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.descripcion}
                        </option>
                    ))}
                </select>
                {errors.id_categoria && <div className="form-text text-danger">{errors.id_categoria}</div>}
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
                                        className={`list-group-item list-group-item-action ${selectedContact?.id === contact.id ? 'active' : ''}`}
                                        onClick={() => handleContactSelect(contact)}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        {contact.apellidorazonsocial || contact.car || `ID: ${contact.id}`} {contact.nombrefantasia}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                )}
                {selectedContact && (
                    <div className="text-success mt-2">
                        Seleccionado: {selectedContact.apellidorazonsocial || selectedContact.car || `ID: ${selectedContact.id}`} {selectedContact.nombrefantasia}
                        <button className="btn btn-sm btn-outline-secondary ms-2" onClick={() => { setSelectedContact(null); setData('id_entidad', ''); setIsSearchVisible(true); }}>
                            Cambiar
                        </button>
                    </div>
                )}
                {errors.id_entidad && <div className="form-text text-danger">{errors.id_entidad}</div>}
            </div>

            <div className="m-3">
                <label htmlFor="datoInput" className="form-label">ID/MAT/N°:</label>
                <input
                    type="text" // Cambiado a 'text' para permitir otros formatos además de número
                    className="form-control"
                    id="datoInput"
                    value={data.id_dato}
                    onChange={(e) => setData('id_dato', e.target.value)}
                    style={{ maxWidth: '500px' }}
                />
                {errors.id_dato && <div className="form-text text-danger">{errors.id_dato}</div>}
            </div>

            <button
                className="btn btn-success m-3"
                onClick={handleAssign}
                disabled={processing || !data.id_entidad || !data.id_categoria}
            >
                {processing ? 'Asignando...' : 'Asignar'}
            </button>
            <button className="btn btn-warning m-3" onClick={handleClear} disabled={processing}>
                Limpiar
            </button>
        </div>
    );
};

export default AsignarCategoria;