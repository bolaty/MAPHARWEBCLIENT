using System;
using System.Configuration;
using System.Web.Hosting;

namespace Core
{
    public class clsDeclaration
    {
        #region CONSTANTE
        public const int TIMEOUT = 90000;
        public const int VAL_RAND_MIN = 0;
        public const int VAL_RAND_MAX = 1000000;
        #endregion

        #region MESSAGE ERREURS
        public const string ERR_MSG_CONN = "Impossible d'atteindre l'hôte. Veuillez vérifier votre connexion internet ou URL ou IP ou port ou class ou méthode ou protocole ou service.";
        public const string SUCCESS_MSG_OPERATION = "Opération effectuée avec succès.";
        public const string ERR_MSG_COMPARAISON_DATEDEBUT_DATEFIN = "La date de début ne doit pas être supérieure à la date de fin .";
        public const string ERR_MSG_COMPARAISON_DATEJOURNEE_DATECREATION = "La date de création ne doit pas être supérieure à la date de la journée .";
        public const string ERR_MSG_COMPARAISON_DATEJOURNEE_DATEFIN = "La date de fin ne doit pas être supérieure à la date de la journée .";
        public const string ERR_MSG_COMPARAISON_DATEJOURNEE_DATEDEBUTPREVU = "La date de début ne doit pas être inférieur à la date de la journée de travail.";
        #endregion

        #region STATUS
        public const string SL_RESULTAT_ERROR = "FALSE";
        public const string SL_RESULTAT_SUCCESS = "TRUE";
        #endregion

        #region Method d'envoie
        public const string METHOD = "POST";
        #endregion

    }
}
