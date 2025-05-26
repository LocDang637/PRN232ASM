using FirebaseAdmin.Auth;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using SmokeQuit.APIServices.BE.LocDPX.Dto;
using SmokeQuit.Services.LocDPX;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace SmokeQuit.APIServices.BE.LocDPX.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IConfiguration _config;
        private readonly CoachLocDpxService _coachService;
        private readonly SystemUserAccountService _systemUserAccountService;
        public AuthController(IConfiguration config, CoachLocDpxService service, SystemUserAccountService systemUserAccountService)
        {
            _config = config;
            _coachService = service;
            _systemUserAccountService = systemUserAccountService;
        }

        [HttpPost("login-email")]
        public async Task<IActionResult> LoginWithEmail([FromBody] UserLoginRequest request)
        {
            var userAccount = await _systemUserAccountService.GetAccount(request.UserName, request.Password);

            if (userAccount == null)
                return Unauthorized(new { message = "Invalid Email/Password" });

            var claims = new[]
            {
                new Claim(ClaimTypes.Email, userAccount.Email),
                new Claim(ClaimTypes.Role, "User"),
                new Claim(JwtRegisteredClaimNames.Sub, userAccount.UserAccountId.ToString())
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["JwtSettings:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: _config["JwtSettings:Issuer"],
                audience: _config["JwtSettings:Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddHours(1),
                signingCredentials: creds
            );

            var jwt = new JwtSecurityTokenHandler().WriteToken(token);

            return Ok(new
            {
                token = jwt,
                user = new
                {
                    userAccount.UserAccountId,
                    userAccount.Email,
                    userAccount.FullName
                }
            });
        }
    

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] string idToken)
        {
            if (string.IsNullOrEmpty(idToken))
                return BadRequest("Missing idToken");

            try
            {
                var decoded = await FirebaseAuth.DefaultInstance.VerifyIdTokenAsync(idToken);
                var email = decoded.Claims["email"]?.ToString();

                if (string.IsNullOrEmpty(email))
                    return Unauthorized(new { message = "Email not found in token" });

                // 🔍 Kiểm tra coach đã tồn tại chưa
                var coach = await _coachService.GetByEmail(email);

                if (coach == null)
                {
                    // 🆕 Tạo mới nếu chưa có
                    coach = await _coachService.Create(email);
                }

                // ✅ Tạo JWT nội bộ từ thông tin Coach
                var claims = new[]
                {
            new Claim(JwtRegisteredClaimNames.Sub, coach.CoachesLocDpxid.ToString()),
            new Claim(ClaimTypes.Email, coach.Email),
            new Claim(ClaimTypes.Role, "Coach")
        };

                var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["JwtSettings:Key"]));
                var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

                var token = new JwtSecurityToken(
                    issuer: _config["JwtSettings:Issuer"],
                    audience: _config["JwtSettings:Audience"],
                    claims: claims,
                    expires: DateTime.UtcNow.AddMinutes(60),
                    signingCredentials: creds
                );

                var jwt = new JwtSecurityTokenHandler().WriteToken(token);

                return Ok(new
                {
                    token = jwt,
                    coach = new
                    {
                        coach.CoachesLocDpxid,
                        coach.Email,
                        coach.FullName // nếu có
                    }
                });
            }
            catch (Exception ex)
            {
                return Unauthorized(new { message = ex.Message });
            }
        }

    }
}
