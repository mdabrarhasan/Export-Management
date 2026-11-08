using ImportExport.UI.Models.AgreementModel;
using ImportExport.UI.Models.CommonModel;
using ImportExport.UI.Models.LCModel;
using ImportExport.UI.Models.LCVSBILL;

namespace ImportExport.UI.Service.LCVSBILLService
{
    public interface ILCVSBILL
    {
        IQueryable<LCVSBILLView> GetLCDetails(int id);

        IQueryable<DropDownBind> GetLCNO(string prefix);
        IQueryable<DropDownBind> GetShipment();
        string Save(LCVSBILL lcbill);
        string Update(LCVSBILL lcbill);
        string UpdateRM(UPDATERMBY master);
        string Delete(int id);
    }
}
