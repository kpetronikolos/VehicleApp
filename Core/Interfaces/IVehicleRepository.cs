namespace Core.Interfaces
{
    using Core.Entities;
    using System.Threading.Tasks;

    public interface IVehicleRepository
    {
        Task<Vehicle> GetVehicle(int id);
    }
}
