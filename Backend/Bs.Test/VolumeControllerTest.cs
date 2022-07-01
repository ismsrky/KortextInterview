using Bs.Controllers;
using Bs.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bs.Test
{
    
    public class VolumeControllerTest
    {
        [Fact]
        public async void ResponseNotNull()
        {
            VolumeController volumeController = new VolumeController();
            ResponseDto<List<VolumeDto>> responseDto = await volumeController.GetListAsync(new Dto.VolumeGetListCriteriaDto()
            {
                StartIndex = 0,
                MaxResults = 100,
                Query = "asd"
            });

            Assert.NotNull(responseDto);
        }

        [Fact]
        public async void QueryNotNull()
        {
            VolumeController volumeController = new VolumeController();
            ResponseDto<List<VolumeDto>> responseDto = await volumeController.GetListAsync(new Dto.VolumeGetListCriteriaDto()
            {
                StartIndex = 0,
                MaxResults = 100,
                Query = null
            });

            Assert.False(responseDto.IsSuccess);
        }
    }
}