namespace ImportExport.UI.Models.CommonModel
{
    public static class EnamProcess
    {
        
        public static string APILOGIN = "";

        public static string APIDOWNLOADMULTIPLEFILE = "";
        public static string APIUPLOADMULTIPLEFILE = "";
    }

    

    public enum enumProcessName { SQ, PI, SC,LC,PC,PR,PRC,PRESHIP,POSTSHIP,QUO,LCVSBILL,CQ,FRC,FC }
    public enum enumSubMenu { SQ00001, SC00001, PI00001, LC00001,PC00001, PR00001, PRC00001, PRE00001, POST00001, QUO00001, LCVSBILL00001, CS00002, FRC00001, FC0001 }
    public enum enumDocumentStatus { INIT, PEND, APPR, REJC }
    //======================== Messaage ===============================
    public enum enumSQMessage {SQSAVE,SQEDIT,SQDEL,SQAPPR,SQREJ }
    public enum enumPIMessage { PISAVE, PIEDIT, PIDEL, PIAPPR, PIREJ }
    public enum enumPCMessage { PCSAVE, PCEDIT, PCDEL, PCAPPR, PCREJ }
    public enum enumSCMessage { SCSAVE, SCEDIT, SCDEL, SCAPPR, SCREJ }
    public enum enumLCMessage { LCSAVE, LCEDIT, LCDEL, LCAPPR, LCREJ }
    public enum enumPRMessage { PRSAVE, PREDIT, PRDEL, PRAPPR, PRREJ }
    public enum enumFCMessage { FCSAVE, FCEDIT, FCDEL, FCAPPR }
    public enum enumPRCMessage { PRCSAVE, PRCEDIT, PRCDEL, PRCAPPR, PRCREJ }
    public enum enumQuotationMessage { QUOSAVE, QUOEDIT, QUODEL, QUOAPPR, QUOREJ }

    public enum enumPRESHIPMessage { PRESAVE, PREEDIT, PREDEL, PREAPPR, PREREJ }
    public enum enumLCVSBILLMessage { LCVSBILLSAVE, LCVSBILLEDIT, LCVSBILLDEL, LCVSBILLAPPR, LCVSBILLREJC }

    //======================== End Messaage ===============================
    public enum enumSQNotification { SQESUBMIT, SQEAPPROVE, SQEREJECT, SQSSUBMIT }
    public enum enumPINotification { PISUBMIT, PIAPPROVE, PIREJECT, PIESUBMIT }
    public enum enumPCNotification { PCSUBMIT, PCAPPROVE, PCREJECT, PCESSUBMIT }
    public enum enumSCNotification { SCSUBMIT, SCAPPROVE, SCREJECT, SCESSUBMIT }
    public enum enumQuoNotification { QUOSUBMIT, QUOAPPROVE, QUOREJECT, QUOESSUBMIT }
    public enum enumLCNotification { LCSUBMIT, LCAPPROVE, LCREJECT, LCESSUBMIT }
    public enum enumPRNotification { PRSAVE, PREDIT, PRDEL, PRAPPR, PRREJ }
    public enum enumPRCNotification { PRCSAVE, PRCEDIT, PRCDEL, PRCAPPR, PRCREJ }
    public enum enumPRESHIPNotification { PRESAVE, PREEDIT, PREDEL, PREAPPR, PREREJ }
    public enum enumFreightCostNotification { FRCSAVE, FRCEDIT, FRCDEL, FRCAPPR,FRCREJ }
    //======================== API Connection ===============================

    public enum enumRootModule { CODE0002 }
}
