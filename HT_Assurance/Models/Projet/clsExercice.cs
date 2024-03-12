using Stock.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace HT_Assurance
{
	public class clsExercice : clsEntitieBase
    {

        private string _AG_CODEAGENCE = "";
		private string _EX_EXERCICE = "";
        private string _JT_DATEJOURNEETRAVAIL = "";
		private string _EX_DATEDEBUT = "";
		private string _EX_DATEFIN = "";
		private string _EX_DESCEXERCICE = "";
		private string _EX_ETATEXERCICE = "";
		private string _EX_DATESAISIE = "";
		private string _JT_DATEDEBUTPREMIEREXERCICE = "";
		private string _EX_EXERCICEENCOURS = "";

        public string AG_CODEAGENCE
		{
			get { return _AG_CODEAGENCE; }
			set { _AG_CODEAGENCE = value; }
		}
		public string EX_EXERCICE
		{
			get { return _EX_EXERCICE; }
			set { _EX_EXERCICE = value; }
		}

        public string JT_DATEJOURNEETRAVAIL
		{
            get { return _JT_DATEJOURNEETRAVAIL; }
            set { _JT_DATEJOURNEETRAVAIL = value; }
		}
		public string EX_DATEDEBUT
		{
			get { return _EX_DATEDEBUT; }
			set { _EX_DATEDEBUT = value; }
		}
		public string EX_DATEFIN
		{
			get { return _EX_DATEFIN; }
			set { _EX_DATEFIN = value; }
		}
		public string EX_DESCEXERCICE
		{
			get { return _EX_DESCEXERCICE; }
			set { _EX_DESCEXERCICE = value; }
		}
		public string EX_ETATEXERCICE
		{
			get { return _EX_ETATEXERCICE; }
			set { _EX_ETATEXERCICE = value; }
		}
		public string EX_DATESAISIE
		{
			get { return _EX_DATESAISIE; }
			set { _EX_DATESAISIE = value; }
		}
		public string JT_DATEDEBUTPREMIEREXERCICE
        {
			get { return _JT_DATEDEBUTPREMIEREXERCICE; }
			set { _JT_DATEDEBUTPREMIEREXERCICE = value; }
		}
        public string EX_EXERCICEENCOURS
        {
	        get { return _EX_EXERCICEENCOURS; }
	        set { _EX_EXERCICEENCOURS = value; }
        }

        public clsExercice() {}



		public clsExercice(clsExercice clsExercice)
		{
			AG_CODEAGENCE = clsExercice.AG_CODEAGENCE;
			EX_EXERCICE = clsExercice.EX_EXERCICE;
            JT_DATEJOURNEETRAVAIL = clsExercice.JT_DATEJOURNEETRAVAIL;
			EX_DATEDEBUT = clsExercice.EX_DATEDEBUT;
			EX_DATEFIN = clsExercice.EX_DATEFIN;
			EX_DESCEXERCICE = clsExercice.EX_DESCEXERCICE;
			EX_ETATEXERCICE = clsExercice.EX_ETATEXERCICE;
			EX_DATESAISIE = clsExercice.EX_DATESAISIE;
            JT_DATEDEBUTPREMIEREXERCICE = clsExercice.JT_DATEDEBUTPREMIEREXERCICE;
            EX_EXERCICEENCOURS = clsExercice.EX_EXERCICEENCOURS;
		}
        }
}