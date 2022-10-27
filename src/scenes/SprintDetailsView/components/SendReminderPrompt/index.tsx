import {Button, Modal} from "flowbite-react";
import {useNavigate} from 'react-router-dom';
import {HiOutlineExclamationCircle} from "react-icons/hi";
import {useState} from "react";
import {Sprint} from "../../../../types/Sprint";
import {SprintsAndIssuesService} from "../../../../services/sprintsAndIssuesService";

interface SendReminderPromptProps {
  show: boolean,
  onClose: () => void,
  sprint : Sprint
}

function SendReminder({ show, onClose, sprint }: SendReminderPromptProps) {
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const navigate = useNavigate();
  const redirectBack = () => {
    navigate(`/agent/sprints/${sprint.id}`);
  };

  const handleSubmit = async () => {
    setIsProcessing(true);
    await SprintsAndIssuesService.sendRemind(sprint.id, sprint);
    redirectBack();
    setIsProcessing(false);
  }

  return (
    <Modal show={show} onClose={onClose} size="lg">
        <Modal.Header>
            Send reminder
        </Modal.Header>
        <Modal.Body>
            <div className="space-y-4">
                <div className="p-6 text-center">
                    <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                    <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Send reminders to those assign members in {sprint.title} sprint</h3>
                    <div className="flex justify-center gap-4">
                      <Button color="failure" type="submit" disabled={isProcessing} onClick={(() => {handleSubmit(); onClose()})}>
                        Confirm
                      </Button>
                      <Button color="gray" type="submit" onClick={(() => onClose())}>
                        Cancel
                      </Button>
                    </div>
                </div>
            </div>
      </Modal.Body>
    </Modal>
  );
}

export default SendReminder;
