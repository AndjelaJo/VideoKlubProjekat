using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Server.Models
{

    [Table("RED")]
    public class Red
    {

        [Key]
        [Column("ID")]
        public int ID { get; set; }

        [Column("TIPREDA")]
        [MaxLength(255)]
        public string Tip { get; set; }

        [Column("MAKSIMALNIKAPACITETREDA")]
        [Range(1, 200)]
        public int MaxKapacitet { get; set; }

        [Column("REDNIBROJ")]
        public int RedniBroj { get; set; }

        [JsonIgnore]
        public virtual Klub Klub  {get; set;}
        
        public virtual List<Film> Filmovi { get; set; }
    }
}