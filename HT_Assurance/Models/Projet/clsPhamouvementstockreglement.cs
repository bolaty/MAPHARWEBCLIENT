using System;
using System.Collections.Generic;
using System.Linq;
using System.Data;
using Stock.Common;

namespace HT_Assurance
{
	public class clsPhamouvementstockreglement : clsEntitieBase
    {
		#region VARIABLES LOCALES
        //private List<clsMouvementcomptableanalytique> _MOUVEMENTCOMPTABLEANALYTIQUE;
		private string _MV_NUMPIECE = "";
		private string _AG_CODEAGENCE = "";
        private string _EN_CODEENTREPOT = "";
		private string _MR_CODEMODEREGLEMENT = "";
		private string _MS_NUMPIECE = "";
        private string _MV_ANNULATIONPIECE = "N";
        private double _MV_MONTANTDEBIT = 0;
		private double _MV_MONTANTCREDIT = 0;
        private double _RESTEMONTANTFACTURE = 0;
        private double _MONTANTREMISE = 0;
        private double _MONTANTTVA = 0;
        private double _MONTANTAIRSI = 0;
        private double _MONTANTFACTURE = 0;
        private double _MONTANTIMPAYER = 0;
        private double _MONTANTTRANSPORT = 0;
        private double _MONTANTFACTURETTC = 0;
        private double _MONTANTASSUREUR = 0;
        private double _MONTANTVERSEMENT = 0;

		private string _MV_DATEPIECE = "01/01/1900";
        private string _NO_CODENATUREOPERATION = "";
        private string _MV_LIBELLEOPERATION = "";
        private string _MV_REFERENCEPIECE = "";
        private string _MV_NOMTIERS = "";
        private string _MV_DATESAISIE ="01/01/1900";
        private string _CH_DATEDEBUTCOUVERTURE = "01/01/1900";
        private string _CH_DATEFINCOUVERTURE = "01/01/1900";
        private string _MV_NUMPIECE1 = "";
       // private string _TYPEOPERATION = "0";
        private string _CL_NUMCLIENT = "";
        private string _FR_MATRICULE = "";

        private string _PL_NUMCOMPTE = "";
        private string _PL_NUMCOMPTEBANQUE = "";

        private string _MV_NUMEROPIECE = "";
        private string _MV_NUMSEQUENCE = "";
        private string _OP_CODEOPERATEUR = "";
        private string _MS_UTILISERSUPLUS = "0";
        private String _FB_IDFOURNISSEUR = "";
        private String _TI_IDTIERS = "";
        private string _TI_NUMTIERS = "";
        private string _JO_CODEJOURNAL= "0";
        private string _NO_SENS = "";
        private string _MV_MTSURPLUS = "N";
        private string _MS_NUMPIECEANNULER= "";
        private string _TO_CODEOPERATION = "";
        private string _TA_CODETYPEARTICLE = "";
        private string _NA_CODENATUREOPERATION = "";
        private string _MV_REGLEMENTGROUPE= "N";
        private string _IM_DUREE = "0";
        private string _SO_CODESOCIETE = "";
        private string _TS_CODETYPESCHEMACOMPTABLE = "";
        private string _TI_IDTIERSIMMOBILISATION = "";
        private string _LT_CODELETTRAGE = "0";

        private double _RESTEAREGLERCOMMISSION = 0;
        private double _MONTANTREGLERCOMMISSION = 0;
        private double _MONTANTAREGLERCOMMISSION = 0;
        private double _SR_MONTANTCREDIT = 0;
        private double _RESTEAREGLERASSUREUR = 0;
        private double _MONTANTREGLERASSUREUR = 0;
        //private string _SR_MONTANTCREDIT = "0";
        private double _MONTANTAREGLERASSUREUR = 0;
        private double _MONTANTAREGLER = 0;
        private double _MONTANTREGLER = 0;



            private string _CO_IDCOMMERCIAL = "";
            private string _CO_NUMCOMMERCIAL = "";
            private string _CO_NOMPRENOM = "";
            private string _CO_ADRESSEPOSTALE = "";
            private string _CO_ADRESSEGEOGRAPHIQUE = "";
            private string _CO_TELEPHONE = "";
            private string _CO_EMAIL = "";
            private string _CO_TAUXCOMMISSION = "";
            private string _CO_MONTANTCOMMISSION = "0";
            private string _MC_NUMPIECE = "";
            //private string _AG_CODEAGENCE = "";
            //private string _NO_CODENATUREOPERATION = "";
            //private string _MS_NUMPIECE = "";
            private string _MC_MONTANTDEBIT = "0";
            private string _MC_MONTANTCREDIT = "";
            private double _RESTEAREGLER = 0;
            //private string _SR_MONTANTCREDIT = "";
            private string _MC_DATEPIECE = "";
            private string _MC_REFERENCEPIECE = "";
            private string _MC_LIBELLEOPERATION = "";
            private string _MC_NOMTIERS = "";
            private string _MC_NUMEROPIECE = "";
            private string _MC_NUMSEQUENCE = "";
            private string _NUMEROBORDEREAU = "";
            private string _MC_SOLDEFINAL = "0";
            private string _MONTANTTOTALCOMMISSION = "0";
            private string _MONTANTCOMMISSIONREGLE = "0";
            private string _MC_SOLDE = "0";
            private string _SOLDEFINAL = "0";
            private string _NUMEROBORDEREAUREGLEMENT = "";
            private string _PL_NUMCOMPTEGENERAL = "";
            private string _NC_CODENATURECOMPTE = "";
            private string _PL_NUMCOMPTE1 = "";
            private string _PL_NUMCOMPTE2 = "";
            private string _SL_RESULTATAPI = "";
            private string _SL_TELEPHONE = "";
            private string _SL_URLNOTIFICATION = "";
            private string _SO_CODESOUSCRIPTION = "";
            private string _OB_NOMOBJET = "";
            private string _SL_INDICATIF = "";
            private string _SL_MESSAGEAPI = "";
            private string _SL_MESSAGECLIENT = "";
            private string _SL_MONTANTOPERATION = "";
            private string _SL_NUMEROTRANSACTION = "";
            private string _TO_VALIDEROPERATIONENCOURS = "N";
            private string _DT_NUMEROTRANSACTION = "";


            private string _RC_LIBELLE = "";
            private string _BORDEREAUVERSEMENT = "";
            private string _BORDEREAUFACTURE = "";
            private string _MS_DATEPIECE = "";
            private string _NO_CODENATUREOPERATION1 = "";
            private string _CL_DENOMINATION = "";
            private string _TI_TELEPHONE = "";
            private string _OP_NOMPRENOM = "";
            private string _MR_LIBELLE = "";
            private string _CA_NUMPOLICE = "";
            private string _RQ_CODERISQUE = "";
            private string _RQ_LIBELLERISQUE = "";
            private string _CB_LIBELLEBRANCHE = "";
            private string _CA_DATEEFFET = "";
            private string _CA_DATEECHEANCE = "";
            private double _TOTALSR_MONTANTCREDIT = 0;
            private string _MV_NUMBORDEREAU ="";

        private List<HT_Assurance.clsPhamouvementstockreglementcheque> _clsPhamouvementstockreglementcheques = null;
        private List<HT_Stock.BOJ.clsCtcontratchequephotoreglementcaisse> _clsCtcontratchequephotoreglementcaisses = null;
        private HT_Assurance.clsCtcontratchequereglementcaisse _clsCtcontratchequereglementcaisse = null;
        //, clsPhamouvementstockreglementcheques,  clsCtcontratchequereglementcaisse,  clsCtcontratchequephotoreglementcaisses

        //private string _MV_ABREVIATION= "";
        #endregion

        #region ACCESSEURS

        public string MV_NUMPIECE
		{
			get { return _MV_NUMPIECE; }
			set {  _MV_NUMPIECE = value; }
		}

		public string AG_CODEAGENCE
		{
			get { return _AG_CODEAGENCE; }
			set {  _AG_CODEAGENCE = value; }
		}
        public string EN_CODEENTREPOT
		{
            get { return _EN_CODEENTREPOT; }
            set { _EN_CODEENTREPOT = value; }
		}


		public string MR_CODEMODEREGLEMENT
		{
			get { return _MR_CODEMODEREGLEMENT; }
			set {  _MR_CODEMODEREGLEMENT = value; }
		}

		public string MS_NUMPIECE
		{
			get { return _MS_NUMPIECE; }
			set {  _MS_NUMPIECE = value; }
		}

        public string MV_ANNULATIONPIECE
		{
            get { return _MV_ANNULATIONPIECE; }
            set { _MV_ANNULATIONPIECE = value; }
		}

		public double MV_MONTANTDEBIT
		{
			get { return _MV_MONTANTDEBIT; }
			set {  _MV_MONTANTDEBIT = value; }
		}

		public double MV_MONTANTCREDIT
		{
			get { return _MV_MONTANTCREDIT; }
			set {  _MV_MONTANTCREDIT = value; }
		}
        public double RESTEMONTANTFACTURE
		{
            get { return _RESTEMONTANTFACTURE; }
            set { _RESTEMONTANTFACTURE = value; }
		}


        public double MONTANTFACTURE
        {
            get { return _MONTANTFACTURE; }
            set { _MONTANTFACTURE = value; }
        }

        public double MONTANTTVA
        {
            get { return _MONTANTTVA; }
            set { _MONTANTTVA = value; }
        }
        public double MONTANTAIRSI
        {
            get { return _MONTANTAIRSI; }
            set { _MONTANTAIRSI = value; }
        }
        public double MONTANTREMISE
        {
            get { return _MONTANTREMISE; }
            set { _MONTANTREMISE = value; }
        }

        public double MONTANTIMPAYER
        {
            get { return _MONTANTIMPAYER; }
            set { _MONTANTIMPAYER = value; }
        }
        public double MONTANTTRANSPORT 
        {
            get { return _MONTANTTRANSPORT; }
            set { _MONTANTTRANSPORT = value; }
        }
        public double MONTANTFACTURETTC 
        {
            get { return _MONTANTFACTURETTC; }
            set { _MONTANTFACTURETTC = value; }
        }

        public double MONTANTASSUREUR
        {
            get { return _MONTANTASSUREUR; }
            set { _MONTANTASSUREUR = value; }
        }

        public double MONTANTVERSEMENT
        {
            get { return _MONTANTVERSEMENT; }
            set { _MONTANTVERSEMENT = value; }
        }










		public string MV_DATEPIECE
		{
			get { return _MV_DATEPIECE; }
			set {  _MV_DATEPIECE = value; }
		}

        public string NO_CODENATUREOPERATION
		{
            get { return _NO_CODENATUREOPERATION; }
            set { _NO_CODENATUREOPERATION = value; }
		}

        public string MV_LIBELLEOPERATION
		{
            get { return _MV_LIBELLEOPERATION; }
            set { _MV_LIBELLEOPERATION = value; }
		}
        public string MV_REFERENCEPIECE
		{
            get { return _MV_REFERENCEPIECE; }
            set { _MV_REFERENCEPIECE = value; }
		}

        public string MV_NOMTIERS
		{
            get { return _MV_NOMTIERS; }
            set { _MV_NOMTIERS = value; }
		}


        //public string TYPEOPERATION
        //{
        //    get { return _TYPEOPERATION; }
        //    set { _TYPEOPERATION = value; }
        //}

        public string MV_DATESAISIE
		{
            get { return _MV_DATESAISIE; }
            set { _MV_DATESAISIE = value; }
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



        public string MV_NUMPIECE1
        {
            get { return _MV_NUMPIECE1; }
            set { _MV_NUMPIECE1 = value; }
        }

        public string CL_NUMCLIENT
        {
            get { return _CL_NUMCLIENT; }
            set { _CL_NUMCLIENT = value; }
        }

        public string FR_MATRICULE
        {
            get { return _FR_MATRICULE; }
            set { _FR_MATRICULE = value; }
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
        public string MV_NUMEROPIECE
        {
            get { return _MV_NUMEROPIECE; }
            set { _MV_NUMEROPIECE = value; }
        }

        public string MV_NUMSEQUENCE
        {
            get { return _MV_NUMSEQUENCE; }
            set { _MV_NUMSEQUENCE = value; }
        }
        public string OP_CODEOPERATEUR
        {
            get { return _OP_CODEOPERATEUR; }
            set { _OP_CODEOPERATEUR = value; }
        }
        public string MS_UTILISERSUPLUS
        {
            get { return _MS_UTILISERSUPLUS; }
            set { _MS_UTILISERSUPLUS = value; }
        }

        public string FB_IDFOURNISSEUR
        {
            get { return _FB_IDFOURNISSEUR; }
            set { _FB_IDFOURNISSEUR = value; }
        }
        public string TI_IDTIERS
    {
        get { return _TI_IDTIERS; }
        set { _TI_IDTIERS = value; }
    }

    public string TI_NUMTIERS
    {
        get { return _TI_NUMTIERS; }
        set { _TI_NUMTIERS = value; }
    }
        public string JO_CODEJOURNAL
    {
        get { return _JO_CODEJOURNAL; }
        set { _JO_CODEJOURNAL = value; }
    }

        public string NO_SENS
    {
        get { return _NO_SENS; }
        set { _NO_SENS = value; }
    }

        public string MV_MTSURPLUS
    {
        get { return _MV_MTSURPLUS; }
        set { _MV_MTSURPLUS = value; }
    }
        public string MS_NUMPIECEANNULER
    {
        get { return _MS_NUMPIECEANNULER; }
        set { _MS_NUMPIECEANNULER = value; }
    }

        public string TO_CODEOPERATION
    {
        get { return _TO_CODEOPERATION; }
        set { _TO_CODEOPERATION = value; }
    }
        public string TA_CODETYPEARTICLE
    {
        get { return _TA_CODETYPEARTICLE; }
        set { _TA_CODETYPEARTICLE = value; }
    }

        public string NA_CODENATUREOPERATION
    {
        get { return _NA_CODENATUREOPERATION; }
        set { _NA_CODENATUREOPERATION = value; }
    }

        public string MV_REGLEMENTGROUPE
        {
            get { return _MV_REGLEMENTGROUPE; }
            set { _MV_REGLEMENTGROUPE = value; }
        }


        public string IM_DUREE
        {
            get { return _IM_DUREE; }
            set { _IM_DUREE = value; }
        }

        public string SO_CODESOCIETE
        {
            get { return _SO_CODESOCIETE; }
            set { _SO_CODESOCIETE = value; }
        }

        public string TS_CODETYPESCHEMACOMPTABLE
        {
            get { return _TS_CODETYPESCHEMACOMPTABLE; }
            set { _TS_CODETYPESCHEMACOMPTABLE = value; }
        }

        public string PL_NUMCOMPTEGENERAL
        {
            get { return _PL_NUMCOMPTEGENERAL; }
            set { _PL_NUMCOMPTEGENERAL = value; }
        }

       /* public List<clsMouvementcomptableanalytique> MOUVEMENTCOMPTABLEANALYTIQUE
        {
            get { return _MOUVEMENTCOMPTABLEANALYTIQUE; }
            set { _MOUVEMENTCOMPTABLEANALYTIQUE = value; }
        }*/

        public string TI_IDTIERSIMMOBILISATION
        {
            get { return _TI_IDTIERSIMMOBILISATION; }
            set { _TI_IDTIERSIMMOBILISATION = value; }
        }

        public string LT_CODELETTRAGE
        {
            get { return _LT_CODELETTRAGE; }
            set { _LT_CODELETTRAGE = value; }
        }
        public double RESTEAREGLERCOMMISSION
        {
            get { return _RESTEAREGLERCOMMISSION; }
            set { _RESTEAREGLERCOMMISSION = value; }
        }
        public double MONTANTREGLERCOMMISSION
        {
            get { return _MONTANTREGLERCOMMISSION; }
            set { _MONTANTREGLERCOMMISSION = value; }
        }
        public double MONTANTAREGLERCOMMISSION
        {
            get { return _MONTANTAREGLERCOMMISSION; }
            set { _MONTANTAREGLERCOMMISSION = value; }
        }
        public double SR_MONTANTCREDIT
        {
            get { return _SR_MONTANTCREDIT; }
            set { _SR_MONTANTCREDIT = value; }
        }
        public double RESTEAREGLERASSUREUR
        {
            get { return _RESTEAREGLERASSUREUR; }
            set { _RESTEAREGLERASSUREUR = value; }
        }
        public double MONTANTREGLERASSUREUR
        {
            get { return _MONTANTREGLERASSUREUR; }
            set { _MONTANTREGLERASSUREUR = value; }
        }
        public double MONTANTAREGLERASSUREUR
        {
            get { return _MONTANTAREGLERASSUREUR; }
            set { _MONTANTAREGLERASSUREUR = value; }
        }
        public string CO_IDCOMMERCIAL
        {
            get { return _CO_IDCOMMERCIAL; }
            set { _CO_IDCOMMERCIAL = value; }
        }
        public string CO_NUMCOMMERCIAL
        {
            get { return _CO_NUMCOMMERCIAL; }
            set { _CO_NUMCOMMERCIAL = value; }
        }
        public string CO_NOMPRENOM
        {
            get { return _CO_NOMPRENOM; }
            set { _CO_NOMPRENOM = value; }
        }
        public string CO_ADRESSEPOSTALE
        {
            get { return _CO_ADRESSEPOSTALE; }
            set { _CO_ADRESSEPOSTALE = value; }
        }
        public string CO_ADRESSEGEOGRAPHIQUE
        {
            get { return _CO_ADRESSEGEOGRAPHIQUE; }
            set { _CO_ADRESSEGEOGRAPHIQUE = value; }
        }
        public string CO_TELEPHONE
        {
            get { return _CO_TELEPHONE; }
            set { _CO_TELEPHONE = value; }
        }
        public string CO_EMAIL
        {
            get { return _CO_EMAIL; }
            set { _CO_EMAIL = value; }
        }
        public string CO_TAUXCOMMISSION
        {
            get { return _CO_TAUXCOMMISSION; }
            set { _CO_TAUXCOMMISSION = value; }
        }
        public string CO_MONTANTCOMMISSION
        {
            get { return _CO_MONTANTCOMMISSION; }
            set { _CO_MONTANTCOMMISSION = value; }
        }
        public string MC_NUMPIECE
        {
            get { return _MC_NUMPIECE; }
            set { _MC_NUMPIECE = value; }
        }
        public string MC_MONTANTDEBIT
        {
            get { return _MC_MONTANTDEBIT; }
            set { _MC_MONTANTDEBIT = value; }
        }
        public string MC_MONTANTCREDIT
        {
            get { return _MC_MONTANTCREDIT; }
            set { _MC_MONTANTCREDIT = value; }
        }
        public double RESTEAREGLER
        {
            get { return _RESTEAREGLER; }
            set { _RESTEAREGLER = value; }
        }
        public string MC_DATEPIECE
        {
            get { return _MC_DATEPIECE; }
            set { _MC_DATEPIECE = value; }
        }
        public string MC_REFERENCEPIECE
        {
            get { return _MC_REFERENCEPIECE; }
            set { _MC_REFERENCEPIECE = value; }
        }
        public string MC_LIBELLEOPERATION
        {
            get { return _MC_LIBELLEOPERATION; }
            set { _MC_LIBELLEOPERATION = value; }
        }
        public string MC_NOMTIERS
        {
            get { return _MC_NOMTIERS; }
            set { _MC_NOMTIERS = value; }
        }
        public string MC_NUMEROPIECE
        {
            get { return _MC_NUMEROPIECE; }
            set { _MC_NUMEROPIECE = value; }
        }
        public string MC_NUMSEQUENCE
        {
            get { return _MC_NUMSEQUENCE; }
            set { _MC_NUMSEQUENCE = value; }
        }
        public string NUMEROBORDEREAU
        {
            get { return _NUMEROBORDEREAU; }
            set { _NUMEROBORDEREAU = value; }
        }
        public string MC_SOLDEFINAL
        {
            get { return _MC_SOLDEFINAL; }
            set { _MC_SOLDEFINAL = value; }
        }
        public string MONTANTTOTALCOMMISSION
        {
            get { return _MONTANTTOTALCOMMISSION; }
            set { _MONTANTTOTALCOMMISSION = value; }
        }
        public string MONTANTCOMMISSIONREGLE
        {
            get { return _MONTANTCOMMISSIONREGLE; }
            set { _MONTANTCOMMISSIONREGLE = value; }
        }
        public string MC_SOLDE
        {
            get { return _MC_SOLDE; }
            set { _MC_SOLDE = value; }
        }

        public string SOLDEFINAL
        {
            get { return _SOLDEFINAL; }
            set { _SOLDEFINAL = value; }
        }
        public double MONTANTAREGLER
        {
            get { return _MONTANTAREGLER; }
            set { _MONTANTAREGLER = value; }
        }
        public double MONTANTREGLER
        {
            get { return _MONTANTREGLER; }
            set { _MONTANTREGLER = value; }
        }
        public string NUMEROBORDEREAUREGLEMENT
        {
            get { return _NUMEROBORDEREAUREGLEMENT; }
            set { _NUMEROBORDEREAUREGLEMENT = value; }
        }

        public string NC_CODENATURECOMPTE
        {
            get { return _NC_CODENATURECOMPTE; }
            set { _NC_CODENATURECOMPTE = value; }
        }

        public string PL_NUMCOMPTE1
        {
            get { return _PL_NUMCOMPTE1; }
            set { _PL_NUMCOMPTE1 = value; }
        }

        public string PL_NUMCOMPTE2
        {
            get { return _PL_NUMCOMPTE2; }
            set { _PL_NUMCOMPTE2 = value; }
        }
        public string SO_CODESOUSCRIPTION
        {
            get { return _SO_CODESOUSCRIPTION; }
            set { _SO_CODESOUSCRIPTION = value; }
        }
        public string SL_TELEPHONE
        {
            get { return _SL_TELEPHONE; }
            set { _SL_TELEPHONE = value; }
        }
        public string SL_URLNOTIFICATION
        {
            get { return _SL_URLNOTIFICATION; }
            set { _SL_URLNOTIFICATION = value; }
        }
        public string OB_NOMOBJET
        {
            get { return _OB_NOMOBJET; }
            set { _OB_NOMOBJET = value; }
        }
        public string SL_INDICATIF
        {
            get { return _SL_INDICATIF; }
            set { _SL_INDICATIF = value; }
        }
        public string SL_MESSAGEAPI
        {
            get { return _SL_MESSAGEAPI; }
            set { _SL_MESSAGEAPI = value; }
        }
        public string SL_MESSAGECLIENT
        {
            get { return _SL_MESSAGECLIENT; }
            set { _SL_MESSAGECLIENT = value; }
        }
        public string SL_MONTANTOPERATION
        {
            get { return _SL_MONTANTOPERATION; }
            set { _SL_MONTANTOPERATION = value; }
        }
        public string SL_NUMEROTRANSACTION
        {
            get { return _SL_NUMEROTRANSACTION; }
            set { _SL_NUMEROTRANSACTION = value; }
        }
        public string TO_VALIDEROPERATIONENCOURS
        {
            get { return _TO_VALIDEROPERATIONENCOURS; }
            set { _TO_VALIDEROPERATIONENCOURS = value; }
        }
        public string DT_NUMEROTRANSACTION
        {
            get { return _DT_NUMEROTRANSACTION; }
            set { _DT_NUMEROTRANSACTION = value; }
        }
        public string RC_LIBELLE
        {
            get { return _RC_LIBELLE; }
            set { _RC_LIBELLE = value; }
        }
        public string BORDEREAUVERSEMENT
        {
            get { return _BORDEREAUVERSEMENT; }
            set { _BORDEREAUVERSEMENT = value; }
        }
        public string BORDEREAUFACTURE
        {
            get { return _BORDEREAUFACTURE; }
            set { _BORDEREAUFACTURE = value; }
        }
        public string MS_DATEPIECE
        {
            get { return _MS_DATEPIECE; }
            set { _MS_DATEPIECE = value; }
        }
        public string NO_CODENATUREOPERATION1
        {
            get { return _NO_CODENATUREOPERATION1; }
            set { _NO_CODENATUREOPERATION1 = value; }
        }
        public string CL_DENOMINATION
        {
            get { return _CL_DENOMINATION; }
            set { _CL_DENOMINATION = value; }
        }
        public string TI_TELEPHONE
        {
            get { return _TI_TELEPHONE; }
            set { _TI_TELEPHONE = value; }
        }
        public string OP_NOMPRENOM
        {
            get { return _OP_NOMPRENOM; }
            set { _OP_NOMPRENOM = value; }
        }
        public string MR_LIBELLE
        {
            get { return _MR_LIBELLE; }
            set { _MR_LIBELLE = value; }
        }
        public string CA_NUMPOLICE
        {
            get { return _CA_NUMPOLICE; }
            set { _CA_NUMPOLICE = value; }
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
        public double TOTALSR_MONTANTCREDIT
        {
            get { return _TOTALSR_MONTANTCREDIT; }
            set { _TOTALSR_MONTANTCREDIT = value; }
        }
        public string MV_NUMBORDEREAU
        {
            get { return _MV_NUMBORDEREAU; }
            set { _MV_NUMBORDEREAU = value; }
        }
        





        public List<HT_Assurance.clsPhamouvementstockreglementcheque> clsPhamouvementstockreglementcheques
        {
            get { return _clsPhamouvementstockreglementcheques; }
            set { _clsPhamouvementstockreglementcheques = value; }
        }
        public List<HT_Stock.BOJ.clsCtcontratchequephotoreglementcaisse> clsCtcontratchequephotoreglementcaisses
        {
            get { return _clsCtcontratchequephotoreglementcaisses; }
            set { _clsCtcontratchequephotoreglementcaisses = value; }
        }
        public HT_Assurance.clsCtcontratchequereglementcaisse clsCtcontratchequereglementcaisse
        {
            get { return _clsCtcontratchequereglementcaisse; }
            set { _clsCtcontratchequereglementcaisse = value; }
        }


        #endregion

        #region INSTANCIATEURS

        public clsPhamouvementstockreglement(){}
		public clsPhamouvementstockreglement(clsPhamouvementstockreglement clsPhamouvementstockreglement)
		{

             //   this.MOUVEMENTCOMPTABLEANALYTIQUE = clsPhamouvementstockreglement.MOUVEMENTCOMPTABLEANALYTIQUE;
                this.MV_NUMPIECE = clsPhamouvementstockreglement.MV_NUMPIECE;
                this.AG_CODEAGENCE = clsPhamouvementstockreglement.AG_CODEAGENCE;
                this.EN_CODEENTREPOT = clsPhamouvementstockreglement.EN_CODEENTREPOT;
                this.MR_CODEMODEREGLEMENT = clsPhamouvementstockreglement.MR_CODEMODEREGLEMENT;
                this.MS_NUMPIECE = clsPhamouvementstockreglement.MS_NUMPIECE;
                this.MV_MONTANTDEBIT = clsPhamouvementstockreglement.MV_MONTANTDEBIT;
                this.MV_MONTANTCREDIT = clsPhamouvementstockreglement.MV_MONTANTCREDIT;
                this.RESTEMONTANTFACTURE = clsPhamouvementstockreglement.RESTEMONTANTFACTURE;
                this.MONTANTFACTURE = clsPhamouvementstockreglement.MONTANTFACTURE;
                this.MONTANTTVA = clsPhamouvementstockreglement.MONTANTTVA;
                this.MONTANTAIRSI = clsPhamouvementstockreglement.MONTANTAIRSI;

                this.MONTANTREMISE = clsPhamouvementstockreglement.MONTANTREMISE;
                this.MONTANTIMPAYER = clsPhamouvementstockreglement.MONTANTIMPAYER;
                this.MONTANTTRANSPORT = clsPhamouvementstockreglement.MONTANTTRANSPORT;
                this.MONTANTFACTURETTC = clsPhamouvementstockreglement.MONTANTFACTURETTC;
                this.MONTANTASSUREUR = clsPhamouvementstockreglement.MONTANTASSUREUR;

                this.MONTANTVERSEMENT = clsPhamouvementstockreglement.MONTANTVERSEMENT;
                this.MV_DATEPIECE = clsPhamouvementstockreglement.MV_DATEPIECE;
                this.MV_ANNULATIONPIECE = clsPhamouvementstockreglement.MV_ANNULATIONPIECE;
                this.NO_CODENATUREOPERATION = clsPhamouvementstockreglement.NO_CODENATUREOPERATION;

                this.MV_LIBELLEOPERATION = clsPhamouvementstockreglement.MV_LIBELLEOPERATION;
                this.MV_REFERENCEPIECE = clsPhamouvementstockreglement.MV_REFERENCEPIECE;
                this.MV_NOMTIERS = clsPhamouvementstockreglement.MV_NOMTIERS;
                this.MV_DATESAISIE = clsPhamouvementstockreglement.MV_DATESAISIE;
                this.MV_NUMPIECE1 = clsPhamouvementstockreglement.MV_NUMPIECE1;

                this.CL_NUMCLIENT = clsPhamouvementstockreglement.CL_NUMCLIENT;
                this.FR_MATRICULE = clsPhamouvementstockreglement.FR_MATRICULE;
                this.PL_NUMCOMPTE = clsPhamouvementstockreglement.PL_NUMCOMPTE;
                this.PL_NUMCOMPTEBANQUE = clsPhamouvementstockreglement.PL_NUMCOMPTEBANQUE;
                this.MV_NUMEROPIECE = clsPhamouvementstockreglement.MV_NUMEROPIECE;
                this.MV_NUMSEQUENCE = clsPhamouvementstockreglement.MV_NUMSEQUENCE;
                this.OP_CODEOPERATEUR = clsPhamouvementstockreglement.OP_CODEOPERATEUR;

                this.MS_UTILISERSUPLUS = clsPhamouvementstockreglement.MS_UTILISERSUPLUS;
                this.FB_IDFOURNISSEUR = clsPhamouvementstockreglement.FB_IDFOURNISSEUR;
                this.TI_IDTIERS = clsPhamouvementstockreglement.TI_IDTIERS;
                this.TI_NUMTIERS = clsPhamouvementstockreglement.TI_NUMTIERS;
                this.JO_CODEJOURNAL = clsPhamouvementstockreglement.JO_CODEJOURNAL;
                this.NO_SENS = clsPhamouvementstockreglement.NO_SENS;
                this.MV_MTSURPLUS = clsPhamouvementstockreglement.MV_MTSURPLUS;
                this.MS_NUMPIECEANNULER = clsPhamouvementstockreglement.MS_NUMPIECEANNULER;
                this.TO_CODEOPERATION = clsPhamouvementstockreglement.TO_CODEOPERATION;
                this.TA_CODETYPEARTICLE = clsPhamouvementstockreglement.TA_CODETYPEARTICLE;
                this.NA_CODENATUREOPERATION = clsPhamouvementstockreglement.NA_CODENATUREOPERATION;
                this.MV_REGLEMENTGROUPE = clsPhamouvementstockreglement.MV_REGLEMENTGROUPE;

                this.IM_DUREE = clsPhamouvementstockreglement.IM_DUREE;
                this.SO_CODESOCIETE = clsPhamouvementstockreglement.SO_CODESOCIETE;
                this.TS_CODETYPESCHEMACOMPTABLE = clsPhamouvementstockreglement.TS_CODETYPESCHEMACOMPTABLE;
                this.TI_IDTIERSIMMOBILISATION = clsPhamouvementstockreglement.TI_IDTIERSIMMOBILISATION;
                this.TO_VALIDEROPERATIONENCOURS = clsPhamouvementstockreglement.TO_VALIDEROPERATIONENCOURS;
                this.LT_CODELETTRAGE = clsPhamouvementstockreglement.LT_CODELETTRAGE;
                this.RESTEAREGLERCOMMISSION = clsPhamouvementstockreglement.RESTEAREGLERCOMMISSION;
                this.MONTANTREGLERCOMMISSION = clsPhamouvementstockreglement.MONTANTREGLERCOMMISSION;
                this.MONTANTAREGLERCOMMISSION = clsPhamouvementstockreglement.MONTANTAREGLERCOMMISSION;
                this.SR_MONTANTCREDIT = clsPhamouvementstockreglement.SR_MONTANTCREDIT;
                this.RESTEAREGLERASSUREUR = clsPhamouvementstockreglement.RESTEAREGLERASSUREUR;
                this.MONTANTAREGLERASSUREUR = clsPhamouvementstockreglement.MONTANTAREGLERASSUREUR;
                this.CO_IDCOMMERCIAL = clsPhamouvementstockreglement.CO_IDCOMMERCIAL;
                this.CO_NUMCOMMERCIAL = clsPhamouvementstockreglement.CO_NUMCOMMERCIAL;
                this.CO_NOMPRENOM = clsPhamouvementstockreglement.CO_NOMPRENOM ;
                this.CO_ADRESSEPOSTALE = clsPhamouvementstockreglement.CO_ADRESSEPOSTALE;
                this.CO_ADRESSEGEOGRAPHIQUE = clsPhamouvementstockreglement.CO_ADRESSEGEOGRAPHIQUE;
                this.CO_TELEPHONE = clsPhamouvementstockreglement.CO_TELEPHONE;
                this.CO_EMAIL = clsPhamouvementstockreglement.CO_EMAIL;
                this.CO_TAUXCOMMISSION = clsPhamouvementstockreglement.CO_TAUXCOMMISSION;
                this.CO_MONTANTCOMMISSION = clsPhamouvementstockreglement.CO_MONTANTCOMMISSION;
                this.MC_NUMPIECE = clsPhamouvementstockreglement.MC_NUMPIECE;
                // this.AG_CODEAGENCE = "";
                // this.NO_CODENATUREOPERATION = "";
                // this.MS_NUMPIECE = "";
                this.MC_MONTANTDEBIT = clsPhamouvementstockreglement.MC_MONTANTDEBIT;
                this.MC_MONTANTCREDIT = clsPhamouvementstockreglement.MC_MONTANTCREDIT;
                this.RESTEAREGLER = clsPhamouvementstockreglement.RESTEAREGLER;
                // this.SR_MONTANTCREDIT = "";
                this.MC_DATEPIECE = clsPhamouvementstockreglement.MC_DATEPIECE;
                this.CH_DATEDEBUTCOUVERTURE = clsPhamouvementstockreglement.CH_DATEDEBUTCOUVERTURE;
                this.CH_DATEFINCOUVERTURE = clsPhamouvementstockreglement.CH_DATEFINCOUVERTURE;
                this.MC_REFERENCEPIECE = clsPhamouvementstockreglement.MC_REFERENCEPIECE;
                this.MC_LIBELLEOPERATION = clsPhamouvementstockreglement.MC_LIBELLEOPERATION;
                this.MC_NOMTIERS = clsPhamouvementstockreglement.MC_NOMTIERS;
                this.MC_NUMEROPIECE = clsPhamouvementstockreglement.MC_NUMEROPIECE;
                this.MC_NUMSEQUENCE = clsPhamouvementstockreglement.MC_NUMSEQUENCE;
                this.NUMEROBORDEREAU = clsPhamouvementstockreglement.NUMEROBORDEREAU;
                this.MC_SOLDEFINAL = clsPhamouvementstockreglement.MC_SOLDEFINAL;
                this.MONTANTTOTALCOMMISSION = clsPhamouvementstockreglement.MONTANTTOTALCOMMISSION;
                this.MONTANTCOMMISSIONREGLE = clsPhamouvementstockreglement.MONTANTCOMMISSIONREGLE;
                this.MC_SOLDE = clsPhamouvementstockreglement.MC_SOLDE;
                this.SOLDEFINAL = clsPhamouvementstockreglement.SOLDEFINAL;
                this.MONTANTAREGLER = clsPhamouvementstockreglement.MONTANTAREGLER;
                this.MONTANTREGLER = clsPhamouvementstockreglement.MONTANTREGLER;
                this.NUMEROBORDEREAUREGLEMENT = clsPhamouvementstockreglement.NUMEROBORDEREAUREGLEMENT;
                this.PL_NUMCOMPTEGENERAL = clsPhamouvementstockreglement.PL_NUMCOMPTEGENERAL;
                this.NC_CODENATURECOMPTE = clsPhamouvementstockreglement.NC_CODENATURECOMPTE;
                this.PL_NUMCOMPTE1 = clsPhamouvementstockreglement.PL_NUMCOMPTE1;
                this.PL_NUMCOMPTE2 = clsPhamouvementstockreglement.PL_NUMCOMPTE2;
                this.SO_CODESOUSCRIPTION = clsPhamouvementstockreglement.SO_CODESOUSCRIPTION;
                this.SL_TELEPHONE = clsPhamouvementstockreglement.SL_TELEPHONE;
                this.SL_URLNOTIFICATION = clsPhamouvementstockreglement.SL_URLNOTIFICATION;
                this.OB_NOMOBJET = clsPhamouvementstockreglement.OB_NOMOBJET;
                this.SL_INDICATIF = clsPhamouvementstockreglement.SL_INDICATIF;
                this.SL_MESSAGEAPI = clsPhamouvementstockreglement.SL_MESSAGEAPI;
                this.SL_MESSAGECLIENT = clsPhamouvementstockreglement.SL_MESSAGECLIENT;
                this.SL_MONTANTOPERATION = clsPhamouvementstockreglement.SL_MONTANTOPERATION;
                this.SL_NUMEROTRANSACTION = clsPhamouvementstockreglement.SL_NUMEROTRANSACTION;
                this.DT_NUMEROTRANSACTION = clsPhamouvementstockreglement.DT_NUMEROTRANSACTION;
                this.RC_LIBELLE = clsPhamouvementstockreglement.RC_LIBELLE;
                this.BORDEREAUVERSEMENT = clsPhamouvementstockreglement.BORDEREAUVERSEMENT;
                this.BORDEREAUFACTURE = clsPhamouvementstockreglement.BORDEREAUFACTURE;
                this.MS_DATEPIECE = clsPhamouvementstockreglement.MS_DATEPIECE;
                this.NO_CODENATUREOPERATION1 = clsPhamouvementstockreglement.NO_CODENATUREOPERATION1;
                this.CL_DENOMINATION = clsPhamouvementstockreglement.CL_DENOMINATION;
                this.TI_TELEPHONE = clsPhamouvementstockreglement.TI_TELEPHONE;
                this.OP_NOMPRENOM = clsPhamouvementstockreglement.OP_NOMPRENOM;
                this.MR_LIBELLE = clsPhamouvementstockreglement.MR_LIBELLE;
                this.CA_NUMPOLICE = clsPhamouvementstockreglement.CA_NUMPOLICE;
                this.RQ_CODERISQUE = clsPhamouvementstockreglement.RQ_CODERISQUE;
                this.RQ_LIBELLERISQUE = clsPhamouvementstockreglement.RQ_LIBELLERISQUE;
                this.CB_LIBELLEBRANCHE = clsPhamouvementstockreglement.CB_LIBELLEBRANCHE;
                this.CA_DATEEFFET = clsPhamouvementstockreglement.CA_DATEEFFET;
                this.CA_DATEECHEANCE = clsPhamouvementstockreglement.CA_DATEECHEANCE;
                this.TOTALSR_MONTANTCREDIT = clsPhamouvementstockreglement.TOTALSR_MONTANTCREDIT;
               this.MV_NUMBORDEREAU = clsPhamouvementstockreglement.MV_NUMBORDEREAU;
            //private string _RC_LIBELLE = "";
            //private string _BORDEREAUVERSEMENT = "";
            //private string _BORDEREAUFACTURE = "";
            //private string _MS_DATEPIECE = "";
            //private string _NO_CODENATUREOPERATION1 = "";
            //private string _CL_DENOMINATION = "";
            //private string _TI_TELEPHONE = "";
            //private string _OP_NOMPRENOM = "";
            //private string _MR_LIBELLE = "";
            //private string _CA_NUMPOLICE = "";
            //private string _RQ_CODERISQUE = "";
            //private string _RQ_LIBELLERISQUE = "";
            //private string _CB_LIBELLEBRANCHE = "";
            //private string _CA_DATEEFFET = "";
            //private string _CA_DATEECHEANCE = "";



            this.clsCtcontratchequephotoreglementcaisses = clsPhamouvementstockreglement.clsCtcontratchequephotoreglementcaisses;
                this.clsCtcontratchequereglementcaisse = clsPhamouvementstockreglement.clsCtcontratchequereglementcaisse;
                this.clsPhamouvementstockreglementcheques = clsPhamouvementstockreglement.clsPhamouvementstockreglementcheques;
            //private string _RESTEAREGLERCOMMISSION = "0";
            //private string _MONTANTREGLERCOMMISSION = "0";
            //private string _MONTANTAREGLERCOMMISSION = "0";
            //private string _SR_MONTANTCREDIT = "0";
            //private string _RESTEAREGLERASSUREUR = "0";
            //private string _MONTANTREGLERASSUREUR = "0";
            ////private string _SR_MONTANTCREDIT = "0";
            //private string _MONTANTAREGLERASSUREUR = "0";

        }

        #endregion

    }
}
