import { createBrowserRouter } from "react-router-dom";
import HomeLayout from "../Layout/HomeLayout";
import DashboardLayout from "../Layout/DashboardLayout";

// Pages
import {
    Register,
    RecruiterRegister,
    Login,
    Landing,
    AboutUs,
    Contact,
    Faqs,
    Error,
    AllJobs,
    Stats,
    Profile,
    Admin,
    EditJob,
    AddJob,
    ManageJobs,
    Job,
    ScheduleInterview,
    MyJobs,
    EditProfile,
    ManageUsers,
    InterviewTable,
    StatusInterview,
    Quiz,
    InterviewSchedule,
    AdminJobs,
} from "../pages";

import { JobContext } from "../context/JobContext";

import CommonProtectRoute from "../components/shared/CommonProtectRoute";
import ProtectAdminRoute from "../components/shared/ProtectAdminRoute";
import RecruiterRoute from "../components/shared/RecruiterRoute";

const router = createBrowserRouter([
    {
        path: "/",
        element: <HomeLayout></HomeLayout>,
        errorElement: <Error />,
        children: [
            {
                index: true,
                element: <Landing />,
            },
            {
                path: "all-jobs",
                element: (
                    <CommonProtectRoute>
                        <JobContext>
                            <AllJobs />
                        </JobContext>
                    </CommonProtectRoute>
                ),
            },
            {
                path: "job/:id",
                element: (
                    <CommonProtectRoute>
                        <JobContext>
                            <Job />
                        </JobContext>
                    </CommonProtectRoute>
                ),
            },
            {
                path: "register",
                element: <Register></Register>,
            },
            {
                path: "recruiter-register",
                element: <RecruiterRegister></RecruiterRegister>,
            },
            {
                path: "login",
                element: <Login></Login>,
            },
            {
                path: "about-us",
                element: <AboutUs/>,
            },
            {
                path: "faqs",
                element: <Faqs/>,
            },
            {
                path: "contact",
                element: <Contact/>,
            },
            
            {
                path: "dashboard",
                element: (
                    <CommonProtectRoute>
                        <JobContext>
                            <DashboardLayout></DashboardLayout>
                        </JobContext>
                    </CommonProtectRoute>
                ),
                children: [
                    {
                        index: true,
                        element: <Profile />,
                    },
                    {
                        path: "edit-profile/:id",
                        element: <EditProfile />,
                    },
                    {
                        path: "schedule-interview/:id",
                        element:<ScheduleInterview/>,
                    },
                    {
                        path: "stats",
                        element: (
                            <ProtectAdminRoute>
                                <Stats />
                            </ProtectAdminRoute>
                        ),
                    },
                    {
                        path: "add-jobs",
                        element: (
                            <RecruiterRoute>
                                <AddJob />
                            </RecruiterRoute>
                        ),
                    },
                    {
                        path: "manage-interviews",
                        element: (
                            <RecruiterRoute>
                                <InterviewTable/>
                            </RecruiterRoute>
                        ),
                    },
                    {
                        path: "schedule-interviews",
                        element: (
                            <RecruiterRoute>
                                <InterviewSchedule/>
                            </RecruiterRoute>
                        ),
                    },
                    {
                        path: "status-interviews",
                        element: (
                           <CommonProtectRoute>
                            <StatusInterview/>
                           </CommonProtectRoute>
                        ),
                    },
                    {
                        path: "quiz",
                        element: (
                           <CommonProtectRoute>
                            <Quiz/>
                           </CommonProtectRoute>
                        ),
                    },
                    {
                        path: "manage-jobs",
                        element: (
                            <RecruiterRoute>
                                <ManageJobs />
                            </RecruiterRoute>
                        ),
                    },
                    {
                        path: "manage-users",
                        element: (
                            <ProtectAdminRoute>
                                <ManageUsers />
                            </ProtectAdminRoute>
                        ),
                    },
                    {
                        path: "admin-jobs",
                        element: (
                            <ProtectAdminRoute>
                                <AdminJobs />
                            </ProtectAdminRoute>
                        ),
                    },
                    {
                        path: "admin",
                        element: (
                            <ProtectAdminRoute>
                                <Admin />
                            </ProtectAdminRoute>
                        ),
                    },
                    {
                        path: "edit-job/:id",
                        element: (
                            <RecruiterRoute>
                                <EditJob />
                            </RecruiterRoute>
                        ),
                    },
                    {
                        path: "my-jobs",
                        element: (
                            <CommonProtectRoute>
                                <MyJobs />
                            </CommonProtectRoute>
                        ),
                    },
                    
                ],
            },
        ],
    },
]);

export default router;
