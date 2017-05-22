using BdRestServer.Helpers;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace BdRestServer.Controllers
{
    public class IngredientCategoriesController : ApiController
    {
        public HttpResponseMessage Get() {
            MySqlConnection conn = DBHelper.conn;
            IEnumerable<Dictionary<string, object>> dict = null;

            try {
                var command = conn.CreateCommand();
                command.CommandText = "SELECT * FROM INGREDIENT_CATEGORY";
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
