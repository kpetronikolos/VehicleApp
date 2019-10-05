namespace Core.Extensions
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Linq.Expressions;
    using System.Text;

    public static class IQueryableExtensions
    {
        public static IQueryable<T> ApplyOrdering<T>(IQueryObject filter, IQueryable<T> query, Dictionary<string, Expression<Func<T, object>>> columnsMap)
        {
            if (String.IsNullOrEmpty(filter.SortBy) || !columnsMap.ContainsKey(filter.SortBy))
            {
                return query;
            }

            return filter.IsSortAscending ? query.OrderBy(columnsMap[filter.SortBy]) : query.OrderByDescending(columnsMap[filter.SortBy]);
        }
    }
}
