﻿using System;
using System.Collections.Generic;
using System.Text;

namespace Core.Entities
{
    public class Filter
    {
        public int? MakeId { get; set; }

        public int? ModelId { get; set; }

        public string SortBy { get; set; }

        public bool IsSortAscending { get; set; }
    }
}
