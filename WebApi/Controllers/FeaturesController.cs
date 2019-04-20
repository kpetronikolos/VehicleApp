namespace WebApi.Controllers
{
    using Core.Entities;
    using Data.Context;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.EntityFrameworkCore;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;

    [Route("api/[controller]")]
    public class FeaturesController : ControllerBase
    {
        private readonly DataContext _context;

        public FeaturesController(DataContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Feature>> GetFeatures()
        {
            return await _context.Features.ToListAsync();
        }
    }
}
