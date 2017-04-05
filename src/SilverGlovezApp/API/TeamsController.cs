using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SilverGlovezApp.Data;
using SilverGlovezApp.Models;
using Microsoft.EntityFrameworkCore;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace SilverGlovezApp.API
{
    [Route("api/[controller]")]
    public class TeamsController : Controller
    {
        private ApplicationDbContext _db;

        public TeamsController(ApplicationDbContext db)
        {
            this._db = db;
        }
        // GET: api/values
        [HttpGet]
        public IEnumerable<Team> Get()
        {
            var players = _db.Teams.Include(t => t.Players).ToList();
            return players;
        }

        // GET api/values/5
        [HttpGet("{name}")]
        public IActionResult Get(string name)
        {
           var players = _db.Teams.Include(t => t.Players).Where(t => t.TeamName == name).ToList();
            if (players == null)
            {
                return NotFound();
            }
            return Ok(players);
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody]string value)
        {
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
