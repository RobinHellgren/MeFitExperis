﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Net.Http;
using Newtonsoft.Json;
using System.Text;
using System.IO;
using Newtonsoft.Json.Linq;
using Microsoft.Extensions.Configuration;

namespace MeFitAPI.Utils
{
    public class KeycloakAdminAccessAgent
    {
        public async Task<string> GetAdminToken()
        {
            
            HttpClient client = new HttpClient();
            // Create the HttpContent for the form to be posted.
            FormUrlEncodedContent requestContent = new FormUrlEncodedContent(new[] {
        new KeyValuePair<string, string>("Content", "application/x-www-form-urlencoded"),
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

        public async Task<string> PostUser(string firstNameVar, string lastNameVar, string emailVar, string usernameVar , string passwordVar)
        {
           
            var token = GetAdminToken();
            HttpClient client = new HttpClient();
            client.BaseAddress = new Uri("https://mefitkeycloak.azurewebsites.net");
            client.DefaultRequestHeaders
                  .Accept
                  .Add(new System.Net.Http.Headers.MediaTypeWithQualityHeaderValue("application/json"));//ACCEPT header
            client.DefaultRequestHeaders
                  .Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", token.Result);


            HttpRequestMessage request = new HttpRequestMessage(HttpMethod.Post, "/auth/admin/realms/MeFit/users");
            request.Content = new StringContent("{\"firstName\":\"" + firstNameVar + "\"," +
                                                 "\"lastName\":\"" + lastNameVar + "\"," +
                                                 "\"email\":\"" + emailVar + "\"," +
                                                 "\"enabled\":\"true\"," +
                                                 "\"username\":\"" + usernameVar + "\","+
                                                 "\"credentials\": [{\"type\":\"password\",\"value\":\""+ passwordVar + "\"," +
                                                 "\"temporary\": false}]}",
                                                Encoding.UTF8,
                                                "application/json");//CONTENT-TYPE header
            // Get the response.
            HttpResponseMessage response = await client.SendAsync(request);
           
            if (response.IsSuccessStatusCode)
            {
                HttpRequestMessage requestUsers = new HttpRequestMessage(HttpMethod.Get, "/auth/admin/realms/MeFit/users?username=" + usernameVar);
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
        new KeyValuePair<string, string>("client_id", "mefit"),
        new KeyValuePair<string, string>("username", userName),
        new KeyValuePair<string, string>("password", password),
        new KeyValuePair<string, string>("grant_type", "password"),
        // !!!!!!!!!!!!!!!!!!!!!!!! HIDE CLIENT SECRET !!!!!!!!!!!!!! //
        new KeyValuePair<string, string>("client_secret", "7e4c0630-078a-4868-a9a3-df978ce6db0e")
        });

            // Get the response.
            HttpResponseMessage response = await client.PostAsync(
                "https://mefitkeycloak.azurewebsites.net/auth/realms/MeFit/protocol/openid-connect/token",
                requestContent);

            // Get the response content.
            HttpContent responseContent = response.Content;

            // Get the stream of the content.
            using (var reader = new StreamReader(await responseContent.ReadAsStreamAsync()))
            {
                // Write the output.

                var result = await reader.ReadToEndAsync();
                var access_token = "";
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
    }


}

