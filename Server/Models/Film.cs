using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Server.Models
{
    [Table("FILM")]
    public class Film
    {
        [Key]
        [Column("ID")]
        public int ID { get; set; }

        [Column("NAZIVFILMA")]
        [MaxLength(255)]
        [Required]
        [MinLength(2)]
        public string Naziv { get; set; }

        [Column("IMEREZISERA")]
        [MaxLength(255)]
        public string ImeRezisera { get; set; }

        [Column("PREZIMEREZISERA")]
        [MaxLength(255)]
        public string PrezimeRezisera { get; set; }

        [Column("TIPFILMA")]
        [MaxLength(255)]
        [Required]
        public string Tip { get; set; }

        [Column("TRAJANJEFILMA")]
        [Range(5,240)]
        public int Trajanje { get; set; }

        [Column("GODINA")]
        [Range(1800, 2021)]
        public int Godina { get; set; }

        [JsonIgnore]
        public  Red Red {get; set;}
    }
}