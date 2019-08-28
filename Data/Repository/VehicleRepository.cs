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
    using System.Linq;

    public class VehicleRepository : IVehicleRepository
    {
        private readonly DataContext _context;

        public VehicleRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<Vehicle> GetVehicle(int id, bool includeRelated = true)
        {
            if (!includeRelated)
            {
                return await _context.Vehicles.FindAsync(id);
            }

            return await _context.Vehicles
                .Include(v => v.VehicleFeatures)
                .ThenInclude(vf => vf.Feature)
                .Include(v => v.Model)
                .ThenInclude(m => m.Make)
                .SingleOrDefaultAsync(v => v.Id == id);                
        }
        
        public void AddVehicle(Vehicle vehicle)
        {
            _context.Vehicles.Add(vehicle);
        }

        public void RemoveVehicle(Vehicle vehicle)
        {
            _context.Vehicles.Remove(vehicle);
        }

        public async Task<IEnumerable<Vehicle>> GetVehicles(Filter filter)
        {
            var query = _context.Vehicles
                .Include(v => v.VehicleFeatures)
                .ThenInclude(vf => vf.Feature)
                .Include(v => v.Model)
                .ThenInclude(m => m.Make).AsQueryable();

            if (filter.MakeId.HasValue)
            {
                query = query.Where(v => v.Model.MakeId == filter.MakeId);
            }

            if (filter.ModelId.HasValue)
            {
                query = query.Where(v => v.ModelId == filter.ModelId);
            }

            return await query.ToListAsync();
        }
    }
}
