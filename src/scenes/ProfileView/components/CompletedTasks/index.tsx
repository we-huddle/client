import {useEffect, useState} from "react";
import {Task} from "../../../../types/Task";
import {TaskService} from "../../../../services/taskService";
import { Badge, Card, ListGroup } from "flowbite-react";
import { HiChevronRight, HiChip, HiPencil } from "react-icons/hi";
import { Link } from "react-router-dom";

interface CompletedTasksProps {
    completed: boolean,
}

function CompletedTasks({ }){
    const [task, setTask] = useState<Task[]>([]);
    const [completedTaskIdList, setCompletedTaskIdList] = useState<string[]>([]);

    useEffect(() => {
        fetchTasks();
        fetchCompletedTasks();
    }, []);

    const fetchTasks = async () => {
        const taskList = await TaskService.getTasks();
        setTask(taskList);
      }

    const fetchCompletedTasks = async () => {
        const completedTaskList = await TaskService.getCompletedTasks();
        setCompletedTaskIdList(
          completedTaskList.map((task) => task.id)
        );
    }

    return (

    <div>
        <div className="flex flex-wrap gap-4">

          {task.slice(0,2).map((task) => {
            return (
        
            <div className="cursor-pointer">
                <Link to={`/tasks/${task.id}`}>
                <Card>
                    <div className="w-52 h-10">
                        <h5 className="text-m line-clamp-1 font-medium tracking-tight text-gray-900 dark:text-white">
                        {task.title}
                        </h5>
                        <div className="flex justify-end items-center gap-2 mt-1 mb-1">
                            {
                            {
                                "DEV" : <Badge color="info" icon={HiChip}>Devloper Task</Badge>,
                                "QUIZ" : <Badge color="info" icon={HiPencil}>Quiz Task</Badge>,
                            }[task.type]
                            }
                        </div>
                    </div>
                </Card>
                </Link>
            </div>
            );
          }) } 

        </div>

        <div className="flex justify-end mt-5">
            <Link to={"/tasks"}>
            <button>
                <div className="flex text-m">
                    <p className="text-sm font-semibold">Show All</p>
                    <HiChevronRight className="ml-2 mt-0.5" />
                </div>
            </button>
            </Link>
        </div>

        <hr className="mt-2"/>

    </div>
      );

}

export default CompletedTasks;
