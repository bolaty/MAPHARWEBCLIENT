using System;
using System.Collections.Generic;
using System.Linq;
using System.Data;
using Stock.Common;

namespace HT_Assurance
{
	public class clsCtcontrat : clsEntitieBase
    {
		#region VARIABLES LOCALES

		private string _CA_CODECONTRAT = "";
		private string _AG_CODEAGENCE = "";
		private string _EN_CODEENTREPOT = "";
		private string _CA_NUMPOLICE = "";
		private string _CA_DATESAISIE = "";
		private string _TI_IDTIERS = "";
		private string _IT_CODEINTERMEDIAIRE = "";
		private string _AP_CODETYPEAPPARTEMENT = "";
		private string _OC_CODETYPEOCCUPANT = "";
		private string _ZA_CODEZONEAUTO = "";
		private string _CB_IDBRANCHE = "";
		private string _CA_DATEEFFET = "";
		private string _CA_DATEECHEANCE = "";
		private string _OP_CODEOPERATEUR = "";
		private string _CA_AVENANT = "";
		private string _CA_SITUATIONGEOGRAPHIQUE = "";
		private string _CA_CONDITIONHABITUEL = "";
		private string _ST_CODESTATUTSOCIOPROF = "";
		private string _AU_CODECATEGORIE = "";
		private string _TA_CODETARIF = "";
		private string _US_CODEUSAGE = "";
		private string _GE_CODEGENRE = "";
		private string _TVH_CODETYPE = "";
		private string _EN_CODEENERGIE = "";
		private string _CA_TAUX = "0";
		private string _CA_TYPE = "";
		private string _CA_NUMSERIE = "";
		private string _CA_IMMATRICULATION = "";
		private double _CA_PUISSANCEADMISE = 0;
		private double _CA_CHARGEUTILE = 0;
		private double _CA_NBREPLACE = 0;
		private double _CA_VALNEUVE = 0;
		private double _CA_VALVENALE = 0;
		private double _DUREE = 0;
		private string _CA_DATEMISECIRCULATION = "";
		private string _CA_CLIENTEXONERETAXE = "";
		private string _TI_IDTIERSCOMMERCIAL = "";
		private string _TI_IDTIERSASSUREUR = "";
		private string _CA_DATETRANSMISSIONAASSUREUR = "";
		private string _CA_DATEVALIDATIONASSUREUR ="";
		private string _CA_DATEVALIDATIONCONTRAASS = "";
		private string _CA_DATESUSPENSION = "";
		private string _CA_DATECLOTURE = "";
		private string _CA_DATERESILIATION = "";
		private string _CA_NOMINTERLOCUTEUR = "";
		private string _CA_CONTACTINTERLOCUTEUR = "";
		private string _DI_CODEDESIGNATION = "";
		private string _TA_CODETYPECONTRATSANTE = "";
		private string _CA_CODECONTRATSECONDAIRE = "";
		private string _CA_GESA = "";
		private string _CO_CODECOMMUNE = "";
		private string _RQ_CODERISQUE = "";
		private string _RQ_LIBELLERISQUE = "";
		private string _TA_CODETYPEAFFAIRES = "";

		private String _TI_NUMTIERS = "";
		private String _TI_DENOMINATION = "";
		private String _TI_NUMTIERSCOMMERCIAL = "";
		private String _TI_DENOMINATIONCOMMERCIAL = "";
		private String _PY_CODEPAYS = "";
        private String _PY_LIBELLE = "";
        private String _VL_CODEVILLE = "";
        private String _VL_LIBELLE = "";
		private String _CO_LIBELLE = "";


        private string _TI_TELEPHONECOMMERCIAL = "";
        private string _TI_NUMTIERSASSUREUR = "";
        private string _TI_DENOMINATIONASSUREUR = "";
        private string _TI_TELEPHONEASSUREUR = "";
        private string _IT_DENOMMINATION = "";
        private string _TA_LIBLLETYPEAFFAIRES = "";
        private string _DI_LIBELLEDESIGNATION = "";
        private string _TI_TELEPHONE = "";
        private string _MF_CODEMAINFORTE = "";
        private string _MF_LIBLLEMAINFORTE = "";
        private string _ZM_CODEZONEVOYAGE = "";
        private string _ZM_NOMZONEVOYAGE = "";

        private string _ZA_NOMZONEAUTO = "";
        private double _CT_NOMBRECONTRAT = 0;
        private double _CA_NOMBREPIECE = 0;
        private double _CA_SUPERFICIE = 0;
        private double _CA_LOYERMENSUEL = 0;
        private string _CA_DATENAISSANCE = "";
        private string _PF_CODEPROFESSION = "";
        private string _PF_LIBELLE = "";
        private string _CA_LIEUNAISSANCE = "";
        private double _MONTANTTTCPLUSAIRSI = 0;
        private double _MONTANTTTCPLUSAIRSINF = 0;

        private string _CD_CODECONDITION = "";
        private string _CD_LIBELLECONDITION = "";
        private double _CA_DUREEENMOIS = 0;
        private string _AC_SPORT = "";
        private string _CA_ADRESSE = "";
        private string _PL_NUMCOMPTETIERS = "";

        private string _ST_LIBELLESTATUTSOCIOPROF = "";
        private string _CB_LIBELLEBRANCHE = "";
        private string _EN_LIBELLEENERGIE = "";
        private string _AU_LIBELLECATEGORIE = "";
        private string _TA_LIBELLETARIF = "";
        private string _US_LIBELLEUSAGE = "";
        private string _GE_LIBELLEGENRE = "";
        private string _TVH_LIBELE = "";
        private string _AP_LIBLLETYPEAPPARTEMENT = "";
        private string _OC_LIBLLETYPEOCCUPANT = "";
        private string _CA_NUMPASSEPORT = "";
        private string _PY_CODEPAYSDESTINATION = "";
        private double _CA_DUREESEJOUR = 0;
        private string _CA_OPTION = "";
        private string _PY_LIBELLEDESTINATION = "";
        private string _AU_CODETYPECONTRATAUTO = "";
        private string _AU_LIBELLETYPECONTRATAUTO = "";
        private string _ZN_CODEZONE = "";
        private string _DATEJOURNEE = "";
        private string _LO_CODELOGICIEL = "";
        private string _CA_STATUT = "";
        private string _NUMEROBORDEREAU = "";
        private string _MS_NUMPIECE = "";
        private double _MONTANTREGLEMENT = 0;
        private double _SOLDE = 0;
        private double _PRIME = 0;
        private string _TI_EMAIL = "";
        private string _CA_DATEDEMANDERENOUVELEMENT = "";
        private string _CA_CODECONTRATORIGINE = "";
        private string _RQ_CODERISQUEOBLIGATOIRE = "";
        private string _GR_CODEGARENTIEPRIME = "";
        private string _GR_LIBELLEGARENTIEPRIME = "";
        private string _CA_OBSERVATION = "";
        private string _MESSAGERELANCE = "";
        private string _DE_CODEDEMANADE = "";
        private string _TI_NUMWHATSAPP = "";
        private string _EX_EXERCICE = "";
        private string _AS_NUMEROASSUREUR = "";
        private List<HT_Stock.BOJ.clsCtcontratgarantie> _clsCtcontratgaranties = null;
		private List<HT_Stock.BOJ.clsCtcontratcommissionassurance> _clsCtcontratcommissionassurances = null;
		private List<HT_Stock.BOJ.clsCtcontratprime> _clsCtcontratprimes = null;		
 		private List<HT_Stock.BOJ.clsCtcontratreduction> _clsCtcontratreductions = null;
 		private List<HT_Stock.BOJ.clsCtcontratayantdroit> _clsCtcontratayantdroits = null; 
 		private List<HT_Stock.BOJ.clsCtcontratcapitaux> _clsCtcontratcapitauxs = null;                        	       
        #endregion

		#region ACCESSEURS

		public string CA_CODECONTRAT
		{
			get { return _CA_CODECONTRAT; }
			set {  _CA_CODECONTRAT = value; }
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

		public string CA_NUMPOLICE
		{
			get { return _CA_NUMPOLICE; }
			set {  _CA_NUMPOLICE = value; }
		}

		public string CA_DATESAISIE
		{
			get { return _CA_DATESAISIE; }
			set {  _CA_DATESAISIE = value; }
		}

		public string TI_IDTIERS
		{
			get { return _TI_IDTIERS; }
			set {  _TI_IDTIERS = value; }
		}

		public string IT_CODEINTERMEDIAIRE
		{
			get { return _IT_CODEINTERMEDIAIRE; }
			set {  _IT_CODEINTERMEDIAIRE = value; }
		}

		public string AP_CODETYPEAPPARTEMENT
		{
			get { return _AP_CODETYPEAPPARTEMENT; }
			set {  _AP_CODETYPEAPPARTEMENT = value; }
		}

		public string OC_CODETYPEOCCUPANT
		{
			get { return _OC_CODETYPEOCCUPANT; }
			set {  _OC_CODETYPEOCCUPANT = value; }
		}

		

		public string ZA_CODEZONEAUTO
		{
			get { return _ZA_CODEZONEAUTO; }
			set {  _ZA_CODEZONEAUTO = value; }
		}

		public string CB_IDBRANCHE
		{
			get { return _CB_IDBRANCHE; }
			set {  _CB_IDBRANCHE = value; }
		}

		public string CA_DATEEFFET
		{
			get { return _CA_DATEEFFET; }
			set {  _CA_DATEEFFET = value; }
		}

		public string CA_DATEECHEANCE
		{
			get { return _CA_DATEECHEANCE; }
			set {  _CA_DATEECHEANCE = value; }
		}

		public string OP_CODEOPERATEUR
		{
			get { return _OP_CODEOPERATEUR; }
			set {  _OP_CODEOPERATEUR = value; }
		}

		public string CA_AVENANT
		{
			get { return _CA_AVENANT; }
			set {  _CA_AVENANT = value; }
		}

		public string CA_SITUATIONGEOGRAPHIQUE
		{
			get { return _CA_SITUATIONGEOGRAPHIQUE; }
			set {  _CA_SITUATIONGEOGRAPHIQUE = value; }
		}

		public string CA_CONDITIONHABITUEL
		{
			get { return _CA_CONDITIONHABITUEL; }
			set {  _CA_CONDITIONHABITUEL = value; }
		}

		public string ST_CODESTATUTSOCIOPROF
		{
			get { return _ST_CODESTATUTSOCIOPROF; }
			set {  _ST_CODESTATUTSOCIOPROF = value; }
		}

		

		public string AU_CODECATEGORIE
		{
			get { return _AU_CODECATEGORIE; }
			set {  _AU_CODECATEGORIE = value; }
		}

		public string TA_CODETARIF
		{
			get { return _TA_CODETARIF; }
			set {  _TA_CODETARIF = value; }
		}

		public string US_CODEUSAGE
		{
			get { return _US_CODEUSAGE; }
			set {  _US_CODEUSAGE = value; }
		}

		public string GE_CODEGENRE
		{
			get { return _GE_CODEGENRE; }
			set {  _GE_CODEGENRE = value; }
		}

		public string TVH_CODETYPE
		{
			get { return _TVH_CODETYPE; }
			set {  _TVH_CODETYPE = value; }
		}

		public string EN_CODEENERGIE
		{
			get { return _EN_CODEENERGIE; }
			set {  _EN_CODEENERGIE = value; }
		}

		public string CA_TAUX
		{
			get { return _CA_TAUX; }
			set {  _CA_TAUX = value; }
		}

		public string CA_TYPE
		{
			get { return _CA_TYPE; }
			set {  _CA_TYPE = value; }
		}

		public string CA_NUMSERIE
		{
			get { return _CA_NUMSERIE; }
			set {  _CA_NUMSERIE = value; }
		}

		public string CA_IMMATRICULATION
		{
			get { return _CA_IMMATRICULATION; }
			set {  _CA_IMMATRICULATION = value; }
		}

		public double CA_PUISSANCEADMISE
		{
			get { return _CA_PUISSANCEADMISE; }
			set {  _CA_PUISSANCEADMISE = value; }
		}

		public double CA_CHARGEUTILE
		{
			get { return _CA_CHARGEUTILE; }
			set {  _CA_CHARGEUTILE = value; }
		}

		public double CA_NBREPLACE
		{
			get { return _CA_NBREPLACE; }
			set {  _CA_NBREPLACE = value; }
		}

		public double CA_VALNEUVE
		{
			get { return _CA_VALNEUVE; }
			set {  _CA_VALNEUVE = value; }
		}

		public double CA_VALVENALE
		{
			get { return _CA_VALVENALE; }
			set {  _CA_VALVENALE = value; }
		}

		public string CA_DATEMISECIRCULATION
		{
			get { return _CA_DATEMISECIRCULATION; }
			set {  _CA_DATEMISECIRCULATION = value; }
		}

		public string CA_CLIENTEXONERETAXE
		{
			get { return _CA_CLIENTEXONERETAXE; }
			set {  _CA_CLIENTEXONERETAXE = value; }
		}

		public string TI_IDTIERSCOMMERCIAL
		{
			get { return _TI_IDTIERSCOMMERCIAL; }
			set {  _TI_IDTIERSCOMMERCIAL = value; }
		}

		public string TI_IDTIERSASSUREUR
		{
			get { return _TI_IDTIERSASSUREUR; }
			set {  _TI_IDTIERSASSUREUR = value; }
		}

		public string CA_DATETRANSMISSIONAASSUREUR
		{
			get { return _CA_DATETRANSMISSIONAASSUREUR; }
			set {  _CA_DATETRANSMISSIONAASSUREUR = value; }
		}

		public string CA_DATEVALIDATIONASSUREUR
		{
			get { return _CA_DATEVALIDATIONASSUREUR; }
			set {  _CA_DATEVALIDATIONASSUREUR = value; }
		}

		

		public string CA_DATEVALIDATIONCONTRAASS
		{
			get { return _CA_DATEVALIDATIONCONTRAASS; }
			set {  _CA_DATEVALIDATIONCONTRAASS = value; }
		}

		public string CA_DATESUSPENSION
		{
			get { return _CA_DATESUSPENSION; }
			set {  _CA_DATESUSPENSION = value; }
		}

		public string CA_DATECLOTURE
		{
			get { return _CA_DATECLOTURE; }
			set {  _CA_DATECLOTURE = value; }
		}

		public string CA_DATERESILIATION
		{
			get { return _CA_DATERESILIATION; }
			set {  _CA_DATERESILIATION = value; }
		}

		public string CA_NOMINTERLOCUTEUR
		{
			get { return _CA_NOMINTERLOCUTEUR; }
			set {  _CA_NOMINTERLOCUTEUR = value; }
		}

		public string CA_CONTACTINTERLOCUTEUR
		{
			get { return _CA_CONTACTINTERLOCUTEUR; }
			set {  _CA_CONTACTINTERLOCUTEUR = value; }
		}

		public string DI_CODEDESIGNATION
		{
			get { return _DI_CODEDESIGNATION; }
			set {  _DI_CODEDESIGNATION = value; }
		}

		public string TA_CODETYPECONTRATSANTE
		{
			get { return _TA_CODETYPECONTRATSANTE; }
			set {  _TA_CODETYPECONTRATSANTE = value; }
		}

		public string CA_CODECONTRATSECONDAIRE
		{
			get { return _CA_CODECONTRATSECONDAIRE; }
			set {  _CA_CODECONTRATSECONDAIRE = value; }
		}

		public string CA_GESA
		{
			get { return _CA_GESA; }
			set {  _CA_GESA = value; }
		}

		public string CO_CODECOMMUNE
		{
			get { return _CO_CODECOMMUNE; }
			set {  _CO_CODECOMMUNE = value; }
		}

		public string RQ_CODERISQUE
		{
			get { return _RQ_CODERISQUE; }
			set {  _RQ_CODERISQUE = value; }
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
        public String TI_NUMTIERS
        {
	        get { return _TI_NUMTIERS; }
	        set { _TI_NUMTIERS = value; }
        }
        public String TI_DENOMINATION
        {
	        get { return _TI_DENOMINATION; }
	        set { _TI_DENOMINATION = value; }
        }
        public String TI_NUMTIERSCOMMERCIAL
        {
	        get { return _TI_NUMTIERSCOMMERCIAL; }
	        set { _TI_NUMTIERSCOMMERCIAL = value; }
        }
        public String TI_DENOMINATIONCOMMERCIAL
        {
	        get { return _TI_DENOMINATIONCOMMERCIAL; }
	        set { _TI_DENOMINATIONCOMMERCIAL = value; }
        }
        public String PY_CODEPAYS
        {
	        get { return _PY_CODEPAYS; }
	        set { _PY_CODEPAYS = value; }
        }
        public String PY_LIBELLE
        {
	        get { return _PY_LIBELLE; }
	        set { _PY_LIBELLE = value; }
        }
        public String VL_CODEVILLE
        {
	        get { return _VL_CODEVILLE; }
	        set { _VL_CODEVILLE = value; }
        }
        public String VL_LIBELLE
        {
	        get { return _VL_LIBELLE; }
	        set { _VL_LIBELLE = value; }
        }
        public String CO_LIBELLE
        {
	        get { return _CO_LIBELLE; }
	        set { _CO_LIBELLE = value; }
        }
        public String TI_TELEPHONECOMMERCIAL
        {
	        get { return _TI_TELEPHONECOMMERCIAL; }
	        set { _TI_TELEPHONECOMMERCIAL = value; }
        }
        public String TI_NUMTIERSASSUREUR
        {
	        get { return _TI_NUMTIERSASSUREUR; }
	        set { _TI_NUMTIERSASSUREUR = value; }
        }
        public String TI_DENOMINATIONASSUREUR
        {
	        get { return _TI_DENOMINATIONASSUREUR; }
	        set { _TI_DENOMINATIONASSUREUR = value; }
        }
        public String TI_TELEPHONEASSUREUR
        {
	        get { return _TI_TELEPHONEASSUREUR; }
	        set { _TI_TELEPHONEASSUREUR = value; }
        }
        public String IT_DENOMMINATION
        {
	        get { return _IT_DENOMMINATION; }
	        set { _IT_DENOMMINATION = value; }
        }
        public String TA_LIBLLETYPEAFFAIRES
        {
	        get { return _TA_LIBLLETYPEAFFAIRES; }
	        set { _TA_LIBLLETYPEAFFAIRES = value; }
        }
        public String DI_LIBELLEDESIGNATION
        {
	        get { return _DI_LIBELLEDESIGNATION; }
	        set { _DI_LIBELLEDESIGNATION = value; }
        }

        public String TI_TELEPHONE
        {
	        get { return _TI_TELEPHONE; }
	        set { _TI_TELEPHONE = value; }
        }
        public String MF_CODEMAINFORTE
        {
	        get { return _MF_CODEMAINFORTE; }
	        set { _MF_CODEMAINFORTE = value; }
        }
        public String MF_LIBLLEMAINFORTE
        {
	        get { return _MF_LIBLLEMAINFORTE; }
	        set { _MF_LIBLLEMAINFORTE = value; }
        }
        public String ZM_CODEZONEVOYAGE
        {
	        get { return _ZM_CODEZONEVOYAGE; }
	        set { _ZM_CODEZONEVOYAGE = value; }
        }
        public String ZM_NOMZONEVOYAGE
        {
	        get { return _ZM_NOMZONEVOYAGE; }
	        set { _ZM_NOMZONEVOYAGE = value; }
        }
       
        public String ZA_NOMZONEAUTO
        {
	        get { return _ZA_NOMZONEAUTO; }
	        set { _ZA_NOMZONEAUTO = value; }
        }
        public double CT_NOMBRECONTRAT
        {
	        get { return _CT_NOMBRECONTRAT; }
	        set { _CT_NOMBRECONTRAT = value; }
        }
        public double CA_NOMBREPIECE
        {
	        get { return _CA_NOMBREPIECE; }
	        set { _CA_NOMBREPIECE = value; }
        }
        public double CA_SUPERFICIE
        {
	        get { return _CA_SUPERFICIE; }
	        set { _CA_SUPERFICIE = value; }
        }
        public double CA_LOYERMENSUEL
        {
	        get { return _CA_LOYERMENSUEL; }
	        set { _CA_LOYERMENSUEL = value; }
        }
        public String CA_DATENAISSANCE
        {
	        get { return _CA_DATENAISSANCE; }
	        set { _CA_DATENAISSANCE = value; }
        }
        public String PF_CODEPROFESSION
        {
	        get { return _PF_CODEPROFESSION; }
	        set { _PF_CODEPROFESSION = value; }
        }
        public String PF_LIBELLE
        {
	        get { return _PF_LIBELLE; }
	        set { _PF_LIBELLE = value; }
        }

        public String CA_LIEUNAISSANCE
        {
	        get { return _CA_LIEUNAISSANCE; }
	        set { _CA_LIEUNAISSANCE = value; }
        }
        public double MONTANTTTCPLUSAIRSI
        {
	        get { return _MONTANTTTCPLUSAIRSI; }
	        set { _MONTANTTTCPLUSAIRSI = value; }
        }

        public double MONTANTTTCPLUSAIRSINF
        {
	        get { return _MONTANTTTCPLUSAIRSINF; }
	        set { _MONTANTTTCPLUSAIRSINF = value; }
        }

        public String CD_CODECONDITION
        {
	        get { return _CD_CODECONDITION; }
	        set { _CD_CODECONDITION = value; }
        }
        public String CD_LIBELLECONDITION
        {
	        get { return _CD_LIBELLECONDITION; }
	        set { _CD_LIBELLECONDITION = value; }
        }
        public double CA_DUREEENMOIS
        {
	        get { return _CA_DUREEENMOIS; }
	        set { _CA_DUREEENMOIS = value; }
        }
        public String AC_SPORT
        {
	        get { return _AC_SPORT; }
	        set { _AC_SPORT = value; }
        }
        public String CA_ADRESSE
        {
	        get { return _CA_ADRESSE; }
	        set { _CA_ADRESSE = value; }
        }
        public String PL_NUMCOMPTETIERS
        {
	        get { return _PL_NUMCOMPTETIERS; }
	        set { _PL_NUMCOMPTETIERS = value; }
        }

        public String ST_LIBELLESTATUTSOCIOPROF
        {
	        get { return _ST_LIBELLESTATUTSOCIOPROF; }
	        set { _ST_LIBELLESTATUTSOCIOPROF = value; }
        }

      

        public String CB_LIBELLEBRANCHE
        {
	        get { return _CB_LIBELLEBRANCHE; }
	        set { _CB_LIBELLEBRANCHE = value; }
        }

        public String EN_LIBELLEENERGIE
        {
	        get { return _EN_LIBELLEENERGIE; }
	        set { _EN_LIBELLEENERGIE = value; }
        }

        public String AU_LIBELLECATEGORIE
        {
	        get { return _AU_LIBELLECATEGORIE; }
	        set { _AU_LIBELLECATEGORIE = value; }
        }

        public String TA_LIBELLETARIF
        {
	        get { return _TA_LIBELLETARIF; }
	        set { _TA_LIBELLETARIF = value; }
        }
        public String US_LIBELLEUSAGE
        {
	        get { return _US_LIBELLEUSAGE; }
	        set { _US_LIBELLEUSAGE = value; }
        }    
        public String GE_LIBELLEGENRE
        {
	        get { return _GE_LIBELLEGENRE; }
	        set { _GE_LIBELLEGENRE = value; }
        }          
        public String TVH_LIBELE
        {
	        get { return _TVH_LIBELE; }
	        set { _TVH_LIBELE = value; }
        }         
        
        public String AP_LIBLLETYPEAPPARTEMENT
        {
	        get { return _AP_LIBLLETYPEAPPARTEMENT; }
	        set { _AP_LIBLLETYPEAPPARTEMENT = value; }
        } 
        
        public String OC_LIBLLETYPEOCCUPANT
        {
	        get { return _OC_LIBLLETYPEOCCUPANT; }
	        set { _OC_LIBLLETYPEOCCUPANT = value; }
        }
        public String CA_NUMPASSEPORT
        {
	        get { return _CA_NUMPASSEPORT; }
	        set { _CA_NUMPASSEPORT = value; }
        }
        public String PY_CODEPAYSDESTINATION
        {
	        get { return _PY_CODEPAYSDESTINATION; }
	        set { _PY_CODEPAYSDESTINATION = value; }
        }
        public double CA_DUREESEJOUR
        {
	        get { return _CA_DUREESEJOUR; }
	        set { _CA_DUREESEJOUR = value; }
        }
        public String CA_OPTION
        {
	        get { return _CA_OPTION; }
	        set { _CA_OPTION = value; }
        }
        public String PY_LIBELLEDESTINATION
        {
	        get { return _PY_LIBELLEDESTINATION; }
	        set { _PY_LIBELLEDESTINATION = value; }
        }

        public String AU_CODETYPECONTRATAUTO
        {
	        get { return _AU_CODETYPECONTRATAUTO; }
	        set { _AU_CODETYPECONTRATAUTO = value; }
        }
        public String AU_LIBELLETYPECONTRATAUTO
        {
	        get { return _AU_LIBELLETYPECONTRATAUTO; }
	        set { _AU_LIBELLETYPECONTRATAUTO = value; }
        }

        public String NUMEROBORDEREAU
        {
	        get { return _NUMEROBORDEREAU; }
	        set { _NUMEROBORDEREAU = value; }
        }

        public String MS_NUMPIECE
        {
	        get { return _MS_NUMPIECE; }
	        set { _MS_NUMPIECE = value; }
        }

        public String ZN_CODEZONE
        {
	        get { return _ZN_CODEZONE; }
	        set { _ZN_CODEZONE = value; }
        }
        public String DATEJOURNEE
        {
	        get { return _DATEJOURNEE; }
	        set { _DATEJOURNEE = value; }
        }
        public String LO_CODELOGICIEL
        {
	        get { return _LO_CODELOGICIEL; }
	        set { _LO_CODELOGICIEL = value; }
        }
        public String CA_STATUT
        {
	        get { return _CA_STATUT; }
	        set { _CA_STATUT = value; }
        }
        public double MONTANTREGLEMENT
        {
	        get { return _MONTANTREGLEMENT; }
	        set { _MONTANTREGLEMENT = value; }
        }
        public double SOLDE
        {
	        get { return _SOLDE; }
	        set { _SOLDE = value; }
        }
        public double PRIME
        {
	        get { return _PRIME; }
	        set { _PRIME = value; }
        }

        public String TI_EMAIL
        {
	        get { return _TI_EMAIL; }
	        set { _TI_EMAIL = value; }
        }
        public String CA_DATEDEMANDERENOUVELEMENT
        {
	        get { return _CA_DATEDEMANDERENOUVELEMENT; }
	        set { _CA_DATEDEMANDERENOUVELEMENT = value; }
        }
        public String CA_CODECONTRATORIGINE
        {
	        get { return _CA_CODECONTRATORIGINE; }
	        set { _CA_CODECONTRATORIGINE = value; }
        }
        public String RQ_CODERISQUEOBLIGATOIRE
        {
	        get { return _RQ_CODERISQUEOBLIGATOIRE; }
	        set { _RQ_CODERISQUEOBLIGATOIRE = value; }
        }
        public String GR_CODEGARENTIEPRIME
        {
	        get { return _GR_CODEGARENTIEPRIME; }
	        set { _GR_CODEGARENTIEPRIME = value; }
        }
        public String GR_LIBELLEGARENTIEPRIME
        {
	        get { return _GR_LIBELLEGARENTIEPRIME; }
	        set { _GR_LIBELLEGARENTIEPRIME = value; }
        }
        public String CA_OBSERVATION
        {
	        get { return _CA_OBSERVATION; }
	        set { _CA_OBSERVATION = value; }
        }
        public String MESSAGERELANCE
        {
	        get { return _MESSAGERELANCE; }
	        set { _MESSAGERELANCE = value; }
        }
        public String DE_CODEDEMANADE
        {
	        get { return _DE_CODEDEMANADE; }
	        set { _DE_CODEDEMANADE = value; }
        }

        public String TI_NUMWHATSAPP
        {
	        get { return _TI_NUMWHATSAPP; }
	        set { _TI_NUMWHATSAPP = value; }
        }
        public double DUREE
        {
	        get { return _DUREE; }
	        set { _DUREE = value; }
        }

        public String EX_EXERCICE
        {
	        get { return _EX_EXERCICE; }
	        set { _EX_EXERCICE = value; }
        }
        public String AS_NUMEROASSUREUR
        {
	        get { return _AS_NUMEROASSUREUR; }
	        set { _AS_NUMEROASSUREUR = value; }
        }

        //private string _CA_NUMPASSEPORT = "";
        //private string _PY_CODEPAYSDESTINATION = "";
        //private string _CA_DUREESEJOUR = "0";
        //private string _CA_OPTION = "";

        public  List<HT_Stock.BOJ.clsCtcontratgarantie> clsCtcontratgaranties
        {
			get { return _clsCtcontratgaranties; }
			set { _clsCtcontratgaranties = value; }
		}
		public  List<HT_Stock.BOJ.clsCtcontratcommissionassurance> clsCtcontratcommissionassurances
        {
			get { return _clsCtcontratcommissionassurances; }
			set { _clsCtcontratcommissionassurances = value; }
		}
        public  List<HT_Stock.BOJ.clsCtcontratprime> clsCtcontratprimes
        {
	        get { return _clsCtcontratprimes; }
	        set { _clsCtcontratprimes = value; }
        }
        public  List<HT_Stock.BOJ.clsCtcontratreduction> clsCtcontratreductions
        {
	        get { return _clsCtcontratreductions; }
	        set { _clsCtcontratreductions = value; }
        }
        public  List<HT_Stock.BOJ.clsCtcontratayantdroit> clsCtcontratayantdroits
        {
	        get { return _clsCtcontratayantdroits; }
	        set { _clsCtcontratayantdroits = value; }
        }
        public  List<HT_Stock.BOJ.clsCtcontratcapitaux> clsCtcontratcapitauxs
        {
	        get { return _clsCtcontratcapitauxs; }
	        set { _clsCtcontratcapitauxs = value; }
        }

		#endregion

		#region INSTANCIATEURS

		public clsCtcontrat(){}
		
		public clsCtcontrat(clsCtcontrat clsCtcontrat)
		{
			this.CA_CODECONTRAT = clsCtcontrat.CA_CODECONTRAT;
			this.AG_CODEAGENCE = clsCtcontrat.AG_CODEAGENCE;
			this.EN_CODEENTREPOT = clsCtcontrat.EN_CODEENTREPOT;
			this.CA_NUMPOLICE = clsCtcontrat.CA_NUMPOLICE;
			this.CA_DATESAISIE = clsCtcontrat.CA_DATESAISIE;
			this.TI_IDTIERS = clsCtcontrat.TI_IDTIERS;
			this.IT_CODEINTERMEDIAIRE = clsCtcontrat.IT_CODEINTERMEDIAIRE;
			this.AP_CODETYPEAPPARTEMENT = clsCtcontrat.AP_CODETYPEAPPARTEMENT;
			this.OC_CODETYPEOCCUPANT = clsCtcontrat.OC_CODETYPEOCCUPANT;

			this.ZA_CODEZONEAUTO = clsCtcontrat.ZA_CODEZONEAUTO;
			this.CB_IDBRANCHE = clsCtcontrat.CB_IDBRANCHE;
			this.CA_DATEEFFET = clsCtcontrat.CA_DATEEFFET;
			this.CA_DATEECHEANCE = clsCtcontrat.CA_DATEECHEANCE;
			this.OP_CODEOPERATEUR = clsCtcontrat.OP_CODEOPERATEUR;
			this.CA_AVENANT = clsCtcontrat.CA_AVENANT;
			this.CA_SITUATIONGEOGRAPHIQUE = clsCtcontrat.CA_SITUATIONGEOGRAPHIQUE;
			this.CA_CONDITIONHABITUEL = clsCtcontrat.CA_CONDITIONHABITUEL;
			this.ST_CODESTATUTSOCIOPROF = clsCtcontrat.ST_CODESTATUTSOCIOPROF;
			this.AU_CODECATEGORIE = clsCtcontrat.AU_CODECATEGORIE;
			this.TA_CODETARIF = clsCtcontrat.TA_CODETARIF;
			this.US_CODEUSAGE = clsCtcontrat.US_CODEUSAGE;
			this.GE_CODEGENRE = clsCtcontrat.GE_CODEGENRE;
			this.TVH_CODETYPE = clsCtcontrat.TVH_CODETYPE;
			this.EN_CODEENERGIE = clsCtcontrat.EN_CODEENERGIE;
			this.CA_TAUX = clsCtcontrat.CA_TAUX;
			this.CA_TYPE = clsCtcontrat.CA_TYPE;
			this.CA_NUMSERIE = clsCtcontrat.CA_NUMSERIE;
			this.CA_IMMATRICULATION = clsCtcontrat.CA_IMMATRICULATION;
			this.CA_PUISSANCEADMISE = clsCtcontrat.CA_PUISSANCEADMISE;
			this.CA_CHARGEUTILE = clsCtcontrat.CA_CHARGEUTILE;
			this.CA_NBREPLACE = clsCtcontrat.CA_NBREPLACE;
			this.CA_VALNEUVE = clsCtcontrat.CA_VALNEUVE;
			this.CA_VALVENALE = clsCtcontrat.CA_VALVENALE;
			this.CA_DATEMISECIRCULATION = clsCtcontrat.CA_DATEMISECIRCULATION;
			this.CA_CLIENTEXONERETAXE = clsCtcontrat.CA_CLIENTEXONERETAXE;
			this.TI_IDTIERSCOMMERCIAL = clsCtcontrat.TI_IDTIERSCOMMERCIAL;
			this.TI_IDTIERSASSUREUR = clsCtcontrat.TI_IDTIERSASSUREUR;
			this.CA_DATETRANSMISSIONAASSUREUR = clsCtcontrat.CA_DATETRANSMISSIONAASSUREUR;
			this.CA_DATEVALIDATIONASSUREUR = clsCtcontrat.CA_DATEVALIDATIONASSUREUR;
			this.CA_DATEVALIDATIONCONTRAASS = clsCtcontrat.CA_DATEVALIDATIONCONTRAASS;
			this.CA_DATESUSPENSION = clsCtcontrat.CA_DATESUSPENSION;
			this.CA_DATECLOTURE = clsCtcontrat.CA_DATECLOTURE;
			this.CA_DATERESILIATION = clsCtcontrat.CA_DATERESILIATION;
			this.CA_NOMINTERLOCUTEUR = clsCtcontrat.CA_NOMINTERLOCUTEUR;
			this.CA_CONTACTINTERLOCUTEUR = clsCtcontrat.CA_CONTACTINTERLOCUTEUR;
			this.DI_CODEDESIGNATION = clsCtcontrat.DI_CODEDESIGNATION;
			this.TA_CODETYPECONTRATSANTE = clsCtcontrat.TA_CODETYPECONTRATSANTE;
			this.CA_CODECONTRATSECONDAIRE = clsCtcontrat.CA_CODECONTRATSECONDAIRE;
			this.CA_GESA = clsCtcontrat.CA_GESA;
			this.CO_CODECOMMUNE = clsCtcontrat.CO_CODECOMMUNE;
			this.RQ_CODERISQUE = clsCtcontrat.RQ_CODERISQUE;
			this.RQ_LIBELLERISQUE = clsCtcontrat.RQ_LIBELLERISQUE;
			this.TA_CODETYPEAFFAIRES = clsCtcontrat.TA_CODETYPEAFFAIRES;
			this.TI_NUMTIERS = clsCtcontrat.TI_NUMTIERS;
			this.TI_DENOMINATION = clsCtcontrat.TI_DENOMINATION;
			this.TI_NUMTIERSCOMMERCIAL = clsCtcontrat.TI_NUMTIERSCOMMERCIAL;
			this.TI_DENOMINATIONCOMMERCIAL = clsCtcontrat.TI_DENOMINATIONCOMMERCIAL;
			this.PY_CODEPAYS = clsCtcontrat.PY_CODEPAYS;
			this.PY_LIBELLE = clsCtcontrat.PY_LIBELLE;
			this.VL_CODEVILLE = clsCtcontrat.VL_CODEVILLE;
			this.VL_LIBELLE = clsCtcontrat.VL_LIBELLE;
			this.CO_LIBELLE = clsCtcontrat.CO_LIBELLE;
			this.TI_TELEPHONECOMMERCIAL = clsCtcontrat.TI_TELEPHONECOMMERCIAL;
			this.TI_NUMTIERSASSUREUR = clsCtcontrat.TI_NUMTIERSASSUREUR;
			this.TI_DENOMINATIONASSUREUR = clsCtcontrat.TI_DENOMINATIONASSUREUR;
			this.TI_TELEPHONEASSUREUR = clsCtcontrat.TI_TELEPHONEASSUREUR;
			this.IT_DENOMMINATION = clsCtcontrat.IT_DENOMMINATION;
			this.TA_LIBLLETYPEAFFAIRES = clsCtcontrat.TA_LIBLLETYPEAFFAIRES;
			this.DI_LIBELLEDESIGNATION = clsCtcontrat.DI_LIBELLEDESIGNATION;
			this.TI_TELEPHONE = clsCtcontrat.TI_TELEPHONE;
			this.MF_CODEMAINFORTE = clsCtcontrat.MF_CODEMAINFORTE;
			this.MF_LIBLLEMAINFORTE = clsCtcontrat.MF_LIBLLEMAINFORTE;
			this.ZM_CODEZONEVOYAGE = clsCtcontrat.ZM_CODEZONEVOYAGE;
			this.ZM_NOMZONEVOYAGE = clsCtcontrat.ZM_NOMZONEVOYAGE;
			this.ZA_NOMZONEAUTO = clsCtcontrat.ZA_NOMZONEAUTO;
			this.CT_NOMBRECONTRAT = clsCtcontrat.CT_NOMBRECONTRAT;
			this.CA_DATENAISSANCE = clsCtcontrat.CA_DATENAISSANCE;
			this.PF_CODEPROFESSION = clsCtcontrat.PF_CODEPROFESSION;
			this.PF_LIBELLE = clsCtcontrat.PF_LIBELLE;
			this.CA_LIEUNAISSANCE = clsCtcontrat.CA_LIEUNAISSANCE;
			this.MONTANTTTCPLUSAIRSI = clsCtcontrat.MONTANTTTCPLUSAIRSI;
			this.MONTANTTTCPLUSAIRSINF = clsCtcontrat.MONTANTTTCPLUSAIRSINF;
			this.CD_CODECONDITION = clsCtcontrat.CD_CODECONDITION;
			this.CD_LIBELLECONDITION = clsCtcontrat.CD_LIBELLECONDITION;
			this.CA_DUREEENMOIS = clsCtcontrat.CA_DUREEENMOIS;
			this.AC_SPORT = clsCtcontrat.AC_SPORT;
			this.CA_ADRESSE = clsCtcontrat.CA_ADRESSE;
			this.PL_NUMCOMPTETIERS = clsCtcontrat.PL_NUMCOMPTETIERS;
            this.CA_NOMBREPIECE = clsCtcontrat.CA_NOMBREPIECE;
			this.CA_SUPERFICIE = clsCtcontrat.CA_SUPERFICIE;
			this.CA_LOYERMENSUEL = clsCtcontrat.CA_LOYERMENSUEL;
			this.ST_LIBELLESTATUTSOCIOPROF = clsCtcontrat.ST_LIBELLESTATUTSOCIOPROF;
			this.CB_LIBELLEBRANCHE = clsCtcontrat.CB_LIBELLEBRANCHE;
			this.EN_LIBELLEENERGIE = clsCtcontrat.EN_LIBELLEENERGIE;
			this.AU_LIBELLECATEGORIE = clsCtcontrat.AU_LIBELLECATEGORIE;
			this.TA_LIBELLETARIF = clsCtcontrat.TA_LIBELLETARIF;
			this.US_LIBELLEUSAGE = clsCtcontrat.US_LIBELLEUSAGE;
			this.GE_LIBELLEGENRE = clsCtcontrat.GE_LIBELLEGENRE;
			this.TVH_LIBELE = clsCtcontrat.TVH_LIBELE;
			this.AP_LIBLLETYPEAPPARTEMENT = clsCtcontrat.AP_LIBLLETYPEAPPARTEMENT;
			this.OC_LIBLLETYPEOCCUPANT = clsCtcontrat.OC_LIBLLETYPEOCCUPANT;

			this.CA_NUMPASSEPORT = clsCtcontrat.CA_NUMPASSEPORT;
			this.PY_CODEPAYSDESTINATION = clsCtcontrat.PY_CODEPAYSDESTINATION;
			this.CA_DUREESEJOUR = clsCtcontrat.CA_DUREESEJOUR;
			this.CA_OPTION = clsCtcontrat.CA_OPTION;
			this.PY_LIBELLEDESTINATION = clsCtcontrat.PY_LIBELLEDESTINATION;  
 			this.AU_CODETYPECONTRATAUTO = clsCtcontrat.AU_CODETYPECONTRATAUTO;                       
			this.AU_LIBELLETYPECONTRATAUTO = clsCtcontrat.AU_LIBELLETYPECONTRATAUTO;
			this.NUMEROBORDEREAU = clsCtcontrat.NUMEROBORDEREAU;
			this.MS_NUMPIECE = clsCtcontrat.MS_NUMPIECE;
			this.ZN_CODEZONE = clsCtcontrat.ZN_CODEZONE;
			this.DATEJOURNEE = clsCtcontrat.DATEJOURNEE;
			this.LO_CODELOGICIEL = clsCtcontrat.LO_CODELOGICIEL;
			this.CA_STATUT = clsCtcontrat.CA_STATUT;
			this.MONTANTREGLEMENT = clsCtcontrat.MONTANTREGLEMENT;
			this.SOLDE = clsCtcontrat.SOLDE;
			this.PRIME = clsCtcontrat.PRIME;
			this.TI_EMAIL = clsCtcontrat.TI_EMAIL;
			this.CA_DATEDEMANDERENOUVELEMENT = clsCtcontrat.CA_DATEDEMANDERENOUVELEMENT;
			this.CA_CODECONTRATORIGINE = clsCtcontrat.CA_CODECONTRATORIGINE;
			this.RQ_CODERISQUEOBLIGATOIRE = clsCtcontrat.RQ_CODERISQUEOBLIGATOIRE;
            this.clsCtcontratgaranties = clsCtcontrat.clsCtcontratgaranties;
			this.clsCtcontratcommissionassurances = clsCtcontrat.clsCtcontratcommissionassurances;
			this.clsCtcontratprimes = clsCtcontrat.clsCtcontratprimes;
			this.clsCtcontratreductions = clsCtcontrat.clsCtcontratreductions;
			this.clsCtcontratayantdroits = clsCtcontrat.clsCtcontratayantdroits;
			this.clsCtcontratcapitauxs = clsCtcontrat.clsCtcontratcapitauxs;
			this.GR_CODEGARENTIEPRIME = clsCtcontrat.GR_CODEGARENTIEPRIME;
			this.GR_LIBELLEGARENTIEPRIME = clsCtcontrat.GR_LIBELLEGARENTIEPRIME;
			this.CA_OBSERVATION = clsCtcontrat.CA_OBSERVATION;
			this.MESSAGERELANCE = clsCtcontrat.MESSAGERELANCE;
			this.DE_CODEDEMANADE = clsCtcontrat.DE_CODEDEMANADE;
			this.TI_NUMWHATSAPP = clsCtcontrat.TI_NUMWHATSAPP;
			this.DUREE = clsCtcontrat.DUREE;
			this.EX_EXERCICE = clsCtcontrat.EX_EXERCICE;
			this.AS_NUMEROASSUREUR = clsCtcontrat.AS_NUMEROASSUREUR;

		}

		#endregion

	}
}
