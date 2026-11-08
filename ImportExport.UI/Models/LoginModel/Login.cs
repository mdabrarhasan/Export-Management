using System.ComponentModel.DataAnnotations.Schema;

namespace ImportExport.UI.Models.LoginModel
{
    public class Login
    {
        public int RowID { get; set; }
        public int Enroll { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public int Unit { get; set; }
        public string UnitName { get; set; }
        public int intDepartmentID { get; set; }
        public string strDepatment { get; set; }
        public int Designation { get; set; }
        public string DesignationName { get; set; }
        [NotMapped]
        public int intJobStationID { get; set; }
        [NotMapped]
        public string strJobStationName { get; set; }
        [NotMapped]
        public int Jobtype { get; set; }
        [NotMapped]
        public string jobtypeName { get; set; }
        public string dteAppointmentDate { get; set; }
        [NotMapped]
        public int intPfUnitId { get; set; }
        public string Email { get; set; }
        public string Phoneno { get; set; }
        [NotMapped]
        public string Supervisor { get; set; }
        [NotMapped]
        public int OTP { get; set; }
        [NotMapped]
        public string Message_ { get; set; }

    }
}
