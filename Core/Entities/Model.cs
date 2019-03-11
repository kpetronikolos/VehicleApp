using System;
using System.Collections.Generic;
using System.Text;

namespace Core.Entities
{
    public class Model
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public Make Make { get; set; }

        public int MakeId { get; set; }
    }
}
