import {Button, Label, Modal, Textarea, TextInput} from "flowbite-react";
import React, {useState} from "react";
import {useParams} from "react-router-dom";
import {SprintsAndIssuesService} from "../../../../services/sprintsAndIssuesService";
import {PartialSprint, Sprint} from "../../../../types/Sprint";

interface EditSprintPromptProps {
  show: boolean,
  onClose: () => void,
  sprint: Sprint
}

function EditSprintPrompt({ show, onClose, sprint}: EditSprintPromptProps) {
  const { id } = useParams();
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setIsProcessing(true);
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const partialSprint: PartialSprint = {
      title: data.get("title")!.toString(),
      description: data.get("description")!.toString(),
      deadline: new Date(data.get("deadline")!.toString()).getTime()/1000,
    }
    await SprintsAndIssuesService.editSprint(id!, partialSprint);
    setIsProcessing(false);
    onClose();
  }
  return (
    <Modal show={show} onClose={onClose}>
      <Modal.Header>
        Edit Sprint
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
                defaultValue={sprint.title}
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
                defaultValue={sprint.description}
                required
              />
            </div>
              <div className="space-y-4">
                <div className="mb-2 block">
                  <Label
                    htmlFor="deadline"
                    value="Deadline"
                  />
                </div>
                <TextInput
                  id="deadline"
                  name="deadline"
                  type="date"
                  // defaultValue="2022-08-05"
                  defaultValue={sprint.deadline}
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

export default EditSprintPrompt;
