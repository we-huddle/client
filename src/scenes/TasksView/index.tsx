import {Badge, Button, Dropdown, Progress} from "flowbite-react";
import {HiCheck, HiPlus, HiXCircle} from "react-icons/hi";
import {useContext, useEffect, useState} from "react";
import {Task} from "../../types/Task";
import {TaskService} from "../../services/taskService";
import TaskCard from "./components/TaskCard";
import userContext from "../../types/UserContext";
import {Profile} from "../../types/Profile";
import CreateNewTaskPrompt from "./components/CreateNewTaskPrompt";

interface TaskViewProps {
  isAgentView: boolean,
}

enum SortingOption {
  DEFAULT = "DEFAULT",
  DEV_TASK = "BY_DEV_TASK",
  QUIZ_TASK = "BY_QUIZ_TASK",
  COMPLETED = "BY_COMPLETED",
  INCOMPLETE = "BY_INCOMPLETE",
  LATEST = "BY_LATEST",
}

function TasksView({ isAgentView }: TaskViewProps) {
  const profile = useContext(userContext);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [completedTaskIdList, setCompletedTaskIdList] = useState<string[]>([]);
  const [selectedSortingOption, setSelectedSortingOption] = useState<SortingOption>(SortingOption.DEFAULT);
  const [isCreateModalVisible, setIsCreateModalVisible] = useState<boolean>(false);

  useEffect(() => {
    fetchTasks();
    if (!isAgentView) {
      fetchCompletedTasks()
    }
  }, [isAgentView]);

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

  const sortByDevTask = () => {
    const map = new Map<Task.Type, number>();
    map.set(Task.Type.DEV, 2);
    map.set(Task.Type.QUIZ, 1);
    const sortedTaskList = tasks.sort(
      (a, b) => {
        // @ts-ignore
        if (map.get(a.type) < map.get(b.type)) {
          return 1
        }
        // @ts-ignore
        if (map.get(a.type) > map.get(b.type)) {
          return -1;
        }
        return 0
      }
    );
    setTasks(sortedTaskList);
    setSelectedSortingOption(SortingOption.DEV_TASK);
  }

  const sortByQuizTask = () => {
    const map = new Map<Task.Type, number>();
    map.set(Task.Type.DEV, 2);
    map.set(Task.Type.QUIZ, 1);
    const sortedTaskList = tasks.sort(
      (a, b) => {
        // @ts-ignore
        if (map.get(a.type) < map.get(b.type)) {
          return -1
        }
        // @ts-ignore
        if (map.get(a.type) > map.get(b.type)) {
          return 1;
        }
        return 0
      }
    );
    setTasks(sortedTaskList);
    setSelectedSortingOption(SortingOption.QUIZ_TASK);
  }

  const sortByLatest = () => {
    const sortedTaskList = tasks.sort(
      (a, b) => b.createdAt - a.createdAt
    );
    setTasks(sortedTaskList);
    setSelectedSortingOption(SortingOption.LATEST)
  }

  const sortByCompleted = () => {
    const sortedTaskList = tasks.sort(
      (a, b) => {
        const aInCompleted = completedTaskIdList.includes(a.id);
        const bInCompleted = completedTaskIdList.includes(b.id);
        if (aInCompleted === bInCompleted) return 0;
        if (aInCompleted) return -1;
        if (bInCompleted) return 1;
        return 0;
      }
    );
    setTasks(sortedTaskList);
    setSelectedSortingOption(SortingOption.COMPLETED);
  }

  const sortByIncomplete = () => {
    const sortedTaskList = tasks.sort(
      (a, b) => {
        const aInCompleted = completedTaskIdList.includes(a.id);
        const bInCompleted = completedTaskIdList.includes(b.id);
        if (aInCompleted === bInCompleted) return 0;
        if (aInCompleted) return 1;
        if (bInCompleted) return -1;
        return 0;
      }
    );
    setTasks(sortedTaskList);
    setSelectedSortingOption(SortingOption.INCOMPLETE);
  }

  const sortByDefault = () => {
    fetchTasks();
    setSelectedSortingOption(SortingOption.DEFAULT);
  }

  const onCreateModalClose = () => {
    setIsCreateModalVisible(false)
    fetchTasks();
  }

  return (
    <div className="px-8 space-y-8">
      <CreateNewTaskPrompt show={isCreateModalVisible} onClose={onCreateModalClose} />
      <div className="space-y-2">
        <h1 className="text-3xl font-medium text-gray-900">Tasks</h1>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          The list of tasks to be completed to achieve badges.
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
                {
                  {
                    "DEFAULT" : 'Default',
                    "BY_DEV_TASK" : 'Dev task',
                    "BY_QUIZ_TASK" : 'Quiz task',
                    "BY_COMPLETED" : 'Completed',
                    "BY_INCOMPLETE" : 'Incomplete',
                    "BY_LATEST" : 'Latest',
                  }[selectedSortingOption]
                }
              </div>
            </Badge>
            {selectedSortingOption !== SortingOption.DEFAULT && (
              <Button
                color="gray"
                size="xs"
                onClick={sortByDefault}
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
                  label="Sort"
                  inline={true}
                >
                  <Dropdown.Item onClick={sortByDevTask}>
                    Dev tasks
                  </Dropdown.Item>
                  <Dropdown.Item onClick={sortByQuizTask}>
                    Quiz tasks
                  </Dropdown.Item>
                  {!isAgentView && (
                    <>
                      <Dropdown.Item onClick={sortByCompleted}>
                        Completed
                      </Dropdown.Item>
                      <Dropdown.Item onClick={sortByIncomplete}>
                        Incomplete
                      </Dropdown.Item>
                    </>
                  )}
                  <Dropdown.Item onClick={sortByLatest}>
                    By latest
                  </Dropdown.Item>
                </Dropdown>
              </div>
            </Button>
            {isAgentView && profile?.role === Profile.Role.HuddleAgent && (
              <Button onClick={() => setIsCreateModalVisible(true)}>
                Add new task
                <HiPlus className="ml-2" />
              </Button>
            )}
          </div>
        </div>
        {tasks.length === 0 && (
          <div className="flex justify-center">
            <h5 className="text-sm tracking-tight text-gray-900 dark:text-white">
              No tasks found
            </h5>
          </div>
        )}
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
