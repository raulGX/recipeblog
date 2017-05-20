using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BdRestServer.Helpers
{
    public static class TokenHelper
    {
        public static string CreateUserToken(Dictionary<string, object> user)
        {
            return Encoding.EncodeBase64($"{user["userid"]}||{ user["email"]}||{user["password"]}");
        }

        public static Models.User GetUserFromToken(string encodedString)
        {
            var userArray = Encoding.DecodeBase64(encodedString).Split(new[] { "||" }, StringSplitOptions.None);
            if (userArray.Length != 3)
                return null;
            else
                return new Models.User(Convert.ToInt32(userArray[0]), userArray[1], userArray[2]);
        }
    }
}