using Microsoft.AspNetCore.Mvc;

namespace SodaMachine.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CashController : Controller
    {
        static int[] AvailableCoins = new int[4] { 0, 1, 1, 1};
        
        [HttpGet]
        public int[] Get()
        {
            return AvailableCoins;
        }

        [HttpPost]
        public ActionResult Post([FromBody] int[] availableCoins)
        {
            AvailableCoins = availableCoins;
            return Ok();
        }
    }
}
