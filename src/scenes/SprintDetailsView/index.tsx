/* eslint-disable react-hooks/exhaustive-deps */
import {Badge, Button, Dropdown, Progress} from "flowbite-react";
import {HiCheck, HiOutlineArrowLeft, HiPlus, HiXCircle} from "react-icons/hi";
import {Profile} from "../../types/Profile";
import {useContext, useEffect, useRef, useState} from "react";
import userContext from "../../types/UserContext";
import {SprintsAndIssuesService} from "../../services/sprintsAndIssuesService";
import {Issue, IssueState} from "../../types/Issue";
import {useNavigate, useParams} from "react-router-dom";
import {Sprint} from "../../types/Sprint";
import IssueRow from "./components/IssueRow";
import AddIssuesPrompt from "./components/AddIssuesPrompt";

interface SprintDetailsViewProps {
  isAgentView: boolean,
}

enum FilterOption {
  DEFAULT = "DEFAULT",
  OPEN = "OPEN",
  CLOSED = "CLOSED",
}

function SprintDetailsView({ isAgentView }: SprintDetailsViewProps) {
  const profile = useContext(userContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [sprint, setSprint] = useState<Sprint | null>(null);
  const issues = useRef<Issue[] | null>(null);
  const [filteredIssues, setFilteredIssues] = useState<Issue[]>([]);
  const [selectedFilterOption, setSelectedFilterOption] = useState<FilterOption>(FilterOption.DEFAULT);
  const [progress, setProgress] = useState<number>(0);
  const [isCreateModalVisible, setIsCreateModalVisible] = useState<boolean>(false);
  const intlDateFormatter = Intl.DateTimeFormat('en', { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' });

  useEffect(() => {
    fetchSprint();
    fetchIssues();
  }, []);

  const fetchSprint = async () => {
    setSprint(await SprintsAndIssuesService.getSprintById(id!));
  }

  const fetchIssues = async () => {
    issues.current = await SprintsAndIssuesService.getIssuesOfSprint(id!)
    const closedCount = issues.current.filter((issue) => issue.state === IssueState.closed).length;
    setProgress(Math.round((closedCount/issues.current.length)*100));
    setFilteredIssues(issues.current);
  }

  const onPromptClose = () => {
    setIsCreateModalVisible(false);
    fetchIssues();
  }

  const filterOpenIssues = () => {
    setFilteredIssues(issues.current!.filter(
      (issue) => issue.state === IssueState.open
    ));
    setSelectedFilterOption(FilterOption.OPEN);
  }

  const filterPastSprints = () => {
    setFilteredIssues(issues.current!.filter(
      (issue) => issue.state === IssueState.closed
    ));
    setSelectedFilterOption(FilterOption.CLOSED);
  }

  const filterDefault = () => {
    setFilteredIssues(issues.current!);
    setSelectedFilterOption(FilterOption.DEFAULT);
  }

  return (
    <div>
      {sprint == null? "loading" : (
        <div className="px-8 space-y-8">
          {issues.current && (
            <AddIssuesPrompt
              show={isCreateModalVisible}
              onClose={onPromptClose}
              sprint={sprint}
              alreadyAddedIssueIds={issues.current.map((issue) => issue.id)}
            />
          )}
          <div>
            <Button
              color="gray"
              size="md"
              onClick={() => navigate(-1)}
              pill
            >
              <HiOutlineArrowLeft />
            </Button>
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-medium text-gray-900">#{sprint.number} {sprint?.title}</h1>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              {sprint?.description}
            </p>
          </div>
          <div>
            <Progress
              progress={progress}
              color="green"
              label="Progress"
              labelPosition="outside"
              labelProgress={true}
            />
          </div>
          <div className="flex justify-between mt-2 items-center">
            <div>
              <p className="mt-2 text-sm font-normal text-gray-500 dark:text-gray-400">
                Opened on {intlDateFormatter.format(new Date(sprint?.createdAt! * 1000))}
              </p>
            </div>
            <div>
              {new Date() > new Date(sprint!.deadline * 1000) ? (
                <p className={`text-sm ${progress === 100 ? 'text-green-500' : 'text-red-500'} font-normal dark:text-gray-400`}>
                  Ended on {intlDateFormatter.format(new Date(sprint!.deadline * 1000))}
                </p>
              ) : (
                <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
                  Ends on {intlDateFormatter.format(new Date(sprint!.deadline * 1000))}
                </p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-2">
            <div className="flex gap-2 items-center">
              <p>Filtered by: </p>
              <Badge color="info" icon={HiCheck}>
                <div className="px-1">
                  {
                    {
                      "DEFAULT" : 'Default',
                      "OPEN" : 'Open issues',
                      "CLOSED" : 'Closed issues',
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
            <div className="flex justify-end items-center gap-2 z-50">
              <Button color="gray">
                <div className="text-left">
                  <Dropdown
                    label="Filter"
                    inline={true}
                  >
                    <Dropdown.Item onClick={filterOpenIssues}>
                      Open
                    </Dropdown.Item>
                    <Dropdown.Item onClick={filterPastSprints}>
                      Closed
                    </Dropdown.Item>
                  </Dropdown>
                </div>
              </Button>
              {isAgentView && profile?.role === Profile.Role.HuddleAgent && (
                <Button onClick={() => setIsCreateModalVisible(true)}>
                  Add issues
                  <HiPlus className="ml-2" />
                </Button>
              )}
            </div>
          </div>
          {filteredIssues.length === 0 && (
            <div className="flex justify-center">
              <h5 className="text-sm tracking-tight text-gray-900 dark:text-white">
                No issues found
              </h5>
            </div>
          )}
          {filteredIssues.map((issue) => {
            return <IssueRow issue={issue} />
          })}
        </div>
      )}
    </div>
  );
}

export default SprintDetailsView;
