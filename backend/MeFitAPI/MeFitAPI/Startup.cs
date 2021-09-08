using MeFitAPI.Models;
using MeFitAPI.Utils;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

namespace MeFitAPI
{
    public class Startup
    {

        private string _meFitApiKey = null;
        public string _meFitUrl = null;

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }


        public void ConfigureServices(IServiceCollection services)
        {
            _meFitApiKey = Configuration["Server:ConnectionString"];
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
           .AddJwtBearer(options =>
           {
               options.TokenValidationParameters = new TokenValidationParameters
               {
                   IssuerSigningKeyResolver = (token, securityToken, kid, parameters) =>
                   {
                       var client = new HttpClient();
                       var keyuri = Configuration["TokenSecrets:KeyURI"];
                       var response = client.GetAsync(keyuri).Result;
                       var responseString = response.Content.ReadAsStringAsync().Result;
                       var keys = JsonConvert.DeserializeObject<JsonWebKeySet>(responseString);
                       return keys.Keys;
                   },

                   ValidIssuers = new List<string>
                   {
                        Configuration["TokenSecrets__IssuerURI"]
                   },

                   ValidAudience = "account",
               };
           });
            services.AddControllers();
            services.AddAutoMapper(typeof(Startup));
            services.AddDbContext<meFitContext>(options =>
                   options.UseSqlServer("Server=mysqlservermefit.database.windows.net, 1433;Initial Catalog=meFit;Persist Security Info=False;User ID=azureuser;Password=danlachance12212!;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;")
                   );
            services.AddSwaggerGen(c =>
               {
                   c.SwaggerDoc("v1", new OpenApiInfo { Title = "MeFitAPI", Version = "v1" });
               });
         

        }


        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
         
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "MeFitAPI v1"));
            }

            //app.UseHttpsRedirection();

            app.UseRouting();
            app.UseAuthorization();
            app.UseCorsMiddleware();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
