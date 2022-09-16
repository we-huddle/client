import {useParams} from "react-router-dom";
import {Modal} from "flowbite-react";
import { useEffect, useState } from "react";
import { Profile } from "../../../../types/Profile";
import { UserServices } from "../../../../services/userServices";

interface BadgesModalPromptProps {
  show: boolean,
  onClose: () => void,
}

const badges = [
  {
    id: 1,
    name: "badge 1",
    level: "1",
    img: "https://sefglobal.org/developers/images/1.png",
  },
  {
    id: 2,
    name: "badge 2",
    level: "2",
    img: "https://sefglobal.org/developers/images/2.png",
  },
  {
    id: 3,
    name: "badge 3",
    level: "3",
    img: "https://sefglobal.org/developers/images/3.png",
  },
  {
    id: 4,
    name: "badge 4",
    level: "4",
    img: "https://sefglobal.org/developers/images/4.png",
  },
  {
    id: 5,
    name: "badge 5",
    level: "5",
    img: "https://sefglobal.org/developers/images/4.png",
  },
  {
    id: 6,
    name: "badge 6",
    level: "6",
    img: "https://sefglobal.org/developers/images/4.png",
  },
];

function BadgesModalPrompt({ show, onClose}: BadgesModalPromptProps) {

  const { id } = useParams();
  const [profile, setProfile] = useState<Profile>();


  useEffect(() => {
      fetchProfile();
    }, );

  const fetchProfile = async () => {
      setProfile(await UserServices.getProfileById(id!));
    };


  return (
    <Modal show={show} onClose={onClose} size='5xl'>
      <Modal.Header>
      <h5 className="text-center"> @{profile?.githubUsername}'s badges </h5>
      </Modal.Header>
      <Modal.Body>
        <div className="overflow-y-auto h-[30rem]">
          <div className="flex flex-wrap gap-8">
            {badges.map((badge) => {
              return (
                <div className="mx-auto content-center place-items-center text-center mb-10">
                  <img className="h-20.5 w-20" src={badge.img} alt="" />
                  <p className="font-medium text-md text-gray-800">
                    {badge.name}
                  </p>
                </div>
              );
            })}
            </div>
          </div>
      </Modal.Body>
    </Modal>
  );
}

export default BadgesModalPrompt;