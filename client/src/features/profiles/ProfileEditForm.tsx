import { useForm } from "react-hook-form";
import { Box, Button } from "@mui/material";
import TextInput from "../../app/shared/components/TextInput";
import {
  editprofileSchema,
  type EditprofileSchema,
} from "../../lib/schemas/editProfileSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useProfile } from "../../lib/hooks/useProfile";
import { useParams } from "react-router";
import { useEffect } from "react";

type Props = {
  editProfile: EditProfile;
  handleSuccess: () => void;
};

export const ProfileEditForm = ({ editProfile, handleSuccess }: Props) => {
  const { id } = useParams();

  const { updateProfile } = useProfile(id || "");

  console.log({ editProfile });

  const {
    control,
    reset,
    handleSubmit,
    formState: { isDirty, isValid },
  } = useForm<EditprofileSchema>({
    mode: "onTouched",
    resolver: zodResolver(editprofileSchema),
  });

  const onSubmit = async (data: EditprofileSchema) => {
    try {
      console.log(data);

      updateProfile.mutate(
        { ...data },
        {
          onSuccess: handleSuccess,
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (editProfile)
      reset({
        ...editProfile,
      });
  }, [editProfile, reset]);

  return (
    <Box
      component="form"
      display="flex"
      flexDirection="column"
      gap={3}
      mt={3}
      onSubmit={handleSubmit(onSubmit)}
    >
      <TextInput
        label="Display Name"
        control={control}
        name="displayName"
      />
      <TextInput
        label="Add you bio"
        control={control}
        name="bio"
        multiline
        rows={3}
      />
      <Button
        color="info"
        variant="contained"
        type="submit"
        loading={updateProfile.isPending}
        disabled={!isValid || !isDirty || updateProfile.isPending}
      >
        Update Profile
      </Button>
    </Box>
  );
};
