import React, { useState } from "react";
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

const ManageUsers = () => {
    const { user: me } = useUserContext();
    const [searchTerm, setSearchTerm] = useState('');
    const {
        isPending,
        isError,
        data: users,
        error,
        refetch,
    } = useQuery({
        queryKey: ["users"],
        queryFn: () =>
            getAllHandler(`http://localhost:3000/api/v1/users`),
    });

    const updateUserModal = (id, role) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#19b74b",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes",
        }).then((result) => {
            if (result.isConfirmed) {
                UpdateUserRole(id, role);
            }
        });
    };

    const UpdateUserRole = async (id, role) => {
        const updateUser = { id, role };
        try {
            const response = await axios.patch(
                `http://localhost:3000/api/v1/admin/update-role`,
                updateUser,
                { withCredentials: true }
            );
            refetch();
            Swal.fire({
                title: "Done!",
                text: "Role Updated Successfully",
                icon: "success",
            });
        } catch (error) {
            console.log(error);
            Swal.fire({
                title: "Sorry!",
                text: error?.response?.data,
                icon: "error",
            });
        }
    };

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
                deleteUserHandler(id);
            }
        });
    };

    // Function to handle user deletion
    const deleteUserHandler = async (id) => {
        try {
            const response = await axios.delete(
                `http://localhost:3000/api/v1/users/${id}`,
                { withCredentials: true }
            );

            refetch();
            Swal.fire({
                title: "Deleted!",
                text: "User has been deleted.",
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

    const filteredUsers = users?.result?.filter(user => 
        user.username.toLowerCase().includes(searchTerm.toLowerCase()) || 
        user.role.toLowerCase().includes(searchTerm.toLowerCase())
    );

   
    const handleExportPDFAllUsers = () => {
        console.log("Exporting all users as PDF...");
        exportTableToPDF("users-table", "All_Users_Report");
    };


    const handleExportPDFSpecificUsers = (role) => {
        console.log(`Exporting ${role} as PDF...`);
    
        // Filter users based on their role
        if (users && role) {
            // Filter users based on the provided role
            const specificUsers = users?.result?.filter(user => 
                user.role && user.role.toLowerCase() === role.toLowerCase()
            );
    
        // Create a new table for specific users
        const specificUsersTable = document.createElement('table');
        specificUsersTable.id = 'specific-users-table';
    
        // Copy the structure of the original table
        specificUsersTable.innerHTML = document.getElementById('users-table').innerHTML;
    
        // Populate the new table with specific users
        specificUsersTable.querySelector('tbody').innerHTML = specificUsers.map((user, index) => {
            let i = index + 1 < 10 ? `0${index + 1}` : index + 1;
            return (
                `<tr key=${user._id}>
                    <td>${i}</td>
                    <td>${user?.username}</td>
                    <td>${user?.email}</td>
                    <td>${user?.role}</td>
            </tr>`
        );
    }).join('');

    // Export the new table to PDF
    // Append the new table to the document body
document.body.appendChild(specificUsersTable);

// Export the new table to PDF
exportTableToPDF(specificUsersTable.id, "Specific_Users_Report");

// Remove the new table from the document body
document.body.removeChild(specificUsersTable);
} else {
    console.error('Users or role is not defined');
}
};
   

// check if users list is still loading
    if (isPending) {
        return <LoadingComTwo />;
    }
    if (users) {
        // console.log(users);
    }

    //check if there are no users
    if (!users?.result?.length) {
        return (
            <h2 className="text-lg md:text-3xl font-bold text-red-600 text-center mt-12">
                -- User List is Empty --
            </h2>
        );
    }
    return (
        <Wrapper>
            <div className="title-row">
                Manage Users
                <CiSquarePlus className="ml-1 text-xl md:text-2xl" />
            </div>
            <div className="content-row">
            <div>
            <input 
                className="search-bar"
                type="text" 
                placeholder="Search by name or role" 
                value={searchTerm} 
                onChange={e => setSearchTerm(e.target.value)} 
            />
            </div>
            <div className="export-buttons">
            <button className="bg-blue-500 text-white rounded px-4 py-2 m-2" onClick={handleExportPDFAllUsers}>Export All Users as PDF</button>
            <button className="bg-blue-500 text-white rounded px-4 py-2 m-2" onClick={() => handleExportPDFSpecificUsers('recruiter')}>Export Recruiters as PDF</button>
            <button className="bg-blue-500 text-white rounded px-4 py-2 m-2" onClick={() => handleExportPDFSpecificUsers('user')}>Export Regular Users as PDF</button>

</div>
                
                <table className="table" id="users-table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers?.map((user, index) => {
                            let i =
                                index + 1 < 10 ? `0${index + 1}` : index + 1;
                            return (
                                <tr key={user._id}>
                                    <td>{i}</td>
                                    <td>{user?.username}</td>
                                    <td>{user?.email}</td>
                                    <td>{user?.role}</td>
                                    <td className="action-row">
                                        {user?._id === me._id ? null : (
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

export default ManageUsers;
