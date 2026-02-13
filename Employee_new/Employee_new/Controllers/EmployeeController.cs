using Employee_new.models;
using Employee_new.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Employee_new.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly EmployeeRepository emp;

        public EmployeeController(EmployeeRepository employeeRepository)
        {
            this.emp = employeeRepository;
        }

        // ✅ GET: api/employee
        [HttpGet]
        public async Task<ActionResult> EmployeeList()
        {
            var allemployees = await emp.GetAllEmployees();
            return Ok(allemployees);
        }

        // ✅ POST: api/employee
        [HttpPost]
        public async Task<ActionResult> AddEmployee(Employee vm)
        {
            await emp.SaveEmployee(vm);
            return Ok(vm);
        }

       
        [HttpPut ("{id}")]
        public async Task<ActionResult>updateEmployee(int id, [FromBody] Employee vm)
        {
            await emp.updateEmployee(id, vm);
            return Ok (vm);
        }
        // ✅ DELETE: api/employee/{id}
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteEmployee(int id)
        {
            await emp.DeleteEmployee(id);
           
            return Ok();
        }

    }
}
