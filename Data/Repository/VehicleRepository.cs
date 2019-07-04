namespace Data.Repository
{
    using Core.Entities;
    using Core.Interfaces;
    using Data.Context;
    using Microsoft.EntityFrameworkCore;
    using System;
    using System.Collections.Generic;
    using System.Text;
    using System.Threading.Tasks;

    public class VehicleRepository : IVehicleRepository
    {
        private readonly DataContext _context;

        public VehicleRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<Vehicle> GetVehicle(int id)
        {
            return await _context.Vehicles
                .Include(v => v.VehicleFeatures)
                .ThenInclude(vf => vf.Feature)
                .Include(v => v.Model)
                .ThenInclude(m => m.Make)
                .SingleOrDefaultAsync(v => v.Id == id);                
        } 
    }
}
