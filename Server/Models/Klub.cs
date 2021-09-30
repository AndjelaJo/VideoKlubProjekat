using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Server.Models
{

    [Table("KLUB")]
    public class Klub
    {

        [Key]
        [Column("ID")]
        public int ID { get; set; }

        [Column("IME")]
        [MaxLength(255)]
        public string Ime { get; set; }

        [Column("MAKSIMALNIBROJ")]
        public int MaksimalniBroj { get; set; }

        public virtual List<Red> Redovi { get; set; }
    }
}