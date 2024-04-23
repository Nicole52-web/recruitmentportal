
import {
    AdminLinks,
    UserLinks,
    RecruiterLinks,
} from "../../utils/DashboardNavLinkData";
import { NavLink } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";

const DashboardNavLinks = () => {
    const { user } = useUserContext();

    // If the user is an admin
    if (user?.role === "admin") {
        return (
            <div className="nav-links">
                {/* Mapping over the AdminLinks array and creating a NavLink for each item */}
                {AdminLinks?.map((link) => {
                    const { text, path, icon } = link;
                     // If the path is "admin" and the user is not an admin, do not render the link
                    if (path === "admin" && user?.role !== "admin") {
                        return;
                    }
                    return (
                        <NavLink to={path} key={text} className="nav-link" end>
                            <span className="icon">{icon}</span>
                            {text}
                        </NavLink>
                    );
                })}
            </div>
        );
    }

     // If the user is a recruiter
    if (user?.role === "recruiter") {
        return (
            <div className="nav-links">
                {/* Mapping over the RecruiterLinks array and creating a NavLink for each item */}
                {RecruiterLinks?.map((link) => {
                    const { text, path, icon } = link;
                    if (path === "admin" && user?.role !== "admin") {
                        return;
                    }
                    return (
                        <NavLink to={path} key={text} className="nav-link" end>
                            <span className="icon">{icon}</span>
                            {text}
                        </NavLink>
                    );
                })}
            </div>
        );
    }

    // If the user is neither an admin nor a recruiter, render the UserLinks
    return (
        <div className="nav-links">
            {UserLinks?.map((link) => {
                const { text, path, icon } = link;
                if (path === "admin" && user?.role !== "admin") {
                    return;
                }
                return (
                    <NavLink to={path} key={text} className="nav-link" end>
                        <span className="icon">{icon}</span>
                        {text}
                    </NavLink>
                );
            })}
        </div>
    );
};

export default DashboardNavLinks;
