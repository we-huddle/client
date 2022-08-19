import {Button, Label, Modal, Textarea, TextInput} from "flowbite-react";
import {Task} from "../../../../types/Task";
import {TaskService} from "../../../../services/taskService";
import {useParams} from "react-router-dom";
import { useEffect, useState } from "react";

interface EditTaskPromptProps {
  show: boolean,
  onClose: () => void,
}

function EditTaskPrompt({ show, onClose }: EditTaskPromptProps) {
  const { id } = useParams();
  const [task ,setTask] = useState<Task | null>(null);

  useEffect(() => {
    fetchTask();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchTask = async () => {
    setTask(await TaskService.getTaskById(id!));
  }
  
  return (
    <Modal show={show} onClose={onClose}>
      <Modal.Header>
        Edit Task
      </Modal.Header>
      <Modal.Body>
        <div className="space-y-4">
          <form className="flex flex-col gap-4">
            <div className="space-y-4">
              <div className="mb-2 block">
                <Label
                  htmlFor="title"
                  value="Title"
                />
              </div>
              <TextInput
                id="title"
                name="title"
                type="text"
                value={task?.title}
                required
              />
            </div>
            <div className="space-y-4">
              <div className="mb-2 block">
                <Label
                  htmlFor="description"
                  value="Description"
                />
              </div>
              <Textarea
                id="description"
                name="description"
                value={task?.description}
                required
              />
            </div>
              <div className="space-y-4">
                <div className="mb-2 block">
                  <Label
                    htmlFor="noOfPulls"
                    value="Number of pull requests to complete"
                  />
                </div>
                <TextInput
                  id="noOfPulls"
                  name="noOfPulls"
                  type="number"
                  min={1}
                  value={task?.details.noOfPulls}
                  required
                />
              </div>
            <div className="flex justify-end text-right">
              <Button type="submit">
                Save Changes
              </Button>
            </div>
          </form>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default EditTaskPrompt;
