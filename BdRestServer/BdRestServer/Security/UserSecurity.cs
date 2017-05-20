using BdRestServer.Helpers;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BdRestServer.Security
{
    public static class UserSecurity
    {
        /// <summary>
        /// Checks if the user is registered. Provide a second argument for admin check
        /// </summary>
        /// <param name="user"></param>
        /// <param name="checkAdmin">true -> checks for admin</param>
        /// <returns></returns>
        public static bool CheckUser(Models.User user, bool checkAdmin = false)
        {
            MySqlConnection conn = DBHelper.conn;
            bool ok = false;

            try
            {
                var command = conn.CreateCommand();
                command.CommandText = $"SELECT is_admin from users WHERE email = '{user.email}' AND password = '{user.password}'";
                conn.Open();
                var reader = command.ExecuteReader();
                if (reader.Read())
                {
                    ok = true; //checked for simple user
                    if (checkAdmin)
                        if (Convert.ToBoolean(reader[0]) == true)
                            ok = true; //checked for admin 
                        else
                            ok = false; 
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
            }

            conn.Close();
            return ok;
        }

        /// <summary>
        /// Checks if the user is registered. Provide a second argument for admin check
        /// </summary>
        /// <param name="user"></param>
        /// <param name="checkAdmin">true -> checks for admin</param>
        /// <returns></returns>
        public static bool CheckUser(string encodedUser, bool checkAdmin = false)
        {
            return CheckUser(TokenHelper.GetUserFromToken(encodedUser), checkAdmin);
        }
    }
}