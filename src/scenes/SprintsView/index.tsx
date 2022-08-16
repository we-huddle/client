import {Badge, Button, Dropdown} from "flowbite-react";
import {HiCheck, HiPlus, HiXCircle} from "react-icons/hi";
import {Profile} from "../../types/Profile";
import {useContext, useEffect, useState} from "react";
import userContext from "../../types/UserContext";
import {Sprint} from "../../types/Sprint";
import {SprintsAndIssuesService} from "../../services/sprintsAndIssuesService";
import SprintRow from "./components/SprintRow";

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
  const [sprints, setSprints] = useState<Sprint[]>([]);

  useEffect(() => {
    fetchSprints();
  }, []);

  const fetchSprints = async () => {
    setSprints(await SprintsAndIssuesService.getSprints());
  }

  return (
    <div className="px-8 space-y-8">
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
                <Dropdown.Item>
                  Ongoing
                </Dropdown.Item>
                <Dropdown.Item>
                  Past
                </Dropdown.Item>
              </Dropdown>
            </div>
          </Button>
          {isAgentView && profile?.role === Profile.Role.HuddleAgent && (
            <Button>
              Create new sprint
              <HiPlus className="ml-2" />
            </Button>
          )}
        </div>
      </div>
      {sprints.length === 0 && (
        <div className="flex justify-center">
          <h5 className="text-sm tracking-tight text-gray-900 dark:text-white">
            No tasks found
          </h5>
        </div>
      )}
      <div className="space-y-4">
        {sprints.map((sprint) => {
          return <SprintRow key={sprint.number} sprint={sprint} />
        })}
      </div>
    </div>
  );
}

export default SprintsView;
