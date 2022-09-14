/* eslint-disable react-hooks/exhaustive-deps */
import {Button, Label, Modal, TextInput} from "flowbite-react";
import {useEffect, useState} from "react";
import {HiPlus, HiSearch, HiXCircle} from "react-icons/hi";
import {Issue} from "../../../../types/Issue";
import {SprintsAndIssuesService} from "../../../../services/sprintsAndIssuesService";
import {Sprint} from "../../../../types/Sprint";

interface AddIssuesPromptProps {
  show: boolean,
  onClose: () => void,
  sprint: Sprint,
  alreadyAddedIssueIds: string[]
}

function AddIssuesPrompt({ show, onClose, sprint, alreadyAddedIssueIds }: AddIssuesPromptProps) {
  const [openIssues, setOpenIssues] = useState<Map<string, Issue> | null>(null);
  const [pickedIssueIds, setPickedIssueIds] = useState<string[]>([]);
  const [issueIdsToPickFrom, setIssueIdsToPickFrom] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [errorText, setErrorText] = useState<string | null>(null);

  useEffect(() => {
    fetchOpenIssues();
  }, []);

  const fetchOpenIssues = async () => {
    const issuesList = await SprintsAndIssuesService.getOpenIssues();
    setOpenIssues(new Map(issuesList.map((issue) => [issue.id, issue])));
    setIssueIdsToPickFrom(
      issuesList
        .map((issue) => issue.id)
        .filter(
          (issueId) => !alreadyAddedIssueIds.includes(issueId) && !pickedIssueIds.includes(issueId)
        )
    );
  }

  const handleSubmit = async () => {
    setIsProcessing(true);
    try {
      await SprintsAndIssuesService.addIssuesToSprint(sprint.id, pickedIssueIds);
      onClose();
    } catch (e: any) {
      setErrorText(`Error: ${e.message}`);
    } finally {
      setIsProcessing(false);
    }
  }

  const handlePickIssue = (issueId: string) => {
    setIssueIdsToPickFrom(issueIdsToPickFrom.filter((unpickedIssueId) => unpickedIssueId !== issueId));
    setPickedIssueIds([...pickedIssueIds, issueId]);
  }

  const handleRemoveFromPicked = (issueId: string) => {
    setPickedIssueIds(pickedIssueIds.filter((pickedIssueId) => pickedIssueId !== issueId))
    setIssueIdsToPickFrom([...issueIdsToPickFrom, issueId]);
  }

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const keyword = event.target.value.toLowerCase();
    const issueList = Array.from(openIssues?.values()!)
    setIssueIdsToPickFrom(
      issueList.filter((issue) => {
        return (
          issue.title.toLowerCase().includes(keyword) || issue.repoName.toLowerCase().includes(keyword)
        ) && !alreadyAddedIssueIds.includes(issue.id) && !pickedIssueIds.includes(issue.id)
      }).map((issue) => issue.id)
    )
  }

  return (
    <Modal show={show} onClose={onClose} size="3xl">
      <Modal.Header>
        Add issues to {sprint.title}
      </Modal.Header>
      <Modal.Body>
        <div className="space-y-4">
          {pickedIssueIds.length !== 0 && (
            <div>
              <div className="mb-2 block">
                <Label
                  value="Picked issues"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {pickedIssueIds.map((issueId) => {
                  const issue = openIssues?.get(issueId)!
                  return (
                    <Button
                      color="gray"
                      size="xs"
                      pill
                      onClick={() => handleRemoveFromPicked(issueId)}
                    >
                      #{issue.number} {issue.title}
                      <HiXCircle className="ml-2" />
                    </Button>
                  );
                })}
              </div>
            </div>
          )}
          <div className="mb-2 block">
            <Label
              htmlFor="search"
              value="Open issues"
            />
          </div>
          <div className="space-y-4">
            <TextInput
              id="search"
              name="search"
              type="text"
              icon={HiSearch}
              onChange={(event) => handleSearch(event)}
            />
          </div>
          <div className="my-6 h-80 overflow-y-scroll">
            {issueIdsToPickFrom.map((issueId) => {
              const issue = openIssues?.get(issueId)!
              return (
                <div key={issueId} className="grid grid-cols-10 gap-4 py-2 items-center">
                  <div>
                    <p className="text-sm text-blue-500 hover:underline ml-1">
                      #{issue.number}
                    </p>
                  </div>
                  <div className="col-span-4">
                    <p className="line-clamp-1 text-sm font-medium text-gray-700 dark:text-gray-400">
                      {issue.title}
                    </p>
                  </div>
                  <div className="col-span-4">
                    <p className="text-sm text-blue-500 hover:underline">
                      <a href={issue.repoUrl} target="_blank" rel="noreferrer">{issue.repoName}</a>
                    </p>
                  </div>
                  <div>
                    <Button color="gray" onClick={() => handlePickIssue(issueId)}>
                      <HiPlus />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
          {errorText && (
            <p className="text-sm text-red-500 font-normal dark:text-gray-400">
              {errorText}
            </p>
          )}
          <div className="flex justify-end text-right">
            <Button
              type="submit"
              disabled={isProcessing || pickedIssueIds.length === 0}
              onClick={(() => handleSubmit())}
            >
              Add
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default AddIssuesPrompt;
