import { getAllActivities } from "@/actions/activity.action";
import Section from "@/components/Section";
import ActivityItem from "./_components/ActivityItem";
import { IActivityLog } from "@/typings";

const ActivitiesPage = async () => {
  const activities = await getAllActivities();
  console.log(activities);

  return (
    <div>
      <h1 className="text-3xl font-semibold text-center mb-6">Activities</h1>
      <div className="flex flex-col gap-4">
        {activities?.map((item: IActivityLog) => (
          <ActivityItem key={item._id} data={item} />
        ))}
      </div>
    </div>
  );
};

export default ActivitiesPage;
