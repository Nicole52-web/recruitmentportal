import React, { useState } from "react";
import styled from "styled-components";
import Logo from "../Logo";
import { NavLink } from "react-router-dom";


const Navbar = ({ navbarRef }) => {
    const [showMenu, setShowMenu] = useState(false);

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    return (
        <Wrapper ref={navbarRef}>
            <div className="container">
                <Logo />
                <MenuIcon onClick={toggleMenu}>&#9776;</MenuIcon>
                <MenuLinks showMenu={showMenu}>
                    <NavLink className="nav-item" to="/all-jobs">
                        Jobs
                    </NavLink>
                    <NavLink className="nav-item" to="/dashboard">
                        Dashboard
                    </NavLink>
                    <NavLink className="nav-item" to="/register">
                        Applicant Register
                    </NavLink>
                    <NavLink className="nav-item" to="/recruiter-register">
                        Recruiter Register
                    </NavLink>
                    <NavLink className="nav-item" to="/login">
                        <span className="bg-[#247BF7] text-white px-6 py-2 rounded"> Login</span>
                    </NavLink>
                </MenuLinks>
            </div>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    box-shadow: 0 5px 5px var(--shadow-light);
    padding: 1rem 0;
    .container {
        width: 100%;
        max-width: 1200px;
        display: flex;
        justify-content: space-between;
        align-items: center;
       
    }
    .container .nav-item {
        font-size: 16px;
        font-weight: 500;
        text-transform: capitalize;
        margin-left: 20px;
        color: var(--color-black);
        &:hover {
            border-bottom: 2px solid blue;
            padding-bottom: 3px;;
        }
    }
    .container .nav-item.active {
        color: var(--color-primary);
    }
    @media screen and (max-width: 1200px) {
        padding: 1rem 2rem;
    }
    @media screen and (max-width: 600px) {
        padding: 1.2rem 1rem;
    }
`;

const MenuIcon = styled.div`
    font-size: 1.8rem;
    cursor: pointer;
    display: none;
    @media screen and (max-width: 600px) {
        display: block;
    }
`;

const MenuLinks = styled.div`
    display: flex;
    @media screen and (max-width: 600px) {
        flex-direction: column;
        align-items: center;
        position: absolute;
        top: 60px;
        left: ${({ showMenu }) => (showMenu ? "0" : "-100%")};
        width: 100%;
        background-color: white;
        transition: left 0.3s ease-in-out;
        padding: 20px;
    }
`;

export default Navbar;
