namespace WebApi.Controllers
{
    using AutoMapper;
    using Core.Entities;
    using Data.Context;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.EntityFrameworkCore;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using WebApi.Resources;

    [Route("api/[controller]")]
    public class ModelsController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public ModelsController(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<IEnumerable<KeyValuePairResource>> GetModels()
        {
            var models = await _context.Models.Include(m => m.Make).ToListAsync();

            return _mapper.Map<List<Model>, List<KeyValuePairResource>>(models);
        }
    }
}
