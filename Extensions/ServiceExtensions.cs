namespace Automata_ProjectHomework.Extensions
{
	public static class ServiceExtensions
	{
		public static void ConfigureMapControllerRoute(this WebApplication app)
		{
			app.MapControllerRoute(
				name: "default",
				pattern: "{controller=Automata}/{action=Homepage}/{id?}");

			app.MapControllerRoute(
				name: "tableRepresentation",
				pattern: "tableRepresentation",
				defaults: new { 
					Controller = "Automata", 
					Action = "TableRepresentation" });

			app.MapControllerRoute(
				name: "graphRepresentation",
				pattern: "graphRepresentation",
				defaults: new
				{
					Controller = "Automata",
					Action = "GraphRepresentation"
				});

			app.MapControllerRoute(
				name: "formalRepresentation",
				pattern: "formalRepresentation",
				defaults: new
				{
					Controller = "Automata",
					Action = "FormalRepresentation"
				});
		}
	}
}
