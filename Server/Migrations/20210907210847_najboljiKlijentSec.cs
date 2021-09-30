using Microsoft.EntityFrameworkCore.Migrations;

namespace Server.Migrations
{
    public partial class najboljiKlijentSec : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_FILM_KLUB_KlubID",
                table: "FILM");

            migrationBuilder.DropIndex(
                name: "IX_FILM_KlubID",
                table: "FILM");

            migrationBuilder.DropColumn(
                name: "KlubID",
                table: "FILM");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "KlubID",
                table: "FILM",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_FILM_KlubID",
                table: "FILM",
                column: "KlubID");

            migrationBuilder.AddForeignKey(
                name: "FK_FILM_KLUB_KlubID",
                table: "FILM",
                column: "KlubID",
                principalTable: "KLUB",
                principalColumn: "ID",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
