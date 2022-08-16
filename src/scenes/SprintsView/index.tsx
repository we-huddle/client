import {Badge, Button, Dropdown} from "flowbite-react";
import {HiCheck, HiPlus, HiXCircle} from "react-icons/hi";
import {Profile} from "../../types/Profile";
import {useContext, useEffect, useRef, useState} from "react";
import userContext from "../../types/UserContext";
import {Sprint} from "../../types/Sprint";
import {SprintsAndIssuesService} from "../../services/sprintsAndIssuesService";
import SprintRow from "./components/SprintRow";
import CreateNewSprintPrompt from "./components/CreateNewSprintPrompt";

interface SprintsViewProps {
  isAgentView: boolean,
}

enum FilterOption {
  DEFAULT = "DEFAULT",
  ONGOING = "ONGOING",
  PAST = "PAST",
}

function SprintsView({ isAgentView }: SprintsViewProps) {
  const profile = useContext(userContext);
  const [selectedFilterOption, setSelectedFilterOption] = useState<FilterOption>(FilterOption.DEFAULT);
  const [isCreateModalVisible, setIsCreateModalVisible] = useState<boolean>(false);
  const sprints = useRef<Sprint[]>([]);
  const [filteredSprints, setFilteredSprints] = useState<Sprint[]>([]);

  useEffect(() => {
    fetchSprints();
  }, []);

  const fetchSprints = async () => {
    sprints.current = await SprintsAndIssuesService.getSprints()
    setFilteredSprints(sprints.current);
  }

  const onPromptClose = () => {
    setIsCreateModalVisible(false);
    fetchSprints();
  }

  const filterOngoingSprints = () => {
    const currentTime = new Date().getTime()
    setFilteredSprints(sprints.current.filter(
      (sprint) => sprint.deadline * 1000 > currentTime
    ));
    setSelectedFilterOption(FilterOption.ONGOING);
  }

  const filterPastSprints = () => {
    const currentTime = new Date().getTime()
    setFilteredSprints(sprints.current.filter(
      (sprint) => sprint.deadline * 1000 <= currentTime
    ));
    setSelectedFilterOption(FilterOption.PAST);
  }

  const filterDefault = () => {
    setFilteredSprints(sprints.current);
    setSelectedFilterOption(FilterOption.DEFAULT);
  }

  return (
    <div className="px-8 space-y-8">
      <CreateNewSprintPrompt show={isCreateModalVisible} onClose={onPromptClose} />
      <div className="space-y-2">
        <h1 className="text-3xl font-medium text-gray-900">Sprints</h1>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          The list of ongoing and past sprints
        </p>
      </div>
      <div className="grid grid-cols-2">
        <div className="flex gap-2 items-center">
          <p>Filtered by: </p>
          <Badge color="info" icon={HiCheck}>
            <div className="px-1">
              {
                {
                  "DEFAULT" : 'Default',
                  "ONGOING" : 'Ongoing sprints',
                  "PAST" : 'Past sprints',
                }[selectedFilterOption]
              }
            </div>
          </Badge>
          {selectedFilterOption !== FilterOption.DEFAULT && (
            <Button
              color="gray"
              size="xs"
              onClick={filterDefault}
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
              <Dropdown
                label="Filter"
                inline={true}
              >
                <Dropdown.Item onClick={filterOngoingSprints}>
                  Ongoing
                </Dropdown.Item>
                <Dropdown.Item onClick={filterPastSprints}>
                  Past
                </Dropdown.Item>
              </Dropdown>
            </div>
          </Button>
          {isAgentView && profile?.role === Profile.Role.HuddleAgent && (
            <Button onClick={() => setIsCreateModalVisible(true)}>
              Create new sprint
              <HiPlus className="ml-2" />
            </Button>
          )}
        </div>
      </div>
      {filteredSprints.length === 0 && (
        <div className="flex justify-center">
          <h5 className="text-sm tracking-tight text-gray-900 dark:text-white">
            No sprints found
          </h5>
        </div>
      )}
      <div className="space-y-4">
        {filteredSprints.map((sprint) => {
          return <SprintRow key={sprint.number} sprint={sprint} />
        })}
      </div>
    </div>
  );
}

export default SprintsView;
