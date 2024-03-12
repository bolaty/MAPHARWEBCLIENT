//using Stock.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Core
{
	public class clsEditionEtatAssurance : Core.Common.clsEntitieBase
    {


        //    @AG_CODEAGENCE varchar(7000),
        //@OP_CODEOPERATEUREDITION AS VARCHAR(25),
        //@DATEDEBUT varchar(700),
        //@ET_TYPEETAT AS varchar(50),
        //clsEditionEtatAssurance.IDF = row["IDF"].ToString();
        //clsEditionEtatAssurance.RQ_LIBELLERISQUE = row["RQ_LIBELLERISQUE"].ToString();
        //clsEditionEtatAssurance.CA_DATEEFFET = row["CA_DATEEFFET"].ToString();
        //clsEditionEtatAssurance.CA_DATEECHEANCE = row["CA_DATEECHEANCE"].ToString();
        //clsEditionEtatAssurance.CA_NOMINTERLOCUTEUR = row["CA_NOMINTERLOCUTEUR"].ToString();
        //clsEditionEtatAssurance.CA_CONTACTINTERLOCUTEUR = row["CA_CONTACTINTERLOCUTEUR"].ToString();
        //clsEditionEtatAssurance.TI_IDTIERS = row["TI_IDTIERS"].ToString();
        //clsEditionEtatAssurance.TI_NUMTIERS = row["TI_NUMTIERS"].ToString();
        //clsEditionEtatAssurance.TI_DENOMINATION = row["TI_DENOMINATION"].ToString();
        //clsEditionEtatAssurance.TI_TELEPHONE = row["TI_TELEPHONE"].ToString();
        //clsEditionEtatAssurance.DESIGNATION = row["DESIGNATION"].ToString();
        //clsEditionEtatAssurance.PRIME = row["PRIME"].ToString();

        //clsEditionEtatAssurance.PERIODEGARANTIE = row["PERIODEGARANTIE"].ToString();
        //clsEditionEtatAssurance.BQ_RAISONSOCIAL = row["BQ_RAISONSOCIAL"].ToString();
        //clsEditionEtatAssurance.BQ_CODEBANQUE = row["BQ_CODEBANQUE"].ToString();
        //clsEditionEtatAssurance.DATEDEPOT = row["DATEDEPOT"].ToString();
        //clsEditionEtatAssurance.MONTANT = row["MONTANT"].ToString();
        //clsEditionEtatAssurance.MONTANTRESTAPAYER = row["MONTANTRESTAPAYER"].ToString();
        //clsEditionEtatAssurance.MV_REFERENCEPIECE = row["MV_REFERENCEPIECE"].ToString();
        //clsEditionEtatAssurance.ZM_CODEZONEMALADIE = row["ZM_CODEZONEMALADIE"].ToString();
        //clsEditionEtatAssurance.ZA_CODEZONEAUTO = row["ZA_CODEZONEAUTO"].ToString();
        //clsEditionEtatAssurance.ZA_NOMZONEAUTO = row["ZA_NOMZONEAUTO"].ToString();
        //clsEditionEtatAssurance.CA_IMMATRICULATION = row["CA_IMMATRICULATION"].ToString();
        //clsEditionEtatAssurance.CO_LIBELLE = row["CO_LIBELLE"].ToString();
        //clsEditionEtatAssurance.ZN_NOMZONE = row["ZN_NOMZONE"].ToString();
        //clsEditionEtatAssurance.NS_LIBELLENATURESINISTRE = row["NS_LIBELLENATURESINISTRE"].ToString();
        //clsEditionEtatAssurance.SI_DATESINISTRE = row["SI_DATESINISTRE"].ToString();
        //clsEditionEtatAssurance.SI_DOCUMENTTRANSMIS = row["SI_DOCUMENTTRANSMIS"].ToString();
        //clsEditionEtatAssurance.SI_DATETRANSMISSIONSINISTRE = row["SI_DATETRANSMISSIONSINISTRE"].ToString();
        //clsEditionEtatAssurance.SI_MONTANTPREJUDICE = row["SI_MONTANTPREJUDICE"].ToString();
        //clsEditionEtatAssurance.SI_NUMSINISTRE = row["SI_NUMSINISTRE"].ToString();
        //clsEditionEtatAssurance.TI_ADRESSEGEOGRAPHIQUE = row["TI_ADRESSEGEOGRAPHIQUE"].ToString();
        //clsEditionEtatAssurance.EP_DENOMMINATIONEXPERTNOMME = row["EP_DENOMMINATIONEXPERTNOMME"].ToString();
        //clsEditionEtatAssurance.SD_DESCRIPTIONEVENEMENT = row["SD_DESCRIPTIONEVENEMENT"].ToString();


        private string _AG_CODEAGENCE = "";
        private string _EN_CODEENTREPOT = "";
        private string _CA_CODECONTRAT = "";
        private string _OP_CODEOPERATEUREDITION = "";
        private string _OP_CODEOPERATEUR = "";
        // private string _DATEDEBUT = "";
        //  private string _DATEFIN = "";
        private string _CA_NUMPOLICE = "";
        private string _RQ_CODERISQUE = "";
        private string _ET_TYPEETAT = "";
        private string _ET_TYPERETOURS = "";
        private string _TI_IDTIERS = "";
        private string _TI_NUMTIERS = "";
        private string _TA_CODETYPEAFFAIRES = "";
        private string _CT_CODESTAUT = "";

        private string _IDF = "";
        private string _RQ_LIBELLERISQUE = "";
        private string _CA_DATEEFFET = "";
        private string _CA_DATEECHEANCE = "";
        private string _CA_NOMINTERLOCUTEUR = "";
        private string _CA_CONTACTINTERLOCUTEUR = "";

        private string _DESIGNATION = "";
        private string _TI_TELEPHONE = "";
        private string _TI_DENOMINATION = "";
        private double _PRIME = 0;
        private string _PERIODEGARANTIE = "";
        private string _BQ_RAISONSOCIAL = "";
        private string _BQ_CODEBANQUE = "";
        private string _DATEDEPOT = "";
        private double _MONTANT = 0;
        private double _MONTANTRESTAPAYER = 0;
        private string _MV_REFERENCEPIECE = "";
        private string _ZM_CODEZONEMALADIE = "";
        private string _ZA_CODEZONEAUTO = "";
        private string _ZA_NOMZONEAUTO = "";
        private string _CA_IMMATRICULATION = "";
        private string _CO_LIBELLE = "";
        private string _ZN_NOMZONE = "";
        private string _NS_LIBELLENATURESINISTRE = "";
        private string _SI_DATESINISTRE = "";
        private string _SI_DOCUMENTTRANSMIS = "";
        private string _SI_DATETRANSMISSIONSINISTRE = "";
        private double _SI_MONTANTPREJUDICE = 0;
        private string _SI_NUMSINISTRE = "";
        private string _TI_ADRESSEGEOGRAPHIQUE = "";
        private string _EP_DENOMMINATIONEXPERTNOMME = "";
        private string _SD_DESCRIPTIONEVENEMENT = "";
        private string _VL_CODEVILLE = "";
        private string _CO_CODECOMMUNE = "";        
        private string _PY_CODEPAYS = "";     
        private string _TI_IDTIERSCOMMERCIAL = "";  
        private string _ZN_CODEZONECOMMERCIAL = "";  
        private string _NS_CODENATURESINISTRE = "";  
        private string _OP_NOMPRENOM = "";  
        private string _TI_EMAIL = "";

        private string _CH_REFCHEQUE = "";
        private string _CH_NOMTIREUR = "";
        private string _CH_NOMTIRE = "";
        private string _CH_NOMDUDEPOSANT = "";
        private string _CH_TELEPHONEDEPOSANT = "";
        private string _CH_DATESAISIECHEQUE = "";
        private double _CH_VALEURCHEQUE = 0;
        private string _CH_DATEVALIDATIONCHEQUE = "";
        private string _GR_LIBELLEGARENTIEPRIME = "";
        private double _MONTANTCHEQUE = 0;
        private double _MONTANTESPECE = 0;
        private string _AB_LIBELLE = "";
        private string _TA_LIBLLETYPEAFFAIRES = "";
        private string _CA_OBSERVATION = "";
        private string _TI_NUMEROAXA = "";
        private double _MONTANTCOMMISSION_A_PAYER = 0;
        private double _MONTANTCOMMISSIONPAYER = 0;
        private double _MONTANTCOMMISSION_RESTANT_A_PAYER = 0;
        private string _TI_NUMTIERSCOMMERCIAL = "";
        private string _TI_DENOMINATIONCOMMERCIAL = "";        
        private double _CHIFFREAFFAIRE = 0;
        private double _RENOUVELLEMENT = 0;
        private double _AFFAIRENOUVELLE = 0;
        private string _TVH_LIBELE = ""; 
        private string _TI_IDTIERSCLIENT = ""; 

         public string TI_IDTIERSCLIENT
        {
            get { return _TI_IDTIERSCLIENT; }
            set { _TI_IDTIERSCLIENT = value; }
        }
        public string RQ_LIBELLERISQUE
        {
            get { return _RQ_LIBELLERISQUE; }
            set { _RQ_LIBELLERISQUE = value; }
        }

        public string IDF
        {
            get { return _IDF; }
            set { _IDF = value; }
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

        public string CA_NOMINTERLOCUTEUR
        {
            get { return _CA_NOMINTERLOCUTEUR; }
            set { _CA_NOMINTERLOCUTEUR = value; }
        }

        public string CA_CONTACTINTERLOCUTEUR
        {
            get { return _CA_CONTACTINTERLOCUTEUR; }
            set { _CA_CONTACTINTERLOCUTEUR = value; }
        }

        public string AG_CODEAGENCE
		{
			get { return _AG_CODEAGENCE; }
			set { _AG_CODEAGENCE = value; }
		}

        public string EN_CODEENTREPOT
        {
            get { return _EN_CODEENTREPOT; }
            set { _EN_CODEENTREPOT = value; }
        }

        public string CA_CODECONTRAT
        {
            get { return _CA_CODECONTRAT; }
            set { _CA_CODECONTRAT = value; }
        }

		public string OP_CODEOPERATEUREDITION
		{
			get { return _OP_CODEOPERATEUREDITION; }
			set { _OP_CODEOPERATEUREDITION = value; }
		}

        public string OP_CODEOPERATEUR
		{
            get { return _OP_CODEOPERATEUR; }
            set { _OP_CODEOPERATEUR = value; }
		}

       /* public string DATEDEBUT
		{
            get { return _DATEDEBUT; }
            set { _DATEDEBUT = value; }
		}

        public string DATEFIN
		{
            get { return _DATEFIN; }
            set { _DATEFIN = value; }
		}*/

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
       
        public string ET_TYPEETAT
		{
            get { return _ET_TYPEETAT; }
            set { _ET_TYPEETAT = value; }
		}

        public string ET_TYPERETOURS
		{
            get { return _ET_TYPERETOURS; }
            set { _ET_TYPERETOURS = value; }
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

        public string TA_CODETYPEAFFAIRES
        {
            get { return _TA_CODETYPEAFFAIRES; }
            set { _TA_CODETYPEAFFAIRES = value; }
        }
          
        public string CT_CODESTAUT
        {
            get { return _CT_CODESTAUT; }
            set { _CT_CODESTAUT = value; }
        }


        public string DESIGNATION
        {
            get { return _DESIGNATION; }
            set { _DESIGNATION = value; }
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
        public double PRIME
        {
            get { return _PRIME; }
            set { _PRIME = value; }
        }
        public string PERIODEGARANTIE
        {
            get { return _PERIODEGARANTIE; }
            set { _PERIODEGARANTIE = value; }
        }
        public string BQ_RAISONSOCIAL
        {
            get { return _BQ_RAISONSOCIAL; }
            set { _BQ_RAISONSOCIAL = value; }
        }
        public string BQ_CODEBANQUE
        {
            get { return _BQ_CODEBANQUE; }
            set { _BQ_CODEBANQUE = value; }
        }
        public string DATEDEPOT
        {
            get { return _DATEDEPOT; }
            set { _DATEDEPOT = value; }
        }
        public double MONTANT
        {
            get { return _MONTANT; }
            set { _MONTANT = value; }
        }
        public double MONTANTRESTAPAYER
        {
            get { return _MONTANTRESTAPAYER; }
            set { _MONTANTRESTAPAYER = value; }
        }
        public string MV_REFERENCEPIECE
        {
            get { return _MV_REFERENCEPIECE; }
            set { _MV_REFERENCEPIECE = value; }
        }
        public string ZM_CODEZONEMALADIE
        {
            get { return _ZM_CODEZONEMALADIE; }
            set { _ZM_CODEZONEMALADIE = value; }
        }
        public string ZA_CODEZONEAUTO
        {
            get { return _ZA_CODEZONEAUTO; }
            set { _ZA_CODEZONEAUTO = value; }
        }
        public string ZA_NOMZONEAUTO
        {
            get { return _ZA_NOMZONEAUTO; }
            set { _ZA_NOMZONEAUTO = value; }
        }
        public string CA_IMMATRICULATION
        {
            get { return _CA_IMMATRICULATION; }
            set { _CA_IMMATRICULATION = value; }
        }
        public string CO_LIBELLE
        {
            get { return _CO_LIBELLE; }
            set { _CO_LIBELLE = value; }
        }
        public string ZN_NOMZONE
        {
            get { return _ZN_NOMZONE; }
            set { _ZN_NOMZONE = value; }
        }
        public string NS_LIBELLENATURESINISTRE
        {
            get { return _NS_LIBELLENATURESINISTRE; }
            set { _NS_LIBELLENATURESINISTRE = value; }
        }
        public string SI_DATESINISTRE
        {
            get { return _SI_DATESINISTRE; }
            set { _SI_DATESINISTRE = value; }
        }
        public string SI_DOCUMENTTRANSMIS
        {
            get { return _SI_DOCUMENTTRANSMIS; }
            set { _SI_DOCUMENTTRANSMIS = value; }
        }
        public string SI_DATETRANSMISSIONSINISTRE
        {
            get { return _SI_DATETRANSMISSIONSINISTRE; }
            set { _SI_DATETRANSMISSIONSINISTRE = value; }
        }
        public double SI_MONTANTPREJUDICE
        {
            get { return _SI_MONTANTPREJUDICE; }
            set { _SI_MONTANTPREJUDICE = value; }
        }
        public string SI_NUMSINISTRE
        {
            get { return _SI_NUMSINISTRE; }
            set { _SI_NUMSINISTRE = value; }
        }
        public string TI_ADRESSEGEOGRAPHIQUE
        {
            get { return _TI_ADRESSEGEOGRAPHIQUE; }
            set { _TI_ADRESSEGEOGRAPHIQUE = value; }
        }
        public string EP_DENOMMINATIONEXPERTNOMME
        {
            get { return _EP_DENOMMINATIONEXPERTNOMME; }
            set { _EP_DENOMMINATIONEXPERTNOMME = value; }
        }
        public string SD_DESCRIPTIONEVENEMENT
        {
            get { return _SD_DESCRIPTIONEVENEMENT; }
            set { _SD_DESCRIPTIONEVENEMENT = value; }
        }

        public string VL_CODEVILLE
        {
            get { return _VL_CODEVILLE; }
            set { _VL_CODEVILLE = value; }
        }
        public string CO_CODECOMMUNE
        {
            get { return _CO_CODECOMMUNE; }
            set { _CO_CODECOMMUNE = value; }
        }
        public string PY_CODEPAYS
        {
            get { return _PY_CODEPAYS; }
            set { _PY_CODEPAYS = value; }
        }
        public string TI_IDTIERSCOMMERCIAL
        {
            get { return _TI_IDTIERSCOMMERCIAL; }
            set { _TI_IDTIERSCOMMERCIAL = value; }
        }
        public string ZN_CODEZONECOMMERCIAL
        {
            get { return _ZN_CODEZONECOMMERCIAL; }
            set { _ZN_CODEZONECOMMERCIAL = value; }
        }



        public string NS_CODENATURESINISTRE
        {
            get { return _NS_CODENATURESINISTRE; }
            set { _NS_CODENATURESINISTRE = value; }
        }
        public string OP_NOMPRENOM
        {
            get { return _OP_NOMPRENOM; }
            set { _OP_NOMPRENOM = value; }
        }
        public string TI_EMAIL
        {
            get { return _TI_EMAIL; }
            set { _TI_EMAIL = value; }
        }

        public string CH_REFCHEQUE
        {
            get { return _CH_REFCHEQUE; }
            set { _CH_REFCHEQUE = value; }
        }
        public string CH_NOMTIREUR
        {
            get { return _CH_NOMTIREUR; }
            set { _CH_NOMTIREUR = value; }
        }
        public string CH_NOMTIRE
        {
            get { return _CH_NOMTIRE; }
            set { _CH_NOMTIRE = value; }
        }
        public string CH_NOMDUDEPOSANT
        {
            get { return _CH_NOMDUDEPOSANT; }
            set { _CH_NOMDUDEPOSANT = value; }
        }
        public string CH_TELEPHONEDEPOSANT
        {
            get { return _CH_TELEPHONEDEPOSANT; }
            set { _CH_TELEPHONEDEPOSANT = value; }
        }
        public string CH_DATESAISIECHEQUE
        {
            get { return _CH_DATESAISIECHEQUE; }
            set { _CH_DATESAISIECHEQUE = value; }
        }
        public double CH_VALEURCHEQUE
        {
            get { return _CH_VALEURCHEQUE; }
            set { _CH_VALEURCHEQUE = value; }
        }
        public string CH_DATEVALIDATIONCHEQUE
        {
            get { return _CH_DATEVALIDATIONCHEQUE; }
            set { _CH_DATEVALIDATIONCHEQUE = value; }
        }
        public string GR_LIBELLEGARENTIEPRIME
        {
            get { return _GR_LIBELLEGARENTIEPRIME; }
            set { _GR_LIBELLEGARENTIEPRIME = value; }
        }
        public double MONTANTCHEQUE
        {
            get { return _MONTANTCHEQUE; }
            set { _MONTANTCHEQUE = value; }
        }
        public double MONTANTESPECE
        {
            get { return _MONTANTESPECE; }
            set { _MONTANTESPECE = value; }
        }
        public string AB_LIBELLE
        {
            get { return _AB_LIBELLE; }
            set { _AB_LIBELLE = value; }
        }
        public string TA_LIBLLETYPEAFFAIRES
        {
            get { return _TA_LIBLLETYPEAFFAIRES; }
            set { _TA_LIBLLETYPEAFFAIRES = value; }
        }
        public string CA_OBSERVATION
        {
            get { return _CA_OBSERVATION; }
            set { _CA_OBSERVATION = value; }
        }
        public string TI_NUMEROAXA
        {
            get { return _TI_NUMEROAXA; }
            set { _TI_NUMEROAXA = value; }
        }

        public double MONTANTCOMMISSION_A_PAYER
        {
            get { return _MONTANTCOMMISSION_A_PAYER; }
            set { _MONTANTCOMMISSION_A_PAYER = value; }
        }
        public double MONTANTCOMMISSIONPAYER
        {
            get { return _MONTANTCOMMISSIONPAYER; }
            set { _MONTANTCOMMISSIONPAYER = value; }
        }
        public double MONTANTCOMMISSION_RESTANT_A_PAYER
        {
            get { return _MONTANTCOMMISSION_RESTANT_A_PAYER; }
            set { _MONTANTCOMMISSION_RESTANT_A_PAYER = value; }
        }
        public string TI_NUMTIERSCOMMERCIAL
        {
            get { return _TI_NUMTIERSCOMMERCIAL; }
            set { _TI_NUMTIERSCOMMERCIAL = value; }
        }
        public string TI_DENOMINATIONCOMMERCIAL
        {
            get { return _TI_DENOMINATIONCOMMERCIAL; }
            set { _TI_DENOMINATIONCOMMERCIAL = value; }
        }
       
        public double CHIFFREAFFAIRE
        {
            get { return _CHIFFREAFFAIRE; }
            set { _CHIFFREAFFAIRE = value; }
        }
        public double RENOUVELLEMENT
        {
            get { return _RENOUVELLEMENT; }
            set { _RENOUVELLEMENT = value; }
        }
        public double AFFAIRENOUVELLE
        {
            get { return _AFFAIRENOUVELLE; }
            set { _AFFAIRENOUVELLE = value; }
        }
        public string TVH_LIBELE
        {
            get { return _TVH_LIBELE; }
            set { _TVH_LIBELE = value; }
        }

        public clsEditionEtatAssurance() {} 

		

		public clsEditionEtatAssurance(clsEditionEtatAssurance clsEditionEtatAssurance)
		{
			AG_CODEAGENCE = clsEditionEtatAssurance.AG_CODEAGENCE;
            EN_CODEENTREPOT = clsEditionEtatAssurance.EN_CODEENTREPOT;
            CA_CODECONTRAT = clsEditionEtatAssurance.CA_CODECONTRAT;
			OP_CODEOPERATEUREDITION = clsEditionEtatAssurance.OP_CODEOPERATEUREDITION;
            OP_CODEOPERATEUR = clsEditionEtatAssurance.OP_CODEOPERATEUR;
            /*DATEDEBUT = clsEditionEtatAssurance.DATEDEBUT;
            DATEFIN = clsEditionEtatAssurance.DATEFIN;*/
            CA_NUMPOLICE = clsEditionEtatAssurance.CA_NUMPOLICE;
            RQ_CODERISQUE = clsEditionEtatAssurance.RQ_CODERISQUE;
            ET_TYPEETAT = clsEditionEtatAssurance.ET_TYPEETAT;
            ET_TYPERETOURS = clsEditionEtatAssurance.ET_TYPERETOURS;
            TI_IDTIERS = clsEditionEtatAssurance.TI_IDTIERS;
            TI_NUMTIERS = clsEditionEtatAssurance.TI_NUMTIERS;
            TA_CODETYPEAFFAIRES = clsEditionEtatAssurance.TA_CODETYPEAFFAIRES;
            CT_CODESTAUT = clsEditionEtatAssurance.CT_CODESTAUT;

            SD_DESCRIPTIONEVENEMENT = clsEditionEtatAssurance.SD_DESCRIPTIONEVENEMENT;
            EP_DENOMMINATIONEXPERTNOMME = clsEditionEtatAssurance.EP_DENOMMINATIONEXPERTNOMME;
            TI_ADRESSEGEOGRAPHIQUE = clsEditionEtatAssurance.TI_ADRESSEGEOGRAPHIQUE;
            SI_NUMSINISTRE = clsEditionEtatAssurance.SI_NUMSINISTRE;
            SI_MONTANTPREJUDICE = clsEditionEtatAssurance.SI_MONTANTPREJUDICE;
            SI_DATETRANSMISSIONSINISTRE = clsEditionEtatAssurance.SI_DATETRANSMISSIONSINISTRE;
            SI_DOCUMENTTRANSMIS = clsEditionEtatAssurance.SI_DOCUMENTTRANSMIS;
            SI_DATESINISTRE = clsEditionEtatAssurance.SI_DATESINISTRE;
            NS_LIBELLENATURESINISTRE = clsEditionEtatAssurance.NS_LIBELLENATURESINISTRE;
            ZN_NOMZONE = clsEditionEtatAssurance.ZN_NOMZONE;
            CO_LIBELLE = clsEditionEtatAssurance.CO_LIBELLE;
            CA_IMMATRICULATION = clsEditionEtatAssurance.CA_IMMATRICULATION;
            ZA_NOMZONEAUTO = clsEditionEtatAssurance.ZA_NOMZONEAUTO;
            ZA_CODEZONEAUTO = clsEditionEtatAssurance.ZA_CODEZONEAUTO;
            ZM_CODEZONEMALADIE = clsEditionEtatAssurance.ZM_CODEZONEMALADIE;
            MV_REFERENCEPIECE = clsEditionEtatAssurance.MV_REFERENCEPIECE;
            MONTANTRESTAPAYER = clsEditionEtatAssurance.MONTANTRESTAPAYER;
            MONTANT = clsEditionEtatAssurance.MONTANT;
            DATEDEPOT = clsEditionEtatAssurance.DATEDEPOT;
            BQ_CODEBANQUE = clsEditionEtatAssurance.BQ_CODEBANQUE;
            BQ_RAISONSOCIAL = clsEditionEtatAssurance.BQ_RAISONSOCIAL;
            PERIODEGARANTIE = clsEditionEtatAssurance.PERIODEGARANTIE;
            PRIME = clsEditionEtatAssurance.PRIME;
            TI_DENOMINATION = clsEditionEtatAssurance.TI_DENOMINATION;
            TI_TELEPHONE = clsEditionEtatAssurance.TI_TELEPHONE;
            DESIGNATION = clsEditionEtatAssurance.DESIGNATION;
            IDF = clsEditionEtatAssurance.IDF;

            RQ_LIBELLERISQUE = clsEditionEtatAssurance.RQ_LIBELLERISQUE;
            CA_DATEEFFET = clsEditionEtatAssurance.CA_DATEEFFET;
            CA_DATEECHEANCE = clsEditionEtatAssurance.CA_DATEECHEANCE;
            CA_NOMINTERLOCUTEUR = clsEditionEtatAssurance.CA_NOMINTERLOCUTEUR;
            CA_CONTACTINTERLOCUTEUR = clsEditionEtatAssurance.CA_CONTACTINTERLOCUTEUR;
            VL_CODEVILLE = clsEditionEtatAssurance.VL_CODEVILLE;
            CO_CODECOMMUNE = clsEditionEtatAssurance.CO_CODECOMMUNE;
            PY_CODEPAYS = clsEditionEtatAssurance.PY_CODEPAYS;
            TI_IDTIERSCOMMERCIAL = clsEditionEtatAssurance.TI_IDTIERSCOMMERCIAL;
            ZN_CODEZONECOMMERCIAL = clsEditionEtatAssurance.ZN_CODEZONECOMMERCIAL;
            NS_CODENATURESINISTRE = clsEditionEtatAssurance.NS_CODENATURESINISTRE;
            OP_NOMPRENOM = clsEditionEtatAssurance.OP_NOMPRENOM;
            TI_EMAIL = clsEditionEtatAssurance.TI_EMAIL;

            CH_REFCHEQUE = clsEditionEtatAssurance.CH_REFCHEQUE;
            CH_NOMTIREUR = clsEditionEtatAssurance.CH_NOMTIREUR;
            CH_NOMTIRE = clsEditionEtatAssurance.CH_NOMTIRE;
            CH_NOMDUDEPOSANT = clsEditionEtatAssurance.CH_NOMDUDEPOSANT;
            CH_TELEPHONEDEPOSANT = clsEditionEtatAssurance.CH_TELEPHONEDEPOSANT;
            CH_DATESAISIECHEQUE = clsEditionEtatAssurance.CH_DATESAISIECHEQUE;
            CH_VALEURCHEQUE = clsEditionEtatAssurance.CH_VALEURCHEQUE;
            CH_DATEVALIDATIONCHEQUE = clsEditionEtatAssurance.CH_DATEVALIDATIONCHEQUE;
            GR_LIBELLEGARENTIEPRIME = clsEditionEtatAssurance.GR_LIBELLEGARENTIEPRIME;
            MONTANTCHEQUE = clsEditionEtatAssurance.MONTANTCHEQUE;
            MONTANTESPECE = clsEditionEtatAssurance.MONTANTESPECE;
            AB_LIBELLE = clsEditionEtatAssurance.AB_LIBELLE;
            TA_LIBLLETYPEAFFAIRES = clsEditionEtatAssurance.TA_LIBLLETYPEAFFAIRES;
            CA_OBSERVATION = clsEditionEtatAssurance.CA_OBSERVATION;
            TI_NUMEROAXA = clsEditionEtatAssurance.TI_NUMEROAXA;
            MONTANTCOMMISSION_A_PAYER = clsEditionEtatAssurance.MONTANTCOMMISSION_A_PAYER;
            MONTANTCOMMISSIONPAYER = clsEditionEtatAssurance.MONTANTCOMMISSIONPAYER;
            MONTANTCOMMISSION_RESTANT_A_PAYER = clsEditionEtatAssurance.MONTANTCOMMISSION_RESTANT_A_PAYER;
            TI_NUMTIERSCOMMERCIAL = clsEditionEtatAssurance.TI_NUMTIERSCOMMERCIAL;
            TI_DENOMINATIONCOMMERCIAL = clsEditionEtatAssurance.TI_DENOMINATIONCOMMERCIAL;
            CHIFFREAFFAIRE = clsEditionEtatAssurance.CHIFFREAFFAIRE;
            RENOUVELLEMENT = clsEditionEtatAssurance.RENOUVELLEMENT;
            AFFAIRENOUVELLE = clsEditionEtatAssurance.AFFAIRENOUVELLE;
            TVH_LIBELE = clsEditionEtatAssurance.TVH_LIBELE;
            TI_IDTIERSCLIENT = clsEditionEtatAssurance.TI_IDTIERSCLIENT;

            //clsEditionEtatAssurance.MONTANTCOMMISSION_A_PAYER = row["MONTANTCOMMISSION_A_PAYER"].ToString();
            //clsEditionEtatAssurance.MONTANTCOMMISSIONPAYER = row["MONTANTCOMMISSIONPAYER"].ToString();
            //clsEditionEtatAssurance.MONTANTCOMMISSION_RESTANT_A_PAYER = row["MONTANTCOMMISSION_RESTANT_A_PAYER"].ToString();



        }
    }
}