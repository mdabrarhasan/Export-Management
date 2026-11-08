using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ImportExport.UI.Models.AuthModel
{
    public class LoginModel
    {
        [Key]
        public int RowID { get; set; }
        public int Enroll { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public int Unit { get; set; }
        public string UnitName { get; set; }
        public int intDepartmentID { get; set; }
        public string strDepatrment { get; set; }
    
        public int Designation { get; set; }
        public string DesignationName { get; set; }
        public int intJobStationID { get; set; }
        public string strJobStationName { get; set; }
        [NotMapped]
        public int Jobtype { get; set; }
        public string jobtypeName { get; set; }
        [NotMapped]
        public string dteAppointmentDate { get; set; }
        public int intPfUnitId { get; set; }
        public string Email { get; set; }
        public string Phoneno { get; set; }
        public string Supervisor { get; set; }
        [NotMapped]
        public int OTP { get; set; }
        [NotMapped]
        public string Message_ { get; set; }
    }
}
