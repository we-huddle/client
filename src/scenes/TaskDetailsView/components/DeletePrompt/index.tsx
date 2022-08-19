import {Modal} from "flowbite-react";
import {useNavigate} from 'react-router-dom';
import {useState} from "react";
import {TaskService} from "../../../../services/taskService";
import {Task} from "../../../../types/Task";

interface DeletePromptProps {
  show: boolean,
  onClose: () => void,
  task: Task
}

function DeletePrompt({ show, onClose, task }: DeletePromptProps) {
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [errorText, setErrorText] = useState<string | null>(null);

  const navigate = useNavigate();
  const redirectBack = () => {
    navigate('/agent/tasks');
  };

  const handleSubmit = async () => {
    setIsProcessing(true);
    try {
      await TaskService.deleteTask(task.id);
      onClose();
      redirectBack();
    } catch (e: any) {
      setErrorText(`Error: ${e.message}`);
    } finally {
      setIsProcessing(false);
    }
  }

  return (
    <Modal show={show} onClose={onClose} size="3xl">
        <Modal.Header>
            Delete Task
        </Modal.Header>
        <Modal.Body>
            <div className="space-y-4">
                <div className="p-6 text-center">
                    {errorText && (
                        <p className="text-sm text-red-500 font-normal dark:text-gray-400">
                            {errorText}
                        </p>
                    )}
                    <svg aria-hidden="true" className="mx-auto mb-4 w-14 h-14 text-gray-400 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z">
                        </path>
                    </svg>
                    <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to delete this product?</h3>
                    <button type="submit" disabled={isProcessing} onClick={(() => handleSubmit())}
                        data-modal-toggle="popup-modal" className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
                        Yes, I'm sure
                    </button>
                    <button type="submit" onClick={(() => onClose())} 
                        data-modal-toggle="popup-modal" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">
                        No, cancel
                    </button>
                </div>
            </div>
      </Modal.Body>
    </Modal>
  );
}

export default DeletePrompt;