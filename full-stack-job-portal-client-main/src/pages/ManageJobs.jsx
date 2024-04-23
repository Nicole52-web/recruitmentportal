import React from "react";
import { CiSquarePlus } from "react-icons/ci";
import styled from "styled-components";
import { useJobContext } from "../context/JobContext";
import LoadingComTwo from "../components/shared/LoadingComTwo";

import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { MdVisibility } from "react-icons/md";

import Swal from "sweetalert2";
import axios from "axios";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getAllHandler } from "../utils/FetchHandlers";
import { exportTableToPDF, exportTableToCSV } from "../utils/TableExport";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const ManageJobs = () => {
    const {
        isPending,
        isError,
        data: jobs,
        error,
        refetch,
    } = useQuery({
        queryKey: ["my-jobs"],
        queryFn: () =>
            getAllHandler(
                `http://localhost:3000/api/v1/jobs/my-jobs`
            ),
    });

    // Function to show delete confirmation modal
    const deleteModal = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#19b74b",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                deleteJobHandler(id);
            }
        });
    };

     // Function to handle job deletion
    const deleteJobHandler = async (id) => {
        try {
            const response = await axios.delete(
                `http://localhost:3000/api/v1/jobs/${id}`,
                { withCredentials: true }
            );

            // const updateJobs = jobs?.result?.filter((job) => job._id !== id);
            // setJobs(updateJobs);
            // handleJobFetch(
            //     `http://localhost:3000/api/v1/jobs?page=1`
            // );
            refetch();
            Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
            });
        } catch (error) {
            Swal.fire({
                title: "Sorry!",
                text: error?.message,
                icon: "error",
            });
        }
    };

     // Function to handle PDF export
    const handleExportPDF = () => {
        const doc = new jsPDF();
        autoTable(doc, { html: "#jobs-table" });
        doc.save("Myjobs.pdf");
    };

    

    // Checking if data is still loading
    if (isPending) {
        return <LoadingComTwo />;
    }

    if (isError) {
        console.log(error?.message);
        return (
            <h2 className="text-lg md:text-3xl font-bold text-red-600 text-center mt-12">
                {error?.message}
            </h2>
        );
    }


    // Checking if jobs list is empty
    if (!jobs?.result?.length) {
        return (
            <h2 className="text-lg md:text-3xl font-bold text-red-600 text-center mt-12">
                -- Job List is Empty --
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
            <div className="export-buttons">
    <button className="bg-blue-500 text-white rounded px-4 py-2 m-2" onClick={handleExportPDF}>Export as PDF</button>
   
</div>
                <table className="table" id="jobs-table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Job Position</th>
                            <th>Company</th>
                            <th>Created By</th>
                            <th>actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {jobs?.result?.map((job, index) => {
                            let i =
                                index + 1 < 10 ? `0${index + 1}` : index + 1;
                            return (
                                <tr key={job._id}>
                                    <td>{i}</td>
                                    <td>{job?.position}</td>
                                    <td>{job?.company}</td>
                                    <td>{job?.createdBy?.username}</td>
                                    <td className="action-row">
                                        <Link
                                            to={`/job/${job._id}`}
                                            className="action view"
                                        >
                                            <MdVisibility />
                                        </Link>
                                        <Link
                                            to={`/dashboard/edit-job/${job._id}`}
                                            className="action edit"
                                        >
                                            <FaRegEdit />
                                        </Link>
                                        <button
                                            className="action delete"
                                            onClick={() => deleteModal(job._id)}
                                        >
                                            <MdDelete />
                                        </button>
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

export default ManageJobs;
