import React, { useState } from 'react'
import Navbar from "../components/shared/Navbar";


const Faqs = () => {
  // State to control which answer is currently being shown
    const [showAnswer, setShowAnswer] = useState(null);

    const handleToggle = (index) => {
       // If the clicked question is already open, close it
      if (showAnswer === index) {
        setShowAnswer(null);
      } else {
        // Otherwise, open the clicked question
        setShowAnswer(index);
      }
    }
  
    // Array of FAQ objects
    const faqs = [
      {
        question: 'How do I create an account?',
        answer: 'You can create an account by clicking on the "Sign Up" button on the top right corner of the homepage.'
      },
      {
        question: 'Is there a fee for using this job web application?',
        answer: 'No it is totally free of charge!.'
      },
      {
        question: 'What should I do if I encounter technical issues or have questions?',
        answer: 'If you encounter technical issues while using the platform or have any questions or concerns, you can usually find help and support resources on the website.'
      },
      {
        question: 'How do i view all the posted jobs?',
        answer: 'You have to log in or register if you do not have an account for you to see the posted jobs'
      },
      
    ];
  
    return (

        <>
        <Navbar/>
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <div className="flex flex-col items-center justify-center text-center">
          <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-lg text-gray-600 mb-4">
            Here are some of the most frequently asked questions by our users.
          </p>
        </div>
        <div className="w-full md:w-2/3 p-4">
           {/* Mapping over the faqs array to display each question and answer */}
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white shadow-lg rounded-lg px-4 py-6 mb-4">
              <h2 onClick={() => handleToggle(index)} className="text-xl font-bold text-gray-800 mb-2 cursor-pointer">
                {faq.question}
                <span className="ml-2">{showAnswer === index ? '▲' : '▼'}</span>
              </h2>

              {/* Only display the answer if its question has been clicked */}
              {showAnswer === index && <p className="text-sm text-gray-500">{faq.answer}</p>}
            </div>
          ))}
        </div>
      </div>
     
      </>
    )
}

export default Faqs
