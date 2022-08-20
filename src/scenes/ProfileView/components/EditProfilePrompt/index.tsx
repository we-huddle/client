import { Button, Label, Modal, Textarea, TextInput } from "flowbite-react";
import { useState } from "react";
import { Profile, PartialProfile } from "../../../../types/Profile";
import { UserServices } from "../../../../services/userServices";

interface EditProfilePromptProps {
  show: boolean;
  onClose: () => void;
  userProfile: Profile;
}

function EditProfilePrompt({
  show,
  onClose,
  userProfile,
}: EditProfilePromptProps) {
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setIsProcessing(true);
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const partialProfile: PartialProfile = {
      bio: data.get("bio")!!.toString(),
      city: data.get("city")!!.toString(),
      links: {
        github: data.get("github")!!.toString(),
        linkedin: data.get("linkedin")!!.toString(),
        stackoverflow: data.get("stackoverflow")!!.toString(),
        twitter: data.get("twitter")!!.toString(),
      },
    };
    await UserServices.editProfile(partialProfile);
    setIsProcessing(false);
    onClose();
  };

  return (
    <Modal show={show} onClose={onClose}>
      <Modal.Header>Edit Profile</Modal.Header>
      <Modal.Body>
        <div>
          <form
            className="flex flex-col gap-2"
            onSubmit={(event) => handleFormSubmit(event)}
          >
            <div className="space-y-1">
              <div className="mb-2 block">
                <Label htmlFor="bio" value="Bio" />
              </div>
              <Textarea id="bio" name="bio" defaultValue={userProfile?.bio} />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="city" value="City/Country" />
              </div>
              <TextInput
                id="city"
                name="city"
                defaultValue={userProfile?.city}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="github" value="Github" />
              </div>
              <TextInput
                id="github"
                name="github"
                type="url"
                placeholder="https://www.github.com/example"
                defaultValue={userProfile?.links.github}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="linkedin" value="LinkedIn" />
              </div>
              <TextInput
                id="linkedin"
                name="linkedin"
                type="url"
                placeholder="https://www.linkedin.com/in/example"
                defaultValue={userProfile?.links.linkedin}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="stackoverflow" value="Stackoverflow" />
              </div>
              <TextInput
                id="stackoverflow"
                name="stackoverflow"
                type="url"
                placeholder="https://stackoverflow.com/u/example"
                defaultValue={userProfile?.links.stackoverflow}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="twitter" value="Twitter" />
              </div>
              <TextInput
                id="twitter"
                name="twitter"
                type="url"
                placeholder="https://twitter.com/u/example"
                defaultValue={userProfile?.links.twitter}
              />
            </div>
            <div className="flex justify-end text-right">
              <Button type="submit" disabled={isProcessing}>
                Edit
              </Button>
            </div>
          </form>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default EditProfilePrompt;
