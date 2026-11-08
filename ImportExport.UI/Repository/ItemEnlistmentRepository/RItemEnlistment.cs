using ImportExport.UI.Models.CommonModel;
using ImportExport.UI.Models.ItemEnlistmentModel;
using ImportExport.UI.Service.CommonService;
using ImportExport.UI.Service.ItemEnlistmentService;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System.Data;

namespace ImportExport.UI.Repository.ItemEnlistmentRepository
{
    public class RItemEnlistment : IItemEnlistment
    {
        private Context _context;
        private ICommon _common;
        UserInfo info = new UserInfo();

        string strMsg = "";

        public RItemEnlistment(Context context, ICommon common)
        {
            _context = context;
            _common = common;
        }

        public IQueryable<ItemSellerUnitModel> GetSellerUnits()
        {
            try
            {
                return _context.ItemSellerUnitModel
                    .FromSqlRaw("Exec SPGETSELLERUNITSFORITEMENLIST");
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

        public IQueryable<ItemTypeModel> GetItemTypesByUnit(int unitId)
        {
            try
            {
                SqlParameter unit = new SqlParameter("@UNITID", unitId);
                return _context.ItemTypeModel
                    .FromSqlRaw("Exec SPGETITEMTYPEBYUNIT @UNITID", unit);
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

        public IQueryable<ItemEnlistmentModel> GetAll()
        {
            try
            {
                SqlParameter Type = new SqlParameter("@TYPE", 1);
                return _context.ItemEnlistmentModel
                    .FromSqlRaw("Exec SPGETITEMENLIST @TYPE", Type);
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

        public string Save(ItemEnlistmentModel item)
        {
            strMsg = item.ID.ToString();
            try
            {
                var parameters = new[]
                {
                    new SqlParameter("@ID", item.ID),
                    new SqlParameter("@UNITID", item.UNITID),
                    new SqlParameter("@LEVELONEID", item.LEVELONEID),
                    new SqlParameter("@PRODUCTNAME", (object)item.productname ?? DBNull.Value),
                    new SqlParameter("@CATEGORYCODE", (object)item.categorycode ?? DBNull.Value),
                    new SqlParameter("@CREATEDBY", item.CREATEDBY),
                    new SqlParameter("@UPDATEDBY", item.UPDATEDBY),
                    new SqlParameter
                    {
                        ParameterName = "@MSG",
                        Size = 200,
                        SqlDbType = SqlDbType.VarChar,
                        Direction = ParameterDirection.Output
                    }
                };

                _context.Database.ExecuteSqlRaw(
                    "Exec SPSAVEITEMENLIST @ID,@UNITID,@LEVELONEID,@PRODUCTNAME,@CATEGORYCODE,@CREATEDBY,@UPDATEDBY,@MSG output",
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

        public IQueryable<ItemTypeModel> GetProductCategories()
        {
            try
            {
                return _context.ItemTypeModel
                    .FromSqlRaw("Exec SPGETPRODUCTCATEGORY");
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

        public string Delete(long id, int enroll)
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
                    "Exec SPDELETEITEMENLIST @ID,@UPDATEDBY,@MSG output",
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