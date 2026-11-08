using ImportExport.UI.Models.CommonModel;
using ImportExport.UI.Models.LCBankInfoModel;

namespace ImportExport.UI.Service.LCBankInfoService
{
    public interface ILCBankInfo
    {
        List<LCBankInfoModelView> GetLCBankInfoAll();
        IQueryable<DropDownBind> GetInvoiceByLC(int lcid);
        IQueryable<DropDownBind> GetLCNO(string prefix);
        IQueryable<DropDownBind> LoadInvoice(int lcid);

        IQueryable<DropDownBind> GetStatus();
        IQueryable<DropDownBind> GetInvoiceNO(int lcdid);
        string Save(LCBankInfoModel lcbankinfo);
        string Update(LCBankInfoModel lcbankinfo);
        string Delete(int id);
    }
}
