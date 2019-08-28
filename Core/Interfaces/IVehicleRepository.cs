namespace Core.Interfaces
{
    using Core.Entities;
    using System.Collections.Generic;
    using System.Threading.Tasks;

    public interface IVehicleRepository
    {
        Task<Vehicle> GetVehicle(int id, bool includeRelated = true);
        void AddVehicle(Vehicle vehicle);
        void RemoveVehicle(Vehicle vehicle);
        Task<IEnumerable<Vehicle>> GetVehicles(Filter filter);
    }
}
