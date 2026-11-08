using ImportExport.UI.Models.CommonModel;
using ImportExport.UI.Models.PackingReqConfirmModel;
using ImportExport.UI.Models.PackingRequestModel;
using ImportExport.UI.Service.CommonService;
using ImportExport.UI.Service.PackingRequestConfirmService;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel;
using System.Data;

namespace ImportExport.UI.Repository.PackingrequestConfirmRepository
{
    public class RPickingPackingRequestConfirm : IPickingPackingConfirmRequest
    {
        string strMsg = "";
        int UnitID = 0;
        int Enroll = 0;

        private Context _context;
        private ICommon _common;
        public RPickingPackingRequestConfirm(Context context, ICommon common)
        {
            _context = context;
            _common = common;
        }


        public string DeleteDetailsByID(int id, int enroll, int unitid)
        {
            throw new NotImplementedException();
        }


        public string DeleteMasterByID(int id, int enroll, int unitid)
        {
            try
            {
                SqlParameter ID = new SqlParameter("@id", id);
                SqlParameter DOCUMENTCREATEDBY = new SqlParameter("@DOCUMENTCREATEDBY", enroll);
                SqlParameter UNITID = new SqlParameter("@UNITID", unitid);
                SqlParameter ModuleCode = new SqlParameter("@ModuleCode", enumSubMenu.PRC00001.ToString());
                SqlParameter ProcessCode = new SqlParameter("@ProcessCode", enumProcessName.PRC.ToString());
                SqlParameter MessageName = new SqlParameter("@MessageName", enumPRCMessage.PRCDEL.ToString());

                var outParam = new SqlParameter
                {
                    ParameterName = "@Msg",
                    Size = 100,
                    SqlDbType = System.Data.SqlDbType.Char,
                    Direction = System.Data.ParameterDirection.Output
                };

                _context.Database.ExecuteSqlRaw("Exec SPDELETEPICKINGPACKINGCONFIRM @id,@DOCUMENTCREATEDBY,@UNITID,@ModuleCode,@ProcessCode,@MessageName,@Msg output", ID, DOCUMENTCREATEDBY, UNITID, ModuleCode, ProcessCode, MessageName, outParam);
                strMsg = outParam.Value.ToString();
            }
            catch (Exception ex)
            {
                _common.ErrorLog(strMsg, ex.ToString(), enumSubMenu.PR00001.ToString(), enumProcessName.PR.ToString(), unitid, enroll, "");
            }
            finally { }

            return strMsg;
        }

        public IQueryable<PickPackLandingView> ViewByDetailsID(int headerID)
        {
            try
            {
                SqlParameter HeaderID = new SqlParameter("@HeaderID", headerID);
                return _context.PickingPackingRequestLandingDelSummary.FromSqlRaw("EXEC GetPickPackingItemList @HeaderID", HeaderID);
            }
            catch (Exception ex)
            {
               // _common.ErrorLog("", ex.ToString(), enumSubMenu.PRC00001.ToString(), enumProcessName.PRC.ToString(),id, "");
            }
            finally
            { }
            return null;
        }

        public IQueryable<PickingPackingRequestDelSummary> EditByDetailsID(int id, int enroll, int unitid)
        {
            try
            {
                int type = 6;
                SqlParameter Type = new SqlParameter("@Type", type);
                SqlParameter Enroll = new SqlParameter("@Enroll", enroll);
                SqlParameter ID = new SqlParameter("@ID", id);
                SqlParameter UnitID = new SqlParameter("@UnitID", unitid);
                return _context.PickingPackingRequestDelSummary.FromSqlRaw("Exec SPGETPICKINGPACKING @Type,@Enroll,@ID,@UnitID", Type, Enroll, ID, UnitID);
            }
            catch (Exception ex)
            {
                _common.ErrorLog("", ex.ToString(), enumSubMenu.PRC00001.ToString(), enumProcessName.PRC.ToString(), unitid, enroll, "");
            }
            finally
            { }
            return null;
        }


        public IQueryable<PickingPackingRequestDelSummary> EditByDetailsSummary(int id, int unitid, int enroll)
        {
            try
            {
                int type = 6;
                SqlParameter Type = new SqlParameter("@Type", type);
                SqlParameter Enroll = new SqlParameter("@Enroll", enroll);
                SqlParameter ID = new SqlParameter("@ID", id);
                SqlParameter UnitID = new SqlParameter("@UnitID", unitid);
                return _context.PickingPackingRequestDelSummary.FromSqlRaw("Exec SPGETPICKINGPACKING @ID",ID);
            }
            catch (Exception ex)
            {
                _common.ErrorLog("", ex.ToString(), enumSubMenu.PRC00001.ToString(), enumProcessName.PRC.ToString(), unitid, enroll, "");
            }
            finally
            { }
            return null;
        }


        public string EditByMasterID(PickPackingEditMaster pr, PickingPackingRequestDelvery[] prd, int enroll, int unitid)
        {


            DataTable details = new DataTable { TableName = "Details" }; ;
            details.Columns.Add("ITEMID", typeof(int));
            details.Columns.Add("QUANTITY", typeof(decimal));
            details.Columns.Add("PACKINGREQQUANTITY", typeof(decimal));

            details.Columns.Add("GROSSMEASURE", typeof(string));
            details.Columns.Add("TRUCKNO", typeof(string));
            details.Columns.Add("CONTAINERSIZE", typeof(int));
            details.Columns.Add("CONTAINERNO", typeof(string));

            details.Columns.Add("REMARKS", typeof(string));
            details.Columns.Add("DESCRIPTIONS", typeof(string));


            for (int i = 0; i < prd.Length; i++)
            {
                details.Rows.Add(prd[i].ITEMID, prd[i].QUANTITY, prd[i].PACKINGREQQUANTITY, prd[i].GROSSMEASURE, prd[i].TRUCKNO, prd[i].CONTAINERSIZE, prd[i].CONTAINERNO, prd[i].REMARKS, prd[i].DESCRIPTIONS);
            }

            SqlParameter detailsparam = new SqlParameter();
            detailsparam.ParameterName = "@TYPEPICKPACKINGINSERTLINE";
            detailsparam.SqlDbType = SqlDbType.Structured;
            detailsparam.TypeName = "TYPEPICKPACKINGINSERTLINE";
            detailsparam.SqlValue = details;



            SqlParameter ID = new SqlParameter("@ID", pr.ID);
            SqlParameter TERMSCONDITION = new SqlParameter("@TERMSCONDITION", pr.TERMSCONDITION == null ? "" : pr.TERMSCONDITION);
            SqlParameter DESCRIPTIONS = new SqlParameter("@DESCRIPTIONS", pr.DESCRIPTIONS == null ? "" : pr.DESCRIPTIONS);

            SqlParameter VEHICALNO = new SqlParameter("@VEHICALNO", pr.VEHICALNO == null ? "" : pr.VEHICALNO);
            SqlParameter DRIVERNAME = new SqlParameter("@DRIVERNAME", pr.DRIVERNAME == null ? "" : pr.DRIVERNAME);
            SqlParameter DRIVERPHONE = new SqlParameter("@DRIVERPHONE", pr.DRIVERPHONE == null ? "" : pr.DRIVERPHONE);
            SqlParameter CUSTOMERDETAILS = new SqlParameter("@CUSTOMERDETAILS", pr.CUSTOMERDETAILS == null ? "" : pr.CUSTOMERDETAILS);
            SqlParameter GATENO = new SqlParameter("@GATENO", pr.GATENO == null ? "" : pr.GATENO);
            SqlParameter GATEPERSON = new SqlParameter("@GATEPERSON", pr.GATEPERSON == null ? "" : pr.GATEPERSON);
            //SqlParameter EXCHANGERATE = new SqlParameter("@EXCHANGERATE", pr.EXCHANGERATE == null ? "" : pr.EXCHANGERATE);
            SqlParameter EXCHANGERATE = new SqlParameter
            {
                ParameterName = "@EXCHANGERATE",
                SqlDbType = SqlDbType.Decimal,
                Precision = 18,
                Scale = 4,
                Value = (object?)pr.EXCHANGERATE ?? DBNull.Value
            };
            SqlParameter TRANSPORTAGENCYID = new SqlParameter("@TRANSPORTAGENCYID", (object)pr.TRANSPORTAGENCYID ?? DBNull.Value);
            SqlParameter MODULECODE = new SqlParameter("@ModuleCode", enumSubMenu.PRC00001.ToString());
            SqlParameter UNITID = new SqlParameter("@UNITID", unitid);
            SqlParameter ENROLL = new SqlParameter("@Enroll", enroll);
            SqlParameter DOCSTATUS = new SqlParameter("@DocStatus", enumDocumentStatus.PEND.ToString());
            SqlParameter ProcessName = new SqlParameter("@ProcessName", enumProcessName.PRC.ToString());
            SqlParameter MsgStatus = new SqlParameter("@MsgStatus", enumPRCMessage.PRCEDIT.ToString());
            SqlParameter NOTIFICATION = new SqlParameter("@Notification", enumPRCNotification.PRCEDIT.ToString());

            SqlParameter LOG = new SqlParameter("@Log", "");

            var outParam = new SqlParameter
            {
                ParameterName = "@Msg",
                Size = 100,
                SqlDbType = System.Data.SqlDbType.Char,
                Direction = System.Data.ParameterDirection.Output
            };

            _context.Database.ExecuteSqlRaw(
                    "Exec spUpdatePickPackerByID @ID,@TERMSCONDITION,@DESCRIPTIONS,@VEHICALNO,@DRIVERNAME,@DRIVERPHONE,@CUSTOMERDETAILS,@GATENO,@GATEPERSON,@EXCHANGERATE,@TRANSPORTAGENCYID, " +
                    "@MODULECODE, @UNITID, @ENROLL, @DOCSTATUS, @ProcessName, @MsgStatus, @NOTIFICATION, @LOG, @Msg output",
                     ID, TERMSCONDITION, DESCRIPTIONS, VEHICALNO, DRIVERNAME, DRIVERPHONE, CUSTOMERDETAILS, GATENO, GATEPERSON, EXCHANGERATE, TRANSPORTAGENCYID, MODULECODE, UNITID, ENROLL, DOCSTATUS,
                    ProcessName, MsgStatus, NOTIFICATION, LOG, outParam
                );

            strMsg = outParam.Value.ToString();
            return strMsg;

        }

        public IQueryable<PickingPackingRequestDelSummary> EditByMasterIDSummary(int id, int unitid, int enroll)
        {
            try
            {
                int type = 2;
                SqlParameter Type = new SqlParameter("@Type", type);
                SqlParameter Enroll = new SqlParameter("@Enroll", enroll);
                SqlParameter ID = new SqlParameter("@ID", id);
                SqlParameter UnitID = new SqlParameter("@UnitID", unitid);
                return _context.PickingPackingRequestDelSummary.FromSqlRaw("Exec SPGETPICKINGPACKING @Type,@Enroll,@ID,@UnitID", Type, Enroll, ID, UnitID);
            }
            catch (Exception ex)
            {
                _common.ErrorLog("", ex.ToString(), enumSubMenu.PRC00001.ToString(), enumProcessName.PRC.ToString(), unitid, enroll, "");
            }
            finally
            { }
            return null;
        }

        public IQueryable<PickingPackingRequestLandingView> GetAllData(int enroll, int unitid)
        {
            try
            {
                int type = 0;
                SqlParameter Type = new SqlParameter("@Type", type);
                SqlParameter Enroll = new SqlParameter("@Enroll", enroll);
                SqlParameter ID = new SqlParameter("@ID", 1);
                SqlParameter UnitID = new SqlParameter("@UnitID", unitid);
                return _context.PickingPackingRequestLandingView.FromSqlRaw("Exec SPGETPICKINGPACKING @Type,@Enroll,@ID,@UnitID", Type, Enroll, ID, UnitID);
            }
            catch (Exception ex)
            {
                _common.ErrorLog("", ex.ToString(), enumSubMenu.PRC00001.ToString(), enumProcessName.PRC.ToString(), unitid, enroll, "");
            }
            finally
            { }
            return null;
        }

        public IQueryable<CheckQty> GetCheckQty(int pinumber, int itemid)
        {
            throw new NotImplementedException();
        }

        public IQueryable<CustomerInfo> GetCustomerInfoShortPISC(int id)
        {
            SqlParameter cusid = new SqlParameter("@id", id);
            return _context.CustomerInfo.FromSqlRaw("Exec GetCustomerInfoShortPISCExtra @id", cusid);
        }

        public IQueryable<PickPackingMasterDetailsView> GetEditByMasterID(int id, int enroll,int unitid)
        {
            try
            {
                int type = 5;
                SqlParameter Type = new SqlParameter("@Type", type);
                SqlParameter Enroll = new SqlParameter("@Enroll", enroll);
                SqlParameter ID = new SqlParameter("@ID", id);
                SqlParameter UnitID = new SqlParameter("@UnitID", unitid);
                return _context.PickPackingMasterDetailsView.FromSqlRaw("Exec SPGETPICKINGPACKING @Type,@Enroll,@ID,@UnitID", Type, Enroll, ID, UnitID);
            }
            catch (Exception ex)
            {
                _common.ErrorLog("", ex.ToString(), enumSubMenu.PRC00001.ToString(), enumProcessName.PRC.ToString(), unitid, enroll, "");
            }
            finally
            { }
            return null;
        }

        public string Save(PickingPackingRequestLanding pr, PickPackingRequestDetails[] prd)
        {
            try
            {
                SqlParameter ID = new SqlParameter("@ID", pr.ID);
                SqlParameter PICKPACKDATE = new SqlParameter("@PICKPACKDATE", pr.PICKPACKDATE == null ? DateTime.Now : DateTime.Now);
                SqlParameter TERMSCONDITION = new SqlParameter("@TERMSCONDITION", pr.TERMSCONDITION == null ? "" : pr.TERMSCONDITION);
                SqlParameter DESCRIPTIONS = new SqlParameter("@DESCRIPTIONS", pr.DESCRIPTIONS == null ? "" : pr.DESCRIPTIONS);

                SqlParameter VEHICALNO = new SqlParameter("@VEHICALNO", pr.VEHICALNO == null ? "" : pr.VEHICALNO);
                SqlParameter DRIVERNAME = new SqlParameter("@DRIVERNAME", pr.DRIVERNAME == null ? "" : pr.DRIVERNAME);
                SqlParameter DRIVERPHONE = new SqlParameter("@DRIVERPHONE", pr.DRIVERPHONE == null ? "" : pr.DRIVERPHONE);
                SqlParameter CUSTOMERDETAILS = new SqlParameter("@CUSTOMERDETAILS", pr.CUSTOMERDETAILS == null ? "" : pr.CUSTOMERDETAILS);
                SqlParameter GATENO = new SqlParameter("@GATENO", pr.GATENO == null ? "" : pr.GATENO);
                SqlParameter GATEPERSON = new SqlParameter("@GATEPERSON", pr.GATENO == null ? "" : pr.GATEPERSON);
                SqlParameter TRANSPORTAGENCYID = new SqlParameter("@TRANSPORTAGENCYID", pr.TRANSPORTAGENCYID);

                DataTable details = new DataTable { TableName = "Details" }; ;
                details.Columns.Add("ITEMID", typeof(int));
                details.Columns.Add("QUANTITY", typeof(decimal));
                details.Columns.Add("PACKINGREQQUANTITY", typeof(decimal));

                details.Columns.Add("GROSSMEASURE", typeof(string));
                details.Columns.Add("TRUCKNO", typeof(string));
                details.Columns.Add("CONTAINERSIZE", typeof(int));
                details.Columns.Add("CONTAINERNO", typeof(string));

                details.Columns.Add("REMARKS", typeof(string));
                details.Columns.Add("DESCRIPTIONS", typeof(string));


                for (int i = 0; i < prd.Length; i++)
                {
                    details.Rows.Add(prd[i].ITEMID, prd[i].QUANTITY, prd[i].PACKINGREQQUANTITY, prd[i].GROSSMEASURE, prd[i].TRUCKNO, prd[i].CONTAINERSIZE,prd[i].CONTAINERNO ,prd[i].REMARKS, prd[i].DESCRIPTIONS);
                }

                SqlParameter detailsparam = new SqlParameter();
                detailsparam.ParameterName = "@TYPEPICKPACKINGINSERTLINE";
                detailsparam.SqlDbType = SqlDbType.Structured;
                detailsparam.TypeName = "TYPEPICKPACKINGINSERTLINE";
                detailsparam.SqlValue = details;


                SqlParameter MODULECODE = new SqlParameter("@ModuleCode", enumSubMenu.PRC00001.ToString());
                SqlParameter UNITID = new SqlParameter("@UNITID", pr.UNITID);
                SqlParameter ENROLL = new SqlParameter("@Enroll", pr.DOCUMENTCREATEDBY);
                SqlParameter DOCSTATUS = new SqlParameter("@DocStatus", enumDocumentStatus.PEND.ToString());
                SqlParameter ProcessName = new SqlParameter("@ProcessName", enumProcessName.PRC.ToString());
                SqlParameter MsgStatus = new SqlParameter("@MsgStatus", enumPRCMessage.PRCSAVE.ToString());
                SqlParameter NOTIFICATION = new SqlParameter("@Notification", enumPRCNotification.PRCSAVE.ToString());



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
                    SqlDbType = System.Data.SqlDbType.Char,
                    Direction = System.Data.ParameterDirection.Output
                };

                _context.Database.ExecuteSqlRaw(
                        "Exec SPSAVEPICKINGPACKING @TYPEPICKPACKINGINSERTLINE, @ID,@PICKPACKDATE,@TERMSCONDITION,@DESCRIPTIONS,@VEHICALNO, @DRIVERNAME,@DRIVERPHONE, @CUSTOMERDETAILS, @GATENO,@GATEPERSON,@TRANSPORTAGENCYID, " +
                        "@MODULECODE, @UNITID, @ENROLL, @DOCSTATUS, @ProcessName, @MsgStatus, @NOTIFICATION, @LOG, @Msg output",
                        detailsparam, ID, PICKPACKDATE, TERMSCONDITION, DESCRIPTIONS, VEHICALNO, DRIVERNAME,
                        DRIVERPHONE, CUSTOMERDETAILS, GATENO, GATEPERSON, TRANSPORTAGENCYID, MODULECODE, UNITID, ENROLL, DOCSTATUS,
                        ProcessName, MsgStatus, NOTIFICATION, LOG, outParam
                    );

                strMsg = outParam.Value.ToString();
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


        //public string Save(PickingPackingRequestLanding pr)
        //{
        //    try
        //    {
        //        SqlParameter ID = new SqlParameter("@ID", pr.ID);
        //        SqlParameter PACKREQDATE = new SqlParameter("@PACKREQDATE", pr.PICKPACKDATE == null ? "" : pr.PICKPACKDATE);
        //        SqlParameter TERMSCONDITION = new SqlParameter("@TERMSCONDITION", pr.TERMSCONDITION == null ? "" : pr.TERMSCONDITION);
        //        SqlParameter DESCRIPTIONS = new SqlParameter("@DESCRIPTIONS", pr.DESCRIPTIONS == null ? "" : pr.DESCRIPTIONS);

        //        SqlParameter LOG = new SqlParameter("@Log", "");

        //        var outParam = new SqlParameter
        //        {
        //            ParameterName = "@Msg",
        //            Size = 100,
        //            SqlDbType = System.Data.SqlDbType.Char,
        //            Direction = System.Data.ParameterDirection.Output
        //        };


        //        SqlParameter MODULECODE = new SqlParameter("@ModuleCode", enumSubMenu.PRC00001.ToString());
        //        SqlParameter UNITID = new SqlParameter("@UNITID", pr.UNITID);
        //        SqlParameter ENROLL = new SqlParameter("@Enroll", pr.DOCUMENTCREATEDBY);
        //        SqlParameter DOCSTATUS = new SqlParameter("@DocStatus", enumDocumentStatus.PEND.ToString());
        //        SqlParameter ProcessName = new SqlParameter("@ProcessName", enumProcessName.PRC.ToString());
        //        SqlParameter MsgStatus = new SqlParameter("@MsgStatus", enumPRCMessage.PRCSAVE.ToString());
        //        SqlParameter NOTIFICATION = new SqlParameter("@Notification", enumPRCNotification.PRCSAVE.ToString());

        //        _context.Database.ExecuteSqlRaw("Exec SPSAVEPICKINGPACKING @ID,@PACKREQDATE,@TERMSCONDITION,@DESCRIPTIONS,@MODULECODE,@UNITID,@ENROLL,@DOCSTATUS,@PROCESSNAME,@MsgStatus,@NOTIFICATION,@LOG,@Msg output",
        //             ID, PACKREQDATE, TERMSCONDITION, DESCRIPTIONS, TERMSCONDITION, DESCRIPTIONS, MODULECODE, UNITID, ENROLL, DOCSTATUS, ProcessName, MsgStatus, NOTIFICATION, LOG, outParam);
        //        //_context.Database.ExecuteSqlRaw("Exec SPSAVEPISC @typeInsertSalesQuatationHeader,@typeInsertSalesQuatationLine,@UnitID,@ModuleCode,@Enroll,@DocStatus,@ProcessName,@MsgStatus,@Notification,@Log,@Msg output", masterparam, detailsparam, UnitID, ModuleCode, Enroll, DocStatus, ProcessName, MsgStatus, Notification, LOG, outParam);
        //        strMsg = outParam.Value.ToString();
        //        return strMsg;
        //    }
        //    catch(Exception ex)
        //    {
        //        _common.ErrorLog(strMsg, ex.ToString(), enumSubMenu.PRC00001.ToString(), enumProcessName.PRC.ToString(), pr.UNITID, pr.DOCUMENTCREATEDBY, "");
        //    }
        //    finally
        //    {

        //    }

        //    return null;
        //}
        public string UpdateDetailsByID(PackingRequestConfirmLandingDetails pr, int unitid, int enroll)
        {
            try
            {
                SqlParameter ID = new SqlParameter("@ID", pr.ID);
                SqlParameter PACKINGREQQUANTITY = new SqlParameter("@PACKINGREQQUANTITY", pr.PACKINGQUANTITY);
                SqlParameter REMARKS = new SqlParameter("@REMARKS", pr.REMARKS == null ? "" : pr.REMARKS);
                SqlParameter DESCRIPTIONS = new SqlParameter("@DESCRIPTIONS", pr.DESCRIPTIONS == null ? "" : pr.DESCRIPTIONS);

                SqlParameter TRUCKNO = new SqlParameter("@TRUCKNO", pr.TRUCKNO == null ? "" : pr.TRUCKNO);
            
                SqlParameter GROSSMEASURE = new SqlParameter("@GROSSMEASURE", pr.GROSSMEASURE);
                SqlParameter CONTAINERSIZE = new SqlParameter("@CONTAINERSIZE", pr.CONTAINERSIZE == null ? "" : pr.CONTAINERSIZE);
                SqlParameter CONTAINERNO = new SqlParameter("@CONTAINERNO", pr.CONTAINERNO == null ? "" : pr.CONTAINERNO);


                SqlParameter MODULECODE = new SqlParameter("@ModuleCode", enumSubMenu.PRC00001.ToString());
                SqlParameter UNITID = new SqlParameter("@UNITID", unitid);
                SqlParameter ENROLL = new SqlParameter("@Enroll", enroll);
                SqlParameter DOCSTATUS = new SqlParameter("@DocStatus", enumDocumentStatus.PEND.ToString());
                SqlParameter ProcessName = new SqlParameter("@ProcessName", enumProcessName.PRC.ToString());
                SqlParameter MsgStatus = new SqlParameter("@MsgStatus", enumPRCMessage.PRCEDIT.ToString());
                SqlParameter NOTIFICATION = new SqlParameter("@Notification", enumPRCNotification.PRCEDIT.ToString());

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


                _context.Database.ExecuteSqlRaw("Exec SPUPDATEPICKINGPACKINGLINE @ID,@PACKINGREQQUANTITY,@REMARKS,@DESCRIPTIONS," +
                    "@TRUCKNO,@GROSSMEASURE,@CONTAINERSIZE,@CONTAINERNO,@MODULECODE,@UNITID,@ENROLL,@DOCSTATUS,@PROCESSNAME,@MsgStatus,@NOTIFICATION,@LOG,@Msg output",
                   ID, PACKINGREQQUANTITY, REMARKS, DESCRIPTIONS, TRUCKNO, GROSSMEASURE, CONTAINERSIZE, CONTAINERNO, MODULECODE, UNITID, ENROLL, DOCSTATUS, ProcessName, MsgStatus, NOTIFICATION, LOG, outParam);
                strMsg = outParam.Value.ToString();
                return strMsg;
            }
            catch (Exception ex)
            {
                _common.ErrorLog(strMsg, ex.ToString(), enumSubMenu.PRC00001.ToString(), enumProcessName.PRC.ToString(), unitid, enroll, "");
            }
            finally
            {

            }

            return null;
        }

        public IQueryable<PickPackingMasterDetailsView> ViewMaster(int id, int unitid, int enroll)
        {
            try
            {
                int type = 1;
                SqlParameter Type = new SqlParameter("@Type", type);
                SqlParameter Enroll = new SqlParameter("@Enroll", enroll);
                SqlParameter ID = new SqlParameter("@ID", id);
                SqlParameter UnitID = new SqlParameter("@UnitID", unitid);
                return _context.PickPackingMasterDetailsView.FromSqlRaw("Exec SPGETPICKINGPACKING @Type,@Enroll,@ID,@UnitID", Type, Enroll, ID, UnitID);
            }
            catch (Exception ex)
            {
                _common.ErrorLog("", ex.ToString(), enumSubMenu.PRC00001.ToString(), enumProcessName.PRC.ToString(), unitid, enroll, "");
            }
            finally
            { }
            return null;
        }

    }
}
