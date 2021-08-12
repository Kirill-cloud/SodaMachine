using Microsoft.AspNetCore.Mvc;

namespace SodaMachine.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : Controller
    {
        public static int balance = 0;

        [HttpGet]
        public int Get()
        {
            return balance;
        }

        [HttpPost]
        public ActionResult Post(int amount)
        {
            balance += amount;
            return Ok();
        }
    }
}
