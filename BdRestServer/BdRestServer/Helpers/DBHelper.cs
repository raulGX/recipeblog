using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BdRestServer.Helpers {
    public static class DBHelper {
        public static MySqlConnection conn {
            get {
                return new MySqlConnection(connStr);
            }
        }
        private static string connStr = "server=localhost;user=root;database=proiectbd;port=3306;password=;";
    }
}