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
    public class FilmsController : ControllerBase
    {
        public AndjelaContext Context { get; set; }

        public FilmsController(AndjelaContext context)
        {
            Context = context;
        }

        [Route("PreuzmiFilmove")]
        [HttpGet]
        public async Task<List<Film>> GetFilmovi()
        {
            return await Context.Filmovi.ToListAsync();
        }

        [Route("PreuzmiFilmove/{idReda}")]
        [HttpGet]
        public async Task<List<Film>> GetRedovi(int idReda)
        {
            return await Context.Filmovi
                .Where(r => r.Red.ID == idReda)
                .ToListAsync();
        }

        [Route("IzmeniFilm")]
        [HttpPut]
        public async Task PutFilm([FromBody] Film film)
        {
            Context.Update<Film>(film);
            await Context.SaveChangesAsync();
        }

        [Route("UpisiFilm/{idReda}")]
        [HttpPost]
        public async Task<int> PostFilm(int idReda, [FromBody] Film film)
        {
            var redZaUpis = await Context.Redovi.FindAsync(idReda);
            film.Red = redZaUpis;
            Context.Filmovi.Add(film);
            await Context.SaveChangesAsync();

            return film.ID;
        }

        [Route("IzbrisiFilm/{id}")]
        [HttpDelete]
        public async Task DeleteFilm(int id)
        {
            var film = await Context.Filmovi.FindAsync(id);
            if (film != null)
            {
                Context.Filmovi.Remove(film);
                await Context.SaveChangesAsync();
            }
        }
    }
}