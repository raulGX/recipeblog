using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Principal;
using System.Threading;
using System.Web;
using System.Web.Http.Controllers;
using System.Web.Http.Filters;

namespace BdRestServer.Filters {
    public class AdminAuthFilter : AuthorizationFilterAttribute {
        public override void OnAuthorization(HttpActionContext actionContext) {

            if (actionContext.Request.Headers.Authorization == null) {
                actionContext.Response = actionContext.Request.CreateResponse(HttpStatusCode.Unauthorized);
            }
            else {
                string authenticationToken = actionContext.Request.Headers.Authorization.Parameter;

                Models.User user = Helpers.TokenHelper.GetUserFromToken(authenticationToken);
                bool isUser = Security.UserSecurity.CheckUser(user, true);

                if (isUser == true) {
                    Thread.CurrentPrincipal = new GenericPrincipal(new GenericIdentity(user.userid.ToString()), null);
                }
                else {
                    actionContext.Response = actionContext.Request.CreateResponse(HttpStatusCode.Unauthorized);
                }
            }
        }
    }
}