using BdRestServer.Helpers;
using BdRestServer.Models;
using MySql.Data.MySqlClient;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace BdRestServer.Controllers
{
    //[Authorize]
    public class ValuesController : ApiController
    {
        // GET api/values
        public IEnumerable<object> Get()
        {
            MySqlConnection conn = DBHelper.conn;
            IEnumerable<Dictionary<string, object>> dict = null ;
            //List<Recipe> list = new List<Recipe>();
            try
            {
                var command = conn.CreateCommand();
                command.CommandText = "SELECT userid, email, CONCAT(`last_name`, ' ', `first_name`)  as name FROM users";
                conn.Open();
                dict = SerializeHelper.Serialize(command.ExecuteReader());
                //using (MySqlDataReader reader = command.ExecuteReader())
                //{
                //    while (reader.Read())
                //    {
                //        int id = (int)reader["id"];
                //        string text = (string)reader["name"];//Assuming column name is `Text` and typeof(string)
                //        var recipe = new Recipe { id = id, name = text };
                //        list.Add(recipe);
                //    }
                //}

            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
            }

            conn.Close();
            return dict;
        }

        // GET api/values/5
        public string Get(int id)
        {
            return "value";
        }

        // POST api/values
        public void Post([FromBody]string value)
        {
        }

        // PUT api/values/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        public void Delete(int id)
        {
        }
    }
}
