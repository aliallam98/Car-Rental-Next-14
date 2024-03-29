import { getAllActivities } from "@/actions/activity.action";
import Section from "@/components/Section";
import ActivityItem from "./_components/ActivityItem";
import { IActivityLog, SearchParamProps } from "@/typings";
import Pagination from "@/components/Pagination";
import { ApiFeatures } from "@/lib/utils";

const ActivitiesPage = async ({ searchParams }: SearchParamProps) => {
  const x = ApiFeatures({...searchParams,limit:10});
  const activities = await getAllActivities(x);
  console.log(activities);

  return (
    <div>
      <h1 className="text-3xl font-semibold text-center mb-6">Activities</h1>
      <div className="flex flex-col gap-4">
        {activities?.results.map((item: IActivityLog) => (
          <ActivityItem key={item._id} data={item} />
        ))}
      </div>
      <Pagination page={activities?.page!} totalPages={activities?.totalPages!} />
    </div>
  );
};

export default ActivitiesPage;
