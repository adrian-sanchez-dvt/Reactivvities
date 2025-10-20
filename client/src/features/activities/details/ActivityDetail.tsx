import { Link, useNavigate, useParams } from "react-router";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { useActivities } from "../../../lib/hooks/useActivities";

export const ActivityDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { activity, isLoadingActivity } = useActivities(id);

  if (isLoadingActivity) return <Typography>Loading...</Typography>;

  if (!activity) return <Typography>Activity not found</Typography>;

  return (
    <Card sx={{ borderRadius: 3 }}>
      <CardMedia
        component="img"
        src={`/images/categoryImages/${activity.category}.jpg`}
      />
      <CardContent>
        <Typography variant="h5">{activity.title}</Typography>
        <Typography
          variant="subtitle1"
          fontWeight="light"
        >
          {activity?.date
            ? new Date(activity.date).toISOString().split("T")[0]
            : new Date().toISOString().split("T")[0]}
        </Typography>
        <Typography variant="body1">{activity.description}</Typography>
      </CardContent>
      <CardContent>
        <Button
          component={Link}
          color="primary"
          to={`/manage/${activity.id}`}
        >
          Edit
        </Button>
        <Button
          color="inherit"
          onClick={() => navigate("/activities")}
        >
          Cancel
        </Button>
      </CardContent>
    </Card>
  );
};
