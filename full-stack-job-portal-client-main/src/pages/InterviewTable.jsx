import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { CiSquarePlus } from 'react-icons/ci';
import styled from 'styled-components';
import { exportTableToCSV, exportTableToPDF } from '../utils/TableExport';
import LoadingComTwo from '../components/shared/LoadingComTwo';
import { useMutation } from '@tanstack/react-query';
import { updateHandler } from '../utils/FetchHandlers';
import Swal from 'sweetalert2';

const InterviewTable = () => {
    const [interviews, setInterviews] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());

    useEffect(() => {
        const fetchInterviews = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/v1/interview/allinterviews', {
                    
                });
                console.log(response.data);
                setInterviews(response.data.interviews);
            } catch (error) {
                console.error('Error fetching interviews', error);
            }
        };
        fetchInterviews();
    }, []);

    
        const handleCompleteStatus = async ({id}) => {
            try {
                const response = await axios.put(`http://localhost:3000/api/v1/interview/complete/${id}`);
                console.log(response.data);
                alert('Interview status updated successfully');
            } catch (error) {
                console.error('Error updating interview status', error);
                alert('Error updating interview status');
            }
        };
      
        const handleSearchChange = (event) => {
            setSearchTerm(event.target.value);
        };
    
        const filteredInterviews = interviews.filter((interview) =>
            interview?.jobId?.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
            interview?.applicantId?.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
            new Date(interview?.date).toLocaleDateString().includes(searchTerm) ||
            interview?.time.includes(searchTerm)
        );

    const handleExportPDF = () => {
        console.log("Exporting as PDF...");
        exportTableToPDF("interviews-table", "AllInterviews_Report");
    };

    const handleMonthChange = (event) => {
        setSelectedMonth(event.target.value);
    };

    const createTable = (interviews) => {
        const table = document.createElement('table');
        const thead = document.createElement('thead');
        const tbody = document.createElement('tbody');
    
        // Add headers
        const headers = ['Job Position', 'Applicant', 'Date', 'Time', 'Status'];
        const tr = document.createElement('tr');
        headers.forEach(header => {
            const th = document.createElement('th');
            th.textContent = header;
            tr.appendChild(th);
        });
        thead.appendChild(tr);
    
        // Add data rows
        interviews.forEach(interview => {
            const tr = document.createElement('tr');
            const data = [
                interview?.jobId?.position,
                interview?.applicantId?.username,
                new Date(interview?.date).toLocaleDateString(),
                interview?.time,
                interview?.status
            ];
            data.forEach(item => {
                const td = document.createElement('td');
                td.textContent = item;
                tr.appendChild(td);
            });
            tbody.appendChild(tr);
        });
    
        table.appendChild(thead);
        table.appendChild(tbody);
        return table;
    };

    const handleExportMonthReport = () => {
        const monthInterviews = interviews.filter(interview => 
            new Date(interview?.date).getMonth() === selectedMonth - 1
        );
    
        // Create a new table with the filtered interviews
        const table = createTable(monthInterviews);
        table.id = 'month-interviews-table';
        document.body.appendChild(table);
    
        console.log("Exporting as PDF...");
        exportTableToPDF('month-interviews-table', "Interviews_Report");
    
        // Remove the temporary table
        document.body.removeChild(table);
    };

    

    // if (isPending) {
    //     return <LoadingComTwo />;
    // }

    // if (isError) {
    //     console.log(error?.message);
    //     return (
    //         <h2 className="text-lg md:text-3xl font-bold text-red-600 text-center mt-12">
    //             {error?.message}
    //         </h2>
    //     );
    // }

    if (!interviews?.length) {
        return (
            <h2 className="text-lg md:text-3xl font-bold text-red-600 text-center mt-12">
                -- Interviews List is Empty --
            </h2>
        );
    }
    return (
        <Wrapper>
            <div className="title-row">
                Manage Interviews
                <CiSquarePlus className="ml-1 text-xl md:text-2xl" />
                
            </div>
            <div className="content-row">
            <input
                    className="search-bar"
                    type="text"
                    placeholder="Search by name, position, time, date"
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
            <div className="export-buttons">
    <button className="bg-blue-500 text-white rounded px-4 py-2 m-2" onClick={handleExportPDF}>Export as PDF</button>
    <select value={selectedMonth} onChange={handleMonthChange}>
                    <option value="1">January</option>
                    <option value="2">February</option>
                    <option value="3">March</option>
                    <option value="4">April</option>
                    <option value="5">May</option>
                    <option value="6">June</option>
                    <option value="7">July</option>
                    <option value="8">August</option>
                    <option value="9">September</option>
                    <option value="10">October</option>
                    <option value="11">November</option>
                    <option value="12">December</option>
                    
                </select>
                <button className="bg-blue-500 text-white rounded px-4 py-2 m-2" onClick={handleExportMonthReport}>Export Month Report as PDF</button>
   
</div>
                <table className="table" id="interviews-table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Job Position</th>
                            <th>Applicant</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredInterviews.map((interview, index) => {
                            let i =
                                index + 1 < 10 ? `0${index + 1}` : index + 1;
                            return (
                                <tr key={interview._id}>
                                    <td>{i}</td>
                                    <td>{interview?.jobId?.position}</td>
                                    <td>{interview?.applicantId?.username}</td>
                                    <td>{new Date(interview?.date).toLocaleDateString()}</td>
                                    <td>{interview?.time}</td>
                                    <td>{interview?.status}</td>
                                    <td className='action-row'>
                                        {interview?.status === 'Scheduled' && (
                                            <>
                                             {" "}
                                             <button
    className="action accept"
    onClick={() =>
        handleCompleteStatus({ id: interview._id })
    }
>
    complete
</button>
                                            </>
                                        )}
                                    </td>
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
    .search-bar{
        outline: none;
        border: 1px solid #3564db;
        padding: 10px;
        border-radius: 5px;
        margin-bottom: 20px;
        float: right;
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
        font-size: 12px;
        text-transform: capitalize;
        font-weight: 500;
        color: #fff;
        padding: 1px 6px;
        border-radius: 4px;
    }
    .action.accept {
        background-color: #168e24;
    }
`;


export default InterviewTable
