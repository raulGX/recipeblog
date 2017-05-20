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
    public class RegisterController : ApiController
    {
        public HttpResponseMessage Post([FromBody]dynamic value)
        {
            MySqlConnection conn = DBHelper.conn;
            int insertOk = 0;
            try
            {
                var command = conn.CreateCommand();
                command.CommandText = $"INSERT INTO `users` (`email`, `password`, `first_name`, `last_name`) VALUES('{value.email}', '{value.password}', '{value.firstName}', '{value.lastName}')";
                conn.Open();
                insertOk = command.ExecuteNonQuery();
            }
            catch (Exception ex)
            {
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
