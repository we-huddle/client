import {LeaderboardRecord} from "../../../types/LeaderboardRecord";
import {Avatar, Badge} from "flowbite-react";
import {HiBadgeCheck} from "react-icons/hi";

interface LeaderboardRowProps {
  row: number,
  record: LeaderboardRecord,
}

function LeaderboardRow({ row, record }: LeaderboardRowProps) {
  return (
    <div className="flex justify-between items-center px-4 py-4 border-b-2 gap-20 border-gray-300 hover:bg-gray-50">
      <div className="flex gap-8 items-center">
        <p className="text-lg text-blue-500 hover:underline">#{row}</p>
        <Avatar img={record.user.avatar_url} size={row === 1? "lg": "md"} rounded />
        <div className="space-y-2">
          <h5 className={`${row === 1? 'text-xl' : 'text-sm'} font-medium text-gray-900 dark:text-white`}>
            {record.user.login}
          </h5>
          {row === 1 && (
            <Badge color="info" icon={HiBadgeCheck} className="px-1">Top ranked contributor</Badge>
          )}
        </div>
      </div>
      <div>
        <p className="text-sm text-gray-700 font-normal dark:text-gray-400">
          {record.points} Points
        </p>
      </div>
    </div>
  )
}

export default LeaderboardRow;
