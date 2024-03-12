using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core
{
    public class ErreursMessages
    {
        public static string msgErr(string code, string msg)
        {
            string reponse = "";

            switch (code)
            {
                case "3117632":
                    reponse = clsDeclaration.ERR_MSG_CONN;
                break;

                default:
                    reponse = msg;
                break;
            }

            return reponse;
        }
    }
}
