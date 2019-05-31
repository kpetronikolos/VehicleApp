namespace WebApi.Resources
{
    using System;
    using System.Collections.Generic;
    using System.Collections.ObjectModel;
    using System.ComponentModel.DataAnnotations;
    using System.Linq;
    using System.Threading.Tasks;

    public class VehicleResource
    {
        public int ModelId { get; set; }

        public bool IsRegistered { get; set; }

        [Required]
        public ContactResource Contact { get; set; }

        public ICollection<int> VehicleFeatures { get; set; }

        public VehicleResource()
        {
            VehicleFeatures = new Collection<int>();
        }
    }
}
