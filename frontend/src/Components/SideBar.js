import React from 'react';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import '../Components/SideBar.css'; // Assuming you've placed the sidebar styles in a separate file

function Sidebar() {
  return (
    <Navbar className="sidebar">
      <Nav className="flex-column">
        <Navbar.Brand className="sidebar-heading">Categories</Navbar.Brand>

        <NavDropdown
          title="Electronics"
          id="electronics-dropdown"
          className="sidebar-dropdown"
          dropdownMenuProps={{ className: 'custom-dropdown-menu' }} // Add custom class for styling
        >
          <NavDropdown.Item href="#mobile-phone">Mobile Phone</NavDropdown.Item>
          <NavDropdown.Item href="#laptop">Laptop</NavDropdown.Item>
        </NavDropdown>

        <NavDropdown
          title="Clothing"
          id="clothing-dropdown"
          className="sidebar-dropdown"
          dropdownMenuProps={{ className: 'custom-dropdown-menu' }} // Add custom class for styling
        >
          <NavDropdown.Item href="#mens-clothing">Men's Clothing</NavDropdown.Item>
          <NavDropdown.Item href="#womens-clothing">Women's Clothing</NavDropdown.Item>
        </NavDropdown>

        <NavDropdown
          title="Home Decor"
          id="home-decor-dropdown"
          className="sidebar-dropdown"
          dropdownMenuProps={{ className: 'custom-dropdown-menu' }} // Add custom class for styling
        >
          <NavDropdown.Item href="#furniture">Furniture</NavDropdown.Item>
          <NavDropdown.Item href="#lighting">Lighting</NavDropdown.Item>
        </NavDropdown>
      </Nav>
    </Navbar>
  );
}

export default Sidebar;
