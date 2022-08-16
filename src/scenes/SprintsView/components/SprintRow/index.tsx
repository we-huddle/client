import {Sprint} from "../../../../types/Sprint";

interface SprintRowProps {
  sprint: Sprint,
}

function SprintRow({ sprint }: SprintRowProps) {
  const intlDateFormatter = Intl.DateTimeFormat('en', { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' });

  return (
    <div className="flex justify-between items-center px-4 py-4 border-b-2 gap-20 border-gray-300 hover:bg-gray-50 cursor-pointer">
      <div className="flex gap-8 items-center">
        <p className="text-lg text-blue-500 hover:underline">#{sprint.number}</p>
        <div>
          <h5 className="text-xl font-medium tracking-tight text-gray-900 dark:text-white">
            {sprint.title}
          </h5>
          <p className="text-sm line-clamp-1 md:w-80 font-normal text-gray-700 dark:text-gray-400">
            {sprint.description}
          </p>
          <p className="mt-2 text-sm font-normal text-gray-500 dark:text-gray-400">
            Opened on {intlDateFormatter.format(new Date(sprint.createdAt * 1000))}
          </p>
        </div>
      </div>
      <div>
        {new Date() > new Date(sprint.deadline * 1000) ? (
          <p className="text-sm text-red-500 font-normal text-gray-500 dark:text-gray-400">
            Ended on {intlDateFormatter.format(new Date(sprint.deadline * 1000))}
          </p>
        ) : (
          <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
            Ends on {intlDateFormatter.format(new Date(sprint.deadline * 1000))}
          </p>
        )}
      </div>
    </div>
  )
}

export default SprintRow;
