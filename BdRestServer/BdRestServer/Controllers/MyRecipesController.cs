using BdRestServer.Helpers;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading;
using System.Web.Http;

namespace BdRestServer.Controllers
{
    [Filters.UserAuthFilter]
    public class MyRecipesController : ApiController
    {
        public HttpResponseMessage Get() {
            MySqlConnection conn = DBHelper.conn;
            IEnumerable<Dictionary<string, object>> dict = null;
            int userid = Convert.ToInt32(Thread.CurrentPrincipal.Identity.Name);

            try {
                var command = conn.CreateCommand();
                command.CommandText = $"SELECT recipeid, recipe_name, rating, CONCAT(`last_name`, ' ', `first_name`) as user  FROM recipes, users WHERE recipes.userid = users.userid AND recipes.userid = {userid}";
                conn.Open();
                dict = SerializeHelper.Serialize(command.ExecuteReader());
            }
            catch (Exception ex) {
                Console.WriteLine(ex.ToString());
            }

            conn.Close();

            if (dict == null)
                return Request.CreateResponse(HttpStatusCode.BadRequest);

            return Request.CreateResponse(HttpStatusCode.OK, dict);
        }
    }
}
