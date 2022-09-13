import { Badge, Button, Dropdown, Progress, Card } from "flowbite-react";
import { HiCheck, HiPlus } from "react-icons/hi";
import {useContext, useEffect, useState} from "react";
import userContext from "../../types/UserContext";
import { Profile } from "../../types/Profile";
import CreateNewBadgePrompt from "./components/CreateNewBadgePrompt";
import {BadgeDto} from "../../types/HuddlerBadge";
import {BadgeService} from "../../services/badgeService";

interface BadgesViewProps {
  isAgentView: boolean;
}

enum SortingOption {
  DEFAULT = "DEFAULT",
  COMPLETED = "BY_COMPLETED",
  INCOMPLETE = "BY_INCOMPLETE",
}

function BadgesView ({ isAgentView }: BadgesViewProps) {
  const profile = useContext(userContext);
  const [selectedSortingOption] = useState<SortingOption>(SortingOption.DEFAULT);
  const [isCreateModalVisible, setIsCreateModalVisible] = useState<boolean>(false);
  const [badges, setBadges] = useState<BadgeDto[]>([]);

  useEffect(() => {
    fetchBadges();
  }, []);

  const onCreateModalClose = () => {
    setIsCreateModalVisible(false);
    fetchBadges();
  }

  const fetchBadges = async () => {
    setBadges(await BadgeService.getBadges());
  }

  return (
    <div className="px-8 space-y-8">
      <CreateNewBadgePrompt show={isCreateModalVisible} onClose={onCreateModalClose} />
      <div className="space-y-2">
        <h1 className="text-3xl font-medium text-gray-900">Badges</h1>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          Set of badges to be achieved by the huddlers by completing tasks and other badges.
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
              <Button onClick={() => setIsCreateModalVisible(true)}>
                Add new badge
                <HiPlus className="ml-2" />
              </Button>
            )}
          </div>
        </div>
        {badges.length === 0 && (
          <div className="flex justify-center">
            <h5 className="text-sm tracking-tight text-gray-900 dark:text-white">
              No badges found
            </h5>
          </div>
        )}
        <div className="grid grid-cols-3 gap-6 mb-10">
          {badges.map((badge) => {
            return (
              <Card key={badge.id}>
                <div className="flex gap-4 h-28">
                  <img className="h-24 w-24" src={badge.photo} alt="" />
                  <div>
                    <p className="text-md font-semibold">{badge.title}</p>
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

export default BadgesView;
