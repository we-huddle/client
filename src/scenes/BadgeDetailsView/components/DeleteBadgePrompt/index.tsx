import {Button, Modal} from "flowbite-react";
import {useNavigate} from 'react-router-dom';
import {HiOutlineExclamationCircle} from "react-icons/hi";
import {useState} from "react";
import {BadgeWithDependencies} from "../../../../types/HuddlerBadge";
import {BadgeService} from "../../../../services/badgeService";

interface DeleteBadgePromptProps {
  show: boolean,
  onClose: () => void,
  badge : BadgeWithDependencies
}

function DeleteBadgePrompt({ show, onClose, badge }: DeleteBadgePromptProps) {
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [errorText, setErrorText] = useState<string | null>(null);

  const navigate = useNavigate();
  const redirectBack = () => {
    navigate('/agent/badges');
  };

  const handleSubmit = async () => {
    setIsProcessing(true);
    try {
      await BadgeService.deleteBadge(badge.id);
      onClose();
      redirectBack();
    } catch (e: any) {
      setErrorText(`Error: ${e.message}`);
    } finally {
      setIsProcessing(false);
    }
  }

  return (
    <Modal show={show} onClose={onClose} size="lg">
        <Modal.Header>
            Delete Badge
        </Modal.Header>
        <Modal.Body>
            <div className="space-y-4">
                <div className="p-6 text-center">
                    {errorText && (
                        <p className="text-sm text-red-500 font-normal dark:text-gray-400">
                            {errorText}
                        </p>
                    )}
                    <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                    <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to delete {badge.title} badge?</h3>
                    <div className="flex justify-center gap-4">
                      <Button color="failure" type="submit" disabled={isProcessing} onClick={(() => handleSubmit())}>
                        Yes, I'm sure
                      </Button>
                      <Button color="gray" type="submit" onClick={(() => onClose())}>
                        No, cancel
                      </Button>
                    </div>
                </div>
            </div>
      </Modal.Body>
    </Modal>
  );
}

export default DeleteBadgePrompt;
