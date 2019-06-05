namespace WebApi.Resources
{
    using System;
    using System.Collections.Generic;
    using System.Collections.ObjectModel;
    using System.ComponentModel.DataAnnotations;
    using System.Linq;
    using System.Threading.Tasks;

    public class SaveVehicleResource
    {
        public int Id { get; set; }

        public int ModelId { get; set; }

        public bool IsRegistered { get; set; }

        [Required]
        public ContactResource Contact { get; set; }

        public ICollection<int> VehicleFeatures { get; set; }

        public SaveVehicleResource()
        {
            VehicleFeatures = new Collection<int>();
        }
    }
}
