using Employee_new.Data;
using Employee_new.models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Employee_new.Repository
{
    public class EmployeeRepository
    {
        private readonly AppDbContext db;

        public EmployeeRepository(AppDbContext dbcontext)
        {
            this.db = dbcontext;
        }

        // ✅ Get all employees
        public async Task<List<Employee>> GetAllEmployees()
        {
            return await db.Employee.ToListAsync();
        }

        // ✅ Add employee
        public async Task SaveEmployee(Employee emp)
        {
            await db.Employee.AddAsync(emp);
            await db.SaveChangesAsync();
        }

        public async Task updateEmployee(int id, Employee obj)
        {
             var employee = await db.Employee.FindAsync(id);
            if (employee == null)
            {
                throw new Exception("Employee Not Found");
            }
            employee.name= obj.name;
            employee.email= obj.email;
            employee.mobile= obj.mobile;
            employee.salary= obj.salary;
            employee.status = obj.status;
            await db.SaveChangesAsync();
        }

        // ✅ Delete employee
        public async Task DeleteEmployee(int id)
        {
            var employee = await db.Employee.FindAsync(id);
            if (employee == null)
            {
                throw new Exception("Employee Not Found");
            }
            db.Employee.Remove(employee);
            await db.SaveChangesAsync();
        }
    }
}
