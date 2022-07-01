using System.ComponentModel;
using static Google.Apis.Books.v1.VolumesResource.ListRequest;

namespace Bs.Dto
{
    public class VolumeGetListCriteriaDto
    {
        public string Query { get; set; }
        
        public long? StartIndex { get; set; }
        
        public long? MaxResults { get; set; }
        public OrderByEnum? OrderBy { get; set; }
    }
}