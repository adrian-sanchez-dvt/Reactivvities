using System;
using Application.Core;
using Application.Interfaces;
using Application.Profiles.DTOs;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Profiles.Queries;

public class GetUserActivities
{
    public class Query : IRequest<Result<List<UserActivityDto>>>
    {
        public required string UserId { get; set; }
        public required string Filter { get; set; }
    }

    public class Handler(AppDbContext context, IMapper mapper)
    : IRequestHandler<Query, Result<List<UserActivityDto>>>
    {
        public async Task<Result<List<UserActivityDto>>> Handle(Query request, CancellationToken cancellationToken)
        {

            var query = context.ActivityAttendees
                .Where(x => x.User.Id == request.UserId)
                .Select(x => x.Activity)
                .OrderBy(x => x.Date)
                .AsQueryable();

            var today = DateTime.UtcNow;

            if (!string.IsNullOrEmpty(request.Filter))
            {
                query = request.Filter switch
                {
                    "future" => query.Where(x =>
                        x.Date >= today),
                    "past" => query.Where(x =>
                        x.Date <= today),
                    "hosting" => query.Where(x =>
                        x.Attendees.Any(a => a.IsHost && a.UserId == request.UserId)),
                    _ => query.Where(a => a.Date >= today
                            && a.Attendees.Any(x => x.UserId == request.UserId))
                };
            }

            var projectedUserActivities = query
                .ProjectTo<UserActivityDto>(mapper.ConfigurationProvider);

            var result = await projectedUserActivities
                .ToListAsync(cancellationToken);

            return Result<List<UserActivityDto>>.Success(result);

        }

    }
}
