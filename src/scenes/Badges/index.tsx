import { Badge, Button, Dropdown, Progress, Card } from "flowbite-react";
import { HiCheck, HiPlus } from "react-icons/hi";
import { useContext, useState } from "react";
import userContext from "../../types/UserContext";
import { Profile } from "../../types/Profile";

interface BadgesProps {
  isAgentView: boolean;
}

enum SortingOption {
  DEFAULT = "DEFAULT",
  COMPLETED = "BY_COMPLETED",
  INCOMPLETE = "BY_INCOMPLETE",
}

function Badges({ isAgentView }: BadgesProps) {
  const profile = useContext(userContext);
  const [selectedSortingOption] =
    useState<SortingOption>(SortingOption.DEFAULT);
  const badges = [
    {
      id: 1,
      name: "Badge 1",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      img: "https://sefglobal.org/developers/images/1.png",
    },
    {
      id: 2,
      name: "Badge 2",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      img: "https://sefglobal.org/developers/images/2.png",
    },
    {
      id: 3,
      name: "Badge 3",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      img: "https://sefglobal.org/developers/images/3.png",
    },
    {
      id: 4,
      name: "Badge 4",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      img: "https://sefglobal.org/developers/images/4.png",
    },
    {
      id: 5,
      name: "Badge 5",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      img: "https://sefglobal.org/developers/images/5.png",
    },
  ];
  return (
    <div className="px-8 space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-medium text-gray-900">Badges</h1>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod
          tempor.
        </p>
      </div>
      <div className="space-y-8">
        {!isAgentView && (
          <div>
            <Progress
              progress={Math.round((3 / 10) * 100)}
              color="green"
              label="Completed"
              labelPosition="outside"
              labelProgress={true}
            />
          </div>
        )}
        <div className="grid grid-cols-2">
          <div className="flex gap-2 items-center">
            <p>Sorted by: </p>
            <Badge color="info" icon={HiCheck}>
              <div className="px-1">
                {
                  {
                    DEFAULT: "Default",
                    BY_COMPLETED: "Completed",
                    BY_INCOMPLETE: "Incomplete",
                  }[selectedSortingOption]
                }
              </div>
            </Badge>
          </div>
          <div className="flex justify-end items-center gap-2">
            <Button color="gray">
              <div className="text-left">
                <Dropdown label="Sort" inline={true}>
                  <Dropdown.Item>Completed</Dropdown.Item>
                  <Dropdown.Item>Incomplete</Dropdown.Item>
                </Dropdown>
              </div>
            </Button>
            {isAgentView && profile?.role === Profile.Role.HuddleAgent && (
              <Button>
                Add new badge
                <HiPlus className="ml-2" />
              </Button>
            )}
          </div>
        </div>
        <div className="grid grid-cols-3 gap-6 mb-10">
          {badges.map((badge) => {
            return (
              <Card>
                <div className="flex gap-4 h-28">
                  <img className="h-24 w-24" src={badge.img} alt="" />
                  <div className="">
                    <p className="text-md font-semibold">{badge.name}</p>
                    <p className="line-clamp-4 text-sm text-gray-500">{badge.description}</p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Badges;
