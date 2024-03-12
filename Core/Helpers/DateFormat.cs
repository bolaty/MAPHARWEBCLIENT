using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core
{
    public class DateFormat
    {
        public static string formaterDate(string dateNonFormatee)
        {
            string reponse = "";

            string dd = dateNonFormatee.Substring(8, 2);
            string mm = dateNonFormatee.Substring(5, 2);
            string aaaa = dateNonFormatee.Substring(0, 4);

            reponse = dd + "-" + mm + "-" + aaaa;

            return reponse;
        }
    }
}
