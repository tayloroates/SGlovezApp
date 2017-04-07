using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SilverGlovezApp.Data;
using SilverGlovezApp.ViewModels;
using SilverGlovezApp.Models;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace SilverGlovezApp.API
{
    [Route("api/[controller]")]
    public class PlayerController : Controller
    {
        private ApplicationDbContext _db;

        public PlayerController(ApplicationDbContext db)
        {
            this._db = db;
        }

        // GET: api/values
        [HttpGet]
        public IEnumerable<Player> Get()
        {
            var players = _db.Players.ToList();
            return players;
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var player = _db.Players.FirstOrDefault(f => f.Id == id);
            if (player == null)
            {
                return NotFound();
            }
            return Ok(player);
        }

        // POST api/values
        [HttpPost]
        public IActionResult Post([FromBody]Player player)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(this.ModelState);
            }
            if (player.Id == 0)
            {
                _db.Players.Add(player);
                _db.SaveChanges();
                return Created("/player/" + player.LastName + player.FirstName, player);
            }
            else
            {
                var original = _db.Players.FirstOrDefault(f => f.Id == player.Id);
                original.FirstName = player.FirstName;
                original.LastName = player.LastName;

                _db.SaveChanges();
                
            }
            return Ok(player);

        }
    
        [HttpPost ("{id}")]
        public IActionResult Post(int id, [FromBody]Player player)
        {
            _db.Players.Add(player);
            _db.SaveChanges();

            return Ok();
        }
        private IActionResult Add(Player player)
        {
            return Created("/player/" + player.LastName + player.FirstName, player);
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var player = _db.Players.FirstOrDefault(p => p.Id == id);
            if(player == null)
            {
                return NotFound();
            }
            _db.Players.Remove(player);
            _db.SaveChanges();
            return Ok();
        }
    }
}
