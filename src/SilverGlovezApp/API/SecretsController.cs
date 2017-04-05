using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using SilverGlovezApp.Models;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace SilverGlovezApp.API
{
    [Route("api/[controller]")]
    public class SecretsController : Controller
    {
        // GET: api/values
        [HttpGet]
        [Authorize(Policy = "AdminOnly")]
        public IEnumerable<string> Get()
        {
            var user = this.User;
            return new string[] { "Welcome Brett Oates!" };
        }

        

    }
}
