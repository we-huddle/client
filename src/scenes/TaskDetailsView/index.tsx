import {Profile} from "../../types/Profile";
import {useContext} from "react";
import userContext from "../../types/UserContext";
import {Badge, Button, Card} from "flowbite-react";
import {HiCheck, HiPencil, HiTrash} from "react-icons/hi";


interface TaskDetailsViewProps {
    isAgentView: boolean,
  }

function TaskDetailsView({ isAgentView }: TaskDetailsViewProps){

    const profile = useContext(userContext);

    return(
      
    <div className="px-5">
      <Card>
        <div className="px-5 space-y-8">

          <div className="space-y-2">
            <h1 className="text-3xl font-medium text-gray-900">Task Name</h1>
            <div className="flex flex-wrap items-center gap-2">
                <Badge color="info">Developer Task</Badge>

                {!isAgentView && (
                  <Badge color="success" icon={HiCheck}>
                    <div className="px-1">
                      Completed
                    </div>
                  </Badge>
                )}
            </div>
          </div>
          
          <div className="space-y-3">
            <p className="font-normal text-gray-700 dark:text-gray-400 space-y-4">
            Task description here: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...
            </p> 
          </div>

          <div className="space-y-3">
            <h2 className="font-semibold text-gray-700 dark:text-gray-400 space-y-4">
            Number of pull requests to complete: 
            </h2> 
          </div>

          <div className="flex justify-end items-center gap-2">
              {isAgentView && profile?.role === Profile.Role.HuddleAgent && (
                  <>
                  <Button>
                      Edit
                      <HiPencil className="ml-2" />
                  </Button>
                  <Button color="failure">
                      Delete
                      <HiTrash className="ml-2" />
                  </Button></>
              )}
          </div>

        </div>
      </Card>
    </div>  
  )
}



  export default TaskDetailsView


