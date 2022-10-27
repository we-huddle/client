import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Badge, Button, Card, Progress } from "flowbite-react";
import {
  FaStackOverflow,
  FaGithub,
  FaLinkedinIn,
  FaTwitter,
  FaShareAlt,
} from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import EditProfilePrompt from "./components/EditProfilePrompt";
import { UserServices } from "../../services/userServices";
import { Profile } from "../../types/Profile";
import { Task } from "../../types/Task";
import { TaskService } from "../../services/taskService";
import { HiChevronRight, HiOutlinePencil } from "react-icons/hi";
import { PullRequest } from "../../types/PullRequest";
import { PRService } from "../../services/prService";
import BadgesModalPrompt from "./components/Badges/BadgesModalPrompt";
import TasksModalPrompt from "./components/Tasks/TasksModalPrompt";
import CompletedTaskCard from "./components/Tasks/CompletedTasksCard";
import PRModalPrompt from "./components/PullRequests/PRModalPrompt";
import { BadgeService } from "../../services/badgeService";
import { BadgeDto } from "../../types/HuddlerBadge";
import UserContext from "../../types/UserContext";

interface ProfileViewProps {
  isAgentView: boolean;
}

function ProfileView({ isAgentView }: ProfileViewProps) {
  const { id } = useParams();
  const [profile, setProfile] = useState<Profile>();
  const currentUser = useContext(UserContext);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [isBadgeModalVisible, setIsBadgeModalVisible] =
    useState<boolean>(false);
  const [isTaskModalVisible, setIsTaskModalVisible] = useState<boolean>(false);
  const [isPRModalVisible, setIsPRModalVisible] = useState<boolean>(false);
  const [task, setTask] = useState<Task[]>([]);
  const [pullRequest, setPullRequest] = useState<PullRequest[]>([]);
  const [badges, setBadges] = useState<BadgeDto[]>([]);
  const [allBadges, setAllBadges] = useState<BadgeDto[]>([]);
  const [followers, setFollowers] = useState<string[]>([]);

  const fetchProfile = async () => {
    const fetchedProfile = await UserServices.getProfileById(id!);
    setProfile(fetchedProfile);
  };

  const fetchUserBadges = async () => {
    const badgeList = await BadgeService.getCompletedBadgesbyUser(id!);
    setBadges(badgeList);
  };

  const fetchAllBadges = async () => {
    const badgeList = await BadgeService.getBadges();
    setAllBadges(badgeList);
  };

  const fetchTasks = async () => {
    const taskList = await TaskService.getUserCompletedTasks(id!);
    setTask(taskList);
  };

  const fetchPullRequests = async () => {
    const prList = await PRService.getUserPR(id!);
    setPullRequest(prList);
  };

  const fetchFollowers = async () => {
    const followersList = await UserServices.getFollowerList(id!);
    setFollowers(followersList.map((follower) => follower.id));
  };

  const followUser = async () => {
    await UserServices.followUser(id!);
    await fetchFollowers();
  };

  const unfollowUser = async () => {
    await UserServices.unfollowUser(id!);
    await fetchFollowers();
  };

  const onPromptClose = () => {
    setIsModalVisible(false);
    fetchProfile();
  };

  const onBadgeModalClose = () => {
    setIsBadgeModalVisible(false);
  };

  const onTaskModalClose = () => {
    setIsTaskModalVisible(false);
  };

  const onPRModalClose = () => {
    setIsPRModalVisible(false);
  };

  useEffect(() => {
    fetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    fetchTasks();
    fetchPullRequests();
    fetchUserBadges();
    fetchAllBadges();
    fetchFollowers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile]);

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Link copied to clipboard");
  };

  return (
    <div>
      <div className="px-8 w-full mt-3">
        <EditProfilePrompt
          show={isModalVisible}
          onClose={onPromptClose}
          userProfile={profile!!}
        />
        <div className="grid grid-cols-10 gap-4">
          <div className="space-y-4 col-span-4">
            <Card>
              <div className="flex relative">
                <img
                  className="rounded-full w-32 h-32"
                  src={profile?.photo}
                  alt=""
                />
                <div className="mt-5 ml-6 mr-10">
                  <div className="space-y-2">
                    <div>
                      <p className="text-lg font-semibold">{profile?.name}</p>
                      <p className="text-sm text-gray-400">
                        @{profile?.githubUsername}
                      </p>
                      <div className="flex items-center text-sm text-gray-500 gap-4 pt-2">
                        <Badge color="success">{profile?.role}</Badge>
                      </div>
                    </div>
                    <p className="text-sm">
                      <span className="font-semibold">{followers.length}</span>{" "}
                      Followers
                    </p>
                  </div>
                  {currentUser && profile && currentUser.id === profile?.id ? (
                    <div className="absolute top-0 right-0 text-gray-600 cursor-pointer flex space-x-3">
                      <HiOutlinePencil
                        onClick={() => setIsModalVisible(true)}
                      />
                      <FaShareAlt onClick={copyLink} />
                    </div>
                  ) : (
                    <div className="absolute top-0 right-0 my-2">
                      {currentUser && followers.includes(currentUser.id) ? (
                        <Button onClick={unfollowUser} color="gray" pill>
                          Unfollow
                        </Button>
                      ) : (
                        <Button onClick={followUser} pill>
                          Follow
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              </div>
              <div>
                {profile?.bio && (
                  <div>
                    <p className="font-semibold text-gray-800">Bio</p>
                    <p className="text-sm text-gray-600">{profile.bio}</p>
                  </div>
                )}
                {profile?.city && (
                  <div className="flex items-center mt-3 -ml-1">
                    <MdLocationOn className="text-gray-800" size="25px" />
                    <p className="text-sm text-gray-600">{profile.city}</p>
                  </div>
                )}
                <div className="flex gap-3 mt-5">
                  {profile?.links?.github && (
                    <a
                      target="_blank"
                      rel="noreferrer"
                      href={profile.links.github}
                    >
                      <FaGithub
                        className="text-gray-800 hover:text-gray-500"
                        size="20px"
                      />
                    </a>
                  )}
                  {profile?.links?.linkedin && (
                    <a
                      target="_blank"
                      rel="noreferrer"
                      href={profile.links.linkedin}
                    >
                      <FaLinkedinIn
                        className="text-gray-800 hover:text-gray-500"
                        size="20px"
                      />
                    </a>
                  )}
                  {profile?.links?.stackoverflow && (
                    <a
                      target="_blank"
                      rel="noreferrer"
                      href={profile.links.stackoverflow}
                    >
                      <FaStackOverflow
                        className="text-gray-800 hover:text-gray-500"
                        size="20px"
                      />
                    </a>
                  )}
                  {profile?.links?.twitter && (
                    <a
                      target="_blank"
                      rel="noreferrer"
                      href={profile.links.twitter}
                    >
                      <FaTwitter
                        className="text-gray-800 hover:text-gray-500"
                        size="20px"
                      />
                    </a>
                  )}
                </div>
              </div>
            </Card>
          </div>
          <div className="col-span-6">
            <Card>
              <div className="flex flex-col items-center pb-3">
                <div className="flex gap-6 mt-5 center">
                  <div className="flex flex-col items-center pb-3 bg-gray-50 rounded-lg w-40 h-20 py-3 px-6">
                    <p className="font-semibold text-3xl text-gray-700">
                      {badges.length}
                    </p>
                    <p className="text-gray-600">Badges Earned</p>
                  </div>
                  <div className="flex flex-col items-center pb-3 bg-gray-50 rounded-lg h-20 py-3 px-6">
                    <p className="font-semibold text-3xl text-gray-700">
                      {task.length}
                    </p>
                    <p className="text-gray-600">Tasks Completed</p>
                  </div>
                  <div className="flex flex-col items-center pb-3 bg-gray-50 rounded-lg w-40 h-20 py-3 px-6">
                    <p className="font-semibold text-3xl text-gray-700">
                      {pullRequest.length}
                    </p>
                    <p className="text-gray-600">PR Count</p>
                  </div>
                </div>
              </div>
              <div className="mt-3">
                <Progress
                  progress={Math.round(
                    (badges.length / allBadges.length) * 100
                  )}
                  color="green"
                  size="lg"
                  label={
                    badges.length + " badges earned out of " + allBadges.length
                  }
                  labelPosition="outside"
                />
                <br></br>
                <div className="mt-5">
                  {badges.length === 0 && (
                    <div className="flex justify-center">
                      <h5 className="text-sm tracking-tight text-gray-900 dark:text-white">
                        - No Completed Badges -
                      </h5>
                    </div>
                  )}
                  <div className="flex flex-wrap gap-8">
                    {badges.slice(0, 4).map((badge) => {
                      return (
                        <div className="mx-auto content-center place-items-center text-center mb-10">
                          <br></br>
                          <Link to={`/badges/${badge.id}`}>
                            <img
                              className="h-20.5 w-20"
                              src={badge.photo}
                              alt=""
                            />
                          </Link>
                          <Link to={`/badges/${badge.id}`}>
                            <p className="font-medium text-md text-gray-800">
                              {badge.title}
                            </p>
                          </Link>
                        </div>
                      );
                    })}
                  </div>
                  {badges.length !== 0 && (
                    <div className="flex justify-end mt-5">
                      <button onClick={() => setIsBadgeModalVisible(true)}>
                        <div className="flex">
                          <p className="text-sm font-semibold">
                            Show All Badges
                          </p>
                          <HiChevronRight className="ml-2 mt-0.5" />
                        </div>
                      </button>
                    </div>
                  )}
                  <BadgesModalPrompt
                    show={isBadgeModalVisible}
                    onClose={onBadgeModalClose}
                  />
                </div>
              </div>
              <hr className="mt-2" />
              <p className="font-semibold">Recent Completed Tasks</p>
              {task.length === 0 && (
                <div className="flex justify-center">
                  <h5 className="text-sm tracking-tight text-gray-900 dark:text-white">
                    - No Completed Tasks -
                  </h5>
                </div>
              )}
              <div className="flex flex-wrap gap-4">
                {task.slice(0, 2).map((task) => {
                  return <CompletedTaskCard key={task.id} task={task} />;
                })}
              </div>
              <TasksModalPrompt
                show={isTaskModalVisible}
                onClose={onTaskModalClose}
              />
              {task.length !== 0 && (
                <div className="flex justify-end mt-5">
                  <button onClick={() => setIsTaskModalVisible(true)}>
                    <div className="flex text-m">
                      <p className="text-sm font-semibold">Show All Tasks</p>
                      <HiChevronRight className="ml-2 mt-0.5" />
                    </div>
                  </button>
                </div>
              )}
              <hr className="mt-2" />
              <p className="font-semibold">Recent Pull Requests</p>
              {pullRequest.length === 0 && (
                <div className="flex justify-center">
                  <h5 className="text-sm tracking-tight text-gray-900 dark:text-white">
                    - No Pull Requests -
                  </h5>
                </div>
              )}
              {pullRequest.slice(0, 3).map((pullRequest) => {
                return (
                  <div>
                    <a href={`${pullRequest.url}`}>
                      <div className="flex text-sm text-gray-500 gap-4 hover:underline hover:text-blue-700 hover:cursor-pointer">
                        <p className="w-13">#{pullRequest.number}</p>
                        <p className="truncate">{pullRequest.title}</p>
                      </div>
                    </a>
                    <hr />
                  </div>
                );
              })}
              <PRModalPrompt show={isPRModalVisible} onClose={onPRModalClose} />
              {pullRequest.length !== 0 && (
                <div className="flex justify-end mt-5">
                  <button onClick={() => setIsPRModalVisible(true)}>
                    <div className="flex text-m">
                      <p className="text-sm font-semibold">
                        Show All Pull Requests
                      </p>
                      <HiChevronRight className="ml-2 mt-0.5" />
                    </div>
                  </button>
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileView;
