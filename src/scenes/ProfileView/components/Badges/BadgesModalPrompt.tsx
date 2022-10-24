import {Link, useParams} from "react-router-dom";
import {Modal} from "flowbite-react";
import { useEffect, useState } from "react";
import { Profile } from "../../../../types/Profile";
import { UserServices } from "../../../../services/userServices";
import { BadgeService } from "../../../../services/badgeService";
import { BadgeDto } from "../../../../types/HuddlerBadge";

interface BadgesModalPromptProps {
  show: boolean,
  onClose: () => void,
}

function BadgesModalPrompt({ show, onClose}: BadgesModalPromptProps) {

  const { id } = useParams();
  const [profile, setProfile] = useState<Profile>();
  const [badge, setBadge] = useState<BadgeDto[]>([]);


  useEffect(() => {
      fetchProfile();
      fetchBadges();
    }, );

  const fetchProfile = async () => {
      setProfile(await UserServices.getProfileById(id!));
    };

  const fetchBadges = async () => {
    const badgeList = await BadgeService.getCompletedBadgesbyUser(id!);
    setBadge(badgeList);
  }


  return (
    <Modal show={show} onClose={onClose} size='5xl'>
      <Modal.Header>
      <h5 className="text-center"> @{profile?.githubUsername}'s badges </h5>
      </Modal.Header>
      <Modal.Body>
        <div className="overflow-y-auto h-[30rem]">
          <div className="flex flex-wrap gap-8">
            {badge.map((badge) => {
              return (
                <div className="mx-auto content-center place-items-center text-center mb-10">
                  <br></br>
                  <Link to={`/badges/${badge.id}`}>
                  <img className="h-20.5 w-20" src={badge.photo} alt="" />
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
          </div>
      </Modal.Body>
    </Modal>
  );
}

export default BadgesModalPrompt;
