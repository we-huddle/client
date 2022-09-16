import {Task} from "../../../../types/Task";
import { Badge, Card } from "flowbite-react";
import { HiChip, HiPencil } from "react-icons/hi";
import { Link } from "react-router-dom";
import {Answer, AnswerStatus,} from "../../../../types/Task"
import { useEffect, useState } from "react";
import { TaskService } from "../../../../services/taskService";

interface CompletedTaskProps {
    task: Task,
  }

function CompletedTaskCard({task}: CompletedTaskProps){
    const [answers, setAnswers] = useState<Answer[]>([]);
    const [, setIsCompleted] = useState<boolean>(false);
    const intlDateFormatter = Intl.DateTimeFormat('en', { hour: "numeric", minute: "numeric", weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' });

    useEffect(() => {
        fetchAnswers();
      },);

      const fetchAnswers = async () => {
        const answerList = await TaskService.getAnswers(task.id);
        setAnswers(answerList);
        setIsCompleted(
          answerList.filter((answer) => answer.status === AnswerStatus.COMPLETED).length !== 0
        );
      }

    return (
        <div className="cursor-pointer">
            <Link to={`/tasks/${task.id}`}>
            <Card>
                <div className="w-52 h-16">
                    <h5 className="text-m line-clamp-1 font-medium tracking-tight text-gray-900 dark:text-white">
                    {task.title}
                    </h5>

                    {answers.map((answer) => {
                        return (
                        <div>
                            <h6 className="text-sm line-clamp-1 tracking-tight text-gray-900 dark:text-white"> 
                                {intlDateFormatter.format(new Date(answer.createdAt * 1000))} 
                            </h6>
                        </div>
                         );
                    })}

                    <div className="flex justify-end items-center gap-2 mt-2 mb-1">
                        {
                        {
                            "DEV" : <Badge color="info" icon={HiChip}>Devloper Task</Badge>,
                            "QUIZ" : <Badge color="info" icon={HiPencil}>Quiz Task</Badge>,
                        }[task.type]
                        }
                    </div>
                </div>
            </Card>
            </Link>
        </div>
    );

}

export default CompletedTaskCard;