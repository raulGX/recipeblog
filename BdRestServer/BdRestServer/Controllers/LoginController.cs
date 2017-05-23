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
    public class LoginController : ApiController
    {
        public HttpResponseMessage Post([FromBody]dynamic value)
        {
            MySqlConnection conn = DBHelper.conn;
            IEnumerable<Dictionary<string, object>> response = null;
            if (value.email == null || value.password == null)
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            try
            {
                var command = conn.CreateCommand();
                command.CommandText = $"SELECT userid, email, password, is_admin FROM users WHERE email='{value.email}' AND password='{value.password}'";
                conn.Open();
                response = SerializeHelper.Serialize(command.ExecuteReader());
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
            }

            conn.Close();

            if (response == null)
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            else if (response.Count() == 0)
                return Request.CreateResponse(HttpStatusCode.Unauthorized);

            Dictionary<string, object> user = response.FirstOrDefault();
            bool isAdmin = Convert.ToBoolean(user["is_admin"]);
            string token = TokenHelper.CreateUserToken(user);
            return Request.CreateResponse(HttpStatusCode.OK, new { token = token,  isAdmin = isAdmin});
        }
    }
}
