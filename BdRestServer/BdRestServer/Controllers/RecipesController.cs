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
    public class RecipesController : ApiController
    {
        public HttpResponseMessage Get() {
            MySqlConnection conn = DBHelper.conn;
            IEnumerable<Dictionary<string, object>> dict = null;

            try {
                var command = conn.CreateCommand();
                command.CommandText = "SELECT recipeid, recipe_name, rating, CONCAT(`last_name`, ' ', `first_name`) as user  FROM recipes, users WHERE recipes.userid = users.userid";
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

        [Route("api/recipes/{recipeId}")]
        public HttpResponseMessage Get(int recipeId) {
            MySqlConnection conn = DBHelper.conn;
            IEnumerable<Dictionary<string, object>> dict = null;
            IEnumerable<Dictionary<string, object>> ingredients = null;

            try {
                var command = conn.CreateCommand();
                command.CommandText = $"SELECT * FROM recipes WHERE recipes.recipeid = '{recipeId}'";
                conn.Open();
                dict = SerializeHelper.Serialize(command.ExecuteReader());
                conn.Close();

                //get ingredients
                command = conn.CreateCommand();
                command.CommandText = $"SELECT ingredient_name, measure_unit, calories, catname, quantity ";
                command.CommandText += $"FROM ingredients_to_recipes, ingredients, ingredient_category ";
                command.CommandText += $"WHERE ingredients_to_recipes.recipeid = '{recipeId}' ";
                command.CommandText += "AND ingredients.ingredientid = ingredients_to_recipes.ingredientid ";
                command.CommandText += "AND ingredients.category = ingredient_category.catid";
                conn.Open(); 
                ingredients = SerializeHelper.Serialize(command.ExecuteReader());
            }
            catch (Exception ex) {
                Console.WriteLine(ex.ToString());
            }

            conn.Close();

            if (dict == null)
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            var responseRecipe = dict.FirstOrDefault();
            responseRecipe.Add("ingredients", ingredients);
            return Request.CreateResponse(HttpStatusCode.OK, responseRecipe);
        }

        [Filters.UserAuthFilter]
        public HttpResponseMessage Post([FromBody]dynamic value) {
            MySqlConnection conn = DBHelper.conn;
            int insertOk = 0;
            try {
                var command = conn.CreateCommand();
                command.CommandText = $"INSERT INTO `recipes` (`recipe_name`, `description`, `userid`) VALUES('{value.name}', '{value.description}', '{Thread.CurrentPrincipal.Identity.Name}')";
                conn.Open();
                insertOk = command.ExecuteNonQuery();
            }
            catch (Exception ex) {
                Console.WriteLine(ex.ToString());
            }
            conn.Close();

            if (insertOk > 0)
                return Request.CreateResponse(HttpStatusCode.OK);
            else
                return Request.CreateResponse(HttpStatusCode.BadRequest, "error inserting in db");
        }
    }
}
