/* eslint-disable react/style-prop-object */
import {useContext, useEffect, useState} from "react";
import userContext from "../../types/UserContext";
import {UserServices} from "../../services/userServices";
import {FeedEvent} from "../../types/FeedEvent";
import {Avatar} from "flowbite-react";
import {Link} from "react-router-dom";

function FeedView() {
  const currentUser = useContext(userContext);
  const [feedEvents, setFeedEvents] = useState<FeedEvent[]>([]);
  const intlDateFormatter = Intl.DateTimeFormat('en', { hour: '2-digit', minute: '2-digit', weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' });

  useEffect(() => {
    fetchFeedEvents();
  }, [currentUser]);

  const fetchFeedEvents = async () => {
    const feedEventList = await UserServices.fetchFeedEvents();
    setFeedEvents(feedEventList);
  }

  return (
    <div className="px-8 space-y-8">
      <div className="col-span-3 h-30 overflow-y-scroll flex flex-col space-y-4">
        <div className="space-y-2">
          <h1 className="text-3xl font-medium text-gray-900">Latest events</h1>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            Latest events of the huddlers you follow.
          </p>
        </div>
        {feedEvents.length === 0 && (
          <div className="flex justify-center">
            <h5 className="text-sm tracking-tight text-gray-900 dark:text-white">
              No events found
            </h5>
          </div>
        )}
        {feedEvents.map(event => {
          return (
            <div className="flex justify-between items-center px-4 py-4 border-b-2 gap-20 border-gray-300 hover:bg-gray-50 cursor-pointer">
              <div className="flex gap-8 items-center">
                <Link to={`/profile/${event.profile.id}`}>
                  <Avatar img={event.profile.photo} rounded/>
                </Link>
                <div>
                  <Link to={`/profile/${event.profile.id}`}>
                    <h5 className="text-sm text-blue-500 hover:underline">
                      {event.profile.name}
                    </h5>
                  </Link>
                  <p className="text-md font-normal text-gray-700 dark:text-gray-400">
                    {event.title}
                  </p>
                  <p className="mt-2 text-sm font-normal text-gray-500 dark:text-gray-400">
                    On {intlDateFormatter.format(new Date(event.createdAt * 1000))}
                  </p>
                </div>
              </div>
              <div>
                {
                  {
                    'FOLLOWER': (
                      <Link to={`/profile/${event.referenceId}`}>
                        <p className="text-sm font-medium text-blue-500 hover:underline">
                          View profile
                        </p>
                      </Link>
                    ),
                    'BADGE': (
                      <Link to={`/badges/${event.referenceId}`}>
                        <p className="text-sm font-medium text-blue-500 hover:underline">
                          View badge
                        </p>
                      </Link>
                    ),
                    'TASK': (
                      <Link to={`/tasks/${event.referenceId}`}>
                        <p className="text-sm font-medium text-blue-500 hover:underline">
                          View task
                        </p>
                      </Link>
                    ),
                  }[event.type]
                }
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
}

export default FeedView;
