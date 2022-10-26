import { Avatar, Badge, Button} from "flowbite-react";
import { useEffect, useState } from "react";
import { HiEye, HiKey } from "react-icons/hi";
import { Link } from "react-router-dom";
import { UserServices } from "../../services/userServices";
import {  Profile } from "../../types/Profile";

interface UserManagementProps {
  isAgentView: boolean,
}

function UserManagement({ isAgentView }: UserManagementProps){
    const [profile, setProfile] = useState<Profile[]>([]);

    const fetchProfiles = async () => {
        const taskList = await UserServices.getAllProfiles();
        setProfile(taskList);
      }

      useEffect(() => {
        fetchProfiles();
      }, [])

      async function updateRole(profileId : string) {
        await UserServices.updateRole(profileId);
        fetchProfiles();
      }


    return (
      <div className="px-8 space-y-8">
        <div className="space-y-2">
            <h1 className="text-3xl font-medium text-gray-900">Members</h1>
        </div>
        <div className="space-y-2">
        <table className="shadow-xl w-full">
            <tbody className="divide-y">
              <tr className="bg-white dark:border-blue-700 dark:bg-gray-800 w-screen rounded-lg">
              <th className="whitespace-nowrap p-5">
                <Avatar rounded={true} />
              </th>
              <th className="whitespace-nowrap p-5">
                <div className="flex text-sm font-semibold text-gray-700 gap-4">Name</div>
              </th>
              <th className="whitespace-nowrap p-5">
                <div className="flex text-sm font-semibold text-gray-700 gap-4">GitHub User_Name</div>
              </th>
              <th className="whitespace-nowrap p-5">
                <div className="flex text-sm font-semibold text-gray-700 gap-4">Role</div>
              </th>
              {isAgentView  && (
              <th className="whitespace-nowrap p-5">
                <div className="flex text-sm font-semibold text-gray-700 gap-4">Agent Privilege</div>
              </th>
              )}
              <th className="whitespace-nowrap p-5">
                <div className="flex text-sm font-semibold text-gray-700 gap-4">User Profile</div>
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
                      <div
                        className="flex text-sm text-gray-500 gap-4">
                            {profile.name}
                      </div>
                    </th>
                    <th className="whitespace-nowrap p-5">
                      <div
                        className="flex text-sm text-gray-500 gap-4">
                            {profile.githubUsername}
                      </div>
                    </th>
                    <th className="whitespace-nowrap p-5">
                    {profile.role === "HUDDLER" && (
                        <div className="flex items-center text-sm text-gray-500 gap-4">
                            <Badge color="purple">                            
                                {profile.role}                           
                            </Badge>
                        </div>
                    )}
                    {profile.role === "HUDDLE_AGENT" && (
                        <div className="flex items-center text-sm text-gray-500 gap-4">
                            <Badge color="success">                            
                                {profile.role}                           
                            </Badge>
                        </div>
                    )}
                    </th>                    
                    {isAgentView && (
                    <th className="whitespace-nowrap p-5">
                    {profile.role === "HUDDLER" && (
                        <div className="flex items-center gap-2">
                            <Button size="xs" onClick={() => updateRole(profile.id)}>
                                <div className="w-12">Grant</div>
                                <HiKey/>
                            </Button>
                        </div>
                    )}
                    {profile.role === "HUDDLE_AGENT" && (
                        <div className="flex items-center gap-2">
                            <Button size="xs" onClick={() => updateRole(profile.id)}>
                                <div className="w-12">Revoke</div>
                                <HiKey/>
                            </Button>
                        </div>
                    )}
                    </th>
                    )}
                    <th className="whitespace-nowrap p-5">
                      <div>  
                      {isAgentView && (                  
                      <Link to={`/agent/profile/user/${profile.id}`}>
                            <Button size="xs">
                                <div className="w-12">View</div>
                                <HiEye/>
                            </Button>
                        </Link>                      
                        )}
                        {!isAgentView &&(                  
                          <Link to={`/profile/user/${profile.id}`}>
                                <Button size="xs">
                                    <div className="w-12">View</div>
                                    <HiEye/>
                                </Button>
                            </Link>
                        )}
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
