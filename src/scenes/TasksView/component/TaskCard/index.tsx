import { Task } from "../../../../types/Task";
import { Badge, Card } from "flowbite-react";
import { HiCheck } from "react-icons/hi";

interface TaskCardProps {
  task: Task,
  completed?: boolean,
}

function TaskCard({task, completed}: TaskCardProps) {
  return (
    <div className="w-80 cursor-pointer">
      <Card>
        <h5 className="text-xl font-medium tracking-tight text-gray-900 dark:text-white">
          {task.title}
        </h5>
        <p className="text-sm font-normal text-gray-700 dark:text-gray-400">
          {task.description}
        </p>
        <div className="flex flex-wrap items-center gap-2">
          {
            {
              "DEV" : <Badge color="info">Dev</Badge>,
              "QUIZ" : <Badge color="info">Quiz</Badge>,
            }[task.type]
          }
          {completed && (
            <Badge color="success" icon={HiCheck}>
              <div className="px-1">
                Completed
              </div>
            </Badge>
          )}
        </div>
      </Card>
    </div>
  );
}

export default TaskCard;
