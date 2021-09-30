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
    public class KlubsController : ControllerBase
    {
       // private readonly AndjelaContext _context;

        public AndjelaContext Context {get;set;}

        public KlubsController(AndjelaContext context)
        {
            Context = context;
        }

        
        [Route("PreuzmiKlubove")]
        [HttpGet]
        public async Task<List<Klub>> GetKlubovi()
        {
            return await Context.Klubovi.Include(p=>p.Redovi).ToListAsync();
        }

        [Route("IzmeniKlub")]
        [HttpPut]
        public async Task PutKlub([FromBody]Klub klub)
        {
          
            Context.Update<Klub>(klub);
            await Context.SaveChangesAsync();
        }
        
        
        [Route("UpisiKlub")]
        [HttpPost]
        public async Task<int> PostKlub([FromBody] Klub klub)
        {
            Context.Klubovi.Add(klub);
            await Context.SaveChangesAsync();

            return klub.ID;
        }


       [Route("IzbrisiKlub/{id}")]
        [HttpDelete]
        public async Task DeleteKlub(int id)
        {
            var klub = await Context.Klubovi.FindAsync(id);
            Context.Klubovi.Remove(klub);
            await Context.SaveChangesAsync();
        }

        



        
    }

      
}
