using System.ComponentModel.DataAnnotations;

namespace Employee_new.models
{
    public class Employee
    {
        [Key]
        public int id { get; set; }
        public required string name { get; set; }
        public required string email { get; set; }
        public string? mobile { get; set; }
        public int salary { get; set; }
        public bool status { get; set; }


    }
}
