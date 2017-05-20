using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BdRestServer.Models
{
    public class User
    {
        public int userid { get; set; }
        public string email { get; set; }
        public string password { get; set; }

        public User(int userid, string email, string password)
        {
            this.userid = userid;
            this.email = email;
            this.password = password;
        }
    }
}