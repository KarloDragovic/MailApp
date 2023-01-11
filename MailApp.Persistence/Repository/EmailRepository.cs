using MailApp.Application.Interfaces;
using MailApp.Domain.Entities;
using MailApp.Persistence.Context;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MailApp.Persistence.Repository
{
    public class EmailRepository : IEmailRepository, IDisposable
    {
        private EmailContext _dbContext;
        public EmailRepository(EmailContext dbContext)
        {
            _dbContext = dbContext;
        }

        public void DeleteEmail(int id)
        {
            var email = _dbContext.Emails.Find(id);
            if (email != null)
            {
                _dbContext.Emails.Remove(email);
                Save();
            }
            throw new Exception($"Could not find email with Id: {id} to delete");
        }

        public Email GetEmailById(int id)
        {
            var email = _dbContext.Emails.Find(id);
            if (email != null)
                return email;
            throw new Exception($"Could not find email with Id: {id}");
        }

        public IEnumerable<Email> GetEmails()
        {
            return _dbContext.Emails;
        }

        public void InsertEmail(Email email)
        {
            _dbContext.Emails.Add(email);
            Save();
        }

        public void UpdateEmail(Email email)
        {
            _dbContext.Entry(email).State = EntityState.Modified;
            Save();
        }

        private void Save()
        {
            _dbContext.SaveChanges();
        }

        private bool disposed = false;
        protected virtual void Dispose(bool disposing)
        {
            if (!this.disposed)
            {
                if (disposing)
                {
                    _dbContext.Dispose();
                }
            }
            this.disposed = true;
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
    }
}
