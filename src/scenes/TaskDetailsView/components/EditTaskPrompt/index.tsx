import {Button, Label, Modal, Textarea, TextInput} from "flowbite-react";

interface EditTaskPromptProps {
  show: boolean,
  onClose: () => void,
}

function EditTaskPrompt({ show, onClose }: EditTaskPromptProps) {
  
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