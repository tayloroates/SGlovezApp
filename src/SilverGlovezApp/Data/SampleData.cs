using System;
using System.Linq;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Identity;
using System.Security.Claims;
using System.Threading.Tasks;
using SilverGlovezApp.Models;
using System.Collections.Generic;

namespace SilverGlovezApp.Data
{
    public class OneMany
    {
        public static void Initialize(IServiceProvider serviceProvider)
        {
            var db = serviceProvider.GetService<ApplicationDbContext>();
            if (!db.Teams.Any())
            {
                db.Teams.AddRange(
                    new Team
                    {
                        TeamName = "Silver Glovez",
                        Players = new List<Player>
                        {
                        new Player {LastName="Oates", FirstName="Myles" },
                        new Player {LastName="Smith", FirstName="Bob" },
                        new Player {LastName="Johnson", FirstName="David" }
                    }
                    }
                    );
                db.SaveChanges();
            }



        }
    }
    public class SampleData
    {

        public async static Task Initialize(IServiceProvider serviceProvider)
        {
            var context = serviceProvider.GetService<ApplicationDbContext>();
            var userManager = serviceProvider.GetService<UserManager<ApplicationUser>>();

            // Ensure db
            context.Database.EnsureCreated();

            // Ensure Taylor (IsAdmin)
            var taylor = await userManager.FindByNameAsync("tay.gabrielle@gmail.com");
            if (taylor == null)
            {
                // create user
                taylor = new ApplicationUser
                {
                    UserName = "tay.gabrielle@gmail.com",
                    Email = "tay.gabrielle@gmail.com"
                };
                await userManager.CreateAsync(taylor, "Secret123!");

                // add claims
                await userManager.AddClaimAsync(taylor, new Claim("IsAdmin", "true"));
            }

            // Ensure Myles (not IsAdmin)
            var myles = await userManager.FindByNameAsync("myles2kool@gmail.com");
            if (myles == null)
            {
                // create user
                myles = new ApplicationUser
                {
                    UserName = "myles2kool@gmail.com",
                    Email = "Myles2kool@gmail.com"
                };
                await userManager.CreateAsync(myles, "Secret123!");
            }


        }

    }
}
