import React from 'react'
import Navbar from "../components/shared/Navbar";

const AboutUs = () => {
    return (
        <>

        <Navbar/>


        <div className="flex flex-col items-center justify-center py-2 flex-grow">
            <div className="flex flex-col items-center justify-center text-center">
                <h1 className="text-4xl text-blueColor font-bold mb-4">About Us</h1>
                <p className="text-lg text-gray-600 mb-4">Welcome to our job web application! Our mission is to connect job seekers with employers in an efficient and user-friendly manner.</p>
                <p>At our platform, you can explore job listings, apply for jobs, and manage your job applications all in one place.</p>
                <p>Our team is dedicated to providing a seamless experience for both job seekers and employers, ensuring that the hiring process is as smooth as possible.</p>
                <p>Feel free to reach out to us if you have any questions, feedback, or suggestions. We're here to help!</p>
                <p>Thank you for choosing our job web application.</p>
            </div>
            <div className="flex flex-wrap justify-center">
                <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-4">
                    <div className="bg-white shadow-lg rounded-lg px-4 py-6 text-center">
                        <div className="mb-3">
                            <img className="w-32 mx-auto rounded-full" src="https://via.placeholder.com/150" alt="Team member 1" />
                        </div>
                        <h2 className="text-xl font-bold text-gray-800">Nicole</h2>
                        <p className="text-sm text-gray-500">CEO & Founder</p>
                    </div>
                </div>
               
            </div>
        </div>
        

        


         </>
    )
}

export default AboutUs
