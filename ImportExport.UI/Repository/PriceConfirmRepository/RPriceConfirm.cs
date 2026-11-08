using ImportExport.UI.Models.AgreementModel;
using ImportExport.UI.Models.CommonModel;
using ImportExport.UI.Models.PriceConfirmModel;
using ImportExport.UI.Models.QuotationModel;
using ImportExport.UI.Service.CommonService;
using ImportExport.UI.Service.PriceConfirmService;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System.Data;
using System.Diagnostics;

namespace ImportExport.UI.Repository.PriceConfirmRepository
{
    public class RPriceConfirm : IPriceConfirm
    {
        private readonly Context _context;
        private readonly ICommon _common;
        string strMsg = "";
        int PROCESSID = 0;
        public RPriceConfirm(Context context, ICommon common)
        {
            _context = context;
            _common = common;
        }

        public string DeleteDetailsByID(int id, int enroll, int unitid)
        {
            throw new NotImplementedException();
        }

        public string DeleteMaster(int id, int enroll, int unitid)
        {
            try
            {
                SqlParameter ID = new SqlParameter("@id", id);
                SqlParameter DOCUMENTCREATEDBY = new SqlParameter("@DOCUMENTCREATEDBY", enroll);
                SqlParameter UNITID = new SqlParameter("@UNITID", unitid);
                SqlParameter ModuleCode = new SqlParameter("@ModuleCode", enumSubMenu.PC00001.ToString());
                SqlParameter ProcessCode = new SqlParameter("@ProcessCode", enumProcessName.PC.ToString());
                SqlParameter MessageName = new SqlParameter("@MessageName", enumPCMessage.PCDEL.ToString());

                var outParam = new SqlParameter
                {
                    ParameterName = "@Msg",
                    Size = 100,
                    SqlDbType = System.Data.SqlDbType.Char,
                    Direction = System.Data.ParameterDirection.Output
                };

                _context.Database.ExecuteSqlRaw("Exec SPDeletePCMaster @id,@DOCUMENTCREATEDBY,@UNITID,@ModuleCode,@ProcessCode,@MessageName,@Msg output", ID, DOCUMENTCREATEDBY, UNITID, ModuleCode, ProcessCode, MessageName, outParam);
                strMsg = outParam.Value.ToString();
            }
            catch (Exception ex)
            {
                _common.ErrorLog(strMsg, ex.ToString(), enumSubMenu.PC00001.ToString(), enumProcessName.PC.ToString(), unitid, enroll, "");
            }
            finally { }

            return strMsg;
        }
        public IQueryable<AgreementPriceConfirm> EditByDetailsID(int headerid)
        {
            try
            {
                //int id = 1;
                int id = 2;
                SqlParameter ID = new SqlParameter("@id", id);
                SqlParameter HeaderID = new SqlParameter("@headerid", headerid);

                //return _context.AgreementLandingDetails.FromSqlRaw("Exec GETAGREEMENTINFOMASTERDETAILSBYID @id,@headerid", ID, HeaderID
                return _context.AgreementPriceConfirm.FromSqlRaw("Exec SPVIEWPISC @id,@headerid", ID, HeaderID);
            }
            catch (Exception) { }
            finally { }
            return null;
        }

        //public IQueryable<PriceConfirmDetails> EditByDetailsID(int id,int enroll, int unitid)
        //{
        //    try
        //    {
        //        int type = 4;
        //        SqlParameter Enroll = new SqlParameter("@Enroll", enroll);
        //        SqlParameter UnitID = new SqlParameter("@UnitID", unitid);
        //        SqlParameter Code = new SqlParameter("@Code", enumSubMenu.PC00001.ToString());
        //        SqlParameter ID = new SqlParameter("@ID", id);
        //        SqlParameter TYPE = new SqlParameter("@TYPE", type);

        //        return _context.PriceConfirmDetails.FromSqlRaw("Exec GETPRICECONFIRMFORAPPROVAL @Enroll,@UnitID,@Code,@ID,@TYPE", UnitID, Code, Enroll, ID, TYPE);
        //    }
        //    catch (Exception ex)
        //    {
        //        _common.ErrorLog(strMsg, ex.ToString(), enumSubMenu.PC00001.ToString(), enumProcessName.PC.ToString(), unitid, enroll, "");
        //    }
        //    finally { }
        //    return null;
        //}

        public IQueryable<PriceConfirmDetails> EditByMasterID(int id, int enroll, int unitid)
        {
            try
            {
                int type = 4;
                SqlParameter Enroll = new SqlParameter("@Enroll", enroll);
                SqlParameter UnitID = new SqlParameter("@UnitID", unitid);
                SqlParameter Code = new SqlParameter("@Code", enumSubMenu.PC00001.ToString());
                SqlParameter ID = new SqlParameter("@ID", id);
                SqlParameter TYPE = new SqlParameter("@TYPE", type);

                return _context.PriceConfirmDetails.FromSqlRaw("Exec GETPRICECONFIRMFORAPPROVAL @Enroll,@UnitID,@Code,@ID,@TYPE", UnitID, Code, Enroll, ID, TYPE);
            }
            catch(Exception ex)
            {
                _common.ErrorLog(strMsg, ex.ToString(), enumSubMenu.PC00001.ToString(), enumProcessName.PC.ToString(), unitid, enroll, "");
            }
            finally { }
            return null;
        }

        public IQueryable<PriceConfirmQuotationDetails> GetPendingList(int enroll,int unitid)
        {
            try
            {
                int type = 3;
                int id = 0;
                SqlParameter Enroll = new SqlParameter("@Enroll", enroll);
                SqlParameter UnitID = new SqlParameter("@UnitID", unitid);
                SqlParameter Code = new SqlParameter("@Code", enumSubMenu.PC00001.ToString());
                SqlParameter ID = new SqlParameter("@ID", id);
                SqlParameter TYPE = new SqlParameter("@TYPE", type);

                return _context.PriceConfirmQuotationDetails.FromSqlRaw("Exec GETPRICECONFIRMFORAPPROVAL @Enroll,@UnitID,@Code,@ID,@TYPE", UnitID, Code, Enroll, ID, TYPE);
            }
            catch(Exception ex)
            {
                _common.ErrorLog(strMsg, ex.ToString(), enumSubMenu.PC00001.ToString(), enumProcessName.PC.ToString(), unitid, enroll, "");
            }
            finally { }
            return null;
        }

        public IQueryable<PriceConfirmView> GetPendingListBiax(int enroll, int unitid)
        {
            try
            {
                int type = 3;
                int id = 0;
                SqlParameter Enroll = new SqlParameter("@Enroll", enroll);
                SqlParameter UnitID = new SqlParameter("@UnitID", unitid);
                SqlParameter Code = new SqlParameter("@Code", enumSubMenu.PC00001.ToString());
                SqlParameter ID = new SqlParameter("@ID", id);
                SqlParameter TYPE = new SqlParameter("@TYPE", type);

                return _context.PriceConfirmView.FromSqlRaw("Exec GETPRICECONFIRMFORAPPROVALBIAX @Enroll,@UnitID,@Code,@ID,@TYPE", UnitID, Code, Enroll, ID, TYPE);
            }
            catch (Exception ex)
            {
                _common.ErrorLog(strMsg, ex.ToString(), enumSubMenu.PC00001.ToString(), enumProcessName.PC.ToString(), unitid, enroll, "");
            }
            finally { }
            return null;
        }

        public IQueryable<PriceConfirmView> GetPendingListBiaxView(int enroll, int unitid)
        {
            try
            {
                int type = 1;
                int id = 0;
                SqlParameter Enroll = new SqlParameter("@Enroll", enroll);
                SqlParameter UnitID = new SqlParameter("@UnitID", unitid);
                SqlParameter Code = new SqlParameter("@Code", enumSubMenu.PC00001.ToString());
                SqlParameter ID = new SqlParameter("@ID", id);
                SqlParameter TYPE = new SqlParameter("@TYPE", type);

                return _context.PriceConfirmView.FromSqlRaw("Exec GETPRICECONFIRMFORAPPROVALBIAX @Enroll,@UnitID,@Code,@ID,@TYPE", UnitID, Code, Enroll, ID, TYPE);
            }
            catch (Exception ex)
            {
                _common.ErrorLog(strMsg, ex.ToString(), enumSubMenu.PC00001.ToString(), enumProcessName.PC.ToString(), unitid, enroll, "");
            }
            finally { }
            return null;
        }

        public IQueryable<PriceConfirmDetails> GetPricecConfirmLine(int headerid, int enroll, int unitid)
        {
            try
            {
                int type = 2;
                SqlParameter Enroll = new SqlParameter("@Enroll", enroll);
                SqlParameter UnitID = new SqlParameter("@UnitID", unitid);
                SqlParameter Code = new SqlParameter("@Code", enumSubMenu.PC00001.ToString());
                SqlParameter ID = new SqlParameter("@ID", headerid);
                SqlParameter TYPE = new SqlParameter("@TYPE", type);

                return _context.PriceConfirmDetails.FromSqlRaw("Exec GETPRICECONFIRMFORAPPROVAL @Enroll,@UnitID,@Code,@ID,@TYPE", UnitID, Code, Enroll, ID, TYPE);
            }
            catch (Exception ex)
            {
                _common.ErrorLog(strMsg, ex.ToString(), enumSubMenu.PC00001.ToString(), enumProcessName.PC.ToString(), unitid, enroll, "");
            }
            finally { }
            return null;
        }

        public IQueryable<OCFListView> GetOCFListPending(int type)
        {
            SqlParameter TYPE = new SqlParameter("@type", type);

            return _context.OCFListView.FromSqlRaw("Exec SPGETOCFPILISTPENDING @TYPE", TYPE);
        }
        public List<PriceReport> GetLasttenItem(int type)
        {
            var result = new List<PriceReport>();
            var idParameter = new SqlParameter("@ID", type);

            using (var connection = _context.Database.GetDbConnection())
            {
                connection.Open();

                using (var command = connection.CreateCommand())
                {
                    command.CommandText = "EXEC SPGETPREVIOUSPRICEHISTORY @ID";
                    command.CommandType = System.Data.CommandType.Text;
                    command.Parameters.Add(idParameter);

                    using (var reader = command.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            var priceReport = new PriceReport();

                          
                            if (priceReport.Columns == null)
                                priceReport.Columns = new Dictionary<string, object>();

                            // Dynamically populate the Columns dictionary
                            for (int i = 0; i < reader.FieldCount; i++)
                            {
                                var columnName = reader.GetName(i);
                                var value = reader.IsDBNull(i) ? null : reader.GetValue(i);
                                priceReport.Columns[columnName] = value; // Store column name and value in the model
                            }

                            result.Add(priceReport); // Add the populated PriceReport to the result list
                        }
                    }
                }
            }

            return result;
        }


        //public List<PriceReport> GetLasttenItem(int type)
        //{
        //    SqlParameter ID = new SqlParameter("@ID", type);

        //    var dt = _context.PriceReport.FromSqlRaw("Exec SPGETPREVIOUSPRICEHISTORY @ID", ID);

        //    return dt;
        //}

        //public PriceReport GetLasttenItem(int type)
        //{
        //    SqlParameter ID = new SqlParameter("@ID", type);

        //    //var dt = _context.PriceReport.FromSqlRaw("Exec SPGETPREVIOUSPRICEHISTORY @ID", ID);

        //    //return dt;
        //}

        public IQueryable<PriceConfirmQuotationDetails> EditDetailsByIDBiax(int headerid, int enroll, int unitid)
        {
            try
            {
                int type = 2;
                SqlParameter Enroll = new SqlParameter("@Enroll", enroll);
                SqlParameter UnitID = new SqlParameter("@UnitID", unitid);
                SqlParameter Code = new SqlParameter("@Code", enumSubMenu.PC00001.ToString());
                SqlParameter ID = new SqlParameter("@ID", headerid);
                SqlParameter TYPE = new SqlParameter("@TYPE", type);

                return _context.PriceConfirmQuotationDetails.FromSqlRaw("Exec GETPRICECONFIRMFORAPPROVALBIAX @Enroll,@UnitID,@Code,@ID,@TYPE", UnitID, Code, Enroll, ID, TYPE);
            }
            catch (Exception ex)
            {
                _common.ErrorLog(strMsg, ex.ToString(), enumSubMenu.PC00001.ToString(), enumProcessName.PC.ToString(), unitid, enroll, "");
            }
            finally { }
            return null;
        }

        public string SaveBiax(PriceConfirm pc, PILandingDetails[] ald)
        {
            try
            {
                DataTable details = new DataTable { TableName = "Details" };
                details.Columns.Add("ID", typeof(int));
                details.Columns.Add("ITEMID", typeof(int));
                details.Columns.Add("QUANTITY", typeof(decimal));
                details.Columns.Add("PRICE", typeof(decimal));
                details.Columns.Add("DISCOUNTID", typeof(decimal));
                details.Columns.Add("DISCOUNT", typeof(decimal));
                details.Columns.Add("VATID", typeof(int));
                details.Columns.Add("VATAMOUNT", typeof(decimal));
                details.Columns.Add("TOTALAMOUNT", typeof(decimal));
                details.Columns.Add("TOLERANCEID", typeof(int));
                details.Columns.Add("REMARKS", typeof(string));
                details.Columns.Add("DESCRIPTIONS", typeof(string));
                details.Columns.Add("FROMSHIPMENTSCHEDULEDATE", typeof(string));
                details.Columns.Add("TOSHIPMENTSCHEDULEDATE", typeof(string));
                details.Columns.Add("SHIPMENTMARK", typeof(string));
                details.Columns.Add("HSCODE", typeof(string));


                details.Columns.Add("UOMID", typeof(int));
                details.Columns.Add("THIKNESS", typeof(decimal));
                details.Columns.Add("WIDTH", typeof(decimal));
                details.Columns.Add("LENGTH", typeof(decimal));
                details.Columns.Add("TREATMENTLEVEL", typeof(string));
                details.Columns.Add("TREATMENTDIRECTIONID", typeof(int));
                details.Columns.Add("COREID", typeof(int));
                details.Columns.Add("REALOD", typeof(string));
                details.Columns.Add("DISEREDDATEOFDELIVERY", typeof(string));
                details.Columns.Add("TENTATIVEDATEOFDELIVERY", typeof(string));


                for (int i = 0; i < ald.Length; i++)
                {
                    details.Rows.Add(ald[i].ID, ald[i].ITEMID, ald[i].QUANTITY, ald[i].PRICE, ald[i].DISCOUNTID, ald[i].DISCOUNT, ald[i].VATID, ald[i].VATAMOUNT, ald[i].TOTALAMOUNT, ald[i].TOLERANCEID, ald[i].REMARKS, ald[i].DESCRIPTIONS, ald[i].FROMSHIPMENTSCHEDULEDATE, ald[i].TOSHIPMENTSCHEDULEDATE, ald[i].SHIPMENTMARK, ald[i].HSCODE,
                                     ald[i].UOMID, ald[i].THIKNESS, ald[i].WIDTH, ald[i].LENGTH, ald[i].TREATMENTLEVEL, ald[i].TREATMENTDIRECTIONID, ald[i].COREID, ald[i].REALOD, ald[i].DISEREDDATEOFDELIVERY, ald[i].TENTATIVEDATEOFDELIVERY
                        );
                }


                SqlParameter detailsparam = new SqlParameter();
                detailsparam.ParameterName = "@TYPEPRICECONFIRMINSERTLINE";
                detailsparam.SqlDbType = SqlDbType.Structured;
                detailsparam.TypeName = "TYPEPRICECONFIRMINSERTLINE";
                detailsparam.SqlValue = details;


                SqlParameter TERMSCONDITION = new SqlParameter("@TERMSCONDITION", pc.TERMSCONDITION == null ? "" : pc.TERMSCONDITION);
                SqlParameter DESCRIPTIONS = new SqlParameter("@DESCRIPTIONS", pc.DESCRIPTIONS == null ? "" : pc.DESCRIPTIONS);
                SqlParameter PRICEEXDATE = new SqlParameter("@PRICEEXDATE", pc.PRICEEXDATE == null ? "" : pc.PRICEEXDATE);
                SqlParameter PROFORMAINVOICEHEADERID = new SqlParameter("@PROFORMAINVOICEHEADERID", pc.PROFORMAINVOICEHEADERID);
                SqlParameter SELLERID = new SqlParameter("@SELLERID", pc.SELLERID);
                SqlParameter CUSTOMERID = new SqlParameter("@CUSTOMERID", pc.CUSTOMERID);



                SqlParameter MODULECODE = new SqlParameter("@ModuleCode", enumSubMenu.PC00001.ToString());
                SqlParameter UNITID = new SqlParameter("@UNITID", pc.UNITID);
                SqlParameter ENROLL = new SqlParameter("@Enroll", pc.DOCUMENTCREATEDBY);
                SqlParameter DOCSTATUS = new SqlParameter("@DocStatus", enumDocumentStatus.PEND.ToString());
                SqlParameter ProcessName = new SqlParameter("@ProcessName", enumProcessName.PC.ToString());
                SqlParameter MsgStatus = new SqlParameter("@MsgStatus", enumPCMessage.PCSAVE.ToString());
                SqlParameter NOTIFICATION = new SqlParameter("@Notification", enumPCNotification.PCSUBMIT.ToString());
                SqlParameter LOG = new SqlParameter("@Log", "");

                var outParam = new SqlParameter
                {
                    ParameterName = "@Msg",
                    Size = 100,
                    SqlDbType = System.Data.SqlDbType.Char,
                    Direction = System.Data.ParameterDirection.Output
                };

                StringWriter sw;
                using (sw = new StringWriter())
                {
                    //master.WriteXml(sw);
                    details.WriteXml(sw);
                }

                _context.Database.ExecuteSqlRaw("Exec SPSAVEPRICECONFIRMBIAX @TYPEPRICECONFIRMINSERTLINE,@PRICEEXDATE,@TERMSCONDITION,@DESCRIPTIONS,@PROFORMAINVOICEHEADERID,@SELLERID,@CUSTOMERID,@MODULECODE,@UNITID,@ENROLL,@DOCSTATUS,@PROCESSNAME,@MsgStatus,@NOTIFICATION,@LOG,@Msg output",
                  detailsparam, PRICEEXDATE, TERMSCONDITION, DESCRIPTIONS, PROFORMAINVOICEHEADERID, SELLERID, CUSTOMERID, MODULECODE, UNITID, ENROLL, DOCSTATUS, ProcessName, MsgStatus, NOTIFICATION, LOG, outParam);
                //_context.Database.ExecuteSqlRaw("Exec SPSAVEPISC @typeInsertSalesQuatationHeader,@typeInsertSalesQuatationLine,@UnitID,@ModuleCode,@Enroll,@DocStatus,@ProcessName,@MsgStatus,@Notification,@Log,@Msg output", masterparam, detailsparam, UnitID, ModuleCode, Enroll, DocStatus, ProcessName, MsgStatus, Notification, LOG, outParam);
                strMsg = outParam.Value.ToString();
                return strMsg;
            }
            catch (Exception ex)
            {
                _common.ErrorLog(strMsg, ex.ToString(), enumSubMenu.PC00001.ToString(), enumProcessName.PC.ToString(), pc.UNITID, pc.DOCUMENTCREATEDBY, "");
            }
            finally
            { }
            return null;
        }

        public string SaveDetails(PriceConfirmDetails[] sqd, int enroll, int unitid)
        {
            throw new NotImplementedException();
        }

        public string SaveMaster(PriceConfirm pc, PriceConfirmDetails[] pcd)
        {
            try
            {
                DataTable details = new DataTable { TableName = "Details" };
                details.Columns.Add("ID", typeof(int));
                details.Columns.Add("ITEMID", typeof(int));
                details.Columns.Add("QUANTITY", typeof(decimal));
                details.Columns.Add("PRICE", typeof(decimal));
                details.Columns.Add("OFFERPRICE", typeof(decimal));
                details.Columns.Add("CONFIRMPRICE", typeof(decimal));

                for (int i = 0; i < pcd.Length; i++)
                {
                    details.Rows.Add(pcd[i].ID,pcd[i].ITEMID, pcd[i].QUANTITY, pcd[i].PRICE, pcd[i].OFFERPRICE, pcd[i].CONFIRMPRICE);
                }

                SqlParameter detailsparam = new SqlParameter();
                detailsparam.ParameterName = "@TYPEPCINSERTLINE";
                detailsparam.SqlDbType = SqlDbType.Structured;
                detailsparam.TypeName = "TYPEPCINSERTLINE";
                detailsparam.SqlValue = details;


                SqlParameter TERMSCONDITION = new SqlParameter("@TERMSCONDITION", pc.TERMSCONDITION == null ? "" : pc.TERMSCONDITION);
                SqlParameter DESCRIPTIONS = new SqlParameter("@DESCRIPTIONS", pc.DESCRIPTIONS == null ? "" : pc.DESCRIPTIONS);
                SqlParameter PROFORMAINVOICEHEADERID = new SqlParameter("@PROFORMAINVOICEHEADERID", pc.PROFORMAINVOICEHEADERID);
                SqlParameter SELLERID = new SqlParameter("@SELLERID", pc.SELLERID);
                SqlParameter CUSTOMERID = new SqlParameter("@CUSTOMERID", pc.CUSTOMERID);



                SqlParameter MODULECODE = new SqlParameter("@ModuleCode", enumSubMenu.PC00001.ToString());
                SqlParameter UNITID = new SqlParameter("@UNITID", pc.UNITID);
                SqlParameter ENROLL = new SqlParameter("@Enroll", pc.DOCUMENTCREATEDBY);
                SqlParameter DOCSTATUS = new SqlParameter("@DocStatus", enumDocumentStatus.PEND.ToString());
                SqlParameter ProcessName = new SqlParameter("@ProcessName", enumProcessName.PC.ToString());
                SqlParameter MsgStatus = new SqlParameter("@MsgStatus", enumPCMessage.PCSAVE.ToString());
                SqlParameter NOTIFICATION = new SqlParameter("@Notification", enumPCNotification.PCSUBMIT.ToString());
                SqlParameter LOG = new SqlParameter("@Log", "");

                var outParam = new SqlParameter
                {
                    ParameterName = "@Msg",
                    Size = 100,
                    SqlDbType = System.Data.SqlDbType.Char,
                    Direction = System.Data.ParameterDirection.Output
                };

                StringWriter sw;
                using (sw = new StringWriter())
                {
                    //master.WriteXml(sw);
                    details.WriteXml(sw);
                }

                _context.Database.ExecuteSqlRaw("Exec SPSAVEPRICECONFIRM @TYPEPCINSERTLINE,@TERMSCONDITION,@DESCRIPTIONS,@PROFORMAINVOICEHEADERID,@SELLERID,@CUSTOMERID,@MODULECODE,@UNITID,@ENROLL,@DOCSTATUS,@PROCESSNAME,@MsgStatus,@NOTIFICATION,@LOG,@Msg output",
                  detailsparam, TERMSCONDITION, DESCRIPTIONS, PROFORMAINVOICEHEADERID, SELLERID, CUSTOMERID, MODULECODE, UNITID, ENROLL, DOCSTATUS, ProcessName, MsgStatus, NOTIFICATION, LOG, outParam);
                //_context.Database.ExecuteSqlRaw("Exec SPSAVEPISC @typeInsertSalesQuatationHeader,@typeInsertSalesQuatationLine,@UnitID,@ModuleCode,@Enroll,@DocStatus,@ProcessName,@MsgStatus,@Notification,@Log,@Msg output", masterparam, detailsparam, UnitID, ModuleCode, Enroll, DocStatus, ProcessName, MsgStatus, Notification, LOG, outParam);
                strMsg = outParam.Value.ToString();
                return strMsg;
            }
            catch(Exception ex)
            {
                _common.ErrorLog(strMsg, ex.ToString(), enumSubMenu.PC00001.ToString(), enumProcessName.PC.ToString(), pc.UNITID, pc.DOCUMENTCREATEDBY, "");
            }
            finally
            { }
            return null;
        }

        public string UpdateDetailsByID(PriceConfirmQuotationDetails sqd, int unitid, int enroll)
        {
            PROCESSID = sqd.ID;
            try
            {
                SqlParameter ID = new SqlParameter("@ID", sqd.ID);
                SqlParameter ITEMID = new SqlParameter("@ITEMID", sqd.ITEMID);
                SqlParameter QUANTITY = new SqlParameter("@QUANTITY", sqd.QUANTITY);
                SqlParameter PRICE = new SqlParameter("@PRICE", sqd.PRICE);
                SqlParameter OFFERPRICE = new SqlParameter("@OFFERPRICE", sqd.OFFERPRICE);
                SqlParameter CONFIRMPRICE = new SqlParameter("@CONFIRMPRICE", sqd.CONFIRMPRICE);
                SqlParameter DISCOUNTID = new SqlParameter("@DISCOUNTID", sqd.DISCOUNTID);
                SqlParameter DISCOUNT = new SqlParameter("@DISCOUNT", sqd.DISCOUNT == null ? "" : sqd.DISCOUNT);
                SqlParameter TOTALAMOUNT = new SqlParameter("@TOTALAMOUNT", sqd.TOTALAMOUNT);
                SqlParameter UOMID = new SqlParameter("@UOMID", sqd.UOMID);
                SqlParameter THIKNESS = new SqlParameter("@THIKNESS", sqd.THIKNESS);
                SqlParameter WIDTH = new SqlParameter("@WIDTH", sqd.WIDTH);
                SqlParameter LENGTH = new SqlParameter("@LENGTH", sqd.LENGTH);
                SqlParameter TREATMENTLEVEL = new SqlParameter("@TREATMENTLEVEL", sqd.TREATMENTLEVEL == null ? "" : sqd.TREATMENTLEVEL);
                SqlParameter TREATMENTDIRECTIONID = new SqlParameter("@TREATMENTDIRECTIONID", sqd.TREATMENTDIRECTIONID);
                SqlParameter COREID = new SqlParameter("@COREID", sqd.COREID);
                SqlParameter DISEREDDATEOFDELIVERY = new SqlParameter("@DISEREDDATEOFDELIVERY", sqd.DISEREDDATEOFDELIVERY == null ? "" : sqd.DISEREDDATEOFDELIVERY);
                SqlParameter TENTATIVEDATEOFDELIVERY = new SqlParameter("@TENTATIVEDATEOFDELIVERY", sqd.TENTATIVEDATEOFDELIVERY == null ? "" : sqd.TENTATIVEDATEOFDELIVERY);
                SqlParameter REMARKS = new SqlParameter("@REMARKS", sqd.REMARKS == null ? "" : sqd.REMARKS);
                SqlParameter DESCRIPTIONS = new SqlParameter("@DESCRIPTIONS", sqd.DESCRIPTIONS == null ? "" : sqd.DESCRIPTIONS);
                SqlParameter REALOD = new SqlParameter("@REALOD", sqd.REALOD == null ? "" : sqd.REALOD);
               

                SqlParameter UnitID = new SqlParameter("@UnitID", unitid);
                SqlParameter ModuleCode = new SqlParameter("@ModuleCode", enumSubMenu.PC00001.ToString());
                SqlParameter Enroll = new SqlParameter("@Enroll", enroll);
                SqlParameter ProcessCode = new SqlParameter("@ProcessCode", enumProcessName.PC.ToString());
                SqlParameter MessageName = new SqlParameter("@MessageName", enumPCMessage.PCEDIT.ToString());

                var outParam = new SqlParameter
                {
                    ParameterName = "@Msg",
                    Size = 100,
                    SqlDbType = System.Data.SqlDbType.Char,
                    Direction = System.Data.ParameterDirection.Output
                };

                _context.Database.ExecuteSqlRaw("Exec SPUPDATEPRICECONFIRMLINE @ID,@ITEMID,@QUANTITY,@PRICE,@OFFERPRICE,@CONFIRMPRICE,@DISCOUNTID,@DISCOUNT,@TOTALAMOUNT,@UOMID,@THIKNESS,@WIDTH,@LENGTH,@TREATMENTLEVEL,@TREATMENTDIRECTIONID,@COREID,@DISEREDDATEOFDELIVERY,@TENTATIVEDATEOFDELIVERY,@REMARKS,@DESCRIPTIONS,@REALOD,@UnitID,@ModuleCode,@Enroll,@ProcessCode,@MessageName, @Msg output", 
                    ID, ITEMID, QUANTITY, PRICE,OFFERPRICE,CONFIRMPRICE, DISCOUNTID, DISCOUNT, TOTALAMOUNT, UOMID, THIKNESS, WIDTH, LENGTH, TREATMENTLEVEL, TREATMENTDIRECTIONID, COREID, DISEREDDATEOFDELIVERY, TENTATIVEDATEOFDELIVERY, REMARKS, DESCRIPTIONS, REALOD, UnitID, ModuleCode, Enroll, ProcessCode, MessageName, outParam);
                strMsg = outParam.Value.ToString();
            }
            catch (Exception ex)
            {
                _common.ErrorLog(PROCESSID.ToString(), ex.ToString(), enumSubMenu.PC00001.ToString(), enumProcessName.PC.ToString(), unitid, enroll, "");
            }

            return strMsg;
        }

        public string UpdateMaster(PriceConfirm pc)
        {
            try
            {
                SqlParameter ID = new SqlParameter("@ID", pc.ID);
                SqlParameter TERMSCONDITION = new SqlParameter("@TERMSCONDITION", pc.TERMSCONDITION == null ? "" : pc.TERMSCONDITION);
                SqlParameter DESCRIPTIONS = new SqlParameter("@DESCRIPTIONS", pc.DESCRIPTIONS == null ? "" : pc.DESCRIPTIONS);

                SqlParameter MODULECODE = new SqlParameter("@ModuleCode", enumSubMenu.PC00001.ToString());
                SqlParameter UNITID = new SqlParameter("@UNITID", pc.UNITID);
                SqlParameter ENROLL = new SqlParameter("@Enroll", pc.DOCUMENTCREATEDBY);
                SqlParameter DOCSTATUS = new SqlParameter("@DocStatus", enumDocumentStatus.PEND.ToString());
                SqlParameter ProcessName = new SqlParameter("@ProcessName", enumProcessName.PC.ToString());
                SqlParameter MsgStatus = new SqlParameter("@MsgStatus", enumPCMessage.PCEDIT.ToString());
                SqlParameter NOTIFICATION = new SqlParameter("@Notification", enumPCNotification.PCESSUBMIT.ToString());
                SqlParameter LOG = new SqlParameter("@Log", "");

                var outParam = new SqlParameter
                {
                    ParameterName = "@Msg",
                    Size = 100,
                    SqlDbType = System.Data.SqlDbType.Char,
                    Direction = System.Data.ParameterDirection.Output
                };

                

                _context.Database.ExecuteSqlRaw("Exec SPUPDATEPRICECONFIRM @ID,@TERMSCONDITION,@DESCRIPTIONS,@MODULECODE,@UNITID,@ENROLL,@DOCSTATUS,@PROCESSNAME,@MsgStatus,@NOTIFICATION,@LOG,@Msg output",
                  ID, TERMSCONDITION, DESCRIPTIONS, MODULECODE, UNITID, ENROLL, DOCSTATUS, ProcessName, MsgStatus, NOTIFICATION, LOG, outParam);
                //_context.Database.ExecuteSqlRaw("Exec SPSAVEPISC @typeInsertSalesQuatationHeader,@typeInsertSalesQuatationLine,@UnitID,@ModuleCode,@Enroll,@DocStatus,@ProcessName,@MsgStatus,@Notification,@Log,@Msg output", masterparam, detailsparam, UnitID, ModuleCode, Enroll, DocStatus, ProcessName, MsgStatus, Notification, LOG, outParam);
                strMsg = outParam.Value.ToString();
                return strMsg;
            }
            catch(Exception ex)
            {
                _common.ErrorLog(PROCESSID.ToString(), ex.ToString(), enumSubMenu.PC00001.ToString(), enumProcessName.PC.ToString(), pc.UNITID, pc.DOCUMENTCREATEDBY, "");
            }
            finally { }
            return null;
        }

        IQueryable<PriceConfirmView> IPriceConfirm.GetPendingList(int enroll, int unitid)
        {
            try
            {
                int type = 3;
                int id = 0;
                SqlParameter Enroll = new SqlParameter("@Enroll", enroll);
                SqlParameter UnitID = new SqlParameter("@UnitID", unitid);
                SqlParameter Code = new SqlParameter("@Code", enumSubMenu.PC00001.ToString());
                SqlParameter ID = new SqlParameter("@ID", id);
                SqlParameter TYPE = new SqlParameter("@TYPE", type);

                return _context.PriceConfirmView.FromSqlRaw("Exec GETPRICECONFIRMFORAPPROVAL @Enroll,@UnitID,@Code,@ID,@TYPE", UnitID, Code, Enroll, ID, TYPE);
            }
            catch (Exception ex)
            {
                _common.ErrorLog(strMsg, ex.ToString(), enumSubMenu.PC00001.ToString(), enumProcessName.PC.ToString(), unitid, enroll, "");
            }
            finally { }
            return null;
        }


        public IQueryable<AgreementLandingDetails> PriceConfirm(int headerid)
        {
            try
            {
                //int id = 1;
                int id = 1;
                SqlParameter ID = new SqlParameter("@id", id);
                SqlParameter HeaderID = new SqlParameter("@headerid", headerid);

                //return _context.AgreementLandingDetails.FromSqlRaw("Exec GETAGREEMENTINFOMASTERDETAILSBYID @id,@headerid", ID, HeaderID
                return _context.AgreementLandingDetails.FromSqlRaw("Exec SPVIEWPISC @id,@headerid", ID, HeaderID);
            }
            catch (Exception) { }
            finally { }
            return null;
        }

        public IQueryable<PriceConfirmQuotationApproval> GetPriceConfirmApprovalQuotations(int id)
        {
            try
            {
                SqlParameter ID = new SqlParameter("@ID", id);
                return _context.GetPriceConfirmQuotationApprovals.FromSqlRaw("Exec SPPriceApprovalQuotation @ID", ID).AsNoTracking();
            }
            catch (Exception)
            {

            }
            return null;
        }
    }
}
