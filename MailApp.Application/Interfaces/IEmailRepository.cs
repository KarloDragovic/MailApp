using MailApp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MailApp.Application.Interfaces
{
    public interface IEmailRepository : IDisposable
    {
        IEnumerable<Email> GetEmails();
        Email GetEmailById(int id);
        void InsertEmail(Email email);
        void UpdateEmail(Email email);
        void DeleteEmail(int id);
    }
}
