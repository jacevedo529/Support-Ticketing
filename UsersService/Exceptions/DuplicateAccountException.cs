using System.Runtime.Serialization;

namespace Services.Exceptions
{
    public class DuplicateAccountException : Exception
    {
        public DuplicateAccountException()
        {
        }

        public DuplicateAccountException(string? message) : base(message)
        {
        }

        public DuplicateAccountException(string? message, Exception? innerException) : base(message, innerException)
        {
        }

        protected DuplicateAccountException(SerializationInfo info, StreamingContext context) : base(info, context)
        {
        }
    }
}
