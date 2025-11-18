using System;
using Application.Profiles.Commands;
using FluentValidation;


public class EditProfileValidator : AbstractValidator<EditProfile.Command>
{
    public EditProfileValidator()
    {
        RuleFor(x => x.Profile.DisplayName).NotEmpty();
    }
}
