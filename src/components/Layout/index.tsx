import { useContext } from "react";
import {Link, useLocation} from "react-router-dom";
import UserContext from "../../types/UserContext";
import { SessionService } from "../../services/sessionService";
import { API, TOKEN_KEY } from "../../constants";
import {
  Navbar,
  Button,
  Dropdown,
  Avatar,
  Sidebar,
} from "flowbite-react/lib/esm/components";

import { FaUser, FaAward, FaListUl, FaClipboardList } from "react-icons/fa";
import { MdLeaderboard } from "react-icons/md";

interface LayoutProps {
  children: React.ReactElement;
  className?: string;
}

function Layout(props: LayoutProps) {
  const { children } = props;

  const userProfile = useContext(UserContext);
  const authUrl = `${API.BASE}/authorize`;

  const location = useLocation();

  const handleLogout = async () => {
    await SessionService.destroySession();
    localStorage.removeItem(TOKEN_KEY);
    window.location.href = "/";
  };

  const huddler_routes = [
    {
      name: "Profile",
      icon: FaUser,
      matcher: "/profile",
    },
    {
      name: "Badges",
      icon: FaAward,
      matcher: "/badges",
    },
    {
      name: "Sprint & Issues",
      icon: FaListUl,
      matcher: "/sprints",
    },
    {
      name: "Tasks",
      icon: FaClipboardList,
      matcher: "/tasks",
    },
    {
      name: "Leaderboard",
      icon: MdLeaderboard,
      matcher: "/leaderboard",
    },
  ];

  return (
    <div className="h-screen w-screen">
      {userProfile ? (
        <div className="flex h-full">
          <div className="w-fit shadow-xl rounded-tr-2xl rounded-br-2xl z-40">
            <Sidebar>
              <Sidebar.Items>
                <Sidebar.ItemGroup>
                  {huddler_routes.map((route) => {
                    return (
                      <div
                        className={`rounded-lg ${
                          location.pathname === route.matcher
                            ? "bg-gray-100"
                            : ""
                        }`}
                      >
                        <Link to={route.matcher}>
                          <Sidebar.Item icon={route.icon}>
                            {route.name}
                          </Sidebar.Item>
                        </Link>
                      </div>
                    );
                  })}
                </Sidebar.ItemGroup>
              </Sidebar.Items>
            </Sidebar>
          </div>
          <div className="w-full">
            <Navbar className="bg-gray-600">
              <div />
              <div className="flex justify-end">
                <Dropdown
                  arrowIcon={false}
                  inline={true}
                  label={
                    <Avatar
                      alt="User profile"
                      img={userProfile.photo}
                      rounded={true}
                    />
                  }
                >
                  <Dropdown.Header>
                    <span className="block text-sm">{userProfile.name}</span>
                    <span className="block truncate text-sm font-medium">
                      {userProfile.githubUsername}
                    </span>
                  </Dropdown.Header>
                  <Dropdown.Item onClick={handleLogout}>Sign out</Dropdown.Item>
                </Dropdown>
                <Navbar.Toggle />
              </div>
            </Navbar>
            <main className="h-full overflow-x-hidden overflow-y-scroll">{children}</main>
          </div>
        </div>
      ) : (
        <div className="w-full">
          <Navbar className="bg-gray-600">
            <div />
            <div className="flex justify-end">
              <Button href={authUrl}>Login using github</Button>
              <Navbar.Toggle />
            </div>
          </Navbar>
          <main>{children}</main>
        </div>
      )}
    </div>
  );
}

export default Layout;
