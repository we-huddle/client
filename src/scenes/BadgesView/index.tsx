import { Badge, Button, Dropdown, Progress, Card } from "flowbite-react";
import {HiCheck, HiPlus, HiXCircle} from "react-icons/hi";
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
  LATEST = "LATEST",
}

function BadgesView ({ isAgentView }: BadgesViewProps) {
  const profile = useContext(userContext);
  const [selectedSortingOption, setSelectedSortingOption] = useState<SortingOption>(SortingOption.DEFAULT);
  const [isCreateModalVisible, setIsCreateModalVisible] = useState<boolean>(false);
  const [badges, setBadges] = useState<BadgeDto[]>([]);
  const [completedBadgeIds, setCompletedBadgeIds] = useState<string[]>([]);

  useEffect(() => {
    fetchBadges();
  }, []);

  useEffect(() => {
    if (!isAgentView) fetchCompletedBadges();
  }, [isAgentView]);

  const onCreateModalClose = () => {
    setIsCreateModalVisible(false);
  }

  const fetchBadges = async () => {
    setBadges(await BadgeService.getBadges());
  }

  const fetchCompletedBadges = async () => {
    const completedList = await BadgeService.getCompletedBadges();
    setCompletedBadgeIds(completedList.map((badge) => badge.id));
  }

  const sortByCompleted = () => {
    const sortedBadgeList = badges.sort(
      (a, b) => {
        const aInCompleted = completedBadgeIds.includes(a.id);
        const bInCompleted = completedBadgeIds.includes(b.id);
        if (aInCompleted === bInCompleted) return 0;
        if (aInCompleted) return -1;
        if (bInCompleted) return 1;
        return 0;
      }
    );
    setBadges(sortedBadgeList);
    setSelectedSortingOption(SortingOption.COMPLETED);
  }

  const sortByIncomplete = () => {
    const sortedBadgeList = badges.sort(
      (a, b) => {
        const aInCompleted = completedBadgeIds.includes(a.id);
        const bInCompleted = completedBadgeIds.includes(b.id);
        if (aInCompleted === bInCompleted) return 0;
        if (aInCompleted) return 1;
        if (bInCompleted) return -1;
        return 0;
      }
    );
    setBadges(sortedBadgeList);
    setSelectedSortingOption(SortingOption.INCOMPLETE);
  }

  const sortByLatest = () => {
    const sortedBadgeList = badges.sort(
      (a, b) => b.createdAt - a.createdAt
    );
    setBadges(sortedBadgeList);
    setSelectedSortingOption(SortingOption.LATEST)
  }


  const sortByDefault = () => {
    fetchBadges();
    setSelectedSortingOption(SortingOption.DEFAULT);
  }

  return (
    <div className="px-8 space-y-8">
      <CreateNewBadgePrompt show={isCreateModalVisible} onClose={onCreateModalClose} />
      <div className="space-y-2">
        <h1 className="text-3xl font-medium text-gray-900">Badges</h1>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          The set of badges to be achieved by the huddlers by completing tasks and other badges.
        </p>
      </div>
      <div className="space-y-8">
        {!isAgentView && (
          <div>
            <Progress
              progress={Math.round((completedBadgeIds.length / badges.length) * 100)}
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
                    LATEST: "Latest",
                  }[selectedSortingOption]
                }
              </div>
            </Badge>
            {selectedSortingOption !== SortingOption.DEFAULT && (
              <Button
                color="gray"
                size="xs"
                onClick={sortByDefault}
                pill
              >
                Clear
                <HiXCircle className="ml-2" />
              </Button>
            )}
          </div>
          <div className="flex justify-end items-center gap-2">
            <Button color="gray">
              <div className="text-left">
                <Dropdown label="Sort" inline={true}>
                  {!isAgentView && (
                    <>
                      <Dropdown.Item onClick={sortByCompleted}>Completed</Dropdown.Item>
                      <Dropdown.Item onClick={sortByIncomplete}>Incomplete</Dropdown.Item>
                    </>
                  )}
                  <Dropdown.Item onClick={sortByLatest}>
                    By latest
                  </Dropdown.Item>
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
                <div className="flex gap-4 h-28 items-center">
                  <img className="h-24 w-24" src={badge.photo} alt="" />
                  <div className="space-y-2">
                    <p className="text-md font-semibold">{badge.title}</p>
                    <p className="line-clamp-2 text-sm text-gray-500">{badge.description}</p>
                    {!isAgentView && completedBadgeIds.includes(badge.id) && (
                      <Badge color="success" icon={HiCheck}>
                        <div className="px-1">
                          Completed
                        </div>
                      </Badge>
                    )}
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
