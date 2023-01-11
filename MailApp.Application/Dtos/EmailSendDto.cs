using MailApp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MailApp.Application.Dtos
{
    public class EmailSendDto
    {
        public string From { get; set; }
        public string To { get; set; }
        public string? Cc { get; set; }
        public string? Bcc { get; set; }
        public string Subject { get; set; }
        public string? Body { get; set; }
        public int Importance { get; set; }
    }
}
