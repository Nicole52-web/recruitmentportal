import React, { useEffect, useRef } from "react";
import Wrapper from "../assets/css/wrappers/LandingPage";
import { Link } from "react-router-dom";
import photo from "../assets/media/LandingPage/hero.png";
import Navbar from "../components/shared/Navbar";
import PopularCategory from "../components/Home Page/PopularCategory";
import HowWorks from "../components/Home Page/HowWorks";
import Brands from "../components/Home Page/Brands";


const Landing = () => {
    // References for the navbar and hero sections
    const navbarRef = useRef(null);
    const heroRef = useRef(null);


    // Side effect to adjust the hero section's minimum height based on the navbar's height
    useEffect(() => {
        const navbarHeight = navbarRef.current.getBoundingClientRect().height;
        heroRef.current.style.minHeight = `calc(100vh - ${navbarHeight}px)`;
    }, []);

    // Render the landing page
    return (
        <>
            <Navbar navbarRef={navbarRef} />
            <Wrapper ref={heroRef}>
                <div className="hero-content">
                    <div className="text-content">
                        <h1>
                            Get Your <span className="fancy">Dream Job </span> 
                            Today!
                        </h1>
                        <p>
                        "Welcome to our job portal, where career dreams come to life! 
                        Discover a world of endless possibilities and take the next step towards your professional success.
                         With a user-friendly interface and a vast array of job listings, finding your ideal position has never been easier. 
                         Join us and embark on a journey towards your dream career!"
                        </p>
                        <div className="btn-grp">
                            <Link className="btn" to="/all-jobs">
                                Apply Now
                            </Link>
                        </div>
                    </div>
                    <div className="placeholder">
                        <img src={photo} alt="job viva photo" />
                    </div>
                </div>
            </Wrapper>
            <div>
            <PopularCategory/>
            <HowWorks/>
            <Brands/>
            </div>
        </>
    );
};

export default Landing;
