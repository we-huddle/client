import { useContext } from "react";
import userContext from "../../types/UserContext";
import { Card, Progress } from "flowbite-react/lib/esm/components";

function ProfileView() {
  const profile = useContext(userContext);

  const badges = [
    {
      id: 1,
      name: "badge 1",
      level: "1",
      img: "https://sefglobal.org/developers/images/1.png",
    },
    {
      id: 2,
      name: "badge 2",
      level: "2",
      img: "https://sefglobal.org/developers/images/2.png",
    },
    {
      id: 3,
      name: "badge 3",
      level: "3",
      img: "https://sefglobal.org/developers/images/3.png",
    },

  ];

  const prs = [
    {
      prNo: 10,
      title:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      prNo: 12,
      title:
        "Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      prNo: 19,
      title:
        "Sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.",
    },
    {
      prNo: 21,
      title:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      prNo: 34,
      title:
        "Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
  ];

  return (
    <div>
      <div className="px-8 w-full">
        <div className="grid grid-cols-5 gap-4">
          <div className="space-y-4 col-span-2">
            <Card>
              <div className="flex">
                <img
                  className="rounded-full w-32 h-32"
                  src={profile?.photo}
                  alt=""
                />
                <div className="mt-5 ml-3 mr-10">
                  <p className="text-lg font-semibold">{profile?.name}</p>
                  <p className="text-sm text-gray-400">
                    @{profile?.githubUsername}
                  </p>
                  <a
                    href={"https://github.com/" + profile?.githubUsername}
                    className="inline-flex items-center rounded-lg bg-blue-700 py-2 px-3 mt-2 text-center text-xs font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Visit Github Profile
                  </a>
                </div>
              </div>
            </Card>
            <Card>
              <p className="font-semibold">Recent Pull Requests</p>

              {prs.map((pr) => {
                return (
                  <div className="flex text-sm text-gray-500 gap-4 hover:underline hover:text-blue-700 hover:cursor-pointer">
                    <p className="w-13">#{pr.prNo}</p>
                    <p className="truncate">{pr.title}</p>
                  </div>
                );
              })}
            </Card>
          </div>
          <div className="col-span-3">
            <Card>
              <div className="flex gap-6 mt-5">
                <div className="bg-gray-50 rounded-lg w-40 h-24 py-3 px-6">
                  <p className="font-semibold text-4xl text-gray-700">21</p>
                  <p className="text-gray-600">PR Count</p>
                </div>
                <div className="bg-gray-50 rounded-lg h-24 py-3 px-6">
                  <p className="font-semibold text-4xl text-gray-700">7</p>
                  <p className="text-gray-600">Tasks Completed</p>
                </div>
                <div className="bg-gray-50 rounded-lg w-40 h-24 py-3 px-6">
                  <p className="font-semibold text-4xl text-gray-700">3</p>
                  <p className="text-gray-600">Badges Earned</p>
                </div>
              </div>
              <div className="mt-5">
                <Progress
                  progress={Math.round((3 / 10) * 100)}
                  color="green"
                  size="lg"
                  label={3 + " badges earned out of " + 10}
                  labelPosition="outside"
                />
                <div className="mt-10">
                  <div className="grid grid-cols-4 mt-10 justify-items-center">
                    {badges.map((badge) => {
                      return (
                        <div className="mx-auto content-center place-items-center text-center mb-10">
                          <img className="h-20.5 w-20" src={badge.img} alt="" />
                          <p className="font-medium text-md text-gray-800">
                            {badge.name}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileView;