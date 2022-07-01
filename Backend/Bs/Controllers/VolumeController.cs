using Bs.Dto;
using Google.Apis.Books.v1;
using Google.Apis.Books.v1.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using static Google.Apis.Books.v1.VolumesResource;

namespace Bs.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VolumeController : ControllerBase
    {
        readonly BooksService booksService;

        public VolumeController()
        {
            booksService = new BooksService();
        }

        [AllowAnonymous]
        [HttpPost("GetList")]
        public async Task<ResponseDto<List<VolumeDto>>> GetListAsync(VolumeGetListCriteriaDto dto)
        {
            ResponseDto<List<VolumeDto>> responseDto = new ResponseDto<List<VolumeDto>>();

            if (dto == null)
            {
                responseDto.Failed("Invalid Data");

                return responseDto;
            }

            if (string.IsNullOrEmpty(dto.Query))
            {
                responseDto.Failed("Please type some text to search");

                return responseDto;
            }

            try
            {
                ListRequest listRequest = booksService.Volumes.List(dto.Query);
                listRequest.StartIndex = dto.StartIndex;
                listRequest.MaxResults = dto.MaxResults;
                listRequest.OrderBy = dto.OrderBy;

                Volumes volumes = await listRequest.ExecuteAsync();

                List<VolumeDto> list = new List<VolumeDto>();

                foreach (Volume item in volumes.Items)
                {
                    list.Add(new VolumeDto()
                    {
                        Title = item.VolumeInfo.Title,
                        Authors = item.VolumeInfo.Authors == null || item.VolumeInfo.Authors.Count() == 0 ? null : string.Join(",", item.VolumeInfo.Authors),
                        PublishedDate = item.VolumeInfo.PublishedDate,
                        Thumbnail = item.VolumeInfo.ImageLinks?.Thumbnail,
                        SearchInfo = item.SearchInfo?.TextSnippet
                    });
                }

                responseDto.Success(list);
            }
            catch (Exception ex)
            {
                responseDto.FailedWithException(ex);
            }

            return responseDto;
        }
    }
}