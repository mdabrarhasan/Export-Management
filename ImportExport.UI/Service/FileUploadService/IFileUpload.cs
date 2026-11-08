using ImportExport.UI.Models.CommonModel;
using ImportExport.UI.Models.File;
using System.Data;

namespace ImportExport.UI.Service.FileUploadService
{
    public interface IFileUpload
    {
        string SaveFile(DataTable dt);

     
    }
}
