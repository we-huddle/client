import {Button, Dropdown, Label, Modal, Textarea, TextInput} from "flowbite-react";
import {useState} from "react";
import {PartialTask, Task} from "../../../../types/Task";
import {TaskService} from "../../../../services/taskService";

interface CreateNewTaskPromptProps {
  show: boolean,
  onClose: () => void,
}

function CreateNewTaskPrompt({ show, onClose }: CreateNewTaskPromptProps) {
  const [selectedTaskType, setSelectedTaskType] = useState<Task.Type>(Task.Type.DEV);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setIsProcessing(true);
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const partialTask: PartialTask = {
      title: data.get("title")!.toString(),
      description: data.get("description")!!.toString(),
      details: JSON.stringify({
        noOfPulls: parseInt(data.get("noOfPulls")!!.toString()),
      }),
      type: selectedTaskType,
    }
    await TaskService.createTask(partialTask);
    setIsProcessing(false);
    onClose();
  }

  return (
    <Modal show={show} onClose={onClose}>
      <Modal.Header>
        Create new task
      </Modal.Header>
      <Modal.Body>
        <div className="space-y-4">
          <div className="flex flex-col gap-4">
            <div className="mr-3">
              <Label
                htmlFor="Type"
                value="Type"
              />
            </div>
            <Button color="gray">
              <div className="text-left z-50">
                <Dropdown
                  label={
                    {
                      "DEV": 'Developer task',
                      "QUIZ": 'Quiz task',
                    }[selectedTaskType]
                  }
                  inline={true}
                >
                  <Dropdown.Item onClick={() => setSelectedTaskType(Task.Type.DEV)}>
                    Developer task
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => setSelectedTaskType(Task.Type.QUIZ)}>
                    Quiz task
                  </Dropdown.Item>
                </Dropdown>
              </div>
            </Button>
          </div>
          <form className="flex flex-col gap-4" onSubmit={(event => handleFormSubmit(event))}>
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
                required
              />
            </div>
            {selectedTaskType === Task.Type.DEV && (
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
                  required
                />
              </div>
            )}
            <div className="flex justify-end text-right">
              <Button type="submit" disabled={selectedTaskType === Task.Type.QUIZ || isProcessing}>
                Create
              </Button>
            </div>
          </form>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default CreateNewTaskPrompt;
