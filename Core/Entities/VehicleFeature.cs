using System;
using System.Collections.Generic;
using System.Text;

namespace Core.Entities
{
    public class VehicleFeature
    {
        public int VehicleId { get; set; }
        public int FeatureId { get; set; }

        public Vehicle Vehicle { get; set; }
        public Feature Feature { get; set; }
    }
}
