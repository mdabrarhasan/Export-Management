using ImportExport.UI.Models.CommonModel;
using ImportExport.UI.Models.FreightCost;
using ImportExport.UI.Service.FreightCostService;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System.Data;
using System.Diagnostics.Metrics;

namespace ImportExport.UI.Repository.RFreightCost
{
    public class RFreightCost : IFreightCost
    {

        private  Context _context;
        string mgs = "";
        public RFreightCost(Context context)
        {
            _context = context;

        }

        public IQueryable<FreightCostLineDetails> GetPIDetailsData(int id)
        {
            SqlParameter ID = new SqlParameter("@ID", id);
            return _context.FreightCostLineDetails.FromSqlRaw("EXEC SPGETFREIGHTLINEDETAILSBYID @ID", ID);
            
        }  

        public IQueryable<FreightCostMaster> Getdata(int id)
        {
            SqlParameter ID = new SqlParameter("@ID", id);
            
            return _context.FreightCostMaster.FromSqlRaw("EXEC SPGETFREIGHTDATA @ID", ID);
            
        }  

        public IQueryable<DropDownBind> GetPackingData(int id)
        {
            SqlParameter PISCID = new SqlParameter("@PISCID", id);
            
            return _context.DropDownBind.FromSqlRaw("EXEC SPGETPACKINGDATA @PISCID", PISCID);
            
        }  

        public IQueryable<FreightCostMaster> ViewCData(int id)
        {
            SqlParameter ID = new SqlParameter("@ID", id);
            
            return _context.FreightCostMaster.FromSqlRaw("EXEC SPGetViewCData @ID", ID);
            
        } 

        public IQueryable<DropDownBind> GetCostItemList()
        {
            
            return _context.DropDownBind.FromSqlRaw("EXEC SPGETCOSTITEMLIST");

        }  
        public IQueryable<DropDownBind> GetItemListByShipNo(int id)
        {
            SqlParameter COSTTYPEID = new SqlParameter("@COSTTYPEID", id);
            return _context.DropDownBind.FromSqlRaw("EXEC SPGETITEMLISTBYSHIPNO @COSTTYPEID", COSTTYPEID);
            
        }
        
        public string Save(FreightCostMaster master, FreightCostLine[] fcl)
        {
            string mgs = "";

            try
            {
                if (fcl == null || fcl.Length == 0)
                {
                    return "No details found!";
                }

                DataTable details = new DataTable();
                details.Columns.Add("LCMTYPEID", typeof(int));
                details.Columns.Add("ITEMCOSTID", typeof(int));
                details.Columns.Add("COST", typeof(decimal));
                details.Columns.Add("CCRATE", typeof(decimal));
                details.Columns.Add("TOTALAMOUNTLINE", typeof(decimal));
                details.Columns.Add("REMARKS", typeof(string));

                for (int i = 0; i < fcl.Length; i++)
                {
                    details.Rows.Add(
                        fcl[i].LCMTYPEID,
                        fcl[i].ITEMCOSTID,
                        fcl[i].COST,
                        fcl[i].CCRATE,
                        fcl[i].TOTALAMOUNT,
                        fcl[i].REMARKS ?? ""
                    );
                }

                SqlParameter detailsparam = new SqlParameter
                {
                    ParameterName = "@TYPEFREIGHTCOSTLINE",
                    SqlDbType = SqlDbType.Structured,
                    TypeName = "TYPEFREIGHTCOSTLINE",
                    SqlValue = details
                };

                SqlParameter UNIT = new SqlParameter("@UNIT", master.UNIT);
                SqlParameter SCID = new SqlParameter("@SCID", master.SCID);
                SqlParameter PRID = new SqlParameter("@PRID", master.PRID); 
                SqlParameter ENROLL = new SqlParameter("@ENROLL", master.DOCUMENTCREATEDBY);
                SqlParameter SUPPLIERID = new SqlParameter("@SUPPLIERID", (object)master.SUPPLIERID ?? DBNull.Value);

                var outParam = new SqlParameter
                {
                    ParameterName = "@Msg",
                    Size = 100,
                    SqlDbType = SqlDbType.VarChar,
                    Direction = ParameterDirection.Output
                };

                _context.Database.ExecuteSqlRaw(
                    "Exec SPSAVEFREIGHTCOST @TYPEFREIGHTCOSTLINE,@SCID,@PRID,@UNIT,@ENROLL,@SUPPLIERID,@Msg output",
                    detailsparam, SCID, PRID, UNIT, ENROLL, SUPPLIERID, outParam
                );

                mgs = outParam.Value?.ToString();
            }
            catch (Exception ex)
            {
                mgs = ex.Message;
            }

            return mgs;
        }

        public string Update(FreightCostUpdate master)
        {
            try
            {
                SqlParameter FCID = new SqlParameter("@FCID", master.FCID);
                SqlParameter FCLID = new SqlParameter("@FCLID", master.FCLID);
                SqlParameter LCMTYPEID = new SqlParameter("@LCMTYPEID", master.LCMTYPEID);
                SqlParameter ITEMCOSTID = new SqlParameter("@ITEMCOSTID", master.ITEMCOSTID);
                SqlParameter COST = new SqlParameter("@COST", master.COST);
                SqlParameter REMARKS = new SqlParameter("@REMARKS", (object)master.REMARKS ?? DBNull.Value);

                var outParam = new SqlParameter
                {
                    ParameterName = "@Msg",
                    Size = 100,
                    SqlDbType = SqlDbType.VarChar,
                    Direction = ParameterDirection.Output
                };

                _context.Database.ExecuteSqlRaw(
                    "Exec SPUPDATEFREIGHTCOST @FCID,@FCLID,@LCMTYPEID,@ITEMCOSTID,@COST,@REMARKS,@Msg output",
                    FCID, FCLID, LCMTYPEID, ITEMCOSTID, COST, REMARKS, outParam
                );

                mgs = outParam.Value?.ToString();
            }
            catch (Exception ex)
            {
                mgs = ex.Message;
            }
            return mgs;
        }

        public IQueryable<DropDownBind> GetPISCWithPacking(string prefix)
        {
            SqlParameter PREFIX = new SqlParameter("@PREFIX", (object)prefix ?? "");
            return _context.DropDownBind.FromSqlRaw("EXEC SPGETPISCWITHPACKING @PREFIX", PREFIX);
        }

        public IQueryable<DropDownBind> GetSupplierByUnit(int unitid, string prefix)
        {
            SqlParameter UNITID = new SqlParameter("@UNITID", unitid);
            SqlParameter PREFIX = new SqlParameter("@PREFIX", (object)prefix ?? "");
            return _context.DropDownBind.FromSqlRaw("EXEC SPGETSUPPLIERBYUNIT @UNITID,@PREFIX", UNITID, PREFIX);
        }

        public string DeleteMaster(FreightCostUpdate del)
        {
            try
            {
                SqlParameter DELID = new SqlParameter("@DELID", del.DELID);
                var outParam = new SqlParameter
                {
                    ParameterName = "@Msg",
                    Size = 100,
                    SqlDbType = SqlDbType.VarChar,
                    Direction = ParameterDirection.Output
                };

                _context.Database.ExecuteSqlRaw("Exec SPDELETEMASTERFREIGHTCOST @DELID,@Msg output", DELID, outParam);
                mgs = outParam.Value?.ToString();
            }
            catch (Exception ex)
            {
                mgs = ex.Message;
            }
            return mgs;
        }

        public string DeleteLine(FreightCostUpdate del)
        {
            try
            {
                SqlParameter DELID = new SqlParameter("@DELID", del.DELID);
                var outParam = new SqlParameter
                {
                    ParameterName = "@Msg",
                    Size = 100,
                    SqlDbType = SqlDbType.VarChar,
                    Direction = ParameterDirection.Output
                };

                _context.Database.ExecuteSqlRaw("Exec SPDELETEFREIGHTCOSTLINE @DELID,@Msg output", DELID, outParam);
                mgs = outParam.Value?.ToString();
            }
            catch (Exception ex)
            {
                mgs = ex.Message;
            }
            return mgs;
        }
    }
}
