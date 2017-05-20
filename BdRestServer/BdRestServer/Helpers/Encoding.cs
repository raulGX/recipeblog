using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BdRestServer.Helpers
{
    public static class Encoding
    {
        public static string EncodeBase64(string text)
        {
            var plainTextBytes = System.Text.Encoding.UTF8.GetBytes(text);
            return System.Convert.ToBase64String(plainTextBytes);
        }

        public static string DecodeBase64(string encodedText)
        {
            var base64EncodedBytes = System.Convert.FromBase64String(encodedText);
            return System.Text.Encoding.UTF8.GetString(base64EncodedBytes);
        }
    }
}