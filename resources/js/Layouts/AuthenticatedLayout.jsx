import NavLink from '@/Components/NavLink';
import { useState } from 'react';
import { Link } from '@inertiajs/react';

export default function Authenticated({ user }) {
    const [openMenus, setOpenMenus] = useState(false);

    const toggleMenu = () => {
        setOpenMenus((prevState) => !prevState);
    };

    return (
        <>
            <div>
                <button
                    className="btn btn-link nav-link dropdown-toggle text-white"
                    type="button"
                    onClick={toggleMenu}
                    aria-expanded={openMenus ? "true" : "false"}
                >
                    {user?.name}
                </button>
                <div className={`collapse ${openMenus ? "show" : ""}`}>
                    <ul className="list-unstyled ps-3">
                        <li>
                            <Link className="dropdown-item" href={route('profile.edit')}>
                                <small className="">Perfil</small>
                            </Link>
                            <Link
                                className="dropdown-item"
                                href={route('logout')}
                                method="post"
                                as="button"
                                onClick={() => {
                                    sessionStorage.clear();
                                    localStorage.clear();
                                }}
                            >
                                <small className="">Cerrar Sesión</small>
                            </Link>

                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
}
