import {Badge, Button, Card, FileInput, Label, Modal, Spinner, Textarea, TextInput} from "flowbite-react";
import {useEffect, useState} from "react";
import {BadgeService} from "../../../../services/badgeService";
import {BadgeDto, PartialBadge} from "../../../../types/HuddlerBadge";
import {TaskService} from "../../../../services/taskService";
import {Task} from "../../../../types/Task";
import {HiCheck, HiPlus, HiSearch, HiXCircle} from "react-icons/hi";

interface CreateNewBadgePromptProps {
  show: boolean,
  onClose: () => void,
}

function CreateNewBadgePrompt({ show, onClose }: CreateNewBadgePromptProps) {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [photo, setPhoto] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [tasks, setTasks] = useState<Map<string, Task>>();
  const [tasksToBePickedFrom, setTasksToBePickedFrom] = useState<string[]>([]);
  const [pickedTaskIds, setPickedTaskIds] = useState<string[]>([]);
  const [badges, setBadges] = useState<Map<string, BadgeDto>>();
  const [badgesToBePickedFrom, setBadgesToBePickedFrom] = useState<string[]>([]);
  const [pickedBadgeIds, setPickedBadgeIds] = useState<string[]>([]);
  const [badge, setBadge] = useState<PartialBadge>({
    title: '',
    description: '',
    photo: '',
    depBadges: [],
    depTasks: [],
  });

  useEffect(() => {
    fetchBadges();
    fetchTasks();
  }, []);

  const fetchBadges = async () => {
    const badgeList = await BadgeService.getBadges();
    setBadges(new Map(badgeList.map((badge) => [badge.id, badge])));
    setBadgesToBePickedFrom(badgeList.map((badge) => badge.id));
  }

  const fetchTasks = async () => {
    const taskList = await TaskService.getTasks();
    setTasks(new Map(taskList.map((task) => [task.id, task])));
    setTasksToBePickedFrom(taskList.map((task) => task.id));
  }

  const handleFileUpload = async (event: React.FormEvent<HTMLInputElement>) => {
    setIsLoading(true);
    event.preventDefault();
    const formData = new FormData();
    const files = event.currentTarget.files;
    if (files != null) {
      formData.append("image", files[0]);
      const photoUrl = await BadgeService.uploadBadgeImage(formData);
      setPhoto(photoUrl);
    }
    setIsLoading(false);
  }

  const handleBasicInfoNext = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setBadge({
      title: data.get("title")!.toString(),
      description: data.get("description")!.toString(),
      photo: photo,
      depBadges: [],
      depTasks: [],
    });
    setStep(2);
  }

  const handleCreateBadge = async () => {
    await BadgeService.createBadge({
      title: badge.title,
      description: badge.description,
      photo: badge.photo,
      depBadges: pickedBadgeIds,
      depTasks: pickedTaskIds,
    });
    window.location.reload();
  }

  const handleSearchTask = (event: React.ChangeEvent<HTMLInputElement>) => {
    const keyword = event.target.value.toLowerCase();
    const taskList = Array.from(tasks?.values()!)
    setTasksToBePickedFrom(
      taskList.filter((task) => {
        return (
          task.title.toLowerCase().includes(keyword)
        ) && !pickedTaskIds.includes(task.id)
      }).map((task) => task.id)
    )
  }

  const handleSearchBadge = (event: React.ChangeEvent<HTMLInputElement>) => {
    const keyword = event.target.value.toLowerCase();
    const badgeList = Array.from(badges?.values()!)
    setBadgesToBePickedFrom(
      badgeList.filter((badge) => {
        return (
          badge.title.toLowerCase().includes(keyword)
        ) && !pickedBadgeIds.includes(badge.id)
      }).map((badge) => badge.id)
    )
  }

  const handlePickTask = (taskId: string) => {
    setTasksToBePickedFrom(tasksToBePickedFrom.filter((unpickedId) => unpickedId !== taskId));
    setPickedTaskIds([...pickedTaskIds, taskId]);
  }

  const handlePickBadge = (badgeId: string) => {
    setBadgesToBePickedFrom(badgesToBePickedFrom.filter((unpickedId) => unpickedId !== badgeId));
    setPickedBadgeIds([...pickedBadgeIds, badgeId]);
  }

  const handleRemoveFromPickedTasks = (taskId: string) => {
    setPickedTaskIds(pickedTaskIds.filter((pickedId) => pickedId !== taskId))
    setTasksToBePickedFrom([...tasksToBePickedFrom, taskId]);
  }

  const handleRemoveFromPickedBadges = (badgeId: string) => {
    setPickedBadgeIds(pickedBadgeIds.filter((pickedId) => pickedId !== badgeId))
    setBadgesToBePickedFrom([...badgesToBePickedFrom, badgeId]);
  }

  return (
    <Modal show={show} onClose={onClose} size={'xl'}>
      <Modal.Header>
        Create new badge
      </Modal.Header>
      <Modal.Body>
        {{
          1: (
            <div className="space-y-4">
              <div className="flex justify-center">
                {isLoading ? (
                  <Spinner />
                ) : (
                  photo !== '' && (
                    <img className="h-28 w-28" src={photo} alt="" />
                  )
                )}
              </div>
              <div className="flex flex-col gap-4">
                <div className="mb-2 block">
                  <Label
                    htmlFor="file"
                    value="Badge image"
                  />
                </div>
                <FileInput
                  id="file"
                  accept="image/*"
                  onInput={(event) => handleFileUpload(event)}
                />
              </div>
              <form className="flex flex-col gap-4" onSubmit={(event) => handleBasicInfoNext(event)}>
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
                    defaultValue={badge.title}
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
                    defaultValue={badge.description}
                    required
                  />
                </div>
                <div className="flex justify-end text-right">
                  <Button type="submit" disabled={photo === ''}>Next</Button>
                </div>
              </form>
            </div>
          ),
          2: (
            <div className="space-y-4">
              {pickedTaskIds.length !== 0 && (
                <div>
                  <div className="mb-2 block">
                    <Label
                      value="Picked tasks"
                    />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {pickedTaskIds.map((taskId) => {
                      const task = tasks?.get(taskId)!;
                      return (
                        <Button
                          color="gray"
                          size="xs"
                          pill
                          onClick={() => handleRemoveFromPickedTasks(task.id)}
                        >
                          {task.title}
                          <HiXCircle className="ml-2" />
                        </Button>
                      );
                    })}
                  </div>
                </div>
              )}
              <div className="mb-2 block">
                <Label
                  htmlFor="search"
                  value="Task list"
                />
              </div>
              <div className="space-y-4">
                <TextInput
                  id="search"
                  name="search"
                  type="text"
                  icon={HiSearch}
                  onChange={(event) => handleSearchTask(event)}
                />
              </div>
              <div className="my-6 h-80 overflow-y-scroll">
                {tasksToBePickedFrom.map((taskId) => {
                  const task = tasks?.get(taskId)!;
                  return (
                    <div key={task.id} className="flex justify-between gap-4 py-2 items-center">
                      <div>
                        <p className="line-clamp-1 text-sm font-medium text-gray-700 dark:text-gray-400">
                          {task.title}
                        </p>
                      </div>
                      <Button
                        color="gray"
                        onClick={() => handlePickTask(taskId)}
                      >
                        <HiPlus />
                      </Button>
                    </div>
                  );
                })}
              </div>
              <div className="flex justify-between text-right">
                <Button
                  type="submit"
                  color="gray"
                  onClick={() => setStep(1)}
                >
                  Back
                </Button>
                <Button
                  type="submit"
                  onClick={() => setStep(3)}
                >
                  Next
                </Button>
              </div>
            </div>
          ),
          3: (
            <div className="space-y-4">
              {pickedBadgeIds.length !== 0 && (
                <div>
                  <div className="mb-2 block">
                    <Label
                      value="Picked badges"
                    />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {pickedBadgeIds.map((badgeId) => {
                      const badge = badges?.get(badgeId)!;
                      return (
                        <Button
                          color="gray"
                          size="xs"
                          pill
                          onClick={() => handleRemoveFromPickedBadges(badge.id)}
                        >
                          {badge.title}
                          <HiXCircle className="ml-2" />
                        </Button>
                      );
                    })}
                  </div>
                </div>
              )}
              <div className="mb-2 block">
                <Label
                  htmlFor="search"
                  value="Badge list"
                />
              </div>
              <div className="space-y-4">
                <TextInput
                  id="search"
                  name="search"
                  type="text"
                  icon={HiSearch}
                  onChange={(event) => handleSearchBadge(event)}
                />
              </div>
              <div className="my-6 h-80 overflow-y-scroll">
                {badgesToBePickedFrom.map((badgeId) => {
                  const badge = badges?.get(badgeId)!;
                  return (
                    <div key={badge.id} className="flex justify-between gap-4 py-2 items-center">
                      <div>
                        <p className="line-clamp-1 text-sm font-medium text-gray-700 dark:text-gray-400">
                          {badge.title}
                        </p>
                      </div>
                      <Button
                        color="gray"
                        onClick={() => handlePickBadge(badgeId)}
                      >
                        <HiPlus />
                      </Button>
                    </div>
                  );
                })}
              </div>
              <div className="flex justify-between text-right">
                <Button
                  type="submit"
                  color="gray"
                  onClick={() => setStep(2)}
                >
                  Back
                </Button>
                <Button
                  type="submit"
                  onClick={() => setStep(4)}
                >
                  Next
                </Button>
              </div>
            </div>
          ),
          4: (
            <div className="space-y-4">
              <div className="space-y-4">
                <div className="flex justify-center">
                  <img className="h-28 w-28" src={badge.photo} alt="" />
                </div>
                <div className="space-y-4">
                  <div className="mb-2 block">
                    <Label
                      value="Title"
                    />
                  </div>
                  <p className="text-sm text-gray-500">{badge.title}</p>
                </div>
                <div className="space-y-4">
                  <div className="mb-2 block">
                    <Label
                      value="Description"
                    />
                  </div>
                  <p className="text-sm text-gray-500">{badge.description}</p>
                </div>
                <div className="space-y-4">
                  <div className="mb-2 block">
                    <Label
                      value="Tasks to complete"
                    />
                  </div>
                  {pickedTaskIds.length === 0 && (
                    <div className="flex justify-center">
                      <h5 className="text-sm tracking-tight text-gray-900 dark:text-white">
                        No tasks picked
                      </h5>
                    </div>
                  )}
                  <div className="grid grid-cols-2 gap-6">
                    {pickedTaskIds.map((taskId) => {
                      const task = tasks?.get(taskId)!;
                      return (
                        <Card>
                          <h5 className="text-md font-medium tracking-tight text-gray-900 dark:text-white">
                            {task.title}
                          </h5>
                          <p className="text-sm line-clamp-1 font-normal text-gray-700 dark:text-gray-400">
                            {task.description}
                          </p>
                          <div className="flex flex-wrap items-center gap-2">
                            {
                              {
                                "DEV" : <Badge color="info">Dev</Badge>,
                                "QUIZ" : <Badge color="info">Quiz</Badge>,
                              }[task.type]
                            }
                          </div>
                        </Card>
                      );
                    })}
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="mb-2 block">
                    <Label
                      value="Badges to complete"
                    />
                  </div>
                  {pickedBadgeIds.length === 0 && (
                    <div className="flex justify-center">
                      <h5 className="text-sm tracking-tight text-gray-900 dark:text-white">
                        No badges picked
                      </h5>
                    </div>
                  )}
                  <div className="grid grid-cols-4 gap-6">
                    {pickedBadgeIds.map((badgeId) => {
                      const badge = badges?.get(badgeId)!;
                      return (
                        <div key={badge.id} className="flex justify-center space-y-2">
                          <div className="space-y-2">
                            <img className="h-20 w-20" src={badge.photo} alt="" />
                            <p className="text-md font-medium text-center">{badge.title}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="flex justify-between text-right">
                <Button
                  type="submit"
                  color="gray"
                  onClick={() => setStep(3)}
                >
                  Back
                </Button>
                <Button
                  type="submit"
                  disabled={pickedTaskIds.length === 0 && pickedBadgeIds.length === 0}
                  onClick={handleCreateBadge}
                >
                  Create badge
                </Button>
              </div>
            </div>
          ),
        }[step]}
      </Modal.Body>
    </Modal>
  );
}

export default CreateNewBadgePrompt;
