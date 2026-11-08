using ImportExport.UI.Models.CommonModel;
using ImportExport.UI.Models.ExchangeRateModel;
using ImportExport.UI.Service.CommonService;
using ImportExport.UI.Service.ExchangeRateService;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System.Data;

namespace ImportExport.UI.Repository.ExchangeRateRepository
{
    public class RExchangeRate : IExchangeRate
    {
        private Context _context;
        private ICommon _common;
        UserInfo info = new UserInfo();

        string strMsg = "";

        public RExchangeRate(Context context, ICommon common)
        {
            _context = context;
            _common = common;
        }

        public IQueryable<SellerUnitModel> GetSellerUnits()
        {
            try
            {
                return _context.SellerUnitModel
                    .FromSqlRaw("Exec SPGETSELLERUNITS");
            }
            catch (Exception ex)
            {
                _common.ErrorLog("", ex.ToString(),
                    enumSubMenu.SQ00001.ToString(),
                    enumProcessName.SQ.ToString(),
                    info.UnitID, info.Enroll, "");
            }
            return null;
        }

        public IQueryable<ExchangeRateModel> GetAll()
        {
            try
            {
                SqlParameter Type = new SqlParameter("@TYPE", 1);
                return _context.ExchangeRateModel
                    .FromSqlRaw("Exec SPGETEXCHANGERATE @TYPE", Type);
            }
            catch (Exception ex)
            {
                _common.ErrorLog("", ex.ToString(),
                    enumSubMenu.SQ00001.ToString(),
                    enumProcessName.SQ.ToString(),
                    info.UnitID, info.Enroll, "");
            }
            return null;
        }

        public string Save(ExchangeRateModel exchange)
        {
            strMsg = exchange.ID.ToString();
            try
            {
                var parameters = new[]
                {
                    new SqlParameter("@ID", exchange.ID),
                    new SqlParameter("@UNITID", exchange.UNITID),
                    new SqlParameter("@EXCHANGERATE", (object)exchange.EXCHANGERATE ?? DBNull.Value),
                    new SqlParameter("@RATEDATE", (object)exchange.RATEDATE ?? DBNull.Value),
                    new SqlParameter("@CREATEDBY", exchange.CREATEDBY),
                    new SqlParameter("@UPDATEDBY", exchange.UPDATEDBY),
                    new SqlParameter
                    {
                        ParameterName = "@MSG",
                        Size = 200,
                        SqlDbType = SqlDbType.VarChar,
                        Direction = ParameterDirection.Output
                    }
                };

                _context.Database.ExecuteSqlRaw(
                    "Exec SPSAVEEXCHANGERATE @ID,@UNITID,@EXCHANGERATE,@RATEDATE,@CREATEDBY,@UPDATEDBY,@MSG output",
                    parameters);

                strMsg = parameters.Last().Value.ToString();
            }
            catch (Exception ex)
            {
                _common.ErrorLog(strMsg, ex.ToString(),
                    enumSubMenu.SQ00001.ToString(),
                    enumProcessName.SQ.ToString(),
                    info.UnitID, info.Enroll, "");
                strMsg = "error: " + ex.Message;
            }
            return strMsg;
        }

        public string Delete(int id, int enroll)
        {
            strMsg = id.ToString();
            try
            {
                var parameters = new[]
                {
                    new SqlParameter("@ID", id),
                    new SqlParameter("@UPDATEDBY", enroll),
                    new SqlParameter
                    {
                        ParameterName = "@MSG",
                        Size = 200,
                        SqlDbType = SqlDbType.VarChar,
                        Direction = ParameterDirection.Output
                    }
                };

                _context.Database.ExecuteSqlRaw(
                    "Exec SPDELETEEXCHANGERATE @ID,@UPDATEDBY,@MSG output",
                    parameters);

                strMsg = parameters.Last().Value.ToString();
            }
            catch (Exception ex)
            {
                _common.ErrorLog(strMsg, ex.ToString(),
                    enumSubMenu.SQ00001.ToString(),
                    enumProcessName.SQ.ToString(),
                    info.UnitID, info.Enroll, "");
                strMsg = "error: " + ex.Message;
            }
            return strMsg;
        }
    }
}