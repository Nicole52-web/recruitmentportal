import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const ScheduleInterview = ({job}) => {
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const navigate = useNavigate();
   


    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if an interview has already been scheduled
        try {
            const checkResponse = await axios.get(`http://localhost:3000/api/v1/interview/check`, {
            params: {
                recruiterId: job.recruiterId,
                applicantId: job.applicantId,
                jobId: job.jobId,
            },
        });

          // If an interview has already been scheduled, show an error message
        if (checkResponse.data.exists) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "An interview has already been scheduled for this job and applicant.",
            });
            return;
        }
        // Schedule the interview
            const response = await axios.post(`http://localhost:3000/api/v1/interview/schedule`, {
                recruiterId: job.recruiterId,
                applicantId: job.applicantId,
                jobId: job.jobId,
                date,
                time
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

             // If there is a server error, throw an error
            if (response.status >= 500) {
                throw new Error(`Server error: ${response.status}`);
            }

            // Reset the date and time
            setDate('');
            setTime('');
            

            Swal.fire({
                icon: "success",
                title: "Done",
                text: "Interview scheduled successfully",
            });

            navigate("/dashboard");
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.message,
            });
            console.error('Failed to schedule interview', error);
        }
    };

    return (
        <Wrapper>
            <h2>Schedule Interview</h2>
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <label htmlFor="date">Date:</label>
                    <input
                    type="date"
                    id="date"
                    value={date}
                    min={new Date().toISOString().split("T")[0]}
                    onChange={(e) => setDate(e.target.value)}
                    required
                />
                </div>
                <div className="row">
                    <label htmlFor="time">Time:</label>
                    <input
                        type="time"
                        id="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Schedule Interview</button>
                
            </form>
        </Wrapper>
    );
};


const Wrapper = styled.div`
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
height: 100vh;

.row {
    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;
}

    label {
        font-size: 11.3px;
        font-weight: 600;
        letter-spacing: 1px;
        color: var(--color-black);
        opacity: 0.95;
    }

    input[type='date'],
    input[type='time'] {
        width: 100%;
        max-width: 1000px;;
        padding: 8px 14px;
        margin-top: 6px;
        display: inline-block;
        border: 1px solid #0000004a;
        border-radius: 4px;
        box-sizing: border-box;
        font-size: calc(0.8rem + 0.1vw);
        outline: none;
        color: var(--color-black);
    }

    input[type='date']:focus,
    input[type='time']:focus {
        outline: none;
        border: 1px solid #00000086;
    }

    button[type='submit'] {
        width: 100%;
        max-width: 150px;
        height: 60px;
        display: inline-block;
        background-color: var(--color-black);
        color: var(--color-white);
        cursor: pointer;
        transition: all 0.3s linear;
        text-transform: capitalize;
        font-size: calc(0.9rem + 0.1vw);
        border: none;
        padding: 8px 14px;
        border-radius: 4px;
        outline: none;
    }

    button[type='submit']:hover {
        background-color: var(--color-primary);
    }
`;


export default ScheduleInterview
