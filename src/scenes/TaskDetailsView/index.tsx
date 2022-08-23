import {Profile} from "../../types/Profile";
import {useContext, useEffect, useState} from "react";
import userContext from "../../types/UserContext";
import {Badge, Button, Dropdown} from "flowbite-react";
import {HiCheck, HiChip, HiOutlineArrowLeft, HiPencil} from "react-icons/hi";
import {Answer, AnswerStatus, DevTaskDetails, QuizTaskDetails, Task} from "../../types/Task";
import {TaskService} from "../../services/taskService";
import {useNavigate, useParams} from "react-router-dom";
import DeletePrompt from "./components/DeletePrompt";
import EditTaskPrompt from "./components/EditTaskPrompt";
import AnswerQuizPrompt from "./components/AnswerQuizPrompt";

interface TaskDetailsViewProps {
    isAgentView: boolean,
}

function TaskDetailsView({ isAgentView }: TaskDetailsViewProps){
  const profile = useContext(userContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [task ,setTask] = useState<Task | null>(null);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [isCreateModalVisible, setIsCreateModalVisible] = useState<boolean>(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState<boolean>(false);
  const [isAnswerModalVisible, setIsAnswerModalVisible] = useState<boolean>(false);
  const intlDateFormatter = Intl.DateTimeFormat('en', { hour: "numeric", minute: "numeric", weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' });

  useEffect(() => {
    fetchTask();
    fetchAnswers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onEditModalClose = () => {
    setIsEditModalVisible(false)
  }

  const fetchTask = async () => {
    setTask(await TaskService.getTaskById(id!, isAgentView));
  }

  const fetchAnswers = async () => {
    const answerList = await TaskService.getAnswers(id!);
    setAnswers(answerList);
    setIsCompleted(
      answerList.filter((answer) => answer.status === AnswerStatus.COMPLETED).length !== 0
    );
  }

  const onPromptClose = () => {
    setIsCreateModalVisible(false);
  }

  const onAnswerQuizPromptClose = () => {
    setIsAnswerModalVisible(false);
    fetchAnswers();
  }

  return(
    <div>
      {task == null? "loading" : (
        <div className="px-8 space-y-8">
          <DeletePrompt show={isCreateModalVisible} onClose={onPromptClose} task={task}/>
          <EditTaskPrompt show={isEditModalVisible} onClose={onEditModalClose} task={task}/>
          <div className="flex justify-between items-center">
            <Button
              color="gray"
              size="md"
              onClick={() => navigate(-1)}
              pill
            >
              <HiOutlineArrowLeft />
            </Button>
            {isAgentView && profile?.role === Profile.Role.HuddleAgent && (
              <Button color="gray">
                <div className="text-left">
                  <Dropdown
                    label=""
                    inline={true}
                  >
                    <Dropdown.Item onClick={() => setIsEditModalVisible(true)}>
                      Edit task
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => setIsCreateModalVisible(true)}>
                      Delete task
                    </Dropdown.Item>
                  </Dropdown>
                </div>
              </Button>
            )}
          </div>
          <div className="flex justify-between items-start">
            <div className="space-y-4">
              <h1 className="text-3xl font-medium text-gray-900">{task.title}</h1>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                {task.description}
              </p>
              <div className="flex flex-wrap items-center gap-2">
                {task?.type === "DEV"
                  ? (
                    <Badge color="info" icon={HiChip}>
                      <div className="px-1">
                        Developer Task
                      </div>
                    </Badge>
                  ) : (
                    <Badge color="info" icon={HiPencil}>
                      <div className="px-1">
                        Quiz Task
                      </div>
                    </Badge>
                  )
                }
                {!isAgentView && isCompleted && (
                  <Badge color="success" icon={HiCheck}>
                    <div className="px-1">
                      Completed
                    </div>
                  </Badge>
                )}
              </div>
            </div>
            {task.type === Task.Type.DEV ? (
              <div className="text-center p-5 bg-gray-50 rounded-xl">
                <p className="text-7xl font-bold">{(task?.details as DevTaskDetails).noOfPulls}</p>
                <p className="text-sm">Pull requests to complete</p>
              </div>
            ) : (
              <div className="text-center p-5 bg-gray-50 rounded-xl">
                <p className="text-7xl font-bold">{(task?.details as QuizTaskDetails).passMark}</p>
                <p className="text-sm">Score to complete</p>
              </div>
            )}
          </div>
          {!isAgentView && (
            <div>
              {task.type === Task.Type.QUIZ && (
                <AnswerQuizPrompt show={isAnswerModalVisible} onClose={onAnswerQuizPromptClose} task={task} />
              )}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h1 className="text-xl font-medium text-gray-900">Submissions</h1>
                  {task.type === Task.Type.QUIZ && !isCompleted && (
                    <Button onClick={() => setIsAnswerModalVisible(true)}>Attempt quiz</Button>
                  )}
                </div>
                {answers.length === 0 && (
                  <div className="flex justify-center">
                    <h5 className="text-sm tracking-tight text-gray-900 dark:text-white">
                      No answers found
                    </h5>
                  </div>
                )}
                {answers.map((answer, index) => {
                  return (
                    <div key={answer.id} className="flex justify-between items-center px-4 py-4 border-b-2 gap-20 border-gray-300 hover:bg-gray-50 cursor-pointer">
                      <div className="flex gap-12 items-center">
                        <p className="text-lg text-blue-500 hover:underline">#{index + 1}</p>
                        <p className="text-sm font-normal text-gray-900 dark:text-gray-400">
                          Submitted on {intlDateFormatter.format(new Date(answer.createdAt * 1000))}
                        </p>
                      </div>
                      <div>
                        {answer.status === AnswerStatus.COMPLETED ? (
                          <p className="text-sm text-green-500 font-normal dark:text-gray-400">
                            Completed
                          </p>
                        ) : (
                          <p className="text-sm font-normal text-red-500 dark:text-gray-400">
                            Failed
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          {isAgentView && profile?.role === Profile.Role.HuddleAgent && task.type === Task.Type.QUIZ && (
            <div className="space-y-2">
              {(task.details as QuizTaskDetails).questions.map((question) => {
                return (
                  <div key={question.number} className="space-y-4 p-5 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-900">{question.number}. {question.question}</p>
                    <div className="space-y-1 ml-4">
                      <p className="text-sm text-gray-900">a. {question.options.a}</p>
                      <p className="text-sm text-gray-900">b. {question.options.b}</p>
                      <p className="text-sm text-gray-900">c. {question.options.c}</p>
                      <p className="text-sm text-gray-900">d. {question.options.d}</p>
                    </div>
                    <p className="text-sm text-green-500">Correct answer: {question.correctAnswerKey}</p>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default TaskDetailsView
