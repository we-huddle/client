import {Button, Label, Modal, Spinner, Textarea, TextInput, FileInput} from "flowbite-react";
import React, {useState} from "react";
import {useParams} from "react-router-dom";
import {BadgeService} from "../../../../services/badgeService";
import {EditBadge} from "../../../../types/HuddlerBadge";

interface EditBadgePromptProps {
  show: boolean,
  onClose: () => void,
  badge: EditBadge
}

function EditBadgePrompt({show, onClose, badge} : EditBadgePromptProps){
  const { id } = useParams();
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [photo, setPhoto] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setIsProcessing(true);
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const badge: EditBadge = {
      title: data.get("title")!.toString(),
      description: data.get("description")!.toString(),
      photo: photo
    }
    await BadgeService.editBadge(id!, badge);
    setIsProcessing(false);
    onClose();
  }

  const handleFileUpload = async (event: React.FormEvent<HTMLInputElement>) => {
    setIsLoading(true);
    event.preventDefault();
    const formData = new FormData();
    const files = event.currentTarget.files;
    if (files != null) {
      formData.append("image", files[0]);
      const photoUrl = await BadgeService.uploadBadgeImage(formData);
      setPhoto(photoUrl);
    }
    setIsLoading(false);
  }

    return (
    <Modal show={show} onClose={onClose}>
      <Modal.Header>
        Edit Badge
      </Modal.Header>
      <Modal.Body>
        <div className="space-y-4">
          <form className="flex flex-col gap-4" onSubmit={(event) => handleFormSubmit(event)}>
            <div className="flex justify-center">
                {isLoading ? (
                  <Spinner />
                ) : (
                  photo !== '' && (
                    <img className="h-28 w-28" src={photo} alt="" />
                  )
                )}
              </div>
            <div className="flex flex-col gap-4">
                <div className="mb-2 block">
                  <Label
                    htmlFor="file"
                    value="Change badge image"
                  />
                </div>
                <FileInput
                  id="file"
                  accept="image/*"
                  onInput={(event) => handleFileUpload(event)}
                />
              </div>
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
                defaultValue={badge.title}
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
                defaultValue={badge.description}
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

export default EditBadgePrompt;