using Microsoft.EntityFrameworkCore.Migrations;

namespace Server.Migrations
{
    public partial class najboljiKlijentInit : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "KLUB",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IME = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    MAKSIMALNIBROJ = table.Column<int>(type: "int", nullable: false),
                    TRENUTNIBROJ = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_KLUB", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "RED",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TIPREDA = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    REDNIBROJREDA = table.Column<int>(type: "int", nullable: false),
                    MAKSIMALNIKAPACITETREDA = table.Column<int>(type: "int", nullable: false),
                    TRENUTNIKAPACITET = table.Column<int>(type: "int", nullable: false),
                    KlubID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RED", x => x.ID);
                    table.ForeignKey(
                        name: "FK_RED_KLUB_KlubID",
                        column: x => x.KlubID,
                        principalTable: "KLUB",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "FILM",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    NAZIVFILMA = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    IMEREZISERA = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    PREZIMEREZISERA = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    TIPFILMA = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    TRAJANJEFILMA = table.Column<int>(type: "int", nullable: false),
                    SIFRA = table.Column<int>(type: "int", nullable: false),
                    KlubID = table.Column<int>(type: "int", nullable: true),
                    RedID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FILM", x => x.ID);
                    table.ForeignKey(
                        name: "FK_FILM_KLUB_KlubID",
                        column: x => x.KlubID,
                        principalTable: "KLUB",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_FILM_RED_RedID",
                        column: x => x.RedID,
                        principalTable: "RED",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_FILM_KlubID",
                table: "FILM",
                column: "KlubID");

            migrationBuilder.CreateIndex(
                name: "IX_FILM_RedID",
                table: "FILM",
                column: "RedID");

            migrationBuilder.CreateIndex(
                name: "IX_RED_KlubID",
                table: "RED",
                column: "KlubID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "FILM");

            migrationBuilder.DropTable(
                name: "RED");

            migrationBuilder.DropTable(
                name: "KLUB");
        }
    }
}
