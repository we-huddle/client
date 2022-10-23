import {Button, Label, Modal, Select, Textarea, TextInput} from "flowbite-react";
import {DevTaskDetails, PartialTask, Question, QuizTaskDetails, Task} from "../../../../types/Task";
import {useState} from "react";
import {useParams} from "react-router-dom";
import {TaskService} from "../../../../services/taskService";
import {HiBackspace, HiOutlinePencil, HiPlus, HiX} from "react-icons/hi";

interface EditTaskPromptProps {
  show: boolean,
  onClose: () => void,
  task: Task,
}

function EditTaskPrompt({ show, onClose, task}: EditTaskPromptProps) {
  const { id } = useParams();
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [questions, setQuestions] = useState<Question[]>((task.details as QuizTaskDetails).questions);
  const [editQuestionPrompt , setEditQuestionPrompt] = useState<Question>();
  const [totalMark, setTotalMark] = useState((task.details as QuizTaskDetails).questionPoints);

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setIsProcessing(true);
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    let details: DevTaskDetails | QuizTaskDetails;
    switch (task.type) {
      case Task.Type.DEV:
        details = {
          noOfPulls: parseInt(data.get("noOfPulls")!.toString()),
        };
        break;
      case Task.Type.QUIZ:
        details = {
          pointsToPass: parseInt(data.get("pointsToPass")!.toString()),
          passMark: (parseInt(data.get("pointsToPass")!.toString())/totalMark)*100,
          questionPoints: totalMark,
          questions: questions,
        };
        break;
    }

    const partialTask: PartialTask = {
      title: data.get("title")!.toString(),
      description: data.get("description")!.toString(),
      details: details,
      type: task.type,
    }
    await TaskService.updateTask(id!, partialTask);
    setIsProcessing(false);
    onClose();
  }

  const handleQuestionAddSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsProcessing(true);
    const data = new FormData(event.currentTarget);
    const question: Question = {
      number: questions.length + 1,
      question: data.get("question")!.toString(),
      correctAnswerKey: data.get("correctAnswer")!.toString(),
      answerWeightKey: data.get("answerWeight")!.toString(),
      options: {
        a: data.get("a")!.toString(),
        b: data.get("b")!.toString(),
        c: data.get("c")!.toString(),
        d: data.get("d")!.toString(),
      }
    }
    setQuestions([...questions, question]);
    setTotalMark(totalMark + parseInt(data.get("answerWeight")!.toString()));
    (document.getElementById("question-form")! as HTMLFormElement).reset();
    setIsProcessing(false);
  }

  const handleQuestionSave = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsProcessing(true);
    const data = new FormData(event.currentTarget);
    if (editQuestionPrompt){
      const updatedQuestion: Question = {
        number: editQuestionPrompt.number,
        question: data.get("question")!.toString(),
        correctAnswerKey: data.get("correctAnswer")!.toString(),
        answerWeightKey: data.get("answerWeight")!.toString(),
        options: {
          a: data.get("a")!.toString(),
          b: data.get("b")!.toString(),
          c: data.get("c")!.toString(),
          d: data.get("d")!.toString(),
        }
      }
      setQuestions(questions.map((question, index) => {
        if(question.number === editQuestionPrompt.number){
          return {...updatedQuestion};
        }
        return question;
      }));
      setTotalMark(totalMark + parseInt(data.get("answerWeight")!.toString()));
      setEditQuestionPrompt(undefined);
    }
    (document.getElementById("question-edit-form")! as HTMLFormElement).reset();
    setIsProcessing(false);
  }

  const removeQuestion = (number: number) => {
    const newQuestionList = questions.filter((question) => question.number !== number);
    setQuestions(newQuestionList.map((question, index) => {
      const newQuestion = question;
      newQuestion.number = index + 1;
      return newQuestion;
    }));
  }

  return (
    <Modal show={show} onClose={onClose} size={task.type === Task.Type.DEV ? 'xl' : '7xl'}>
      <Modal.Header>
        Edit Task
      </Modal.Header>
      <Modal.Body>
        <div className="grid grid-cols-3 gap-12">
          <div className={task.type === Task.Type.DEV ? 'col-span-3' : 'col-span-2'}>
              <form className="flex flex-col gap-4" onSubmit={(event) => handleFormSubmit(event)}>
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
                      defaultValue={task.title}
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
                    defaultValue={task.description}
                    required
                  />
                </div>
                {task.type === Task.Type.DEV && (
                    <div className="space-y-4">
                      <div className="mb-2 block">
                        <Label
                            htmlFor="noOfPulls"
                            value="Number of pull requests to complete"
                        />
                      </div>
                      <TextInput
                          id="noOfPulls"
                          name="noOfPulls"
                          type="number"
                          min={1}
                          defaultValue={(task?.details as DevTaskDetails).noOfPulls}
                          required
                      />
                    </div>
                )}
                {task.type === Task.Type.QUIZ && (
                    <div className="space-y-4">
                      <div className="space-y-4">
                        <div className="mb-2 block">
                          <Label
                              htmlFor="pointsToPass"
                              value="Total points needed to pass the quiz - "
                          />
                          <Label
                              htmlFor="totalMarks"
                              value="Out of marks : "
                          />
                          {totalMark}
                        </div>
                        <TextInput
                            id="pointsToPass"
                            name="pointsToPass"
                            type="number"
                            min={1}
                            defaultValue = {(task?.details as QuizTaskDetails).pointsToPass}
                            max={totalMark}
                            required
                        />
                      </div>
                      <div className="space-y-4">
                        <div className="mb-2 block">
                          <div className="flex gap-3">
                            <Label value="Questions"/>
                          </div>
                        </div>
                        {questions.length === 0? (
                            <div className="h-60 lg:h-72 text-sm text-gray-900 text-center p-6">
                              No questions added
                            </div>
                        ) : (
                          <div className="h-60 lg:h-72 overflow-y-scroll space-y-4">
                            {questions.map((question) => {
                              return (
                                  <div key={question.number} className="flex justify-between cursor-pointer bg-gray-50 border border-gray-300 rounded-xl p-6">
                                      <div className="space-y-2">
                                          <p className="text-sm text-gray-900">{question.number}. {question.question}</p>
                                          <div className="space-y-1 ml-4">
                                              <p className="text-sm text-gray-900">a. {question.options.a}</p>
                                              <p className="text-sm text-gray-900">b. {question.options.b}</p>
                                              <p className="text-sm text-gray-900">c. {question.options.c}</p>
                                              <p className="text-sm text-gray-900">d. {question.options.d}</p>
                                          </div>
                                          <p className="text-sm text-green-500">Correct answer: {question.correctAnswerKey}</p>
                                          <p className="text-sm text-blue-500">Answer weight: {question.answerWeightKey}</p>
                                      </div>
                                    {!editQuestionPrompt && (
                                        <div className="flex text-gray-500">
                                          <HiOutlinePencil className="mr-3" onClick={() => {
                                            // eslint-disable-next-line no-lone-blocks
                                            {editQuestionPrompt? (
                                                (document.getElementById("question-edit-form")! as HTMLFormElement).reset()
                                            ) : (
                                                (document.getElementById("question-form")! as HTMLFormElement).reset()
                                            )}
                                            setEditQuestionPrompt(questions[question.number - 1]);
                                            setTotalMark(totalMark - parseInt(question.answerWeightKey!.toString()));
                                          }}/>
                                        <HiX onClick={() => {removeQuestion(question.number);
                                          setTotalMark(totalMark - parseInt(question.answerWeightKey!.toString()));
                                        }}/>
                                      </div>
                                    )}
                                  </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    </div>
                )}
                <div className="flex justify-end text-right">
                  <Button type="submit" disabled={(task.type === Task.Type.QUIZ && questions.length === 0) || isProcessing}>
                    Save Changes
                  </Button>
                </div>
              </form>
            </div>
            {task.type === Task.Type.QUIZ && (
                <div className="relative">
                  {editQuestionPrompt! ? (
                      <div className="absolute w-full bottom-0 right-0 space-y-4 p-5 rounded-xl border border-gray-300">
                        <p className="text-xl">Edit the question: {editQuestionPrompt?.number}</p>
                        <form
                            id="question-edit-form"
                            className="flex flex-col gap-4"
                            onSubmit={(event => handleQuestionSave(event))}
                        >
                          <div className="space-y-4">
                            <div className="mb-2 block">
                              <Label
                                  htmlFor="question"
                                  value="Question"
                              />
                            </div>
                            <TextInput
                                id="question"
                                name="question"
                                type="text"
                                defaultValue={editQuestionPrompt?.question}
                                required
                            />
                          </div>
                          <div className="space-y-4">
                            <div className="grid grid-cols-10 items-center gap-2">
                              <div className="text-center">
                                <Label
                                    value="a)"
                                />
                              </div>
                              <div className="col-span-9">
                                <TextInput
                                    id="option-a"
                                    name="a"
                                    type="text"
                                    defaultValue={editQuestionPrompt?.options.a}
                                    required
                                />
                              </div>
                            </div>
                            <div className="grid grid-cols-10 items-center gap-2">
                              <div className="text-center">
                                <Label
                                    value="b)"
                                />
                              </div>
                              <div className="col-span-9">
                                <TextInput
                                    id="option-b"
                                    name="b"
                                    type="text"
                                    defaultValue={editQuestionPrompt?.options.b}
                                    required
                                />
                              </div>
                            </div>
                            <div className="grid grid-cols-10 items-center gap-2">
                              <div className="text-center">
                                <Label
                                    value="c)"
                                />
                              </div>
                              <div className="col-span-9">
                                <TextInput
                                    id="option-c"
                                    name="c"
                                    type="text"
                                    defaultValue={editQuestionPrompt?.options.c}
                                    required
                                />
                              </div>
                            </div>
                            <div className="grid grid-cols-10 items-center gap-2">
                              <div className="text-center">
                                <Label
                                    value="d)"
                                />
                              </div>
                              <div className="col-span-9">
                                <TextInput
                                    id="option-d"
                                    name="d"
                                    type="text"
                                    defaultValue={editQuestionPrompt?.options.d}
                                    required
                                />
                              </div>
                            </div>
                          </div>
                          <div className="space-y-4">
                            <Label
                                htmlFor="correctAnswerPicker"
                                value="Correct answer"
                            />
                            <Select
                                id="correctAnswerPicker"
                                name="correctAnswer"
                                defaultValue={editQuestionPrompt?.correctAnswerKey}
                                required
                            >
                              <option value="a">a</option>
                              <option value="b">b</option>
                              <option value="c">c</option>
                              <option value="d">d</option>
                            </Select>
                          </div>
                          <div className="space-y-4">
                            <Label
                                htmlFor="answerWeightPicker"
                                value="Answer weight"
                            />
                            <Select
                                id="answerWeightPicker"
                                name="answerWeight"
                                defaultValue={editQuestionPrompt?.answerWeightKey}
                                required
                            >
                              <option value="1">Easy</option>
                              <option value="2">Medium</option>
                              <option value="3">Hard</option>
                            </Select>
                          </div>
                          <div className="flex justify-between text-right">
                            <Button disabled={isProcessing} onClick={() => {
                              setEditQuestionPrompt(undefined);
                              setTotalMark(totalMark + parseInt(editQuestionPrompt?.answerWeightKey));
                            }}>
                              <HiBackspace />
                            </Button>
                            <Button type="submit" disabled={isProcessing}>
                              Save
                            </Button>
                          </div>
                        </form>
                      </div>
                    ):(
                      <div className="absolute w-full bottom-0 right-0 space-y-4 p-5 rounded-xl border border-gray-300">
                        <p className="text-xl">Add new question</p>
                        <form
                            id="question-form"
                            className="flex flex-col gap-4"
                            onSubmit={(event => handleQuestionAddSubmit(event))}
                        >
                          <div className="space-y-4">
                            <div className="mb-2 block">
                              <Label
                                  htmlFor="question"
                                  value="Question"
                              />
                            </div>
                            <TextInput
                                id="question"
                                name="question"
                                type="text"
                                defaultValue=""
                                required
                            />
                          </div>
                          <div className="space-y-4">
                            <div className="grid grid-cols-10 items-center gap-2">
                              <div className="text-center">
                                <Label
                                    value="a)"
                                />
                              </div>
                              <div className="col-span-9">
                                <TextInput
                                    id="option-a"
                                    name="a"
                                    type="text"
                                    defaultValue=""
                                    required
                                />
                              </div>
                            </div>
                            <div className="grid grid-cols-10 items-center gap-2">
                              <div className="text-center">
                                <Label
                                    value="b)"
                                />
                              </div>
                              <div className="col-span-9">
                                <TextInput
                                    id="option-b"
                                    name="b"
                                    type="text"
                                    defaultValue=""
                                    required
                                />
                              </div>
                            </div>
                            <div className="grid grid-cols-10 items-center gap-2">
                              <div className="text-center">
                                <Label
                                    value="c)"
                                />
                              </div>
                              <div className="col-span-9">
                                <TextInput
                                    id="option-c"
                                    name="c"
                                    type="text"
                                    defaultValue=""
                                    required
                                />
                              </div>
                            </div>
                            <div className="grid grid-cols-10 items-center gap-2">
                              <div className="text-center">
                                <Label
                                    value="d)"
                                />
                              </div>
                              <div className="col-span-9">
                                <TextInput
                                    id="option-d"
                                    name="d"
                                    type="text"
                                    defaultValue=""
                                    required
                                />
                              </div>
                            </div>
                          </div>
                          <div className="space-y-4">
                            <Label
                                htmlFor="correctAnswerPicker"
                                value="Correct answer"
                            />
                            <Select
                                id="correctAnswerPicker"
                                name="correctAnswer"
                                defaultValue=""
                                required
                            >
                              <option value="a">a</option>
                              <option value="b">b</option>
                              <option value="c">c</option>
                              <option value="d">d</option>
                            </Select>
                          </div>
                          <div className="space-y-4">
                            <Label
                                htmlFor="answerWeightPicker"
                                value="Answer weight"
                            />
                            <Select
                                id="answerWeightPicker"
                                name="answerWeight"
                                required
                            >
                              <option value="1">Easy</option>
                              <option value="2">Medium</option>
                              <option value="3">Hard</option>
                            </Select>
                          </div>

                          <div className="flex justify-end text-right">
                            <Button type="submit" disabled={isProcessing}>
                              <HiPlus />
                            </Button>
                          </div>
                        </form>
                      </div>
                  )}
                </div>
            )}
          </div>
      </Modal.Body>
    </Modal>
  );
}

export default EditTaskPrompt;
