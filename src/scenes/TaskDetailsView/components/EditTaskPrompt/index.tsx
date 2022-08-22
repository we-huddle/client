import {Button, Label, Modal, Textarea, TextInput} from "flowbite-react";
import {DevTaskDetails, PartialTask, Task} from "../../../../types/Task";
import React, {useState} from "react";
import {useParams} from "react-router-dom";
import {TaskService} from "../../../../services/taskService";

interface EditTaskPromptProps {
  show: boolean,
  onClose: () => void,
  task: Task,
}

function EditTaskPrompt({ show, onClose, task}: EditTaskPromptProps) {
  const { id } = useParams();
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setIsProcessing(true);
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    let details = {
      noOfPulls: parseInt(data.get("noOfPulls")!.toString())
    };

    const partialTask: PartialTask = {
      title: data.get("title")!.toString(),
      description: data.get("description")!.toString(),
      details: details,
      type: task.type,
    }
    console.log(partialTask);
    await TaskService.updateTask(id!, partialTask);
    setIsProcessing(false);
    onClose();
  }

  return (
    <Modal show={show} onClose={onClose}>
      <Modal.Header>
        Edit Task
      </Modal.Header>
      <Modal.Body>
        <div className="space-y-4">
          <form className="flex flex-col gap-4" onSubmit={(event) => handleFormSubmit(event)}>
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
                defaultValue={task.title}
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
                defaultValue={task.description}
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
                  defaultValue={(task?.details as DevTaskDetails).noOfPulls}
                  required
                />
              </div>
            <div className="flex justify-end text-right">
              <Button type="submit" disabled={isProcessing}>
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
