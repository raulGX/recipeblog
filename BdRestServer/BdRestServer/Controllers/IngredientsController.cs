using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using BdRestServer.Helpers;
using MySql.Data.MySqlClient;

namespace BdRestServer.Controllers
{
    public class IngredientsController : ApiController
    {
        public HttpResponseMessage Get() {
            MySqlConnection conn = DBHelper.conn;
            IEnumerable<Dictionary<string, object>> dict = null;

            try {
                var command = conn.CreateCommand();
                command.CommandText = "SELECT ingredientid, ingredient_name, measure_unit, calories, category, catname FROM ingredients, ingredient_category WHERE ingredients.category = ingredient_category.catid";
                conn.Open();
                dict = SerializeHelper.Serialize(command.ExecuteReader());
            }
            catch (Exception ex) {
                Console.WriteLine(ex.ToString());
            }
            finally {
                conn.Close();
            }

            if (dict == null)
                return Request.CreateResponse(HttpStatusCode.BadRequest);

            return Request.CreateResponse(HttpStatusCode.OK, dict);
        }

        [Filters.AdminAuthFilter]
        public HttpResponseMessage Post([FromBody]dynamic value) {
            MySqlConnection conn = DBHelper.conn;
            int insertOk = 0;
            if (value.calories == null)
                value.calories = "NULL";
            try {
                var command = conn.CreateCommand();
                command.CommandText = "INSERT INTO `ingredients` (`ingredient_name`, `measure_unit`, `calories`, `category`) ";
                command.CommandText += $"VALUES('{value.name}', '{value.unit}', {value.calories}, {value.category})";
                conn.Open();
                insertOk = command.ExecuteNonQuery();
            }
            catch (Exception ex) {
                Console.WriteLine(ex.ToString());
            }
            finally {
                conn.Close();
            }

            if (insertOk > 0)
                return Request.CreateResponse(HttpStatusCode.OK);
            else
                return Request.CreateResponse(HttpStatusCode.BadRequest, "error inserting in db");
        }

        [Filters.UserAuthFilter]
        [Route("api/ingredients/{recipeId}")]
        public HttpResponseMessage Post([FromBody]dynamic value, int recipeId) {
            MySqlConnection conn = DBHelper.conn;
            int insertOk = 0;
            if (value.calories == null)
                value.calories = "NULL";
            try {
                var command = conn.CreateCommand();
                command.CommandText = "INSERT INTO `ingredients_to_recipes` (`ingredientid`, `recipeid`, `quantity`) ";
                command.CommandText += $"VALUES('{value.ingredientid}', '{recipeId}', {value.quantity})";
                conn.Open();
                insertOk = command.ExecuteNonQuery();
            }
            catch (Exception ex) {
                Console.WriteLine(ex.ToString());
            }
            finally {
                conn.Close();
            }
            if (insertOk > 0)
                return Request.CreateResponse(HttpStatusCode.OK);
            else
                return Request.CreateResponse(HttpStatusCode.BadRequest, "error inserting in db");
        }
    }
}
