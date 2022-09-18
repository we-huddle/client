import {Task} from "../../../../types/Task";
import { Badge, Button, Timeline } from "flowbite-react";
import { HiArrowNarrowRight, HiCalendar, HiChip, HiPencil } from "react-icons/hi";
import { Link } from "react-router-dom";
import {Answer, AnswerStatus,} from "../../../../types/Task"
import { useEffect, useState } from "react";
import { TaskService } from "../../../../services/taskService";

interface CompletedTaskProps {
    task: Task,
  }

function CompletedTaskList({task}: CompletedTaskProps){
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
        <Timeline>
            <Timeline.Item>
                <Timeline.Point icon={HiCalendar}/>
                <Timeline.Content>
                    <Timeline.Time>
                        <div className="flex w-96">
                            {answers.map((answer) => {
                            return (
                                <div>
                                    <h6 className="text-sm line-clamp-1 tracking-tight text-gray-900 dark:text-white"> 
                                        {intlDateFormatter.format(new Date(answer.createdAt * 1000))} 
                                    </h6>
                                </div>
                                );
                            })}
                        <div className="flex justify-end items-center gap-2 ml-16 mb-1">
                            {
                                {   "DEV" : <Badge color="info" icon={HiChip}>Devloper Task</Badge>,
                                    "QUIZ" : <Badge color="info" icon={HiPencil}>Quiz Task</Badge>,
                                }[task.type]
                            }
                        </div>
                        </div>
                    </Timeline.Time>
                <Timeline.Title>
                    <h5 className="text-xl line-clamp-1 font-medium tracking-tight text-gray-900 dark:text-white">
                        {task.title}
                    </h5>
                </Timeline.Title>
                <Timeline.Body>
                    <p className="text-sm line-clamp-2 font-normal tracking-tight text-gray-900 dark:text-white">
                        {task.description}
                    </p>
                </Timeline.Body>
                <Link to={`/tasks/${task.id}`}>
                    <Button color="gray">
                        Open Task
                        <HiArrowNarrowRight className="ml-2 h-3 w-3" />
                    </Button>
                </Link>
                </Timeline.Content>
            </Timeline.Item>
        </Timeline>
    );

}

export default CompletedTaskList;
