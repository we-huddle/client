import {Button, FileInput, Label, Modal, Textarea, TextInput} from "flowbite-react";

interface CreateNewBadgePromptProps {
  show: boolean,
  onClose: () => void,
}

function CreateNewBadgePrompt({ show, onClose }: CreateNewBadgePromptProps) {
  return (
    <Modal show={show} onClose={onClose} size={'3xl'}>
      <Modal.Header>
        Create new badge
      </Modal.Header>
      <Modal.Body>
        <div className="grid grid-cols-7 gap-6">
          <div className="col-span-2">
            <div className="flex flex-col gap-4">
              <div className="mb-2 block">
                <Label
                  htmlFor="file"
                  value="Badge image"
                />
              </div>
              <img className="h-24 w-24" src="https://sefglobal.org/developers/images/1.png" alt="" />
              <FileInput
                id="file"
                onInput={() => console.log("triggered")}
              />
            </div>
          </div>
          <div className="col-span-5">
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
              <div className="flex justify-end text-right">
                <Button type="submit">Next</Button>
              </div>
            </form>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default CreateNewBadgePrompt;
