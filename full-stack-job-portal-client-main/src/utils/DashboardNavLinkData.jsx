import React from "react";

import { IoIosStats } from "react-icons/io";
import { RiMenuAddFill } from "react-icons/ri";
import { FaUserAlt } from "react-icons/fa";
import { FaUserShield } from "react-icons/fa";
import { MdManageAccounts } from "react-icons/md";
import { FaBriefcase } from "react-icons/fa";
import { FaUsers } from "react-icons/fa6";
import { AiFillSchedule } from "react-icons/ai";
import { GrScheduleNew } from "react-icons/gr";
import { FaUserCheck } from "react-icons/fa";
import { MdQuiz } from "react-icons/md";
import { IoFileTrayStacked } from "react-icons/io5";

const AdminLinks = [
    {
        text: "profile",
        path: ".",
        icon: <FaUserAlt />,
    },
    {
        text: "stats",
        path: "stats",
        icon: <IoIosStats />,
    },
    {
        text: "admin",
        path: "admin",
        icon: <FaUserShield />,
    },
    {
        text: "manage users",
        path: "manage-users",
        icon: <FaUsers />,
    },
    {
        text: "Manage Jobs",
        path: "admin-jobs",
        icon: <IoFileTrayStacked/>,
    },
];

const RecruiterLinks = [
    {
        text: "profile",
        path: ".",
        icon: <FaUserAlt />,
    },
    {
        text: "add job",
        path: "add-jobs",
        icon: <RiMenuAddFill />,
    },
    {
        text: "manage jobs",
        path: "manage-jobs",
        icon: <MdManageAccounts />,
    },
    {
        text: "Applications",
        path: "my-jobs",
        icon: <FaBriefcase />,
    },
    {
        text: "Schedule Interview",
        path: "schedule-interviews",
        icon: <AiFillSchedule />,
    },
    {
        text: "Scheduled Interviews",
        path: "manage-interviews",
        icon: <FaUserCheck />,
    },
];

const UserLinks = [
    {
        text: "profile",
        path: ".",
        icon: <FaUserAlt />,
    },
    {
        text: "Applications",
        path: "my-jobs",
        icon: <FaBriefcase />,
    },
    {
        text: "Interview Status",
        path: "status-interviews",
        icon: <GrScheduleNew />,
    },
    // {
    //     text: "Assesment Quiz",
    //     path: "quiz",
    //     icon: <MdQuiz />,
    // },
];

export { AdminLinks, RecruiterLinks, UserLinks };
