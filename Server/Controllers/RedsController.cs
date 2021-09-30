using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Server.Models;

namespace Server.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class RedsController : ControllerBase
    {
        //NOTE: Validation https://docs.microsoft.com/en-us/aspnet/core/mvc/models/validation?view=aspnetcore-5.0

        public AndjelaContext Context { get; set; }

        public RedsController(AndjelaContext context)
        {
            Context = context;
        }


        [Route("UpisiRed/{idKluba}")]
        [HttpPost]
        public async Task<int> PostRed(int idKluba, [FromBody] Red red)
        {
            var klubZaUpis = await Context.Klubovi.FindAsync(idKluba);
            red.Klub = klubZaUpis;
            Context.Redovi.Add(red);
            await Context.SaveChangesAsync();

            return red.ID;
        }

        [Route("PreuzmiRedove")]
        [HttpGet]
        public async Task<List<Red>> GetRedovi()
        {
            return await Context.Redovi.Include(p => p.Filmovi).ToListAsync();
        }

        [Route("PreuzmiRedove/{idKluba}")]
        [HttpGet]
        public async Task<List<Red>> GetRedovi(int idKluba)
        {
            return await Context.Redovi
                .Where(r => r.Klub.ID == idKluba)
                .Include(p => p.Filmovi)
                .ToListAsync();
        }

        [Route("IzbrisiRed/{id}")]
        [HttpDelete]
        public async Task<IActionResult> DeleteRed(int id)
        {
            var red = await Context.Redovi.FindAsync(id);
            if (red == null)
                return NotFound();

            Context.Redovi.Remove(red);
            await Context.SaveChangesAsync();
            return Ok();
        }


        [Route("IzmeniRed")]
        [HttpPut]
        public async Task PutRed([FromBody] Red red)
        {

            Context.Update<Red>(red);
            await Context.SaveChangesAsync();
        }
    }
}