using Microsoft.EntityFrameworkCore.Migrations;

namespace Server.Migrations
{
    public partial class V3 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "SIFRA",
                table: "FILM",
                newName: "GODINA");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "GODINA",
                table: "FILM",
                newName: "SIFRA");
        }
    }
}
