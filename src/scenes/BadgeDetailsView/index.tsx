/* eslint-disable react-hooks/exhaustive-deps */
import {Profile} from "../../types/Profile";
import {useContext, useEffect, useState} from "react";
import userContext from "../../types/UserContext";
import {Badge, Button, Dropdown, Card} from "flowbite-react";
import {HiCheck, HiOutlineArrowLeft} from "react-icons/hi";
import {Link, useNavigate, useParams} from "react-router-dom";
import {BadgeWithDependencies} from "../../types/HuddlerBadge";
import {BadgeService} from "../../services/badgeService";

import DeleteBadgePrompt from "./components/DeleteBadgePrompt";

interface BadgeDetailsViewProps {
  isAgentView: boolean,
}

function BadgeDetailsView({ isAgentView }: BadgeDetailsViewProps){
  const profile = useContext(userContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [badge ,setBadge] = useState<BadgeWithDependencies | null>(null);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState<boolean>(false);

  useEffect(() => {
    fetchTask();
  }, [id]);

  const fetchTask = async () => {
    setBadge(await BadgeService.getBadgeById(id!));
    if (!isAgentView) {
      const completedBadges = await BadgeService.getCompletedBadges();
      setIsCompleted(completedBadges.filter((completedBadge) => completedBadge.id === id).length === 1);
    }
  }

  const onDeleteModalClose = () => {
    setIsDeleteModalVisible(false)
  }

  return(
    <div>
      {badge == null? "loading" : (
        <div className="px-8 space-y-8">
          <DeleteBadgePrompt show={isDeleteModalVisible} onClose={onDeleteModalClose} badge={badge}/>
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
                    <Dropdown.Item>
                      Edit badge
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => setIsDeleteModalVisible(true)}>
                      Delete badge
                    </Dropdown.Item>
                  </Dropdown>
                </div>
              </Button>
            )}
          </div>
          <div className="flex justify-between items-start">
            <div className="space-y-4">
              <h1 className="text-3xl font-medium text-gray-900">{badge.title}</h1>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                {badge.description}
              </p>
              <div className="flex flex-wrap items-center gap-2">
                {!isAgentView && isCompleted && (
                  <Badge color="success" icon={HiCheck}>
                    <div className="px-1">
                      Completed
                    </div>
                  </Badge>
                )}
              </div>
            </div>
            <div className="text-center p-5 bg-gray-50 rounded-xl">
              <img className="h-20 w-20 rounded-xl" src={badge.photo} alt="" />
            </div>
          </div>
          <div className="space-y-8">
            <h1 className="text-xl font-medium text-gray-900">Badges to complete</h1>
            {badge.depBadges.length === 0 && (
              <div className="flex justify-center">
                <h5 className="text-sm tracking-tight text-gray-900 dark:text-white">
                  No badges picked
                </h5>
              </div>
            )}
            <div className="flex flex-wrap gap-6">
              {badge.depBadges.map((depBadge) => {
                return (
                  <Link key={depBadge.id} to={`${isAgentView ? '/agent' : ''}/badges/${depBadge.id}`} >
                    <div key={depBadge.id} className="flex justify-center space-y-2">
                      <div className="space-y-2">
                        <img className="h-20 w-20" src={depBadge.photo} alt="" />
                        <p className="text-md text-center">{depBadge.title}</p>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
          <div className="space-y-8">
            <h1 className="text-xl font-medium text-gray-900">Tasks to complete</h1>
            {badge.depTasks.length === 0 && (
              <div className="flex justify-center">
                <h5 className="text-sm tracking-tight text-gray-900 dark:text-white">
                  No tasks picked
                </h5>
              </div>
            )}
            <div className="grid grid-cols-4 gap-6">
              {badge.depTasks.map((task) => {
                return (
                  <Link key={task.id} to={`${isAgentView ? '/agent' : ''}/tasks/${task.id}`} >
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
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BadgeDetailsView;
