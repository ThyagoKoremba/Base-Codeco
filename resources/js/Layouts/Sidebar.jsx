import React, { useState, useEffect } from "react";
import { Link, usePage } from "@inertiajs/react";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";
import Authenticated from "./AuthenticatedLayout";

export default function Sidebar({ children }) {
    const [sidebarVisible, setSidebarVisible] = useState(true);
    const [openMenus, setOpenMenus] = useState({});
    const { url: currentPageUrl } = usePage(); // Obtener la URL actual

    const data = JSON.parse(localStorage.getItem('perfilesMenusComponentes'));
    const [perfilesMenusComponentes, setPerfilesMenusComponentes] = useState(data);

    useEffect(() => {
        // Si no hay datos en el localStorage, hacer fetch
        if (!perfilesMenusComponentes) {
            const fetchPerfilesMenusComponentes = async () => {
                try {
                    const response = await fetch('/user/perfil-menu-componentes');
                    const data = await response.json();
                    setPerfilesMenusComponentes(data);
                    localStorage.setItem('perfilesMenusComponentes', JSON.stringify(data));
                } catch (error) {
                    console.error('Error fetching perfiles, menus, and componentes:', error);
                }
            };

            fetchPerfilesMenusComponentes();
        }
    }, [perfilesMenusComponentes]);

    // Función para alternar la visibilidad de los menús, cerrando los demás
    const toggleMenu = (menuId) => {
        setOpenMenus((prevState) => {
            const newState = {};
            if (!prevState[menuId]) {
                newState[menuId] = true;
            }
            return newState;
        });
    };

    const sidebarVariants = {
        open: { width: '250px', opacity: 1, x: 0, transition: { duration: 0.3 } },
        closed: { width: '0px', opacity: 0, x: -250, transition: { duration: 0.3 } },
    };

    const contentVariants = {
        open: { transition: { duration: 0.3 } },
        closed: { marginLeft: '0px', transition: { duration: 0.3 } },
    };

    return (
        <div className="d-flex">
            {/* Sidebar */}
            <motion.div
                className="bg-success text-white p-3 d-flex flex-column justify-content-between"
                variants={sidebarVariants}
                animate={sidebarVisible ? 'open' : 'closed'}
                style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden" }}
            >
                <div>
                    {/* Botón para alternar la visibilidad del sidebar */}
                    <button
                        className="btn btn-light position-absolute top-0 end-0 m-2"
                        style={{ border: "none", background: "none", color: "white", fontSize: "1.5rem" }}
                        onClick={() => setSidebarVisible(!sidebarVisible)}
                        title={sidebarVisible ? "Cerrar menú" : "Abrir menú"}
                    >
                        &#9776;
                    </button>
                    <h4 className="mb-4">CODECO</h4>

                    {/* Menú lateral dinámico */}
                    <div className="container overflow-auto" style={{ maxHeight: "450px", minWidth: "250px", overflowY: "hidden" }}>
                        <ul className="nav flex-column">

                            {perfilesMenusComponentes?.map((perfil, index) => (
                                <li key={`perfil-${perfil.id_perfil}-${index}`} className="nav-item">
                                    <h5>{perfil.perfil}</h5>
                                    {perfil.menus.map((menu, index) => (
                                        <div key={`${perfil.id_perfil}-${menu.menu}-${index}`}>
                                            {/* Botón para desplegar el menú */}
                                            <button
                                                className="btn btn-link nav-link  text-white"
                                                type="button"
                                                onClick={() => toggleMenu(menu.menu)}
                                                aria-expanded={openMenus[menu.menu] ? "true" : "false"}
                                            >
                                                {menu.menu}
                                            </button>

                                            {/* Lista de componentes (submenu) */}
                                            <div className={`collapse ${openMenus[menu.menu] ? "show" : ""}`}>
                                                <ul className="list-unstyled ps-3">
                                                    {Object.entries(menu.componentes).map(([nombre, url]) => (
                                                        <li key={`${menu.menu}-${nombre}`}>
                                                            <Link
                                                                className={`dropdown-item ${currentPageUrl === url ? 'active-link' : ''}`}
                                                                href={url}
                                                            >
                                                                <small>{nombre}</small>
                                                            </Link>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    ))}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Footer */}
                <footer className="bg-success text-white text-center py-3">
                    <hr />
                    <div className="container">
                        <Authenticated user={JSON.parse(localStorage.getItem("user"))} />
                        <hr />
                        <p style={{ fontSize: "12px" }}>&copy; CODECO 2025</p>
                    </div>
                </footer>
            </motion.div>

            {/* Contenido principal */}
            <motion.div className="flex-grow-1 p-4"
                style={{ overflow: 'hidden' }}
                animate={sidebarVisible ? 'open' : 'closed'}
                variants={contentVariants}
            >
                {!sidebarVisible && (
                    <button
                        className="btn btn-light mb-3"
                        style={{ border: "none", background: "none", position: "sticky", top: 0, fontSize: "1.5rem" }}
                        onClick={() => setSidebarVisible(!sidebarVisible)}
                        title={sidebarVisible ? "Cerrar menú" : "Abrir menú"}
                    >
                        &#9776;
                    </button>
                )}
                {children}
            </motion.div>
        </div>
    );
}