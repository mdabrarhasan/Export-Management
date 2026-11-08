using Humanizer;
using ImportExport.UI.Models.AgreementModel;
using ImportExport.UI.Models.CommonModel;
using ImportExport.UI.Models.PackingRequestModel;
using ImportExport.UI.Service.CommonService;
using ImportExport.UI.Service.PackingRequestService;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System.Data;

namespace ImportExport.UI.Repository.PackingRequestRepository
{
    public class RPackingRequest : IPackingRequest
    {
        string strMsg = "";
        int UnitID = 0;
        int Enroll = 0;


        private Context _context;
        private ICommon _common;
        public RPackingRequest(Context context, ICommon common)
        {
            _context = context;
            _common = common;
        }


        public string DeleteDetailsByID(int id, int enroll, int unitid)
        {
            try
            {
                SqlParameter ID = new SqlParameter("@id", id);
                SqlParameter DOCUMENTCREATEDBY = new SqlParameter("@DOCUMENTCREATEDBY", enroll);
                SqlParameter UNITID = new SqlParameter("@UNITID", unitid);
                SqlParameter ModuleCode = new SqlParameter("@ModuleCode", enumSubMenu.PR00001.ToString());
                SqlParameter ProcessCode = new SqlParameter("@ProcessCode", enumProcessName.PR.ToString());
                SqlParameter MessageName = new SqlParameter("@MessageName", enumPRMessage.PRDEL.ToString());

                var outParam = new SqlParameter
                {
                    ParameterName = "@Msg",
                    Size = 100,
                    SqlDbType = System.Data.SqlDbType.Char,
                    Direction = System.Data.ParameterDirection.Output
                };

                _context.Database.ExecuteSqlRaw("Exec SPDELETEPACKINGREQUESTLINE @id,@DOCUMENTCREATEDBY,@UNITID,@ModuleCode,@ProcessCode,@MessageName,@Msg output", ID, DOCUMENTCREATEDBY, UNITID, ModuleCode, ProcessCode, MessageName, outParam);
                strMsg = outParam.Value.ToString();
            }
            catch (Exception ex)
            {
                _common.ErrorLog(strMsg, ex.ToString(), enumSubMenu.PR00001.ToString(), enumProcessName.PR.ToString(), unitid, enroll, "");
            }
            finally { }

            return strMsg;
        }
        public string DeleteMasterByID(int id, int enroll, int unitid)
        {
            try
            {
                SqlParameter ID = new SqlParameter("@id", id);
                SqlParameter DOCUMENTCREATEDBY = new SqlParameter("@DOCUMENTCREATEDBY", enroll);
                SqlParameter UNITID = new SqlParameter("@UNITID", unitid);
                SqlParameter ModuleCode = new SqlParameter("@ModuleCode", enumSubMenu.PR00001.ToString());
                SqlParameter ProcessCode = new SqlParameter("@ProcessCode", enumProcessName.PR.ToString());
                SqlParameter MessageName = new SqlParameter("@MessageName", enumPRMessage.PRDEL.ToString());

                var outParam = new SqlParameter
                {
                    ParameterName = "@Msg",
                    Size = 100,
                    SqlDbType = System.Data.SqlDbType.Char,
                    Direction = System.Data.ParameterDirection.Output
                };

                _context.Database.ExecuteSqlRaw("Exec SPDELETEPACKINGREQUEST @id,@DOCUMENTCREATEDBY,@UNITID,@ModuleCode,@ProcessCode,@MessageName,@Msg output", ID, DOCUMENTCREATEDBY, UNITID, ModuleCode, ProcessCode, MessageName, outParam);
                strMsg = outParam.Value.ToString();
            }
            catch (Exception ex)
            {
                _common.ErrorLog(strMsg, ex.ToString(), enumSubMenu.PR00001.ToString(), enumProcessName.PR.ToString(), unitid, enroll, "");
            }
            finally { }

            return strMsg;
        }
        public IQueryable<PackingRequestLandingDetails> EditByDetailsID(int id, int unitid, int enroll)
        {
            try
            {
                int type = 2;
                SqlParameter Type = new SqlParameter("@Type", type);
                SqlParameter Enroll = new SqlParameter("@Enroll", enroll);
                SqlParameter ID = new SqlParameter("@ID", id);
                SqlParameter UnitID = new SqlParameter("@UnitID", unitid);
                return _context.PackingRequestLandingDetails.FromSqlRaw("Exec SPGETPACKINGREQLANDING @Type,@Enroll,@ID,@UnitID", Type, Enroll, ID, UnitID);
            }
            catch (Exception ex)
            {
                _common.ErrorLog("", ex.ToString(), enumSubMenu.PR00001.ToString(), enumProcessName.PR.ToString(), unitid, enroll, "");
            }
            finally
            { }
            return null;
        }
        public IQueryable<PackingRequestLandingView> EditByMasterID(int id, int unitid, int enroll)
        {
            try
            {
                int type = 1;
                SqlParameter Type = new SqlParameter("@Type", type);
                SqlParameter Enroll = new SqlParameter("@Enroll", enroll);
                SqlParameter ID = new SqlParameter("@ID", id);
                SqlParameter UnitID = new SqlParameter("@UnitID", unitid);
                return _context.PackingRequestLandingView.FromSqlRaw("Exec SPGETPACKINGREQLANDING @Type,@Enroll,@ID,@UnitID", Type, Enroll,ID,UnitID);
            }
            catch (Exception ex)
            {
                _common.ErrorLog("", ex.ToString(), enumSubMenu.PR00001.ToString(), enumProcessName.PR.ToString(), unitid, enroll, "");
            }
            finally
            { }
            return null;
        }


        public IQueryable<CheckQty> GetCheckQty(int pinumber,int itemid)
        {
            int type = 1;
            SqlParameter Type = new SqlParameter("@Type", type);
            SqlParameter PINUMBER = new SqlParameter("@PINUMBER", pinumber);
            SqlParameter ITEMID = new SqlParameter("@ITEMID", itemid);
            return _context.CheckQty.FromSqlRaw("Exec SPCHECKTOTALQTY @Type,@PINUMBER,@ITEMID", Type, PINUMBER, ITEMID);
        }

        public IQueryable<PackingRequestLanding> GetEditByMasterID(int id, int unitid, int enroll)
        {
            try
            {
                int type = 9;
                SqlParameter Type = new SqlParameter("@Type", type);
                SqlParameter Enroll = new SqlParameter("@Enroll", enroll);
                SqlParameter ID = new SqlParameter("@ID", id);
                SqlParameter UnitID = new SqlParameter("@UnitID", unitid);
                return _context.PackingRequestLanding.FromSqlRaw("Exec SPGETPACKINGREQLANDING @Type,@Enroll,@ID,@UnitID", Type, Enroll, ID, UnitID);
            }
            catch (Exception ex)
            {
                _common.ErrorLog("", ex.ToString(), enumSubMenu.PR00001.ToString(), enumProcessName.PR.ToString(), unitid, enroll, "");
            }
            finally
            { }
            return null;
        }


        public IQueryable<PackingRequestLandingHeader> ViewMasterOn(int id)
        {
            try
            {
              
                SqlParameter ID = new SqlParameter("@ID", id);
      
                return _context.PackingRequestLandingHeader.FromSqlRaw("Exec SPGetPackingRequestLandingHeader @ID", ID);
            }
            catch (Exception ex)
            {
               
            }
            finally
            { }
            return null;
        }


        public IQueryable<PackingRequestLandingView> ViewMaster(int id, int unitid, int enroll)
        {
            try
            {
                int type = 9;
                SqlParameter Type = new SqlParameter("@Type", type);
                SqlParameter Enroll = new SqlParameter("@Enroll", enroll);
                SqlParameter ID = new SqlParameter("@ID", id);
                SqlParameter UnitID = new SqlParameter("@UnitID", unitid);
                return _context.PackingRequestLandingView.FromSqlRaw("Exec SPGETPACKINGREQLANDING @Type,@Enroll,@ID,@UnitID", Type, Enroll, ID, UnitID);
            }
            catch (Exception ex)
            {
                _common.ErrorLog("", ex.ToString(), enumSubMenu.PR00001.ToString(), enumProcessName.PR.ToString(), unitid, enroll, "");
            }
            finally
            { }
            return null;
        }

        public IQueryable<PackingRequestDelSummary> EditByMasterIDSummary(int id, int unitid, int enroll)
        {
            try
            {
                int type = 3;
                SqlParameter Type = new SqlParameter("@Type", type);
                SqlParameter Enroll = new SqlParameter("@Enroll", enroll);
                SqlParameter ID = new SqlParameter("@ID", id);
                SqlParameter UnitID = new SqlParameter("@UnitID", unitid);
                return _context.PackingRequestDelSummary.FromSqlRaw("Exec SPGETPACKINGREQLANDING @Type,@Enroll,@ID,@UnitID", Type, Enroll, ID, UnitID);
            }
            catch (Exception ex)
            {
                _common.ErrorLog("", ex.ToString(), enumSubMenu.PR00001.ToString(), enumProcessName.PR.ToString(), unitid, enroll, "");
            }
            finally
            { }
            return null;
        }

        public IQueryable<PackingRequestAddSummery> AddByDetailsSummary(int id, int unitid, int enroll)
        {
            try
            {
                int type = 4;                   
                SqlParameter Type = new SqlParameter("@Type", type);
                SqlParameter Enroll = new SqlParameter("@Enroll", enroll);
                SqlParameter ID = new SqlParameter("@ID", id);
                SqlParameter UnitID = new SqlParameter("@UnitID", unitid);
                return _context.PackingRequestAddSummery.FromSqlRaw("Exec SPGETPACKINGREQLANDING @Type,@Enroll,@ID,@UnitID", Type, Enroll, ID, UnitID);
               // return _context.PackingRequestAddSummery.FromSqlRaw("Exec SPGETPACKINGREQLANDING @Type,@Enroll,@ID,@UnitID", Type, Enroll, ID, UnitID);
            }
            catch (Exception ex)
            {
                _common.ErrorLog("", ex.ToString(), enumSubMenu.PR00001.ToString(), enumProcessName.PR.ToString(), unitid, enroll, "");
            }
            finally
            { }
            return null;
        }


        public IQueryable<PackingRequestDelSummary> EditByDetailsSummary(int id, int unitid, int enroll)
        {
            try
            {
                int type = 4;                 
                SqlParameter Type = new SqlParameter("@Type", type);
                SqlParameter Enroll = new SqlParameter("@Enroll", enroll);
                SqlParameter ID = new SqlParameter("@ID", id);
                SqlParameter UnitID = new SqlParameter("@UnitID", unitid);
                return _context.PackingRequestDelSummary.FromSqlRaw("Exec SPGETPACKINGREQLANDING @Type,@Enroll,@ID,@UnitID", Type, Enroll, ID, UnitID);
            }
            catch (Exception ex)
            {
                _common.ErrorLog("", ex.ToString(), enumSubMenu.PR00001.ToString(), enumProcessName.PR.ToString(), unitid, enroll, "");
            }
            finally
            { }
            return null;
        }


        public string EditDetailsAdd(AgreementLandingDetails sqd, int enroll, int unitid)
        {
            throw new NotImplementedException();
        }
        public IQueryable<PackingRequestLandingView> GetAllData(int enroll, int unitid)
        {
            try
            {
                int type = 0;
                int id = 0;

                SqlParameter Type = new SqlParameter("@Type", type);
                SqlParameter Enroll = new SqlParameter("@Enroll", enroll);
                SqlParameter ID = new SqlParameter("@ID", id);
                SqlParameter UnitID = new SqlParameter("@UnitID", unitid);
                return _context.PackingRequestLandingView.FromSqlRaw("Exec SPGETPACKINGREQLANDING @Type,@Enroll,@ID,@UnitID", Type, Enroll, ID, UnitID);
            }
            catch (Exception ex)
            {
                _common.ErrorLog("", ex.ToString(), enumSubMenu.PR00001.ToString(), enumProcessName.PR.ToString(), unitid, enroll, "");
            }
            finally
            { }
            return null;
        }


        public string Save(PackingRequestLanding pr, PackingRequestLandingDetails[] prd)
        {
            try
            {
                DataTable details = new DataTable { TableName = "Details" };
                details.Columns.Add("ID", typeof(int));
                details.Columns.Add("ITEMID", typeof(int));
                details.Columns.Add("QUANTITY", typeof(decimal));
                details.Columns.Add("PACKINGREQQUANTITY", typeof(decimal));
                details.Columns.Add("EXPPRODUCTIONORDERDATE", typeof(string));
                details.Columns.Add("TRUSSNO", typeof(int));
                details.Columns.Add("TotalBale", typeof(int));
                details.Columns.Add("TotalTare", typeof(int));
                details.Columns.Add("CountNo", typeof(string));
                details.Columns.Add("TotalPallet", typeof(int));
                details.Columns.Add("TotalCartoon", typeof(int));
                
                details.Columns.Add("AddWeight", typeof(decimal));
                details.Columns.Add("GrossWeight", typeof(decimal));
                details.Columns.Add("Measurement", typeof(string));
                details.Columns.Add("SINo", typeof(string));
                details.Columns.Add("TotalSpool", typeof(int));
                details.Columns.Add("MarkInk", typeof(string));
                details.Columns.Add("SpoolOrPalat", typeof(string));
                details.Columns.Add("REMARKS", typeof(string));
                details.Columns.Add("DESCRIPTIONS", typeof(string));
                details.Columns.Add("MILLID", typeof(int));

                for (int i = 0; i < prd.Length; i++)
                {
                    details.Rows.Add(prd[i].ID,prd[i].ITEMID, prd[i].QUANTITY, prd[i].PACKINGREQQUANTITY, prd[i].EXPPRODUCTIONORDERDATE==null ? "" : prd[i].EXPPRODUCTIONORDERDATE, prd[i].TRUSSNO, prd[i].TotalBale, prd[i].TotalTare, prd[i].CountNo, prd[i].TotalPallet, prd[i].TotalCartoon,  prd[i].AddWeight, prd[i].GrossWeight , prd[i].MEASUREMENT, prd[i].SINo, prd[i].TotalSpool, prd[i].MarkInk, prd[i].SpoolOrPalat, prd[i].REMARKS, prd[i].DESCRIPTIONS, prd[i].MILLID);
                }


                SqlParameter detailsparam = new SqlParameter();
                detailsparam.ParameterName = "@TYPEPACKINGREQINSERTLINE";
                detailsparam.SqlDbType = SqlDbType.Structured;
                detailsparam.TypeName = "TYPEPACKINGREQINSERTLINE";
                detailsparam.SqlValue = details;

                

                SqlParameter PACKREQDATE = new SqlParameter("@PACKREQDATE", pr.PACKREQDATE==null ? "" : pr.PACKREQDATE);
                SqlParameter CUSTOMERID = new SqlParameter("@CUSTOMERID", pr.CUSTOMERID);
                SqlParameter PISCNUMBER = new SqlParameter("@PISCNUMBER", pr.PISCNUMBER);
                SqlParameter SHIPMENTPERIOD = new SqlParameter("@SHIPMENTPERIOD", pr.SHIPMENTPERIOD==null ? "" : pr.SHIPMENTPERIOD);
                SqlParameter TERMSCONDITION = new SqlParameter("@TERMSCONDITION", pr.TERMSCONDITION == null ? "" : pr.TERMSCONDITION);
                SqlParameter DESCRIPTIONS = new SqlParameter("@DESCRIPTIONS", pr.DESCRIPTIONS == null ? "" : pr.DESCRIPTIONS);
                SqlParameter PACKM = new SqlParameter("@PACKINGMODE", pr.PACKINGMODE);
                SqlParameter CUSTOMERCATE = new SqlParameter("@CUSTOMERCATEGORY", pr.CUSTOMERCATEGORY);
                SqlParameter SHIPP = new SqlParameter("@SHIPPOINT", pr.SHIPPOINT);
                SqlParameter BIAXPRO = new SqlParameter("@BIAXPROTYPE", pr.BIAXPROTYPE == null ? "" : pr.BIAXPROTYPE);
                SqlParameter MODULECODE = new SqlParameter("@ModuleCode", enumSubMenu.PR00001.ToString());

                SqlParameter UNITID = new SqlParameter("@UNITID", pr.UNITID);
                SqlParameter ENROLL = new SqlParameter("@Enroll", pr.DOCUMENTCREATEDBY);

                SqlParameter INVOICENUMBER = new SqlParameter("@INVOICENUMBER", pr.INVOICENUMBER);
                SqlParameter INVOICEDATE = new SqlParameter("@INVOICEDATE", pr.INVOICEDATE);
                SqlParameter INVOICETO = new SqlParameter("@INVOICETO", pr.INVOICETO);
                SqlParameter SHIPPEDPER = new SqlParameter("@SHIPPEDPER", pr.SHIPPEDPER );
                SqlParameter CONTRACTNO = new SqlParameter("@CONTRACTNO", pr.CONTRACTNO);
                SqlParameter CONTRACTDATE =  new SqlParameter("@CONTRACTDATE", DateTime.Now);

                SqlParameter SHIPPEDFROM = new SqlParameter("@SHIPPEDFROM", pr.SHIPPEDFROM == null ? "" : pr.SHIPPEDFROM);
                SqlParameter SHIPPEDTO = new SqlParameter("@SHIPPEDTO", pr.SHIPPEDTO == null ? "" : pr.SHIPPEDTO);

                SqlParameter PURCHASEORDERNO = new SqlParameter("@PURCHASEORDERNO", pr.PURCHASEORDERNO == null ? "" : pr.PURCHASEORDERNO);
                SqlParameter PURCHASEORDERDATED = new SqlParameter("@PURCHASEORDERDATED", pr.PURCHASEORDERDATED == null ? "" : pr.PURCHASEORDERDATED);

                SqlParameter DOCSTATUS = new SqlParameter("@DocStatus", enumDocumentStatus.PEND.ToString());
                SqlParameter ProcessName = new SqlParameter("@ProcessName", enumProcessName.PR.ToString());
                SqlParameter MsgStatus = new SqlParameter("@MsgStatus", enumPRMessage.PRSAVE.ToString());
                SqlParameter NOTIFICATION = new SqlParameter("@Notification", enumPRNotification.PRSAVE.ToString());

                //   @INVOICENUMBER,@INVOICEDATE,@INVOICETO,@SHIPPEDPER,@CONTRACTNO,@CONTRACTDATE,
                //   INVOICENUMBER,INVOICEDATE,INVOICETO,SHIPPEDPER,CONTRACTNO,CONTRACTDATE,

                //  PURCHASEORDERNO , PURCHASEORDERDATED
                //   @PURCHASEORDERNO , @PURCHASEORDERDATED

                StringWriter sw;
                using (sw = new StringWriter())
                {
                    //master.WriteXml(sw);
                    details.WriteXml(sw);
                }


                SqlParameter LOG = new SqlParameter("@Log", sw.ToString());

                var outParam = new SqlParameter
                {
                    ParameterName = "@Msg",
                    Size = 100,
                    SqlDbType = System.Data.SqlDbType.VarChar,
                    Direction = System.Data.ParameterDirection.Output
                };

                _context.Database.ExecuteSqlRaw("Exec SPSAVEPRODPACKINGREQ @TYPEPACKINGREQINSERTLINE,@PACKREQDATE,@CUSTOMERID,@PISCNUMBER,@SHIPMENTPERIOD,@TERMSCONDITION,@DESCRIPTIONS,@INVOICENUMBER,@INVOICEDATE,@INVOICETO,@SHIPPEDPER,@CONTRACTNO,@CONTRACTDATE, @SHIPPEDFROM , @SHIPPEDTO,@PURCHASEORDERNO , @PURCHASEORDERDATED,@MODULECODE,@UNITID,@ENROLL,@DOCSTATUS,@PROCESSNAME,@MsgStatus,@NOTIFICATION,@LOG,@PACKINGMODE,@CUSTOMERCATEGORY,@SHIPPOINT,@BIAXPROTYPE,@Msg output",
                  detailsparam, PACKREQDATE, CUSTOMERID, PISCNUMBER, SHIPMENTPERIOD, TERMSCONDITION, DESCRIPTIONS, INVOICENUMBER, INVOICEDATE, INVOICETO, SHIPPEDPER, CONTRACTNO, CONTRACTDATE, SHIPPEDFROM, SHIPPEDTO, PURCHASEORDERNO, PURCHASEORDERDATED, MODULECODE, UNITID,
                  ENROLL, DOCSTATUS, ProcessName, MsgStatus, NOTIFICATION, LOG, PACKM, CUSTOMERCATE, SHIPP, BIAXPRO, outParam);
                strMsg = (outParam.Value?.ToString() ?? "").Trim();
                return strMsg;
            }
            catch (Exception ex)
            {
                _common.ErrorLog(strMsg, ex.ToString(), enumSubMenu.PC00001.ToString(), enumProcessName.PC.ToString(), pr.UNITID, pr.DOCUMENTCREATEDBY, "");
            }
            finally
            { }
            return null;
        }

        public string Update(PackingRequestLanding pr)
        {
            try
            {
                SqlParameter ID = new SqlParameter("@ID", pr.ID);
                SqlParameter PACKREQNUMBER = new SqlParameter("@PACKREQNUMBER", pr.PACKREQNUMBER == null ? "" : pr.PACKREQNUMBER);
                SqlParameter PACKREQDATE = new SqlParameter("@PACKREQDATE", pr.PACKREQDATE == null ? "" : pr.PACKREQDATE);
                SqlParameter SHIPMENTPERIOD = new SqlParameter("@SHIPMENTPERIOD", pr.SHIPMENTPERIOD == null ? "" : pr.SHIPMENTPERIOD);
                SqlParameter CUSTOMERID = new SqlParameter("@CUSTOMERID", pr.CUSTOMERID == null ? "" : pr.CUSTOMERID);


                SqlParameter TERMSCONDITION = new SqlParameter("@TERMSCONDITION", pr.TERMSCONDITION == null ? "" : pr.TERMSCONDITION);
                SqlParameter DESCRIPTIONS = new SqlParameter("@DESCRIPTIONS", pr.DESCRIPTIONS == null ? "" : pr.DESCRIPTIONS);
                SqlParameter DOCUMENTCREATEDDATE = new SqlParameter("@DOCUMENTCREATEDDATE", pr.DOCUMENTCREATEDDATE == null ? "" : pr.DOCUMENTCREATEDDATE);

                SqlParameter DOCUMENTCREATEDBY = new SqlParameter("@DOCUMENTCREATEDBY", pr.DOCUMENTCREATEDBY == null ? "" : pr.DOCUMENTCREATEDBY);
                SqlParameter UNITID = new SqlParameter("@UNITID", pr.UNITID == null ? "" : pr.UNITID);
                SqlParameter PISCNUMBER = new SqlParameter("@PISCNUMBER", pr.PISCNUMBER == null ? "" : pr.PISCNUMBER);
                SqlParameter PACKINGMODE = new SqlParameter("@PACKINGMODE", pr.PACKINGMODE == null ? "" : pr.PACKINGMODE);
                SqlParameter CUSTOMERCATEGORY = new SqlParameter("@CUSTOMERCATEGORY", pr.CUSTOMERCATEGORY == null ? "" : pr.CUSTOMERCATEGORY);
                SqlParameter SHIPPOINT = new SqlParameter("@SHIPPOINT", pr.SHIPPOINT == null ? "" : pr.SHIPPOINT);
                SqlParameter BIAXPROTYPE = new SqlParameter("@BIAXPROTYPE", pr.BIAXPROTYPE == null ? "" : pr.BIAXPROTYPE);

                SqlParameter INVOICENUMBER = new SqlParameter("@INVOICENUMBER", pr.INVOICENUMBER == null ? "" : pr.INVOICENUMBER);
                SqlParameter INVOICEDATE = new SqlParameter("@INVOICEDATE", pr.INVOICEDATE == null ? "" : pr.INVOICEDATE);
                SqlParameter INVOICETO = new SqlParameter("@INVOICETO", pr.INVOICETO == null ? "" : pr.INVOICETO);
                SqlParameter CONTRACTNO = new SqlParameter("@CONTRACTNO", pr.CONTRACTNO == null ? "" : pr.CONTRACTNO);
                SqlParameter SHIPPEDPER = new SqlParameter("@SHIPPEDPER", pr.SHIPPEDPER == null ? "" : pr.SHIPPEDPER);


                SqlParameter SHIPPEDFROM = new SqlParameter("@SHIPPEDFROM", pr.SHIPPEDFROM == null ? "" : pr.SHIPPEDFROM);
                SqlParameter SHIPPEDTO = new SqlParameter("@SHIPPEDTO", pr.SHIPPEDTO == null ? "" : pr.SHIPPEDTO);
                SqlParameter PURCHASEORDERNO = new SqlParameter("@PURCHASEORDERNO", pr.PURCHASEORDERNO == null ? "" : pr.PURCHASEORDERNO);
                SqlParameter PURCHASEORDERDATED = new SqlParameter("@PURCHASEORDERDATED", pr.PURCHASEORDERDATED == null ? "" : pr.PURCHASEORDERDATED);

                SqlParameter MODULECODE = new SqlParameter("@ModuleCode", enumSubMenu.PR00001.ToString());
                SqlParameter ENROLL = new SqlParameter("@Enroll", pr.DOCUMENTCREATEDBY);
                SqlParameter DOCSTATUS = new SqlParameter("@DocStatus", enumDocumentStatus.PEND.ToString());
                SqlParameter ProcessName = new SqlParameter("@ProcessName", enumProcessName.PR.ToString());
                SqlParameter MsgStatus = new SqlParameter("@MsgStatus", enumPRMessage.PREDIT.ToString());
                SqlParameter NOTIFICATION = new SqlParameter("@Notification", enumPRNotification.PREDIT.ToString());

                StringWriter sw;
                using (sw = new StringWriter())
                {
                    //master.WriteXml(sw);
                    //details.WriteXml(sw);
                }


                SqlParameter LOG = new SqlParameter("@Log", "");

                var outParam = new SqlParameter
                {
                    ParameterName = "@Msg",
                    Size = 100,
                    SqlDbType = System.Data.SqlDbType.Char,
                    Direction = System.Data.ParameterDirection.Output
                };


                _context.Database.ExecuteSqlRaw("Exec SPUPDATEPRODPACKINGREQ @ID,@PACKREQNUMBER,@PACKREQDATE,@SHIPMENTPERIOD,@CUSTOMERID,@TERMSCONDITION,@DESCRIPTIONS,@DOCUMENTCREATEDDATE," +
                    "@DOCUMENTCREATEDBY,@UNITID,@PISCNUMBER,@PACKINGMODE,@CUSTOMERCATEGORY,@SHIPPOINT,@BIAXPROTYPE," +
                    "@INVOICENUMBER,@INVOICEDATE,@INVOICETO,@CONTRACTNO,@SHIPPEDPER,@SHIPPEDFROM,@SHIPPEDTO,@PURCHASEORDERNO,@PURCHASEORDERDATED," +
                    "@ModuleCode,@Enroll,@DocStatus,@ProcessName,@MsgStatus,@NOTIFICATION,@LOG,@Msg output",
                   ID, PACKREQNUMBER, PACKREQDATE, SHIPMENTPERIOD, CUSTOMERID, TERMSCONDITION, DESCRIPTIONS, DOCUMENTCREATEDDATE, DOCUMENTCREATEDBY, UNITID, PISCNUMBER, PACKINGMODE, CUSTOMERCATEGORY, SHIPPOINT, BIAXPROTYPE, INVOICENUMBER,
                   INVOICEDATE, INVOICETO, CONTRACTNO, SHIPPEDPER, SHIPPEDFROM, SHIPPEDTO, PURCHASEORDERNO, PURCHASEORDERDATED,
                  MODULECODE, ENROLL, DOCSTATUS, ProcessName, MsgStatus, NOTIFICATION, LOG, outParam);
                //_context.Database.ExecuteSqlRaw("Exec SPSAVEPISC @typeInsertSalesQuatationHeader,@typeInsertSalesQuatationLine,@UnitID,@ModuleCode,@Enroll,@DocStatus,@ProcessName,@MsgStatus,@Notification,@Log,@Msg output", masterparam, detailsparam, UnitID, ModuleCode, Enroll, DocStatus, ProcessName, MsgStatus, Notification, LOG, outParam);
                strMsg = outParam.Value.ToString();
                return strMsg;
            }
            catch(Exception ex)
            {
                _common.ErrorLog(strMsg, ex.ToString(), enumSubMenu.PR00001.ToString(), enumProcessName.PC.ToString(), pr.UNITID, pr.DOCUMENTCREATEDBY, "");
            }
            finally
            {

            }

            return null;
        }
        public string UpdateDetailsByID(PackingRequestLandingDetails pr, int unitid, int enroll)
        {
            try
            {
                SqlParameter ID = new SqlParameter("@ID", pr.ID);
                SqlParameter PACKINGREQQUANTITY = new SqlParameter("@PACKINGREQQUANTITY", pr.PACKINGREQQUANTITY);
                string formattedDate = pr.EXPPRODUCTIONORDERDATE.ToString("yyyy-MM-dd");
                SqlParameter EXPPRODUCTIONORDERDATE = new SqlParameter("@EXPPRODUCTIONORDERDATE", pr.EXPPRODUCTIONORDERDATE == null ? "" : formattedDate);

                //SqlParameter EXPPRODUCTIONORDERDATE = new SqlParameter("@EXPPRODUCTIONORDERDATE", pr.EXPPRODUCTIONORDERDATE == null ? DateTime.Now : DateTime.Now);

                SqlParameter TRUSSNO = new SqlParameter("@TRUSSNO", pr.TRUSSNO);
                SqlParameter TOTALBALE = new SqlParameter("@TOTALBALE", pr.TotalBale);
                SqlParameter TOTALTARE = new SqlParameter("@TOTALTARE", pr.TotalTare);
                SqlParameter ITEMID = new SqlParameter("@ITEMID", pr.ITEMID == null ? "" : pr.ITEMID);
                SqlParameter QUANTITY = new SqlParameter("@QUANTITY", pr.QUANTITY == null ? "" : pr.QUANTITY);
                SqlParameter COUNTNO = new SqlParameter("@CountNo", pr.CountNo == null ? "" : pr.CountNo);
                SqlParameter TOTALPALLET = new SqlParameter("@TotalPallet", pr.TotalPallet == null ? "": pr.TotalPallet);
                SqlParameter TOTALCARTOON = new SqlParameter("@TotalCartoon", pr.TotalCartoon == null ? "" : pr.TotalCartoon);
                
                SqlParameter ADDWEIGHT = new SqlParameter("@AddWeight", pr.AddWeight == null ?"" : pr.AddWeight);
                SqlParameter GROSSWEIGHT = new SqlParameter("@GrossWeight", pr.GrossWeight == null ?"" : pr.GrossWeight);
                SqlParameter MEASUREMENT = new SqlParameter("@MEASUREMENT", pr.MEASUREMENT == null ? "" : pr.MEASUREMENT);
                SqlParameter SINO = new SqlParameter("@SINo", pr.SINo == null ? "" : pr.SINo);
                SqlParameter TOTALSPOOL = new SqlParameter("@TotalSpool", pr.TotalSpool == null ? "" : pr.TotalSpool);
                SqlParameter MARKINK = new SqlParameter("@MarkInk", pr.MarkInk == null ? "" : pr.MarkInk);
                SqlParameter SPOOLORPALAT = new SqlParameter("@SpoolOrPalat", pr.SpoolOrPalat == null ? "" : pr.SpoolOrPalat);
                SqlParameter REMARKS = new SqlParameter("@REMARKS", pr.REMARKS == null ? "" : pr.REMARKS);
                SqlParameter DESCRIPTIONS = new SqlParameter("@DESCRIPTIONS", pr.DESCRIPTIONS == null ? "" : pr.DESCRIPTIONS);
                SqlParameter MILLID = new SqlParameter("@MILLID", pr.MILLID);

                SqlParameter MODULECODE = new SqlParameter("@ModuleCode", enumSubMenu.PR00001.ToString());
                SqlParameter UNITID = new SqlParameter("@UNITID", unitid);
                SqlParameter ENROLL = new SqlParameter("@Enroll", enroll);
                SqlParameter DOCSTATUS = new SqlParameter("@DocStatus", enumDocumentStatus.PEND.ToString());
                SqlParameter ProcessName = new SqlParameter("@ProcessName", enumProcessName.PR.ToString());
                SqlParameter MsgStatus = new SqlParameter("@MsgStatus", enumPRMessage.PREDIT.ToString());
                SqlParameter NOTIFICATION = new SqlParameter("@Notification", enumPRNotification.PREDIT.ToString());

                StringWriter sw;
                using (sw = new StringWriter())
                {
                    //master.WriteXml(sw);
                    //details.WriteXml(sw);
                }


                SqlParameter LOG = new SqlParameter("@Log", "");

                var outParam = new SqlParameter
                {
                    ParameterName = "@Msg",
                    Size = 100,
                    SqlDbType = System.Data.SqlDbType.Char,
                    Direction = System.Data.ParameterDirection.Output
                };


                _context.Database.ExecuteSqlRaw("Exec SPUPDATEPRODPACKINGREQLINE @ID,@PACKINGREQQUANTITY,@EXPPRODUCTIONORDERDATE," +
    "@TRUSSNO,@TOTALBALE,@TOTALTARE,@ITEMID,@QUANTITY,@COUNTNO,@TOTALPALLET,@TOTALCARTOON,@ADDWEIGHT," +
    "@GROSSWEIGHT,@MEASUREMENT,@SINO,@TOTALSPOOL,@MILLID,@MARKINK,@SPOOLORPALAT,@REMARKS," +
    "@DESCRIPTIONS,@ModuleCode,@UNITID,@Enroll,@DocStatus," +
    "@ProcessName,@MsgStatus,@NOTIFICATION,@LOG,@Msg output",
   ID, PACKINGREQQUANTITY, EXPPRODUCTIONORDERDATE, TRUSSNO, TOTALBALE, TOTALTARE, ITEMID, QUANTITY,
   COUNTNO, TOTALPALLET, TOTALCARTOON, ADDWEIGHT, GROSSWEIGHT, MEASUREMENT, SINO, TOTALSPOOL,
   MILLID, MARKINK, SPOOLORPALAT, REMARKS, DESCRIPTIONS, MODULECODE, UNITID, ENROLL, DOCSTATUS,
   ProcessName, MsgStatus, NOTIFICATION, LOG, outParam);



                strMsg = outParam.Value.ToString();
                return strMsg;
            }
            catch (Exception ex)
            {
                _common.ErrorLog(strMsg, ex.ToString(), enumSubMenu.PR00001.ToString(), enumProcessName.PC.ToString(), unitid, enroll, "");
            }
            finally
            {

            }

            return null;
        }
        public IQueryable<DropDownBind> GetPackingMode()
        {
            
            return _context.DropDownBind.FromSqlRaw("Exec Getpackingmode ");
        }
        public IQueryable<DropDownBind> GetCustomerCategory()
        {
            
            return _context.DropDownBind.FromSqlRaw("Exec GetCustomerCetegory");
        }
        public IQueryable<DropDownBind> GetShipPoint()
        {
        
            return _context.DropDownBind.FromSqlRaw("Exec GetShippingPoint");
        }

        public IQueryable<DropDownBind> GetMillByUnit(int piscid)
        {
            SqlParameter PISCHEADERID = new SqlParameter("@PISCHEADERID", piscid);
            return _context.DropDownBind.FromSqlRaw("Exec SPGETMOLLNO @PISCHEADERID", PISCHEADERID);
        }

        public IQueryable<DropDownBind> GetMillByPISC(int piscid)
        {
            SqlParameter PISCID = new SqlParameter("@PISCID", piscid);
            return _context.DropDownBind.FromSqlRaw("SELECT DISTINCT m.ID, m.MillName + ' ' + l.Name AS Name FROM TBLPRICECONFIRMHEADER h JOIN TBLLOCATION l ON l.UNITID = h.SELLERID JOIN TBLMILL m ON m.LOCATIONID = l.ID WHERE h.ID = @PISCID", PISCID);
        }
    }
}

