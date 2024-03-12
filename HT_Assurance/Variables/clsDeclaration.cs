
using System.Collections.Generic;
using System.Web.Hosting;

namespace HT_Assurance
{
    public class clsDeclaration
    {
        #region variable de connexion
        public static bool loginState = false;
        public static bool TestConnexionServeur = false;
        #endregion

        #region identification de l'utilisateur connecté
        //public static clsOperateur session_utilisateur = new clsOperateur();  // Déclaration d'une instance de l'objet operateurs
        //public static List<clsOrgfonction> list_fonction = new List<clsOrgfonction>();  // Déclaration d'une instance de liste des fonctions
        //public static List<MembreEq> list_equipemembre = new List<MembreEq>();  // Déclaration d'une instance de liste des membres d'équipe
        //public static List<Document> list_Document = new List<Document>();  // Déclaration d'une instance de liste des Document
        //public static clsExercice clsExerciceEnCours = new clsExercice();  // Déclaration d'une instance de liste des Document
        //public static clsJourneetravail clsJourneetravailEnCours = new clsJourneetravail();  // Déclaration d'une instance de liste des Document
        #endregion

        #region path for save document
        public static string ROOT = "";
        public static string IDSINISTRE = "100000000000000000000000002";
        #endregion

        #region mode de gestion
        public static string MODEGESTION = "";
        #endregion

        #region selon ecran
        public static string SELONECRAN = "";
        #endregion
        public static string FORMATETAT = "";



        #region etat
        public static string CHEMIN_ETATS = HostingEnvironment.MapPath("~/Etats/");
        public static string CHEMIN_REPORTS = HostingEnvironment.MapPath("~/Reports/");
       

        public static string NOM_ETAT_EN_COURS = "";
        public static string NOM_ETAT_EN_COURS2 = "";
        public static List<HT_Stock.BOJ.clsEditionEtatParametre> SOURCE_DE_DONNEE = new List<HT_Stock.BOJ.clsEditionEtatParametre>();
        public static List<HT_Stock.BOJ.clsPhamouvementstockreglement> SOURCE_DE_DONNEERECU = new List<HT_Stock.BOJ.clsPhamouvementstockreglement>();
        public static List<HT_Assurance.clsEditionEtatAssurance> SOURCE_DE_DONNEEASSURANCE = new List<HT_Assurance.clsEditionEtatAssurance>();
        public static List<HT_Assurance.clsEditionEtatAssurance> SOURCE_DE_DONNEEASSURANCE2 = new List<HT_Assurance.clsEditionEtatAssurance>();

        //public static List<HT_Stock.BOJ.clsCtcontratchequephoto> SOURCE_DE_DONNEEIMPRESSIONPHOTOCHEQUE = new List<HT_Stock.BOJ.clsCtcontratchequephoto>();
        //public static List<HT_Stock.BOJ.clsCtcontratchequephoto> SOURCE_DE_DONNEELISTEDESCHEQUES = new List<HT_Stock.BOJ.clsCtcontratchequephoto>();
        public static List<HT_Assurance.clsCtcontratchequephoto> SOURCE_DE_DONNEEREMISEDECHECQUE = new List<HT_Assurance.clsCtcontratchequephoto>();
        public static List<HT_Assurance.clsCtcontratchequephoto> SOURCE_DE_DONNEEIMPRESSIONPHOTOCHEQUE = new List<HT_Assurance.clsCtcontratchequephoto>();

        public static List<HT_Assurance.clsCtcontratchequephoto> SOURCE_DE_DONNEELISTEDESCHEQUES = new List<HT_Assurance.clsCtcontratchequephoto>();


        public static List<HT_Stock.BOJ.clsEditionEtatCaisse> SOURCE_DE_DONNEE_EDITION_TRESORERIE_1 = new List<HT_Stock.BOJ.clsEditionEtatCaisse>();
        public static List<HT_Stock.BOJ.clsEditionEtatStock> SOURCE_DE_DONNEE_EDITION_TRESORERIE_2 = new List<HT_Stock.BOJ.clsEditionEtatStock>();
        public static List<HT_Stock.BOJ.clsPhamouvementstockreglement> SOURCE_DE_DONNEE_EDITION_RECUREGLEMENT = new List<HT_Stock.BOJ.clsPhamouvementstockreglement>();
        public static List<HT_Stock.BOJ.clsPhamouvementstockreglement> SOURCE_DE_DONNEE_PHOTO = new List<HT_Stock.BOJ.clsPhamouvementstockreglement>();

        public static List<HT_Stock.BOJ.clsEditionEtatClientFournisseur> SOURCE_DE_DONNEE_EDITION_TIERS = new List<HT_Stock.BOJ.clsEditionEtatClientFournisseur>();

        public static List<HT_Stock.BOJ.clsEditionEtatParametre> SOURCE_DE_DONNEE_PARAMETRE_II_BLOC_1 = new List<HT_Stock.BOJ.clsEditionEtatParametre>();
        public static List<HT_Stock.BOJ.clsEditionEtatImmobilisation> SOURCE_DE_DONNEE_PARAMETRE_II_BLOC_2 = new List<HT_Stock.BOJ.clsEditionEtatImmobilisation>();
        public static List<HT_Stock.BOJ.clsPlancomptable> SOURCE_DE_DONNEE_PARAMETRE_II_BLOC_3 = new List<HT_Stock.BOJ.clsPlancomptable>();

        public static List<HT_Stock.BOJ.clsEditionEtatCaisse> SOURCE_DE_DONNEE_EDITION_COMPTABILITE_1 = new List<HT_Stock.BOJ.clsEditionEtatCaisse>();
        public static List<HT_Stock.BOJ.clsEditionEtatCaisse> SOURCE_DE_DONNEE_EDITION_COMPTABILITE_1_2 = new List<HT_Stock.BOJ.clsEditionEtatCaisse>();
        public static List<HT_Stock.BOJ.clsEditionEtatCaisse> SOURCE_DE_DONNEE_EDITION_COMPTABILITE_1_3 = new List<HT_Stock.BOJ.clsEditionEtatCaisse>();
        public static List<HT_Stock.BOJ.clsEditionEtatStock> SOURCE_DE_DONNEE_EDITION_COMPTABILITE_2 = new List<HT_Stock.BOJ.clsEditionEtatStock>();

        public static List<HT_Stock.BOJ.clsEditionEtatOutilsSecurite> SOURCE_DE_DONNEE_EDITION_OUTILS_SECURITES = new List<HT_Stock.BOJ.clsEditionEtatOutilsSecurite>();

        public static List<HT_Stock.BOJ.clsCtsinistre> SOURCE_DE_DONNEE_RELEVE_CLIENT = new List<HT_Stock.BOJ.clsCtsinistre>();

        public static string[] vappNomFormule = new string[] { };
        public static object[] vappValeurFormule = new string[] { "Entete1", "Entete2", "Entete3", "Entete4", "LibelleEtat" };
        public static string URL_DOSSIER_ETATS = Assurance.Outils.ReferencesGenerales.URL_ROOT_DOSSIER + "Etats/";
        public static string ENTETE1_VALEUR = "";
        public static string ENTETE2_VALEUR = "";
        public static string ENTETE3_VALEUR = "";
        public static string ENTETE4_VALEUR = "";
        public static string LIBELLE_ETAT = "";
        public static string Date1 = "";
        public static string Date2 = "";
        #endregion

    }
}
