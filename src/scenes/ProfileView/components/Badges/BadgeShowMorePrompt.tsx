
import { ReactNode, useState } from "react";
import { HiChevronDown, HiChevronUp } from "react-icons/hi";

interface Props {
    children?: ReactNode
    // any props that come into the component
}

const BadgeShowMorePrompt = ({children}: Props) => {

    const [isShowMore, setShowMore] = useState(false);

    const toggleBtn = () => {
        setShowMore(prevState => !prevState)
    }

    return(
        <div>
            {isShowMore ? children : "" }
            <div className="flex justify-end mb-2"> 
                <button onClick={toggleBtn}>
                    {isShowMore ? 
                        <div className="flex">
                            <p className="text-sm font-semibold">Show Less</p> 
                            <HiChevronUp className="ml-2 mt-0.5" />
                        </div>
                    
                    :
                        <div className="flex">
                            <p className="text-sm font-semibold">Show More</p> 
                            <HiChevronDown className="ml-2 mt-0.5" />
                        </div>
                    }
                </button>  
            </div>
            <hr/>        
        </div>
 
  )

}

export default BadgeShowMorePrompt;
