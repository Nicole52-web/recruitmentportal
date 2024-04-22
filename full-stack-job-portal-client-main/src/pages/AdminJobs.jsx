import React, { useEffect, useState } from "react";
import { useUserContext } from "../context/UserContext";
import LoadingComTwo from "../components/shared/LoadingComTwo";
import { CiSquarePlus } from "react-icons/ci";
import styled from "styled-components";
import { exportTableToPDF, exportTableToCSV } from "../utils/TableExport";
import Swal from "sweetalert2";
import { getAllHandler } from "../utils/FetchHandlers";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { MdDelete } from "react-icons/md";

const AdminJobs = () => {
    const { user: me } = useUserContext();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
    const [jobs, setJobs] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [filteredJobs, setFilteredJobs] = useState([]);
    useEffect(() => {
        const fetchJobs = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get("http://localhost:3000/api/v1/jobs/all-jobs");
                console.log("Jobs Response:", response.data);
                setJobs(response.data); // Set jobs data
            } catch (error) {
                console.error("Jobs Error:", error);
                setError(error);
            }
            setIsLoading(false);
        };

        fetchJobs();
    }, []);

    // const updateUserModal = (id, role) => {
    //     Swal.fire({
    //         title: "Are you sure?",
    //         text: "You won't be able to revert this!",
    //         icon: "warning",
    //         showCancelButton: true,
    //         confirmButtonColor: "#19b74b",
    //         cancelButtonColor: "#d33",
    //         confirmButtonText: "Yes",
    //     }).then((result) => {
    //         if (result.isConfirmed) {
    //             UpdateUserRole(id, role);
    //         }
    //     });
    // };

    // const UpdateUserRole = async (id, role) => {
    //     const updateUser = { id, role };
    //     try {
    //         const response = await axios.patch(
    //             `http://localhost:3000/api/v1/admin/update-role`,
    //             updateUser,
    //             { withCredentials: true }
    //         );
    //         refetch();
    //         Swal.fire({
    //             title: "Done!",
    //             text: "Role Updated Successfully",
    //             icon: "success",
    //         });
    //     } catch (error) {
    //         console.log(error);
    //         Swal.fire({
    //             title: "Sorry!",
    //             text: error?.response?.data,
    //             icon: "error",
    //         });
    //     }
    // };

    // const deleteModal = (id) => {
    //     Swal.fire({
    //         title: "Are you sure?",
    //         text: "You won't be able to revert this!",
    //         icon: "warning",
    //         showCancelButton: true,
    //         confirmButtonColor: "#19b74b",
    //         cancelButtonColor: "#d33",
    //         confirmButtonText: "Yes, delete it!",
    //     }).then((result) => {
    //         if (result.isConfirmed) {
    //             deleteUserHandler(id);
    //         }
    //     });
    // };

    // const deleteUserHandler = async (id) => {
    //     try {
    //         const response = await axios.delete(
    //             `http://localhost:3000/api/v1/users/${id}`,
    //             { withCredentials: true }
    //         );

    //         refetch();
    //         Swal.fire({
    //             title: "Deleted!",
    //             text: "User has been deleted.",
    //             icon: "success",
    //         });
    //     } catch (error) {
    //         Swal.fire({
    //             title: "Sorry!",
    //             text: error?.message,
    //             icon: "error",
    //         });
    //     }
    // };

    const handleMonthChange = (event) => {
        setSelectedMonth(event.target.value);
    };

    const createTable = (jobs) => {
        const table = document.createElement('table');
        const thead = document.createElement('thead');
        const tbody = document.createElement('tbody');
    
        // Add headers
        const headers = ['Job Position', 'Company','CreatedBy',  'Time Posted'];
        const tr = document.createElement('tr');
        headers.forEach(header => {
            const th = document.createElement('th');
            th.textContent = header;
            tr.appendChild(th);
        });
        thead.appendChild(tr);
    
        // Add data rows
        jobs.forEach(job => {
            const tr = document.createElement('tr');
            const data = [
                job?.position,
                job?.company,
                job?.createdBy?.username,
                new Date(job?.createdAt).toLocaleDateString(),
                
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
        console.log('Type of jobs:', typeof jobs);
        console.log('Value of jobs:', jobs);
        const monthJobs = jobs.jobs.filter(job => {
            const jobDate = new Date(job?.createdAt);
            const jobMonth = jobDate.getMonth();
            console.log(`Job date: ${job?.createdAt}, Parsed date: ${jobDate}, Parsed month: ${jobMonth}`);
            return jobMonth === selectedMonth - 1;
        });
    
        console.log('Month Jobs:', monthJobs);
    
        // Create a new table with the filtered interviews
        const table = createTable(monthJobs);
        table.id = 'month-jobs-table';
        document.body.appendChild(table);
    
        console.log("Exporting as PDF...");
        exportTableToPDF('month-jobs-table', "MonthJob_Report");
    
        // Remove the temporary table
        document.body.removeChild(table);
    };
    const handleExportPDF = () => {
        console.log("Exporting as PDF...");
        exportTableToPDF("users-table", "AllJobs_Report");
    };


    useEffect(() => {
        if (jobs && jobs.jobs) {
            setFilteredJobs(
                jobs.jobs.filter((job) =>
                    job.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    job.company.toLowerCase().includes(searchTerm.toLowerCase())
                    
                )
            );
        }
    }, [searchTerm, jobs]);

    
    if (jobs) {
        // console.log(users);
    }
    
    if (isLoading){
        return <LoadingComTwo/>
    }

    if (!jobs?.jobs?.length) {
        return (
            <h2 className="text-lg md:text-3xl font-bold text-red-600 text-center mt-12">
                -- Jobs List is Empty --
            </h2>
        );
    }
    return (
        <Wrapper>
            <div className="title-row">
                Manage Jobs
                <CiSquarePlus className="ml-1 text-xl md:text-2xl" />
            </div>
            <div className="content-row">
            <div>
            <input 
                className="search-bar"
                type="text" 
                placeholder="Search by position or company" 
                value={searchTerm} 
                onChange={e => setSearchTerm(e.target.value)} 
            />
            </div>
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
                
                <table className="table" id="alljobs-table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Job Position</th>
                            <th>Company</th>
                            <th>Created By</th>
                            <th>Time Posted</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredJobs && filteredJobs.map((job, index)  => {
                            let i =
                                index + 1 < 10 ? `0${index + 1}` : index + 1;
                            return (
                                <tr key={job._id}>
                                <td>{i}</td>
                                <td>{job?.position}</td>
                                <td>{job?.company}</td>
                                <td>{job?.createdBy?.username}</td>
                                <td>{new Date(job?.createdAt).toLocaleString()}</td>

                                    <td className="action-row">
                                        {/* {user?._id === me._id ? null : (
                                            <>
                                                {" "}
                                                {user?.role ===
                                                "admin" ? null : (
                                                    <button
                                                        className="action admin"
                                                        onClick={() =>
                                                            updateUserModal(
                                                                user._id,
                                                                "admin"
                                                            )
                                                        }
                                                    >
                                                        admin
                                                    </button>
                                                )}
                                                {user?.role ===
                                                "recruiter" ? null : (
                                                    <button
                                                        className="action recruiter"
                                                        onClick={() =>
                                                            updateUserModal(
                                                                user._id,
                                                                "recruiter"
                                                            )
                                                        }
                                                    >
                                                        recuiter
                                                    </button>
                                                )}
                                                {user?.role ===
                                                "user" ? null : (
                                                    <button
                                                        className="action user"
                                                        onClick={() =>
                                                            updateUserModal(
                                                                user._id,
                                                                "user"
                                                            )
                                                        }
                                                    >
                                                        user
                                                    </button>
                                                    
                                                )}
                                            </>
                                        )}
                                        <button
                                            className="color-blue"
                                            onClick={() => deleteModal(user._id)}
                                        >
                                            <MdDelete />
                                        </button> */}
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
        font-size: 16px;
        padding: 1px 8px;
        border-radius: 4px;
        color: #fff;
        text-transform: capitalize;
    }
    .action.recruiter {
        background-color: #ac04ac;
    }
    .action.admin {
        background-color: #5f14c7;
    }
    .action.user {
        background-color: #c714c7;
    }
   
`;


export default AdminJobs
