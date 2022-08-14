import { Button, Dropdown, Badge, Progress } from "flowbite-react";
import { HiCheck, HiXCircle, HiPlus } from "react-icons/hi";
import { useEffect, useState } from "react";
import { Task } from "../../types/Task";
import {TaskService} from "../../services/taskService";
import TaskCard from "./component/TaskCard";

function TasksView() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const taskList = await TaskService.getTasks();
    setTasks(taskList);
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
        <div>
          <Progress
            progress={45}
            color="green"
            label="Completed"
            labelPosition="outside"
            labelProgress={true}
          />
        </div>
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
                  <Dropdown.Item>
                    Completed
                  </Dropdown.Item>
                  <Dropdown.Item>
                    Incomplete
                  </Dropdown.Item>
                  <Dropdown.Item>
                    By latest
                  </Dropdown.Item>
                </Dropdown>
              </div>
            </Button>
            <Button>
              Add new task
              <HiPlus className="ml-2" />
            </Button>
          </div>
        </div>
        <div className="flex flex-wrap gap-4">
          {tasks.map((task) => {
            return <TaskCard key={task.id} task={task} />
          })}
        </div>
      </div>
    </div>
  )
}

export default TasksView;
