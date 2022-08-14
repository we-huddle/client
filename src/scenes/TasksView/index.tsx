import {Card, Button, Dropdown, Badge, Progress} from "flowbite-react";
import { HiCheck, HiXCircle, HiPlus } from "react-icons/hi";

function TasksView() {
  return (
    <div className="px-8 space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-medium text-gray-900">Tasks</h1>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          Lorem ipsum dolor sit amet
        </p>
      </div>
      <div className="space-y-8">
        <div>
          <Progress
            progress={45}
            color="green"
            label="Completed"
            labelPosition="outside"
            labelProgress={true}
          />
        </div>
        <div className="grid grid-cols-2">
          <div className="flex gap-2 items-center">
            <p>Sorted by: </p>
            <Badge color="info" icon={HiCheck}>
              <div className="px-1">
                Completed
              </div>
            </Badge>
            <Badge color="info" icon={HiCheck}>
              <div className="px-1">
                Incomplete
              </div>
            </Badge>
            <Badge color="info" icon={HiCheck}>
              <div className="px-1">
                By date
              </div>
            </Badge>
            <Button
              color="gray"
              size="xs"
              pill
            >
              Clear
              <HiXCircle className="ml-2" />
            </Button>
          </div>
          <div className="flex justify-end items-center gap-2">
            <Button color="gray">
              <div className="text-left">
                <Dropdown
                  label="Sort"
                  inline={true}
                >
                  <Dropdown.Item>
                    Dev tasks
                  </Dropdown.Item>
                  <Dropdown.Item>
                    Quiz tasks
                  </Dropdown.Item>
                  <Dropdown.Item>
                    Completed
                  </Dropdown.Item>
                  <Dropdown.Item>
                    Incomplete
                  </Dropdown.Item>
                  <Dropdown.Item>
                    By latest
                  </Dropdown.Item>
                </Dropdown>
              </div>
            </Button>
            <Button>
              Add new task
              <HiPlus className="ml-2" />
            </Button>
          </div>
        </div>
        <div className="flex flex-wrap gap-4">
          <div className="max-w-xs cursor-pointer">
            <Card>
              <h5 className="text-xl font-medium tracking-tight text-gray-900 dark:text-white">
                Noteworthy technology acquisitions 2021
              </h5>
              <p className="text-sm font-normal text-gray-700 dark:text-gray-400">
                Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
              </p>
              <div className="flex flex-wrap items-center gap-2">
                <Badge color="info">Dev</Badge>
                <Badge color="success" icon={HiCheck}>
                  <div className="px-1">
                    Completed
                  </div>
                </Badge>
              </div>
            </Card>
          </div>
          <div className="max-w-xs cursor-pointer">
            <Card>
              <h5 className="text-xl font-medium tracking-tight text-gray-900 dark:text-white">
                Noteworthy technology acquisitions 2021
              </h5>
              <p className="text-sm font-normal text-gray-700 dark:text-gray-400">
                Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
              </p>
              <div className="flex flex-wrap items-center gap-2">
                <Badge color="info">Dev</Badge>
                <Badge color="success" icon={HiCheck}>
                  <div className="px-1">
                    Completed
                  </div>
                </Badge>
              </div>
            </Card>
          </div>
          <div className="max-w-xs cursor-pointer">
            <Card>
              <h5 className="text-xl font-medium tracking-tight text-gray-900 dark:text-white">
                Noteworthy technology acquisitions 2021
              </h5>
              <p className="text-sm font-normal text-gray-700 dark:text-gray-400">
                Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
              </p>
              <div className="flex flex-wrap items-center gap-2">
                <Badge color="info">Dev</Badge>
                <Badge color="success" icon={HiCheck}>
                  <div className="px-1">
                    Completed
                  </div>
                </Badge>
              </div>
            </Card>
          </div>
          <div className="max-w-xs cursor-pointer">
            <Card>
              <h5 className="text-xl font-medium tracking-tight text-gray-900 dark:text-white">
                Noteworthy technology acquisitions 2021
              </h5>
              <p className="text-sm font-normal text-gray-700 dark:text-gray-400">
                Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
              </p>
              <div className="flex flex-wrap items-center gap-2">
                <Badge color="info">Dev</Badge>
                <Badge color="success" icon={HiCheck}>
                  <div className="px-1">
                    Completed
                  </div>
                </Badge>
              </div>
            </Card>
          </div>
          <div className="max-w-xs cursor-pointer">
            <Card>
              <h5 className="text-xl font-medium tracking-tight text-gray-900 dark:text-white">
                Noteworthy technology acquisitions 2021
              </h5>
              <p className="text-sm font-normal text-gray-700 dark:text-gray-400">
                Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
              </p>
              <div className="flex flex-wrap items-center gap-2">
                <Badge color="info">Dev</Badge>
                <Badge color="success" icon={HiCheck}>
                  <div className="px-1">
                    Completed
                  </div>
                </Badge>
              </div>
            </Card>
          </div>
          <div className="max-w-xs cursor-pointer">
            <Card>
              <h5 className="text-xl font-medium tracking-tight text-gray-900 dark:text-white">
                Noteworthy technology acquisitions 2021
              </h5>
              <p className="text-sm font-normal text-gray-700 dark:text-gray-400">
                Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
              </p>
              <div className="flex flex-wrap items-center gap-2">
                <Badge color="info">Dev</Badge>
                <Badge color="success" icon={HiCheck}>
                  <div className="px-1">
                    Completed
                  </div>
                </Badge>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TasksView;
