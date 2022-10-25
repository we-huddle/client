import {Modal, Table} from "flowbite-react";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {Profile} from "../../../../types/Profile";
import {UserServices} from "../../../../services/userServices";
import {PullRequest} from "../../../../types/PullRequest";
import {PRService} from "../../../../services/prService";


interface PRModalPromptProps {
  show: boolean,
  onClose: () => void,
}

function PRModalPrompt({show, onClose}: PRModalPromptProps) {
  const {id} = useParams();
  const [pullRequest, setPullRequest] = useState<PullRequest[]>([]);
  const [profile, setProfile] = useState<Profile>();
  const intlDateFormatter = Intl.DateTimeFormat('en', {
    hour: "numeric",
    minute: "numeric",
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  useEffect(() => {
    fetchPullRequests();
    fetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchProfile = async () => {
    setProfile(await UserServices.getProfileById(id!));
  };

  const fetchPullRequests = async () => {
    const prList = await PRService.getUserPR(id!);
    setPullRequest(prList);
  }

  return (
    <Modal show={show} onClose={onClose} size='5xl'>
      <Modal.Header>
        <h5 className="text-center"> @{profile?.githubUsername}'s pull requests</h5>
      </Modal.Header>
      <div className="overflow-y-auto h-[32rem]">
        <Modal.Body>
          <Table>
            <Table.Head>
              <Table.HeadCell>
                No
              </Table.HeadCell>
              <Table.HeadCell>
                Pull Request
              </Table.HeadCell>
              <Table.HeadCell>
                Repository Name
              </Table.HeadCell>
              <Table.HeadCell>
                Date
              </Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {pullRequest.map((pullRequest) => {
                return (
                  <Table.Row className="bg-white dark:border-blue-700 dark:bg-gray-800">
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                      <div
                        className="flex text-sm text-gray-500 gap-4 hover:underline hover:text-blue-700 hover:cursor-pointer">
                        <a href={`${pullRequest.url}`}>
                          #{pullRequest.number}
                        </a>
                      </div>
                    </Table.Cell>
                    <Table.Cell className="">
                      <div
                        className="flex text-sm text-gray-500 gap-4 hover:underline hover:text-blue-700 hover:cursor-pointer line-clamp-2">
                        <a href={`${pullRequest.url}`}>
                          {pullRequest.title}
                        </a>
                      </div>
                    </Table.Cell>
                    <Table.Cell className="">
                      <div
                        className="flex text-sm text-gray-500 gap-4 hover:underline hover:text-blue-700 hover:cursor-pointer">
                        <a href={`${pullRequest.repo_url}`}>
                          {pullRequest.repo_name}
                        </a>
                      </div>
                    </Table.Cell>
                    <Table.Cell>
                      <div className="">
                        {intlDateFormatter.format(new Date(pullRequest.openedAt * 1000))}
                      </div>
                    </Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table>
        </Modal.Body>
      </div>
    </Modal>

  );
}

export default PRModalPrompt;
