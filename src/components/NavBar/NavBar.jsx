import { useEffect, useState } from "react";
import "./NavBar.css"
import { NavLink } from "react-router-dom";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Efecto para el scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Cerrar menú al hacer clic en un link
  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  // Cerrar menú al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMenuOpen && !event.target.closest('.navbar-container')) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMenuOpen]);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        {/* Logo */}
        <a href="/" className="navbar-brand" onClick={handleLinkClick}>
          <span className="logo-icon">🚀</span>
          <span className="brand-text">MiSitio</span>
        </a>

        {/* Hamburger Menu (Mobile) */}
        <button 
          className={`navbar-toggle ${isMenuOpen ? 'active' : ''}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Menu Items */}
        <ul className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
          <li className="navbar-item">
            <NavLink 
              to={"/"}
              className="navbar-link active"
              onClick={handleLinkClick}
            >
              Inicio
            </NavLink>
          </li>
          <li className="navbar-item">
            <NavLink 
              to="/services" 
              className="navbar-link"
              onClick={handleLinkClick}
            >
              Servicios
            </NavLink>
          </li>
          <li className="navbar-item">
            <NavLink 
              to="/chat" 
              className="navbar-link"
              onClick={handleLinkClick}
            >
              CHAT
            </NavLink>
          </li>
          <li className="navbar-item">
            <a 
              href="#nosotros" 
              className="navbar-link"
              onClick={handleLinkClick}
            >
              Nosotros
            </a>
          </li>
          <li className="navbar-item">
            <a 
              href="#contacto" 
              className="navbar-link"
              onClick={handleLinkClick}
            >
              Contacto
            </a>
          </li>
          
          {/* Botón CTA */}
          <li className="navbar-item">
            <a 
              href="#registro" 
              className="navbar-link navbar-cta"
              onClick={handleLinkClick}
            >
              Comenzar
            </a>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default NavBar