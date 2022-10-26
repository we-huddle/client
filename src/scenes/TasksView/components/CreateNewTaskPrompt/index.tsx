import {Button, Dropdown, Label, Modal, Select, Textarea, TextInput} from "flowbite-react";
import {useState} from "react";
import {DevTaskDetails, PartialTask, Question, QuizTaskDetails, Task} from "../../../../types/Task";
import {TaskService} from "../../../../services/taskService";
import {HiPlus, HiX} from "react-icons/hi";

interface CreateNewTaskPromptProps {
  show: boolean,
  onClose: () => void,
}

function CreateNewTaskPrompt({ show, onClose }: CreateNewTaskPromptProps) {
  const [selectedTaskType, setSelectedTaskType] = useState<Task.Type>(Task.Type.DEV);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [totalMark, setTotalMark] = useState(0);

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setIsProcessing(true);
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let details: DevTaskDetails | QuizTaskDetails;
    switch (selectedTaskType) {
      case Task.Type.DEV:
        details = {
          noOfPulls: parseInt(data.get("noOfPulls")!.toString()),
        };
        break;
      case Task.Type.QUIZ:
        details  = {
          pointsToPass: (parseInt(data.get("pointsToPass")!.toString())),
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
      type: selectedTaskType,
    }
    await TaskService.createTask(partialTask);
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

  const removeQuestion = (number: number) => {
    const newQuestionList = questions.filter((question) => question.number !== number);
    setQuestions(newQuestionList.map((question, index) => {
      const newQuestion = question;
      newQuestion.number = index + 1;
      return newQuestion;
    }));
  }

  return (
    <Modal show={show} onClose={onClose} size={selectedTaskType === Task.Type.DEV ? 'xl' : '7xl'}>
      <Modal.Header>
        Create new task
      </Modal.Header>
      <Modal.Body>
        <div className="grid grid-cols-3 gap-12">
          <div className={selectedTaskType === Task.Type.DEV ? 'col-span-3' : 'col-span-2'}>
            <div className="flex flex-col gap-4 mb-2">
              <div className="mr-3">
                <Label
                  htmlFor="Type"
                  value="Type"
                />
              </div>
              <Button color="gray">
                <div className="text-left z-50">
                  <Dropdown
                    label={
                      {
                        "DEV": 'Developer task',
                        "QUIZ": 'Quiz task',
                      }[selectedTaskType]
                    }
                    inline={true}
                  >
                    <Dropdown.Item onClick={() => setSelectedTaskType(Task.Type.DEV)}>
                      Developer task
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => setSelectedTaskType(Task.Type.QUIZ)}>
                      Quiz task
                    </Dropdown.Item>
                  </Dropdown>
                </div>
              </Button>
            </div>
            <form className="flex flex-col gap-4" onSubmit={(event => handleFormSubmit(event))}>
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
                  required
                />
              </div>
              {selectedTaskType === Task.Type.DEV && (
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
                    required
                  />
                </div>
              )}
              {selectedTaskType === Task.Type.QUIZ && (
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
                      max={totalMark}
                      required
                    />
                  </div>
                  <div className="space-y-4">
                    <div className="mb-2 block">
                      <Label
                        value="Questions"
                      />
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
                              <div className="text-gray-500">
                                <HiX onClick={() => {removeQuestion(question.number) ;
                                  setTotalMark(totalMark - parseInt(question.answerWeightKey!.toString()));
                                }}/>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              )}
              <div className="flex justify-end text-right">
                <Button type="submit" disabled={(selectedTaskType === Task.Type.QUIZ && questions.length === 0) || isProcessing}>
                  Create
                </Button>
              </div>
            </form>
          </div>
          {selectedTaskType === Task.Type.QUIZ && (
            <div className="relative">
              <div className="absolute w-full bottom-0 right-0 space-y-4 p-5 rounded-xl border border-gray-300">
                <p className="text-xl">Add questions</p>
                <form
                  id="question-form"
                  className="flex flex-col gap-4"
                  onSubmit={(event) => handleQuestionAddSubmit(event)}
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
            </div>
          )}
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default CreateNewTaskPrompt;
