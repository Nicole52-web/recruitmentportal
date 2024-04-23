import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { CiSquarePlus } from 'react-icons/ci';
import styled from 'styled-components';

const StatusInterview = () => {
    const [interviews, setInterviews] = useState([]);

    useEffect(() => {
        const fetchInterviews = async () => {
            try {
                 // Making a GET request to the server to fetch interviews data
                const response = await axios.get('http://localhost:3000/api/v1/interview/statusinterviews', {
                    
                });
                console.log(response.data);
                 // Updating the state with the fetched interviews data
                setInterviews(response.data.interviews);
            } catch (error) {
                console.error('Error fetching interviews', error);
            }
        };
        // Calling the function to fetch interviews data
        fetchInterviews();
    }, []);

    // Rendering the component
    return (
        <Wrapper>
            <div className="title-row">
                Your Interviews
                <CiSquarePlus className="ml-1 text-xl md:text-2xl" />
                
            </div>
            <div className="content-row">
                <div>Interview  Details will be sent to your email by the company</div>
                <table className="table" id="interviews-table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Job Position</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Status</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {interviews.map((interview, index) => {
                            let i =
                                index + 1 < 10 ? `0${index + 1}` : index + 1;
                            return (
                                <tr key={interview._id}>
                                    <td>{i}</td>
                                    <td>{interview?.jobId?.position}</td>
                                    <td>{new Date(interview?.date).toLocaleDateString()}</td>
                                    <td>{interview?.time}</td>
                                    <td>{interview?.status}</td>
                             
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </Wrapper>
    );
};

const Wrapper = styled.section`
    .title-row {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        font-size: calc(0.9rem + 0.4vw);
        text-transform: capitalize;
        letter-spacing: 1px;
        font-weight: 600;
        opacity: 0.85;
        color: var(--color-black);
        position: relative;
    }
    .title-row:before {
        content: "";
        position: absolute;
        bottom: -4px;
        left: 0;
        width: calc(30px + 0.7vw);
        height: calc(2px + 0.1vw);
        background-color: var(--color-primary);
    }
    .content-row {
        overflow-x: auto;
        margin-top: calc(2rem + 0.5vw);
    }
    .table {
        border-collapse: collapse;
        border-spacing: 0;
        width: 100%;
        border: 1px solid #ddd;
        border-radius: 8px;
    }
    .table thead {
        background-color: var(--color-accent);
        color: var(--color-white);
        font-size: 14px;
        letter-spacing: 1px;
        font-weight: 400;
        text-transform: capitalize;
    }

    .table th,
    .table td {
        text-align: left;
        padding: 12px;
    }

    .table tbody tr {
        font-size: 15px;
        font-weight: 400;
        text-transform: capitalize;
        letter-spacing: 1px;
        transition: all 0.2s linear;
    }

    .table tbody tr:nth-child(even) {
        background-color: #00000011;
    }

    .table .action-row {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        column-gap: 12px;
    }
    .table .action-row .action {
        font-size: 21px;
    }
    .action.view {
        color: #22d637;
    }
    .action.edit {
        color: #f1c72f;
    }
    .action.delete {
        color: #f1322f;
    }
`;



export default StatusInterview
