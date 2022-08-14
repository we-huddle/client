import { Button, Dropdown, Badge, Progress } from "flowbite-react";
import { HiCheck, HiXCircle, HiPlus } from "react-icons/hi";
import { useContext, useEffect, useState } from "react";
import { Task } from "../../types/Task";
import { TaskService } from "../../services/taskService";
import TaskCard from "./component/TaskCard";
import userContext from "../../types/UserContext";
import { Profile } from "../../types/Profile";

interface TaskViewProps {
  isAgentView: boolean,
}

function TasksView({ isAgentView }: TaskViewProps) {
  const profile = useContext(userContext);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [completedTaskIdList, setCompletedTaskIdList] = useState<string[]>([]);

  useEffect(() => {
    fetchTasks();
    if (!isAgentView) {
      fetchCompletedTasks()
    }
  }, []);

  const fetchTasks = async () => {
    const taskList = await TaskService.getTasks();
    setTasks(taskList);
  }

  const fetchCompletedTasks = async () => {
    const completedTaskList = await TaskService.getCompletedTasks();
    setCompletedTaskIdList(
      completedTaskList.map((task) => task.id)
    );
  }

  return (
    <div className="px-8 space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-medium text-gray-900">Tasks</h1>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          Lorem ipsum dolor sit amet
        </p>
      </div>
      <div className="space-y-8">
        {!isAgentView && (
          <div>
            <Progress
              progress={Math.round((completedTaskIdList.length/tasks.length)*100)}
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
                Completed
              </div>
            </Badge>
            <Badge color="info" icon={HiCheck}>
              <div className="px-1">
                Incomplete
              </div>
            </Badge>
            <Badge color="info" icon={HiCheck}>
              <div className="px-1">
                By date
              </div>
            </Badge>
            <Button
              color="gray"
              size="xs"
              pill
            >
              Clear
              <HiXCircle className="ml-2" />
            </Button>
          </div>
          <div className="flex justify-end items-center gap-2">
            <Button color="gray">
              <div className="text-left">
                <Dropdown
                  label="Sort"
                  inline={true}
                >
                  <Dropdown.Item>
                    Dev tasks
                  </Dropdown.Item>
                  <Dropdown.Item>
                    Quiz tasks
                  </Dropdown.Item>
                  {!isAgentView && (
                    <>
                      <Dropdown.Item>
                        Completed
                      </Dropdown.Item>
                      <Dropdown.Item>
                        Incomplete
                      </Dropdown.Item>
                    </>
                  )}
                  <Dropdown.Item>
                    By latest
                  </Dropdown.Item>
                </Dropdown>
              </div>
            </Button>
            {isAgentView && profile?.role === Profile.Role.HuddleAgent && (
              <Button>
                Add new task
                <HiPlus className="ml-2" />
              </Button>
            )}
          </div>
        </div>
        <div className="flex flex-wrap gap-4">
          {tasks.map((task) => {
            return (
              <TaskCard
                key={task.id}
                task={task}
                completed={!isAgentView && completedTaskIdList.includes(task.id)}
              />
            );
          })}
        </div>
      </div>
    </div>
  )
}

export default TasksView;
