using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Net.Http;
using Newtonsoft.Json;
using System.Text;
using System.IO;
using Newtonsoft.Json.Linq;

namespace MeFitAPI.Utils
{
    public class KeycloakAdminAccessAgent
    {

        public async Task<string> GetToken()
        {
            HttpClient client = new HttpClient();
            // Create the HttpContent for the form to be posted.
            FormUrlEncodedContent requestContent = new FormUrlEncodedContent(new[] {
        new KeyValuePair<string, string>("Content-Type", "application/x-www-form-urlencoded"),
        new KeyValuePair<string, string>("grant_type", "client_credentials"),
        new KeyValuePair<string, string>("client_id", "admin-cli"),
        // !!!!!!!!!!!!!!!!!!!!!!!! HIDE CLIENT SECRET !!!!!!!!!!!!!! //
        new KeyValuePair<string, string>("client_secret", "144333a1-723a-4aea-bb75-e52add7c4c6f")
        });

            // Get the response.
            HttpResponseMessage response = await client.PostAsync(
                "https://mefitkeycloak.azurewebsites.net/auth/realms/master/protocol/openid-connect/token",
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

     /*   public async void PostUser()
        {
            var token = GetToken().access_token;
            Console.WriteLine(token);
            HttpClient client = new HttpClient();
            // Create the HttpContent for the form to be posted.
            FormUrlEncodedContent requestContent = new FormUrlEncodedContent(new[] {
        new KeyValuePair<string, string>("Content-Type", "application/json"),
        new KeyValuePair<string, string>("Authorization", "Bearer " + token),
        
        });

            // Get the response.
            HttpResponseMessage response = await client.PostAsync(
                "https://mefitkeycloak.azurewebsites.net/auth/admin/realms/MeFit/users",
                requestContent);

            // Get the response content.
            HttpContent responseContent = response.Content;

            // Get the stream of the content.
            using (var reader = new StreamReader(await responseContent.ReadAsStreamAsync()))
            {
                // Write the output.
                Console.WriteLine(await reader.ReadToEndAsync());
            }
        }
     */




    }
}
