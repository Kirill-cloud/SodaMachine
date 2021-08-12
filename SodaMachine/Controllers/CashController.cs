using Microsoft.AspNetCore.Mvc;

namespace SodaMachine.Controllers
{

    public class CashController : Controller
    {
        static int[] AvailableCoins = new int[4] { 0, 1, 1, 1};
        public static int Total = 0;

        [HttpGet]
        public int[] Get()
        {
            return AvailableCoins;
        }
        [HttpGet]
        public int GetTotal()
        {
            return Total;
        }
        [HttpPost]
        public ActionResult Post([FromBody] int[] availableCoins)
        {
            AvailableCoins = availableCoins;
            return Ok();
        }
    }
}
