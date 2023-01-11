using MailApp.Application.Dtos;
using MailApp.Application.Interfaces;
using MailApp.Domain.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MailApp.Controllers
{
    [Route("[controller]")]
    [ApiController]
    [AllowAnonymous]
    public class EmailController : ControllerBase
    {
        private readonly IEmailRepository _emailRepository;
        public EmailController(IEmailRepository emailRepository)
        {
            _emailRepository = emailRepository;
        }

        [HttpGet]
        [Route("getEmails")]
        public IActionResult Get()
        {
            var emails = _emailRepository.GetEmails();

            if (emails != null)
                return Ok( emails.Select(email => new EmailListDto
                {
                    From = email.From,
                    To = email.To,
                    Importance = email.Importance.ToString(),
                    Subject = email.Subject,
                    SentOn = email.CreatedOn
                }));
            else
                return BadRequest();
        }

        [HttpPost]
        [Route("sendEmail")]
        public IActionResult Send([FromBody] EmailSendDto email)
        {
            if(email == null) return BadRequest();

            var emailToSend = new Email();

            try
            {
                emailToSend = new Email
                {
                    From = email.From,
                    To = email.To,
                    Importance = (Importance)email.Importance,
                    Subject = email.Subject,
                    Bcc = email.Bcc.Split(',').ToList(),
                    Cc = email.Cc.Split(',').ToList(),
                    Body = email.Body,
                    CreatedOn = DateTime.Now,
                    CreatedBy = email.From.Substring(0, email.From.IndexOf("@"))
                };
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }

            _emailRepository.InsertEmail(emailToSend);

            return Ok("Email sent");
        }
    }
}
