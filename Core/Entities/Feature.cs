namespace Core.Entities
{
    using System;
    using System.Collections.Generic;
    using System.Collections.ObjectModel;
    using System.ComponentModel.DataAnnotations;
    using System.Text;

    public class Feature
    {
        public int Id { get; set; }

        [Required]
        [StringLength(255)]
        public string Name { get; set; }

        public ICollection<VehicleFeature> VehicleFeatures { get; set; }

        public Feature()
        {
            VehicleFeatures = new Collection<VehicleFeature>();
        }
    }
}
