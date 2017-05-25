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
                command.CommandText = $"SELECT recipeid, recipe_name, CONCAT(`last_name`, ' ', `first_name`) as user  FROM recipes, users WHERE recipes.userid = users.userid AND recipes.userid = {userid}";
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

        [Route("api/myRecipes/{recipeId}")]
        [Filters.UserAuthFilter]
        public HttpResponseMessage Delete(int recipeId) {
            MySqlConnection conn = DBHelper.conn;
            int ok = 0;
            try {
                var command = conn.CreateCommand();
                command.CommandText = $"DELETE from ingredients_to_recipes where recipeid = {recipeId}";
                conn.Open();
                conn.Close();

                command = conn.CreateCommand();
                command.CommandText = $"DELETE from recipes where recipeid = {recipeId}";
                conn.Open();
                ok = command.ExecuteNonQuery();
            }
            catch (Exception ex) {
                Console.WriteLine(ex.ToString());
                ok = 0;
            }
            finally {
                conn.Close();
            }
            if (ok < 1)
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            else
                return Request.CreateResponse(HttpStatusCode.OK);
        }

        [Route("api/myRecipes/{recipeId}")]
        [Filters.UserAuthFilter]
        public HttpResponseMessage Put(int recipeId, [FromBody]dynamic value) {
            MySqlConnection conn = DBHelper.conn;
            int ok = 0;
            try {
                var command = conn.CreateCommand();
                command.CommandText = $"UPDATE recipes SET recipe_name = '{value.name}', description = '{value.description}' WHERE recipeid = {recipeId}";
                conn.Open();
                ok = command.ExecuteNonQuery();
            }
            catch (Exception ex) {
                Console.WriteLine(ex.ToString());
                ok = 0;
            }
            finally {
                conn.Close();
            }
            if (ok < 1)
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            else
                return Request.CreateResponse(HttpStatusCode.OK);
        }

        [Route("api/myRecipes/ingredients/{recipe}")]
        public HttpResponseMessage Delete(string recipe) {
            var array = recipe.Split(',');
            int ingredientid = Convert.ToInt32(array[0]);
            int recipeid = Convert.ToInt32(array[1]);
            MySqlConnection conn = DBHelper.conn;
            int ok = 0;
            try {
                var command = conn.CreateCommand();
                command.CommandText = $"DELETE from ingredients_to_recipes where recipeid={recipeid} AND ingredientid={ingredientid}";
                conn.Open();
                ok = command.ExecuteNonQuery();
            }
            catch (Exception ex) {
                Console.WriteLine(ex.ToString());
            }
            finally {
                conn.Close();
            }
            if (ok < 1)
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            else
                return Request.CreateResponse(HttpStatusCode.OK);

        }
    }
}
