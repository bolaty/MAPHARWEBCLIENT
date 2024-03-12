using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Helpers
{
    public class  clsMessages
    {
        #region VARIABLES LOCALES
        private string _SL_CODEMESSAGE = "";
        private string _SL_RESULTAT = "";
        private string _SL_MESSAGE = "";
        #endregion

        #region ACCESSEURS
        public string SL_CODEMESSAGE
        {
            get { return _SL_CODEMESSAGE; }
            set { _SL_CODEMESSAGE = value; }
        }

        public string SL_RESULTAT
        {
            get { return _SL_RESULTAT; }
            set { _SL_RESULTAT = value; }
        }

        public string SL_MESSAGE
        {
            get { return _SL_MESSAGE; }
            set { _SL_MESSAGE = value; }
        }
       

        #endregion
        #region INSTANCIATEURS
        public clsMessages() { }

        public clsMessages(clsMessages clsMessages)
        {
            this.SL_CODEMESSAGE = clsMessages.SL_CODEMESSAGE;
            this.SL_RESULTAT = clsMessages.SL_RESULTAT;
            this.SL_MESSAGE = clsMessages.SL_MESSAGE;
        }
        #endregion
    }
}
