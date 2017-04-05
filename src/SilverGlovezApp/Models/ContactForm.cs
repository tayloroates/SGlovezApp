using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SilverGlovezApp.Models
{
    public class ContactForm
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public int Phone { get; set; }
        public string Message { get; set; }
    }
}
