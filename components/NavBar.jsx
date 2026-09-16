import React from "react";
import { NavLink } from "react-router-dom";

const navItems = [
  { to: "/", label: "Home", end: true },
  { to: "/articles", label: "Articles" },
  { to: "/users", label: "Users" },
  { to: "/topics", label: "Topics" },
];

const NavBar = () => {
  return (
    <nav id="nav-bar">
      {navItems.map(({ to, label, end }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
        >
          {label}
        </NavLink>
      ))}
    </nav>
  );
};

export default NavBar;