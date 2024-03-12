using System;
using System.Collections.Generic;
using System.Linq;
using System.Data;
using Stock.Common;

namespace HT_Assurance
{
	public class clsCtcontratcheque : clsEntitieBase
    {
		#region VARIABLES LOCALES

		private string _AG_CODEAGENCE = "";
		private string _CH_DATESAISIECHEQUE = "";
		private string _CH_IDEXCHEQUE = "";
		private string _EN_CODEENTREPOT = "";
		private string _AB_CODEAGENCEBANCAIRE = "";
		private string _AB_CODEAGENCEBANCAIREASSUREUR = "";
		private string _CA_CODECONTRAT = "";
		private string _CH_REFCHEQUE = "";
		private string _CH_VALEURCHEQUE = "0";
		private string _CH_DATEANNULATIONCHEQUE = "";
		private string _CH_DATEEMISSIONCHEQUE = "";
		private string _CH_NOMTIREUR = "";
		private string _CH_NOMTIRE = "";
		private string _CH_DATERECEPTIONCHEQUE = "";
		private string _CH_NOMDUDEPOSANT = "";
		private string _CH_TELEPHONEDEPOSANT = "";
		private string _CH_DATEEFFET = "";
		private string _OP_CODEOPERATEUR = "";
		private string _CH_DATEVALIDATIONCHEQUE = "";
		private string _CH_PRIMEAENCAISSER = "0";
		private string _AB_LIBELLE = "";
		private string _BQ_CODEBANQUE = "";
		private string _BQ_RAISONSOCIAL = "";
		private string _BQ_SIGLE = "";


        private string _AB_LIBELLEASSUEUR = "";
        private string _BQ_CODEBANQUEASSUREUR = "";
        private string _BQ_RAISONSOCIALASSUREUR = "";
        private string _BQ_SIGLEASSUREUR = "";


        private string _MS_NUMPIECE = "";
		private string _MV_NOMTIERS = "";
		private string _TI_NUMTIERS = "";
		private string _PL_NUMCOMPTE = "";
		private string _PL_NUMCOMPTEBANQUE = "";

        private string _CH_DATEDEBUTCOUVERTURE ="";
        private string _CH_DATEFINCOUVERTURE = "";
        private string _CH_LIBELLEPHOTOCHEQUE = "";
        private string _RQ_CODERISQUE = "";
        private string _RQ_LIBELLERISQUE = "";
        private string _CB_LIBELLEBRANCHE = "";
        private string _TI_TELEPHONE = "";
        private string _TI_DENOMINATION = "";

        private string _CA_NUMPOLICE = "";
        private string _CA_DATEEFFET = "";
         private string _CA_DATEECHEANCE = "";



        //clsCtcontratcheque.RQ_LIBELLERISQUE = row["RQ_LIBELLERISQUE"].ToString();
        //clsCtcontratcheque.CB_LIBELLEBRANCHE = row["CB_LIBELLEBRANCHE"].ToString();
        //clsCtcontratcheque.TI_TELEPHONE = row["TI_TELEPHONE"].ToString();
        //clsCtcontratcheque.TI_DENOMINATION = row["TI_DENOMINATION"].ToString();

        #endregion

        #region ACCESSEURS

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

		public string EN_CODEENTREPOT
		{
			get { return _EN_CODEENTREPOT; }
			set {  _EN_CODEENTREPOT = value; }
		}

		public string AB_CODEAGENCEBANCAIRE
		{
			get { return _AB_CODEAGENCEBANCAIRE; }
			set {  _AB_CODEAGENCEBANCAIRE = value; }
		}
        public string AB_CODEAGENCEBANCAIREASSUREUR
        {
	        get { return _AB_CODEAGENCEBANCAIREASSUREUR; }
	        set { _AB_CODEAGENCEBANCAIREASSUREUR = value; }
        }


		public string CA_CODECONTRAT
		{
			get { return _CA_CODECONTRAT; }
			set {  _CA_CODECONTRAT = value; }
		}

		public string CH_REFCHEQUE
		{
			get { return _CH_REFCHEQUE; }
			set {  _CH_REFCHEQUE = value; }
		}

		public string CH_VALEURCHEQUE
		{
			get { return _CH_VALEURCHEQUE; }
			set {  _CH_VALEURCHEQUE = value; }
		}

		public string CH_DATEANNULATIONCHEQUE
		{
			get { return _CH_DATEANNULATIONCHEQUE; }
			set {  _CH_DATEANNULATIONCHEQUE = value; }
		}

		public string CH_DATEEMISSIONCHEQUE
		{
			get { return _CH_DATEEMISSIONCHEQUE; }
			set {  _CH_DATEEMISSIONCHEQUE = value; }
		}

		public string CH_NOMTIREUR
		{
			get { return _CH_NOMTIREUR; }
			set {  _CH_NOMTIREUR = value; }
		}

		public string CH_NOMTIRE
		{
			get { return _CH_NOMTIRE; }
			set {  _CH_NOMTIRE = value; }
		}

		public string CH_DATERECEPTIONCHEQUE
		{
			get { return _CH_DATERECEPTIONCHEQUE; }
			set {  _CH_DATERECEPTIONCHEQUE = value; }
		}

		public string CH_NOMDUDEPOSANT
		{
			get { return _CH_NOMDUDEPOSANT; }
			set {  _CH_NOMDUDEPOSANT = value; }
		}

		public string CH_TELEPHONEDEPOSANT
		{
			get { return _CH_TELEPHONEDEPOSANT; }
			set {  _CH_TELEPHONEDEPOSANT = value; }
		}

		public string CH_DATEEFFET
		{
			get { return _CH_DATEEFFET; }
			set {  _CH_DATEEFFET = value; }
		}

		public string OP_CODEOPERATEUR
		{
			get { return _OP_CODEOPERATEUR; }
			set {  _OP_CODEOPERATEUR = value; }
		}


		public string CH_DATEVALIDATIONCHEQUE
		{
			get { return _CH_DATEVALIDATIONCHEQUE; }
			set {  _CH_DATEVALIDATIONCHEQUE = value; }
		}

		public string CH_PRIMEAENCAISSER
		{
			get { return _CH_PRIMEAENCAISSER; }
			set {  _CH_PRIMEAENCAISSER = value; }
		}
		public string AB_LIBELLE
        {
			get { return _AB_LIBELLE; }
			set { _AB_LIBELLE = value; }
		}
		public string BQ_CODEBANQUE
        {
			get { return _BQ_CODEBANQUE; }
			set { _BQ_CODEBANQUE = value; }
		}
		public string BQ_RAISONSOCIAL
        {
			get { return _BQ_RAISONSOCIAL; }
			set { _BQ_RAISONSOCIAL = value; }
		}
		public string BQ_SIGLE
        {
			get { return _BQ_SIGLE; }
			set { _BQ_SIGLE = value; }
		}


        public string AB_LIBELLEASSUEUR
        {
            get { return _AB_LIBELLEASSUEUR; }
            set { _AB_LIBELLEASSUEUR = value; }
        }
        public string BQ_CODEBANQUEASSUREUR
        {
            get { return _BQ_CODEBANQUEASSUREUR; }
            set { _BQ_CODEBANQUEASSUREUR = value; }
        }
        public string BQ_RAISONSOCIALASSUREUR
        {
            get { return _BQ_RAISONSOCIALASSUREUR; }
            set { _BQ_RAISONSOCIALASSUREUR = value; }
        }
        public string BQ_SIGLEASSUREUR
        {
            get { return _BQ_SIGLEASSUREUR; }
            set { _BQ_SIGLEASSUREUR = value; }
        }






        public string MS_NUMPIECE
        {
            get { return _MS_NUMPIECE; }
            set { _MS_NUMPIECE = value; }
        }
        public string MV_NOMTIERS
        {
            get { return _MV_NOMTIERS; }
            set { _MV_NOMTIERS = value; }
        }
        public string TI_NUMTIERS
        {
            get { return _TI_NUMTIERS; }
            set { _TI_NUMTIERS = value; }
        }



        public string PL_NUMCOMPTE
        {
            get { return _PL_NUMCOMPTE; }
            set { _PL_NUMCOMPTE = value; }
        }
        public string PL_NUMCOMPTEBANQUE
        {
            get { return _PL_NUMCOMPTEBANQUE; }
            set { _PL_NUMCOMPTEBANQUE = value; }
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
        public string CH_LIBELLEPHOTOCHEQUE
        {
            get { return _CH_LIBELLEPHOTOCHEQUE; }
            set { _CH_LIBELLEPHOTOCHEQUE = value; }
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
        public string CB_LIBELLEBRANCHE
        {
            get { return _CB_LIBELLEBRANCHE; }
            set { _CB_LIBELLEBRANCHE = value; }
        }
        public string TI_TELEPHONE
        {
            get { return _TI_TELEPHONE; }
            set { _TI_TELEPHONE = value; }
        }
        public string TI_DENOMINATION
        {
            get { return _TI_DENOMINATION; }
            set { _TI_DENOMINATION = value; }
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


       


        #endregion

        #region INSTANCIATEURS

        public clsCtcontratcheque(){}
	
		public clsCtcontratcheque(clsCtcontratcheque clsCtcontratcheque)
		{
			this.AG_CODEAGENCE = clsCtcontratcheque.AG_CODEAGENCE;
			this.CH_DATESAISIECHEQUE = clsCtcontratcheque.CH_DATESAISIECHEQUE;
			this.CH_IDEXCHEQUE = clsCtcontratcheque.CH_IDEXCHEQUE;
			this.EN_CODEENTREPOT = clsCtcontratcheque.EN_CODEENTREPOT;
			this.AB_CODEAGENCEBANCAIRE = clsCtcontratcheque.AB_CODEAGENCEBANCAIRE;
			this.AB_CODEAGENCEBANCAIREASSUREUR = clsCtcontratcheque.AB_CODEAGENCEBANCAIREASSUREUR;
			this.CA_CODECONTRAT = clsCtcontratcheque.CA_CODECONTRAT;
			this.CH_REFCHEQUE = clsCtcontratcheque.CH_REFCHEQUE;
			this.CH_VALEURCHEQUE = clsCtcontratcheque.CH_VALEURCHEQUE;
			this.CH_DATEANNULATIONCHEQUE = clsCtcontratcheque.CH_DATEANNULATIONCHEQUE;
			this.CH_DATEEMISSIONCHEQUE = clsCtcontratcheque.CH_DATEEMISSIONCHEQUE;
			this.CH_NOMTIREUR = clsCtcontratcheque.CH_NOMTIREUR;
			this.CH_NOMTIRE = clsCtcontratcheque.CH_NOMTIRE;
			this.CH_DATERECEPTIONCHEQUE = clsCtcontratcheque.CH_DATERECEPTIONCHEQUE;
			this.CH_NOMDUDEPOSANT = clsCtcontratcheque.CH_NOMDUDEPOSANT;
			this.CH_TELEPHONEDEPOSANT = clsCtcontratcheque.CH_TELEPHONEDEPOSANT;
			this.CH_DATEEFFET = clsCtcontratcheque.CH_DATEEFFET;
			this.OP_CODEOPERATEUR = clsCtcontratcheque.OP_CODEOPERATEUR;
			this.CH_DATEVALIDATIONCHEQUE = clsCtcontratcheque.CH_DATEVALIDATIONCHEQUE;
			this.CH_PRIMEAENCAISSER = clsCtcontratcheque.CH_PRIMEAENCAISSER;

			this.AB_LIBELLE = clsCtcontratcheque.AB_LIBELLE;
			this.BQ_CODEBANQUE = clsCtcontratcheque.BQ_CODEBANQUE;
			this.BQ_RAISONSOCIAL = clsCtcontratcheque.BQ_RAISONSOCIAL;
			this.BQ_SIGLE = clsCtcontratcheque.BQ_SIGLE;


            this.AB_LIBELLEASSUEUR = clsCtcontratcheque.AB_LIBELLEASSUEUR;
            this.BQ_CODEBANQUEASSUREUR = clsCtcontratcheque.BQ_CODEBANQUEASSUREUR;
            this.BQ_RAISONSOCIALASSUREUR = clsCtcontratcheque.BQ_RAISONSOCIALASSUREUR;
            this.BQ_SIGLEASSUREUR = clsCtcontratcheque.BQ_SIGLEASSUREUR;



            this.MS_NUMPIECE = clsCtcontratcheque.MS_NUMPIECE;
			this.MV_NOMTIERS = clsCtcontratcheque.MV_NOMTIERS;
			this.TI_NUMTIERS = clsCtcontratcheque.TI_NUMTIERS;
			this.PL_NUMCOMPTE = clsCtcontratcheque.PL_NUMCOMPTE;
			this.PL_NUMCOMPTEBANQUE = clsCtcontratcheque.PL_NUMCOMPTEBANQUE;
            this.CH_DATEDEBUTCOUVERTURE = clsCtcontratcheque.CH_DATEDEBUTCOUVERTURE;
            this.CH_DATEFINCOUVERTURE = clsCtcontratcheque.CH_DATEFINCOUVERTURE;
            this.CH_LIBELLEPHOTOCHEQUE = clsCtcontratcheque.CH_LIBELLEPHOTOCHEQUE;
            this.RQ_CODERISQUE = clsCtcontratcheque.RQ_CODERISQUE;
            this.RQ_LIBELLERISQUE = clsCtcontratcheque.RQ_LIBELLERISQUE;
            this.CB_LIBELLEBRANCHE = clsCtcontratcheque.CB_LIBELLEBRANCHE;
            this.TI_TELEPHONE = clsCtcontratcheque.TI_TELEPHONE;
            this.TI_DENOMINATION = clsCtcontratcheque.TI_DENOMINATION;
            this.CA_NUMPOLICE = clsCtcontratcheque.CA_NUMPOLICE;
            this.CA_DATEEFFET = clsCtcontratcheque.CA_DATEEFFET;
            this.CA_DATEECHEANCE = clsCtcontratcheque.CA_DATEECHEANCE;
            //clsCtcontratcheque.CA_NUMPOLICE = row["CA_NUMPOLICE"].ToString();
            //clsCtcontratcheque.CA_DATEEFFET = row["CA_DATEEFFET"].ToString();
            //clsCtcontratcheque.CA_DATEECHEANCE = row["CA_DATEECHEANCE"].ToString();

            //private string _MS_NUMPIECE = "";
            //private string _MV_NOMTIERS = "";
            //private string _TI_NUMTIERS = "";
            //private string _PL_NUMCOMPTE = "";
            //private string _PL_NUMCOMPTEBANQUE = "";


        }

        #endregion

    }
}
