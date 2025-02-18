using System;
using System.Collections.Generic;
using System.Linq;
using System.Data;
using Stock.Common;

namespace HT_Assurance
{
	public class clsCtcontratchequephoto : clsEntitieBase
    {
		#region VARIABLES LOCALES

		private string _AG_CODEAGENCE = "";
		private string _CH_DATESAISIECHEQUE = "";
		private string _CH_IDEXCHEQUE = "";
		private string _CH_NUMSEQUENCEPHOTO = "";
		private string _CH_CHEMINPHOTOCHEQUE = "";
		private string _CH_LIBELLEPHOTOCHEQUE = "";
		private string _CA_CODECONTRAT = "";
		private string _OP_CODEOPERATEUR = "";
		private string _CH_REFCHEQUE = "";

		private string _TI_NUMTIERS = "";
		private string _AB_LIBELLE = "";
		private string _BQ_RAISONSOCIAL = "";

        private string _AB_LIBELLEASSUEUR = "";
        private string _BQ_RAISONSOCIALASSUREUR = "";


        private string _TI_DENOMINATION = "";
		private double _CH_VALEURCHEQUE = 0;
		private string _CH_NOMTIRE = "";
		private string _CH_NOMTIREUR = "";
		private string _CH_DATEEMISSIONCHEQUE = "";
		private string _CH_TYPECHEQUE = "";
		private string _CA_NUMPOLICE = "";
		private string _CA_DATEEFFET = "";
		private string _CA_DATEECHEANCE = "";
		private string _CB_LIBELLEBRANCHE = "";
		private string _CH_DATEDEBUTCOUVERTURE = "";
		private string _CH_DATEFINCOUVERTURE = "";
		private string _RQ_CODERISQUE = "";
		private string _RQ_LIBELLERISQUE = "";
		private string _TA_CODETYPEAFFAIRES = "";
		private string _OP_NOMPRENOM = "";
		private string _BQ_SIGLE = "";
		private string _TI_NUMTIERSASSUREUR = "";
		private string _TI_DENOMINATIONASSUREUR = "";
		private string _TI_NUMEROASSUREUR = "";
        private string _FORMATETAT = "";
        private string _TA_LIBLLETYPEAFFAIRES = "";

        #endregion

        #region ACCESSEURS
        public string TA_LIBLLETYPEAFFAIRES
        {
            get { return _TA_LIBLLETYPEAFFAIRES; }
            set { _TA_LIBLLETYPEAFFAIRES = value; }
        }
        public string FORMATETAT
        {
            get { return _FORMATETAT; }
            set { _FORMATETAT = value; }
        }
        public string AG_CODEAGENCE
		{
			get { return _AG_CODEAGENCE; }
			set {  _AG_CODEAGENCE = value; }
		}

		public string CH_DATESAISIECHEQUE
		{
			get { return _CH_DATESAISIECHEQUE; }
			set {  _CH_DATESAISIECHEQUE = value; }
		}

		public string CH_IDEXCHEQUE
		{
			get { return _CH_IDEXCHEQUE; }
			set {  _CH_IDEXCHEQUE = value; }
		}

		public string CH_NUMSEQUENCEPHOTO
		{
			get { return _CH_NUMSEQUENCEPHOTO; }
			set {  _CH_NUMSEQUENCEPHOTO = value; }
		}

		public string CH_CHEMINPHOTOCHEQUE
		{
			get { return _CH_CHEMINPHOTOCHEQUE; }
			set {  _CH_CHEMINPHOTOCHEQUE = value; }
		}

		public string CH_LIBELLEPHOTOCHEQUE
		{
			get { return _CH_LIBELLEPHOTOCHEQUE; }
			set {  _CH_LIBELLEPHOTOCHEQUE = value; }
		}
		public string CA_CODECONTRAT
        {
			get { return _CA_CODECONTRAT; }
			set { _CA_CODECONTRAT = value; }
		}
        public string OP_CODEOPERATEUR
        {
	        get { return _OP_CODEOPERATEUR; }
	        set { _OP_CODEOPERATEUR = value; }
        }
        public string CH_REFCHEQUE
        {
	        get { return _CH_REFCHEQUE; }
	        set { _CH_REFCHEQUE = value; }
        }
        public string TI_NUMTIERS
        {
	        get { return _TI_NUMTIERS; }
	        set { _TI_NUMTIERS = value; }
        }
        public string AB_LIBELLE
        {
	        get { return _AB_LIBELLE; }
	        set { _AB_LIBELLE = value; }
        }
        public string BQ_RAISONSOCIAL
        {
	        get { return _BQ_RAISONSOCIAL; }
	        set { _BQ_RAISONSOCIAL = value; }
        }

        public string AB_LIBELLEASSUEUR
        {
	        get { return _AB_LIBELLEASSUEUR; }
	        set { _AB_LIBELLEASSUEUR = value; }
        }
        public string BQ_RAISONSOCIALASSUREUR
        {
	        get { return _BQ_RAISONSOCIALASSUREUR; }
	        set { _BQ_RAISONSOCIALASSUREUR = value; }
        }


        public string TI_DENOMINATION
        {
	        get { return _TI_DENOMINATION; }
	        set { _TI_DENOMINATION = value; }
        }
        public double CH_VALEURCHEQUE
        {
	        get { return _CH_VALEURCHEQUE; }
	        set { _CH_VALEURCHEQUE = value; }
        }
        public string CH_NOMTIRE
        {
        get { return _CH_NOMTIRE; }
        set { _CH_NOMTIRE = value; }
        }
        public string CH_NOMTIREUR
        {
        get { return _CH_NOMTIREUR; }
        set { _CH_NOMTIREUR = value; }
        }
        public string CH_DATEEMISSIONCHEQUE
        {
        get { return _CH_DATEEMISSIONCHEQUE; }
        set { _CH_DATEEMISSIONCHEQUE = value; }
        }
        public string CH_TYPECHEQUE
        {
        get { return _CH_TYPECHEQUE; }
        set { _CH_TYPECHEQUE = value; }
        }
        public string CA_NUMPOLICE
        {
        get { return _CA_NUMPOLICE; }
        set { _CA_NUMPOLICE = value; }
        }
        public string CA_DATEEFFET
        {
        get { return _CA_DATEEFFET; }
        set { _CA_DATEEFFET = value; }
        }
        public string CA_DATEECHEANCE
        {
        get { return _CA_DATEECHEANCE; }
        set { _CA_DATEECHEANCE = value; }
        }
        public string CB_LIBELLEBRANCHE
        {
        get { return _CB_LIBELLEBRANCHE; }
        set { _CB_LIBELLEBRANCHE = value; }
        }
        public string CH_DATEDEBUTCOUVERTURE
        {
        get { return _CH_DATEDEBUTCOUVERTURE; }
        set { _CH_DATEDEBUTCOUVERTURE = value; }
        }
        public string CH_DATEFINCOUVERTURE
        {
        get { return _CH_DATEFINCOUVERTURE; }
        set { _CH_DATEFINCOUVERTURE = value; }
        }
        public string RQ_CODERISQUE
        {
        get { return _RQ_CODERISQUE; }
        set { _RQ_CODERISQUE = value; }
        }
        public string RQ_LIBELLERISQUE
        {
        get { return _RQ_LIBELLERISQUE; }
        set { _RQ_LIBELLERISQUE = value; }
        }

        public string TA_CODETYPEAFFAIRES
        {
        get { return _TA_CODETYPEAFFAIRES; }
        set { _TA_CODETYPEAFFAIRES = value; }
        }

        public string OP_NOMPRENOM
        {
        get { return _OP_NOMPRENOM; }
        set { _OP_NOMPRENOM = value; }
        }
        public string BQ_SIGLE
        {
        get { return _BQ_SIGLE; }
        set { _BQ_SIGLE = value; }
        }
        public string TI_NUMTIERSASSUREUR
        {
        get { return _TI_NUMTIERSASSUREUR; }
        set { _TI_NUMTIERSASSUREUR = value; }
        }
        public string TI_DENOMINATIONASSUREUR
        {
        get { return _TI_DENOMINATIONASSUREUR; }
        set { _TI_DENOMINATIONASSUREUR = value; }
        }        
        public string TI_NUMEROASSUREUR
        {
        get { return _TI_NUMEROASSUREUR; }
        set { _TI_NUMEROASSUREUR = value; }
        } 

        #endregion

        #region INSTANCIATEURS

        public clsCtcontratchequephoto(){}

		public clsCtcontratchequephoto(clsCtcontratchequephoto clsCtcontratchequephoto)
		{
			this.AG_CODEAGENCE = clsCtcontratchequephoto.AG_CODEAGENCE;
			this.CH_DATESAISIECHEQUE = clsCtcontratchequephoto.CH_DATESAISIECHEQUE;
			this.CH_IDEXCHEQUE = clsCtcontratchequephoto.CH_IDEXCHEQUE;
			this.CH_NUMSEQUENCEPHOTO = clsCtcontratchequephoto.CH_NUMSEQUENCEPHOTO;
			this.CH_CHEMINPHOTOCHEQUE = clsCtcontratchequephoto.CH_CHEMINPHOTOCHEQUE;
			this.CH_LIBELLEPHOTOCHEQUE = clsCtcontratchequephoto.CH_LIBELLEPHOTOCHEQUE;
			this.CA_CODECONTRAT = clsCtcontratchequephoto.CA_CODECONTRAT;
			this.OP_CODEOPERATEUR = clsCtcontratchequephoto.OP_CODEOPERATEUR;
			this.CH_REFCHEQUE = clsCtcontratchequephoto.CH_REFCHEQUE;
			this.TI_NUMTIERS = clsCtcontratchequephoto.TI_NUMTIERS;

			this.AB_LIBELLE = clsCtcontratchequephoto.AB_LIBELLE;
			this.BQ_RAISONSOCIAL = clsCtcontratchequephoto.BQ_RAISONSOCIAL;

			this.AB_LIBELLEASSUEUR = clsCtcontratchequephoto.AB_LIBELLEASSUEUR;
			this.BQ_RAISONSOCIALASSUREUR = clsCtcontratchequephoto.BQ_RAISONSOCIALASSUREUR;

			this.TI_DENOMINATION = clsCtcontratchequephoto.TI_DENOMINATION;
			this.CH_VALEURCHEQUE = clsCtcontratchequephoto.CH_VALEURCHEQUE;
			this.CH_NOMTIRE = clsCtcontratchequephoto.CH_NOMTIRE;
			this.CH_NOMTIREUR = clsCtcontratchequephoto.CH_NOMTIREUR;
			this.CH_DATEEMISSIONCHEQUE = clsCtcontratchequephoto.CH_DATEEMISSIONCHEQUE;
			this.CH_TYPECHEQUE = clsCtcontratchequephoto.CH_TYPECHEQUE;
			this.CA_NUMPOLICE = clsCtcontratchequephoto.CA_NUMPOLICE;
			this.CA_DATEEFFET = clsCtcontratchequephoto.CA_DATEEFFET;
			this.CA_DATEECHEANCE = clsCtcontratchequephoto.CA_DATEECHEANCE;
			this.CB_LIBELLEBRANCHE = clsCtcontratchequephoto.CB_LIBELLEBRANCHE;
			this.CH_DATEDEBUTCOUVERTURE = clsCtcontratchequephoto.CH_DATEDEBUTCOUVERTURE;
			this.CH_DATEFINCOUVERTURE = clsCtcontratchequephoto.CH_DATEFINCOUVERTURE;
			this.RQ_CODERISQUE = clsCtcontratchequephoto.RQ_CODERISQUE;
			this.RQ_LIBELLERISQUE = clsCtcontratchequephoto.RQ_LIBELLERISQUE;
			this.TA_CODETYPEAFFAIRES = clsCtcontratchequephoto.TA_CODETYPEAFFAIRES;

			this.OP_NOMPRENOM = clsCtcontratchequephoto.OP_NOMPRENOM;
			this.BQ_SIGLE = clsCtcontratchequephoto.BQ_SIGLE;           
			this.TI_NUMTIERSASSUREUR = clsCtcontratchequephoto.TI_NUMTIERSASSUREUR;  
			this.TI_DENOMINATIONASSUREUR = clsCtcontratchequephoto.TI_DENOMINATIONASSUREUR;  
			this.TI_NUMEROASSUREUR = clsCtcontratchequephoto.TI_NUMEROASSUREUR;
            this.FORMATETAT = clsCtcontratchequephoto.FORMATETAT;
            this.TA_LIBLLETYPEAFFAIRES = clsCtcontratchequephoto.TA_LIBLLETYPEAFFAIRES;

        }

        #endregion

    }
}
