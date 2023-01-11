using MailApp.Domain.Shared;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MailApp.Domain.Entities
{
    public class Email : EntityBase
    {
        public string From { get; set; }
        public string To { get; set; }
        public List<string> Cc { get; set; } = new List<string>();
        public List<string> Bcc { get; set; } = new List<string>();
        public string Subject { get; set; }
        public string? Body { get; set; }
        public Importance Importance { get; set; } = Importance.Low;
    }
}
