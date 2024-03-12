using Stock.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace HT_Assurance
{
	public class clsBanqueagence : clsEntitieBase
    {

        private string _AB_CODEAGENCEBANCAIRE = "";
		private string _BQ_CODEBANQUE ="";
		private string _AB_LIBELLE = "";
		private string _AB_ADRESSEGEOGRAPHIQUE = "";
		private string _AB_BOITEPOSTALE = "";
		private string _AB_TELEPHONE = "";
		private string _AB_FAX = "";
		private string _AB_EMAIL = "";
        private string _BQ_ABREGE = "";
        private string _BQ_CODEBIC = "";
        private string _BQ_SITEWEB = "";
        private string _BQ_AUTREINFOS = "";
        private string _CO_CODECOMMUNE = "";
        private string _VL_CODEVILLE = "";
        private string _PY_CODEPAYS = "";


        public string AB_CODEAGENCEBANCAIRE
		{
			get { return _AB_CODEAGENCEBANCAIRE; }
			set { _AB_CODEAGENCEBANCAIRE = value; }
		}
		public string BQ_CODEBANQUE
		{
			get { return _BQ_CODEBANQUE; }
			set { _BQ_CODEBANQUE = value; }
		}
		public string AB_LIBELLE
		{
			get { return _AB_LIBELLE; }
			set { _AB_LIBELLE = value; }
		}
		public string AB_ADRESSEGEOGRAPHIQUE
		{
			get { return _AB_ADRESSEGEOGRAPHIQUE; }
			set { _AB_ADRESSEGEOGRAPHIQUE = value; }
		}
		public string AB_BOITEPOSTALE
		{
			get { return _AB_BOITEPOSTALE; }
			set { _AB_BOITEPOSTALE = value; }
		}
		public string AB_TELEPHONE
		{
			get { return _AB_TELEPHONE; }
			set { _AB_TELEPHONE = value; }
		}
		public string AB_FAX
		{
			get { return _AB_FAX; }
			set { _AB_FAX = value; }
		}
		public string AB_EMAIL
		{
			get { return _AB_EMAIL; }
			set { _AB_EMAIL = value; }
		}

        public string BQ_ABREGE
        {
            get { return _BQ_ABREGE; }
            set { _BQ_ABREGE = value; }
        }

        public string BQ_CODEBIC
        {
            get { return _BQ_CODEBIC; }
            set { _BQ_CODEBIC = value; }
        }

        public string BQ_SITEWEB
        {
            get { return _BQ_SITEWEB; }
            set { _BQ_SITEWEB = value; }
        }

        public string BQ_AUTREINFOS
        {
            get { return _BQ_AUTREINFOS; }
            set { _BQ_AUTREINFOS = value; }
        }

        public string CO_CODECOMMUNE
        {
            get { return _CO_CODECOMMUNE; }
            set { _CO_CODECOMMUNE = value; }
        }
        public string VL_CODEVILLE
        {
            get { return _VL_CODEVILLE; }
            set { _VL_CODEVILLE = value; }
        }
        public string PY_CODEPAYS
        {
            get { return _PY_CODEPAYS; }
            set { _PY_CODEPAYS = value; }
        }



        public clsBanqueagence() {} 

		public clsBanqueagence(string AB_CODEAGENCEBANCAIRE,string BQ_CODEBANQUE,string AB_LIBELLE,string AB_ADRESSEGEOGRAPHIQUE,string AB_BOITEPOSTALE,string AB_TELEPHONE,string AB_FAX,string AB_EMAIL)
		{
			this.AB_CODEAGENCEBANCAIRE = AB_CODEAGENCEBANCAIRE;
			this.BQ_CODEBANQUE = BQ_CODEBANQUE;
			this.AB_LIBELLE = AB_LIBELLE;
			this.AB_ADRESSEGEOGRAPHIQUE = AB_ADRESSEGEOGRAPHIQUE;
			this.AB_BOITEPOSTALE = AB_BOITEPOSTALE;
			this.AB_TELEPHONE = AB_TELEPHONE;
			this.AB_FAX = AB_FAX;
			this.AB_EMAIL = AB_EMAIL;

            this.BQ_ABREGE = BQ_ABREGE;
            this.BQ_CODEBIC = BQ_CODEBIC;
            this.BQ_SITEWEB = BQ_SITEWEB;
            this.BQ_AUTREINFOS = BQ_AUTREINFOS;
            this.CO_CODECOMMUNE = CO_CODECOMMUNE;
		}

		public clsBanqueagence(clsBanqueagence clsBanqueagence)
		{
			AB_CODEAGENCEBANCAIRE = clsBanqueagence.AB_CODEAGENCEBANCAIRE;
			BQ_CODEBANQUE = clsBanqueagence.BQ_CODEBANQUE;
			AB_LIBELLE = clsBanqueagence.AB_LIBELLE;
			AB_ADRESSEGEOGRAPHIQUE = clsBanqueagence.AB_ADRESSEGEOGRAPHIQUE;
			AB_BOITEPOSTALE = clsBanqueagence.AB_BOITEPOSTALE;
			AB_TELEPHONE = clsBanqueagence.AB_TELEPHONE;
			AB_FAX = clsBanqueagence.AB_FAX;
			AB_EMAIL = clsBanqueagence.AB_EMAIL;

            BQ_ABREGE = clsBanqueagence.BQ_ABREGE;
            BQ_CODEBIC = clsBanqueagence.BQ_CODEBIC;
            BQ_SITEWEB = clsBanqueagence.BQ_SITEWEB;
            BQ_AUTREINFOS = clsBanqueagence.BQ_AUTREINFOS;
            CO_CODECOMMUNE = clsBanqueagence.CO_CODECOMMUNE;
            VL_CODEVILLE = clsBanqueagence.VL_CODEVILLE;
            PY_CODEPAYS = clsBanqueagence.PY_CODEPAYS;

            //private string _VL_CODEVILLE = "";
            //private string _PY_CODEPAYS = "";

        }
    }
}