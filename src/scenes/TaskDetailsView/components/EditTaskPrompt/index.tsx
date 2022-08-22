import {Button, Label, Modal, Textarea, TextInput} from "flowbite-react";
import {DevTaskDetails, Task} from "../../../../types/Task";

interface EditTaskPromptProps {
  show: boolean,
  onClose: () => void,
  task: Task,
}

function EditTaskPrompt({ show, onClose, task}: EditTaskPromptProps) {
  
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
                value={task.title}
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
                value={task.description}
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
                  value={(task.details as DevTaskDetails).noOfPulls}
                  min={1}
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