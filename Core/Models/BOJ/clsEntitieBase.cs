using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Core
{
    public class clsEntitieBase
    {
        #region VARIABLES LOCALES
        private string _PREMIEREEXECUTION = "";
        private string _DATEPREMIEREEXECUTION = "";
        private string _OP_LOGIN = "";
        private string _EX_DATEAFFECTATIONRESULTAT = "";
        private string _DBUSER = "";
        private string _SL_LIBELLEMOUCHARD = "";
        private string _SL_LIBELLEECRAN = "";
        private string _LG_CODELANGUE = "";
        private string _SL_VALEURRETOURS = "";
        private string _TYPEOPERATION = "";
        private string _DATEDEBUT = "";
        private string _DATEFIN = "";
        private string _MONTANT1 = "";
        private string _MONTANT2 = "";
        private string _NOMETAT = "";
        private string _ENTETE1 = "";
        private string _ENTETE2 = "";
        private string _ENTETE3 = "";
        private string _ENTETE4 = "";

        private string _ET_INDEX = "";
        private string _ET_LIBELLEETAT = "";
        private string _ET_NOMGROUPE = "";
        private string _ET_DOSSIER = "";
        private string _ET_TYPEETAT1 = "";
        private string _ET_NOMETAT = "";
        private string _AG_RAISONSOCIALE = "";
        private string _SL_LOGIN = "";
        private string _SL_MOTDEPASSE = "";
        private string _SL_CLESESSION = "";
        private string _SL_VERSIONAPK = "";
        private string _SL_TOKEN = "";
        private clsObjetRetour _clsObjetRetour;
        private clsObjetEnvoi _clsObjetEnvoi;
        string[] _vappNomFormule;
        string[] _vappValeurFormule;
        private string _URL_ETAT = "";


        #endregion


        #region ACCESSEURS

        public string PREMIEREEXECUTION
        {
            get { return _PREMIEREEXECUTION; }
            set { _PREMIEREEXECUTION = value; }
        }

        public string DATEPREMIEREEXECUTION
        {
            get { return _DATEPREMIEREEXECUTION; }
            set { _DATEPREMIEREEXECUTION = value; }
        }

       
        public string OP_LOGIN
        {
            get { return _OP_LOGIN; }
            set { _OP_LOGIN = value; }
        }

        public string EX_DATEAFFECTATIONRESULTAT
        {
            get { return _EX_DATEAFFECTATIONRESULTAT; }
            set { _EX_DATEAFFECTATIONRESULTAT = value; }
        }
        public string DBUSER
        {
            get { return _DBUSER; }
            set { _DBUSER = value; }
        }


        public string SL_LIBELLEMOUCHARD
        {
            get { return _SL_LIBELLEMOUCHARD; }
            set { _SL_LIBELLEMOUCHARD = value; }
        }

        public string SL_LIBELLEECRAN
        {
            get { return _SL_LIBELLEECRAN; }
            set { _SL_LIBELLEECRAN = value; }
        }

        public string LG_CODELANGUE
        {
            get { return _LG_CODELANGUE; }
            set { _LG_CODELANGUE = value; }
        }


        public string SL_VALEURRETOURS
        {
            get { return _SL_VALEURRETOURS; }
            set { _SL_VALEURRETOURS = value; }
        }
        
        public string TYPEOPERATION
        {
            get { return _TYPEOPERATION; }
            set { _TYPEOPERATION = value; }
        }
        public string DATEDEBUT
        {
            get { return _DATEDEBUT; }
            set { _DATEDEBUT = value; }
        }
        public string DATEFIN
        {
            get { return _DATEFIN; }
            set { _DATEFIN = value; }
        }
        public string MONTANT1
        {
            get { return _MONTANT1; }
            set { _MONTANT1 = value; }
        }
        public string MONTANT2
        {
            get { return _MONTANT2; }
            set { _MONTANT2 = value; }
        }
        public string NOMETAT
        {
            get { return _NOMETAT; }
            set { _NOMETAT = value; }
        }
        public string ENTETE1
        {
            get { return _ENTETE1; }
            set { _ENTETE1 = value; }
        }
        public string ENTETE2
        {
            get { return _ENTETE2; }
            set { _ENTETE2 = value; }
        }
        public string ENTETE3
        {
            get { return _ENTETE3; }
            set { _ENTETE3 = value; }
        }
        public string ENTETE4
        {
            get { return _ENTETE4; }
            set { _ENTETE4 = value; }
        }
        public string SL_LOGIN
        {
            get { return _SL_LOGIN; }
            set { _SL_LOGIN = value; }
        }
        public string SL_MOTDEPASSE
        {
            get { return _SL_MOTDEPASSE; }
            set { _SL_MOTDEPASSE = value; }
        }
        public string SL_CLESESSION
        {
            get { return _SL_CLESESSION; }
            set { _SL_CLESESSION = value; }
        }
        public string SL_VERSIONAPK
        {
            get { return _SL_VERSIONAPK; }
            set { _SL_VERSIONAPK = value; }
        }
        public string SL_TOKEN
        {
            get { return _SL_TOKEN; }
            set { _SL_TOKEN = value; }
        }



        public string ET_INDEX
        {
            get { return _ET_INDEX; }
            set { _ET_INDEX = value; }
        }
        public string ET_NOMGROUPE
        {
            get { return _ET_NOMGROUPE; }
            set { _ET_NOMGROUPE = value; }
        }
        public string ET_DOSSIER
        {
            get { return _ET_DOSSIER; }
            set { _ET_DOSSIER = value; }
        }
        public string ET_TYPEETAT1
        {
            get { return _ET_TYPEETAT1; }
            set { _ET_TYPEETAT1 = value; }
        }

        public string ET_NOMETAT
        {
            get { return _ET_NOMETAT; }
            set { _ET_NOMETAT = value; }
        }

        public string ET_LIBELLEETAT
        {
            get { return _ET_LIBELLEETAT; }
            set { _ET_LIBELLEETAT = value; }
        }

        public string AG_RAISONSOCIALE
        {
            get { return _AG_RAISONSOCIALE; }
            set { _AG_RAISONSOCIALE = value; }
        }

        public clsObjetRetour clsObjetRetour
        {
            get { return _clsObjetRetour; }
            set { _clsObjetRetour = value; }
        }

        public clsObjetEnvoi clsObjetEnvoi
        {
            get { return _clsObjetEnvoi; }
            set { _clsObjetEnvoi = value; }
        }

        public string[] vappNomFormule
        {
            get { return _vappNomFormule; }
            set { _vappNomFormule = value; }
        }
        public string[] vappValeurFormule
        {
            get { return _vappValeurFormule; }
            set { _vappValeurFormule = value; }
        }

        public string URL_ETAT
        {
            get { return _URL_ETAT; }
            set { _URL_ETAT = value; }
        }

       

       
        #endregion


        #region INSTANCIATEURS 


        public clsEntitieBase() {}

      

        public clsEntitieBase(clsEntitieBase clsEntitieBase)
        {
            this.PREMIEREEXECUTION = clsEntitieBase.PREMIEREEXECUTION;
            this.DATEPREMIEREEXECUTION = clsEntitieBase.DATEPREMIEREEXECUTION;
            this.OP_LOGIN = clsEntitieBase.OP_LOGIN;
            this.EX_DATEAFFECTATIONRESULTAT = clsEntitieBase.EX_DATEAFFECTATIONRESULTAT;
            this.DBUSER = clsEntitieBase.DBUSER;
            this.SL_LIBELLEMOUCHARD = clsEntitieBase.SL_LIBELLEMOUCHARD;
            this.SL_LIBELLEECRAN = clsEntitieBase.SL_LIBELLEECRAN;
            this.LG_CODELANGUE = clsEntitieBase.LG_CODELANGUE;
            this.SL_VALEURRETOURS = clsEntitieBase.SL_VALEURRETOURS;
            this.DATEDEBUT = clsEntitieBase.DATEDEBUT;
            this.DATEFIN = clsEntitieBase.DATEFIN;
            this.MONTANT1 = clsEntitieBase.MONTANT1;
            this.MONTANT2 = clsEntitieBase.MONTANT2;
            this.NOMETAT = clsEntitieBase.NOMETAT;
            this.ENTETE1 = clsEntitieBase.ENTETE1;
            this.ENTETE2 = clsEntitieBase.ENTETE2;
            this.ENTETE3 = clsEntitieBase.ENTETE3;
            this.ENTETE4 = clsEntitieBase.ENTETE4;
            this.SL_LOGIN = clsEntitieBase.SL_LOGIN;
            this.SL_MOTDEPASSE = clsEntitieBase.SL_MOTDEPASSE;
            this.SL_CLESESSION = clsEntitieBase.SL_CLESESSION;
            this.SL_VERSIONAPK = clsEntitieBase.SL_VERSIONAPK;
            this.SL_TOKEN = clsEntitieBase.SL_TOKEN;

            this.ET_INDEX = clsEntitieBase.ET_INDEX;
            this.ET_NOMGROUPE = clsEntitieBase.ET_NOMGROUPE;
            this.ET_DOSSIER = clsEntitieBase.ET_DOSSIER;
            this.ET_NOMETAT = clsEntitieBase.ET_NOMETAT;
            this.ET_LIBELLEETAT = clsEntitieBase.ET_LIBELLEETAT;
            this.AG_RAISONSOCIALE = clsEntitieBase.AG_RAISONSOCIALE;
            this.ET_TYPEETAT1 = clsEntitieBase.ET_TYPEETAT1;
            this.TYPEOPERATION = clsEntitieBase.TYPEOPERATION;
            this.vappNomFormule = clsEntitieBase.vappNomFormule;
            this.vappValeurFormule = clsEntitieBase.vappValeurFormule;
            this.URL_ETAT = clsEntitieBase.URL_ETAT;
            
             

            this.clsObjetRetour = clsEntitieBase.clsObjetRetour;
            this.clsObjetEnvoi = clsEntitieBase.clsObjetEnvoi;
        }

        public clsEntitieBase SetValue(string SL_CODEMESSAGE, string SL_RESULTAT, string SL_MESSAGE)
        {
            return this;
        }
        
        public clsEntitieBase SetValue(string SL_CODEMESSAGE, string SL_RESULTAT)
		{
            return this;
		}


        public clsEntitieBase SetValueMessage(string SL_CODEMESSAGE, string SL_RESULTAT, string SL_MESSAGE)
        {
            return this;
        }
       
        #endregion
    }
}
