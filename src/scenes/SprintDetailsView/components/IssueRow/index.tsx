import {Avatar} from "flowbite-react/lib/esm/components";
import {Issue, IssueState} from "../../../../types/Issue";

interface IssueRowProps {
  issue: Issue,
}

function IssueRow({ issue }: IssueRowProps) {
  const intlDateFormatter = Intl.DateTimeFormat('en', { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' });

  return (
    <div className="flex justify-between items-center px-4 py-4 border-b-2 gap-20 border-gray-300 hover:bg-gray-50 cursor-pointer">
      <div className="flex gap-8 items-center">
        <div className={`text-center ${issue.state === IssueState.open? 'text-blue-500': 'text-purple-900'}`}>
          <a href={issue.url} target="_blank" rel="noreferrer">
            <p className="text-lg hover:underline">#{issue.number}</p>
          </a>
          <p className="mt-1 text-sm">
            {
              {
                "open": "Open",
                "closed": "Closed",
              }[issue.state]
            }
          </p>
        </div>
        <div className="space-y-2">
          <h5 className="text-xl font-medium text-gray-900 dark:text-white">
            {issue.title}
          </h5>
          <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
            Opened on {intlDateFormatter.format(new Date(issue.openedAt * 1000))} by {issue.githubUser.login}
          </p>
          <p className="text-sm text-blue-500 hover:underline">
            <a href={issue.repoUrl} target="_blank" rel="noreferrer">{issue.repoName}</a>
          </p>
        </div>
      </div>
      <div>
        {issue.assignees.length === 0 ? (
          <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
            No assignees
          </p>
        ) : (
          <Avatar.Group>
            {issue.assignees.map((user) => {
              return <Avatar
                key={user.id}
                img={user.avatar_url}
                size="sm"
                rounded={true}
                stacked={true}
              />
            })}
          </Avatar.Group>
        )}
      </div>
    </div>
  )
}

export default IssueRow;
