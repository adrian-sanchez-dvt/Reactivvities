import { useParams } from "react-router";
import { useProfile } from "../../lib/hooks/useProfile";
import { Box, Button, Divider, Typography } from "@mui/material";
import { useState } from "react";
import { ProfileEditForm } from "./ProfileEditForm";

export const ProfileAbout = () => {
  const [editMode, setEditMode] = useState(false);

  const { id } = useParams();
  const { profile } = useProfile(id || "");

  const handleSuccess = () => {
    setEditMode(false);
  };

  return (
    <Box>
      <Box
        display="flex"
        justifyContent="space-between"
      >
        <Typography variant="h5">About {profile?.displayName}</Typography>
        <Button onClick={() => setEditMode(!editMode)}>
          {editMode ? "Cancel" : "Edit profile"}
        </Button>
      </Box>
      <Divider sx={{ my: 2 }} />

      <Box sx={{ overflow: "auto", maxHeight: 350 }}>
        {editMode ? (
          <ProfileEditForm
            editProfile={{
              displayName: profile?.displayName || "",
              bio: profile?.bio,
            }}
            handleSuccess={handleSuccess}
          />
        ) : (
          <Typography
            variant="body1"
            sx={{ whiteSpace: "pre-wrap" }}
          >
            {profile?.bio || "No description added yet"}
          </Typography>
        )}
      </Box>
    </Box>
  );
};
