import {Modal} from "flowbite-react";
import {Task} from "../../../../types/Task";

interface ViewSingleTaskPromptProps {
    show: boolean,
    task: Task,
    onClose: () => void,
    // completed?: boolean,
}
function ViewSingleTaskPrompt({show, task, onClose}: ViewSingleTaskPromptProps) {
    return (
        <Modal show={show} onClose={onClose}>
            <Modal.Header>
                {task.title}
            </Modal.Header>
        </Modal>
    );

}
export default ViewSingleTaskPrompt;
