import {Button, Modal} from "flowbite-react";
import {useState} from "react";
import {QuizTaskDetails, Task} from "../../../../types/Task";
import {TaskService} from "../../../../services/taskService";

interface AnswerQuizPromptProps {
  show: boolean,
  onClose: () => void,
  task: Task
}

function AnswerQuizPrompt({ show, onClose, task }: AnswerQuizPromptProps) {
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [errorText, setErrorText] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsProcessing(true);
    const answers = Object.fromEntries(new FormData(event.currentTarget));
    try {
      await TaskService.submitQuizAnswers(task.id, {taskId: task.id, answers: answers});
      onClose();
    } catch (e: any) {
      setErrorText(`Error: ${e.message}`);
    } finally {
      setIsProcessing(false);
    }
  }

  return (
    <Modal show={show} onClose={onClose} size="3xl">
      <Modal.Header>
        {task.title}
      </Modal.Header>
      <Modal.Body>
        <form className="space-y-4" onSubmit={(event) => handleSubmit(event)}>
          <div className="space-y-4 h-96 overflow-y-scroll">
            {(task.details as QuizTaskDetails).questions.map((question) => {
              return (
                <div key={question.number} className="space-y-4 p-5 bg-gray-50 rounded-lg">
                  <p className="">{question.number}. {question.question}</p>
                  <div className="space-x-4">
                    <input type="radio" required name={question.number.toString()} value="a" /> {question.options.a}
                  </div>
                  <div className="space-x-4">
                    <input type="radio" required name={question.number.toString()} value="b" /> {question.options.b}
                  </div>
                  <div className="space-x-4">
                    <input type="radio" required name={question.number.toString()} value="c" /> {question.options.c}
                  </div>
                  <div className="space-x-4">
                    <input type="radio" required name={question.number.toString()} value="d" /> {question.options.d}
                  </div>
                </div>
              );
            })}
          </div>
          {errorText && (
            <p className="text-sm text-red-500 font-normal dark:text-gray-400">
              {errorText}
            </p>
          )}
          <div className="flex justify-end">
            <Button type="submit" disabled={isProcessing}>Submit</Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}

export default AnswerQuizPrompt;
