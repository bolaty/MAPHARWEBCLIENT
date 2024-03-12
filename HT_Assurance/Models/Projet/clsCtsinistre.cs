using System;
using System.Collections.Generic;
using System.Linq;
using System.Data;
using Stock.Common;

namespace HT_Assurance
{
	public class clsCtsinistre : clsEntitieBase
    {
		#region VARIABLES LOCALES

		private string _SI_CODESINISTRE = "";
		private string _AG_CODEAGENCE = "";
		private string _EN_CODEENTREPOT = "";
		private string _NS_CODENATURESINISTRE = "";
		private string _CA_CODECONTRAT = "";
		private string _SI_NUMSINISTRE = "";
		private string _SI_DATESAISIE = "";
		private string _SI_DATESINISTRE ="";
		private string _SI_HEURESINISTRE ="";
		private string _SI_NOMPRENOMSCONDUCTEURSINISTRE = "";
		private string _CO_CODECOMMUNE = "";
		private string _SI_ADRESSEGEOGRPHIQUESINISTRE = "";
		private string _SI_DESCRIPTIONSINISTRE = "";
		private string _SI_DATETRANSMISSIONSINISTRE = "";
		private string _SI_DATEVALIDATIONSINISTRE = "";
		private string _SI_DATESUSPENSIONSINISTRE ="";
		private string _SI_DATECLOTURESINISTRE = "";
		private string _OP_CODEOPERATEUR = "";
		private string _SI_DOCUMENTTRANSMIS = "";
		private string _SI_MONTANTPREJUDICE = "0";
		private string _EP_CODEEXPERTNOMME = "";
		private string _SI_DATEEXPERTNOMMESINISTRE = "";
		private string _CA_NUMPOLICE = "";
		private string _TI_NUMTIERS = "";
		private string _TI_DENOMINATION = "";
		private string _SI_NOMBRECONTRAT = "0";
		private string _MS_NUMPIECE = "";
		private string _NO_CODENATUREOPERATION = "";
		private string _DATEJOURNEE = "";

		private string _TI_TELEPHONE = "";
		private string _TI_ADRESSEPOSTALE = "";
		private string _TI_ADRESSEGEOGRAPHIQUE = "";
		private string _TP_LIBELLE = "";
		private string _SOLDEPRECEDENT = "";
		private string _MONTANTFACTUREINITIAL = "";
		private string _MONTANTVERSE = "";
		private string _MV_SOLDEFINAL = "";
		private string _MV_DATEPIECE = "";
		private string _NUMEROBORDEREAU = "";
		private string _MV_REFERENCEPIECE = "";
		private string _MV_LIBELLEOPERATION = "";
		private string _MV_MONTANTDEBIT = "";
		private string _MV_SOLDE = "";
		private string _MV_MONTANTCREDIT = "";

		private string _VL_LIBELLE = "";
		private string _PY_LIBELLE = "";
		private string _CO_LIBELLE = "";
		private string _NS_LIBELLENATURESINISTRE = "";
		private string _PY_CODEPAYS = "";
		private string _VL_CODEVILLE = "";

        private string _SI_MONTANTPREJUDICEVALIDER = "0";
        private string _OP_CODEOPERATEURSAISIEMONTANTVALIDER = "";
        private string _SI_DATESAISIEMONTANTVALIDER ="";
        private string _SI_MONTANTPREJUDICEREMBOURSE = "0";
        private string _SI_SOLDE = "0";
        private string _SI_MONTANTPREJUDICENF = "0";
        private string _SI_MONTANTPREJUDICEVALIDERNF = "0";
        private string _LO_CODELOGICIEL = "";
        private string _RQ_LIBELLERISQUE = "";
        private double _REMISE = 0;

        private string _RQ_CODERISQUE = "";
        private string _CB_LIBELLEBRANCHE = "";
        private string _CA_DATEEFFET = "";
        private string _CA_DATEECHEANCE = "";


        private string _SI_TELEPHONECONDUCTEURSINISTRE = "";
        private string _SI_NUMWHATSAPPCONDUCTEURSINISTRE = "";
        private string _SI_DATENAISSANCECONDUCTEURSINISTRE = "";
        private string _SI_NUMPERMISCONDUCTEURSINISTRE = "";
        private string _SI_DATEDELIVRANCEPERMISCONDUCTEURSINISTRE = "";
        private string _SI_DATEVALIDITEPERMISCONDUCTEURSINISTRE = "";
        private string _SI_IMMATRICULATIONVEHICULE = "";
        private string _SI_MARQUEVEHICULE = "";
        private string _SI_NOMETCONTACTSVICTIMES = "";
        private string _SI_AILEARRIEREDROIT = "";
        private string _SI_AILEARRIEREGAUCHE = "";
        private string _SI_PARCHOCAVANT = "";
        private string _SI_PARCHOCARRIERE = "";
        private string _SI_LATERALGAUCHE = "";
        private string _SI_LATERALDROIT = "";
        private string _SI_CAPOTMOTEUR = "";
        private string _SI_AUTRES = "";
        private string _SI_REPARATEUR = "";
        private string _SI_NOMBREBLESSESVEHICULEASSURE = "";
        private string _SI_NOMBREDECESVEHICULEASSURE = "";
        private string _SI_NOMBREBLESSESVEHICULETIERS = "";
        private string _SI_NOMBREDECESVEHICULETIERS = "";
        private string _SI_PVCONSTATPOLICE = "";
        private string _SI_PVGENDARMERIE = "";
        private string _SI_PVAMIABLE = "";
        private string _SI_UNITE = "";
        private string _SI_NOMAGENT = "";
        private string _SI_TELPHONEAGENT = "";
        private string _SI_HUSSIER = "";

        #endregion

        #region ACCESSEURS

        public string SI_CODESINISTRE
		{
			get { return _SI_CODESINISTRE; }
			set {  _SI_CODESINISTRE = value; }
		}

		public string AG_CODEAGENCE
		{
			get { return _AG_CODEAGENCE; }
			set {  _AG_CODEAGENCE = value; }
		}

		public string EN_CODEENTREPOT
		{
			get { return _EN_CODEENTREPOT; }
			set {  _EN_CODEENTREPOT = value; }
		}

		public string NS_CODENATURESINISTRE
		{
			get { return _NS_CODENATURESINISTRE; }
			set {  _NS_CODENATURESINISTRE = value; }
		}

		public string CA_CODECONTRAT
		{
			get { return _CA_CODECONTRAT; }
			set {  _CA_CODECONTRAT = value; }
		}

		public string SI_NUMSINISTRE
		{
			get { return _SI_NUMSINISTRE; }
			set {  _SI_NUMSINISTRE = value; }
		}

		public string SI_DATESAISIE
		{
			get { return _SI_DATESAISIE; }
			set {  _SI_DATESAISIE = value; }
		}

		public string SI_DATESINISTRE
		{
			get { return _SI_DATESINISTRE; }
			set {  _SI_DATESINISTRE = value; }
		}

		public string SI_HEURESINISTRE
		{
			get { return _SI_HEURESINISTRE; }
			set {  _SI_HEURESINISTRE = value; }
		}

		public string SI_NOMPRENOMSCONDUCTEURSINISTRE
		{
			get { return _SI_NOMPRENOMSCONDUCTEURSINISTRE; }
			set {  _SI_NOMPRENOMSCONDUCTEURSINISTRE = value; }
		}

		public string CO_CODECOMMUNE
		{
			get { return _CO_CODECOMMUNE; }
			set {  _CO_CODECOMMUNE = value; }
		}

		public string SI_ADRESSEGEOGRPHIQUESINISTRE
		{
			get { return _SI_ADRESSEGEOGRPHIQUESINISTRE; }
			set {  _SI_ADRESSEGEOGRPHIQUESINISTRE = value; }
		}

		public string SI_DESCRIPTIONSINISTRE
		{
			get { return _SI_DESCRIPTIONSINISTRE; }
			set {  _SI_DESCRIPTIONSINISTRE = value; }
		}

		public string SI_DATETRANSMISSIONSINISTRE
		{
			get { return _SI_DATETRANSMISSIONSINISTRE; }
			set {  _SI_DATETRANSMISSIONSINISTRE = value; }
		}

		public string SI_DATEVALIDATIONSINISTRE
		{
			get { return _SI_DATEVALIDATIONSINISTRE; }
			set {  _SI_DATEVALIDATIONSINISTRE = value; }
		}

		public string SI_DATESUSPENSIONSINISTRE
		{
			get { return _SI_DATESUSPENSIONSINISTRE; }
			set {  _SI_DATESUSPENSIONSINISTRE = value; }
		}

		public string SI_DATECLOTURESINISTRE
		{
			get { return _SI_DATECLOTURESINISTRE; }
			set {  _SI_DATECLOTURESINISTRE = value; }
		}

		public string OP_CODEOPERATEUR
		{
			get { return _OP_CODEOPERATEUR; }
			set {  _OP_CODEOPERATEUR = value; }
		}

		public string SI_DOCUMENTTRANSMIS
		{
			get { return _SI_DOCUMENTTRANSMIS; }
			set {  _SI_DOCUMENTTRANSMIS = value; }
		}

		public string SI_MONTANTPREJUDICE
		{
			get { return _SI_MONTANTPREJUDICE; }
			set {  _SI_MONTANTPREJUDICE = value; }
		}

		public string EP_CODEEXPERTNOMME
		{
			get { return _EP_CODEEXPERTNOMME; }
			set {  _EP_CODEEXPERTNOMME = value; }
		}

		public string SI_DATEEXPERTNOMMESINISTRE
		{
			get { return _SI_DATEEXPERTNOMMESINISTRE; }
			set {  _SI_DATEEXPERTNOMMESINISTRE = value; }
		}
        public string CA_NUMPOLICE
        {
	        get { return _CA_NUMPOLICE; }
	        set { _CA_NUMPOLICE = value; }
        }

        public string TI_NUMTIERS
        {
	        get { return _TI_NUMTIERS; }
	        set { _TI_NUMTIERS = value; }
        }

        public string TI_DENOMINATION
        {
	        get { return _TI_DENOMINATION; }
	        set { _TI_DENOMINATION = value; }
        }

        public string SI_NOMBRECONTRAT
        {
	        get { return _SI_NOMBRECONTRAT; }
	        set { _SI_NOMBRECONTRAT = value; }
        }

        public string MS_NUMPIECE
        {
	        get { return _MS_NUMPIECE; }
	        set { _MS_NUMPIECE = value; }
        }
        public string NO_CODENATUREOPERATION
        {
	        get { return _NO_CODENATUREOPERATION; }
	        set { _NO_CODENATUREOPERATION = value; }
        }
        public string DATEJOURNEE
        {
	        get { return _DATEJOURNEE; }
	        set { _DATEJOURNEE = value; }
        }

        public string TI_TELEPHONE
        {
	        get { return _TI_TELEPHONE; }
	        set { _TI_TELEPHONE = value; }
        }
        public string TI_ADRESSEPOSTALE
        {
	        get { return _TI_ADRESSEPOSTALE; }
	        set { _TI_ADRESSEPOSTALE = value; }
        }
        public string TI_ADRESSEGEOGRAPHIQUE
        {
	        get { return _TI_ADRESSEGEOGRAPHIQUE; }
	        set { _TI_ADRESSEGEOGRAPHIQUE = value; }
        }
        public string TP_LIBELLE
        {
	        get { return _TP_LIBELLE; }
	        set { _TP_LIBELLE = value; }
        }
        public string SOLDEPRECEDENT
        {
	        get { return _SOLDEPRECEDENT; }
	        set { _SOLDEPRECEDENT = value; }
        }
        public string MONTANTFACTUREINITIAL
        {
	        get { return _MONTANTFACTUREINITIAL; }
	        set { _MONTANTFACTUREINITIAL = value; }
        }
        public string MONTANTVERSE
        {
	        get { return _MONTANTVERSE; }
	        set { _MONTANTVERSE = value; }
        }
        public string MV_SOLDEFINAL
        {
	        get { return _MV_SOLDEFINAL; }
	        set { _MV_SOLDEFINAL = value; }
        }
        public string MV_DATEPIECE
        {
	        get { return _MV_DATEPIECE; }
	        set { _MV_DATEPIECE = value; }
        }
        public string NUMEROBORDEREAU
        {
	        get { return _NUMEROBORDEREAU; }
	        set { _NUMEROBORDEREAU = value; }
        }
        public string MV_REFERENCEPIECE
        {
	        get { return _MV_REFERENCEPIECE; }
	        set { _MV_REFERENCEPIECE = value; }
        }
        public string MV_LIBELLEOPERATION
        {
	        get { return _MV_LIBELLEOPERATION; }
	        set { _MV_LIBELLEOPERATION = value; }
        }
        public string MV_MONTANTDEBIT
        {
	        get { return _MV_MONTANTDEBIT; }
	        set { _MV_MONTANTDEBIT = value; }
        }
        public string MV_MONTANTCREDIT
        {
	        get { return _MV_MONTANTCREDIT; }
	        set { _MV_MONTANTCREDIT = value; }
        }


        public string MV_SOLDE
        {
	        get { return _MV_SOLDE; }
	        set { _MV_SOLDE = value; }
        }

        public string VL_LIBELLE
        {
	        get { return _VL_LIBELLE; }
	        set { _VL_LIBELLE = value; }
        }
        public string PY_LIBELLE
        {
	        get { return _PY_LIBELLE; }
	        set { _PY_LIBELLE = value; }
        }
        public string CO_LIBELLE
        {
	        get { return _CO_LIBELLE; }
	        set { _CO_LIBELLE = value; }
        }
        public string NS_LIBELLENATURESINISTRE
        {
	        get { return _NS_LIBELLENATURESINISTRE; }
	        set { _NS_LIBELLENATURESINISTRE = value; }
        }
        public string PY_CODEPAYS
        {
	        get { return _PY_CODEPAYS; }
	        set { _PY_CODEPAYS = value; }
        }
        public string VL_CODEVILLE
        {
	        get { return _VL_CODEVILLE; }
	        set { _VL_CODEVILLE = value; }
        }

        public string SI_MONTANTPREJUDICEVALIDER
        {
            get { return _SI_MONTANTPREJUDICEVALIDER; }
            set { _SI_MONTANTPREJUDICEVALIDER = value; }
        }
        public string OP_CODEOPERATEURSAISIEMONTANTVALIDER
        {
            get { return _OP_CODEOPERATEURSAISIEMONTANTVALIDER; }
            set { _OP_CODEOPERATEURSAISIEMONTANTVALIDER = value; }
        }

        public string SI_DATESAISIEMONTANTVALIDER
        {
            get { return _SI_DATESAISIEMONTANTVALIDER; }
            set { _SI_DATESAISIEMONTANTVALIDER = value; }
        }


        public string SI_MONTANTPREJUDICENF
        {
            get { return _SI_MONTANTPREJUDICENF; }
            set { _SI_MONTANTPREJUDICENF = value; }
        }
        public string SI_MONTANTPREJUDICEVALIDERNF
        {
            get { return _SI_MONTANTPREJUDICEVALIDERNF; }
            set { _SI_MONTANTPREJUDICEVALIDERNF = value; }
        }
        public string LO_CODELOGICIEL
        {
            get { return _LO_CODELOGICIEL; }
            set { _LO_CODELOGICIEL = value; }
        }
        public string RQ_LIBELLERISQUE
        {
            get { return _RQ_LIBELLERISQUE; }
            set { _RQ_LIBELLERISQUE = value; }
        }
        public string RQ_CODERISQUE
        {
            get { return _RQ_CODERISQUE; }
            set { _RQ_CODERISQUE = value; }
        }
        public string CB_LIBELLEBRANCHE
        {
            get { return _CB_LIBELLEBRANCHE; }
            set { _CB_LIBELLEBRANCHE = value; }
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
        public double REMISE
        {
            get { return _REMISE; }
            set { _REMISE = value; }
        }



        public string SI_TELEPHONECONDUCTEURSINISTRE
        {
            get { return _SI_TELEPHONECONDUCTEURSINISTRE; }
            set { _SI_TELEPHONECONDUCTEURSINISTRE = value; }
        }
        public string SI_NUMWHATSAPPCONDUCTEURSINISTRE
        {
            get { return _SI_NUMWHATSAPPCONDUCTEURSINISTRE; }
            set { _SI_NUMWHATSAPPCONDUCTEURSINISTRE = value; }
        }

        public string SI_DATENAISSANCECONDUCTEURSINISTRE
        {
            get { return _SI_DATENAISSANCECONDUCTEURSINISTRE; }
            set { _SI_DATENAISSANCECONDUCTEURSINISTRE = value; }
        }

        public string SI_NUMPERMISCONDUCTEURSINISTRE
        {
            get { return _SI_NUMPERMISCONDUCTEURSINISTRE; }
            set { _SI_NUMPERMISCONDUCTEURSINISTRE = value; }
        }

        public string SI_DATEDELIVRANCEPERMISCONDUCTEURSINISTRE
        {
            get { return _SI_DATEDELIVRANCEPERMISCONDUCTEURSINISTRE; }
            set { _SI_DATEDELIVRANCEPERMISCONDUCTEURSINISTRE = value; }
        }

        public string SI_DATEVALIDITEPERMISCONDUCTEURSINISTRE
        {
            get { return _SI_DATEVALIDITEPERMISCONDUCTEURSINISTRE; }
            set { _SI_DATEVALIDITEPERMISCONDUCTEURSINISTRE = value; }
        }

        public string SI_IMMATRICULATIONVEHICULE
        {
            get { return _SI_IMMATRICULATIONVEHICULE; }
            set { _SI_IMMATRICULATIONVEHICULE = value; }
        }

        public string SI_MARQUEVEHICULE
        {
            get { return _SI_MARQUEVEHICULE; }
            set { _SI_MARQUEVEHICULE = value; }
        }

        public string SI_NOMETCONTACTSVICTIMES
        {
            get { return _SI_NOMETCONTACTSVICTIMES; }
            set { _SI_NOMETCONTACTSVICTIMES = value; }
        }

        public string SI_AILEARRIEREDROIT
        {
            get { return _SI_AILEARRIEREDROIT; }
            set { _SI_AILEARRIEREDROIT = value; }
        }

        public string SI_AILEARRIEREGAUCHE
        {
            get { return _SI_AILEARRIEREGAUCHE; }
            set { _SI_AILEARRIEREGAUCHE = value; }
        }

        public string SI_PARCHOCAVANT
        {
            get { return _SI_PARCHOCAVANT; }
            set { _SI_PARCHOCAVANT = value; }
        }

        public string SI_PARCHOCARRIERE
        {
            get { return _SI_PARCHOCARRIERE; }
            set { _SI_PARCHOCARRIERE = value; }
        }

        public string SI_LATERALGAUCHE
        {
            get { return _SI_LATERALGAUCHE; }
            set { _SI_LATERALGAUCHE = value; }
        }

        public string SI_LATERALDROIT
        {
            get { return _SI_LATERALDROIT; }
            set { _SI_LATERALDROIT = value; }
        }

        public string SI_CAPOTMOTEUR
        {
            get { return _SI_CAPOTMOTEUR; }
            set { _SI_CAPOTMOTEUR = value; }
        }

        public string SI_AUTRES
        {
            get { return _SI_AUTRES; }
            set { _SI_AUTRES = value; }
        }

        public string SI_REPARATEUR
        {
            get { return _SI_REPARATEUR; }
            set { _SI_REPARATEUR = value; }
        }

        public string SI_NOMBREBLESSESVEHICULEASSURE
        {
            get { return _SI_NOMBREBLESSESVEHICULEASSURE; }
            set { _SI_NOMBREBLESSESVEHICULEASSURE = value; }
        }

        public string SI_NOMBREDECESVEHICULEASSURE
        {
            get { return _SI_NOMBREDECESVEHICULEASSURE; }
            set { _SI_NOMBREDECESVEHICULEASSURE = value; }
        }

        public string SI_NOMBREBLESSESVEHICULETIERS
        {
            get { return _SI_NOMBREBLESSESVEHICULETIERS; }
            set { _SI_NOMBREBLESSESVEHICULETIERS = value; }
        }

        public string SI_NOMBREDECESVEHICULETIERS
        {
            get { return _SI_NOMBREDECESVEHICULETIERS; }
            set { _SI_NOMBREDECESVEHICULETIERS = value; }
        }

        public string SI_PVCONSTATPOLICE
        {
            get { return _SI_PVCONSTATPOLICE; }
            set { _SI_PVCONSTATPOLICE = value; }
        }

        public string SI_PVGENDARMERIE
        {
            get { return _SI_PVGENDARMERIE; }
            set { _SI_PVGENDARMERIE = value; }
        }

        public string SI_PVAMIABLE
        {
            get { return _SI_PVAMIABLE; }
            set { _SI_PVAMIABLE = value; }
        }

        public string SI_UNITE
        {
            get { return _SI_UNITE; }
            set { _SI_UNITE = value; }
        }

        public string SI_NOMAGENT
        {
            get { return _SI_NOMAGENT; }
            set { _SI_NOMAGENT = value; }
        }

        public string SI_TELPHONEAGENT
        {
            get { return _SI_TELPHONEAGENT; }
            set { _SI_TELPHONEAGENT = value; }
        }
        public string SI_HUSSIER
        {
            get { return _SI_HUSSIER; }
            set { _SI_HUSSIER = value; }
        }
        public string SI_MONTANTPREJUDICEREMBOURSE
        {
            get { return _SI_MONTANTPREJUDICEREMBOURSE; }
            set { _SI_MONTANTPREJUDICEREMBOURSE = value; }
        }
        public string SI_SOLDE
        {
            get { return _SI_SOLDE; }
            set { _SI_SOLDE = value; }
        }

       


        //private string _SI_TELEPHONECONDUCTEURSINISTRE = "";
        //private string _SI_NUMWHATSAPPCONDUCTEURSINISTRE = "";
        //private string _SI_DATENAISSANCECONDUCTEURSINISTRE = "";
        //private string _SI_NUMPERMISCONDUCTEURSINISTRE = "";
        //private string _SI_DATEDELIVRANCEPERMISCONDUCTEURSINISTRE = "";
        //private string _SI_DATEVALIDITEPERMISCONDUCTEURSINISTRE = "";
        //private string _SI_IMMATRICULATIONVEHICULE = "";




        //private string _SI_MARQUEVEHICULE = "";
        //private string _SI_NOMETCONTACTSVICTIMES = "";
        //private string _SI_AILEARRIEREDROIT = "";
        //private string _SI_AILEARRIEREGAUCHE = "";
        //private string _SI_PARCHOCAVANT = "";
        //private string _SI_PARCHOCARRIERE = "";
        //private string _SI_LATERALGAUCHE = "";
        //private string _SI_LATERALDROIT = "";



        //private string _SI_CAPOTMOTEUR = "";
        //private string _SI_AUTRES = "";
        //private string _SI_REPARATEUR = "";
        //private string _SI_NOMBREBLESSESVEHICULEASSURE = "";
        //private string _SI_NOMBREDECESVEHICULEASSURE = "";
        //private string _SI_NOMBREBLESSESVEHICULETIERS = "";
        //private string _SI_NOMBREDECESVEHICULETIERS = "";
        //private string _SI_PVCONSTATPOLICE = "";
        //private string _SI_PVGENDARMERIE = "";
        //private string _SI_PVAMIABLE = "";
        //private string _SI_UNITE = "";
        //private string _SI_NOMAGENT = "";
        //private string _SI_TELPHONEAGENT = "";




        #endregion

        #region INSTANCIATEURS

        public clsCtsinistre(){}
		
		public clsCtsinistre(clsCtsinistre clsCtsinistre)
		{
			this.SI_CODESINISTRE = clsCtsinistre.SI_CODESINISTRE;
			this.AG_CODEAGENCE = clsCtsinistre.AG_CODEAGENCE;
			this.EN_CODEENTREPOT = clsCtsinistre.EN_CODEENTREPOT;
			this.NS_CODENATURESINISTRE = clsCtsinistre.NS_CODENATURESINISTRE;
			this.CA_CODECONTRAT = clsCtsinistre.CA_CODECONTRAT;
			this.SI_NUMSINISTRE = clsCtsinistre.SI_NUMSINISTRE;
			this.SI_DATESAISIE = clsCtsinistre.SI_DATESAISIE;
			this.SI_DATESINISTRE = clsCtsinistre.SI_DATESINISTRE;
			this.SI_HEURESINISTRE = clsCtsinistre.SI_HEURESINISTRE;
			this.SI_NOMPRENOMSCONDUCTEURSINISTRE = clsCtsinistre.SI_NOMPRENOMSCONDUCTEURSINISTRE;
			this.CO_CODECOMMUNE = clsCtsinistre.CO_CODECOMMUNE;
			this.SI_ADRESSEGEOGRPHIQUESINISTRE = clsCtsinistre.SI_ADRESSEGEOGRPHIQUESINISTRE;
			this.SI_DESCRIPTIONSINISTRE = clsCtsinistre.SI_DESCRIPTIONSINISTRE;
			this.SI_DATETRANSMISSIONSINISTRE = clsCtsinistre.SI_DATETRANSMISSIONSINISTRE;
			this.SI_DATEVALIDATIONSINISTRE = clsCtsinistre.SI_DATEVALIDATIONSINISTRE;
			this.SI_DATESUSPENSIONSINISTRE = clsCtsinistre.SI_DATESUSPENSIONSINISTRE;
			this.SI_DATECLOTURESINISTRE = clsCtsinistre.SI_DATECLOTURESINISTRE;
			this.OP_CODEOPERATEUR = clsCtsinistre.OP_CODEOPERATEUR;
			this.SI_DOCUMENTTRANSMIS = clsCtsinistre.SI_DOCUMENTTRANSMIS;
			this.SI_MONTANTPREJUDICE = clsCtsinistre.SI_MONTANTPREJUDICE;
			this.EP_CODEEXPERTNOMME = clsCtsinistre.EP_CODEEXPERTNOMME;
			this.SI_DATEEXPERTNOMMESINISTRE = clsCtsinistre.SI_DATEEXPERTNOMMESINISTRE;
			this.CA_NUMPOLICE = clsCtsinistre.CA_NUMPOLICE;
			this.TI_NUMTIERS = clsCtsinistre.TI_NUMTIERS;
			this.TI_DENOMINATION = clsCtsinistre.TI_DENOMINATION;
			this.SI_NOMBRECONTRAT = clsCtsinistre.SI_NOMBRECONTRAT;
			this.MS_NUMPIECE = clsCtsinistre.MS_NUMPIECE;
			this.NO_CODENATUREOPERATION = clsCtsinistre.NO_CODENATUREOPERATION;
			this.DATEJOURNEE = clsCtsinistre.DATEJOURNEE;

            this.TI_TELEPHONE = clsCtsinistre.TI_TELEPHONE = "";
            this.TI_ADRESSEPOSTALE = clsCtsinistre.TI_ADRESSEPOSTALE = "";
            this.TI_ADRESSEGEOGRAPHIQUE = clsCtsinistre.TI_ADRESSEGEOGRAPHIQUE = "";
            this.TP_LIBELLE = clsCtsinistre.TP_LIBELLE = "";
            this.SOLDEPRECEDENT = clsCtsinistre.SOLDEPRECEDENT = "";
            this.MONTANTFACTUREINITIAL = clsCtsinistre.MONTANTFACTUREINITIAL = "";
            this.MONTANTVERSE = clsCtsinistre.MONTANTVERSE = "";
            this.MV_SOLDEFINAL = clsCtsinistre.MV_SOLDEFINAL = "";
            this.MV_DATEPIECE = clsCtsinistre.MV_DATEPIECE = "";
            this.NUMEROBORDEREAU = clsCtsinistre.NUMEROBORDEREAU = "";
            this.MV_REFERENCEPIECE = clsCtsinistre.MV_REFERENCEPIECE = "";
            this.MV_LIBELLEOPERATION = clsCtsinistre.MV_LIBELLEOPERATION = "";
            this.MV_MONTANTDEBIT = clsCtsinistre.MV_MONTANTDEBIT = "";
            this.MV_MONTANTCREDIT = clsCtsinistre.MV_MONTANTCREDIT = "";
            this.MV_SOLDE = clsCtsinistre.MV_SOLDE = "";
            this.VL_LIBELLE = clsCtsinistre.VL_LIBELLE = "";
            this.PY_LIBELLE = clsCtsinistre.PY_LIBELLE = "";
            this.CO_LIBELLE = clsCtsinistre.CO_LIBELLE = "";
           this.NS_LIBELLENATURESINISTRE = clsCtsinistre.NS_LIBELLENATURESINISTRE = "";
           this.PY_CODEPAYS = clsCtsinistre.PY_CODEPAYS = "";
           this.VL_CODEVILLE = clsCtsinistre.VL_CODEVILLE = "";

            this.SI_MONTANTPREJUDICEVALIDER = clsCtsinistre.SI_MONTANTPREJUDICEVALIDER;
            this.OP_CODEOPERATEURSAISIEMONTANTVALIDER = clsCtsinistre.OP_CODEOPERATEURSAISIEMONTANTVALIDER;
            this.SI_DATESAISIEMONTANTVALIDER = clsCtsinistre.SI_DATESAISIEMONTANTVALIDER;
            this.SI_MONTANTPREJUDICENF = clsCtsinistre.SI_MONTANTPREJUDICENF;
            this.SI_MONTANTPREJUDICEVALIDERNF = clsCtsinistre.SI_MONTANTPREJUDICEVALIDERNF;
            this.LO_CODELOGICIEL = clsCtsinistre.LO_CODELOGICIEL;
            this.RQ_LIBELLERISQUE = clsCtsinistre.RQ_LIBELLERISQUE;
            this.RQ_CODERISQUE = clsCtsinistre.RQ_CODERISQUE;
           this.CB_LIBELLEBRANCHE = clsCtsinistre.CB_LIBELLEBRANCHE;
           this.CA_DATEEFFET = clsCtsinistre.CA_DATEEFFET;
           this.CA_DATEECHEANCE = clsCtsinistre.CA_DATEECHEANCE;
           this.REMISE = clsCtsinistre.REMISE;

            this.SI_TELEPHONECONDUCTEURSINISTRE = clsCtsinistre.SI_TELEPHONECONDUCTEURSINISTRE;
            this.SI_NUMWHATSAPPCONDUCTEURSINISTRE = clsCtsinistre.SI_NUMWHATSAPPCONDUCTEURSINISTRE;
            this.SI_DATENAISSANCECONDUCTEURSINISTRE = clsCtsinistre.SI_DATENAISSANCECONDUCTEURSINISTRE;
            this.SI_NUMPERMISCONDUCTEURSINISTRE = clsCtsinistre.SI_NUMPERMISCONDUCTEURSINISTRE;
            this.SI_DATEDELIVRANCEPERMISCONDUCTEURSINISTRE = clsCtsinistre.SI_DATEDELIVRANCEPERMISCONDUCTEURSINISTRE;
            this.SI_DATEVALIDITEPERMISCONDUCTEURSINISTRE = clsCtsinistre.SI_DATEVALIDITEPERMISCONDUCTEURSINISTRE;
            this.SI_IMMATRICULATIONVEHICULE = clsCtsinistre.SI_IMMATRICULATIONVEHICULE;
            this.SI_MARQUEVEHICULE = clsCtsinistre.SI_MARQUEVEHICULE;
            this.SI_NOMETCONTACTSVICTIMES = clsCtsinistre.SI_NOMETCONTACTSVICTIMES;
            this.SI_AILEARRIEREDROIT = clsCtsinistre.SI_AILEARRIEREDROIT;
            this.SI_AILEARRIEREGAUCHE = clsCtsinistre.SI_AILEARRIEREGAUCHE;
            this.SI_PARCHOCAVANT = clsCtsinistre.SI_PARCHOCAVANT;
            this.SI_PARCHOCARRIERE = clsCtsinistre.SI_PARCHOCARRIERE;
            this.SI_LATERALGAUCHE = clsCtsinistre.SI_LATERALGAUCHE;
            this.SI_LATERALDROIT = clsCtsinistre.SI_LATERALDROIT;
            this.SI_CAPOTMOTEUR = clsCtsinistre.SI_CAPOTMOTEUR;
            this.SI_AUTRES = clsCtsinistre.SI_AUTRES;
            this.SI_REPARATEUR = clsCtsinistre.SI_REPARATEUR;
            this.SI_NOMBREBLESSESVEHICULEASSURE = clsCtsinistre.SI_NOMBREBLESSESVEHICULEASSURE;
            this.SI_NOMBREDECESVEHICULEASSURE = clsCtsinistre.SI_NOMBREDECESVEHICULEASSURE;
            this.SI_NOMBREBLESSESVEHICULETIERS = clsCtsinistre.SI_NOMBREBLESSESVEHICULETIERS;
            this.SI_NOMBREDECESVEHICULETIERS = clsCtsinistre.SI_NOMBREDECESVEHICULETIERS;
            this.SI_PVCONSTATPOLICE = clsCtsinistre.SI_PVCONSTATPOLICE;
            this.SI_PVGENDARMERIE = clsCtsinistre.SI_PVGENDARMERIE;
            this.SI_PVAMIABLE = clsCtsinistre.SI_PVAMIABLE;
            this.SI_UNITE = clsCtsinistre.SI_UNITE;
            this.SI_NOMAGENT = clsCtsinistre.SI_NOMAGENT;
            this.SI_TELPHONEAGENT = clsCtsinistre.SI_TELPHONEAGENT;
            this.SI_HUSSIER = clsCtsinistre.SI_HUSSIER;
            this.SI_MONTANTPREJUDICEREMBOURSE = clsCtsinistre.SI_MONTANTPREJUDICEREMBOURSE;
            this.SI_SOLDE = clsCtsinistre.SI_SOLDE;




        //private string _RQ_CODERISQUE = "";
        //private string _CB_LIBELLEBRANCHE = "";
        //private string _CA_DATEEFFET = "";
        //private string _CA_DATEECHEANCE = "";

    }

        #endregion

    }
}
