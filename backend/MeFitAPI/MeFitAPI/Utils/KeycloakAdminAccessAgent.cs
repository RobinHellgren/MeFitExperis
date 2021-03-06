using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Net.Http;
using Newtonsoft.Json;
using System.Text;
using System.IO;
using Newtonsoft.Json.Linq;
using Microsoft.Extensions.Configuration;
using System.IdentityModel.Tokens.Jwt;

namespace MeFitAPI.Utils
{
    public class KeycloakAdminAccessAgent
    {
        private IConfiguration _configuration;
        public KeycloakAdminAccessAgent(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        public async Task<string> GetAdminToken()
        {
            
            HttpClient client = new HttpClient();
            // Create the HttpContent for the form to be posted.
            FormUrlEncodedContent requestContent = new FormUrlEncodedContent(new[] {
        new KeyValuePair<string, string>("Content", "application/x-www-form-urlencoded"),
        new KeyValuePair<string, string>("grant_type", "client_credentials"),
        new KeyValuePair<string, string>("client_id", _configuration["Keycloak:CliClientId"]),
        new KeyValuePair<string, string>("client_secret", _configuration["Keycloak:CliClientSecret"])
        });

            // Get the response.
            HttpResponseMessage response = await client.PostAsync(
                _configuration["Keycloak:CliClientTokenEndpoint"],
                requestContent);

            // Get the response content.
            HttpContent responseContent = response.Content;

            // Get the stream of the content.
            using (var reader = new StreamReader(await responseContent.ReadAsStreamAsync()))
            {
                // Write the output.

                var result = await reader.ReadToEndAsync();
                return JObject.Parse(result)["access_token"].ToString();
            }
        }

        public async Task<string> PostUser(string firstNameVar, string lastNameVar, string emailVar, string usernameVar , string passwordVar)
        {           
            var token = GetAdminToken();
            HttpClient client = new HttpClient();
            client.BaseAddress = new Uri(_configuration["Keycloak:BaseAddress"]);
            client.DefaultRequestHeaders
                  .Accept
                  .Add(new System.Net.Http.Headers.MediaTypeWithQualityHeaderValue("application/json"));//ACCEPT header
            client.DefaultRequestHeaders
                  .Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", token.Result);


            HttpRequestMessage request = new HttpRequestMessage(HttpMethod.Post, _configuration["Keycloak:UserEndpoint"]);
            request.Content = new StringContent("{\"firstName\":\"" + firstNameVar + "\"," +
                                                 "\"lastName\":\"" + lastNameVar + "\"," +
                                                 "\"email\":\"" + emailVar + "\"," +
                                                 "\"enabled\":\"true\"," +
                                                 "\"username\":\"" + usernameVar + "\","+
                                                 "\"credentials\": [{\"type\":\"password\",\"value\":\""+ passwordVar + "\"," +
                                                 "\"temporary\": false}]}",
                                                Encoding.UTF8,
                                                "application/json");

            HttpResponseMessage response = await client.SendAsync(request);
           
            if (response.IsSuccessStatusCode)
            {
                HttpRequestMessage requestUsers = new HttpRequestMessage(HttpMethod.Get, _configuration["Keycloak:UsernameQueryEndpoint"] + usernameVar);
                HttpResponseMessage responseUsers = await client.SendAsync(requestUsers);
                var contents = await responseUsers.Content.ReadAsStringAsync();
                string[] contentarray = contents.Split('"');
                string userKeyCloakId = contentarray[3];
                
                return userKeyCloakId;
            }
            else
            {
                var error = await response.Content.ReadAsStringAsync();
                Console.WriteLine(error);
                string alreadyexists = "alreadyexists";
                return alreadyexists;
            }
            
        }

        public async Task<string> GetUserToken(string userName, string password )
        {

            HttpClient client = new HttpClient();
            // Create the HttpContent for the form to be posted.
            FormUrlEncodedContent requestContent = new FormUrlEncodedContent(new[] {
        new KeyValuePair<string, string>("client_id", _configuration["Keycloak:ApiClientId"]),
        new KeyValuePair<string, string>("username", userName),
        new KeyValuePair<string, string>("password", password),
        new KeyValuePair<string, string>("grant_type", "password"),
        new KeyValuePair<string, string>("client_secret", _configuration["Keycloak:ApiClientSecret"])
        });

            // Get the response.
            HttpResponseMessage response = await client.PostAsync(
                _configuration["Keycloak:ApiClientTokenEndpoint"],
                requestContent);

            // Get the response content.
            HttpContent responseContent = response.Content;


            // Get the stream of the content.
            using (var reader = new StreamReader(await responseContent.ReadAsStreamAsync()))
            {
                // Write the output.

                var access_token = "";

                var result = await reader.ReadToEndAsync();

                if((int)response.StatusCode == 401)
                {
                    return "401";
                }

                
                try
                {
                   access_token = JObject.Parse(result)["access_token"].ToString();
                }
                catch (Exception e)
                {
                    Console.WriteLine(e);
                    access_token = null;
                    
                }

                return access_token;
            }
        }

        public async Task<string> ChangePassword(string newpassword, string jwttoken)
        {


            var handler = new JwtSecurityTokenHandler();
            var token = handler.ReadJwtToken(jwttoken);
            var id = token.Payload.ToArray()[5].Value.ToString();

            HttpClient client = new HttpClient();
            client.BaseAddress = new Uri(_configuration["Keycloak:BaseAddress"]);
            client.DefaultRequestHeaders
                  .Accept
                  .Add(new System.Net.Http.Headers.MediaTypeWithQualityHeaderValue("application/json"));
            client.DefaultRequestHeaders
                  .Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", GetAdminToken().Result);

            HttpRequestMessage request = new HttpRequestMessage(HttpMethod.Put, _configuration["Keycloak:UserEndpoint"] + id + "/reset-password");

            request.Content = new StringContent("{\"type\":\"password\",\"value\":\"" + newpassword + "\",\"temporary\":false}", Encoding.UTF8, "application/json");

            HttpResponseMessage response = await client.SendAsync(request);

            return response.StatusCode.ToString();

           }
      
        public async Task<string> DeleteUser(string user_id, string username)
        {
            var token = GetAdminToken();

            HttpClient client = new HttpClient();
            client.BaseAddress = new Uri(_configuration["Keycloak:BaseAddress"]);
            client.DefaultRequestHeaders
                  .Accept
                  .Add(new System.Net.Http.Headers.MediaTypeWithQualityHeaderValue("application/json"));
            client.DefaultRequestHeaders
                  .Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", token.Result);

            HttpRequestMessage request = new HttpRequestMessage(HttpMethod.Delete, _configuration["Keycloak:UserEndpoint"] + user_id);

            HttpResponseMessage response = await client.SendAsync(request);

            Console.WriteLine(response.StatusCode.ToString());
                
            if (response.StatusCode.ToString() == "NoContent")
            {
                return (response.StatusCode.ToString());
            }
            else
            {
                return response.StatusCode.ToString();
            }
        }

        public async Task<string> UpdateUser(string user_id, string firstNameVar, string lastNameVar, string emailVar)
        {
            HttpClient client = new HttpClient();
            client.BaseAddress = new Uri(_configuration["Keycloak:BaseAddress"]);
            client.DefaultRequestHeaders
                  .Accept
                  .Add(new System.Net.Http.Headers.MediaTypeWithQualityHeaderValue("application/json"));
            client.DefaultRequestHeaders
                  .Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", GetAdminToken().Result);


            HttpRequestMessage request = new HttpRequestMessage(HttpMethod.Put, _configuration["Keycloak:UserEndpoint"] + user_id);

            Console.WriteLine(request);

            StringBuilder sb = new StringBuilder();

            sb.Append("{");

            if (firstNameVar != "string" && firstNameVar != null)
            {
                sb.Append("\"firstName\":\"" + firstNameVar + "\",");
            }
            if (lastNameVar != "string" && lastNameVar != null)
            {
                sb.Append("\"lastName\":\"" + lastNameVar + "\",");
            }
            if (emailVar != "string" && emailVar != null)
            {
                sb.Append("\"email\":\"" + emailVar + "\"");
            }
            if (firstNameVar == null && lastNameVar == null && emailVar == null)
            {
                return "null";
            }
            if (sb.ToString().EndsWith(","))
            {
                sb.Remove(sb.Length - 1, 1);
            }
            sb.Append("}");

            Console.WriteLine("string builder"+sb);
            
            request.Content = new StringContent(sb.ToString(), Encoding.UTF8, "application/json");
            // Get the response.
            HttpResponseMessage response = await client.SendAsync(request);
            Console.WriteLine("request content"+request.Content);
            Console.WriteLine("response"+response);

            return response.StatusCode.ToString();
        }

    }
}

