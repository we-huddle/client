import {Button, Label, Modal, Textarea, TextInput} from "flowbite-react";
import {useState} from "react";
import {PartialSprint} from "../../../../types/Sprint";
import {SprintsAndIssuesService} from "../../../../services/sprintsAndIssuesService";

interface CreateNewSprintPromptProps {
  show: boolean,
  onClose: () => void,
}

function CreateNewSprintPrompt({ show, onClose }: CreateNewSprintPromptProps) {
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [errorText, setErrorText] = useState<string | null>(null);

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setIsProcessing(true);
    try {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      const partialSprint: PartialSprint = {
        title: data.get("title")!.toString(),
        description: data.get("description")!.toString(),
        deadline: new Date(data.get("deadline")!.toString()).getTime()/1000,
      }
      await SprintsAndIssuesService.createSprint(partialSprint);
      onClose();
    } catch (e: any) {
      setErrorText(`Error: ${e.message}`);
    } finally {
      setIsProcessing(false);
    }
  }

  return (
    <Modal show={show} onClose={onClose}>
      <Modal.Header>
        Create new sprint
      </Modal.Header>
      <Modal.Body>
        <div className="space-y-4">
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
                  htmlFor="deadline"
                  value="Deadline"
                />
              </div>
              <TextInput
                id="deadline"
                name="deadline"
                type="date"
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
            {errorText && (
              <p className="text-sm text-red-500 font-normal dark:text-gray-400">
                {errorText}
              </p>
            )}
            <div className="flex justify-end text-right">
              <Button type="submit" disabled={isProcessing}>
                Create
              </Button>
            </div>
          </form>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default CreateNewSprintPrompt;
