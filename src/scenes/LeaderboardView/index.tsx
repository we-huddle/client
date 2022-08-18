/* eslint-disable react/style-prop-object */
import {useEffect, useState} from "react";
import {LeaderboardPeriod, LeaderboardRecord} from "../../types/LeaderboardRecord";
import {Tabs} from "flowbite-react";
import {LeaderboardService} from "../../services/leaderboardService";
import LeaderboardRow from "./LeaderboardRow";

function LeaderboardView() {
  const [thisMonthRecords, setThisMonthRecords] = useState<LeaderboardRecord[]>([]);
  const [lastMonthRecords, setLastMonthRecords] = useState<LeaderboardRecord[]>([]);
  const [allTimeRecords, setAllTimeRecords] = useState<LeaderboardRecord[]>([]);

  useEffect(() => {
    fetchRecords(LeaderboardPeriod.current);
    fetchRecords(LeaderboardPeriod.last);
    fetchRecords(LeaderboardPeriod.all);
  }, []);

  const fetchRecords = async (period: LeaderboardPeriod) => {
    switch (period) {
      case LeaderboardPeriod.current:
        setThisMonthRecords(await LeaderboardService.getLeaderboardRecordsByPeriod(LeaderboardPeriod.current))
        break;
      case LeaderboardPeriod.last:
        setLastMonthRecords(await LeaderboardService.getLeaderboardRecordsByPeriod(LeaderboardPeriod.last));
        break;
      case LeaderboardPeriod.all:
        setAllTimeRecords(await LeaderboardService.getLeaderboardRecordsByPeriod(LeaderboardPeriod.all));
        break;
    }
  }

  return (
    <div className="px-8 space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-medium text-gray-900">Leaderboard</h1>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          The list of top contributors on github.
          Scores are automatically calculated by the number of pull requests sent by each individual contributor.
        </p>
      </div>
      <div className="h-30 overflow-y-scroll">
        <Tabs.Group style="underline">
          <Tabs.Item title="This month">
            {thisMonthRecords.map((record, index) => {
              return (<LeaderboardRow row={index + 1} record={record}/>)
            })}
          </Tabs.Item>
          <Tabs.Item title="Last month">
            {lastMonthRecords.map((record, index) => {
              return (<LeaderboardRow row={index + 1} record={record}/>)
            })}
          </Tabs.Item>
          <Tabs.Item title="All time">
            {allTimeRecords.map((record, index) => {
              return (<LeaderboardRow row={index + 1} record={record}/>)
            })}
          </Tabs.Item>
        </Tabs.Group>
      </div>
    </div>
  );
}

export default LeaderboardView;
