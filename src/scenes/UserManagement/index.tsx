import { Avatar, Badge, Button } from "flowbite-react";
import { useEffect, useState } from "react";
import { HiEye, HiKey } from "react-icons/hi";
import { Link } from "react-router-dom";
import { UserServices } from "../../services/userServices";
import { Profile } from "../../types/Profile";

function UserManagement() {
  const [profile, setProfile] = useState<Profile[]>([]);

  const fetchProfiles = async () => {
    const taskList = await UserServices.getAllProfiles();
    setProfile(taskList);
  };

  useEffect(() => {
    fetchProfiles();
  }, []);

  async function updateRole(profileId: string) {
    await UserServices.updateRole(profileId);
    fetchProfiles();
  }

  function handleSearch(keyword: string) {
    const searchText = keyword.trim().toLowerCase();
    if (searchText == "") {
      fetchProfiles();
    } else {
      console.log("heell");
      const filteredProfiles = profile.filter((p) => {
        return (
          p.name.toLowerCase().includes(searchText) ||
          p.githubUsername.toLowerCase().includes(searchText) ||
          p.role.toLowerCase().includes(searchText)
        );
      });
      setProfile(filteredProfiles);
    }
  }

  return (
    <div className="px-8 space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-medium text-gray-900">Members</h1>
      </div>
      <div className="relative">
        <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
          <svg
            aria-hidden="true"
            className="w-5 h-5 text-gray-500 dark:text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </div>
        <input
          type="search"
          id="default-search"
          className="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search users..."
          onChange={(event) => handleSearch(event.target.value)}
        />
        <button
          type="submit"
          className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Search
        </button>
      </div>
      <div className="space-y-2">
        <table className="shadow-xl w-full">
          <tbody className="divide-y">
            <tr className="bg-white dark:border-blue-700 dark:bg-gray-800 w-screen rounded-lg">
              <th className="whitespace-nowrap p-5">
                <Avatar rounded={true} />
              </th>
              <th className="whitespace-nowrap p-5">
                <div className="flex text-sm font-semibold text-gray-700 gap-4">
                  Name
                </div>
              </th>
              <th className="whitespace-nowrap p-5">
                <div className="flex text-sm font-semibold text-gray-700 gap-4">
                  GitHub User_Name
                </div>
              </th>
              <th className="whitespace-nowrap p-5">
                <div className="flex text-sm font-semibold text-gray-700 gap-4">
                  Role
                </div>
              </th>
              <th className="whitespace-nowrap p-5">
                <div className="flex text-sm font-semibold text-gray-700 gap-4">
                  Agent Privilege
                </div>
              </th>
              <th className="whitespace-nowrap p-5">
                <div className="flex text-sm font-semibold text-gray-700 gap-4">
                  User Profile
                </div>
              </th>
            </tr>
            {profile.map((profile) => {
              return (
                <tr className="bg-white dark:border-blue-700 dark:bg-gray-800 w-screen p-5">
                  <th className="whitespace-nowrap p-5">
                    <Avatar
                      alt="User profile"
                      img={profile.photo}
                      rounded={true}
                    />
                  </th>
                  <th className="whitespace-nowrap p-5">
                    <div className="flex text-sm text-gray-500 gap-4">
                      {profile.name}
                    </div>
                  </th>
                  <th className="whitespace-nowrap p-5">
                    <div className="flex text-sm text-gray-500 gap-4">
                      {profile.githubUsername}
                    </div>
                  </th>
                  <th className="whitespace-nowrap p-5">
                    {profile.role === "HUDDLER" && (
                      <div className="flex items-center text-sm text-gray-500 gap-4">
                        <Badge color="purple">{profile.role}</Badge>
                      </div>
                    )}
                    {profile.role === "HUDDLE_AGENT" && (
                      <div className="flex items-center text-sm text-gray-500 gap-4">
                        <Badge color="success">{profile.role}</Badge>
                      </div>
                    )}
                  </th>
                  <th className="whitespace-nowrap p-5">
                    {profile.role === "HUDDLER" && (
                      <div className="flex items-center gap-2">
                        <Button
                          size="xs"
                          onClick={() => updateRole(profile.id)}
                        >
                          <div className="w-12">Grant</div>
                          <HiKey />
                        </Button>
                      </div>
                    )}
                    {profile.role === "HUDDLE_AGENT" && (
                      <div className="flex items-center gap-2">
                        <Button
                          size="xs"
                          onClick={() => updateRole(profile.id)}
                        >
                          <div className="w-12">Revoke</div>
                          <HiKey />
                        </Button>
                      </div>
                    )}
                  </th>
                  <th className="whitespace-nowrap p-5">
                    <div>
                      <Link to={`/agent/profile/user/${profile.id}`}>
                        <Button size="xs">
                          <div className="w-12">View</div>
                          <HiEye />
                        </Button>
                      </Link>
                    </div>
                  </th>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UserManagement;
