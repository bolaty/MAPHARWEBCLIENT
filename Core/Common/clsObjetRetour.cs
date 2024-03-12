using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Data;

namespace Core.Common
{
	public class clsObjetRetour
	{

        private bool  _OR_BOOLEEN = true ;
        private string _OR_STRING = "";
        private List<Object> _OR_LIST;
        private string _OR_MESSAGE = "";

        private string _SL_VALEURRETOURS = "";
        private string _SL_CODEMESSAGE = "";
        private string _SL_RESULTAT = "";
        private string _SL_MESSAGE = "";

        public bool OR_BOOLEEN
		{
            get { return _OR_BOOLEEN; }
            set { _OR_BOOLEEN = value; }
		}
        public string OR_STRING
        {
            get { return _OR_STRING; }
            set { _OR_STRING = value; }
        }
        
        
        public List<Object> OR_LIST
		{
            get { return _OR_LIST; }
            set { _OR_LIST = value; }
		}

        public string OR_MESSAGE
        {
            get { return _OR_MESSAGE; }
            set { _OR_MESSAGE = value; }
        }


        public string SL_VALEURRETOURS
        {
            get { return _SL_VALEURRETOURS; }
            set { _SL_VALEURRETOURS = value; }
        }

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



        public clsObjetRetour() {}

        public clsObjetRetour(bool OR_BOOLEEN, string OR_STRING, List<Object> OR_LIST,string OR_MESSAGE)
        {
            this.OR_BOOLEEN = OR_BOOLEEN;            
            this.OR_STRING = OR_STRING;
            this.OR_LIST = OR_LIST;
            this.OR_MESSAGE = OR_MESSAGE;

        }

        public clsObjetRetour(clsObjetRetour clsObjetRetour)
        {
            OR_BOOLEEN = clsObjetRetour.OR_BOOLEEN;            
            OR_STRING = clsObjetRetour.OR_STRING;
            OR_LIST = clsObjetRetour.OR_LIST;
            OR_MESSAGE = clsObjetRetour.OR_MESSAGE;
            this.SL_VALEURRETOURS = clsObjetRetour.SL_VALEURRETOURS;
            this.SL_CODEMESSAGE = clsObjetRetour.SL_CODEMESSAGE;
            this.SL_RESULTAT = clsObjetRetour.SL_RESULTAT;
            this.SL_MESSAGE = clsObjetRetour.SL_MESSAGE;
        }

        public clsObjetRetour SetValue(bool OR_BOOLEEN)
		{
			this.OR_BOOLEEN = OR_BOOLEEN;
            return this;

		}

        public clsObjetRetour SetValue(bool OR_BOOLEEN, string OR_STRING)
		{
			this.OR_BOOLEEN = OR_BOOLEEN;
            this.OR_STRING = OR_STRING;
            return this;

		}

        public clsObjetRetour SetValueMessage(bool OR_BOOLEEN, string OR_MESSAGE)
		{
			this.OR_BOOLEEN = OR_BOOLEEN;
            this.OR_MESSAGE = OR_MESSAGE;
            return this;

		}

      

        public clsObjetRetour SetValue(bool OR_BOOLEEN, List<Object> OR_LIST)
        {
            this.OR_BOOLEEN = OR_BOOLEEN;
            this.OR_LIST = OR_LIST;
            return this;
        }

        public clsObjetRetour SetValue(bool OR_BOOLEEN,string OR_STRING ,string OR_MESSAGE )
		{
			this.OR_BOOLEEN = OR_BOOLEEN;
			this.OR_MESSAGE = OR_MESSAGE;
			this.OR_STRING = OR_STRING;
            return this;

		}

       

        public clsObjetRetour SetValue(bool OR_BOOLEEN, List<Object> OR_LIST, string OR_MESSAGE)
		{
			this.OR_BOOLEEN = OR_BOOLEEN;
			this.OR_MESSAGE = OR_MESSAGE;
            this.OR_LIST = OR_LIST;
            return this;
        }



        }
}