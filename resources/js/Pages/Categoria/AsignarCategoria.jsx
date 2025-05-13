import React, { useState, useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import Swal from 'sweetalert2';

const AsignarCategoria = ({ onClose, userId, isEditing = false, initialData = {} }) => {
    const initialValues = isEditing
        ? {
            id_contacto: initialData.id_contacto || userId,
            id_categoria: initialData.id_categoria || '',
            id_entidad: initialData.id_entidad || '',
            id_dato: initialData.id_dato || '',
            sn_activo: initialData.sn_activo !== undefined ? initialData.sn_activo : true,
        }
        : {
            id_contacto: userId,
            id_categoria: '',
            id_entidad: '',
            id_dato: '',
            sn_activo: true,
        };

    const { data, setData, post, put, reset, processing, errors } = useForm(initialValues);

    const [categorias, setCategorias] = useState([]);
    const [selectedCategoriaId, setSelectedCategoriaId] = useState(initialValues.id_categoria);
    const [searchTerm, setSearchTerm] = useState('');
    const [contactos, setContactos] = useState([]);
    const [selectedContact, setSelectedContact] = useState(initialData.entidad ? { id: initialData.id_entidad, apellidorazonsocial: initialData.entidad.apellidorazonsocial, nombrefantasia: initialData.entidad.nombrefantasia, car: initialData.entidad.car } : null);
    const [searchError, setSearchError] = useState('');
    const [isSearchVisible, setIsSearchVisible] = useState(!isEditing || !initialData.id_entidad);
    const [title, setTitle] = useState(isEditing ? 'Editar Asignación de Categoría' : 'Asignar Categoría');
    const [buttonText, setButtonText] = useState(isEditing ? 'Guardar Cambios' : 'Asignar');

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

    useEffect(() => {
        // Actualizar el estado local cuando cambian los datos iniciales (para edición)
        setSelectedCategoriaId(initialValues.id_categoria);
        setData('id_categoria', initialValues.id_categoria);
        setSelectedContact(initialData.entidad ? { id: initialData.id_entidad, apellidorazonsocial: initialData.entidad.apellidorazonsocial, nombrefantasia: initialData.entidad.nombrefantasia, car: initialData.entidad.car } : null);
        setIsSearchVisible(!isEditing || !initialData.id_entidad);
    }, [initialValues.id_categoria, initialValues.id_entidad, initialData.entidad, isEditing]);  // Cambiamos la dependencia a propiedades individuales

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

    const handleSubmit = (e) => {
        e.preventDefault();
        const routeName = isEditing ? 'categoria.actualizar' : 'categoria.asignar';
        const method = isEditing ? 'put' : 'post';
        const options = {
            onSuccess: () => {
                setSelectedCategoriaId('');
                setSearchTerm('');
                setContactos([]);
                setSelectedContact(null);
                setSearchError('');
                setIsSearchVisible(true);
                Swal.fire({
                    title: isEditing ? 'Categoría Actualizada' : 'Categoría Asignada',
                    text: `La categoría se ha ${isEditing ? 'actualizado' : 'asignado'} exitosamente.`,
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
            },
        };

        if (method === 'post') {
            post(route(routeName), options);
        } else if (method === 'put') {
            put(route(routeName, initialData.id), { ...data, _method: 'put' }, options);
        }
    };

    return (
        <div className="container mt-4" style={{ maxWidth: '600px' }}>
            <h4>{title}</h4>

            {!isEditing && (
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
            )}

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
                    type="text"
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
                onClick={handleSubmit}
                disabled={processing || !data.id_entidad || !data.id_categoria}
            >
                {processing ? `${buttonText}...` : buttonText}
            </button>
            <button className="btn btn-warning m-3" onClick={handleClear} disabled={processing}>
                Limpiar
            </button>
        </div>
    );
};

export default AsignarCategoria;

