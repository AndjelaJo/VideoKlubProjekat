using Microsoft.EntityFrameworkCore.Migrations;

namespace Server.Migrations
{
    public partial class V5 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "REDNIBROJREDA",
                table: "RED");

            migrationBuilder.DropColumn(
                name: "TRENUTNIKAPACITET",
                table: "RED");

            migrationBuilder.DropColumn(
                name: "TRENUTNIBROJ",
                table: "KLUB");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "REDNIBROJREDA",
                table: "RED",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "TRENUTNIKAPACITET",
                table: "RED",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "TRENUTNIBROJ",
                table: "KLUB",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
