import { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import UserContext from "../../types/UserContext";
import { SessionService } from "../../services/sessionService";
import { NotificationService } from "../../services/notificationService";
import { API, TOKEN_KEY } from "../../constants";
import {
  Navbar,
  Button,
  Dropdown,
  Avatar,
  Sidebar,
} from "flowbite-react/lib/esm/components";
import {FaUser, FaAward, FaListUl, FaClipboardList, FaUsers, FaHeart} from "react-icons/fa";
import { MdLeaderboard, MdNotifications, MdOutlineClose } from "react-icons/md";
import { Profile } from "../../types/Profile";
import { Notification } from "../../types/Notification";

interface LayoutProps {
  children: React.ReactElement;
  className?: string;
}

function Layout(props: LayoutProps) {
  const { children } = props;

  const userProfile = useContext(UserContext);
  const authUrl = `${API.BASE}/authorize`;

  const location = useLocation();

  const [isNotifVisible, setIsNotifVisible] = useState<boolean>(false);
  const [notifications, setNotifications] = useState<Notification[]>();

  useEffect(() => {
    fetchNotifs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogout = async () => {
    await SessionService.destroySession();
    localStorage.removeItem(TOKEN_KEY);
    window.location.href = "/";
  };

  const fetchNotifs = async () => {
    let notifs = await NotificationService.getNotifications();
    setNotifications(notifs);
  };

  const onNotifBellClick = () => {
    isNotifVisible ? setIsNotifVisible(false) : setIsNotifVisible(true);
  };

  const dismissNotif = async (id: string) => {
    await NotificationService.dismissNotification(id);
    fetchNotifs();
  };

  const dismissAllNotifs = async () => {
    await NotificationService.dismissAllNotifications();
    fetchNotifs();
  };

  const huddler_routes = [
    {
      name: "Profile",
      icon: FaUser,
      matcher: "/profile/" + userProfile?.id,
    },
    {
      name: "Feed",
      icon: FaHeart,
      matcher: "/feed",
    },
    {
      name: "Members",
      icon: FaUsers,
      matcher: "/members",
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

  const agent_routes = [
    {
      name: "Sprint & Issues",
      icon: FaListUl,
      matcher: "/agent/sprints",
    },
    {
      name: "Tasks",
      icon: FaClipboardList,
      matcher: "/agent/tasks",
    },
    {
      name: "Badges",
      icon: FaAward,
      matcher: "/agent/badges",
    },
    {
      name: "Leaderboard",
      icon: MdLeaderboard,
      matcher: "/agent/leaderboard",
    },
    {
      name: "Members",
      icon: FaUsers,
      matcher: "/agent/members",
    },
  ];

  return (
    <div className="h-screen w-screen">
      {userProfile ? (
        <div className="flex h-full">
          <div className="w-fit shadow-xl rounded-tr-2xl rounded-br-2xl z-40">
            <Sidebar>
              <Sidebar.Items>
                {location.pathname.includes("agent") ? (
                  <Sidebar.ItemGroup>
                    {agent_routes.map((route) => {
                      return (
                        <div
                          key={route.name}
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
                ) : (
                  <Sidebar.ItemGroup>
                    {huddler_routes.map((route) => {
                      return (
                        <div
                          key={route.name}
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
                )}
              </Sidebar.Items>
            </Sidebar>
          </div>
          <div className="w-full h-full overflow-x-hidden overflow-y-scroll relative">
            <div className="sticky left-0 top-0">
              <Navbar className="bg-gray-600">
                <div />
                <div className="flex justify-end items-center">
                  <div className="relative mr-5">
                    <div>
                      <MdNotifications
                        className="text-gray-600 cursor-pointer"
                        size="35px"
                        onClick={onNotifBellClick}
                      />
                      {notifications?.length ? (
                        <div className="w-3 h-3 bg-red-500 rounded-full absolute left-5 bottom-5 border-solid border-2 border-white"></div>
                      ) : (
                        ""
                      )}
                    </div>
                    <div
                      className={`shadow-lg space-y-3 px-4 pt-3 pb-3 bg-gray-50 text-sm max-h-80 w-80 overflow-y-scroll absolute right-3 top-9 rounded-lg ${
                        isNotifVisible ? "active" : "hidden"
                      }`}
                    >
                      {notifications?.length ? (
                        <>
                          <div className="text-md flex justify-between items-center mt-2">
                            <p className="font-bold">Notifications</p>
                            <button
                              className="bg-blue-700 text-white text-sm py-0.5 px-2 rounded-full"
                              onClick={dismissAllNotifs}
                            >
                              dismiss all
                            </button>
                          </div>
                          <div className="divide-y divide-solid">
                            {notifications?.map((notif) => {
                              return (
                                <div className="flex mb-2">
                                  <div className="flex text-gray-700 w-full hover:underline hover:text-blue-600">
                                    {notif.type === "TASK" ? (
                                      <Link
                                        className="mt-2 w-11/12 hover:underline hover:text-blue-600"
                                        to={"/tasks/" + notif.linkId}
                                      >
                                        {notif.description}
                                      </Link>
                                    ) : (
                                      <Link
                                        className="mt-2 w-11/12 hover:underline hover:text-blue-600"
                                        to={"/badges/" + notif.linkId}
                                      >
                                        {notif.description}
                                      </Link>
                                    )}
                                    <MdOutlineClose
                                      size="13px"
                                      className="mt-3 ml-2 cursor-pointer w-1/12"
                                      onClick={() => dismissNotif(notif.id)}
                                    />
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </>
                      ) : (
                        <div className="text-center">
                          You currently have no new notifications
                        </div>
                      )}
                    </div>
                  </div>
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
                    {userProfile.role === Profile.Role.HuddleAgent && (
                      <>
                        {location.pathname.includes("agent") ? (
                          <Link to={"/profile/" + userProfile?.id}>
                            <Dropdown.Item>
                              Switch to huddler mode
                            </Dropdown.Item>
                          </Link>
                        ) : (
                          <Link to={"/agent/sprints"}>
                            <Dropdown.Item>Switch to agent mode</Dropdown.Item>
                          </Link>
                        )}
                      </>
                    )}
                    <Dropdown.Item onClick={handleLogout}>
                      Sign out
                    </Dropdown.Item>
                  </Dropdown>
                  <Navbar.Toggle />
                </div>
              </Navbar>
            </div>
            <main className="mb-10">{children}</main>
          </div>
        </div>
      ) : (
        <div className="w-full h-full overflow-x-hidden overflow-y-scroll relative">
          <div className="sticky left-0 top-0">
            <Navbar className="bg-gray-600">
              <div />
              <div className="flex justify-end">
                <Button href={authUrl}>Login using github</Button>
                <Navbar.Toggle />
              </div>
            </Navbar>
          </div>
          <main className="mb-10">{children}</main>
        </div>
      )}
    </div>
  );
}

export default Layout;
