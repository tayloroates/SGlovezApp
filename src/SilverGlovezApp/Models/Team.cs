using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SilverGlovezApp.Models
{
    public class Team
    {
        public int Id { get; set; }
        public string TeamName { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public ICollection<Player> Players { get; set; }
    }
}
