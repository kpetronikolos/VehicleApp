using Core.Extensions;
using System;
using System.Collections.Generic;
using System.Text;

namespace Core.Entities
{
    public class Filter : IQueryObject
    {
        public int? MakeId { get; set; }

        public int? ModelId { get; set; }
    }
}
