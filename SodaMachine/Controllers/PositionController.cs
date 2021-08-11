using Microsoft.AspNetCore.Mvc;
using SodaMachine.Models;
using System.Collections.Generic;
using System.Linq;


namespace SodaMachine.Controllers
{

    public class PositionController : Controller
    {
        static List<Position> AllPositions
        {
            get
            {
                using (SodaContext db = new())
                {
                    return db.Positions.ToList();
                }
            }
        }

        [HttpGet]
        public List<Position> Get()
        {
            return AllPositions;
        }

        [HttpPost]
        public ActionResult Post(int id)
        {
            using (SodaContext db = new())
            {
                if (db.Positions.Find(id) != null && db.Positions.Find(id).Count > 0)
                {
                    var x = db.Positions.Find(id);
                    x.Count--;

                    db.SaveChanges();
                    UserController.balance -= x.Price;
                }
            }

            return Ok();
        }
        [HttpPost]
        public ActionResult AddPosition([FromBody] Position position)
        {
            using (SodaContext db = new())
            {
                if (db.Positions.Find(position.Id) == null)
                {
                    db.Positions.Add(position);
                }
                else
                {
                    var p1 = db.Positions.Find(position.Id);
                    p1.Picture = position.Picture;
                    p1.Name = position.Name;
                    p1.Price = position.Price;
                    p1.Count = position.Count;
                }
                db.SaveChanges();
            }

            return Ok();
        }
    }
}
