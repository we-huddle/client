import {Modal} from "flowbite-react";
import {Task} from "../../../../types/Task";
import {TaskService} from "../../../../services/taskService";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {Profile} from "../../../../types/Profile";
import {UserServices} from "../../../../services/userServices";
import CompletedTaskList from "./CompletedTasksList";

interface TaskModalPromptProps {
  show: boolean,
  onClose: () => void,
}

function TasksModalPrompt({show, onClose}: TaskModalPromptProps) {
  const {id} = useParams();
  const [task, setTask] = useState<Task[]>([]);
  const [profile, setProfile] = useState<Profile>();

  useEffect(() => {
    fetchTasks();
    fetchProfile();
  }, []);

  const fetchTasks = async () => {
    const taskList = await TaskService.getUserCompletedTasks(id!);
    setTask(taskList);
  }

  const fetchProfile = async () => {
    setProfile(await UserServices.getProfileById(id!));
  };

  return (
    <Modal show={show} onClose={onClose} size='5xl'>
      <Modal.Header>
        <h5 className="text-center"> @{profile?.githubUsername}'s completed tasks </h5>
      </Modal.Header>
      <div className="overflow-y-auto h-[32rem]">
        <Modal.Body>
          <div className="">
            {task.map((task) => {
              return (
                <div>
                  <CompletedTaskList
                    key={task.id}
                    task={task}/>
                </div>
              );
            })}
          </div>
        </Modal.Body>
      </div>
    </Modal>

  );
}

export default TasksModalPrompt;
