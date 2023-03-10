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
                return Ok(emails.Select(email => new EmailListDto
                {
                    Id= email.Id,
                    From = email.From,
                    To = email.To,
                    Importance = email.Importance.ToString(),
                    Subject = email.Subject,
                    SentOn = email.CreatedOn.ToString("dd/MM/yyyy HH:mm:ss")
                }).OrderByDescending(e => e.SentOn));
            else
                return BadRequest();
        }

        [HttpPost]
        [Route("sendEmail")]
        public IActionResult Send([FromBody] EmailSendDto email)
        {
            if(email == null) return BadRequest();

            Email? emailToSend;

            try
            {
                emailToSend = new Email
                {
                    From = email.From,
                    To = email.To,
                    Importance = (Importance)email.Importance,
                    Subject = email.Subject,
                    Bcc = string.IsNullOrEmpty(email.Bcc) ? new List<string>() : email.Bcc.Split(',').ToList(),
                    Cc = string.IsNullOrEmpty(email.Cc) ? new List<string>() : email.Cc.Split(',').ToList(),
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
